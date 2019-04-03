import styled, {keyframes} from 'styled-components'
import {green, grey} from '@material-ui/core/colors'

export const Card = styled.div`
position: relative;
width: 100%;
border: 1px solid #fff;
border-radius: .5rem;
height: ${props=>props.button ? "150px" : "auto" };
box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
background: #ffffff;
border:0;
border-left:6px solid ${props=>props.color ? props.color : "#fff"};
padding: 1rem;
margin: 0 0 1rem;
&:hover{
    box-shadow: ${props=> props.button ? 
        "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)" :
        "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"  
    } ;
}
`;