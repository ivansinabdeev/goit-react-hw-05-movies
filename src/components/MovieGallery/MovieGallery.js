import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { BASE_URL_IMG } from "../../api/movieUrl";
// import imageNotFound from "../../images/imageNotFound.png";
import style from "./MovieGallery.module.css";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
export default function MoviesGallery({ movies, url }) {
  const location = useLocation();

  return (
    <Grid container spacing={4}>
      {movies.map(({ id, poster_path, title }) => (
        <Grid item key={id} xs={12} sm={6} md={4}>
          <Link
            to={{
              pathname: `${url}/${id}`,
              state: { from: location },
            }}
          >
            <Card component="div">
              <CardMedia
                component="img"
                src={
                  poster_path
                    ? `${BASE_URL_IMG}${poster_path}`
                    : "imageNotFound"
                }
                alt={title}
                title={title}
                height="80%"
              />
              <CardContent>
                <Typography
                  className={style.movieTitle}
                  variant="h6"
                  align="center"
                  component="h2"
                >
                  {title}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

MoviesGallery.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  url: PropTypes.string.isRequired,
};
