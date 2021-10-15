import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import AddReview from '../add-review/add-review';
import Film from '../film/film';
import MainPage from '../main-page/main-page';
import MyList from '../my-list/my-list';
import NotFound from '../not-found/not-found';
import Player from '../player/player';
import PrivateRoute from '../private-route/private-route';
import SignIn from '../sign-in/sign-in';
import type { AppProps } from './type';

export default function App({films}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <MainPage films={films} />
        </Route>
        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyList films={films} />}
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route path={AppRoute.Film} exact>
          <Film />
        </Route>
        <Route path={AppRoute.AddReview} exact>
          <AddReview
            name={films[0].name}
            posterImage={films[0].posterImage}
            backgroundImage={films[0].backgroundImage}
          />
        </Route>
        <Route path={AppRoute.Player} exact>
          <Player
            name={films[0].name}
            posterImage={films[0].posterImage}
            videoLink={films[0].videoLink}
            runTime={films[0].runTime}
          />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
