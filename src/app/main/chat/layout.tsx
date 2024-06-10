import { Sidebar } from '@/components/Sidebar';
import { ToasterContext } from '@/context/ToasterContext';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen'>
      <ToasterContext />
      <Sidebar />
      <section className='w-full md:w-[70%] mx-auto transition-all duration-300'>
        {children}
      </section>
    </div>
  );
}
