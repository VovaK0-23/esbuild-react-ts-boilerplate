import React from 'react';
import { useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';

const App = (props: { message: string }) => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => {
    setCount((count) => count + 1);
  }, [count]);
  return (
    <>
      <h1>{props.message}</h1>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
    </>
  );
};

const rootElem = document.getElementById('root');
if (rootElem)
  createRoot(rootElem).render(
    <App message='Hello World! A Counter App built on ESBuild + React + Typescript' />
  );
else alert('Cannot find element with id "root", something went wrong');
