import React, { useState } from "react";
import { useCast } from "../hooks/use-cast";
import { useNeynarAuth } from "../context/neynar-auth-context";

export default function Compose() {
  const [text, setText] = useState("");
  const postCast = useCast();
  const { user } = useNeynarAuth();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [parentUrl, setParentUrl] = useState("");
  const [parentHash, setParentHash] = useState("");
  const [isParentUrlChecked, setIsParentUrlChecked] = useState(false);
  const [isParentHashChecked, setIsParentHashChecked] = useState(false);

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
        setAlertMessage(`Cast posted successfully! Hash: ${response.cast.hash}`);
      } else {
        setAlertMessage("Failed to post cast. No hash returned.");
      }
      setText(""); // Clear the textarea after posting
    } catch (error) {
      setAlertMessage("Failed to post cast.");
      console.error("Failed to post cast", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-md w-full max-w-md">
      <h2 className="text-lg mb-4">Cast below</h2>
      <textarea
        value={text}
        onChange={handleTextChange}
        className="w-full p-2 bg-gray-800 text-white rounded-md mb-4"
        rows={4}
        placeholder="Start typing a new cast here..."
      />
      <div className="flex flex-col space-y-4 mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isParentUrlChecked}
            onChange={handleParentUrlChange}
          />
          <input
            type="text"
            value={parentUrl}
            onChange={(e) => setParentUrl(e.target.value)}
            className="flex-grow p-2 bg-gray-800 text-white rounded-md"
            placeholder="Parent URL"
            disabled={!isParentUrlChecked}
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isParentHashChecked}
            onChange={handleParentHashChange}
          />
          <input
            type="text"
            value={parentHash}
            onChange={(e) => setParentHash(e.target.value)}
            className="flex-grow p-2 bg-gray-800 text-white rounded-md"
            placeholder="Parent Hash"
            disabled={!isParentHashChecked}
          />
        </div>
      </div>
      <button
        onClick={handlePost}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Cast
      </button>
      {alertMessage && (
        <div className="mt-4 p-2 bg-gray-800 text-white rounded-md">
          {alertMessage}
        </div>
      )}
    </div>
  );
}