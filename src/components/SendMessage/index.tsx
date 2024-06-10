'use client';
import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldValues } from 'react-hook-form';
import { Input } from '../Input';
import { Button } from '../Button';
import { sendMessage } from '@/actions/sendMessageActions';
import { MdSend } from 'react-icons/md';
import { auth } from '@/app/firebase';
import toast from 'react-hot-toast';

export const SendMessage = () => {
  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  const formSendMessageSchema = z.object({
    messageInput: z.string(),
  });
  const { handleSubmit, register, reset, watch } = useForm<FieldValues>({
    resolver: zodResolver(formSendMessageSchema),
    defaultValues: {
      messageInput: '',
    },
  });

  const messageInput = watch('messageInput');

  const action: () => void = handleSubmit(async (formData: FieldValues) => {
    setLoadingForm(true);
    //@ts-ignore
    const { uid, displayName, email } = auth.currentUser;
    const userHardName = email?.split('@').at(0);
    const userSender =
      displayName ??
      (userHardName &&
        userHardName[0].toUpperCase() + userHardName?.substring(1));
    const userBasics = {
      uid: uid,
      userSender: userSender,
    };

    try {
      await sendMessage(formData, userBasics);
      setLoadingForm(false);
      reset();
    } catch (e: any) {
      console.log('error:', e);
      toast(e, {
        icon: '❌',
        style: {
          borderRadius: '6px',
          background: 'rgba(107, 114, 128)',
          color: '#dce0e6',
        },
        position: 'bottom-left',
      });
    } finally {
      setLoadingForm(false);
    }
  });

  return (
    <form
      action={action}
      className='flex items-center justify-between gap-1 mr-16'
      noValidate
    >
      <Input
        id='messageInput'
        register={register}
        type='text'
        className='mt-0'
        autoComplete='off'
      />
      <Button
        type='submit'
        disabled={loadingForm || !messageInput}
        className='ring-1 ring-inset ring-zinc-700 flex flex-row items-center gap-1'
      >
        {loadingForm ? (
          <span>Sending...</span>
        ) : (
          <>
            <span className='hidden sm:block transition-all duration-500'>
              Send
            </span>
            <MdSend size={23} />
          </>
        )}
      </Button>
    </form>
  );
};
