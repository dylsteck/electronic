import React from "react";
import SignInWithNeynar from "../components/sign-in-with-neynar";
import Compose from "../components/compose";
import { useNeynarAuth } from "../context/neynar-auth-context";

export default function Home() {
    const { user, setUser } = useNeynarAuth();

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div className="bg-black text-white h-screen flex flex-col items-center justify-center">
            <div className="text-center mb-8">
                <p className="text-4xl mb-4">
                    Electronic
                </p>
                <p className="text-md mb-8">
                    A cast only <a className="underline" href="https://www.farcaster.xyz" target="_blank">Farcaster</a> client, built on <a className="underline" href="https://www.electronjs.org" target="_blank">Electron</a>
                </p>
                {!user && <SignInWithNeynar />}
                {user && (
                    <div>
                        <p className="text-md mb-4">Welcome, {user.displayName}!</p>
                        <button 
                            className="mb-8 mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                        <Compose />
                    </div>
                )}
            </div>
        </div>
    );
}