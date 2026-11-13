import { useState, useEffect } from 'react';

export default function KeyboardShortcuts() {
  const [text, setText] = useState('Привіт, світ!');
  const [history, setHistory] = useState([text]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [styles, setStyles] = useState({ bold: false, italic: false, underline: false });

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
  }, [historyIndex, history]);

  const textStyle = {
    fontWeight: styles.bold ? 'bold' : 'normal',
    fontStyle: styles.italic ? 'italic' : 'normal',
    textDecoration: styles.underline ? 'underline' : 'none',
  };

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newText]);
    setHistoryIndex(newHistory.length);
  };

  return (
    <div className="p-4 bg-surface border-2 border-border shadow-brutal max-w-lg">
      <h3 className="font-mono text-white uppercase mb-4">Редактор з гарячими клавішами</h3>
      <p className="text-muted text-xs font-mono mb-2">Ctrl+B (жирний), Ctrl+I (курсив), Ctrl+U (підкреслений), Ctrl+Z (undo), Ctrl+Y (redo)</p>
      <textarea
        value={text}
        onChange={handleChange}
        style={textStyle}
        className="w-full h-32 p-3 bg-background text-white border-2 border-border font-mono text-sm outline-none focus:border-accent resize-none"
      />
    </div>
  );
}
