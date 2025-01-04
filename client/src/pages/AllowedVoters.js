import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import { useDropzone } from "react-dropzone";
import { votingContext } from "../context/voters";
import "./AllowedVoters.css";
import Button from "../components/Button";
import organiser from "../img/organiser.jpg"
import Input from "../components/Input";

const AllowedVoters = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });

  const history = useNavigate(); // Initialize useHistory
  const { uploadToIPFS, createVoter, voterArray, getAllVoterData } =
    useContext(votingContext);

  //---VOTERS IMAGE DROP
  const onDrop = useCallback(async (acceptedFil) => {
    const url = await uploadToIPFS(acceptedFil[0]);
    setFileUrl(url);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  useEffect(() => {
    getAllVoterData();
  }, []);

  return (
    <div className="createVoter-vt">
      <div>
        {fileUrl && (
          <div className="voterInfo-vt">
            <img src={fileUrl} alt="Voters Image" />
            <div className="VoterInfo_para-vt">
              <p>
                {" "}
                Name: <span> {formInput.name}</span>
              </p>
              <p>
                {" "}
                Add: <span> {formInput.address.slice(0, 20)}</span>
              </p>
              <p>
                {" "}
                Pos: <span> {formInput.position}</span>
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="aln-vt">
        <div className="voter_container-vt">
          <h1>Create New Voter</h1>
          <div className="voter_container_box-vt">
            <div className="voter_container_box_div-vt">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="voter_container_box_div_info-vt">
                  <p>Upload File: JPG, PNG, GIF, WEBM, Max 10MB</p>
                  <div className="voter_container_box_div_image-vt">
                    {/* <Image></Image> */}
                  </div>
                  <p>Drag & Drop File</p>
                  <p>Browse Media on your Device</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="voter-vt">
          <div className="input_container-vt">
            <Input
              inputType="text"
              title="Name"
              placeholder="Voter Name"
              handleClick={(e) =>
                setFormInput({ ...formInput, name: e.target.value })
              }
            />
            <Input
              inputType="text"
              title="Address"
              placeholder="Voter Address"
              handleClick={(e) =>
                setFormInput({ ...formInput, address: e.target.value })
              }
            />
            <Input
              inputType="text"
              title="Their Thoughts"
              placeholder="Voter Thought"
              handleClick={(e) =>
                setFormInput({ ...formInput, position: e.target.value })
              }
            />

            <div className="Button-vt">
              <Button
                btnName="Authorized Voter"
                handleClick={() => {
                  createVoter(formInput, fileUrl);
                  history("/voter-list");
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="createdVoter-vt">
        <div className="createdVoter_info-vt">
          <img src={organiser} alt="Organiser"/>
          <h3>Notice For User:</h3>
          <h4>
            Organizer <span>0x 55445115424...</span>
          </h4>
          <p>Voters Registration are open , Bring Relevent Documents</p>
            <p>and reach your Nearest Center..</p>
          <h4>Only For Organizers</h4>
        </div>
      </div>
    </div>
  );
};

export default AllowedVoters;
