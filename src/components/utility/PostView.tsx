"use client";

import { useEffect } from 'react';

export const PostView = ({ pid }: { pid: string }) => {
  useEffect(() => {
    if (!pid) return;

    fetch(`/api/views/${pid}`, {
      method: "POST"
    });
  }, [pid]);

  return <></>;
};
