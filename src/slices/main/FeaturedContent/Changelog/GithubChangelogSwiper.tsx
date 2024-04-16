"use client";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import clsx from "clsx";
import Markdown from "react-markdown";
import { Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "@/components/ui/Button";
import { SliceZoneContext } from "@/lib/types";

export const GithubChangelogSwiper = ({
  updates,
  theme
}: {
  updates: any;
  theme: SliceZoneContext["theme"];
}) => {
  const formatBody = (body: string) => {
    const firstListItem = body.match(/- (.*)/)?.[1];
    return firstListItem ? firstListItem : null;
  };

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
      {updates?.map((release: any, index: number) => (
        <SwiperSlide
          key={index}
          className="flex h-full flex-col items-center group"
          style={{ height: "auto" }}
        >
          <div
            key={release.id}
            className="group flex flex-col w-full h-full relative"
          >
            <div className="flex items-center relative h-[6px] w-full mt-5 mb-7">
              <div className="h-4 w-4 bg-white border-4 border-secondary-purple rounded-full z-10 absolute left-1/2 -translate-x-1/2" />
              <div
                className={clsx(
                  "absolute top-0 bottom-0 flex justify-end h-[6px]",
                  {
                    "group-first:left-0 group-first:right-0 rounded-l-full bg-secondary-purple":
                      index === 0,
                    "-left-6 -right-6 bg-secondary-purple": index === 1,
                    "group-last:left-0 group-last:right-0 rounded-r-full":
                      index === 2
                  }
                )}
              >
                <div className="w-1/2 hidden group-last:block bg-secondary-purple" />
                <div className="w-1/2 grid-cols-[repeat(19,_minmax(0,_1fr))] hidden group-last:grid overflow-hidden">
                  <div className="bg-secondary-purple col-span-2 h-[6px] rounded-full"></div>
                  <div className="bg-secondary-purple col-span-2 col-start-4 h-[6px] rounded-full"></div>
                  <div className="bg-secondary-purple col-span-2 col-start-7 h-[6px] rounded-full"></div>
                  <div className="bg-secondary-purple col-span-2 col-start-10 h-[6px] rounded-full"></div>
                  <div className="bg-secondary-purple col-span-2 col-start-[13] h-[6px] rounded-full"></div>
                  <div className="bg-secondary-purple col-span-2 col-start-[16] h-[6px] rounded-full"></div>
                  <div className="bg-secondary-purple col-span-2 col-start-[19] h-[6px] rounded-full"></div>
                </div>
              </div>
            </div>
            <div
              className={clsx(
                "border-2 relative rounded-xl py-6 px-8 flex flex-col justify-between h-full",
                {
                  "border-gray-EE bg-white": theme === "light",
                  "border-gray-30 bg-gray-1F": theme === "dark"
                }
              )}
            >
              <div
                className={clsx(
                  "w-4 h-4 border-t-2 border-l-2 rotate-45 absolute top-0 left-1/2 -translate-x-1/2 -mt-[9px]",
                  {
                    "border-gray-EE bg-white": theme === "light",
                    "border-gray-30 bg-gray-1F": theme === "dark"
                  }
                )}
              />
              <div>
                <header className="flex items-center gap-2 justify-between flex-wrap">
                  <h3 className="text-md">{release.name}</h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={clsx({
                        "text-gray-50": theme === "light",
                        "text-gray-A4": theme === "dark"
                      })}
                    >
                      {new Date(release.published_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        }
                      )}
                    </span>
                    {index === 0 && (
                      <span className="text-xs py-0.5 px-2 bg-primary-purple text-white font-bold rounded-full">
                        Latest
                      </span>
                    )}
                  </div>
                </header>
                <div
                  className={clsx("mt-4", {
                    "text-gray-50": theme === "light",
                    "text-gray-A4": theme === "dark"
                  })}
                >
                  <ul className="list-disc pl-6">
                    <li>
                      <Markdown>{formatBody(release.body)}</Markdown>
                    </li>
                  </ul>
                  <p>...</p>
                </div>
              </div>
              <footer className="flex items-center justify-between gap-4 mt-4 flex-wrap">
                <a
                  href={release.author.url}
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <img
                    src={release.author.avatar_url}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{release.author.login}</span>
                </a>
                <Button
                  as="a"
                  href={release.html_url}
                  target="_blank"
                  style="tertiary"
                  className="after:absolute after:inset-0"
                >
                  More on GitHub
                </Button>
              </footer>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default GithubChangelogSwiper;
