/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import {
  TextField, InputAdornment, Fade, Button, Icon, CircularProgress
} from '@material-ui/core';
import { connect } from 'react-redux';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  Container, ItemCard, Content, StyledHr, SH, StyledInput, StyledButton, TabButton, SDiv, SText, colors
} from '../Components/styledComponents';
import { getData, URLS } from '../../_services';
import { setUserJobBids, actionCreator } from '../../_actions/userActions';
import { styles } from '../../scss/style';
import { ListItem, BidItem } from '../Components/Components';
import { setJobBids } from '../../_actions/authAction';

const MyJob = (props) => {
  const { match: { params: { job_id } }, userInfo, classes, dispatch } = props;
  const { userId } = userInfo;
  const [loading, setLoading] = useState(false)
  const [jobState, setJobState] = useState({
    job: {},
    bids: []
  });
  const [showBids, toggleShowBids] = useState(false);

  useEffect(() => {
    const getJobList = async () => {
      setLoading(true);
      const response = await getData('GET', `${URLS.GETJOB}${job_id}`);
      console.log(response);
      const bids = await getData('GET', `${URLS.GETJOBBIDS}${job_id}`);

      console.log(bids);
      if (!Object.prototype.hasOwnProperty.call(response, 'meta')
      || !Object.prototype.hasOwnProperty.call(bids, 'meta')
      ) {
        return null;
      }

      if (response.meta.status !== 200) {
        return null;
      }
      // dispatch(actionCreator('SET_USERJOBBIDS', bids.data.bids));
      dispatch(setJobBids(bids.data ? bids.data.bids : []));
      setLoading(false);
      return setJobState(j => ({
        ...j,
        job: response.data.job,
        bids: bids.data ? bids.data.bids : [],
        formInputs: {
          userId,
          jobId: response.data.job.job_id,
          skillId: response.data.job.skill_id,
          skillLevel: 4,
          date: new Date().toISOString()
        }
      }));
    };
    // setUserJobBids(job_id);
    getJobList();
  }, [job_id]);

  const getBidsList = async () => {
    const response = await getData('GET', `${URLS.GETJOBBIDS}${job_id}`);
    console.log(response)
    if (!Object.prototype.hasOwnProperty.call(response, 'meta')) {
      return null;
    }

    if (response.meta.status !== 200) {
      return null;
    }

    return setJobState({
      ...jobState,
      bids: response.data.bids,
    });
  };

  const handleChange = ({ target }) => {
    const value = () => {
      if (target.name === 'message') {
        return target.value;
      }
      return parseInt(target.value, 10);
    };

    return setJobState(j => ({
      ...j,
      formInputs: {
        ...j.formInputs,
        [target.name]: value()
      }
    }));
  };

  const handleSubmit = async () => {
    const response = await getData('POST', URLS.POSTBID, jobState.formInputs);
    if (!Object.prototype.hasOwnProperty.call(response, 'meta')) {
      return null;
    }

    if (response.meta.status !== 200) {
      return null;
    }
    getBidsList();
    return toggleShowBids(true);
  };
  const {
    job_title, price, job_desc, duration
  } = jobState.job;
  const textFieldProps = {
    InputLabelProps: {
      classes: {
        root: classes.label,
      }
    },
    FormHelperTextProps: {
      className: 'formHelper'
    }
  };
  console.log(jobState.job)
  return (
    <div>
      {loading ? (
        <SDiv flex justify="center" height="80vh" align="center">
          <CircularProgress style={{ color: colors.primary }} size={50} />
        </SDiv>
      ) : (
        <>
          <Content display="flex" vmargin="0.5em" align="center">
            <Content display="flex" align="flex-start" width="80%">
              <ButtonGroup>
                <TabButton active={!showBids} onClick={() => toggleShowBids(false)}>Details</TabButton>
                <TabButton active={showBids} onClick={() => toggleShowBids(true)}>Proposals</TabButton>
              </ButtonGroup>
            </Content>
          </Content>
          <Fade in={!showBids} unmountOnExit mountOnEnter timeout={500}>
            <Container align="center">
              <Content width="80%">
                <ItemCard height="30vh" curved>
                  <Content display="flex" horizontal justify="space-between">
                    <h2>{job_title}</h2>
                    <Content display="flex" width="30%" align="flex-end" justify="space-around" height="100%">
                      <SH>
    &#8358;
                        {Number(price).toLocaleString()}
                      </SH>
                      <SH>
                        {duration}
                        {' '}
                      day
                        {duration > 1 && 's'}

                      </SH>
                    </Content>
                  </Content>
                  <StyledHr style={{ margin: '0 -2rem' }} />
                  <Content>
                    <p>{job_desc}</p>
                  </Content>
                </ItemCard>
              </Content>
              {
            //   <Content width="25%">
            //   <ItemCard height="40vh" curved>
            //     <Content display="flex" horizontal justify="space-between">
            //       <h2>About the Employer</h2>
            //     </Content>
            //     <StyledHr style={{ margin: '0 -2rem' }} />
            //     <SDiv tmargin="0.5em">
            //       <SDiv flex horizontal justify="flex-start" vmargin="0.5em">
            //         <Icon style={{ marginRight: '0.5rem', color: '#444444' }}>near_me</Icon>
            //         <SText color="#999999" size="17px">Abuja</SText>
            //       </SDiv>
            //       <SDiv flex horizontal justify="flex-start" vmargin="0.5em">
            //         <Icon style={{ marginRight: '0.5rem', color: '#444444' }}>personal_video</Icon>
            //         <SText color="#666666" size="17px">2 Projects completed</SText>
            //       </SDiv>
            //       <SDiv flex horizontal justify="flex-start" vmargin="0.5em">
            //         <Icon style={{ marginRight: '0.5rem', color: '#444444' }}>person</Icon>
            //         <SDiv flex horizontal justify="flex-start">
            //           <Icon style={{ color: '#666666' }}>star</Icon>
            //           <Icon style={{ color: '#666666' }}>star</Icon>
            //           <Icon style={{ color: '#666666' }}>star</Icon>
            //           <Icon style={{ color: '#666666' }}>star</Icon>
            //           <Icon style={{ color: '#666666' }}>star_border</Icon>
            //         </SDiv>
            //       </SDiv>
            //       <SDiv flex horizontal justify="flex-start" vmargin="0.5em">
            //         <Icon style={{ marginRight: '0.5rem', color: '#444444' }}>access_time</Icon>
            //         <SText color="#666666" size="17px">Member since Oct 16, 2019</SText>
            //       </SDiv>
            //     </SDiv>
            //   </ItemCard>
            //   <ItemCard height="30vh" vmargin="2rem" curved />
            // </Content>
              }
              <SDiv width="80%" flex tmargin="3em">
                <SText color="#444444" size="24px" weight="700">Bids</SText>
              </SDiv>
              <Content width="80%">
                {
              jobState.bids.slice(0).reverse().filter(bid => (jobState.job.assigned ? bid.accepted : true)).map(item => (
                <BidItem
                  key={item.bid_id}
                  title={`${item.firstname} ${item.lastname}`}
                  desc={item.message}
                  price={item.price}
                  duration={item.duration}
                  onClick={() => props.history.push({ pathname: `/myjobs/bids/${item.bid_id}`, state: item })}
                />
              ))
          }
              </Content>
            </Container>
          </Fade>
          <Fade in={showBids} unmountOnExit mountOnEnter style={{ top: 0 }}>
            <Container horizontal justify="space-between">
              <Content width="90%">
                {
              jobState.bids.slice(0).filter(bid => jobState.job.assigned && bid.accepted).reverse().map(item => (
                <BidItem
                  key={item.bid_id}
                  title={`${item.firstname} ${item.lastname}`}
                  desc={item.message}
                  price={item.price}
                  duration={item.duration}
                  onClick={() => props.history.push({ pathname: `/myjobs/bids/${item.bid_id}`, state: item })}
                />
              ))
          }
              </Content>
            </Container>
          </Fade>
        </>
      )}


    </div>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo.userInfo
});

export default connect(mapStateToProps)(withStyles(styles)(MyJob));
