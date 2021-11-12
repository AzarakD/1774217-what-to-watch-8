import { useEffect } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  useHistory,
  useParams
} from 'react-router';
import { Link } from 'react-router-dom';
import FilmTabs from '../film-tabs/film-tabs';
import Loading from '../../../loading/loading';
import SimilarFilms from '../similar-films/similar-films';
import UserBlock from '../../../user-block/user-block';
import { fetchFilmAction } from '../../../../store/api-actions';
import {
  getAuthorizationStatus,
  getCurrentFilm
} from '../../../../store/selectors';
import {
  AppRoute,
  AuthorizationStatus
} from '../../../../const';

export default function Film(): JSX.Element {
  const currentFilm = useSelector(getCurrentFilm);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();
  const history = useHistory();

  const { id }: {id: string} = useParams();
  const filmId = Number(id);

  const getFilm = (currentFilmId: number) => {
    dispatch(fetchFilmAction(currentFilmId));
  };

  useEffect(() => {
    if (currentFilm.id !== filmId) {
      getFilm(filmId);
    }
  });

  if (currentFilm.id !== filmId) {
    return <Loading />;
  }

  const {
    name,
    backgroundImage,
    genre,
    released,
    posterImage,
  } = currentFilm;

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to={AppRoute.Main} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button"
                  onClick={() => history.push(AppRoute.Player.replace(':id', `${filmId}`))}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                {
                  authorizationStatus === AuthorizationStatus.Auth &&
                  <Link className="btn film-card__button" to={AppRoute.AddReview.replace(':id', `${filmId}`)}>Add review</Link>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>

            <FilmTabs
              id={filmId}
              film={currentFilm}
            />
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <SimilarFilms />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
