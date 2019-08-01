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

// const Shipments = Loadable ({
//     loader: () => import('./views/Shipments/Shipments'),
//     loading: Loading,
// });

// const ShipmentHistory = Loadable ({
//     loader: () => import('./views/ShipmentHistory/ShipmentHistory'),
//     loading: Loading,
// });

// const Bikers = Loadable ({
//     loader: () => import('./views/Bikers/Bikers'),
//     loading: Loading,
// });

// const BikerShipment = Loadable ({
//     loader: () => import('./views/BikerShipment/BikerShipment'),
//     loading: Loading,
// });


const routes = [
  {
    path: '/', exact: true, name: 'Home', component: DefaultLayout
  },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/jobs', exact: true, name: 'Jobs', component: Jobs },
  { path: '/jobs/:job_id', exact: true, name: 'Job', component: Job },
  { path: '/myjobs', exact: true, name: 'Jobs', component: MyJobs },
  { path: '/myjobs/:job_id', exact: true, name: 'My Job', component: MyJob },
  // {path:'/shipments', name:"Shipments", component:Shipments },
  // {path:'/shipmenthistory', name:"History", component:ShipmentHistory },
  // {path:'/bikers', name:"Bikers", component:Bikers },
  // {path:'/bikershipment', name:"Biker Shipment", component:BikerShipment },
];

export default routes;
