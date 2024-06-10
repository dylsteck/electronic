import { useContext } from 'react';
import { NeynarAuthContext } from '../context/neynar-auth-context';

export const useCast = () => {
  const context = useContext(NeynarAuthContext);
  if (!context) {
    throw new Error('useCast must be used within a NeynarAuthProvider');
  }
  const { postCast } = context;
  return postCast;
};