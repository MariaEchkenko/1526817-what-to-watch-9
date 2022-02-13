import MainPage from '../../pages/main-page/main-page';
import {Movies} from '../../types/movie';

type AppProps = {
  promoFilmName: string;
  promoFilmGenre: string;
  promoFilmYear: number;
  films: Movies;
}

function App({promoFilmName, promoFilmGenre, promoFilmYear, films}: AppProps): JSX.Element {
  return (
    <MainPage
      promoFilmName={promoFilmName}
      promoFilmGenre={promoFilmGenre}
      promoFilmYear={promoFilmYear}
      films={films}
    />
  );
}

export default App;
