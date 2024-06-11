import Image from "next/image";
import { FarcasterUser } from "../context/neynar-auth-context";
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/16/solid';

export default function UserProfile({ user, handleLogout }: { user: FarcasterUser | null, handleLogout: () => void}){
    return(
        <div className="bg-[#FFFFFF] rounded-2xl p-2 pr-5 items-center flex flex-row gap-2 max-w-max">
            <Image src={user?.pfp ?? ""} alt={`${user?.displayName}'s profile picture`} width={50} height={50} className="rounded-full" />
            <p className="font-medium text-[#000000]/90">@{user.fname ?? ""}</p>
            <ArrowLeftStartOnRectangleIcon className="w-6 h-6 text-[#EE4B2B]/90 ml-2 cursor-pointer" onClick={() => handleLogout()}  />
        </div>
    )
}