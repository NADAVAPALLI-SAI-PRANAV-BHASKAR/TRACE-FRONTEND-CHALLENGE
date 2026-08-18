"use client";

import { useEffect, useState } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(onSuccess: () => void) {
  const [keyIndex, setKeyIndex] = useState(0);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const expected = KONAMI_SEQUENCE[keyIndex];

      if (key === expected || (expected.length === 1 && key === expected.toLowerCase())) {
        const nextIndex = keyIndex + 1;
        if (nextIndex === KONAMI_SEQUENCE.length) {
          onSuccess();
          setKeyIndex(0);
        } else {
          setKeyIndex(nextIndex);
        }
      } else {
        // Reset if mismatched, but check if key is start of sequence
        setKeyIndex(key === "ArrowUp" ? 1 : 0);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyIndex, onSuccess]);
}
