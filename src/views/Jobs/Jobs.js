import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IconButton, CircularProgress } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import {
  Container, Content, ItemCard, ListItem, FilterIcon, Input, SDiv, SText, colors
} from '../Components';
import { getData, URLS, APIS } from '../../_services';


const Jobs = (props) => {
  const { userInfo } = props;
  const { userId } = userInfo;
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getJobList = async () => {
      setLoading(true);
      const { testUrl, getJobs: { path, method } } = APIS;
      const url = testUrl + path;
      const response = await getData(method, url);
      if (!Object.prototype.hasOwnProperty.call(response, 'meta')) {
        return null;
      }

      if (response.meta.status !== 200) {
        return null;
      }
      setLoading(false);
      return setJobList(response.data.jobs);
    };
    getJobList();
  }, []);
  return (
    <Container id="container" align="center" justify="center">
      {loading ? (
        <SDiv flex justify="center" height="80vh" align="center">
          <CircularProgress style={{ color: colors.primary }} size={50} />
        </SDiv>
      ) : (
        <Content width="80%" shadow>
          <ItemCard height="4em" horizontal list>
            <Content flex={3} display="flex" justify="center">
              <SText color="#444444" size="28px" weight="600">Jobs</SText>
              {/* <Input placeholder="Search" variant="outlined" /> */}
            </Content>
            <Content display="flex" justify="center" align="flex-end" flex={2}>
              {/* <IconButton>
                <FilterIcon color={blue[700]} />
              </IconButton> */}
            </Content>
          </ItemCard>
          {
            jobList.slice(0).reverse().filter(job => !job.assigned && job.user_id !== userId).map(item => (
              <ListItem
                key={item.job_id}
                title={item.job_title}
                desc={item.job_desc}
                price={item.price}
                phone={item.phone}
                name={`${item.firstname} ${item.lastname}`}
                duration={item.duration}
                onClick={() => props.history.push({ pathname: `/jobs/${item.job_id}`, state: item })}
              />
            ))
        }
        </Content>

      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo.userInfo
});

export default connect(mapStateToProps)(Jobs);
