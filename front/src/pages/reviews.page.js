import React from "react";
import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import { Reviews } from "../components/Reviews/Reviews";
import { http } from "../services/http.service";

export const ReviewsPage = () => {
  const { isLoading, data, error } = useQuery("reviews", http.getNotesList);
  return (
    <Layout>
      <Link className="my-8 block text-sm text-blue-500" to="/">
        {`<`} На главную
      </Link>
      <h2 className="mb-8 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
        Рецензии от экспертов
      </h2>
      <Reviews showLinks data={data} />
    </Layout>
  );
};
