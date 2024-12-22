import React from "react";
import ButtonLink from '../components/ButtonLink.jsx';
import '../StyleSheets/HomePage.css';


function Home () {
    return (
        <div className = "home-page">
            <div className = "main-text">
                <header>
                    <h2>Δράση “Νταντάδες της γειτονιάς”</h2>
                    <p>Υπηρεσία κατ' οίκον φροντίδας βρεφών και νηπίων από 2 μηνών έως 2,5 ετών</p>
                
                    <div className= "Buttons">
                        <ButtonLink className="Criteria" to="/Parent">Είμαι Κηδεμόνας</ButtonLink>
                        <ButtonLink className="Criteria" to="/Nanny">Είμαι Νταντά</ButtonLink>
                    </div>
                            

                         
                </header>
                
                
            </div>
        </div>
    );
};

export default Home;