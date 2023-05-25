"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Home() {
  const [blocks, setBlocks] = useState<any>([]);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    // load initially
    fetch("http://localhost:3000/api/v1/blocks")
      .then((resp) => resp.json())
      .then((resp) => {
        setBlocks(resp.blocks);
      });

    // subscription
    socket.on("NEW_BLOCK", (data) => {
      const bl = JSON.parse(data);
      setBlocks(bl);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <main className="space-y-3 grid h-screen w-screen">
      <table className="table table-auto max-w-lg m-auto text-left">
        <thead>
          <th>Timestamp</th>
          <th>Hash</th>
          <th>Previous Hash</th>
          <th>Difficulty</th>
          <th>Nonce</th>
        </thead>
        <tbody>
          {blocks.map((item: any, i: number) => {
            return (
              <tr key={i} className="text-sm ">
                <td>
                  <span className="block w-32 truncate"> {item.timestamp}</span>
                </td>
                <td>
                  <span className="block w-32 truncate"> {item.hash}</span>
                </td>
                <td>
                  <span className="block w-32 truncate">
                    {item.previousHash}
                  </span>
                </td>
                <td>
                  <span className="block w-32 truncate">{item.difficulty}</span>
                </td>
                <td>{item.nonce}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
