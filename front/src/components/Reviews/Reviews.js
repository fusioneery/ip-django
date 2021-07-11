import React from "react";
import { Link } from "react-router-dom";

export const Reviews = ({ data }) => {
  console.log(data);
  return (
    <div>
      {data.map(
        ({
          video_id,
          note_id: {
            author_id: { name },
            posted,
            title,
            body,
          },
        }) => (
          <div
            key={posted}
            class="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md my-8"
          >
            <div class="flex items-center justify-between">
              <span class="font-light text-gray-600">
                {new Date(posted).toLocaleString("ru")}
              </span>
            </div>
            <div class="mt-2">
              <p class="text-2xl font-bold text-gray-700">{title}</p>
              <Link
                className="block text-sm text-blue-500"
                to={`/film/${video_id.id}`}
              >
                {video_id.title}
              </Link>
              <p
                class="mt-2 text-gray-600"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </div>
            <div class="flex items-center justify-between mt-4">
              <div>
                <a href="#" class="flex items-center">
                  <img
                    src={`https://i.pravatar.cc/100?u=${name}`}
                    alt="avatar"
                    class="hidden object-cover w-10 h-10 mr-4 rounded-full sm:block"
                  />
                  <h6 class="font-bold text-gray-700 hover:underline">
                    {name}
                  </h6>
                </a>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
