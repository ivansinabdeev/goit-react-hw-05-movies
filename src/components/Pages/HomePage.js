import React from "react";
import { useState, useEffect } from "react";
import { fetchPopularMoviesByDay } from "../../api/MovieApi";
import { loadingStateStatus } from "../../utils/StateStatus";
import MovieGallery from "../MovieGallery/MovieGallery";
import ErrorNotification from "../ErrorNotifications/ErrorNotifications";

import Container from "@material-ui/core/Container";

export default function HomePage() {
  const [loadStatus, setLoadStatus] = useState(loadingStateStatus.IDLE);
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadStatus(loadingStateStatus.PENDING);

    fetchPopularMoviesByDay(pageNumber)
      .then((movies) => {
        setMovies(movies.results);
        setLoadStatus(loadingStateStatus.RESOLVED);
      })
      .catch((error) => {
        setError(error.message);
        setLoadStatus(loadingStateStatus.REJECTED);
      });
  }, [pageNumber]);

  return (
    <>
      <section>
        <Container maxWidth={"md"}>
          <h1>Trending today</h1>
          {loadStatus === loadingStateStatus.PENDING}
          {loadStatus === loadingStateStatus.RESOLVED && (
            <MovieGallery movies={movies} url="/movies" />
          )}
          {loadStatus === loadingStateStatus.REJECTED && (
            <ErrorNotification message={error} />
          )}
        </Container>
      </section>
    </>
  );
}
