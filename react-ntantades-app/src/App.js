import { Routes, Route } from "react-router-dom";

import Header from './components/header.jsx';
import Footer from './components/footer.jsx';

/* Importing pages */
import Home from './pages/HomePage.jsx';
import HomePageNanny from './pages/HomePageNanny.jsx';
import HomePageParent from './pages/HomePageParent.jsx';
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


import './StyleSheets/App.css';
import './config/firebase.js'


function App() {
  return (
    <div className = "App">
      <header className = "App-header">
        {/* Header is always the same (for now) */}
        <Header />

          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Profile" element={<Profile />} />
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
              <Route path="/Nanny/Actions" element={<NannyActions/>} />
              <Route path="/Nanny/Actions/Requests" element={<RequestsNanny />} />
              <Route path="*" element={<PageNotFound/>} />
          </Routes>

        {/* Footer is also alwats the same */}
        <Footer/>
      </header>
    </div>
  );
}

export default App;