import { useState } from "react";

export const useCount = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prevCount) => prevCount++);

  const decrement = () => setCount((prevCount) => prevCount--);

  return {
    increment,
    decrement,
    count,
  };
};
