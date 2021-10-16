import { Route, Switch, Redirect } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loader from "./components/Loader/Loader";

const HomePage = lazy(() =>
  import("./components/Pages/HomePage" /* webpackChunkName: "homePage" */)
);

const MoviesPage = lazy(() =>
  import("./components/Pages/MoviePage" /* webpackChunkName: "moviePage" */)
);

const MovieDetailsPage = lazy(() =>
  import(
    "./components/Pages/MovieDetailsPage" /* webpackChunkName: "movieDetailsPage" */
  )
);

export default function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
