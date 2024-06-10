'use server';

import { auth, db } from '@/app/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { sleep } from '@/lib/utils';
import { FieldValues } from 'react-hook-form';

export async function sendMessage(message: FieldValues, user: any) {
  await sleep(500);

  await addDoc(collection(db, 'messages'), {
    text: message.messageInput,
    name: user.userSender,
    uid: user.uid,
    timestamp: serverTimestamp(),
  });
}
