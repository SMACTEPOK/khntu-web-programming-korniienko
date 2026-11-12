import React, { useState, useRef } from 'react';

export function SwipeGesture() {
  const [gesture, setGesture] = useState('');
  const [strength, setStrength] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const startRef = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    startRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    setGesture('');
    setStrength(0);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const dx = e.touches[0].clientX - startRef.current.x;
    const dy = e.touches[0].clientY - startRef.current.y;
    setOffset({ x: dx, y: dy });
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const dx = touch.clientX - startRef.current.x;
    const dy = touch.clientY - startRef.current.y;
    const threshold = 50;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    if (dist > threshold) {
      if (Math.abs(dx) > Math.abs(dy)) {
        setGesture(dx > 0 ? 'SWIPE RIGHT →' : '← SWIPE LEFT');
      } else {
        setGesture(dy > 0 ? 'SWIPE DOWN ↓' : '↑ SWIPE UP');
      }
      setStrength(Math.min(100, Math.round((dist / 300) * 100)));
    } else {
      setGesture('Клік / Занадто короткий свайп');
    }
    
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">03 / Swipe Gesture (Mobile/Touch)</h2>
      <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', marginBottom: '16px' }}>
        Зробіть свайп у будь-якому напрямку (потрібен тачскрін або емуляція в DevTools)
      </p>
      
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          height: '300px', border: '3px solid var(--color-border)', background: 'var(--color-background)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          touchAction: 'none', userSelect: 'none', overflow: 'hidden'
        }}
      >
        <div style={{
          width: '100px', height: '100px', background: 'var(--color-white)', border: '2px solid var(--color-ink)',
          transform: `translate(${offset.x}px, ${offset.y}px)`, transition: offset.x === 0 ? 'transform 0.3s' : 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--color-ink)'
        }}>
          TOUCH
        </div>
        
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-white)', margin: '0 0 10px 0' }}>{gesture || 'Очікування...'}</h3>
          {strength > 0 && <p style={{ color: 'var(--color-success)', fontFamily: 'var(--font-mono)' }}>Сила: {strength}%</p>}
        </div>
      </div>
    </div>
  );
}
