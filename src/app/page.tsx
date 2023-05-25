"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Clock, Globe, HardDrive, Link2, LogOut, Box } from "react-feather";
import moment from "moment";

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

  const BoxTable = (props: any) => {
    return (
      <div className="bg-white rounded-lg shadow py-4">
        <div className="border-b text-xs font-bold pb-2 mb-4 px-4">{props.name}</div>
        {props.blocks.reverse().map((item: any, i: number) => (
          <div className="flex my-1 text-sm border-b pb-4 px-4 mx-4" key={i}>
            <div className="w-12 h-12 flex justify-center items-center mr-4 rounded-xl bg-gray-100 ">
              <Box className="text-gray-500"></Box>
            </div>
            <div className="w-3/12">
              <div className="text-blue-600">{item.block}</div>
              <div className="text-xs text-gray-600 mt-2">
                {moment(item.timestamp).fromNow()}
              </div>
            </div>
            <div className="w-5/12 ">
              <div>
                Fee Recipient <span className="text-blue-600">Bulevard</span>
              </div>
              <div className="text-blue-600">
                164 TXNS 
                <span className="text-xs text-gray-500">in 12 sec</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-end mt-2">
                <div className="border  rounded-md px-2 text-xs text-gray-700 font-bold py-1">
                  0.1323 Bjs
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const TransactionTable = (props: any) => {
    return (
      <div className="bg-white rounded-lg shadow py-4">
        <div className="border-b text-xs font-bold pb-2 mb-4 px-4">{props.name}</div>
        {props.blocks.reverse().map((item: any, i: number) => (
          <div className="flex my-1 text-sm border-b pb-4 px-4 mx-4" key={i}>
            <div className="w-12 h-12 flex justify-center items-center mr-4 rounded-xl bg-gray-100 ">
              <Box className="text-gray-500"></Box>
            </div>
            <div className="w-3/12">
              <div className="text-blue-600">{item.block}</div>
              <div className="text-xs text-gray-600 mt-2">
                {moment(item.timestamp).fromNow()}
              </div>
            </div>
            <div className="w-5/12 ">
              <div>
                Fee Recipient <span className="text-blue-600">Bulevard</span>
              </div>
              <div className="text-blue-600">
                164 TXNS 
                <span className="text-xs text-gray-500">in 12 sec</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-end mt-2">
                <div className="border  rounded-md px-2 text-xs text-gray-700 font-bold py-1">
                  0.1323 Bjs
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="bg-gray-100 h-screen">
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
      <div className="grid grid-cols-2 gap-4 px-8 mt-4">
        <BoxTable name="Latest Blocks" blocks={blocks}></BoxTable>
        <TransactionTable name="Latest Transactions" blocks={blocks}></TransactionTable>
        {/* <TransactionTable name="Latest Transactions"></TransactionTable> */}
      </div>
      {/* <table className="table table-auto max-w-lg m-auto text-left">
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
      </table> */}
    </main>
  );
}
