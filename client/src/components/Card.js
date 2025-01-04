import React from "react";
import "./Card.css";

const Card = ({ candidateArray, giveVote }) => {
  return (
    <div className="card">
      {candidateArray.map((el, i) => (
        <div className="card_box">
          <div className="images">
            <img src={el[3]} alt="profile" />
          </div>
          <div className="card_info">
            <h2>
            ID: {el[1]} #{el[2].toNumber()}
            </h2>
            <p>Age: {el[0]}</p>
            <p>Address: {el[6].slice(0, 30)}...</p>
            <p className="total">Total Vote</p>
          </div>
          <div className="card_vote">
            <p>{el[4].toNumber()}</p>
          </div>
          <div className="card_button">
            <button
              onClick={() => giveVote({ id: el[2].toNumber(), address: el[6] })}
            >
              Give Vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
