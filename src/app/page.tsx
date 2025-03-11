'use client';
import {
  differenceInDays,
  intervalToDuration,
  isWithinInterval,
} from 'date-fns';
import { Fragment, useEffect, useState } from 'react';
import check from '/check.svg';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import confetti from 'canvas-confetti';

interface Duration {
  weeks: number;
  weeksDays: number;
  totalDays: number;
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}
const target = new Date('3-1-2026');

const endTraining = {
  start: new Date('3-11-2025'),
  end: new Date('3-14-2025'),
};

const endService = {
  start: new Date('2-25-2026'),
  end: new Date('3-1-2026'),
};

function formatNum(num: number) {
  return new Intl.NumberFormat('ar-EG', {
    style: 'decimal',
    useGrouping: false,
  }).format(num);
}

function getDuration() {
  const now = Date.now();
  const totalDays = differenceInDays(target, now);
  const weeks = Math.floor(totalDays / 7);
  const weeksDays = totalDays % 7;

  return {
    ...intervalToDuration({
      end: target.valueOf(),
      start: now,
    }),
    weeks,
    weeksDays,
    totalDays,
  };
}

function render(
  inputs: {
    label: string;
    value: number;
  }[],
  isDaysOnly?: boolean
) {
  return (
    <div className="">
      <div className="md:hidden flex flex-col items-center sm:flex-row md:items-end gap-y-1.5 md:gap-x-8 px-4 py-2.5 rounded-lg backdrop-blur-2xl bg-white/10 w-full">
        <div className="flex" dir="rtl">
          {inputs.slice(0, isDaysOnly ? 1 : 2).map((t, i, arr) => (
            <Fragment key={t.label}>
              <div className="flex flex-col items-center space-y-2 w-12">
                <p className="md:text-xl">{t.label}</p>
                <p className="text-4xl md:text-5xl font-medium tabular-nums">
                  {`${formatNum(t.value)}`?.padStart(2, formatNum(0))}
                </p>
              </div>

              {i !== arr.length - 1 && (
                <p className="pb-1 hidden md:block md:pb-2.5 text-3xl shrink-0">
                  :
                </p>
              )}
            </Fragment>
          ))}
        </div>

        <div className="flex" dir="rtl">
          {inputs.slice(isDaysOnly ? 1 : 2).map((t, i, arr) => (
            <Fragment key={t.label}>
              <div className="flex flex-col items-center space-y-2 w-12">
                <p className="md:text-xl">{t.label}</p>
                <p className="text-4xl md:text-5xl font-medium tabular-nums">
                  {`${formatNum(t.value)}`?.padStart(2, formatNum(0))}
                </p>
              </div>

              {i !== arr.length - 1 && (
                <p className="pb-1 hidden md:block md:pb-2.5 text-3xl shrink-0">
                  :
                </p>
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <div
        className="md:flex flex-col items-center sm:flex-row md:items-end w-fit gap-y-1.5 md:gap-x-8 px-4 py-2.5 rounded-lg backdrop-blur-2xl bg-white/10 hidden"
        dir="rtl"
      >
        {inputs.map((t, i, arr) => (
          <Fragment key={t.label}>
            <div className="flex flex-col items-center space-y-2 w-12">
              <p className="md:text-xl">{t.label}</p>
              <p className="text-4xl md:text-5xl font-medium tabular-nums">
                {`${formatNum(t.value)}`?.padStart(2, formatNum(0))}
              </p>
            </div>

            {i !== arr.length - 1 && (
              <p className="pb-1 hidden md:block md:pb-2.5 text-3xl shrink-0">
                :
              </p>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [remaining, setRemaining] = useState<Duration | null>();
  const [isCelebrating] = useState(
    isWithinInterval(Date.now(), {
      ...endTraining,
    }) ||
      isWithinInterval(Date.now(), {
        ...endService,
      })
  );

  useEffect(() => {
    if (!remaining) setRemaining(getDuration());
    const interval = setInterval(() => {
      setRemaining(getDuration());
    }, 1000);
    return () => clearInterval(interval);
  }, [remaining]);

  useEffect(() => {
    if (!isCelebrating) return;
    const duration = 20 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isCelebrating]);

  return (
    <div className="max-h-dvh h-dvh bg-white p-8 flex flex-col items-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-gray-200">
      <div className="flex flex-col items-center space-y-4">
        {/* Title */}
        <h1 className="text-6xl font-bold">يارب</h1>

        {/* Days Counter */}
        <div className="flex items-center gap-2 md:flex-col-reverse">
          <div>
            <div className="flex items-center gap-2">
              <p className="md:text-3xl text-xl">
                {formatNum(differenceInDays(new Date(), new Date('1-1-2025')))}
              </p>
              <Image src={check} alt="check" className="size-4 md:size-8" />
            </div>
          </div>
          <span className="md:hidden">&mdash;</span>

          <p className="text-xl">
            دفعة {formatNum(1)} / {formatNum(3)} / {String(formatNum(2026))}
          </p>
        </div>
      </div>

      {/* Timer */}
      <Tabs
        defaultValue="months"
        className="flex-grow  items-center flex flex-col  my-12 "
      >
        <TabsList className="" dir="rtl">
          <TabsTrigger value="weeks">اسابيع</TabsTrigger>
          <TabsTrigger value="months">شهور</TabsTrigger>
          <TabsTrigger value="days">ايام</TabsTrigger>
        </TabsList>

        <div className="flex w-full  h-1/2 items-center">
          <TabsContent value="weeks">
            {render([
              { label: 'اسابيع', value: remaining?.weeks || 0 },
              { label: 'ايام', value: remaining?.weeksDays || 0 },
              { label: 'ساعات', value: remaining?.hours || 0 },
              { label: 'دقايق', value: remaining?.minutes || 0 },
              { label: 'ثواني', value: remaining?.seconds || 0 },
            ])}
          </TabsContent>
          <TabsContent value="months">
            {render([
              { label: 'شهور', value: remaining?.months || 0 },
              { label: 'ايام', value: remaining?.days || 0 },
              { label: 'ساعات', value: remaining?.hours || 0 },
              { label: 'دقايق', value: remaining?.minutes || 0 },
              { label: 'ثواني', value: remaining?.seconds || 0 },
            ])}
          </TabsContent>

          <TabsContent value="days">
            {render(
              [
                { label: 'ايام', value: remaining?.totalDays || 0 },
                { label: 'ساعات', value: remaining?.hours || 0 },
                { label: 'دقايق', value: remaining?.minutes || 0 },
                { label: 'ثواني', value: remaining?.seconds || 0 },
              ],
              true
            )}
          </TabsContent>
        </div>
      </Tabs>

      <footer className="mt-auto text-center">
        <p>
          {' '}
          نهاية التدريب {`${formatNum(11)}-${formatNum(3)}`} &mdash;{' '}
          {`${formatNum(14)}-${formatNum(3)}`}
        </p>
        <p className="text-xl font-medium text-gray-400">
          عمرو - المحلاوي - عاصم
        </p>
      </footer>
    </div>
  );
}
