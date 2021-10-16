import { BASE_URL_IMG } from "../../api/movieUrl";

export default function MovieCard({ movie }) {
  const movieGenres =
    movie !== null
      ? movie.genres.map((genre) => genre.name).join(", ")
      : "Unknown movie";

  return (
    <div>
      <img
        src={`${BASE_URL_IMG}${movie.poster_path}`}
        alt={movie.title}
        width="250"
      />
      <h3>{movie.title}</h3>
      <p>{movie.release_data}</p>
      <p> Genre: {movieGenres}</p>
      <p> {movie.overview}</p>
      <p>
        {movie.vote_average !== 0 ? (
          <>
            <span>Rating: </span>
            <span>{movie.vote_average}</span>
            <span>(Based on {movie.vote_count} reviews)</span>
          </>
        ) : (
          <span>No reviews</span>
        )}
      </p>
    </div>
  );
}
