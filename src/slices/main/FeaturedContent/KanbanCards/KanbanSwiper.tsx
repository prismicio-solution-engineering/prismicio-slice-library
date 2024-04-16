"use client";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import clsx from "clsx";
import { Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Copy } from "@/components/modules/Copy";
import { BorderWrap } from "@/components/ui/BorderWrap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

const KanbanCard = ({
  item,
  theme
}: {
  item: any;
  theme: SliceZoneContext["theme"];
}) => {
  return (
    <BorderWrap
      theme={theme}
      muted
      innerClassName={clsx("py-6 px-8 relative", {
        "bg-white": theme === "light",
        "bg-gray-30": theme === "dark"
      })}
    >
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <Eyebrow size="sm" color={item.eyebrow_color} margin={false}>
          <span className="font-bold">{item.eyebrow}</span>
        </Eyebrow>
        <div className="text-sm flex items-center gap-2">
          <span
            className={clsx(
              "px-2 py-1 rounded-full text-white font-bold capitalize",
              {
                "bg-primary-green": item.tag === "new",
                "bg-primary-orange": item.tag === "update"
              }
            )}
          >
            {item.tag}
          </span>
        </div>
      </header>
      <div className="flex items-center gap-4 mt-6">
        <PrismicNextLink
          field={item.link}
          className="after:absolute after:inset-0"
        >
          <Heading field={item.heading} size="md" />
        </PrismicNextLink>

        <button
          className="relative z-10 text-gray-A4 hover:text-gray-15"
          onClick={() => {
            const url = isFilled.link(item.link) ? item.link.url : "";

            navigator.clipboard.writeText(url!);
          }}
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M57.98 33.1672C63.63 27.5172 63.63 18.3672 57.98 12.7172C52.98 7.71721 45.1 7.06721 39.35 11.1772L39.19 11.2872C37.75 12.3172 37.42 14.3172 38.45 15.7472C39.48 17.1772 41.48 17.5172 42.91 16.4872L43.07 16.3772C46.28 14.0872 50.67 14.4472 53.45 17.2372C56.6 20.3872 56.6 25.4872 53.45 28.6372L42.23 39.8772C39.08 43.0272 33.98 43.0272 30.83 39.8772C28.04 37.0872 27.68 32.6972 29.97 29.4972L30.08 29.3372C31.11 27.8972 30.77 25.8972 29.34 24.8772C27.91 23.8572 25.9 24.1872 24.88 25.6172L24.77 25.7772C20.65 31.5172 21.3 39.3972 26.3 44.3972C31.95 50.0472 41.1 50.0472 46.75 44.3972L57.98 33.1672ZM6.02003 30.8272C0.370032 36.4772 0.370032 45.6272 6.02003 51.2772C11.02 56.2772 18.9 56.9272 24.65 52.8172L24.81 52.7072C26.25 51.6772 26.58 49.6772 25.55 48.2472C24.52 46.8172 22.52 46.4772 21.09 47.5072L20.93 47.6172C17.72 49.9072 13.33 49.5472 10.55 46.7572C7.40003 43.5972 7.40003 38.4972 10.55 35.3472L21.77 24.1172C24.92 20.9672 30.02 20.9672 33.17 24.1172C35.96 26.9072 36.32 31.2972 34.03 34.5072L33.92 34.6672C32.89 36.1072 33.23 38.1072 34.66 39.1272C36.09 40.1472 38.1 39.8172 39.12 38.3872L39.23 38.2272C43.35 32.4772 42.7 24.5972 37.7 19.5972C32.05 13.9472 22.9 13.9472 17.25 19.5972L6.02003 30.8272Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <Copy
        field={item.subheading}
        theme={theme}
        muted
        className="mt-2"
        size="sm"
      />
    </BorderWrap>
  );
};

export const GithubChangelogSwiper = ({
  slice,
  theme
}: {
  slice: Content.MainFeaturedSliceKanbanCards;
  theme: SliceZoneContext["theme"];
}) => {
  const itemsColumn1 = slice.items.filter((item: any) => item.column === "1");
  const itemsColumn2 = slice.items.filter((item: any) => item.column === "2");
  const itemsColumn3 = slice.items.filter((item: any) => item.column === "3");

  return (
    <Swiper
      spaceBetween={24}
      slidesPerView={1.1}
      initialSlide={3}
      breakpoints={{
        680: {
          slidesPerView: 2.1
        },
        1024: {
          slidesPerView: 3
        }
      }}
      mousewheel={{
        forceToAxis: true
      }}
      modules={[Mousewheel]}
      className="h-full mt-6 lg:mt-12 sm-changelog-swiper"
    >
      <SwiperSlide
        key={1}
        className="flex h-full flex-col gap-6"
        style={{ height: "auto" }}
      >
        <Heading field={slice.primary.column_1_heading} size="md" />
        <div
          className={clsx(
            "flex flex-col gap-3 items-center p-3 rounded-xl grow",
            {
              "bg-gray-F7": theme === "light",
              "bg-gray-1F": theme === "dark"
            }
          )}
        >
          {itemsColumn1.map((item: any, index: number) => (
            <KanbanCard key={index} item={item} theme={theme} />
          ))}
        </div>
      </SwiperSlide>
      <SwiperSlide
        key={1}
        className="flex h-full flex-col gap-6"
        style={{ height: "auto" }}
      >
        <Heading field={slice.primary.column_2_heading} size="md" />
        <div
          className={clsx(
            "flex flex-col gap-3 items-center p-3 rounded-xl grow",
            {
              "bg-gray-F7": theme === "light",
              "bg-gray-1F": theme === "dark"
            }
          )}
        >
          {itemsColumn2.map((item: any, index: number) => (
            <KanbanCard key={index} item={item} theme={theme} />
          ))}
        </div>
      </SwiperSlide>
      <SwiperSlide
        key={1}
        className="flex h-full flex-col gap-6"
        style={{ height: "auto" }}
      >
        <Heading field={slice.primary.column_3_heading} size="md" />
        <div
          className={clsx(
            "flex flex-col gap-3 items-center p-3 rounded-xl grow",
            {
              "bg-gray-F7": theme === "light",
              "bg-gray-1F": theme === "dark"
            }
          )}
        >
          {itemsColumn3.map((item: any, index: number) => (
            <KanbanCard key={index} item={item} theme={theme} />
          ))}
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default GithubChangelogSwiper;
