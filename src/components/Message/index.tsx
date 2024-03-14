'use client';

import clsx from 'clsx';
import { type User } from 'firebase/auth';

const messageChatVariant = {
  sended: 'bg-teal-600 text-gray-200 ms-auto',
  received: 'bg-gray-500 text-black me-auto',
};

interface MessageProps {
  message: {
    text: string;
    timestamp: {
      seconds: number;
      nanoseconds: number;
    };
  };
  user: User | null;
}

export const Message = ({ message, user }: MessageProps) => {
  const userName = user?.email?.split('@').at(0);

  return (
    <div className='p-2 pt-4 flex'>
      <div className={clsx('p-2 rounded-md', messageChatVariant.sended)}>
        <p className='text-xs text-gray-100 font-bold mb-2'>
          {user?.displayName ??
            userName![0].toUpperCase() + userName?.substring(1) ??
            'Guest'}
        </p>
        <p>{message.text}</p>
      </div>
    </div>
  );
};
