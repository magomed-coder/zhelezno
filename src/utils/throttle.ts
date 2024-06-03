type CallbackFunction<T extends any[]> = (...args: T) => void;

export function throttle<T extends any[]>(
  cb: CallbackFunction<T>,
  delay: number = 1000
): (...args: T) => void {
  let shouldWait = false;
  let waitingArgs: T | null = null;

  const timeoutFunc = () => {
    if (waitingArgs === null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;

      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args: T) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);

    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}
