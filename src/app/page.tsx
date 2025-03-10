'use client';
import {
  differenceInDays,
  Duration,
  getTime,
  intervalToDuration,
} from 'date-fns';
import { useEffect, useState } from 'react';
import check from '/check.svg';
import Image from 'next/image';

const target = new Date('3-1-2026');

function getTimeComponents(remaining: number) {
  const now = new Date();
  const futureDate = new Date(now.getTime() + remaining);

  let years = futureDate.getFullYear() - now.getFullYear();
  let months = futureDate.getMonth() - now.getMonth();
  let days = futureDate.getDate() - now.getDate();

  if (days < 0) {
    // Adjust the month if days are negative
    const lastMonth = new Date(
      futureDate.getFullYear(),
      futureDate.getMonth(),
      0
    );
    days += lastMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  const hours = Math.floor(
    (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  return { years, months, days, hours, minutes, seconds };
}

function formatNum(num: number) {
  return new Intl.NumberFormat('ar-EG', {
    style: 'decimal',
    useGrouping: false,
  }).format(num);
}

export default function Home() {
  const [remaining, setRemaining] = useState<Duration | null>();

  useEffect(() => {
    if (!remaining)
      setRemaining(
        intervalToDuration({
          start: Date.now(),
          end: target.valueOf(),
        })
      );
    const interval = setInterval(() => {
      setRemaining(
        intervalToDuration({
          start: Date.now(),
          end: target.valueOf(),
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [remaining]);

  return (
    <div className="max-h-dvh h-dvh bg-white text-black p-8 flex flex-col items-center">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-6xl font-bold">يارب</h1>
        <div className="flex items-center gap-2 md:flex-col-reverse">
          <div className="flex items-center gap-2">
            <p className="md:text-3xl text-xl">
              {formatNum(differenceInDays(new Date(), new Date('1-1-2025')))}
            </p>
            <Image src={check} alt="check" className="size-4 md:size-8" />
          </div>
          <span className="md:hidden">&mdash;</span>
          <p className="text-xl">
            دفعة {formatNum(1)} / {formatNum(3)} / {String(formatNum(2026))}
          </p>
        </div>
      </div>

      <div className="my-auto flex items-center">
        <div className="flex flex-col items-center sm:flex-row md:items-end w-fit gap-x-4 md:gap-x-8">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-2xl">شهور</p>
            <p className="text-5xl font-medium tabular-nums">
              {`${formatNum(remaining?.months || 0)}`?.padStart(
                2,
                formatNum(0)
              )}
            </p>
          </div>

          <p className="pb-1 hidden md:block md:pb-2.5 text-3xl shrink-0">:</p>

          <div className="flex flex-col items-center space-y-2">
            <p className="text-2xl">ايام</p>
            <p className="text-5xl font-medium tabular-nums">
              {`${formatNum(remaining?.days || 0)}`?.padStart(2, formatNum(0))}
            </p>
          </div>

          <p className="pb-1 hidden md:block md:pb-2.5 text-3xl shrink-0">:</p>

          <div className="flex flex-col items-center space-y-2">
            <p className="text-lg md:text-2xl">ساعات</p>
            <p className="text-5xl font-medium tabular-nums">
              {`${formatNum(remaining?.hours || 0)}`.padStart(2, formatNum(0))}
            </p>
          </div>
          <p className="pb-1 hidden md:block md:pb-2.5 text-3xl shrink-0">:</p>

          <div className="flex flex-col items-center space-y-2">
            <p className="text-2xl">دقايق</p>
            <p className="text-5xl font-medium tabular-nums">
              {`${formatNum(remaining?.minutes || 0)}`.padStart(
                2,
                formatNum(0)
              )}
            </p>
          </div>
          <p className="pb-1 hidden md:block md:pb-2.5 text-3xl shrink-0">:</p>

          <div className="flex flex-col items-center space-y-2">
            <p className="text-2xl">ثواني</p>
            <p className="text-5xl font-medium tabular-nums">
              {`${formatNum(remaining?.seconds || 0)}`.padStart(
                2,
                formatNum(0)
              )}
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
