import { TwitterProfileClient } from './client';

interface TwitterProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function TwitterProfilePage({ params }: TwitterProfilePageProps) {
  const { username } = await params;
  return (
    <TwitterProfileClient username={username} />
  )
}
