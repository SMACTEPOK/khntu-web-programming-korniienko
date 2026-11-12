import React, { useState, useEffect, useRef, useCallback } from 'react';

const generateItems = (page) => Array.from({ length: 20 }, (_, i) => ({
  id: page * 20 + i,
  text: `Елемент списку №${page * 20 + i + 1}`
}));

export function InfiniteScroll() {
  const [items, setItems] = useState(generateItems(0));
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || loading) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollHeight - scrollTop - clientHeight < 50) {
      setLoading(true);
      // Імітація затримки мережі
      setTimeout(() => {
        setPage(p => p + 1);
        setItems(prev => [...prev, ...generateItems(page + 1)]);
        setLoading(false);
      }, 1000);
    }
  }, [loading, page]);

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">04 / Infinite Scroll (Throttled)</h2>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ height: '300px', overflowY: 'auto', border: '2px solid var(--color-border)', background: 'var(--color-background)' }}
      >
        {items.map(item => (
          <div key={item.id} style={{ padding: '16px', borderBottom: '1px solid var(--color-concrete)', fontFamily: 'var(--font-mono)' }}>
            {item.text}
          </div>
        ))}
        {loading && (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-success)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>
            ЗАВАНТАЖЕННЯ...
          </div>
        )}
      </div>
    </div>
  );
}
