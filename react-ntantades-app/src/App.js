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
import RequestsNanny from "./pages/RequestsNanny.jsx";

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
              <Route path="/Parent/Actions" element={<ParentsActions/>} />
              <Route path="/Nanny/Actions" element={<NannyActions/>} />
              <Route path="/Nanny/Actions/Requests" element={<RequestsNanny />} />
          </Routes>

        {/* Footer is also alwats the same */}
        <Footer/>
      </header>
    </div>
  );
}

export default App;



// import React from "react";
// // import { BreadcrumbElements } from "./BreadcrumbElements";
// // import { Footer } from "./Footer";
// // import { IcHome48Px } from "./IcHome48Px";
// // import { Login } from "./Login";
// // import rectangle14Stroke4 from "./rectangle-14-stroke-4.svg";
// // import rectangle15 from "./rectangle-15.svg";
// import "./StyleSheets/style.css";
// // import vector from "./vector.svg";

// export const App = () => {
//     return (
//         <div className="screen">
//             <div className="overlap-group-wrapper">
//                 <div className="overlap-group">
//                     {/* <img className="rectangle" alt="Rectangle" src={rectangle15} /> */}

//                     {/* <Footer className="footer-instance" /> */}
//                     <div className="view">
//                         <div className="section-text">
//                             <div className="top">
//                                 <div className="caption">ΔΡΑΣΗ “ΝΤΑΝΤΑΔΕΣ ΤΗΣ ΓΕΙΤΟΝΙΑΣ”</div>

//                                 <p className="secondary-headline">
//                                     Υπηρεσία κατ&#39; οίκον φροντίδας βρεφών και νηπίων από 2
//                                     μηνών έως 2,5 ετών
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="buttons-group">
//                             <button className="button">
//                                 <div className="text-container">
//                                     <div className="button-text">Είμαι Κηδεμόνας</div>
//                                 </div>
//                             </button>

//                             <button className="text-container-wrapper">
//                                 <div className="button-text-wrapper">
//                                     <div className="button-text-2">Είμαι Νταντά</div>
//                                 </div>
//                             </button>
//                         </div>
//                     </div>

//                     {/* <div className="breadcrumb">
//                         <BreadcrumbElements
//                             background
//                             className="breadcrumb-elements-instance"
//                             divClassName="breadcrumb-elements-3"
//                             groupClassName="design-component-instance-node"
//                             groupClassNameOverride="breadcrumb-elements-2"
//                             icon
//                             override={<IcHome48Px className="ic-home-px" opacity="0.7" />}
//                             state="one-idle"
//                             text="Αρχική Σελίδα"
//                         />
//                         <div className="breadcrumb-elements-4" />
//                     </div> */}

//                     <div className="header-default">
//                         <div className="logo-container-5">
//                             {/* <img
//                                 className="img"
//                                 alt="Rectangle stroke"
//                                 src={rectangle14Stroke4}
//                             /> */}

//                             <div className="text-wrapper-3">Logo</div>
//                         </div>

//                         <div className="menu">
//                             <div className="menu-item">
//                                 <div className="menu-item-2">Aρχική</div>
//                             </div>

//                             <div className="menu-item">
//                                 <div className="menu-item-2">Ειδοποιήσεις</div>
//                             </div>

//                             <div className="menu-item">
//                                 <div className="menu-item-2">Συχνές Ερωτήσεις</div>
//                             </div>

//                             <div className="dropdown-menu">
//                                 <div className="frame-2">
//                                     <div className="text-wrapper-4">Οδηγίες</div>

//                                     {/* <img className="vector" alt="Vector" src={vector} /> */}
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="buttons-group-2">
//                             <button className="div-wrapper">
//                                 <div className="text-container">
//                                     <div className="button-text-3">Κηδεμόνας</div>
//                                 </div>
//                             </button>

//                             <button className="button-2">
//                                 <div className="text-container">
//                                     <div className="button-text-4">Νταντά</div>
//                                 </div>
//                             </button>
//                         </div>

//                         <div className="button-3">
//                             <div className="text-container-2">
//                                 <div className="button-text-3">Σύνδεση</div>
//                             </div>

//                             {/* <Login className="login-instance" /> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default App;