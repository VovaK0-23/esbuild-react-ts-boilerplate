import React from 'react';
import { createRoot } from 'react-dom/client';
import { useCallback, useState } from 'react';

const App = (props: { message: string }) => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => {
    setCount(count => count + 1);
  }, [count]);
  return (
    <>
      <h1>{props.message}</h1>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <App message='Hello World! A Counter App built on ESBuild + React + Typescript' />
);
