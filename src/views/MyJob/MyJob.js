/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import {
  TextField, InputAdornment, Fade, Button
} from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  Container, ItemCard, Content, StyledHr, SH, StyledInput, StyledButton, TabButton
} from '../Components/styledComponents';
import { getData, URLS } from '../../_services';
import { styles } from '../../scss/style';
import { ListItem, BidItem } from '../Components/Components';

const MyJob = (props) => {
  const { match: { params: { job_id } }, classes } = props;
  const [jobState, setJobState] = useState({
    job: {},
    bids: []
  });
  const [showBids, toggleShowBids] = useState(false);

  useEffect(() => {
    const getJobList = async () => {
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

      return setJobState(j => ({
        ...j,
        job: response.data.job,
        bids: bids.data ? bids.data.bids : [],
        formInputs: {
          userId: 7,
          jobId: response.data.job.job_id,
          skillId: response.data.job.skill_id,
          skillLevel: 4,
          date: new Date().toISOString()
        }
      }));
    };
    getJobList();
  }, [job_id]);

  const getBidsList = async () => {
    const response = await getData('GET', `${URLS.GETJOBBIDS}${job_id}`);
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
      <Content display="flex" vmargin="0.5em" align="flex-start">
        <ButtonGroup>
        <TabButton active={!showBids} onClick={() => toggleShowBids(false)}>Details</TabButton>
        <TabButton active={showBids} onClick={() => toggleShowBids(true)}>Proposals</TabButton>
      </ButtonGroup>
      </Content>
      <Fade in={!showBids} unmountOnExit mountOnEnter timeout={500}>
        <Container horizontal justify="space-between">
          <Content width="70%">
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
              <StyledHr />
              <Content>
                <p>{job_desc}</p>
              </Content>
            </ItemCard>
          </Content>
          <Content width="25%">
            <ItemCard height="50vh" curved>
              <Content display="flex" horizontal justify="space-between">
                <h4>About the Employer</h4>
              </Content>
              <StyledHr />
            </ItemCard>
            <ItemCard height="30vh" vmargin="2rem" curved />
          </Content>
        </Container>
      </Fade>
      <Fade in={showBids} unmountOnExit mountOnEnter style={{ top: 0 }}>
        <Container horizontal justify="space-between">
          <Content width="90%">
            {
          jobState.bids.slice(0).reverse().map(item => (
            <BidItem
              key={item.bid_id}
              title={`${item.firstname} ${item.lastname}`}
              desc={item.message}
              price={item.price}
              duration={item.duration}
            />
          ))
      }
          </Content>
        </Container>
      </Fade>


    </div>
  );
};

export default withStyles(styles)(MyJob);
