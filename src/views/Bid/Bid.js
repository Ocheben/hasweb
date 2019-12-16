import React from 'react';
import { Avatar, Icon } from '@material-ui/core';
import {
  SDiv, SText, StyledButton, StyledHr
} from '../Components';
import avatar from '../../assets/img/avatar.png';
import { recentJobs } from './data';

const Bid = (props) => {
  const { prop } = props;
  return (
    <SDiv flex align="center">
      <SDiv id="card" bg="#ffffff" align="center" shadow width="70%" borderR="1em" tmargin="3em" borderBox>
        <SDiv id="header" hpadding="1em" borderBox flex horizontal justify="space-between" align="center" height="4em">
          <SText color="#444444" size="24px" weight="700">Bid Details</SText>
          <StyledButton width="auto" color="primary">
            Accept Bid
          </StyledButton>
        </SDiv>
        <StyledHr hmargin={0} />
        <SDiv flex horizontal hpadding="1em" borderBox minHeight="40vh" align="center">
          <SDiv id="avatar" flexValue="0" align="center" margin="2em">
            <img alt="User Avatar" className="avatar" src={avatar} />
          </SDiv>
          <SDiv id="bio" width="80%" flex>
            <SText color="#444444" size="24px" weight="700">
              {'Oche'}
              {' '}
              {'Onoja'}
            </SText>
            <SText color="#999999" size="12px">ocheben@gmail.com</SText>
            <SText color="#666666" size="18px">
              {"I am a software engineer and consultant working with various development teams to ship both Business-to-Business and Business-to-Customer solutions. I am a Javascript expert and currently I build web and mobile applications with React, React Native, PostgreSQL and ExpressJS. I am proficient with a lot of tools, including CSS, HTML, PHP, Python and Illustrator . When I'm not in front of my computer, you can find me reading a book, running or hiking."}
            </SText>
          </SDiv>
        </SDiv>
      </SDiv>

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
      </SDiv>

      <SDiv id="card" bg="#ffffff" align="center" shadow width="70%" borderR="1em" tmargin="3em" borderBox>
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
      </SDiv>

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
        <StyledButton
          variant="contained"
          color="primary"
          width="40%"
        >
        Accept Bid
        </StyledButton>
      </SDiv>
    </SDiv>
  );
};

export default Bid;
