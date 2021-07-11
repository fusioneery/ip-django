import React from "react";
import { Link } from "react-router-dom";

import { Stars } from "../Stars/Stars";

export const Videos = ({ data, noBg, lgCols = 5 }) => {
  console.log(data);
  return (
    <div className={!noBg && "bg-gray-100 py-10"}>
      <div
        className={`container mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-${lgCols}`}
      >
        {data.map(({ id, title, image, duration, rating }) => (
          <Link
            key={id}
            to={`/film/${id}`}
            className="relative overflow-hidden transition duration-300 transform rounded lg:hover:-translate-y-2"
          >
            <img
              className="object-cover w-full h-56 md:h-64 rounded xl:h-80 shadow-lg"
              src={image}
            />
            <div
              key={id}
              className="flex flex-col justify-center py-2 transition-opacity duration-30"
            >
              <p className="mb-1 text-md font-bold text-gray-800 oneline">
                {title}
              </p>
              <p className="mb-2 text-xs text-gray-700">{duration} мин.</p>
              <Stars rating={rating} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
