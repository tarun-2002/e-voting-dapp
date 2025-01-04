import React, { useContext, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { votingContext } from "../context/voters";
import vote from "../img/vote.png";
import "./NavBar.css";

const NavBar = () => {
  const { connectWallet, error, currentAccount , setError} = useContext(votingContext);

  const [openNav, setOpenNav] = useState(true);

  const openNavigation = () => {
    setOpenNav(!openNav); // Simplified toggle for openNav state
  };
  const closemsg=()=>{
    setError("");
  }

  return (
    <div className="navbar">
      {error && ( // Use logical AND operator to conditionally render error message
        <div  className="message_box">
          <div className="message">
            <p onClick={closemsg}>{error}</p>
          </div>
        </div>
      )}
      <div className="navbar_box">
        <div className="title">
          <Link to="/"> {/* Use Link and specify 'to' attribute for navigation */}
            <img src={vote} alt="e-voter Logo"></img>
          </Link>
        </div>

        <div className="connect">
          {currentAccount ? (
            <div>
              <div className="connect_flex">
                <button onClick={openNavigation}>
                  {currentAccount.slice(0, 10)}..
                </button>
                {currentAccount && (
                  <span>
                    {openNav ? (
                      <AiFillUnlock onClick={openNavigation} />
                    ) : (
                      <AiFillLock onClick={openNavigation} />
                    )}
                  </span>
                )}
              </div>
              {openNav && (
                <div className="navigation">
                  <p>
                    <Link to="/">Home</Link>
                  </p>
                  <p>
                    <Link to="/candidate-registration">Candidate Registration</Link>
                  </p>
                  <p>
                    <Link to="/allowed-voters">Voter Registration</Link>
                  </p>
                  <p>
                    <Link to="/voter-list">Voter List</Link>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button onClick={connectWallet}> Connect Wallet</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
