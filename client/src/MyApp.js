import React, { useState, useEffect, useContext } from "react";
import Countdown from "react-countdown";

import { votingContext } from "./context/voters";
import Card from "./components/Card";
import "./MyApp.css";

const MyApp = () => {
  const {
    candidateArray,
    giveVote,
    currentAccount,
    checkIfWalletIsConnected,
    candidateLength,
    voterLength,
    getAllVoterData,
    getNewCandidate,
  } = useContext(votingContext);

  useEffect(() => {
    console.log(voterLength);
    checkIfWalletIsConnected();
    getAllVoterData();
    getNewCandidate();
  }, []);

  return (
    <div className="home">
      {currentAccount && (
        <div className="winner">
          <div className="winner_Info">
            <div className="candidate_list">
              <p>
                No of candidate : <span>{candidateLength}</span>
              </p>
            </div>
            <div className="candidate_list">
              <p>
                No of Voter:<span>{voterLength}</span>
              </p>
            </div>
          </div>
          <div className="winner_message">
            <small>
              {" "}<p>
                Winner Will Be Declared After Election
              </p>
            </small>
          </div>
        </div>
      )}
      {candidateArray.length > 0 ? (
        <Card candidateArray={candidateArray} giveVote={giveVote} />
      ) : (
        <p>No candidates registered</p>
      )}
    </div>
  );
};

export default MyApp;
