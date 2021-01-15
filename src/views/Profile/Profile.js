import React, { useState } from 'react';
import { Avatar, Icon, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Collapse } from '@material-ui/core';
import { connect } from 'react-redux';
import PaystackButton from 'react-paystack';
import {
  SDiv, SText, StyledButton, StyledHr, Input
} from '../Components';
import avatar from '../../assets/img/avatar.png';
import { APIS, getData } from '../../_services';
import { creditWallet } from '../../_actions/authAction';
import { setAlert } from '../../_actions/userActions';
import Withdraw from './Withdraw'

const Profile = (props) => {
  const { userInfo, dispatch } = props;
  const { firstname, lastname } = userInfo;
  const [walletDialog, setWalletDialog] = useState(false);
  const [withdrawDialog, setWithdrawDialog] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [openPay, setOpenPay] = useState(false);
  const initiatePayment = () => {
    console.log('Contacting Paystack');
  };
  const callback = async (response) => {
    console.log(response); // card charged successfully, get reference here
    const { baseUrl, creditWallet: { path, method } } = APIS;
    const url = `${baseUrl}${path}`;
    const data = {
      email: userInfo.email,
      amount: parseInt(depositAmount, 10)
    };

    const res = await getData(method, url, data);
    if (res.meta && res.meta.status === 200) {
      dispatch(setAlert({ open: true, variant: 'info', message: 'Wallet succesfully credited' }));
      dispatch(creditWallet(parseInt(depositAmount, 10)));
    }
    console.log(res);
    setOpenPay(false);
    setWalletDialog(false);
  };

  const close = () => {
    console.log('Payment closed');
  }

  const getReference = () => {
    // you can put any unique reference implementation code here
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=';

    for ( let i=0; i < 15; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  return (
    <SDiv flex align="center">
      <SDiv id="card" bg="#ffffff" align="center" shadow width="70%" borderR="1em" tmargin="3em" borderBox>
        <SDiv id="header" hpadding="1em" borderBox flex horizontal justify="space-between" align="center" height="4em">
          <SText color="#444444" size="24px" weight="700">Profile</SText>
          <StyledButton width="auto" color="primary">
Edit
            {' '}
            <Icon>edit</Icon>
          </StyledButton>
        </SDiv>
        <StyledHr hmargin={0} />
        <SDiv flex horizontal hpadding="1em" borderBox minHeight="40vh" align="center">
          <SDiv id="avatar" flexValue="0" align="center" margin="2em">
            <img alt="User Avatar" className="avatar" src={avatar} />
          </SDiv>
          <SDiv id="bio" width="80%" flex>
            <SText color="#444444" size="24px" weight="700">
              {firstname}
              {' '}
              {lastname}
            </SText>
            <SText color="#999999" size="12px">ocheben@gmail.com</SText>
            <SText color="#666666" size="18px">
              {"I am a software engineer and consultant working with various development teams to ship both Business-to-Business and Business-to-Customer solutions. I am a Javascript expert and currently I build web and mobile applications with React, React Native, PostgreSQL and ExpressJS. I am proficient with a lot of tools, including CSS, HTML, PHP, Python and Illustrator . When I'm not in front of my computer, you can find me reading a book, running or hiking."}
            </SText>
          </SDiv>
        </SDiv>
      </SDiv>
      <SDiv id="card-container" justify="space-between" flex horizontal width="70%" tmargin="3em">
        <SDiv minHeight="30vh" width="48%" vmargin="2rem" hpadding="1em" borderBox borderR="1em" shadow>
          <SDiv id="header" hpadding="1em" borderBox flex horizontal justify="flex-start" align="center" height="4em">
            <SText color="#444444" size="24px" weight="700">Projects Summary</SText>
          </SDiv>
          <StyledHr />
          <SDiv tmargin="0.5em">
            <SDiv flex horizontal justify="space-between">
              <SText color="#444444" weight="500" size="17px">Total Bids</SText>
              <SText color="#999999" size="17px">15</SText>
            </SDiv>
            <SDiv flex horizontal justify="space-between">
              <SText color="#444444" weight="500" size="17px">Bids Placed</SText>
              <SText color="#999999" size="17px">5</SText>
            </SDiv>
            <SDiv flex horizontal justify="space-between">
              <SText color="#444444" weight="500" size="17px">Bids Left</SText>
              <SText color="#999999" size="17px">10</SText>
            </SDiv>
            <SDiv flex horizontal justify="space-between">
              <SText color="#444444" weight="500" size="17px">Bids Accepted</SText>
              <SText color="#999999" size="17px">4</SText>
            </SDiv>
            <SDiv flex horizontal justify="space-between">
              <SText color="#444444" weight="500" size="17px">Jobs Completed</SText>
              <SText color="#999999" size="17px">2</SText>
            </SDiv>
          </SDiv>
        </SDiv>

        <SDiv height="30vh" width="48%" hpadding="1em" borderBox vmargin="2rem" borderR="1em" shadow>
          <SDiv id="header" hpadding="1em" borderBox flex horizontal justify="flex-start" align="center" height="4em">
            <SText color="#444444" size="24px" weight="700">Wallet</SText>
          </SDiv>
          <StyledHr />
          <SDiv tmargin="0.5em">
            <SDiv flex horizontal justify="space-between">
              <SText color="#444444" weight="500" size="17px">Account Balance</SText>
              <SText color="#999999" size="17px">&#8358; {userInfo.walletBal.toLocaleString()}</SText>
            </SDiv>
            <SDiv flex horizontal justify="space-around">
              <StyledButton color="primary" width="auto" onClick={() => setWalletDialog(true)}>Deposit Funds</StyledButton>
              <StyledButton color="primary" width="auto" onClick={() => setWithdrawDialog(true)}>Withdraw Funds</StyledButton>
            </SDiv>
          </SDiv>
        </SDiv>
      </SDiv>

      <Dialog open={walletDialog} onClose={() => setWalletDialog(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Deposit Funds</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deposit funds into your wallet for bids and transactions
          </DialogContentText>
          <Input
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            variant="outlined"
            onChange={({ target }) => setDepositAmount(target.value)}
          />
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={() => setWalletDialog(false)} color="primary">
            Cancel
          </StyledButton>
              <PaystackButton
            text="Deposit"
            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary pay-btn"
            callback={callback}
            close={close}
            reference={getReference()}
            email={'ocheben@gmail.com'}
            amount={parseInt(`${depositAmount}00`, 10)}
            paystackkey={'pk_test_9e6aa7b29355172e9de2ee9b19cfd6bdd99e4a04'}
            tag="button"
            disabled={parseInt(`${depositAmount}`, 10) <= 0}
          />
            </DialogActions>
      </Dialog>
      <Withdraw open={withdrawDialog} handleClose={() => setWithdrawDialog(false)} />
    </SDiv>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo.userInfo
});

export default connect(mapStateToProps)(Profile);
