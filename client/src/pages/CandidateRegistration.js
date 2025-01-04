import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { votingContext } from "../context/voters";
import "./CandidateRegistration.css";
import Button from "../components/Button";
import organizer from "../img/organiser.jpg"
import Input from "../components/Input";

const CandidateRegistration = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    address: "",
    age: "",
  });

  const history = useNavigate();
  const {
    uploadToIPFSCandidate,
    setCandidate,
    candidateArray,
    getNewCandidate,
  } = useContext(votingContext);

  const onDrop = useCallback(async (acceptedFil) => {
    const url = await uploadToIPFSCandidate(acceptedFil[0]);
    setFileUrl(url);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  useEffect(() => {
    getNewCandidate();
  }, []);

  return (
    <div className="createVoter">
      <div>
        {fileUrl && (
          <div className="voterInfo">
            <img src={fileUrl} alt="Voters Image" />
            <div className="VoterInfo_para">
              <p>
                {" "}
                Name: <span> {candidateForm.name}</span>
              </p>
              <p>
                {" "}
                Addr: <span> {candidateForm.address.slice(0, 20)}</span>
              </p>
              <p>
                {" "}
                Age: <span> {candidateForm.age}</span>
              </p>
            </div>
          </div>
        )}
        {!fileUrl && (
          <div className="sideInfo">
            <div className="sideInfo_box">
              <h4>Create Candidate For Voting</h4>
              <p>Blockchain Based E-Voting Machine</p>
              <p className="sideInfo_para">Contract Candidate</p>
            </div>
            <div className="car">
              {candidateArray.map((el, i) => (
                <div key={i + 1} className="card_box">
                  <div className="image">
                    <img src={el[3]} alt="Profile Photo" />
                  </div>
                  <div className="card_info">
                    <p>
                      {el[1]} #{el[2].toNumber()}
                    </p>
                    <p>{el[0]}</p>
                    <p>Address: {el[6].slice(0, 10)}..</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="voter">
        <div className="voter_container">
          <h1>Create New Candidate</h1>
          <div className="voter_container_box">
            <div className="voter_container_box_div">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="voter_container_box_div_info">
                  <p>Upload File: JPG, PNG, GIF, WEBM, Max 10MB</p>
                  <div className="voter_container_box_div_image">
                    <img src="upload.img" alt="Uploading image" />
                  </div>
                  <p>Drag & Drop File</p>
                  <p>Browse Media on your Device</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="input_container">
          <Input
            inputType="text"
            title="Name"
            placeholder="Candidate Name"
            handleClick={(e) =>
              setCandidateForm({ ...candidateForm, name: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Address"
            placeholder="Candidate Address"
            handleClick={(e) =>
              setCandidateForm({ ...candidateForm, address: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="age"
            placeholder="Candidate age"
            handleClick={(e) =>
              setCandidateForm({ ...candidateForm, age: e.target.value })
            }
          />

          <div className="Button">
            <Button
              btnName="Authorized Candidate"
              handleClick={() => {
                setCandidate(candidateForm, fileUrl);
                history("/");
              }}
            />
          </div>
        </div>
      </div>
      <div className="createdVoter">
        <div className="createdVoter_info">
        <img src={organizer} alt="Organiser"/>
          <p>Notice For User</p>
          <p>
            Organizer <span>0x 55445115424...</span>
          </p>
          <p>Only For Organizers</p>
        </div>
      </div>
    </div>
  );
};

export default CandidateRegistration;
