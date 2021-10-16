import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { fetchMoviesByCast } from "../../api/MovieApi";
import { loadingStateStatus } from "../../utils/StateStatus";
// import Loader from "../../components/Loader/Loader";
import CastList from "./CastList";

export default function Cast() {
  const [loadStatus, setLoadStatus] = useState(loadingStateStatus.IDLE);
  const [cast, setCast] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    setLoadStatus(loadingStateStatus.PENDING);

    fetchMoviesByCast(movieId).then((response) => {
      setCast(response.cast);

      setLoadStatus(loadingStateStatus.RESOLVED);
    });
  }, [movieId]);

  return (
    <>
      {loadStatus === loadingStateStatus.PENDING}
      {loadStatus === loadingStateStatus.RESOLVED && (
        <CastList castData={cast} />
      )}
      {loadStatus === loadingStateStatus.REJECTED && (
        <h2>Something wrong ...</h2>
      )}
    </>
  );
}
