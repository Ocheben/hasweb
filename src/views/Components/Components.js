import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { InputAdornment, MenuItem } from '@material-ui/core';
import { styles } from '../../scss/style';
import { ItemCard, Content, StyledInput, SDiv, SText } from './styledComponents';
import { PersonIcon, PhoneIcon } from './icons';

// eslint-disable-next-line import/prefer-default-export
export const ListItem = (props) => {
  const {
    title, desc, price, duration, name, phone, onClick
  } = props;
  return (
    <ItemCard horizontal onClick={onClick} button list>
      <SDiv id="project" flex horizontal justify="space-around" vpadding="0.4rem">
        <SDiv id="projectDesc" width="70%" flex justify="space-between">
          <SDiv>
            <SText color="#444444" size="18px" weight="700" className="jobTitle">{title}</SText>
            <SText color="#999999" size="14px" weight="400" className="block-with-text">{desc}</SText>
          </SDiv>
          <SDiv>
            {name && (
              <SDiv flex horizontal justify="flex-start" align="center">
                <PersonIcon size="14px" color="#444444" />
                <SText color="#444444" size="14px" weight="400" hmargin="5px">{name}</SText>
              </SDiv>
            )}
            {phone && (
              <SDiv flex horizontal justify="flex-start" align="center">
                <PhoneIcon size="14px" color="#444444" />
                <SText color="#444444" size="14px" weight="400" hmargin="5px">{phone}</SText>
              </SDiv>
            )}
          </SDiv>
        </SDiv>
        <SDiv id="price" width="20%" flex align="flex-end">
          <SText color="#444444" size="20px" weight="700">
              &#8358;
            {Number(price).toLocaleString()}
          </SText>
          <SText color="#444444" size="14px">
            {duration} day(s)
          </SText>
          {/* {accepted && (
          <SText color="#ffc107" size="20px" weight="700">
              ACCEPTED
          </SText>
          )}
          {completed && (
          <SText color="#1b5e20" size="20px" weight="700">
              COMPLETED
          </SText>
          )} */}
        </SDiv>
      </SDiv>
      {/* <Content flex={3}>
        <h3>{title}</h3>
        <p>{desc}</p>
      </Content>
      <Content flex={1}>
        <h5>{price}</h5>
        <h5>{duration}</h5>
      </Content> */}
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
  const {
    preicon, endicon, select, options
  } = props;
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
      endAdornment: endicon && (
        <InputAdornment position="start">{endicon}</InputAdornment>
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
