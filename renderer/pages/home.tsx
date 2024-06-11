import React from "react";
import SignInWithNeynar from "../components/sign-in-with-neynar";
import Compose from "../components/compose";
import { useNeynarAuth } from "../context/neynar-auth-context";
import UserProfile from "../components/user-profile";

export default function Home() {
    const { user, setUser } = useNeynarAuth();

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div className="bg-black text-white h-screen flex flex-col items-center justify-center overflow-y-scroll">
            <div className="text-center mb-8 flex flex-col items-center">
                <p className="text-4xl mb-4">
                 ⚡️ Electronic
                </p>
                <p className="text-md mb-8">
                    A cast only <a className="underline" href="https://www.farcaster.xyz" target="_blank">Farcaster</a> client, built with <a className="underline" href="https://www.electronjs.org" target="_blank">Electron</a> and <a className="underline" href="https://docs.neynar.com/docs/how-to-let-users-connect-farcaster-accounts-with-write-access-for-free-using-sign-in-with-neynar-siwn" target="_blank">Sign In with Neynar</a> 
                </p>
                {!user && <SignInWithNeynar />}
                {user && (
                    <div className="flex flex-col items-center gap-4">
                        <UserProfile user={user} handleLogout={handleLogout} />
                        <Compose />
                    </div>
                )}
                <p className="absolute bottom-0 text-md mb-8">
                    Built by <a className="underline" href="https://www.dylansteck.com" target="_blank">Dylan Steck</a> | <a className="underline" href="https://www.github.com/dylsteck/electronic" target="_blank">GitHub</a>
                </p>
            </div>
        </div>
    );
}