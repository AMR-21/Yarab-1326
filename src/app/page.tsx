'use client';
import { differenceInDays } from 'date-fns';
import { useEffect, useState } from 'react';
import check from '/check.svg';
import Image from 'next/image';

const target = new Date('3-1-2026');

function formatNum(num: number) {
  return new Intl.NumberFormat('ar-EG', {
    style: 'decimal',
    useGrouping: false,
  }).format(num);
}

export default function Home() {
  const [remaining, setRemaining] = useState<number>(
    target.valueOf() - Date.now()
  );
  useEffect(() => {
    if (isNaN(remaining)) setRemaining(target.valueOf() - Date.now());

    const interval = setInterval(() => {
      setRemaining(target.valueOf() - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [remaining]);

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  return (
    <div className="max-h-dvh h-dvh bg-white text-black p-8 flex flex-col items-center">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-6xl font-bold">يارب</h1>
        <p className="text-xl">
          دفعة {formatNum(1)} / {formatNum(3)} / {String(formatNum(2026))}
        </p>

        <div className="flex items-center gap-2">
          <p className="text-3xl">
            {formatNum(differenceInDays(new Date(), new Date('1-1-2025')))}
          </p>
          <Image src={check} alt="check" className="size-8" />
        </div>
      </div>

      <div className="my-auto flex items-center">
        <div className="flex flex-col items-center sm:flex-row md:items-end w-fit gap-x-4 md:gap-x-8">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-2xl">ايام</p>
            <p className="text-5xl font-medium tabular-nums">
              {formatNum(days)}
            </p>
          </div>

          <p className="pb-1 hidden md:block md:pb-2.5 text-3xl shrink-0">:</p>

          <div className="flex flex-col items-center space-y-2">
            <p className="text-lg md:text-2xl">ساعات</p>
            <p className="text-5xl font-medium tabular-nums">
              {`${formatNum(hours)}`.padStart(2, formatNum(0))}
            </p>
          </div>
          <p className="pb-1 hidden md:block md:pb-2.5 text-3xl shrink-0">:</p>

          <div className="flex flex-col items-center space-y-2">
            <p className="text-2xl">دقايق</p>
            <p className="text-5xl font-medium tabular-nums">
              {`${formatNum(minutes)}`.padStart(2, formatNum(0))}
            </p>
          </div>
          <p className="pb-1 hidden md:block md:pb-2.5 text-3xl shrink-0">:</p>

          <div className="flex flex-col items-center space-y-2">
            <p className="text-2xl">ثواني</p>
            <p className="text-5xl font-medium tabular-nums">
              {`${formatNum(seconds)}`.padStart(2, formatNum(0))}
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-auto text-xl font-medium">
        عمرو - المحلاوي - عاصم
      </footer>
    </div>
  );
}
