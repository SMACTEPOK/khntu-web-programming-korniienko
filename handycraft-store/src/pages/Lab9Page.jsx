import React from 'react';
import { KeyboardShortcuts } from '../components/KeyboardShortcuts';
import { KanbanBoard } from '../components/KanbanBoard';
import { SwipeGesture } from '../components/SwipeGesture';
import { InfiniteScroll } from '../components/InfiniteScroll';
import { DrawingCanvas } from '../components/DrawingCanvas';
import { MultiTouchSVG } from '../components/MultiTouchSVG';
import './Lab9Page.css';

export default function Lab9Page() {
  return (
    <div className="lab-page">
      <header className="lab-header">
        <h1 className="lab-title">LAB 09<br/>EVENTS</h1>
        <p className="lab-subtitle">Обробка подій, Drag & Drop, Gestures</p>
      </header>

      <main className="lab-main">
        <KeyboardShortcuts />
        <KanbanBoard />
        <SwipeGesture />
        <InfiniteScroll />
        <DrawingCanvas />
        <MultiTouchSVG />
      </main>
    </div>
  );
}
