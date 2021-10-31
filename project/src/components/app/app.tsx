import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import {
  connect,
  ConnectedProps
} from 'react-redux';
import AddReview from '../add-review-page/add-review/add-review';
import Film from '../film-page/film/film';
import Loading from '../loading/loading';
import Main from '../main-page/main/main';
import MyList from '../my-list/my-list';
import NotFound from '../not-found/not-found';
import Player from '../player/player';
import PrivateRoute from '../private-route/private-route';
import SignIn from '../sign-in/sign-in';
import {
  AppRoute,
  AuthorizationStatus
} from '../../const';
import type { State } from '../../types/state';
import { reviews } from '../../mocks/reviews';

const mapStateToProps = ({filmList, isDataLoaded}: State) => ({
  films: filmList,
  isDataLoaded,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export function App({films, isDataLoaded}: PropsFromRedux): JSX.Element {
  if (!isDataLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main films={films} />
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
          <Film
            films={films}
            reviews={reviews}
          />
        </Route>
        <Route path={AppRoute.AddReview} exact>
          <AddReview films={films} />
        </Route>
        <Route path={AppRoute.Player} exact>
          <Player films={films} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default connector(App);
