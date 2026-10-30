'use client';

import { useEffect, useState } from 'react';

// Reads a book's length (in seconds) from its audio file's metadata.
// Returns null until it is known.
export function useAudioDuration(audioLink?: string): number | null {
  const [loaded, setLoaded] = useState<{ src: string; seconds: number } | null>(null);

  useEffect(() => {
    if (!audioLink) return;

    const audio = new Audio();
    audio.preload = 'metadata';

    const onLoaded = () => {
      if (Number.isFinite(audio.duration)) {
        setLoaded({ src: audioLink, seconds: audio.duration });
      }
    };

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.src = audioLink;

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeAttribute('src');
      audio.load();
    };
  }, [audioLink]);

  return loaded && loaded.src === audioLink ? loaded.seconds : null;
}
