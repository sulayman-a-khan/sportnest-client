import { FaFutbol, FaTableTennis, FaVolleyballBall, FaSwimmer } from 'react-icons/fa';
import { MdOutlineSportsCricket } from 'react-icons/md';
import { GiTennisBall, GiBasketballBall, GiShuttlecock } from 'react-icons/gi';

export const sportsList = [
  'Football',
  'Cricket',
  'Tennis',
  'Basketball',
  'Badminton',
  'Table Tennis',
  'Volleyball',
  'Swimming',
];

export const sportIcons = {
  'Football': <FaFutbol />,
  'Cricket': <MdOutlineSportsCricket />,
  'Tennis': <GiTennisBall />,
  'Basketball': <GiBasketballBall />,
  'Badminton': <GiShuttlecock />,
  'Table Tennis': <FaTableTennis />,
  'Volleyball': <FaVolleyballBall />,
  'Swimming': <FaSwimmer />,
};

export const sportCategories = [
  { label: 'All Sports', value: '' },
  ...sportsList.map((sport) => ({
    label: sport,
    value: sport,
    icon: sportIcons[sport],
  })),
];
