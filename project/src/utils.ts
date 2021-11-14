import {
  Genres,
  Grade
} from './const';
import type {
  FilmFromServer,
  FilmProps
} from './types/film';

export const filterFilmsByGenre = (films: FilmProps[], genre: string): FilmProps[] => {
  if (genre === Genres.All) {
    return films;
  }

  return films.filter((film) => film.genre === genre);
};

export const adaptToClient = (film: FilmFromServer): FilmProps => (
  {
    id: film['id'],
    name: film['name'],
    posterImage: film['poster_image'],
    previewImage: film['preview_image'],
    backgroundImage: film['background_image'],
    backgroundColor: film['background_color'],
    videoLink: film['video_link'],
    previewVideoLink: film['preview_video_link'],
    description: film['description'],
    rating: film['rating'],
    scoresCount: film['scores_count'],
    director: film['director'],
    starring: film['starring'],
    runTime: film['run_time'],
    genre: film['genre'],
    released: film['released'],
    isFavorite: film['is_favorite'],
  }
);

export const adaptFilmsToClient = (films: FilmFromServer[]): FilmProps[] => (
  films.map((film) => adaptToClient(film))
);

export const getGrade = (rating: number): string => {
  if (rating === 10) {
    return Grade.Awesome;
  } else if (rating > 7) {
    return Grade.VeryGood;
  } else if (rating > 4) {
    return Grade.Good;
  } else if (rating > 2) {
    return Grade.Normal;
  } else if (rating > 0) {
    return Grade.Bad;
  }
  return '';
};
