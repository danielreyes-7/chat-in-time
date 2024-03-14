import { LoginForm } from '@/components/Login/LoginForm';
import { PublicLayout } from '@/components/PublicLayout';

export default function Login() {
  return (
    <>
      <PublicLayout />
      <div className='flex justify-center items-center'>
        <LoginForm />
      </div>
    </>
  );
}
