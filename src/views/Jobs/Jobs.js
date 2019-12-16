import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import {
  Container, Content, ItemCard, ListItem, FilterIcon, Input
} from '../Components';
import { getData, URLS } from '../../_services';


const Jobs = (props) => {
  const [jobList, setJobList] = useState([]);
  useEffect(() => {
    const getJobList = async () => {
      const response = await getData('GET', URLS.GETJOBS);
      if (!Object.prototype.hasOwnProperty.call(response, 'meta')) {
        return null;
      }

      if (response.meta.status !== 200) {
        return null;
      }
      return setJobList(response.data.jobs);
    };
    getJobList();
  }, []);
  return (
    <Container id="container" align="center" justify="center">
      <Content width="80%" shadow>
        <ItemCard height="4em" horizontal list>
          <Content flex={3} display="flex" justify="center">
            <Input placeholder="Search" variant="outlined" />
          </Content>
          <Content display="flex" justify="center" align="flex-end" flex={2}>
            <IconButton>
              <FilterIcon color={blue[700]} />
            </IconButton>
          </Content>
        </ItemCard>
        {
          jobList.slice(0).reverse().map(item => (
            <ListItem
              key={item.job_id}
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
