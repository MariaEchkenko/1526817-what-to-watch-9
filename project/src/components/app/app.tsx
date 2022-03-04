import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Movie from '../../pages/movie/movie';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import {Movies} from '../../types/movie';

type AppProps = {
  promoFilmName: string;
  promoFilmGenre: string;
  promoFilmYear: number;
  films: Movies;
}

function App({promoFilmName, promoFilmGenre, promoFilmYear, films}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <Main
              promoFilmName={promoFilmName}
              promoFilmGenre={promoFilmGenre}
              promoFilmYear={promoFilmYear}
              films={films}
            />
          }
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <MyList films={films}/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film}>
          <Route index element={<Movie />} />
          <Route path=':id' element={<Movie />} />
          <Route path=':id/review' element={<AddReview film={films[0]}/>} />
        </Route>
        <Route path={AppRoute.Player}>
          <Route index element={<Player film={films[0]}/>} />
          <Route path=':id' element={<Player film={films[0]}/>} />
        </Route>
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
