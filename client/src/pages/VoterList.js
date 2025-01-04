import React , {useState, useEffect, useContext} from 'react';

import VoterCard from '../components/VoterCard';
import "./VoterList.css";
import {votingContext} from "../context/voters";


const VoterList = () => {
    const {getAllVoterData, voterArray} = useContext(votingContext);

    useEffect(()=>{
        getAllVoterData();
    }, []);

  return (
    <div className='voterList'>
        <VoterCard voterArray={voterArray}/>
    </div>
  )
}

export default VoterList
