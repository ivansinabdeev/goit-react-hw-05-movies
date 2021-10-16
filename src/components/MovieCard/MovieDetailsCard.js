import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

// import imageNotFound from "../../images/imageNotFound.png";
import { BASE_URL_IMG } from "../../api/movieUrl";

export default function MovieDetails({ movie }) {
  const { poster_path, title, overview, vote_average, vote_count } = movie;

  const movieGenres =
    movie !== null
      ? movie.genres.map((genre) => genre.name).join(", ")
      : "Unknown";

  const formattedReleaseDate = movie.release_date
    .split("-")
    .reverse()
    .join(".");

  return (
    <Card component="div">
      <CardMedia
        component="img"
        src={poster_path ? `${BASE_URL_IMG}${poster_path}` : "imageNotFound"}
        alt={title}
      />
      <CardContent>
        <h2>{title}</h2>
        <p>
          <span>Release date: </span>
          {formattedReleaseDate}
        </p>
        <p>
          <span>Genre: </span>
          {movieGenres}
        </p>
        <p>{overview}</p>
        <p>
          {vote_average !== 0 ? (
            <>
              <span>Rating: </span>
              <span>{vote_average} </span>
              <span>(based on {vote_count} reviews)</span>
            </>
          ) : (
            <span> No reviews yet </span>
          )}
        </p>
      </CardContent>
    </Card>
  );
}
