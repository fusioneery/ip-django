import React from "react";
import Loader from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import { Reviews } from "../components/Reviews/Reviews";
import { Videos } from "../components/Videos/Videos";
import { http } from "../services/http.service";

export const FilmPage = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery(["movieMain", id], () =>
    http.getFilm(id)
  );
  const relevant = useQuery(["movieRelevant", data], () =>
    http.getFilm(data?.relevant_ids)
  );
  const reviews = useQuery(["movieReviews", data], () =>
    http.getNotesList({ video_id__id: data?.id || "" })
  );
  return (
    <Layout>
      <div>
        <Link className="my-8 block text-sm text-blue-500" to="/">
          {`<`} На главную
        </Link>
        {isLoading ? (
          <Loader
            type="TailSpin"
            color="#fcbe24"
            className="justify-self-center"
            height={100}
            width={100}
          />
        ) : (
          <>
            <h1 className="mb-8 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              {data.title}
            </h1>
            <iframe
              class="embed-responsive-item mx-auto"
              src={`https://www.youtube.com/embed/${data.video_url}`}
              frameborder="0"
              allowfullscreen=""
              height="500"
              width="800"
            />
            <p className="text-md mb-8 mt-16 py-4">{data.description}</p>
            {reviews?.data?.length > 0 && (
              <>
                <h2 className="mb-8 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                  Отзывы
                </h2>
                <Reviews data={reviews.data} />
              </>
            )}
            {relevant.data && (
              <>
                <h2 className="mb-8 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                  Похожие фильмы
                </h2>
                <Videos noBg data={[relevant.data]} />
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};
