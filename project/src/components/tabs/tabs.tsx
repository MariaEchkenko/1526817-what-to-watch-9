import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types/movie';
import FilmOverview from '../../components/film-overview/film-overview';
import FilmDetails from '../../components/film-details/film-details';
import FilmReviews from '../../components/film-reviews/film-reviews';

const getComponentByTab = (activeTab: number, film: Movie) => {
  switch (activeTab) {
    case 1:
      return <FilmOverview film={film} />;
    case 2:
      return <FilmDetails film={film} />;
    case 3:
      return <FilmReviews reviews={film.review} />;
  }
};

type TabsProps = {
  film: Movie;
}

type Tab = {
  id: number;
  title: string;
}

function Tabs({film}: TabsProps): JSX.Element {
  const tabs: Tab[] = [
    {
      id: 1,
      title: 'Overview',
    },
    {
      id: 2,
      title: 'Details',
    },
    {
      id: 3,
      title: 'Reviews',
    },
  ];

  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`film-nav__item ${tab.id === activeTab ? 'film-nav__item--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Link to={'#'} className="film-nav__link">{tab.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {getComponentByTab(activeTab, film)}
    </>
  );
}

export default Tabs;
