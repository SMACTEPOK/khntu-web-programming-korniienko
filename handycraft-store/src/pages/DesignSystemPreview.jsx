import { useEffect } from 'react'
import { useCartContext } from '../context/useCartContext'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { Card, CardTitle } from '../components/ui/Card'
import { QuantityStepper } from '../components/ui/QuantityStepper'

export default function DesignSystemPreview() {
  const { items, addItem } = useCartContext()

  // Додаємо демо-товар у кошик при відкритті сторінки, щоб лічильник працював
  useEffect(() => {
    if (!items.find(i => i.id === 'demo-preview')) {
      addItem({ id: 'demo-preview', name: 'Демо товар', price: 100, stock: 5, category: 'Демо' })
    }
  }, [items, addItem])

  const demoItem = items.find(i => i.id === 'demo-preview') || { id: 'demo-preview', quantity: 1, stock: 5 }

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-12 p-6 pb-20">
      <h1 className="text-3xl font-bold text-white uppercase border-b-2 border-border pb-4">Дизайн-система</h1>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-mono text-accent uppercase">Кнопки</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-mono text-accent uppercase">Бейджі</h2>
        <div className="flex flex-wrap gap-4">
          <Badge tone="neutral">Neutral</Badge>
          <Badge tone="brand">Brand</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="danger">Danger</Badge>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-mono text-accent uppercase">Поля вводу</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Звичайне поле" placeholder="Введіть текст" />
          <Input label="З підказкою" hint="Допоміжний текст" />
          <Input label="З помилкою" error="Мінімум 3 символи" defaultValue="ab" />
          <Input label="Textarea" as="textarea" rows={3} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-mono text-accent uppercase">Картки (Варіант 4 та 9)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardTitle>Звичайна картка</CardTitle>
            <div className="p-4 text-sm text-muted font-mono">Це контент картки. Вона не клікабельна.</div>
          </Card>
          
          <Card href="#test">
            <CardTitle>Клікабельна картка (Варіант 9)</CardTitle>
            <div className="p-4 text-sm text-muted font-mono group-hover:text-white transition-colors">
              Вся ця картка є одним посиланням. При натисканні Tab фокус охоплює всю картку.
            </div>
          </Card>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-mono text-accent uppercase">Лічильник (Варіант 14)</h2>
        <div className="bg-surface p-6 border-2 border-border inline-block">
          <QuantityStepper item={demoItem} />
        </div>
      </section>
    </main>
  )
}
