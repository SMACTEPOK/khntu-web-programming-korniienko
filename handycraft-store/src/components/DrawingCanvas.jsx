import React, { useRef, useState, useEffect } from 'react';

export function DrawingCanvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ededed');
  const [lineWidth, setLineWidth] = useState(3);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (history.length > 0 && historyStep >= 0) {
      const img = new Image();
      img.src = history[historyStep];
      img.onload = () => ctx.drawImage(img, 0, 0);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [history, historyStep]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX || e.touches[0].clientX) - rect.left,
      y: (e.clientY || e.touches[0].clientY) - rect.top
    };
  };

  const startDrawing = (e) => {
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      const imageData = canvas.toDataURL();
      const newHistory = history.slice(0, historyStep + 1);
      setHistory([...newHistory, imageData]);
      setHistoryStep(newHistory.length);
      setIsDrawing(false);
    }
  };

  const handleUndo = () => { if (historyStep > 0) setHistoryStep(historyStep - 1); };
  const handleRedo = () => { if (historyStep < history.length - 1) setHistoryStep(historyStep + 1); };
  const handleClear = () => { setHistory([]); setHistoryStep(-1); };

  const handleExport = () => {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">05 / Drawing Canvas (Mouse & Touch)</h2>
      <div className="lab-controls" style={{ marginBottom: '16px' }}>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: '40px', height: '40px', padding: 0, cursor: 'pointer', border: '2px solid var(--color-border)' }} />
        <input type="range" min="1" max="20" value={lineWidth} onChange={e => setLineWidth(Number(e.target.value))} style={{ width: '120px' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{lineWidth}px</span>
        <button className="btn" onClick={handleUndo} disabled={historyStep <= 0}>Undo</button>
        <button className="btn" onClick={handleRedo} disabled={historyStep >= history.length - 1}>Redo</button>
        <button className="btn" onClick={handleClear}>Clear</button>
        <button className="btn" onClick={handleExport}>Export PNG</button>
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        style={{ border: '3px solid var(--color-border)', background: 'var(--color-background)', width: '100%', touchAction: 'none', cursor: 'crosshair' }}
      />
    </div>
  );
}
