import { Sidebar } from '../components/Sidebar'

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex'>
      <Sidebar />
      <section className='w-full'>{children}</section>
    </div>
  )
}

