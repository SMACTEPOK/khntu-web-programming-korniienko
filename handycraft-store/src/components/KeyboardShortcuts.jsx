import React, { useState, useEffect, useRef } from 'react';

export function KeyboardShortcuts() {
  const [text, setText] = useState('Виділіть текст та натисніть Ctrl+B, Ctrl+I або Ctrl+U');
  const [styles, setStyles] = useState({ bold: false, italic: false, underline: false });
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const editorRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'b') { e.preventDefault(); setStyles(s => ({ ...s, bold: !s.bold })); }
        if (e.key === 'i') { e.preventDefault(); setStyles(s => ({ ...s, italic: !s.italic })); }
        if (e.key === 'u') { e.preventDefault(); setStyles(s => ({ ...s, underline: !s.underline })); }
        if (e.key === 'z') { e.preventDefault(); handleUndo(); }
        if (e.key === 'y') { e.preventDefault(); handleRedo(); }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history, historyIndex]);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setText(val);
    saveHistory(val);
  };

  const saveHistory = (newText) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newText);
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setText(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setText(history[historyIndex + 1]);
    }
  };

  const textStyle = {
    fontWeight: styles.bold ? 'bold' : 'normal',
    fontStyle: styles.italic ? 'italic' : 'normal',
    textDecoration: styles.underline ? 'underline' : 'none',
  };

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">01 / Keyboard Shortcuts (Ctrl+B, I, U, Z, Y)</h2>
      <div className="lab-controls" style={{ marginBottom: '16px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>
          Bold: {styles.bold ? 'ON' : 'OFF'} | Italic: {styles.italic ? 'ON' : 'OFF'} | Underline: {styles.underline ? 'ON' : 'OFF'}
        </span>
      </div>
      
      <textarea
        ref={editorRef}
        value={text}
        onChange={handleTextChange}
        style={{ ...textStyle, width: '100%', height: '120px', background: 'var(--color-background)', color: 'var(--color-white)', border: '2px solid var(--color-border)', padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '16px', outline: 'none', resize: 'none' }}
      />
    </div>
  );
}
