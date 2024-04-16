"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

export type CodeBlockProps = {
  code: string;
  formatted: string;
  language: string;
  category: string;
};

export const CodeBlock = ({
  code,
  formatted,
  language,
  category
}: CodeBlockProps) => {
  const [copyText, setCopyText] = useState<string>("Copy");

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopyText("Copied!");

    setTimeout(() => {
      setCopyText("Copy");
    }, 1500);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => {
          copyCode(code);
        }}
        style="secondary"
        size="xs"
        as="button"
        theme="dark"
        className="absolute top-2 right-2 z-10 w-16 px-0 py-1 bg-gray-15"
      >
        {copyText}
      </Button>
      <div
        className="font-mono p-6 rounded-xl text-sm leading-6 overflow-auto bg-gray-15 text-gray-F7 pr-40"
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    </div>
  );
};
