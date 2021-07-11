import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

import { HomePage } from "./pages/home.page";
import { ReviewsPage } from "./pages/reviews.page";
import { CatalogPage } from "./pages/catalog.page";
import { FilmPage } from "./pages/film.page";

const queryClient = new QueryClient();
SwiperCore.use([Autoplay, Pagination, Navigation]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/reviews/:model?">
            <ReviewsPage />
          </Route>
          <Route path="/film/:id">
            <FilmPage />
          </Route>
          <Route path="/feed">
            <CatalogPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
