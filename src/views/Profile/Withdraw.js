/* eslint-disable radix */
import React, { useState, useEffect } from 'react';
import { Avatar, Icon, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Collapse, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import PaystackButton from 'react-paystack';
import {
  SDiv, SText, StyledButton, StyledHr, Input
} from '../Components';
import avatar from '../../assets/img/avatar.png';
import { APIS, getData, requestJwt } from '../../_services';
import { creditWallet, debitWallet } from '../../_actions/authAction';
import { setAlert } from '../../_actions/userActions';

const Withdraw = (props) => {
  const { userInfo, dispatch, open, handleClose } = props;
  const { firstname, lastname, userId } = userInfo;
  const [walletDialog, setWalletDialog] = useState(false);
  const [withdrawDialog, setWithdrawDialog] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [openPay, setOpenPay] = useState(false);
  const [bankOptions, setBankOptions] = useState([]);
  const [nuban, setNuban] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [nubanRef, setNubanRef] = useState('');
  const [transferCode, setTransferCode] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    getBanksList();
  }, []);

  const getBanksList = async () =>  {
    const { baseUrl, getBanks: { method, path } } = APIS;
    const url = baseUrl + path;
    try {
      const banksList = await requestJwt(method, url, {}, '');
      if (banksList.meta && banksList.meta.status === 200) {
        const optionsList = (banksList.data || []).map(bank => ({
          name: bank.name,
          value: bank.code
        }));
        setBankOptions(optionsList);
      }
    } catch (error) {
      console.log('unable to get banks list');
    }
  };
  const addNuban = async () => {
    const { baseUrl, addNuban: { method, path } } = APIS;
    const url = baseUrl + path;
    setLoading(true);
    try {
      const payload = { nuban, bankCode, userId };
      const nubanData = await requestJwt(method, url, payload, '');
      console.log(nubanData, method);
      if (nubanData.meta && nubanData.meta.status === 200) {
        const { account_name: accName } = nubanData.data;
        setAccountName(accName);
        setNubanRef(nubanData.recipientCode);
      }
    } catch (error) {
      console.log('unable to get banks list');
    }
    setLoading(false);
  };

  const initPayout = async () => {
    const { baseUrl, initPayout: { method, path } } = APIS;
    const url = baseUrl + path;
    setLoading(true);
    try {
      const payload = { nubanRef, amount: parseInt(amount), userId };
      const payoutData = await requestJwt(method, url, payload, '');
      console.log(payoutData, method);
      if (payoutData.meta && payoutData.meta.status === 200) {
        const { transfer_code: trfCode } = payoutData.data || {}
        setTransferCode(trfCode);
        dispatch(setAlert({ open: true, variant: 'info', message: payoutData.meta.message }));
      }
      if (payoutData.meta && payoutData.meta.status === 404) {
        dispatch(setAlert({ open: true, variant: 'error', message: payoutData.meta.message }));
      }
    } catch (error) {
      console.log(error);
      console.log('unable to get banks list');
    }
    setLoading(false)
  };

  const finalizePayout = async () => {
    const { baseUrl, finalizePayout: { method, path } } = APIS;
    const url = baseUrl + path;
    setLoading(true);
    try {
      const payload = { transferCode, otp, amount: parseInt(amount), userId };
      const payoutData = await requestJwt(method, url, payload, '');
      console.log(payoutData, method);
      if (payoutData.meta && payoutData.meta.status === 200) {
        const { transfer_code: trfCode } = payoutData.data || {}
        console.log(payoutData.data)
        setTransferCode(trfCode);
        dispatch(debitWallet(parseInt(amount)));
        dispatch(setAlert({ open: true, variant: 'info', message: payoutData.meta.message }));
        closeWithdraw();
      }
      if (payoutData.meta && payoutData.meta.status === 404) {
        dispatch(setAlert({ open: true, variant: 'error', message: payoutData.meta.message }));
      }
    } catch (error) {
      console.log(error);
      console.log('unable to get banks list');
    }
    setLoading(false);
  };

  const closeWithdraw = () => {
    setAccountName('');
    setTransferCode('');
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Withdraw Funds</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter an account number to deposit funds
        </DialogContentText>
        <Input
          autoFocus
          margin="dense"
          id="nuban"
          label="Account Nummber"
          type="number"
          variant="outlined"
          onChange={({ target }) => setNuban(target.value)}
        />
        <Input
          label="Bank"
          variant="outlined"
          select
          options={bankOptions}
          name="skillId"
          value={bankCode}
          onChange={({ target }) => setBankCode(target.value)}
          vmargin="0.5em"
          // width="100%"
        />
      </DialogContent>
      <Collapse in={accountName === ''}>
        <DialogActions>
          <StyledButton onClick={closeWithdraw} color="primary">
            Cancel
          </StyledButton>
          <StyledButton onClick={() => addNuban()} color="primary">
            {loading ? <CircularProgress size={24} /> : 'Select Account'}
          </StyledButton>
        </DialogActions>
      </Collapse>
      <Collapse in={accountName !== ''}>
        <DialogContent>
          <DialogContentText>
            <strong>Account Name</strong>
            :
            <span>{accountName}</span>
          </DialogContentText>
          <Input
            // autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            variant="outlined"
            onChange={({ target }) => setAmount(target.value)}
          />
        </DialogContent>
        <Collapse in={transferCode === ''}>
          <DialogActions>
            <StyledButton onClick={closeWithdraw} color="primary">
              Cancel
            </StyledButton>
            <StyledButton onClick={() => initPayout()} color="primary">
              {loading ? <CircularProgress size={24} /> : 'Withdraw'}
            </StyledButton>
          </DialogActions>
        </Collapse>
      </Collapse>
      <Collapse in={transferCode !== ''}>
        <DialogContent>
          <DialogContentText>
            Confirm payout with OTP sent to your phone
          </DialogContentText>
          <Input
            // autoFocus
            margin="dense"
            id="otp"
            label="OTP"
            type="number"
            variant="outlined"
            onChange={({ target }) => setOtp(target.value)}
          />
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={closeWithdraw} color="primary">
            Cancel
          </StyledButton>
          <StyledButton onClick={() => finalizePayout()} color="primary">
            {loading ? <CircularProgress size={24} /> : 'Withdraw'}
          </StyledButton>
        </DialogActions>
      </Collapse>
    </Dialog>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo.userInfo
});

export default connect(mapStateToProps)(Withdraw);
