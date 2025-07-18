import { useEffect, useState } from "react";

type Props = {
  startDateTime: string | Date;
  className?: string;
};

export default function TimerComponent({
  startDateTime,
  className = "",
}: Props) {
  const [elapsed, setElapsed] = useState("00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const start = new Date(startDateTime);
      const now = new Date();

      if (isNaN(start.getTime())) {
        setElapsed("00:00:00");
        return;
      }

      const diff = Math.max(now.getTime() - start.getTime(), 0);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const format = (n: number) => String(n).padStart(2, "0");

      setElapsed(`${format(hours)}:${format(minutes)}:${format(seconds)}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [startDateTime]);

  const [h, m, s] = elapsed.split(":");

  return (
    <div
      className={`gap-3 flex flex-row justify-center font-bold text-lg ${className}`}
    >
      <span>{h}</span>:<span>{m}</span>:<span>{s}</span>
    </div>
  );
}
