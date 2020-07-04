import React from 'react';
import Loadable from 'react-loadable';
import { DefaultLayout } from './container/DefaultLayout';
import { CircularProgress } from './mui';

const Loading = () => (<CircularProgress size={24} className="loading" />);

const Dashboard = Loadable({
  loader: () => import('./views/DashBoard/Dashboard'),
  loading: Loading,
});

const Jobs = Loadable({
  loader: () => import('./views/Jobs/Jobs'),
  loading: Loading
});

const Job = Loadable({
  loader: () => import('./views/Job/Job'),
  loading: Loading
});

const MyJobs = Loadable({
  loader: () => import('./views/MyJobs/MyJobs'),
  loading: Loading
});

const MyJob = Loadable({
  loader: () => import('./views/MyJob/MyJob'),
  loading: Loading
});

const Profile = Loadable({
  loader: () => import('./views/Profile/Profile'),
  loading: Loading
});

const Bid = Loadable({
  loader: () => import('./views/Bid/Bid'),
  loading: Loading
});

const Bids = Loadable({
  loader: () => import('./views/Bids/Bids'),
  loading: Loading
});

const routes = [
  {
    path: '/', exact: true, name: 'Home', component: DefaultLayout
  },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  {
    path: '/jobs', exact: true, name: 'Jobs', component: Jobs
  },
  {
    path: '/jobs/:job_id', exact: true, name: 'Job', component: Job
  },
  {
    path: '/myjobs', exact: true, name: 'Jobs', component: MyJobs
  },
  {
    path: '/myjobs/:job_id', exact: true, name: 'My Job', component: MyJob
  },
  {
    path: '/myjobs/bids/:bid_id', exact: true, name: 'My Job', component: Bid
  },
  {
    path: '/bids', exact: true, name: 'Bids', component: Bids
  },
  {
    path: '/profile', exact: true, name: 'Profile', component: Profile
  },
];

export default routes;
