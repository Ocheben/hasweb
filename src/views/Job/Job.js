/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import {
  TextField, InputAdornment, Fade, Button, Icon
} from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  Container, ItemCard, Content, StyledHr, SH, StyledInput, StyledButton, TabButton, SDiv, SText
} from '../Components';
import { getData, URLS } from '../../_services';
import { styles } from '../../scss/style';
import { ListItem, BidItem } from '../Components/Components';

const Job = (props) => {
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
              <StyledHr style={{ margin: '0 -2rem' }} />
              <Content>
                <p>{job_desc}</p>
              </Content>
            </ItemCard>
            <ItemCard height="auto" vmargin="2rem" curved>
              <Content display="flex" horizontal justify="space-between">
                <h2>Place a Bid on this Job</h2>
              </Content>
              <StyledHr style={{ margin: '0 -2rem' }}/>
              <Content>
                <p>You will be able to edit your bid until the project is awarded to someone.</p>
                <h4>Bid Details </h4>
                <Content display="flex" horizontal justify="space-between" vmargin="1em">
                  <StyledInput
                    variant="outlined"
            // onChange={this.handleChange}
                    label="Price"
                    name="price"
                    type="number"
                    width="40%"
                    onChange={e => handleChange(e)}
                    InputProps={{
                      classes: {
                        input: classNames(classes.size),
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                &#8358;
                        </InputAdornment>
                      )
                    }}
                    {...textFieldProps}
                  />
                  <StyledInput
                    variant="outlined"
                    onChange={e => handleChange(e)}
                    label="Duration"
                    name="duration"
                    type="number"
                    width="40%"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">days</InputAdornment>
                      ),
                      classes: {
                        input: classNames(classes.size),
                      },
                    }}
                    {...textFieldProps}
                  />
                </Content>
                <StyledInput
                  variant="outlined"
                  onChange={e => handleChange(e)}
                  label="Message"
                  name="message"
                  type="text"
                  multiline
                  rows="4"
                  width="100%"
                  InputProps={{
                    classes: {
                      input: classNames(classes.size),
                    },
                  }}
                  {...textFieldProps}
                />
                <Content vmargin="2em">
                  <StyledButton
                    variant="contained"
                    color="primary"
                    width="50%"
                    onClick={() => handleSubmit()}
                  >
        Place Bid
                  </StyledButton>
                </Content>
              </Content>
            </ItemCard>
          </Content>
          <Content width="25%">
            <ItemCard height="40vh" curved>
              <Content display="flex" horizontal justify="space-between">
                <h2>About the Employer</h2>
              </Content>
              <StyledHr style={{ margin: '0 -2rem' }} />
              <SDiv tmargin="0.5em">
                <SDiv flex horizontal justify="flex-start" vmargin="0.5em">
                  <Icon style={{ marginRight: '0.5rem', color: '#444444' }}>near_me</Icon>
                  <SText color="#999999" size="17px">Abuja</SText>
                </SDiv>
                <SDiv flex horizontal justify="flex-start" vmargin="0.5em">
                  <Icon style={{ marginRight: '0.5rem', color: '#444444' }}>personal_video</Icon>
                  <SText color="#666666" size="17px">2 Projects completed</SText>
                </SDiv>
                <SDiv flex horizontal justify="flex-start" vmargin="0.5em">
                  <Icon style={{ marginRight: '0.5rem', color: '#444444' }}>person</Icon>
                  <SDiv flex horizontal justify="flex-start">
                    <Icon style={{ color: '#666666' }}>star</Icon>
                    <Icon style={{ color: '#666666' }}>star</Icon>
                    <Icon style={{ color: '#666666' }}>star</Icon>
                    <Icon style={{ color: '#666666' }}>star</Icon>
                    <Icon style={{ color: '#666666' }}>star_border</Icon>
                  </SDiv>
                </SDiv>
                <SDiv flex horizontal justify="flex-start" vmargin="0.5em">
                  <Icon style={{ marginRight: '0.5rem', color: '#444444' }}>access_time</Icon>
                  <SText color="#666666" size="17px">Member since Oct 16, 2019</SText>
                </SDiv>
              </SDiv>
            </ItemCard>
            <ItemCard height="30vh" vmargin="2rem" curved>
              <Content display="flex" horizontal justify="space-between">
                <h2>Bid Summary</h2>
              </Content>
              <StyledHr style={{ margin: '0 -2rem' }} />
              <SDiv tmargin="0.5em">
                <SDiv flex horizontal justify="space-between">
                  <SText color="#444444" weight="500" size="17px">Total Bids</SText>
                  <SText color="#999999" size="17px">15</SText>
                </SDiv>
                <SDiv flex horizontal justify="space-between">
                  <SText color="#444444" weight="500" size="17px">Bids Placed</SText>
                  <SText color="#999999" size="17px">5</SText>
                </SDiv>
                <SDiv flex horizontal justify="space-between">
                  <SText color="#444444" weight="500" size="17px">Bids Left</SText>
                  <SText color="#999999" size="17px">10</SText>
                </SDiv>
                <SDiv flex horizontal justify="space-between">
                  <SText color="#444444" weight="500" size="17px">Bids Accepted</SText>
                  <SText color="#999999" size="17px">4</SText>
                </SDiv>
              </SDiv>
            </ItemCard>
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

export default withStyles(styles)(Job);
