import "./App.css";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import { VotingProvider } from "./context/voters";
import NavBar from "./components/NavBar";
import MyApp from "./MyApp";
import CandidateRegistration from "./pages/CandidateRegistration";
import AllowedVoters from "./pages/AllowedVoters";
import VoterList from "./pages/VoterList";

function App() {
  return (
    <VotingProvider>
      <div className="App">
      <NavBar />
        <Routes>
          <Route path="/" element={<MyApp />} />
          <Route
            path="/candidate-registration"
            element={<CandidateRegistration/>}
          />
          <Route path="/allowed-voters" element={<AllowedVoters/>} />
          <Route path="/voter-list" element={<VoterList/>} />
        </Routes>
      </div>
    </VotingProvider>
  );
}

export default App;
