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
    <main className="space-y-3">
      <table className="table table-auto w-full">
        <thead>
          <th>Hash</th>
          <th>Previous Hash</th>
          <th>Timestamp</th>
          <th>Block</th>
          <th>Difficulty</th>
        </thead>
        <tbody>
          {blocks.map((item: any, i: number) => {
            return (
              <tr key={i} className="text-sm ">
                <td>
                  <span className=" truncate"> {item.hash}</span>
                </td>
                <td>{item.previousHash}</td>
                <td>{item.difficulty}</td>
                <td>{item.timestamp}</td>
                <td>{item.nonce}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
