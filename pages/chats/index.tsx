import type { NextPage } from "next";
import Layout from "@components/layout";
import useSWR from 'swr';
import { useRouter } from "next/router";
import { ChatRoom } from "@prisma/client";
import { useEffect } from "react";
import Link from "next/link";

interface ChatRoomsResponse {
  ok: boolean;
  chatRooms: ChatRoom[];
}

const Chats: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<ChatRoomsResponse>(`/api/chats/`);
  return (
    <Layout hasTabBar title="채팅">
      <div className="divide-y-[1px] ">
        {data?.chatRooms.map((chatRoom) => (
          <Link legacyBehavior key={chatRoom.id} href={`/chats/${chatRoom.id}`}>
            <div className="flex px-4 cursor-pointer py-3 items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-slate-300" />
              <div>
                <p className="text-gray-700">
                  {chatRoom.chatMessages[0]?.userId}
                </p>
                <p className="text-sm  text-gray-500">
                  {chatRoom.chatMessages[0]?.message}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;