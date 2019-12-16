export const URLS = {
  // SIGNUPINIT: 'http://127.0.0.1:5000/signup/init',
  // SIGNUPVERIFY: 'http://127.0.0.1:5000/signup/verify',
  // LOGIN: 'http://127.0.0.1:5000/login',
  SIGNUPINIT: 'https://has-server.herokuapp.com/signup/init',
  SIGNUPVERIFY: 'https://has-server.herokuapp.com/signup/verify',
  LOGIN: 'http://127.0.0.1:5000/login',
  GETJOBS: 'http://has-server.herokuapp.com/jobs/user/7',
  GETJOB: 'http://has-server.herokuapp.com/jobs/',
  POSTJOB: 'http://127.0.0.1:5000/jobs/',
  GETJOBBIDS: 'http://has-server.herokuapp.com/bids/job/',
  POSTBID: 'http://has-server.herokuapp.com/bids/',
  GETSKILLS: 'http://127.0.0.1:5000/skills',
  // GETJOBS: 'http://127.0.0.1:5000/jobs/user/7',
  // GETJOB: 'http://127.0.0.1:5000/jobs/'
};

export const METHODS = {
  LOGIN: 'POST',
  SIGNUPINIT: 'POST',
  SIGNUPVERIFY: 'POST'
};

export const baseUrl = 'http://127.0.0.1:5000';

export const APIS = {
  baseUrl: 'http://127.0.0.1:5000',
  creditWallet: {
    path: '/wallet',
    method: 'POST'
  },
};
