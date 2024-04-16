"use client";

import dynamic from "next/dynamic";

export const NotFoundAnimation = () => {
  const DynamicLottie = dynamic(() => import("@/components/ui/LottiePlayer"), {
    ssr: false
  });

  return (
    <div>
      <DynamicLottie
        src={"/lottie/error.lottie"}
        alt={"Animated abstract illustration showing an impossible maze"}
      />
    </div>
  );
};
