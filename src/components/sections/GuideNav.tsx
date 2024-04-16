"use client";

import 'swiper/css';
import 'swiper/css/navigation';

import clsx from 'clsx';
import Link from 'next/link';
import { Mousewheel, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ArrowIcon from '@/assets/svg/arrow.svg';
import { asText, Content, isFilled } from '@prismicio/client';

import type { GuideNavProps } from "@/lib/types";

type Props = {
  data?: GuideNavProps;
};

export const GuideNav = ({ data }: Props) => {
  if (!data || !data.guide) return null;

  return (
    <div
      className={clsx(
        "sticky top-80 z-10 text-sm font-semibold guide-nav-bar-swiper-wrapper",
        {
          "bg-quaternary-purple": data.guide.data.color === "purple",
          "bg-quaternary-blue": data.guide.data.color === "blue",
          "bg-quaternary-green": data.guide.data.color === "green",
          "bg-quaternary-orange": data.guide.data.color === "orange",
          "bg-quaternary-pink": data.guide.data.color === "pink"
        }
      )}
    >
      <div className="container flex items-center whitespace-nowrap py-3 relative">
        <button
          className={clsx(
            "prev absolute z-10 left-6 lg:left-8 top-0 bottom-0 pr-12",
            {
              "from-quaternary-purple via-quaternary-purple to-transparent bg-gradient-to-r":
                data.guide.data.color === "purple",
              "from-quaternary-blue via-quaternary-blue to-transparent bg-gradient-to-r":
                data.guide.data.color === "blue",
              "from-quaternary-green via-quaternary-green to-transparent bg-gradient-to-r":
                data.guide.data.color === "green",
              "from-quaternary-orange via-quaternary-orange to-transparent bg-gradient-to-r":
                data.guide.data.color === "orange",
              "from-quaternary-pink via-quaternary-pink to-transparent bg-gradient-to-r":
                data.guide.data.color === "pink"
            }
          )}
        >
          <ArrowIcon className="w-6 h-6 rotate-180" />
        </button>
        <Swiper
          spaceBetween={24}
          slidesPerView="auto"
          centerInsufficientSlides={false}
          mousewheel={{
            forceToAxis: true
          }}
          modules={[Navigation, Mousewheel]}
          className="guide-nav-bar-swiper"
          style={{
            margin: 0
          }}
          navigation={{
            prevEl: `.guide-nav-bar-swiper-wrapper .prev`,
            nextEl: `.guide-nav-bar-swiper-wrapper .next`,
            disabledClass: "pointer-events-none opacity-0"
          }}
        >
          <SwiperSlide key={"first"} style={{ height: "auto", width: "auto" }}>
            <Link
              href={`/guides/${data.guide.uid}`}
              className={clsx("font-bold py-1.5 px-3 rounded-full block", {
                "bg-primary-orange text-white":
                  data.guide.data.color === "orange" &&
                  data.guide.uid === data.uid,
                "bg-primary-pink text-white":
                  data.guide.data.color === "pink" &&
                  data.guide.uid === data.uid,
                "bg-primary-purple text-white":
                  data.guide.data.color === "purple" &&
                  data.guide.uid === data.uid,
                "bg-primary-blue text-white":
                  data.guide.data.color === "blue" &&
                  data.guide.uid === data.uid,
                "bg-primary-green text-white":
                  data.guide.data.color === "green" &&
                  data.guide.uid === data.uid,
                "bg-tertiary-orange":
                  data.guide.data.color === "orange" &&
                  data.guide.uid !== data.uid,
                "bg-tertiary-pink":
                  data.guide.data.color === "pink" &&
                  data.guide.uid !== data.uid,
                "bg-tertiary-purple":
                  data.guide.data.color === "purple" &&
                  data.guide.uid !== data.uid,
                "bg-tertiary-blue":
                  data.guide.data.color === "blue" &&
                  data.guide.uid !== data.uid,
                "bg-tertiary-green":
                  data.guide.data.color === "green" &&
                  data.guide.uid !== data.uid
              })}
            >
              {isFilled.keyText(data.guide.data.short_name)
                ? data.guide.data.short_name
                : asText(data.guide.data.title)}
            </Link>
          </SwiperSlide>
          {data.guide.data.blogs.map(
            (blog, i) =>
              isFilled.contentRelationship<
                "blog",
                string,
                Content.BlogDocument["data"]
              >(blog.blog) && (
                <SwiperSlide
                  key={i}
                  style={{ height: "auto", width: "auto" }}
                  className="flex"
                >
                  <Link
                    key={blog.blog.id}
                    href={`/blog/${blog.blog.uid}`}
                    className={clsx("flex items-center", {
                      "font-bold": blog.blog.uid === data.uid,
                      "text-primary-purple":
                        blog.blog.uid === data.uid &&
                        data.guide?.data.color === "purple",
                      "text-primary-blue":
                        blog.blog.uid === data.uid &&
                        data.guide?.data.color === "blue",
                      "text-primary-green":
                        blog.blog.uid === data.uid &&
                        data.guide?.data.color === "green",
                      "text-primary-orange":
                        blog.blog.uid === data.uid &&
                        data.guide?.data.color === "orange",
                      "text-primary-pink":
                        blog.blog.uid === data.uid &&
                        data.guide?.data.color === "pink"
                    })}
                  >
                    {data.guide?.data.numbered_navigation && (
                      <span
                        className={clsx(
                          "rounded-full w-5 h-5 block text-center leading-5",
                          {
                            "text-white mr-1": blog.blog.uid === data.uid,
                            "bg-primary-purple":
                              blog.blog.uid === data.uid &&
                              data.guide?.data.color === "purple",
                            "bg-primary-blue":
                              blog.blog.uid === data.uid &&
                              data.guide?.data.color === "blue",
                            "bg-primary-green":
                              blog.blog.uid === data.uid &&
                              data.guide?.data.color === "green",
                            "bg-primary-orange":
                              blog.blog.uid === data.uid &&
                              data.guide?.data.color === "orange",
                            "bg-primary-pink":
                              blog.blog.uid === data.uid &&
                              data.guide?.data.color === "pink"
                          }
                        )}
                      >
                        {i + 1}
                        {blog.blog.uid !== data.uid && <span>.</span>}
                      </span>
                    )}
                    {isFilled.keyText(blog.blog.data?.short_name)
                      ? blog.blog.data?.short_name
                      : asText(blog.blog.data?.title)}
                  </Link>
                </SwiperSlide>
              )
          )}
        </Swiper>
        <button
          className={clsx(
            "next absolute z-10 right-6 lg:right-8 top-0 bottom-0 pl-12",
            {
              "from-quaternary-purple via-quaternary-purple to-transparent bg-gradient-to-l":
                data.guide.data.color === "purple",
              "from-quaternary-blue via-quaternary-blue to-transparent bg-gradient-to-l":
                data.guide.data.color === "blue",
              "from-quaternary-green via-quaternary-green to-transparent bg-gradient-to-l":
                data.guide.data.color === "green",
              "from-quaternary-orange via-quaternary-orange to-transparent bg-gradient-to-l":
                data.guide.data.color === "orange",
              "from-quaternary-pink via-quaternary-pink to-transparent bg-gradient-to-l":
                data.guide.data.color === "pink"
            }
          )}
        >
          <ArrowIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
