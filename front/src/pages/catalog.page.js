import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { Range } from "react-range";
import Select from "react-select";
import Loader from "react-loader-spinner";

import { http } from "../services/http.service";
import { Layout } from "../components/Layout/Layout";
import { createOption, createOptions, uniqueArray } from "../utils";
import { Videos } from "../components/Videos/Videos";

export const CatalogPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const [filters, setFilters] = useState({
    search,
    country: "",
    min_duration: 5,
    max_duration: 300,
    min_issue_year: 1960,
    max_issue_year: 2021,
  });
  const { isLoading, data } = useQuery(["catalog", filters], () =>
    http.getVideosList(filters)
  );
  const clearVideos = useQuery("clearvideos", () => http.getVideosList());
  const onFilterChange = (field) => (value) => {
    if (["country"].includes(field)) {
      setFilters((filters) => ({ ...filters, [field]: value.value }));
      return;
    }
    if (["duration", "issue_year"].includes(field)) {
      setFilters((filters) => ({
        ...filters,
        [`min_${field}`]: value[0],
        [`max_${field}`]: value[1],
      }));
      return;
    }
    setFilters((filters) => ({ ...filters, [field]: value.target.value }));
  };

  const countries = uniqueArray(
    (clearVideos?.data || []).map((el) => el.country),
    (el) => el
  );
  let countriesOptions = createOptions(countries);
  countriesOptions.push({ label: "Любая", value: null });

  console.log(data, filters, "catalog");
  return (
    <Layout>
      <article
        className="px-4 py-8 mx-auto max-w-7xl"
        itemid="#"
        itemscope
        itemtype="http://schema.org/BlogPosting"
        style={{ minHeight: "calc(100vh - 128px)" }}
      >
        <div className="container mx-auto mb-8 text-left">
          <h1
            className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl"
            itemprop="headline"
          >
            {filters.search ? `${filters.search}` : "Каталог фильмов"}
          </h1>
        </div>
        <div className="container grid gap-16 catalog">
          <main>
            <div className="sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
              {isLoading || !data ? (
                <Loader
                  type="TailSpin"
                  color="#00BFFF"
                  className="justify-self-center"
                  height={100}
                  width={100}
                />
              ) : data.length > 0 ? (
                <Videos lgCols={4} noBg data={data} />
              ) : (
                <h2>Таких фильмов не нашли.</h2>
              )}
            </div>
          </main>
          <aside>
            <div className="flex flex-col px-4">
              <div className="flex flex-col md:mr-16 mb-4 mt-6">
                <label
                  htmlFor="modelOrMark"
                  className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
                >
                  Название фильма
                </label>
                <input
                  onChange={onFilterChange("search")}
                  value={filters.search}
                  id="modelOrMark"
                  className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-yellow-500 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-56 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                  placeholder="Иван Васильевич меняет..."
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="department"
                  className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
                >
                  Страна
                </label>
                <Select
                  onChange={onFilterChange("country")}
                  placeholder="Россия"
                  value={createOption(filters.country)}
                  options={countriesOptions}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minWidth: 225,
                    }),
                  }}
                />
              </div>
              <p className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-12">
                Год выхода
              </p>
              <Range
                draggableTrack
                values={[filters.min_issue_year, filters.max_issue_year]}
                step={1}
                min={1960}
                max={2021}
                onChange={onFilterChange("issue_year")}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      backgroundColor: "#ccc",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ index, props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "20px",
                      width: "20px",
                      borderRadius: "4px",
                      backgroundColor: "#FFF",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 2px 6px #AAA",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-32px",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "14px",
                        padding: "2px 4px",
                        borderRadius: "4px",
                        backgroundColor: "#fcbe24",
                      }}
                    >
                      {index > 0
                        ? filters.max_issue_year
                        : filters.min_issue_year}
                    </div>
                    <div
                      style={{
                        height: "10px",
                        width: "5px",
                        backgroundColor: isDragged ? "#fcbe24" : "#CCC",
                      }}
                    />
                  </div>
                )}
              />
              <p className="text-gray-800 dark:text-gray-100 mt-6 text-sm font-bold leading-tight tracking-normal mb-12">
                Длительность (мин.)
              </p>
              <Range
                draggableTrack
                values={[filters.min_duration, filters.max_duration]}
                step={1}
                min={5}
                max={300}
                onChange={onFilterChange("duration")}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      backgroundColor: "#ccc",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ index, props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "20px",
                      width: "20px",
                      borderRadius: "4px",
                      backgroundColor: "#FFF",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 2px 6px #AAA",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-32px",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "14px",
                        padding: "2px 4px",
                        borderRadius: "4px",
                        backgroundColor: "#fcbe24",
                      }}
                    >
                      {(index > 0
                        ? filters.max_duration
                        : filters.min_duration
                      ).toLocaleString()}
                    </div>
                    <div
                      style={{
                        height: "10px",
                        width: "5px",
                        backgroundColor: isDragged ? "#fcbe24" : "#CCC",
                      }}
                    />
                  </div>
                )}
              />
            </div>
          </aside>
        </div>
      </article>
    </Layout>
  );
};
