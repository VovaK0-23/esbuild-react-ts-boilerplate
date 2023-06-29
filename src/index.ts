import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/App';

const rootElem = document.getElementById('root');
if (rootElem)
  createRoot(rootElem).render(
    createElement(
      App,
      { message: 'Hello World! A Counter App built on ESBuild + React + Typescript' },
      null
    )
  );
else alert('Cannot find element with id "root", something went wrong');

declare const NODE_ENV: string;
if (NODE_ENV === 'development') {
  new EventSource('/esbuild').addEventListener('change', () => location.reload());
}
