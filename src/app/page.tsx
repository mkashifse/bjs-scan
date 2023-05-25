"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Home() {
  const [blocks, setBlocks] = useState<any>([]);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("NEW_BLOCK", (data) => {
      const bl = JSON.parse(data);
      setBlocks(bl);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <main>
      {blocks.map((item: any, i: number) => {
        return <div key={i}>{item.hash}</div>;
      })}
    </main>
  );
}
