import { useParams } from 'react-router';
import type { PlayerProps } from './type';
import type { FilmProps } from '../../../types/film';

const HOUR = 60;

export default function Player({films}: PlayerProps): JSX.Element {
  const { id }: {id: string} = useParams();

  const currentFilm = films.find((film) => film.id === Number(id));

  const {
    name,
    posterImage,
    videoLink,
    runTime,
  } = currentFilm as FilmProps;

  const playerRunTime = `${Math.floor(runTime / HOUR)}:${runTime % HOUR}:00`;

  return (
    <div className="player">
      <video src={videoLink} className="player__video" poster={posterImage}></video>

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">{playerRunTime}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}