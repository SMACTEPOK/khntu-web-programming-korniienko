import React, { useState, useRef } from 'react';

export function MultiTouchSVG() {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1, rotation: 0 });
  const startRef = useRef({ x: 0, y: 0, scale: 1, rotation: 0, distance: 0, angle: 0 });

  const getDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getAngle = (touches) => {
    const dx = touches[1].clientX - touches[0].clientX;
    const dy = touches[1].clientY - touches[0].clientY;
    return Math.atan2(dy, dx) * 180 / Math.PI;
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      startRef.current = { ...startRef.current, x: e.touches[0].clientX, y: e.touches[0].clientY, scale: transform.scale, rotation: transform.rotation };
    } else if (e.touches.length === 2) {
      startRef.current = {
        ...startRef.current,
        distance: getDistance(e.touches),
        angle: getAngle(e.touches),
        scale: transform.scale,
        rotation: transform.rotation
      };
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    
    if (e.touches.length === 1) {
      // Pan
      const dx = e.touches[0].clientX - startRef.current.x;
      const dy = e.touches[0].clientY - startRef.current.y;
      setTransform(prev => ({ ...prev, x: dx, y: dy }));
    } else if (e.touches.length === 2) {
      // Pinch & Rotate
      const currentDistance = getDistance(e.touches);
      const currentAngle = getAngle(e.touches);
      
      const scaleChange = currentDistance / startRef.current.distance;
      const angleChange = currentAngle - startRef.current.angle;

      setTransform(prev => ({
        ...prev,
        scale: Math.max(0.5, Math.min(3, startRef.current.scale * scaleChange)),
        rotation: startRef.current.rotation + angleChange
      }));
    }
  };

  const handleTouchEnd = () => {
    // Зберігаємо фінальне положення, щоб наступний жест починався з нього
    startRef.current = {
      x: transform.x + startRef.current.x, // Це спрощена логіка для демо
      y: transform.y + startRef.current.y,
      scale: transform.scale,
      rotation: transform.rotation,
      distance: 0,
      angle: 0
    };
    // Скидаємо зміщення, бо ми вже застосували його через transform
    setTransform(prev => ({ ...prev, x: 0, y: 0 })); 
  };

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">ІНДИВІДУАЛЬНЕ / Multi-Touch SVG (Rotate, Pinch, Pan)</h2>
      <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', marginBottom: '16px' }}>
        Використовуйте 1 палець для переміщення (Pan), 2 пальці для масштабування (Pinch) та обертання (Rotate)
      </p>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px', background: 'var(--color-background)', border: '2px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <svg
            width="100%"
            height="400"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'none', userSelect: 'none' }}
          >
            <g transform={`translate(200, 200) translate(${transform.x}, ${transform.y}) rotate(${transform.rotation}) scale(${transform.scale})`}>
              <rect x="-80" y="-80" width="160" height="160" fill="var(--color-surface)" stroke="var(--color-white)" strokeWidth="4" />
              <circle cx="0" cy="0" r="10" fill="var(--color-success)" />
              <text x="0" y="0" fill="var(--color-white)" textAnchor="middle" dy=".3em" fontFamily="var(--font-mono)" fontSize="14">SVG</text>
            </g>
          </svg>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ padding: '16px', border: '2px solid var(--color-border)', background: 'var(--color-surface)' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-muted)' }}>Scale: <b style={{ color: 'var(--color-white)' }}>{transform.scale.toFixed(2)}</b></p>
            <p style={{ margin: '8px 0 0 0', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-muted)' }}>Rotation: <b style={{ color: 'var(--color-white)' }}>{Math.round(transform.rotation)}°</b></p>
          </div>
          <button className="btn" onClick={() => setTransform({ x: 0, y: 0, scale: 1, rotation: 0 })}>Скинути трансформації</button>
        </div>
      </div>
    </div>
  );
}
