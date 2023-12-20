import './style.css'

export const Spinner = () => {
  return (
    <div className='absolute w-full h-screen flex justify-center items-center bg-gray-500/20'>
      <div className='loader' />
    </div>
  )
}
