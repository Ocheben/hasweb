import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IconButton, CircularProgress } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import {
  Container, Content, ItemCard, ListItem, Input, AddIcon, colors, SText, SDiv
} from '../Components';
import { getData, URLS, APIS } from '../../_services';
import PostJob from './PostJob';
import { setAlert } from '../../_actions/userActions';

const MyJobs = (props) => {
  const { userInfo, dispatch } = props;
  const { userId } = userInfo;
  const [loading, setLoading] = useState(true);
  const [jobList, setJobList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    getJobList();
  }, []);

  const getJobList = async () => {
    setLoading(true);
    const { testUrl, getUserJobs: { path, method } } = APIS;
    const url = testUrl + path(userId);
    try {
      const response = await getData(method, url);
      console.log(response);
      if (!Object.prototype.hasOwnProperty.call(response, 'meta')) {
        dispatch(setAlert({ open: true, variant: 'error', message: 'You havent posted any job yet' }));
      }

      if (response.meta.status !== 200) {
        dispatch(setAlert({ open: true, variant: 'error', message: 'You havent posted any job yet' }));
      }
      setJobList(response.data.jobs);
    } catch (error) {
      console.log(error)
      dispatch(setAlert({ open: true, variant: 'error', message: 'You havent posted any job yet' }));
    }
    setLoading(false);
  };
  return (
    <Container justify="center" align="center">
      {
            loading
              ? (
                <SDiv flex justify="center" height="80vh" align="center">
                  <CircularProgress style={{ color: colors.primary }} size={50} />
                </SDiv>
              )
              : (
                <Content width="80%" shadow>
                  <ItemCard height="4em" horizontal list>
                    <Content flex={3} display="flex" justify="center">
                      <SText color="#444444" size="28px" weight="600">My Jobs</SText>
                      {/* <Input placeholder="Search" variant="outlined" /> */}
                    </Content>
                    <Content display="flex" justify="center" align="flex-end" flex={2}>
                      <IconButton onClick={() => setModalOpen(true)}>
                        <AddIcon color={blue[700]} />
                      </IconButton>
                    </Content>
                  </ItemCard>
                  {
                        loading ? <CircularProgress style={{ color: colors.primary }} size={50} />
                          : Array.isArray(jobList) && jobList.slice(0).reverse().map(item => (
                            <ListItem
                              key={item.job_id}
                              title={item.job_title}
                              desc={item.job_desc}
                              price={item.price}
                              duration={item.duration.days}
                              onClick={() => props.history.push({ pathname: `/myjobs/${item.job_id}`, state: item })}
                            />
                          ))
                    }
                  <PostJob handleClose={() => setModalOpen(false)} open={modalOpen} submit={getJobList} />
                </Content>
              )
          }
    </Container>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo.userInfo
});

export default connect(mapStateToProps)(MyJobs);
