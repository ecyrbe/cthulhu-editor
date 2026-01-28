import { useState, useEffect, useRef, useCallback } from "react";
import { useDebounce } from "./useDebounce";

/**
 * A hook that manages a local value that is periodically synced to an external state.
 * Useful for inputs that should be snappy but update a heavy global state.
 *
 * @param externalValue The value from the external state (e.g. an atom or prop)
 * @param onSync Callback to update the external state
 * @param delay Delay in ms for debouncing the sync
 * @returns [localValue, setLocalValue, forceSync]
 */
export function useBufferedValue<T>(
  externalValue: T,
  onSync: (value: T) => void,
  delay = 500,
) {
  const [localValue, setLocalValue] = useState(externalValue);
  const lastSyncedValue = useRef(externalValue);

  const debouncedSync = useDebounce((val: T) => {
    if (val !== lastSyncedValue.current) {
      lastSyncedValue.current = val;
      onSync(val);
    }
  }, delay);

  // Sync back if external value changes (e.g. from a reset or external update)
  useEffect(() => {
    if (externalValue !== lastSyncedValue.current) {
      setLocalValue(externalValue);
      lastSyncedValue.current = externalValue;
    }
  }, [externalValue]);

  const updateValue = useCallback(
    (newValue: T) => {
      setLocalValue(newValue);
      debouncedSync(newValue);
    },
    [debouncedSync],
  );

  const forceSync = useCallback(() => {
    if (localValue !== lastSyncedValue.current) {
      lastSyncedValue.current = localValue;
      onSync(localValue);
    }
  }, [localValue, onSync]);

  return [localValue, updateValue, forceSync] as const;
}
