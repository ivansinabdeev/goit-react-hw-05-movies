import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMoviesByReviews } from "../../api/MovieApi";
import { loadingStateStatus } from "../../utils/StateStatus";

import ReviewsList from "../Reviews/ReviewsList";
import ErrorNotification from "../ErrorNotifications/ErrorNotifications";

let pageNumber = 1;
export default function Reviews() {
  const [loadStatus, setLoadStatus] = useState(loadingStateStatus.IDLE);
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState("");
  const { movieId } = useParams();

  useEffect(() => {
    setLoadStatus(loadingStateStatus.PENDING);

    fetchMoviesByReviews(movieId, pageNumber)
      .then((response) => {
        setReviews(response.results);

        if (response.results.length !== 0) {
          setLoadStatus(loadingStateStatus.RESOLVED);
        } else {
          setError("No reviews");
          setLoadStatus(loadingStateStatus.REJECTED);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoadStatus(loadingStateStatus.REJECTED);
      });
  }, [movieId]);

  return (
    <>
      {loadStatus === loadingStateStatus.PENDING}
      {loadStatus === loadingStateStatus.RESOLVED && (
        <ReviewsList reviewsData={reviews} />
      )}
      {loadStatus === loadingStateStatus.REJECTED && (
        <ErrorNotification message={error} />
      )}
    </>
  );
}
