import { BASE_URL, API_KEY } from "./MovieUrl";

function responseStatusHandling(response) {
  if (response.ok) {
    return response.json();
  }
  throw new Error("Sorry, something happened! We are working on it!");
}

function fetchMoviesByName(movieName, pageNumber) {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&page=${pageNumber}&language=en-US&include_adult=false&query=${movieName}`
  ).then(responseStatusHandling);
}
//список самых популярных фильмов на сегодня
function fetchPopularMoviesByDay(pageNumber) {
  return fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${pageNumber}&language=en-US`
  ).then(responseStatusHandling);
}
//поиск кинофильма по ключевому слову
function fetchMoviesById(movieId) {
  return fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  ).then(responseStatusHandling);
}
//запрос информации о актёрском составе
function fetchMoviesByCast(movieId) {
  return fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  ).then(responseStatusHandling);
}
//запрос обзоров
function fetchMoviesByReviews(movieId, pageNumber) {
  return fetch(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=${pageNumber}`
  ).then(responseStatusHandling);
}

export {
  fetchMoviesByName,
  fetchPopularMoviesByDay,
  fetchMoviesById,
  fetchMoviesByCast,
  fetchMoviesByReviews,
};
