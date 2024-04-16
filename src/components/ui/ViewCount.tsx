"use client";

import useSWR from 'swr';

import EyeIcon from '@/assets/svg/eye.svg';

interface BlogViewCountProps {
  pid: string;
}

const fetcher = async (input: RequestInfo) => {
  const res: Response = await fetch(input);
  return await res.json();
};

export const ViewCount = ({ pid }: BlogViewCountProps) => {
  const { data } = useSWR(`/api/views/${pid}`, fetcher);

  if (!data?.total) return null;

  return (
    <div className="flex items-center">
      <EyeIcon className="inline-block w-6 h-6 mr-1" />
      {data?.total ? `${data.total}` : `0`}
    </div>
  );
};
