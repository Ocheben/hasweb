import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../scss/style';
import { StyledInput } from './styledComponents';

const Input = (props) => {
  const {
    classes, InputProps, InputLabelProps, ...otherProps
  } = props;
  const textFieldProps = {
    InputLabelProps: {
      classes: {
        root: classes.label,
      },
      ...InputLabelProps
    },
    InputProps: {
      classes: {
        input: classes.input,
        focused: classes.inputFocused,
      },
      ...InputProps,
    },
    FormHelperTextProps: {
      className: 'formHelper'
    }
  };
  return (
    <StyledInput {...textFieldProps} {...otherProps} />
  );
};

export default withStyles(styles)(Input);
