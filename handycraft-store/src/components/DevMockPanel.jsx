import { useState } from 'react'
import { mockControl, persistMockControl } from '../mocks/handlers'
import { Button } from './ui/Button'

export default function DevMockPanel() {
  const [currentMode, setCurrentMode] = useState(mockControl.failureMode === 'network' ? 'Обрив мережі' : (mockControl.failuresLeft > 0 ? 'HTTP 500' : 'Нормально'))

  function applyScenario(mode, label) {
    if (mode === 'http') {
      mockControl.failuresLeft = 50
      mockControl.failureMode = 'http'
      mockControl.delayMs = 800
    } else if (mode === 'network') {
      mockControl.failuresLeft = 50
      mockControl.failureMode = 'network'
      mockControl.delayMs = 800
    } else if (mode === 'slow') {
      mockControl.failuresLeft = 0
      mockControl.delayMs = 3000
    } else {
      mockControl.failuresLeft = 0
      mockControl.delayMs = 800
    }
    persistMockControl()
    setCurrentMode(label)
    setTimeout(() => window.location.reload(), 200)
  }

  return (
    <aside className="fixed bottom-4 right-4 z-50 w-72 bg-surface border-2 border-border p-4 shadow-[6px_6px_0_#000]">
      <div className="mb-3 border-b border-border pb-2 flex justify-between items-center">
        <p className="text-xs font-mono text-white uppercase font-bold">Мок-сервер</p>
        <span className="text-[10px] font-mono text-muted uppercase">DEV</span>
      </div>
      
      <p className="text-xs font-mono mb-3 text-muted">
        Статус: <span className="text-white font-bold uppercase">{currentMode}</span>
      </p>

      <div className="flex flex-col gap-2 mb-4">
        <button
          type="button"
          onClick={() => applyScenario('http', 'HTTP 500')}
          className="px-2 py-1 text-left text-xs font-mono text-muted hover:text-white hover:bg-[#333] transition-colors border border-transparent hover:border-border"
        >
          HTTP 500
        </button>
        <button
          type="button"
          onClick={() => applyScenario('network', 'Обрив мережі')}
          className="px-2 py-1 text-left text-xs font-mono text-muted hover:text-white hover:bg-[#333] transition-colors border border-transparent hover:border-border"
        >
          Обрив мережі
        </button>
        <button
          type="button"
          onClick={() => applyScenario('slow', 'Повільна (3с)')}
          className="px-2 py-1 text-left text-xs font-mono text-muted hover:text-white hover:bg-[#333] transition-colors border border-transparent hover:border-border"
        >
          Повільна відповідь (3с)
        </button>
        <button
          type="button"
          onClick={() => applyScenario('reset', 'Нормально')}
          className="px-2 py-1 text-left text-xs font-mono text-muted hover:text-white hover:bg-[#333] transition-colors border border-transparent hover:border-border"
        >
          Скинути (Нормально)
        </button>
      </div>

      <Button onClick={() => window.location.reload()} className="w-full !py-1.5 !text-[10px]">
        Перезавантажити сторінку
      </Button>
    </aside>
  )
}
