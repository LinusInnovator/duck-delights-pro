import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function Home() {
  const isUgly = Math.random() > 0.5;

  if (isUgly) {
    redirect('/ugly');
  } else {
    redirect('/pretty');
  }
}
