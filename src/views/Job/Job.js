/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, } from '@material-ui/core';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  Container, ItemCard, Content, StyledHr, SH, StyledInput, StyledButton
} from '../Components/styledComponents';
import { getData, URLS } from '../../_services';
import { styles } from '../../scss/style';

const Job = (props) => {
  const { match: { params: { job_id } }, classes } = props;
  console.log(classes);
  const [job, setJob] = useState({ duration: {} });
  useEffect(() => {
    const getJobList = async () => {
      const response = await getData('GET', `${URLS.GETJOB}${job_id}`);
      if (Object.prototype.hasOwnProperty.call(response, 'meta')) {
        if (response.meta.status === 200) {
          setJob(response.data.job);
        }
      }
    };
    getJobList();
  }, []);

  const {
    job_title, price, job_desc, duration: { days }
  } = job;
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
  return (
    <Container horizontal justify="space-between">
      <Content width="70%">
      <ItemCard height="30vh">
        <Content display="flex" horizontal justify="space-between">
          <h2>{job_title}</h2>
          <Content display="flex" width="30%" align="flex-end" justify="space-around" height="100%">
            <SH>
&#8358;
              {price}
            </SH>
            <SH>{days}</SH>
          </Content>
        </Content>
        <StyledHr />
        <Content>
          <p>{job_desc}</p>
        </Content>
      </ItemCard>
      <ItemCard height="auto" vmargin="2rem">
        <Content display="flex" horizontal justify="space-between">
          <h2>Place a Bid on this Job</h2>
        </Content>
        <StyledHr />
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">.00</InputAdornment>
                ),
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
            // onChange={this.handleChange}
              label="Message"
              name="message"
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
            // onChange={this.handleChange}
              label="Duration"
              name="duration"
              type="text"
              multiline
              rowsMax="4"
              width="100%"
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
              <Content vmargin="2em">
          <StyledButton
              variant="contained"
              color="primary"
              width="50%"
            >
        Log in
            </StyledButton>
            </Content>
        </Content>
      </ItemCard>
    </Content>
      <Content width="25%">
        <ItemCard height="60vh">
        <Content display="flex" horizontal justify="space-between">
        <h4>About the Employer</h4>
      </Content>
      <StyledHr />
        </ItemCard>
        <ItemCard height="30vh" vmargin="2rem"></ItemCard>
      </Content>
    </Container>
  );
};

export default withStyles(styles)(Job);
