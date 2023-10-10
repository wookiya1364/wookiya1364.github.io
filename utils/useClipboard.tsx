"use client";
import { useState } from 'react';

type setCopyFn = (text: string) => Promise<boolean>;

function useClipBoard(): [boolean, setCopyFn] {
  const [isCopy, setIsCopy] = useState<boolean>(false);

  const setCopy: setCopyFn = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopy(true);

      return true;
    } catch (error) {
      console.error(error);
      setIsCopy(false);

      return false;
    }
  };

  return [isCopy, setCopy];
}

export default useClipBoard;