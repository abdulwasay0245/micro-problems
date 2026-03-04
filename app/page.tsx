'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav style={{ padding: '16px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
      <h1>Micro Problems PK</h1>

      <div>
        {session ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>👤 {session.user.name}</span>
            <button onClick={() => signOut()}>Sign Out</button>
          </div>
        ) : (
          <button onClick={() => signIn('google')}>Sign In with Google</button>
        )}
      </div>
    </nav>
  );
}