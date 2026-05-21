import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Facilities from '../pages/Facilities';
import FacilityDetail from '../pages/FacilityDetail';
import MyBookings from '../pages/MyBookings';
import AddFacility from '../pages/AddFacility';
import ManageFacilities from '../pages/ManageFacilities';
import PrivateRoute from './PrivateRoute';

/**
 * Central route configuration.
 * All routes are nested under MainLayout which renders the
 * persistent Navbar + Footer around each page.
 *
 * Add new routes inside the `children` array of the MainLayout element.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'facilities',
        element: <Facilities />,
      },
      {
        element: <PrivateRoute />,
        children: [
          { path: 'facilities/:id', element: <FacilityDetail /> },
          { path: 'my-bookings', element: <MyBookings /> },
          { path: 'add-facility', element: <AddFacility /> },
          { path: 'manage-my-facilities', element: <ManageFacilities /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
