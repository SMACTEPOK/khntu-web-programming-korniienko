import React from 'react';
import Lab9Page from './pages/Lab9Page';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          <span className="app__brand-mark">✱</span>
          CRAFTMARKET
          <span className="app__brand-tag">LAB 9</span>
        </div>
      </header>
      <main className="app__main">
        <Lab9Page />
      </main>
      <footer className="app__footer">
        <p>© 2026 CRAFTMARKET · Лабораторна робота 9 · Events & Interactions</p>
      </footer>
    </div>
  );
}

export default App;
