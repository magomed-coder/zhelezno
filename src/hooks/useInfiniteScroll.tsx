import { useEffect, useCallback, MutableRefObject, useRef } from "react";

interface UseScrollProps {
  targetRef: MutableRefObject<HTMLElement | null>;
  loadMore: () => void;
  loading: boolean;
}

const useScroll = ({ targetRef, loadMore, loading }: UseScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        loadMore();
      }
    },
    [loading, loadMore]
  );

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver(observerCallback, options);

    if (observerRef.current && targetRef.current) {
      const currentObserver = observerRef.current;
      currentObserver.observe(targetRef.current);

      return () => {
        if (currentObserver) {
          currentObserver.disconnect();
        }
      };
    }
  }, [observerCallback, targetRef, observerRef]);
};

export default useScroll;
