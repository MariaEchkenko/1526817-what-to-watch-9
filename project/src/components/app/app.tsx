import MainPage from '../main-page/main-page';

type AppProps = {
  promoFilmName: string;
  promoFilmGenre: string;
  promoFilmYear: number;
  films: {
    id: number;
    name: string;
    previewImage: string;
  }[];
}

function App({promoFilmName, promoFilmGenre, promoFilmYear, films}: AppProps): JSX.Element {
  return (
    <MainPage
      promoFilmName= {promoFilmName}
      promoFilmGenre= {promoFilmGenre}
      promoFilmYear= {promoFilmYear}
      films = {films}
    />
  );
}

export default App;
