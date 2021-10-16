import axios from "axios";
const apiKey = "d33b1ea5c36bf52f0f9bd815b8fbc228";

axios.defaults.baseURL = "https://api.themoviedb.org";

export const fetchTrendingMovies = () => {
  return axios
    .get(`/3/trending/all/day?api_key=${apiKey}`)
    .then((res) => res.data.results);
};
export const FetchMoviesBySearchQuery = (query) => {
  return axios
    .get(
      `/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
    )
    .then((res) => res.data.results);
};
export const fetchMovieDetails = (movieId) => {
  return axios
    .get(`/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
    .then((res) => res.data);
};
export const fetchCastAndCrew = (movieId) => {
  return axios
    .get(`/3/movie/${movieId}/credits?api_key=${apiKey}`)
    .then((res) => res.data.cast);
};
export const fetchMovieReviews = (movieId) => {
  return axios
    .get(`/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`)
    .then((res) => res.data.results);
};
