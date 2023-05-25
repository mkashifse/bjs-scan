"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Clock, Globe, HardDrive, Link2, LogOut } from "react-feather";

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

  const TopBlock = () => {
    return (
      <div className="grid grid-cols-3 grid-rows-2 text-xs gap-6 text-gray-600 shadow rounded-lg p-2 mx-8 -mt-4 bg-white">
        <div className="h-16">
          <div className="border-b h-full pt-2 pl-2 flex items-start space-x-2">
            <Link2 className=""></Link2>
            <div>
              <div> BJS PRICE</div>
              <div> $2.1</div>
            </div>
          </div>
        </div>
        <div className="border-l px-6 flex space-x-2 items-start">
          <HardDrive className="mt-2"></HardDrive>
          <div className="border-b h-full mt-2">
            <div>TRANSACTIONS</div>
            <div>133434</div>
          </div>
        </div>
        <div className="row-span-2 border-l px-6">TRANSACTION HISTORY</div>
        <div className="h-16 flex item-start space-x-2">
          <Globe></Globe>
          <div>
            <div>MARKET CAP</div>
            <div>$5353</div>
          </div>
        </div>
        <div className="border-l px-6 flex space-x-2">
          <Clock></Clock>
          <div>
            <div>LAST FINALIZED BLOCK</div>
            <div>242232</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="">
      <div className="flex px-8 py-2 text-xs text-gray-700 bg-white border-b justify-between">
        <div>
          BJS Price: <span className="text-teal-500">$1.2 (+0.59%)</span>
        </div>
        <div>BJ</div>
      </div>
      <div className="bg-indigo-800 h-24 grid">
        <input
          className="bg-white shadow-md rounded-lg text-gray-800 focus:ring-1 ring-yellow-100 p-2 border-none outline-none w-1/2 m-auto text-sm"
          placeholder="Search by Address / Txn / Block"
        ></input>
      </div>
      <TopBlock></TopBlock>
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
