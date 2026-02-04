'use client';

import Head from 'next/head';
import packageJson from '../../package.json';
import { useApp } from './LiffProvider';
import { PropsWithChildren } from 'react';
import { cn } from '../utils/cn';

const HomeBadge = ({
  children,
  type = 'secondary',
}: PropsWithChildren<{ type?: 'primary' | 'secondary' }>) => {
  return (
    <span
      className={cn(
        'first:rounded-l-xs last:rounded-r-xs',
        'inline-block px-[0.4em] py-[0.3em] text-[0.75rem] font-bold leading-none text-center whitespace-nowrap align-baseline',
        type === 'primary' &&
          'text-[#353a40] border border-[#353a40] bg-transparent pt-[calc(0.3em-1px)] pb-[calc(0.3em-1px)] px-[0.4em]',
        type === 'secondary' && 'text-white bg-[#353a40]',
      )}
    >
      {children}
    </span>
  );
};

const HomeButton = ({
  children,
  type,
}: PropsWithChildren<{ type: 'primary' | 'secondary' | 'tertiary' }>) => {
  return (
    <a
      href="https://developers.line.biz/en/docs/liff/developing-liff-apps/"
      target="_blank"
      rel="noreferrer"
      className={cn(
        'min-w-62.5 cursor-pointer inline-block font-normal text-center align-middle select-none border border-transparent py-1.5 px-3 text-lg sm:text-base leading-6 rounded-xs no-underline transition-[color,background-color,border-color,box-shadow] duration-150 ease-in-out',
        type === 'primary' &&
          'text-white bg-[#00B900] border-[#00B900] hover:bg-[#009300] hover:border-[#008600]',
        type === 'secondary' &&
          'text-white bg-[#353a40] border-[#353a40] hover:bg-[#24272b] hover:border-[#1e2124]',
        type === 'tertiary' &&
          'bg-transparent text-[#353a40] border-[#353a40] hover:bg-[#353a40]/10',
      )}
    >
      {children}
    </a>
  );
};

export default function Home() {
  const { liffObject, liffError } = useApp();

  console.log({ liffObject, liffError });

  return (
    <div>
      <Head>
        <title>LIFF Starter</title>
      </Head>
      <div className="py-20 px-8 text-center">
        <h1 className="text-5xl sm:text-8xl my-10">
          Welcome to <br />
          <a
            className="text-foreground"
            href="https://developers.line.biz/en/docs/liff/overview/"
          >
            LIFF Starter!
          </a>
        </h1>
        <div className="flex justify-center items-center flex-nowrap overflow-hidden mb-24">
          <HomeBadge type="primary">LIFF Starter</HomeBadge>
          <HomeBadge type="secondary">nextjs</HomeBadge>
          <HomeBadge type="primary">{packageJson.version}</HomeBadge>
          <HomeBadge type="secondary">
            <a
              href="https://github.com/line/line-liff-v2-starter"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </HomeBadge>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-4 flex-col lg:flex-row">
          <HomeButton type="primary">LIFF Documentation</HomeButton>
          <HomeButton type="tertiary">LIFF Playground</HomeButton>
          <HomeButton type="secondary">LINE Developers Console</HomeButton>
        </div>
      </div>
    </div>
  );
}
