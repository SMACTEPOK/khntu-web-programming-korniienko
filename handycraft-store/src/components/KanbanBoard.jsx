import React, { useState } from 'react';

const INITIAL_CARDS = {
  todo: [
    { id: '1', title: 'Розробити дизайн', desc: 'Створити макети в Figma', priority: 'high' },
    { id: '2', title: 'Налаштувати API', desc: 'Підключити бекенд', priority: 'medium' },
  ],
  progress: [
    { id: '3', title: 'Написати код', desc: 'Реалізувати компоненти', priority: 'high' },
  ],
  done: [
    { id: '4', title: 'Створити проєкт', desc: 'Vite + React', priority: 'low' },
  ]
};

export function KanbanBoard() {
  const [columns, setColumns] = useState(INITIAL_CARDS);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, item, sourceCol) => {
    setDraggedItem({ item, sourceCol });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetCol) => {
    e.preventDefault();
    if (!draggedItem) return;
    const { item, sourceCol } = draggedItem;
    if (sourceCol === targetCol) return;

    setColumns(prev => ({
      ...prev,
      [sourceCol]: prev[sourceCol].filter(c => c.id !== item.id),
      [targetCol]: [...prev[targetCol], item]
    }));
    setDraggedItem(null);
  };

  const priorityColor = { high: 'var(--color-danger)', medium: 'var(--color-warning)', low: 'var(--color-success)' };

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">02 / Kanban Board (Drag & Drop)</h2>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        {Object.entries(columns).map(([colName, items]) => (
          <div
            key={colName}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, colName)}
            style={{ flex: 1, background: 'var(--color-background)', border: '2px dashed var(--color-border)', padding: '12px', minHeight: '200px' }}
          >
            <h4 style={{ textTransform: 'uppercase', color: 'var(--color-muted)', marginTop: 0, borderBottom: '2px solid var(--color-border)', paddingBottom: '8px' }}>
              {colName}
            </h4>
            {items.map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item, colName)}
                style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border)', padding: '12px', marginBottom: '8px', cursor: 'grab' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <strong style={{ color: 'var(--color-white)', fontSize: '14px' }}>{item.title}</strong>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: priorityColor[item.priority] }} title={`Priority: ${item.priority}`} />
                </div>
                <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
