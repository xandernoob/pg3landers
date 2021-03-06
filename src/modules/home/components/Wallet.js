import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Web3 from "web3";
import {
  setAccountData,
  setWeb3Error,
  connect2Contract,
  setWeb3Client,
} from "../../../actions/web3Actions";
import OutlinedButton from "../../common/components/OutlinedButton";
import MetamaskLogo from "../../../assets/svg/Metamask-logo.svg";

const Wallet = ({
  setAccountDataProp,
  metamaskError,
  balance,
  accountAddress,
  connect2ContractProp,
  web3Client,
  contract,
  setWeb3ClientProp,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      dispatch(setWeb3Client(web3));
    }
  }, []);

  const linkWallet = async () => {
    if (window.ethereum) {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        dispatch(setAccountData(account[0]));
      } catch (error) {
        if (error.code === 4001) {
          dispatch(setWeb3Error(error));
        }
      }
    } else {
      alert("install metamask extension!!");
    }
  };

  return (
    <Card variant="outlined" style={{ width: "350px", padding: "1.5rem" }}>
      <Typography sx={{ fontSize: 16, textAlign: "justify" }} gutterBottom>
        Connect with your available metamask wallet or create a new wallet to
        Sign in.
      </Typography>
      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <OutlinedButton onClick={linkWallet}>
          <div>
            Connect
            <img
              style={{
                height: "18px",
                paddingLeft: "1.5rem",
                verticalAlign: "text-bottom",
              }}
              src={MetamaskLogo}
            />
          </div>
        </OutlinedButton>
      </div>
    </Card>
  );
};

const mapStateToProps = (state, _ownProps) => ({
  metamaskError: state.web3Reducer.error,
  balance: state.web3Reducer.balance,
  accountAddress: state.web3Reducer.accountAddress,
  web3Client: state.web3Reducer.web3Client,
  contract: state.web3Reducer.contractMeta.contract,
});

export default connect(mapStateToProps)(Wallet);

