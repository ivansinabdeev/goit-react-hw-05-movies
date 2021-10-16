import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";

const HomePage = lazy(() =>
  import("./components/Pages/HomePage" /* webpackChunkName: "home-page" */)
);
const MoviesPage = lazy(() =>
  import("./components/Pages/MoviePage" /* webpackChunkName: "movies-page" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./components/Pages/MovieDetailsPage" /* webpackChunkName: "movie-details-page" */
  )
);
const ErrorPage = lazy(() =>
  import(
    "./components/ErrorPage/ErrorPage" /* webpackChunkName: "error-page" */
  )
);

export default function App() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/movies" component={MoviesPage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Suspense>
    </>
  );
}
