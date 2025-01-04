import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter from react-router-dom

import { VotingAddress, VotingAddressABI } from "./constants";


const fetchContract = (signerOrProvider) =>
  new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

export const votingContext = React.createContext();

export const VotingProvider = ({ children }) => {
  const votingTitle = "Voting Dapp";
  const [currentAccount, setCurrentAccount] = useState("");
  const [candidateLength, setCandidateLength] = useState("");
  const pushCandidate = [];
  const candidateIndex = [];
  const [candidateArray, setCandidateArray] = useState(pushCandidate); 

  //__END OF CANDIDATE DATA
  const [error, setError] = useState("");
  // const highestVote = [];

  //--VoTER SECTION
  const pushVoter = [];
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLength] = useState("");
  const [voterAddress, setVoterAddress] = useState([]); // contains address of all voters..

  // conecting Metamask---

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("Please Install Metamask");

    const account = await window.ethereum.request({ method: "eth_accounts" });
    if (account.length) {
      setCurrentAccount(account[0]);
    } else {
      setError("Please Install MetaMask && Connect, Reload");
    }
  };

  //-- comnnect wallet
  const connectWallet = async () => {
    if (!window.ethereum) return setError("Please Install MetaMask");

    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(account[0]);
  };

  // Voter Image Uploading to IPFS
  const uploadToIPFS = async (file) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `
          24d9a55321f6f63f3b75`,
            pinata_secret_api_key: `
          1fcc1a9f8425ce6c9b5ba737c891ee5f8d29ba6d0456bffb6db912ee5cff544d`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        console.log(ImgHash);
        return ImgHash;
      } catch (error) {
        console.log("Error Uploading file to Pinata");
      }
    }
  };
  const uploadToIPFSCandidate = async (file) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `24d9a55321f6f63f3b75`,
            pinata_secret_api_key: `1fcc1a9f8425ce6c9b5ba737c891ee5f8d29ba6d0456bffb6db912ee5cff544d`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("response from Pinata" , response);
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        console.log(ImgHash);
        return ImgHash;
      } catch (error) {
        console.log("Error Uploading file to Pinata");
      }
    }
  };

  //--CREATE VOTERS---
  const createVoter = async (formInput, fileUrl) => {
    try {
      const { name, address, position } = formInput;
      if (!name || !address || !position)
        return setError("Input data is missing");
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const data = JSON.stringify({ name, address, position, image: fileUrl });
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: `
          24d9a55321f6f63f3b75`,
          pinata_secret_api_key: `
          1fcc1a9f8425ce6c9b5ba737c891ee5f8d29ba6d0456bffb6db912ee5cff544d`,
          "Content-Type": "application/json",
        },
      });
      console.log("response from Pinata" , response);
      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    
      const voter = await contract.voterRight(address, name, url, fileUrl); // might need change
      voter.wait();
      console.log(voter);
    } catch (error) {
      setError("Error in Creating Voter");
    }
  };

  const getAllVoterData = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const voterListData = await contract.getVoterList();
      setVoterAddress(voterListData);

      voterListData.map(async (el) => {
        const singleVoterData = await contract.getVoterdata(el);
        pushVoter.push(singleVoterData);
      });

      const voterList = await contract.getVoterLength();
      setVoterLength(voterList.toNumber());
    } catch (error) {
      console.log("Something Went Wrong fetching Data");
    }
  };

  const giveVote = async (id) => {
    try {
      const voterAddress = id.address;
      const voterId = id.id;
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const votedList = await contract.vote(voterAddress, voterId);
      console.log(votedList);
    } catch (error) {
      console.log(error);
    }
  };

  // candidate section---
  // To Create New Candidate of Election---
  const setCandidate = async (candidateForm, fileUrl) => {
    try {
      const { name, address, age } = candidateForm;
      if (!name || !address || !age) return setError("Input data is missing");
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const data = JSON.stringify({ name, address, image: fileUrl, age });
    

      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: `
          24d9a55321f6f63f3b75`,
          pinata_secret_api_key: `
          1fcc1a9f8425ce6c9b5ba737c891ee5f8d29ba6d0456bffb6db912ee5cff544d`,
          "Content-Type": "application/json",
        },
      });
      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      console.log(url);

      const candidate = await contract.setCandidate(
        address,
        age,
        name,
        fileUrl,
        url
      );
      candidate.wait();
      console.log(candidate);
    } catch (error) {
      setError("Error in Creating Voter");
    }
  };

  const getNewCandidate = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const allCandidate = await contract.getCandidate();
      console.log("all",allCandidate);
      allCandidate.map(async (el) => {
        const singleCandidateData = await contract.getCandidatedata(el);
        pushCandidate.push(singleCandidateData);
        candidateIndex.push(singleCandidateData[2].toNumber());
      });

      const allCandidateLength = await contract.getCandidateLength();
      setCandidateLength(allCandidateLength.toNumber());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <votingContext.Provider
        value={{
          setError,
          votingTitle,
          checkIfWalletIsConnected,
          connectWallet,
          uploadToIPFS,
          uploadToIPFSCandidate,
          createVoter,
          getAllVoterData,
          giveVote,
          setCandidate,
          getNewCandidate,
          error,
          voterLength,
          voterArray,
          voterAddress,
          currentAccount,
          candidateArray,
          candidateLength,
        }}
      >
        {children}
      </votingContext.Provider>
    </Router>
  );
};

const voters = () => {
  return <div></div>;
};
