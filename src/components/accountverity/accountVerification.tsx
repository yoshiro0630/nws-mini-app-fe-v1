"use client";
import { verificationData } from "@/data/verification";
// import { useState } from "react";
import Image from "next/image";
import Primarybutton from "../button/primaryButton";
import { TaskData } from "@/app/quest/page";
import { userIDAtom } from "@/store/userInfo";
import { useAtom } from "jotai";
import axios from "axios";

export interface AccountData {
  tasks: TaskData[];
  completedTasks?: number[];
  acctasks?: boolean[];
  render: boolean;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountVerification: React.FC<AccountData> = ({
  acctasks,
  render,
  setRender,
}) => {
  // const [taskList] = useState(tasks)
  const [userID] = useAtom(userIDAtom);

  const handletask = (id: number) => {
    let isCompeletd;
    if (acctasks) {
      isCompeletd = acctasks;
      isCompeletd[id-1] = true;
      axios
        .put(
          `https://8152-95-216-228-74.ngrok-free.app/api/update/do-acctask/${userID}`,
          {
            nodewave: isCompeletd[0],
            tweeter: isCompeletd[1],
            instagram: isCompeletd[2],
          }
        )
        .then((res) => {
          console.log(res);
          response();
        })
        .catch((err) => console.log(err));
    }
  };

  const response = () => {
    setTimeout(() => {
      setRender(!render);
    }, 3000);
  };

  return (
    <div className="flex flex-col text-white gap-1">
      <div className="flex gap-5">
        <div className="font-bold text-nowrap  ">Account & Verification</div>
        <div className="flex items-center h-6 gap-1 p-0.5 font-bold border border-blue-800 bg-slate-600 rounded-full px-2">
          <div className="text-sm">Refresh</div>
          <Image
            className="w-4 h-4"
            src={"/image/refresh.png"}
            alt=""
            width={16}
            height={16}
          />
        </div>
      </div>
      <div className="text-xs">
        Refer friends to sign up NWS community and follow NWS manager
      </div>
      <div className="flex flex-col gap-2">
        {verificationData.map((item) => (
          <a
            key={item.id}
            target="_blank"
            href={item.link}
            onClick={() => handletask(item.id)}
          >
            <Primarybutton
              mainImgSrc="/image/nws.png"
              title={item.title}
              iconImgSrc=""
              content={item.content}
              lastImgSrc={
                acctasks && acctasks[item.id]
                  ? "/image/arrowcheck.png"
                  : "/image/arrowright.png"
              }
              point={item.point}
              coin={item.coin}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default AccountVerification;
