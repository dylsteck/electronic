import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LOCAL_STORAGE_FARCASTER_USER } from '../utils/consts';

export interface FarcasterUser {
  signer_uuid: string;
  fid: number;
  fname: string;
  displayName: string;
  profile: {
    bio?: string;
  };
  pfp: string;
  followerCount: number;
  followingCount: number;
}

interface NeynarAuthContextType {
  user: FarcasterUser | null;
  setUser: (user: FarcasterUser | null) => void;
  postCast: (respBody: any) => Promise<any>;
}

export const NeynarAuthContext = createContext<NeynarAuthContextType | undefined>(undefined);

export const NeynarAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FarcasterUser | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_FARCASTER_USER);
    if (storedData) {
      const user: FarcasterUser = JSON.parse(storedData);
      setUser(user);
    }
  }, []);

  const postCast = async (respBody: any) => {
    try {
      const response = await fetch(`https://api.neynar.com/v2/farcaster/cast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api_key': process.env.NEXT_PUBLIC_NEYNAR_API_KEY as string,
        },
        body: JSON.stringify(respBody),
      });
      const castPostResponse = await response.json();
      if (castPostResponse.message) {
        throw new Error(`Error posting a cast: ${castPostResponse.message}`);
      }
      return castPostResponse;
    } catch (error) {
      console.error('Failed to post cast', error);
    }
  };

  const handleSetUser = (user: FarcasterUser | null) => {
    setUser(user);
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_FARCASTER_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_FARCASTER_USER);
    }
  };

  return (
    <NeynarAuthContext.Provider value={{ user, setUser: handleSetUser, postCast }}>
      {children}
    </NeynarAuthContext.Provider>
  );
};

export const useNeynarAuth = () => {
  const context = useContext(NeynarAuthContext);
  if (!context) {
    throw new Error('useNeynarAuth must be used within a NeynarAuthProvider');
  }
  return context;
};