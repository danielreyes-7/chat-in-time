'use client';
import clsx from 'clsx';
import { FC } from 'react';
import { type IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

export const AuthSocialButton: FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        'inline-flex w-full justify-center rounded-md bg-zinc-700 px-4 py-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 transition-all duration-500 hover:bg-zinc-800/80 focus:outline-offset-0 hover:text-teal-500'
      )}
      type='button'
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};
