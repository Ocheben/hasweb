export const URLS = {
  // SIGNUPINIT: 'https://has-server.herokuapp.com/signup/init',
  // SIGNUPVERIFY: 'http://127.0.0.1:5000/signup/verify',
  // LOGIN: 'http://127.0.0.1:5000/login',
  SIGNUPINIT: 'https://has-server.herokuapp.com/signup/init',
  SIGNUPVERIFY: 'https://has-server.herokuapp.com/signup/verify',
  LOGIN: 'https://has-server.herokuapp.com/login',
  // GETJOBS: 'http://has-server.herokuapp.com/jobs/user/7',
  GETJOBS: 'https://has-server.herokuapp.com/jobs/user/7',
  GETJOB: 'https://has-server.herokuapp.com/jobs/',
  POSTJOB: 'https://has-server.herokuapp.com/jobs/',
  GETJOBBIDS: 'https://has-server.herokuapp.com/bids/job/',
  // POSTBID: 'https://has-server.herokuapp.com/bids/',
  POSTBID: 'https://has-server.herokuapp.com/bids/',
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
  testUrl: 'https://has-server.herokuapp.com',
  creditWallet: {
    path: '/wallet',
    method: 'POST'
  },
  initSignup: {
    method: 'POST',
    path: '/signup/init',
  },
  verifyOtp: {
    method: 'POST',
    path: '/signup/verify',
  },
  signup: {
    method: 'POST',
    path: '/signup',
  },
  getJobs: {
    method: 'GET',
    path: '/jobs'
  },
  getUserJobs: {
    method: 'GET',
    path: userId => `/jobs/user/${userId}`
  },
  getJobBids: {
    method: 'GET',
    path: jobId => `/bids/job/${jobId}`
  },
  acceptBid: {
    method: 'POST',
    path: '/bids/accept'
  },
  completeJob: {
    method: 'POST',
    path: '/jobs/complete'
  },
  getUserBids: {
    method: 'GET',
    path: userId => `/bids/user/${userId}`
  },
  getBanks: {
    method: 'GET',
    path: '/banks'
  },
  addNuban: {
    method: 'POST',
    path: '/wallet/add_nuban'
  },
  initPayout: {
    method: 'POST',
    path: '/wallet/init_payout'
  },
  finalizePayout: {
    method: 'POST',
    path: '/wallet/finalize_payout'
  },
};
