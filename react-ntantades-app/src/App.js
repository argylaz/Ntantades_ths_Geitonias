import { Routes, Route } from "react-router-dom";

import Header from './components/header.jsx';
import Footer from './components/footer.jsx';

/* Importing pages */
import Home from './pages/HomePage.jsx';
import HomePageNanny from './pages/HomePageNanny.jsx';
import HomePageParent from './pages/HomePageParent.jsx';
import NannyInstruction from './pages/NannyInstruction.jsx';
import ParentInstruction from './pages/ParentInstruction.jsx';
import EligibilityCriteria from './pages/EligibilityCriteria.jsx';
import Login from './pages/Login.jsx'
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import NannyGuide from "./pages/NannyGuide.jsx";
import ParticipationRequiremenents from "./pages/ParticipationRequirements.jsx"
import ParentsGuide from "./pages/ParentsGuide.jsx"
import FundingRequirements from "./pages/FundingRequirements.jsx"
import ParentsActions from "./pages/ParentsActions.jsx"
import NannyActions from "./pages/NannyActions.jsx"
import Search from "./pages/Search.jsx"
import ScheduleMeeting from "./pages/ScheduleMeeting.jsx";
import NannyResults from "./pages/SearchResults.jsx"
import RequestsNanny from "./pages/RequestsNanny.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Advertisement from "./pages/Advertisement.jsx"
import EditProfile from "./pages/EditProfile.jsx";
import CreateAdvertisement from "./pages/CreateAdvertisement.jsx";
import FAQ from "./pages/FAQ.jsx";
import ParentsRequest from "./pages/ParentsRequest.jsx";
import CreateInterestRequest from './pages/CreateInterestRequest.jsx'
import NannyScheduledMeetings from "./pages/NannyScheduledMeetings.jsx";
import MeetingRequests from "./pages/MeetingRequests.jsx"
import NannyMeetings from "./pages/NannyMeetings.jsx"
import ParentPayment from "./pages/ParentPayment.jsx"
import NannyPayment from "./pages/NannyPayment.jsx"
import NannyReviews from "./pages/NannyReviews.jsx";
import NannyActionHistory from "./pages/NannyActionHistory.jsx"
import ParentActionHistory from "./pages/ParentActionHistory.jsx"

import './StyleSheets/App.css';
import './config/firebase.js'


function App() {
  return (
    <div className = "App">
      <header className = "App-header">
        {/* Header is always the same */}
        <Header />
      </header>  

      <div className="App-content">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/NannyInstruction" element={<NannyInstruction />} />
              <Route path="/ParentInstruction" element={<ParentInstruction />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Profile/Edit" element={<EditProfile />} />
              <Route path="/Nanny" element={<HomePageNanny />} />
              <Route path="/Nanny/Guide" element={<NannyGuide />} />
              <Route path="/Nanny/EligibilityCriteria" element={<EligibilityCriteria />} />
              <Route path="/Parent" element={<HomePageParent />} />
              <Route path="/Parent/ParentsGuide" element={<ParentsGuide />} />
              <Route path="/Parent/FundingRequirements" element={<FundingRequirements />} />
              <Route path="/Parent/ParticipationRequirements" element={<ParticipationRequiremenents />} />
              <Route path="/Parent/Actions/Search" element={<Search/>} />
              <Route path="/Parent/Actions/Search/NannyResults" element={<NannyResults/>} />
              <Route path="/Parent/Actions/Search/NannyResults/ScheduleMeeting" element={<ScheduleMeeting />} />
              <Route path="/Parent/Actions" element={<ParentsActions/>} />
              <Route path="/Parent/Actions/ParentPayment" element={<ParentPayment/>} />
              <Route path="/Parent/Actions/ParentsRequest" element={<ParentsRequest/>} />
              <Route path="/Parent/Actions/ParentsRequest/CreateInterestRequest" element={<CreateInterestRequest/>} />
              <Route path="/Parent/Actions/ParentActionHistory" element={<ParentActionHistory/>} />
              <Route path="/Nanny/Actions" element={<NannyActions/>} />
              <Route path="/Nanny/Actions/Requests" element={<RequestsNanny />} />
              <Route path="/Nanny/Actions/Advertisement" element={<Advertisement />} />
              <Route path="/Nanny/Actions/Advertisement/CreateAdvertisement" element={<CreateAdvertisement />} />
              <Route path="/Nanny/Actions/NannyMeetings/NannyScheduledMeetings" element={<NannyScheduledMeetings />} />
              <Route path="/Nanny/Actions/NannyMeetings/MeetingRequests" element={<MeetingRequests />} />
              <Route path="/Nanny/Actions/NannyMeetings" element={<NannyMeetings />} />
              <Route path="/Nanny/Actions/NannyPayment" element={<NannyPayment />} />
              <Route path="/Nanny/Actions/NannyReviews" element={<NannyReviews/>} />
              <Route path="/Nanny/Actions/NannyActionHistory" element={<NannyActionHistory/>} />

              <Route path="*" element={<PageNotFound/>} />
          </Routes>
      </div>

      {/* Fixed Footer */}
      <footer className="App-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;