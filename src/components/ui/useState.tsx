"use client"; // 👈 Agregar esto al inicio del archivo

import { useState } from "react";

export default function MyComponent() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Click me: {count}</button>;
}
