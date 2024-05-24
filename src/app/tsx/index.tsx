import React from 'react';
import { createRoot } from 'react-dom/client';
import RouterRendering from './main.tsx';

const container = document.querySelector('.main-index');
if (!container) throw new Error('Root element not found');

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <RouterRendering />
  </React.StrictMode>
);