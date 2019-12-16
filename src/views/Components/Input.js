import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../scss/style';
import { StyledInput } from './styledComponents';

const Input = (props) => {
  const { classes, ...inputProps } = props;
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
    },
    FormHelperTextProps: {
      className: 'formHelper'
    }
  };
  return (
    <StyledInput {...inputProps} {...textFieldProps} />
  );
};

export default withStyles(styles)(Input);
