export const URLS = {
  // SIGNUPINIT: 'http://127.0.0.1:5000/signup/init',
  // SIGNUPVERIFY: 'http://127.0.0.1:5000/signup/verify',
  // LOGIN: 'http://127.0.0.1:5000/login',
  SIGNUPINIT: 'https://has-server.herokuapp.com/signup/init',
  SIGNUPVERIFY: 'https://has-server.herokuapp.com/signup/verify',
  LOGIN: 'https://has-server.herokuapp.com/login',
  GETJOBS: 'http://has-server.herokuapp.com/jobs/user/7',
  GETJOB: 'http://has-server.herokuapp.com/jobs/',
  POSTJOB: 'https://has-server.herokuapp.com/jobs/',
  GETJOBBIDS: 'http://has-server.herokuapp.com/bids/job/',
  POSTBID: 'http://has-server.herokuapp.com/bids/',
  GETSKILLS: 'https://has-server.herokuapp.com/skills',
  // GETJOBS: 'https://has-server.herokuapp.com/jobs/user/7',
  // GETJOB: 'https://has-server.herokuapp.com/jobs/'
};

export const METHODS = {
  LOGIN: 'POST',
  SIGNUPINIT: 'POST',
  SIGNUPVERIFY: 'POST'
};

export const baseUrl = 'https://has-server.herokuapp.com';

export const APIS = {
  baseUrl: 'https://has-server.herokuapp.com',
  creditWallet: {
    path: '/wallet',
    method: 'POST'
  },
};
