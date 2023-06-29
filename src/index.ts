import './App';

declare const NODE_ENV: string;
if (NODE_ENV === 'development')
  new EventSource('/esbuild').addEventListener('change', () => location.reload());
