import React from "react";

import "./VoterCard.css";


const VoterCard = ({voterArray}) => {
  return (
    <div className="card">
      {voterArray.map((el, i) => (
        <div className="card_box">
          <div className="image">
            <img src={el[4]} alt="Profile Photo" />
          </div>
          <div className="card_info">
            <h2>
              {el[1]} #{el[0].toNumber()}
            </h2>
            <p>Address: {el[3].slice(0, 30)}...</p>
            <p>details</p>
            <p className="vote_Status">
              {el[6] == true ? "Already Voted" : "Not Voted"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoterCard;
