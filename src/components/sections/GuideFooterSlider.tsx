"use client";

import "swiper/css";

import { useEffect, useState } from "react";
import { Mousewheel, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import ArrowIcon from "@/assets/svg/arrow.svg";
import { BlogPostCard } from "@/components/modules/BlogPostCard";
import { Button } from "@/components/ui/Button";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import { asText } from "@prismicio/client";

import type { BlogDocumentWithExtras } from "@/lib/types";

type Props = {
  blogs: BlogDocumentWithExtras[];
  currentUid: string;
};

export const GuideFooterSlider = ({ blogs, currentUid }: Props) => {
  const [guideSwiper, setGuideSwiper] = useState<any>(null);
  const win = useWindowSize();

  const currentPostIndex = blogs.findIndex((blog) => blog.uid === currentUid);
  const filteredBlogs = blogs.filter((blog) => blog.uid !== currentUid);

  useEffect(() => {
    if (guideSwiper) {
      if (win.width <= 680) {
        guideSwiper.slideTo(currentPostIndex);
      } else {
        guideSwiper.slideTo(currentPostIndex - 1);
      }
    }
  }, [guideSwiper, win, currentPostIndex]);

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        breakpoints={{
          300: {
            slidesPerView: 1
          },
          680: {
            slidesPerView: 2
          }
        }}
        mousewheel={{
          forceToAxis: true
        }}
        onSwiper={setGuideSwiper}
        modules={[Navigation, Mousewheel]}
        className="guides-footer-swiper"
        navigation={{
          prevEl: `.guides-footer-swiper-nav .prev`,
          nextEl: `.guides-footer-swiper-nav .next`,
          disabledClass: "guides-footer-swiper-nav-disabled"
        }}
      >
        {filteredBlogs.map((blog, i) => {
          const index = blogs.findIndex((b) => b.uid === blog.uid) + 1;
          const titleOverride = `Part ${index}: ${asText(blog.data.title)}`;
          return (
            <SwiperSlide
              key={i}
              className="flex h-full"
              style={{ height: "auto" }}
            >
              <BlogPostCard
                key={i}
                post={blog}
                size="sm"
                padding
                border
                description={false}
                author={false}
                titleOverride={titleOverride}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex justify-between guides-footer-swiper-nav mt-4">
        <Button as="button" style="tertiary" className="prev flex gap-1">
          <ArrowIcon className="w-6 h-6 rotate-180 -mt-0.5" />
          Previous
        </Button>
        <Button as="button" style="tertiary" className="next flex gap-1">
          Next
          <ArrowIcon className="w-6 h-6 -mt-0.5" />
        </Button>
      </div>
    </div>
  );
};
