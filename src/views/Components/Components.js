import React from 'react';
import { ItemCard, Content } from './styledComponents';

// eslint-disable-next-line import/prefer-default-export
export const ListItem = (props) => {
  const {
    title, desc, price, duration, onClick
  } = props;
  return (
    <ItemCard horizontal onClick={onClick} button>
      <Content flex={3}>
        <h3>{title}</h3>
        <p>{desc}</p>
      </Content>
      <Content flex={1}>
        <h5>{price}</h5>
        <h5>{duration}</h5>
      </Content>
    </ItemCard>
  );
};


export const JobDetail = (props) => {
  const {
    title, desc, price, duration
  } = props;
  return (
    <ItemCard height={'30vh'}></ItemCard>
  )
}