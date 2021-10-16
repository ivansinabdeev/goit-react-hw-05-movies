import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import { BASE_URL_IMG } from "../../api/movieUrl";

export default function CastList({ castData }) {
  return (
    <Grid container spacing={2}>
      {castData.map(({ id, profile_path, name, character }) => (
        <Grid item key={id} xs={6} sm={3} md={2}>
          <Card component="div">
            <CardMedia
              component="img"
              src={
                profile_path
                  ? `${BASE_URL_IMG}${profile_path}`
                  : "imageNotFound"
              }
              alt={name}
            />
            <CardContent>
              <Typography variant="subtitle2" align="center" component="p">
                {name}
              </Typography>
              {character && (
                <Typography variant="caption" align="center" component="p">
                  ({character})
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

CastList.propTypes = {
  castData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      profile_path: PropTypes.string,
      name: PropTypes.string,
      character: PropTypes.string,
    })
  ),
};
