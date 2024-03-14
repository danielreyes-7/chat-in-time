'use client';

import { db } from '@/app/firebase';
import { Message } from '@/components/Message';
import { SendMessage } from '@/components/SendMessage';
import { UserAuth } from '@/context/AuthContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

type Message = {
  id: string;
  text: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
};

export default function Chat() {
  const { user } = UserAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const userName = user?.email?.split('@').at(0);
  const scroll = useRef;

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log({
        data: querySnapshot.docs[0].data(),
        id: querySnapshot.docs[0].id,
      });
      let messages: Message[] = [];

      querySnapshot.forEach((doc) => {
        const { text, timestamp } = doc.data();
        messages.push({ text, timestamp, id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='p-8'>
      <div
        className={`w-4/6 mx-auto flex justify-center ml-auto p-2 bg-zinc-700 rounded-md hover:translate-y-[-4px] duration-300`}
      >
        <p>
          Welcome,{' '}
          <strong>
            {user?.displayName ??
              userName![0].toUpperCase() + userName?.substring(1) ??
              'Guest'}
          </strong>
        </p>
      </div>
      <div className='mt-8'>
        {messages.map((message) => (
          <Message key={message.id} message={message} user={user} />
        ))}
      </div>
      <SendMessage />
      {/* <span ref={scroll}></span> */}
    </div>
  );
}
