/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';

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
    padding: ${props => (props.padding ? props.padding : 0)};
    margin: ${props => (props.margin ? props.margin : 0)};
    display: ${props => (props.display ? props.display : 'block')};
    flex: ${props => (props.flex ? props.flex : 'none')};
    flex-direction: ${props => (props.horizontal ? 'row' : 'column')};
    justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
    align-items: ${props => (props.align ? props.align : 'flex-start')};
    margin: ${props => (props.vmargin ? props.vmargin : 0)} ${props => (props.hmargin ? props.hmargin : 0)};
`;

export const ItemCard = styled.div`
    background: #ffffff;
    width: 100%;
    height: ${props => (props.height ? props.height : '15vh')};
    padding: ${props => (props.vpadding ? props.vpadding : 0)} ${props => (props.hpadding ? props.hpadding : '2rem')};
    margin: ${props => (props.vmargin ? props.vmargin : 0)} ${props => (props.hmargin ? props.hmargin : 0)};
    border: ${props => (props.button ? '1px solid #e9e9e9' : 'none')};
    border-radius: ${props => (props.button ? 0 : '0.3rem')};
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
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


export const StyledHr = styled.hr`
    margin: 0 -2rem;
    border: 1px solid #e9e9e9;
`;

export const SH = styled.h5`
    margin: 0;
    width: fit-content;
`;

export const StyledInput = styled(TextField)`
    width: ${props => (props.width ? props.width : '100%')};
`;

export const StyledButton = styled(Button)`
    width: ${props => (props.width ? props.width : '100%')};
`;