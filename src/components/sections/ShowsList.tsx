"use client";

import clsx from "clsx";
import NextImage from "next/image";
import { useState } from "react";

import ProductMeetup from "@/assets/svg/product-meetup.svg";
import YouTube from "@/assets/svg/youtube.svg";
import { Copy } from "@/components/modules/Copy";
import FormMeetupSignup from "@/components/sections/FormMeetupSignupModal";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

type ShowCardProps = {
  show: Content.ShowDocument;
  upcoming?: boolean;
  latest?: boolean;
};

type ShowsListProps = {
  shows: Content.ShowDocument[];
  page: Content.ShowsDocument;
};

const today = new Date().getTime();

const ShowCard = ({
  show,
  upcoming = false,
  latest = false
}: ShowCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    `https://img.youtube.com/vi/${show.data.youtube_id}/maxresdefault.jpg`
  );
  const fallbackSrc = `https://img.youtube.com/vi/${show.data.youtube_id}/hqdefault.jpg`;

  const formattedDate =
    show.data.date &&
    new Date(show.data.date).toLocaleString("en-US", {
      month: "short",
      year: "numeric"
    });

  return (
    <div
      className={clsx({
        "mt-10 mb-20 mb:mb-40": upcoming || latest
      })}
    >
      <div
        className={clsx("relative", {
          "bg-gray-1F rounded-2xl p-6 sm:flex lg:flex-col xl:flex-row gap-6 items-start":
            !upcoming && !latest
        })}
      >
        {!upcoming && (
          <a
            href={`https://www.youtube.com/watch?v=${show.data.youtube_id}&feature=youtu.be`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0"
            aria-label={`Watch ${asText(show.data.title)} on YouTube`}
          />
        )}
        {!upcoming && !latest && (
          <NextImage
            src={imgSrc}
            onError={() => {
              setImgSrc(fallbackSrc);
            }}
            alt=""
            loading="lazy"
            width={640}
            height={360}
            className="rounded-lg sm:w-1/2 lg:w-full xl:w-1/2"
          />
        )}
        <div
          className={clsx({
            "mt-6 sm:mt-0 sm:w-1/2 lg:w-full xl:w-1/2": !upcoming && !latest
          })}
        >
          <span className="font-bold text-primary-purple">
            {latest && <span>Most recent: Episode {show.data.episode} - </span>}
            {!latest && <span>Episode {show.data.episode} - </span>}
            {show.data.date && (
              <time dateTime={show.data.date}>{formattedDate}</time>
            )}
          </span>
          <Heading field={show.data.title} size="md" className="mt-2" />
          <Copy
            field={show.data.description}
            muted
            className="mt-4 tracking-tight"
            theme="dark"
          />
        </div>
      </div>
      {(upcoming || latest) && (
        <div>
          <Button
            as="button"
            style="primary"
            onClick={() => setModalOpen(true)}
            className="mt-6"
            id="subscribeToTheCalendar"
            theme="dark"
          >
            Subscribe to the calendar
          </Button>
          <FormMeetupSignup
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export const ShowsList = ({ shows, page }: ShowsListProps) => {
  return (
    <div className="relative light-copy flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 relative mt-24 lg:mt-0">
        <div className="sticky top-0 h-[100vw] lg:h-screen -mt-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-gray-15 to-transparent z-10 flex flex-col items-center justify-center">
            <h2
              className="font-headings font-semibold text-[14px] opacity-75"
              style={{
                textShadow: "0 0 1px 1px rgba(0, 0, 0, 1)"
              }}
            >
              A PRISMIC ORIGINAL SHOW
            </h2>
            <ProductMeetup className="w-full max-w-[256px] mt-8 h-auto" />
            <YouTube className="h-10 w-auto mt-8" />
          </div>
          <video
            autoPlay
            muted
            playsInline
            loop
            width="100%"
            height="inherit"
            poster="/no-signal.jpg"
            className="absolute inset-0 h-full object-cover lg:top-24"
          >
            <source
              src="https://res.cloudinary.com/dmtf1daqp/video/upload/q_auto/v1621258966/prismic-pm_ibyhar.mp4"
              type="video/mp4"
            />
            <source
              src="https://res.cloudinary.com/dmtf1daqp/video/upload/q_auto/v1621258966/prismic-pm_ibyhar.webm"
              type="video/webm"
            />
            <source
              src="https://res.cloudinary.com/dmtf1daqp/video/upload/q_auto/v1621258966/prismic-pm_ibyhar.ogv"
              type="video/ogg"
            />
          </video>
        </div>
      </div>
      <div className="container lg:mx-0 lg:w-1/2 lg:max-w-[30.5rem] xl:max-w-[38.5rem] 2xl:max-w-[40.25rem] 3xl:max-w-[43.5rem] mb-10">
        <section className="lg:pt-40">
          <Heading field={page.data.title} size="3xl" />
          {shows.map((show, index) => {
            const showDate = show.data.date ? Date.parse(show.data.date) : 0;

            if (showDate <= today) {
              if (index === 0) {
                return <ShowCard key={index} show={show} latest />;
              } else {
                return;
              }
            } else {
              return <ShowCard key={index} show={show} upcoming />;
            }
          })}
          <Heading field={page.data.sub_title} size="2xl" />
          <Copy
            field={page.data.description}
            muted
            className="mt-6"
            size="lg"
            theme="dark"
          />
          <div>
            {page.data.boxes.map((box, index) => (
              <div
                key={index}
                className="mt-6 first:mt-16 bg-gray-1F rounded-xl overflow-hidden"
              >
                <PrismicNextImage field={box.image} className="w-full" />
                <div className="p-14 pt-0 -mt-6">
                  <Heading field={box.title} size="lg" />
                  <Copy
                    field={box.description}
                    muted
                    className="mt-6"
                    theme="dark"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <Heading
            field={page.data.replays_title}
            size="2xl"
            className="mt-20 lg:mt-40"
          />
          <div className="flex flex-col gap-8 mt-10">
            {shows.map((show, index) => {
              const showDate = show.data.date ? Date.parse(show.data.date) : 0;

              if (showDate > today) {
                return null;
              } else {
                return <ShowCard key={index} show={show} />;
              }
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
