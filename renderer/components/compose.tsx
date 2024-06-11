import React from "react";
import { useCast } from "../hooks/use-cast";
import { useNeynarAuth } from "../context/neynar-auth-context";
import { XCircleIcon } from "@heroicons/react/16/solid";

export default function Compose() {
  const [text, setText] = React.useState("");
  const postCast = useCast();
  const { user } = useNeynarAuth();
  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);
  const [parentUrl, setParentUrl] = React.useState("");
  const [parentHash, setParentHash] = React.useState("");
  const [isParentUrlChecked, setIsParentUrlChecked] = React.useState(false);
  const [isParentHashChecked, setIsParentHashChecked] = React.useState(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleParentUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsParentUrlChecked(event.target.checked);
    if (event.target.checked) {
      setIsParentHashChecked(false);
      setParentHash("");
    }
  };

  const handleParentHashChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsParentHashChecked(event.target.checked);
    if (event.target.checked) {
      setIsParentUrlChecked(false);
      setParentUrl("");
    }
  };

  const handlePost = async () => {
    if (!user || !user.signer_uuid) {
      setAlertMessage("Failed to post cast. User information is missing.");
      return;
    }

    if (isParentUrlChecked && !parentUrl) {
      setAlertMessage("Parent URL is checked but empty.");
      return;
    }

    if (isParentHashChecked && !parentHash) {
      setAlertMessage("Parent Hash is checked but empty.");
      return;
    }

    try {
      const response = await postCast({
        text,
        signer_uuid: user.signer_uuid,
        parent: isParentUrlChecked ? parentUrl : isParentHashChecked ? parentHash : undefined,
      });
      if (response && response.cast && response.cast.hash) {
        setAlertMessage(response.cast.hash);
      } else {
        setAlertMessage("Failed to post cast. No hash returned.");
      }
      setText("");
    } catch (error) {
      setAlertMessage("Failed to post cast.");
      console.error("Failed to post cast", error);
    }
  };

  return (
    <div className="bg-[#FFFFFF] text-[#000000] p-2 rounded-lg w-[60vw] max-w-md">
      <textarea
        value={text}
        onChange={handleTextChange}
        className="w-full p-2 bg-white text-black rounded-md mb-4 focus:outline-none"
        rows={4}
        placeholder="Start composing a new cast..."
      />
      <div className="flex flex-col space-y-4 mb-4">
        <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-lg">
          <input
            type="checkbox"
            checked={isParentUrlChecked}
            onChange={handleParentUrlChange}
          />
          <input
            type="text"
            value={parentUrl}
            onChange={(e) => setParentUrl(e.target.value)}
            className="flex-grow p-2 text-black rounded-md bg-gray-200 focus:outline-none"
            placeholder="Parent URL"
            disabled={!isParentUrlChecked}
          />
        </div>
        <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-lg">
          <input
            type="checkbox"
            checked={isParentHashChecked}
            onChange={handleParentHashChange}
          />
          <input
            type="text"
            value={parentHash}
            onChange={(e) => setParentHash(e.target.value)}
            className="flex-grow p-2 bg-gray-200 text-black rounded-md focus:outline-none"
            placeholder="Parent Hash"
            disabled={!isParentHashChecked}
          />
        </div>
      </div>
      <button
        onClick={handlePost}
        className="bg-[#7F5FC6] text-[#FFFFFF] font-bold py-2 px-10 rounded-lg"
      >
        Cast
      </button>
      {alertMessage ?
        alertMessage.startsWith('0x') ? 
        (
          <div className="flex flex-row gap-2 items-center mt-4 p-2 bg-[#8465CB] text-[#FFFFFF] rounded-md">
            Casted successfully! <a className="underline font-medium" href={`https://warpcast.com/${user.fname}/${alertMessage.slice(0, 10)}`} target="_blank">View here</a>
            <XCircleIcon className="h-4 w-4 ml-2 cursor-pointer" onClick={() => setAlertMessage(null)} />
          </div>
        )
         : 
         (
          <div className="flex flex-row gap-2 items-center mt-4 p-2 bg-[#EA3323] text-[#FFFFFF] rounded-md">
            {alertMessage}
            <XCircleIcon className="h-4 w-4 ml-2 cursor-pointer" onClick={() => setAlertMessage(null)} />
          </div>
        )
      : null }
    </div>
  );
}