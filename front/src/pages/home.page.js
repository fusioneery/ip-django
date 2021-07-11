import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "react-loader-spinner";

import { Layout } from "../components/Layout/Layout";
import { http } from "../services/http.service";
import { capitalizeFirstLetter, getVideosForTag, uniqueArray } from "../utils";
import { Videos } from "../components/Videos/Videos";
import { Searchbar } from "../components/Searchbar/Searchbar";

export const HomePage = () => {
  const videosList = useQuery("videos", () => http.getVideosList());
  const reviewsList = useQuery("reviews", () => http.getNotesList());
  const tagsList = useQuery("tags", () => http.getTagsList());
  const anythingIsLoading =
    videosList.isLoading || reviewsList.isLoading || tagsList.isLoading;
  const featuredVideos = videosList.data ? videosList.data.slice(0, 4) : [];
  const uniqueTags = tagsList.data
    ? uniqueArray(tagsList.data, (el) => el.tag_id.id)
    : [];
  return (
    <Layout noPadding>
      <Searchbar />
      <article style={{ minHeight: "calc(100vh - 158px)" }}>
        {anythingIsLoading ? (
          <Loader
            type="TailSpin"
            color="#fcbe24"
            className="justify-self-center"
            height={100}
            width={100}
          />
        ) : (
          <>
            <Swiper
              spaceBetween={0}
              grabCursor
              longSwipes={false}
              centeredSlides
              loop
              autoplay={{
                delay: 3500,
                disableOnInteraction: true,
              }}
              pagination={{
                clickable: true,
              }}
            >
              {featuredVideos.map(
                ({ id, producer_id, title, duration, image, description }) => (
                  <SwiperSlide key={id}>
                    <div className="relative overflow-hidden h-full w-full">
                      <img
                        className="object-cover ml-auto w-3/4 h-full"
                        src={image}
                      />
                      <div className="gradient-bg" />
                      <div className="max-w-lg z-10 text-white absolute inset-0 px-6 py-4 pt-16 text-left w-2/4">
                        <p className="mb-4 text-xl font-bold text-gray-100">
                          {title}
                        </p>
                        <p className="text-xs mb-2 text-gray-400">
                          {producer_id && (
                            <>
                              <span className="text-white">Продюсер: </span>
                              {producer_id.name}
                            </>
                          )}
                        </p>
                        <p className="text-xs mb-2 text-gray-400">
                          <span className=" text-white">Длительность: </span>
                          {duration} мин.
                        </p>

                        <p className="text-sm tracking-wide text-gray-300">
                          {description.substring(0, 300)}...
                        </p>
                        <Link
                          className="py-2 px-4 hover:bg-yellow-500 transition-all bg-yellow-700 text-white font-semibold text-md rounded mt-4 inline-block"
                          to={`/film/${id}`}
                        >
                          Смотреть
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
            {uniqueTags.map(({ tag_id }) => {
              const videosForTag = getVideosForTag(tag_id, tagsList.data).map(
                (el) => el.video_id
              );
              return (
                <div className="mt-16 mb-16">
                  <h2 className="container mx-auto mb-6 text-3xl font-semibold leading-none text-gray-900 sm:text-4xl">
                    {capitalizeFirstLetter(tag_id.name)}
                  </h2>
                  <Videos data={videosForTag} />
                </div>
              );
            })}
          </>
        )}
      </article>
    </Layout>
  );
};
