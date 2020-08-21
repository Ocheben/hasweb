import React, { useState } from 'react';
import { Avatar, Icon, CircularProgress, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { connect } from 'react-redux';
import { blue } from '@material-ui/core/colors';
import {
  SDiv, SText, StyledButton, StyledHr
} from '../Components';
import avatar from '../../assets/img/avatar.png';
import { recentJobs } from './data';
import { getData, APIS } from '../../_services';
import { setAlert } from '../../_actions/userActions';
import { debitWallet } from '../../_actions/authAction';

const Bid = (props) => {
  const { userInfo, userData, match, dispatch, history } = props;
  const { userId, walletBal } = userInfo;
  const { params : { bid_id }} = match;
  const { userJobBids } = userData;
  const bidItem = userJobBids.find(bid => bid.bid_id === parseInt(bid_id, 10)) || {};
  const { firstname, lastname, email, phone, message, job_id, accepted, completed, price } = bidItem;

  const [rating, setRating] = useState(0);
  const [openRating, setOpenRating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false)

  const acceptBid = async () => {
    console.log(bidItem);
    if (parseInt(bidItem.price, 10) > parseInt(walletBal, 10)) {
      dispatch(setAlert({ open: true, variant: 'error', message: 'Price of bid is more than wallet balance' }));
      setOpenFeedback(true);
      return;
    }
    const { baseUrl, acceptBid: { method, path } } = APIS;
    const url = baseUrl + path;
    const payload = {
      userId,
      jobId: job_id,
      bidId: bidItem.bid_id,
      providerId: bidItem.user_id,
      price: parseInt(bidItem.price, 10)
    };

    setLoading(true);
    const response = await getData(method, url, payload);
    // history.push(`/myJobs/${job_id}`);
    // dispatch(setAlert({ open: true, variant: 'info', message: 'Bid Accepted' }));
    console.log(response);
    if (response.meta && response.meta.status === 200) {
      dispatch(setAlert({ open: true, variant: 'info', message: 'Bid Accepted' }));
      dispatch(debitWallet(parseInt(bidItem.price, 10)));
      // eslint-disable-next-line camelcase
      history.push(`/myJobs/${job_id}`);
    }
    setLoading(false);
  };

  const completeJob = async () => {
    const { testUrl, completeJob: { method, path } } = APIS;
    const url = testUrl + path;
    const payload = {
      userId,
      jobId: job_id,
      bidId: bidItem.bid_id,
      providerId: bidItem.user_id,
      rating,
      price: parseInt(price, 10)
    };

    setLoading(true);
    const response = await getData(method, url, payload);
    if (response.meta && response.meta.status === 200) {
      setOpenRating(false);
      if (response.meta && response.meta.status === 200) {
        dispatch(setAlert({ open: true, variant: 'info', message: 'Job Completed' }));
        // eslint-disable-next-line camelcase
        history.push(`/myJobs/${job_id}`);
      }
    }
    console.log(response);
    // if(response.meta && response.meta.status === 200) {};
    setLoading(false);
  };
  return (
    <SDiv flex align="center">
      <SDiv id="card" bg="#ffffff" align="center" shadow width="70%" borderR="1em" tmargin="3em" borderBox>
        <SDiv id="header" hpadding="1em" borderBox flex horizontal justify="space-between" align="center" height="4em">
          <SText color="#444444" size="24px" weight="700">Bid Details</SText>
          {!accepted && (
            <StyledButton width="auto" color="primary" onClick={acceptBid}>
              {loading ? <CircularProgress style={{ color: blue[700] }} size={24} /> : 'Accept Bid '}
            </StyledButton>
          )}
          {accepted && !completed && (
            <StyledButton width="auto" color="primary" onClick={() => setOpenRating(true)}>
              Complete Job
            </StyledButton>
          )}
          {accepted && completed && <SText size="14px" weight="700" color="#1b5e20" />}
        </SDiv>
        <StyledHr hmargin={0} />
        <SDiv flex horizontal hpadding="1em" borderBox minHeight="40vh" align="center">
          <SDiv id="avatar" flexValue="0" align="center" margin="2em">
            <img alt="User Avatar" className="avatar" src={avatar} />
          </SDiv>
          <SDiv id="bio" width="80%" flex>
            <SText color="#444444" size="24px" weight="700">
              {firstname}
              {' '}
              {lastname}
            </SText>
            <SText color="#999999" size="12px">{phone}</SText>
            <SText color="#999999" size="12px">{email}</SText>
            <SText color="#666666" size="18px">
              {message}
            </SText>
            <SText color="#999999" size="12px">Bio</SText>
            <SText color="#666666" size="18px">
              {"I am a software engineer and consultant working with various development teams to ship both Business-to-Business and Business-to-Customer solutions. I am a Javascript expert and currently I build web and mobile applications with React, React Native, PostgreSQL and ExpressJS. I am proficient with a lot of tools, including CSS, HTML, PHP, Python and Illustrator . When I'm not in front of my computer, you can find me reading a book, running or hiking."}
            </SText>
          </SDiv>
        </SDiv>
      </SDiv>
{/*
      <SDiv id="card" bg="#ffffff" align="center" shadow width="70%" borderR="1em" tmargin="3em" borderBox>
        <SDiv id="header" hpadding="1em" borderBox flex horizontal justify="flex-start" align="center" height="4em">
          <SText color="#444444" size="24px" weight="700">Recent Jobs</SText>
        </SDiv>
        <StyledHr hmargin={0} />
        <SDiv flex borderBox align="center">
          <SDiv id="content" flex align="center" borderBox>
            {
            recentJobs.length
            && recentJobs.map((item, index) => {
              const { id, info, date } = item;
              return (
                <SDiv id="project" key={id} flex horizontal justify="space-around" width="90%" vpadding="0.4rem" border>
                  <SDiv id="projectDesc" width="70%" flex justify="space-between">
                    <SDiv>
                      <SText color="#444444" size="14px" weight="400" className="block-with-text">
                        {info}
                      </SText>
                    </SDiv>
                    <SDiv>
                      <SText color="#444444" size="11px" weight="400">{date}</SText>
                    </SDiv>
                  </SDiv>
                  <SDiv id="price" width="20%" flex align="flex-end">
                    <StyledButton width="auto" color="primary">View</StyledButton>
                  </SDiv>
                </SDiv>
              );
            })
          }
          </SDiv>
        </SDiv>
      </SDiv>

      <SDiv id="card" bg="#ffffff" align="center" shadow width="70%" borderR="1em" tmargin="3em" borderBox>
        <SDiv id="header" hpadding="1em" borderBox flex horizontal justify="flex-start" align="center" height="4em">
          <SText color="#444444" size="24px" weight="700">Qualifications</SText>
        </SDiv>
        <StyledHr hmargin={0} />
        <SDiv flex borderBox align="center">
          <SDiv id="content" flex align="center" borderBox>
            {
            recentJobs.length
            && recentJobs.map((item, index) => {
              const { id, info, date } = item;
              return (
                <SDiv id="project" key={id} flex horizontal justify="space-around" width="90%" vpadding="0.4rem" border>
                  <SDiv id="projectDesc" width="70%" flex justify="space-between">
                    <SDiv>
                      <SText color="#444444" size="14px" weight="400" className="block-with-text">
                        {info}
                      </SText>
                    </SDiv>
                    <SDiv>
                      <SText color="#444444" size="11px" weight="400">{date}</SText>
                    </SDiv>
                  </SDiv>
                  <SDiv id="price" width="20%" flex align="flex-end">
                    <StyledButton width="auto" color="primary">View</StyledButton>
                  </SDiv>
                </SDiv>
              );
            })
          }
          </SDiv>
        </SDiv>
      </SDiv> */}

      {/* <SDiv id="card" bg="#ffffff" align="center" shadow width="70%" borderR="1em" tmargin="3em" borderBox>
        <SDiv id="header" hpadding="1em" borderBox flex horizontal justify="flex-start" align="center" height="4em">
          <SText color="#444444" size="24px" weight="700">Reviews</SText>
        </SDiv>
        <StyledHr hmargin={0} />
        <SDiv flex borderBox align="center">
          <SDiv id="content" flex align="center" borderBox>
            {
            recentJobs.length
            && recentJobs.map((item, index) => {
              const { id, info, date } = item;
              return (
                <SDiv id="project" key={id} flex horizontal justify="space-around" width="90%" vpadding="0.4rem" border>
                  <SDiv id="projectDesc" width="70%" flex justify="space-between">
                    <SDiv>
                      <SText color="#444444" size="14px" weight="400" className="block-with-text">
                        {info}
                      </SText>
                    </SDiv>
                    <SDiv>
                      <SText color="#444444" size="11px" weight="400">{date}</SText>
                    </SDiv>
                  </SDiv>
                  <SDiv id="price" width="20%" flex align="flex-end">
                    <StyledButton width="auto" color="primary">View</StyledButton>
                  </SDiv>
                </SDiv>
              );
            })
          }
          </SDiv>
        </SDiv>
      </SDiv> */}

      <SDiv id="actions" vmargin="2em" justify="space-evenly" flex horizontal width="60%">
        {
        //   <StyledButton
        //   variant="contained"
        //   color="secondary"
        //   width="40%"
        // >
        // Chat
        // </StyledButton>
        }
        {!accepted && (
          <StyledButton
            variant="contained"
            color="primary"
            width="40%"
            onClick={acceptBid}
          >
            {loading ? <CircularProgress style={{ color: blue[700] }} size={24} /> : 'Accept Bid '}
          </StyledButton>
        )}
        {accepted && !completed && (
          <StyledButton
            variant="contained"
            color="primary"
            width="40%"
            onClick={() => setOpenRating(true)}
          >
            Complete Job
          </StyledButton>
        )}
      </SDiv>
      <Dialog onClose={() => setOpenRating(false)} open={openRating} fullWidth maxWidth="xs">
        <DialogTitle>Rate Service Provider</DialogTitle>
        <SDiv flex align="center" vmargin="1em">
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <StyledButton
            variant="contained"
            color="primary"
            width="40%"
            vmargin="1em"
            onClick={completeJob}
          >
            {loading ? <CircularProgress style={{ color: '#ffffff' }} size={24} /> : 'Submit '}
          </StyledButton>
        </SDiv>
      </Dialog>

      <Dialog onClose={() => setOpenFeedback(false)} open={openFeedback} fullWidth maxWidth="xs">
        <DialogTitle>Rate Service Provider</DialogTitle>
        <SDiv flex align="center" vmargin="1em">
          You do not have sufficient funds in your wallet for this bid
        </SDiv>
        <DialogActions>
          <StyledButton
            color="primary"
            vmargin="1em"
            onClick={() => setOpenFeedback(false)}
          >
            Cancel
          </StyledButton>
          <StyledButton
            color="primary"
            vmargin="1em"
            onClick={() => history.push('/profile')}
          >
              Go to Wallet
          </StyledButton>
        </DialogActions>
      </Dialog>
    </SDiv>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo.userInfo,
  userData: state.userData
});

export default connect(mapStateToProps)(Bid);
