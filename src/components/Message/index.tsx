'use client';

import { auth } from '@/app/firebase';
import clsx from 'clsx';
import { type User } from 'firebase/auth';

const messageChatVariant = {
  sended: 'bg-teal-600 text-gray-200 ms-auto',
  received: 'bg-gray-500 text-black me-auto',
};

interface MessageProps {
  message: {
    name: string;
    text: string;
    timestamp: {
      seconds: number;
      nanoseconds: number;
    };
    uid: string;
  };
  user: User | null;
}

export const Message = ({ message, user }: MessageProps) => {
  const userName = user?.email && user?.email?.split('@').at(0);
  const currentUid = auth.currentUser?.uid ? auth.currentUser?.uid : '';
  const messageOwned =
    message.uid && message.uid === currentUid
      ? messageChatVariant.sended
      : messageChatVariant.received;

  return (
    <div className='p-2 pt-4 flex'>
      <div className={clsx('p-2 rounded-md', messageOwned)}>
        <p className='text-xs text-gray-100 font-bold mb-2'>{message.name}</p>
        <p>{message.text}</p>
      </div>
    </div>
  );
};
