import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';
import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Movie from '../../pages/movie/movie';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Loader from '../loader/loader';
import { isCheckedAuth } from '../../utils';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  if (isCheckedAuth(authorizationStatus)) {
    return (
      <Loader />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main />}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <MyList />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film}>
          <Route index element={<Movie />} />
          <Route path=':id' element={<Movie />} />
          <Route path=':id/review' element={<AddReview />} />
        </Route>
        <Route path={AppRoute.Player}>
          <Route index element={<Player />} />
          <Route path=':id' element={<Player />} />
        </Route>
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
