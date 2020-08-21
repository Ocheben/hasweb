import React from 'react';
import { connect } from 'react-redux';
import { Avatar } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import {
  SDiv, SText, StyledButton, StyledHr, ItemCard, Content
} from '../Components';
import { recentJobs, news } from './data';
import avatar from '../../assets/img/avatar.png';

// eslint-disable-next-line arrow-body-style
const Dashboard = (props) => {
  const { history, userInfo } = props;
  const { rating } = userInfo;
  return (
    <SDiv id="mainView" flex horizontal align="flex-start" justify="space-evenly" fadeIn>
      <SDiv width="60%" justify="center" flex align="center">
        <SDiv id="card" justify="center" vmargin="1em" shadow minHeight="40vh" bg="#ffffff" borderR="0.4em">
          <SDiv id="header" hpadding="1em" borderBox flex horizontal justify="space-between" align="center" height="4em">
            <SText color="#444444" size="24px" weight="700">Recent Projects</SText>
            <StyledButton width="auto" color="primary">View All</StyledButton>
          </SDiv>
          <StyledHr hmargin={0} />
          <SDiv id="content" borderBox>
            {
            recentJobs.length > 3
            && recentJobs.slice(0, 3).map((item, index) => {
              const {
                title, desc, date, noOfBids, skills, id, price
              } = item;
              return (
                <ItemCard curved={index === 2} noBorder={index !== 1} key={id} id="project" horizontal onClick={e => e} width="100%" button list>
                  <SDiv id="project" flex horizontal justify="space-around" vpadding="0.4rem">
                    <SDiv id="projectDesc" width="70%" flex justify="space-between">
                      <SDiv>
                        <SText color="#444444" size="18px" weight="700" className="jobTitle">{title}</SText>
                        <SText color="#999999" size="14px" weight="400" className="block-with-text">{desc}</SText>
                      </SDiv>
                      <SDiv>
                        <SText color="#444444" size="11px" weight="400">{`${date} - ${noOfBids} bid${noOfBids > 1 && 's'}`}</SText>
                        <SText color="#444444" size="11px" weight="400">{skills}</SText>
                      </SDiv>
                    </SDiv>
                    <SDiv id="price" width="20%" flex align="flex-end">
                      <SText color="#444444" size="20px" weight="400">
                      &#8358;
                        {Number(price).toLocaleString()}
                      </SText>
                    </SDiv>
                  </SDiv>
                </ItemCard>
              );
            })
          }
          </SDiv>
        </SDiv>
        <SDiv justify="center" id="card" shadow minHeight="40vh" bg="#ffffff" vmargin="1em" borderR="0.4em">
          <SDiv id="header" hpadding="1em" borderBox flex horizontal justify="space-between" align="center" height="4em">
            <SText color="#444444" size="24px" weight="700">News</SText>
          </SDiv>
          <StyledHr hmargin={0} />
          <SDiv id="content" flex align="center" borderBox>
            {
            news.length
            && news.map((item, index) => {
              const { id, info, date } = item;
              return (
                <SDiv id="project" key={id} flex horizontal justify="space-around" width="90%" vpadding="0.4rem" border bBorderColor="#e9e9e9">
                  <SDiv id="avatar" width="10%">
                    <Avatar alt="User Avatar" src={avatar} />
                  </SDiv>
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
      <SDiv width="30%" justify="flex-start" flex align="center">
        <SDiv id="card" justify="center" vmargin="1em" shadow minHeight="40vh" bg="#ffffff" borderR="0.4em">
          <SDiv hpadding="1em" borderBox id="header" flex horizontal justify="space-between" align="center" height="4em">
            <SText color="#444444" size="24px" weight="700">Oche Onoja</SText>
            <StyledButton width="auto" color="primary" onClick={() => history.push('/profile')}>View</StyledButton>
          </SDiv>
          <StyledHr hmargin={0} />
          <SDiv flex justify="space-around" tmargin="0.5em" height="100%" hpadding="1.5em" borderBox>
            <SDiv flex horizontal bmargin="1em" justify="space-between">
              <SText color="#444444" weight="500" size="17px">Total Bids</SText>
              <SText color="#999999" size="17px">15</SText>
            </SDiv>
            <SDiv flex horizontal bmargin="1em" justify="space-between">
              <SText color="#444444" weight="500" size="17px">Bids Placed</SText>
              <SText color="#999999" size="17px">5</SText>
            </SDiv>
            {/* <SDiv flex horizontal bmargin="1em" justify="space-between">
              <SText color="#444444" weight="500" size="17px">Bids Left</SText>
              <SText color="#999999" size="17px">10</SText>
            </SDiv> */}
            <SDiv flex horizontal bmargin="1em" justify="space-between">
              <SText color="#444444" weight="500" size="17px">Bids Accepted</SText>
              <SText color="#999999" size="17px">4</SText>
            </SDiv>
            <SDiv flex horizontal bmargin="1em" justify="space-between">
              <SText color="#444444" weight="500" size="17px">Rating</SText>
              <Rating
                name="rating"
                value={rating}
              />
            </SDiv>
            <SDiv flex horizontal bmargin="1em" justify="space-between">
              <SText color="#444444" weight="500" size="17px">Wallet Balance</SText>
              <SText color="#1b5e20" size="17px" weight="700">
&#8358;
                {userInfo.walletBal && userInfo.walletBal.toLocaleString()}
              </SText>
            </SDiv>
          </SDiv>
        </SDiv>
        {/* <ItemCard width="84%" height="30vh" vmargin="2rem" curved>
          <SDiv borderBox id="header" flex horizontal justify="space-between" align="center" height="4em">
            <SText color="#444444" size="24px" weight="700">Bid Summary</SText>
            <StyledButton width="auto" color="primary" onClick={() => history.push('/bids')}>View Bids</StyledButton>
          </SDiv>
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
        </ItemCard> */}
      </SDiv>
    </SDiv>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo.userInfo
});

export default connect(mapStateToProps)(Dashboard);
