"use client"

import React from "react";
import { SIWNWindow, SIWNResponseData } from "../types/types";
import { useNeynarAuth } from "../context/neynar-auth-context";
import { LOCAL_STORAGE_FARCASTER_USER } from "../utils/consts";

declare let window: SIWNWindow;

export default function SignInWithNeynar() {
  const { setUser: setFarcasterUser } = useNeynarAuth();
  const neynarClientId = process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID;

  const onSignInSuccess = (data: SIWNResponseData) => {
    const neynarUser = data.user;

    const farcasterUser = {
      signer_uuid: data.signer_uuid,
      fid: Number(neynarUser.fid),
      fname: neynarUser.username,
      displayName: neynarUser.display_name,
      profile: {
        bio: neynarUser.profile.bio.text || "",
      },
      pfp: neynarUser.pfp_url,
      followerCount: neynarUser.follower_count,
      followingCount: neynarUser.following_count,
    };

    localStorage.setItem(LOCAL_STORAGE_FARCASTER_USER, JSON.stringify(farcasterUser));
    setFarcasterUser(farcasterUser);
  };

  React.useEffect(() => {
    window.onSignInSuccess = onSignInSuccess;

    return () => {
      delete window.onSignInSuccess;
    };
  }, []);

  return (
    <div
      className="neynar_signin pt-2 pr-0 md:pr-4"
      data-client_id={neynarClientId}
      data-success-callback="onSignInSuccess"
      data-width="147px"
      data-height="29px"
      data-font_size="13px"
      data-padding="6px 13px"
      data-theme="light">
    </div>
  );
}