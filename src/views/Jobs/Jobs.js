import React, { useState, useEffect } from 'react';
import { Container, Content } from '../Components/styledComponents';
import { ListItem } from '../Components/Components';
import { getData, URLS } from '../../_services';

const Jobs = (props) => {
  const [jobList, setJobList] = useState([]);
  useEffect(() => {
    const getJobList = async () => {
      const response = await getData('GET', URLS.GETJOBS);
      if (Object.prototype.hasOwnProperty.call(response, 'meta')) {
        if (response.meta.status === 200) {
          setJobList(response.data.jobs);
        }
      }
    };
    getJobList();
  }, []);
  return (
    <Container justify="center">
      <Content width="90%">
        {
          jobList.map(item => (
            <ListItem
              title={item.job_title}
              desc={item.job_desc}
              price={item.price}
              duration={item.duration.days}
              onClick={() => props.history.push({ pathname: `/jobs/${item.job_id}`, state: item })}
            />
          ))
      }
      </Content>
    </Container>
  );
};

export default Jobs;
