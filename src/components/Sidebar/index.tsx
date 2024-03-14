'use client';
import { UserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdLogout, MdArrowBack } from 'react-icons/md';
export const Sidebar = () => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const router = useRouter();
  const { setLoadingAuth, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
      router.replace('/');
    } catch (error: any) {
      toast(error?.code, {
        icon: '❌',
        style: {
          borderRadius: '6px',
          background: 'rgba(107, 114, 128)',
          color: '#dce0e6',
        },
        position: 'bottom-left',
      });
    } finally {
      setLoadingAuth(false);
    }
  };

  return (
    <aside
      className={`relative min-h-screen rounded-e-xl border-r border-gray-500 shadow-[18px_0_40px_1px] shadow-zinc-700 ${
        collapse ? 'w-16 p-1' : 'p-6 w-72'
      } flex flex-col duration-300`}
    >
      <h1 className={`${collapse && 'scale-0'} duration-300`}>Sidebar</h1>
      <div
        className={`cursor-pointer absolute top-9 -right-3 bg-zinc-900 hover:bg-zinc-900/80 ring-1 ring-inset ring-gray-500 shadow-[0_0_10px_0] shadow-zinc-700 p-1 rounded-full ${
          collapse && 'rotate-180'
        } duration-500`}
        onClick={() => setCollapse(!collapse)}
      >
        <MdArrowBack />
      </div>
      <footer className={`mt-auto mb-1 ${collapse && 'w-[90%] mx-auto'}`}>
        <div
          className='p-2 rounded-md cursor-pointer flex justify-center items-center gap-2 bg-zinc-700 hover:bg-zinc-800/80 duration-300'
          onClick={handleSignOut}
        >
          <MdLogout size={23} />
          {!collapse && (
            <p className={'text-right inline-block font-semibold duration-300'}>
              Sign out
            </p>
          )}
        </div>
      </footer>
    </aside>
  );
};
