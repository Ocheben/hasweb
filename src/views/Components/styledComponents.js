/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';
import { blue, grey } from '@material-ui/core/colors';
import { fadeIn, noAnimation, fadeAnimation } from './keyframes';
import { borderColor } from '@material-ui/system';

export const Card = styled.div`
position: relative;
width: 100%;
border: 1px solid #fff;
border-radius: .5rem;
height: ${props => (props.button ? '150px' : 'auto')};
box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
background: #ffffff;
border:0;
border-left:6px solid ${props => (props.color ? props.color : '#fff')};
padding: 1rem;
margin: 0 0 1rem;
&:hover{
    box-shadow: ${props => (props.button
    ? '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
    : '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)')
} ;
}
`;

export const Container = styled.div`
    width: ${props => (props.width ? props.width : '100%')};
    padding: ${props => (props.padding ? props.padding : 0)};
    margin: ${props => (props.vmargin ? props.vmargin : 0)};
    display: flex;
    flex-direction: ${props => (props.horizontal ? 'row' : 'column')};
    justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
    align-items: ${props => (props.align ? props.align : 'flex-start')}
`;

export const Content = styled.div`
    width: ${props => (props.width ? props.width : '100%')};
    height: ${props => (props.height ? props.height : 'auto')};
    padding: ${props => (props.vpadding || 0)} ${props => (props.hpadding || 0)};
    /* margin: ${props => (props.margin ? props.margin : 0)}; */
    display: ${props => (props.display ? props.display : 'block')};
    flex: ${props => (props.flex ? props.flex : 'none')};
    flex-direction: ${props => (props.horizontal ? 'row' : 'column')};
    justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
    align-items: ${props => (props.align ? props.align : 'flex-start')};
    margin: ${props => (props.vmargin || 0)} ${props => (props.hmargin || 0)};
    box-shadow: ${props => (props.shadow
    ? '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
    : 'none')
};
`;
export const SDiv = styled.div`
  display: ${props => (props.flex ? 'flex' : props.display || 'block')};
  width: ${props => (props.width || '100%')};
  height: ${props => (props.height || 'auto')};
  min-height: ${props => (props.minHeight || 0)};
  max-height: ${props => (props.maxHeight || 'none')};
  flex-direction: ${props => (props.horizontal ? 'row' : 'column')};
  margin: ${props => (props.tmargin || props.vmargin || props.margin || 0)} ${props => (props.rmargin || props.hmargin || props.margin || 0)} ${props => (props.bmargin || props.vmargin || props.margin || 0)} ${props => (props.lmargin || props.hmargin || props.margin || 0)};
  padding: ${props => (props.vpadding || props.padding || 0)} ${props => (props.hpadding || props.padding || 0)};
  background: ${props => props.bg || 'transparent'};
  flex: ${props => props.flexValue || '1 1 1'};
  justify-content: ${props => (props.justify || 'center')};
  align-items: ${props => (props.align || 'left')};
  /* border-right: 1px solid ${props => (props.rborder || 'transparent')}; */
  /* border-radius: ${props => (props.borderR || props.borderTl || 5)} ${props => (props.borderR || props.borderTr || 5)} ${props => (props.borderR || props.borderBr || 5)} ${props => (props.borderR || props.borderBl || 5)}; */
  border-top-left-radius: ${props => (props.borderR || props.borderTl || 0)};
  border-top-right-radius: ${props => (props.borderR || props.borderTr || 0)};
  border-bottom-right-radius: ${props => (props.borderR || props.borderBr || 5)};
  border-bottom-left-radius: ${props => (props.borderR || props.borderBl || 5)};
  border-style: ${props => (props.border ? 'solid' : 'none')};
  border-width: thin;
  border-top-color: ${props => (props.tBorderColor || props.borderColor || 'transparent')};
  border-right-color: ${props => (props.rBorderColor || props.borderColor || 'transparent')};
  border-bottom-color: ${props => (props.bBorderColor || props.borderColor || 'transparent')};
  border-left-color: ${props => (props.lBorderColor || props.borderColor || 'transparent')};
  overflow: ${props => (props.overflow || 'visible')};
  box-sizing: ${props => (props.borderBox ? 'border-box' : 'content-box')};
  box-shadow: ${props => (props.shadow ? '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)' : 'none')};
  animation: ${props => (props.fadeIn ? fadeIn : noAnimation)} 0.5s linear;
  transition: ${props => (props.animHeight && 'height 0.6s')};
  @media(max-width: 768px) {
    flex-direction: ${props => (props.mobHorizontal ? 'row' : 'column')};
    height: ${props => props.mobHeight || 'auto'};
    min-height: ${props => props.mobMinHeight || '2em'};
    width: ${props => props.mobWidth || 'auto'};
    justify-content: ${props => (props.mobJustify || 'center')};
    align-items: ${props => (props.mobAlign || 'left')};
  }
`;

export const ItemCard = styled.div`
    background: #ffffff;
    width: ${props => (props.width ? props.width : '100%')};;
    height: ${props => (props.height ? props.height : '15vh')};
    padding: ${props => (props.vpadding ? props.vpadding : 0)} ${props => (props.hpadding ? props.hpadding : '2rem')};
    margin: ${props => (props.vmargin ? props.vmargin : 0)} ${props => (props.hmargin ? props.hmargin : 0)};
    border: ${props => (
    // eslint-disable-next-line no-nested-ternary
    props.button ? props.noBorder ? 'none' : '0.5px solid #e9e9e9' : 'none'
  )};
    border-radius: ${props => (props.curved ? '0.3rem' : 0)};
    box-shadow: ${props => (props.list
    ? 'none'
    : '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)')
};
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    justify-content: flex-start;
    /* align-self: flex-start; */
    &:hover{
        box-shadow: ${props => (props.button
    ? '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
    : '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)')
};
    border-left: ${props => (props.button ? '4px solid #2196f3' : 'none')};
    };
    display: flex;
    flex-direction: ${props => (props.horizontal ? 'row' : 'column')};
    cursor: ${props => (props.button ? 'pointer' : 'auto')}
`;


export const SText = styled.p`
  text-align: ${props => (props.align || 'left')};
  font-size: ${props => (props.size || '17px')};
  font-weight: ${props => (props.weight || '400')};
  color:  ${props => (props.color || '#000000')};
  margin: ${props => (props.vmargin || 0)} ${props => (props.hmargin || 0)};
  line-height: ${props => (props.lineHeight || 1.6)};
  @media(max-width: 768px) {
    font-size: ${props => (props.mobSize || props.size || '17px')};
  }
`;


export const StyledHr = styled.hr`
    /* margin: ${props => (props.vmargin || props.margin || 0)} ${props => (props.hmargin || props.margin || '-2rem')}; */
    margin: 0;
    border: 1px solid #e9e9e9;
`;

export const SH = styled.h5`
    margin: 0;
    width: fit-content;
`;

export const StyledInput = styled(TextField)`
    && {
        width: ${props => (props.width || '100%')};
        margin: ${props => (props.vmargin || 0)} ${props => (props.hmargin || 0)};
    }
`;

export const StyledButton = styled(Button)`
    && {
        width: ${props => (props.width || '100%')};
        height: auto;
        @media(max-width: 768px) {
          width: ${props => props.mobWidth || 'auto'};
        }
    }
`;

export const TabButton = styled(Button)`
    && {
        border: none;
        border-bottom: 1.5px solid ${props => (props.active ? blue[700] : 'transparent')};
        border-radius: 0;
        color: ${props => (props.active ? blue[700] : grey[700])};
    }
`;
