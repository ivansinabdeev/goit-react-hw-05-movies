import { useState, useEffect } from "react";
import { useRouteMatch, useLocation, useHistory } from "react-router-dom";

import Container from "@material-ui/core/Container";

import { fetchMoviesByName } from "../../api/MovieApi";
import { loadingStateStatus } from "../../utils/StateStatus";
import MovieGallery from "../MovieGallery/MovieGallery";

import ErrorNotification from "../ErrorNotifications/ErrorNotifications";

export default function MoviesPage() {
  const [loadStatus, setLoadStatus] = useState(loadingStateStatus.IDLE);
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (searchQuery === null) return;
    if (searchQuery === "") {
      setError("Please, enter movie!");
      setLoadStatus(loadingStateStatus.REJECTED);
      return;
    }

    setLoadStatus(loadingStateStatus.PENDING);
    fetchMoviesByName(searchQuery, pageNumber)
      .then((movies) => {
        setMovies(movies.results);

        if (movies.results.length !== 0) {
          setLoadStatus(loadingStateStatus.RESOLVED);
        } else {
          setError(`No results for "${searchQuery}" :( )`);
          setLoadStatus(loadingStateStatus.REJECTED);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoadStatus(loadingStateStatus.REJECTED);
      });
  }, [searchQuery, location, pageNumber]);

  // const onSearchFormSubmit = (searchQuery) => {
  //   history.push({ ...location, search: `query=${searchQuery}` });
  // };

  return (
    <>
      <section>
        <Container maxWidth={"md"}>
          <h1>Information about movie</h1>

          {/* <MovieSearchForm getFormData={onSearchFormSubmit} /> */}

          {loadStatus === loadingStateStatus.PENDING}
          {loadStatus === loadingStateStatus.RESOLVED && (
            <MovieGallery movies={movies} url={url} />
          )}
          {loadStatus === loadingStateStatus.REJECTED && (
            <ErrorNotification message={error} />
          )}
        </Container>
      </section>
    </>
  );
}
