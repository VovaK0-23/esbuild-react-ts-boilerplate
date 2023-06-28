import './App';

declare const process: { env: { NODE_ENV: string } };
if (process.env.NODE_ENV === 'development')
  new EventSource('/esbuild').addEventListener('change', () =>
    location.reload()
  );
