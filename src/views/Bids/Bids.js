/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IconButton, CircularProgress } from '@material-ui/core';
import {
  Container, Content, ItemCard, ListItem, FilterIcon, colors, SDiv, SText, StyledHr, PersonIcon, PhoneIcon
} from '../Components';
import { getData, URLS, APIS } from '../../_services';


const Bids = (props) => {
  const { userInfo: { userId } } = props;
  const [loading, setLoading] = useState(false)
  const [bidList, setBidList] = useState([]);
  useEffect(() => {
    const getBidList = async () => {
      setLoading(true)
      const { testUrl, getUserBids: { path, method } } = APIS;
      const url = testUrl + path(userId);
      const response = await getData(method, url);
      console.log(response);
      if (!Object.prototype.hasOwnProperty.call(response, 'meta')) {
        return null;
      }

      if (response.meta.status !== 200) {
        return null;
      }
      setLoading(false);
      return setBidList(response.data.bids);
    };
    getBidList();
  }, [userId]);
  return (
    <Container id="container" align="center" justify="center">
      {loading ? (
        <SDiv flex justify="center" height="80vh" align="center">
          <CircularProgress style={{ color: colors.primary }} size={50} />
        </SDiv>
      ) : (
        <SDiv width="80%">
          <SDiv id="card" justify="center" vmargin="1em" shadow bg="#ffffff" borderR="0.4em">
            <SDiv id="header" hpadding="1em" borderBox flex horizontal justify="space-between" align="center" minHeight="4em">
              <SText color="#444444" size="24px" weight="700">Bids</SText>
            </SDiv>
            <StyledHr hmargin={0} />
            <SDiv id="content" borderBox>
              {
            bidList.slice(0).reverse().map((item, index) => {
              const {
                bid_id, firstname, lastname, job_title, job_desc, price, accepted, completed, phone
              } = item;
              return (
                <ItemCard curved={index === bidList.length - 1} key={bid_id} id="project" horizontal onClick={e => e} width="100%" button list>
                  <SDiv id="project" flex horizontal justify="space-around" vpadding="0.4rem">
                    <SDiv id="projectDesc" width="70%" flex justify="space-between">
                      <SDiv>
                        <SText color="#444444" size="18px" weight="700" className="jobTitle">{job_title}</SText>
                        <SText color="#999999" size="14px" weight="400" className="block-with-text">{job_desc}</SText>
                      </SDiv>
                      <SDiv>
                        <SDiv flex horizontal justify="flex-start" align="center">
                          <PersonIcon size="14px" color="#444444" />
                          <SText color="#444444" size="14px" weight="400" hmargin="5px">{`${firstname} ${lastname}`}</SText>
                        </SDiv>
                        <SDiv flex horizontal justify="flex-start" align="center">
                          <PhoneIcon size="14px" color="#444444" />
                          <SText color="#444444" size="14px" weight="400" hmargin="5px">{phone}</SText>
                        </SDiv>
                      </SDiv>
                    </SDiv>
                    <SDiv id="price" width="20%" flex align="flex-end">
                      <SText color="#444444" size="20px" weight="700">
                          &#8358;
                        {Number(price).toLocaleString()}
                      </SText>
                      {accepted && (
                      <SText color="#ffc107" size="20px" weight="700">
                          ACCEPTED
                      </SText>
                      )}
                      {completed && (
                      <SText color="#1b5e20" size="20px" weight="700">
                          COMPLETED
                      </SText>
                      )}
                    </SDiv>
                  </SDiv>
                </ItemCard>
              );
            })
        }
            </SDiv>
          </SDiv>
        </SDiv>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo.userInfo
});


export default connect(mapStateToProps)(Bids);
