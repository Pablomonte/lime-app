import { useEffect, useRef, useState } from "preact/hooks";

/**
 * Custom hook to toggle a boolean state
 * Replaces react-use's useToggle to reduce bundle size
 *
 * @param {boolean} initialValue - Initial toggle state
 * @returns {[boolean, (e?: any) => void]} - [state, toggle function]
 */
export const useToggle = (initialValue = false) => {
    const [state, setState] = useState(initialValue);
    /** @type {(e?: any) => void} */
    const toggle = (_e) => setState((prev) => !prev);
    return [state, toggle];
};

/**
 * Custom hook for intervals
 * Replaces react-use's useInterval to reduce bundle size
 *
 * Uses useRef to persist callback reference, preventing interval
 * from being recreated on every render.
 *
 * @param {function} callback - Function to call on interval
 * @param {number|null} delay - Delay in milliseconds (null to pause)
 */
export const useInterval = (callback, delay) => {
    /** @type {{ current: Function }} */
    const savedCallback = useRef(callback);

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval
    useEffect(() => {
        if (delay === null || delay === undefined) {
            return;
        }

        const id = setInterval(() => savedCallback.current(), delay);
        return () => clearInterval(id);
    }, [delay]);
};
