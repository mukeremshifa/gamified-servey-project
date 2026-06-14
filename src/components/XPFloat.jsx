import { useEffect } from "react";

export default function XPFloat({ amount, onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="absolute top-20 right-10 pointer-events-none">
      <div className="text-blue-500 font-bold text-2xl animate-xpFloat">
        +{amount} XP
      </div>
    </div>
  );
}
