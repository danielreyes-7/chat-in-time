'use client';

import { db } from '@/app/firebase';
import { Message } from '@/components/Message';
import { SendMessage } from '@/components/SendMessage';
import { UserAuth } from '@/context/AuthContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

type Message = {
  name: string;
  id: string;
  text: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
  uid: string;
};

export default function Chat() {
  const { user } = UserAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const userName = user?.email?.split('@').at(0);
  const scroll = useRef;

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages: Message[] = [];

      querySnapshot.forEach((doc) => {
        const { text, timestamp, uid, name } = doc.data();
        messages.push({ text, timestamp, id: doc.id, uid, name });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='h-full w-full p-8 relative flex flex-col'>
      <div
        className={`w-4/6 mx-auto flex justify-center ml-auto p-2 bg-zinc-700 rounded-md hover:translate-y-[-4px] duration-300`}
      >
        <p>
          Welcome,{' '}
          <strong>
            {user?.displayName ??
              (userName && userName[0].toUpperCase() + userName?.substring(1))}
          </strong>
        </p>
      </div>
      <div className='mt-8 mb-4 overflow-y-auto'>
        {messages.map((message) => (
          <Message key={message.id} message={message} user={user} />
        ))}
      </div>
      <div className='w-full bottom-1 absolute mt-auto'>
        <SendMessage />
      </div>
      {/* <span ref={scroll}></span> */}
    </div>
  );
}
