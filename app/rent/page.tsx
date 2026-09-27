import { redirect } from 'next/navigation';

export default function RentPage() {
  redirect('/search?mode=rent');
}
