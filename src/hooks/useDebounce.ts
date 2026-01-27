import { useCallback, useRef, useEffect } from "react";

/**
 * A custom hook that returns a debounced version of a callback.
 * @param callback The function to debounce.
 * @param delay The delay in milliseconds.
 * @returns A debounced version of the callback.
 */
export function useDebounce<A extends unknown[], R>(
  callback: (...args: A) => R,
  delay: number,
): (...args: A) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);

  // Always keep the latest callback to avoid stale closures
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: A) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay],
  );
}
