import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { InputAdornment, MenuItem } from '@material-ui/core';
import { styles } from '../../scss/style';
import { ItemCard, Content, StyledInput } from './styledComponents';

// eslint-disable-next-line import/prefer-default-export
export const ListItem = (props) => {
  const {
    title, desc, price, duration, onClick
  } = props;
  return (
    <ItemCard horizontal onClick={onClick} button list>
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
    <ItemCard height="30vh" />
  );
};

export const BidItem = (props) => {
  const {
    title, desc, price, duration, onClick
  } = props;
  return (
    <ItemCard horizontal onClick={onClick} vmargin="1em" button curved>
      <Content flex={3}>
        <h3>{title}</h3>
        <p>{desc}</p>
      </Content>
      <Content flex={1}>
        <h5>
          {price}
          {' '}
          in
          {' '}
          {duration}
          {' '}
          day
          {duration > 1 && 's'}
        </h5>
      </Content>
    </ItemCard>
  );
};

export const Input = withStyles(styles)((props) => {
  const { classes, ...inputProps } = props;
  const { preicon, select, options } = props;
  const textFieldProps = {
    InputLabelProps: {
      classes: {
        root: classes.label,
      }
    },
    InputProps: {
      classes: {
        input: classes.size
      },
      startAdornment: preicon && (
        <InputAdornment position="start">{preicon}</InputAdornment>
      ),
    },
    FormHelperTextProps: {
      className: 'formHelper'
    }
  };
  return (
    <StyledInput {...inputProps} {...textFieldProps}>
      {select && options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.name}
        </MenuItem>
      ))}
    </StyledInput>
  );
});
