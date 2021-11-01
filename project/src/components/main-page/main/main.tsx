import {
  connect,
  ConnectedProps
} from 'react-redux';
import { useState } from 'react';
import FilmList from '../../film-list/film-list';
import GenreList from '../genre-list/genre-list';
import ShowMore from '../show-more/show-more';
import type { State } from '../../../types/state';
import type { MainPageProps } from './type';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { Link } from 'react-router-dom';

const FILM_CARD_AMOUNT = 8;
const DEFAULT_SHOW_SIZE = 1;

const mapStateToProps = ({filteredFilms, authorizationStatus}: State) => ({
  filteredFilms,
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedMainPageProps = PropsFromRedux & MainPageProps;

export function Main({films, filteredFilms, authorizationStatus}: ConnectedMainPageProps): JSX.Element {
  const {
    name,
    genre,
    released,
    posterImage,
    backgroundImage,
  } = filteredFilms[0];

  const [showSize, setShowSize] = useState(DEFAULT_SHOW_SIZE);
  const shownFilms = filteredFilms.slice(0, showSize * FILM_CARD_AMOUNT);

  const handleShowMoreClick = () => {
    setShowSize(() => showSize + 1);
  };

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a href="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <ul className="user-block">
            {
              authorizationStatus === AuthorizationStatus.Auth ?
                (
                  <>
                    <li className="user-block__item">
                      <div className="user-block__avatar">
                        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                      </div>
                    </li>
                    <li className="user-block__item">
                      <Link className="user-block__link" to="#">user@mail.com</Link>
                    </li>
                  </>
                ) : (
                  <li className="user-block__item">
                    <Link className="user-block__link" to={AppRoute.SignIn}>Sign in</Link>
                  </li>
                )
            }
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList films={films}/>

          <FilmList films={shownFilms}/>

          {
            filteredFilms.length > shownFilms.length &&
            <ShowMore onClick={handleShowMoreClick}/>
          }
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="/" className="logo__link logo__link--light">
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

export default connector(Main);
