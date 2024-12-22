import React from "react";
import ButtonLink from '../components/ButtonLink.jsx';
import '../StyleSheets/HomePage.css';


function HomePageNanny () {
    return (
        <div className = "home-page">
            <div className = "main-text">
                <header>
                    <h2>Ξεκινήστε την διαδικασία εύρεσης Νταντάς</h2>

                    <br/>
                </header>
            </div>

            <div className= "Login">
                <ButtonLink to="/Login">Είσοδος στην Υπηρεσία με κωδικούς taxis</ButtonLink>
            </div>

            <div className= "Buttons">
                        <ButtonLink to="/Parent/ParticipationRequirements">Προϋποθέσεις Συμμετοχής</ButtonLink>
                        <ButtonLink to="/Parent/FundingRequirements">Προϋποθέσεις Λήψης Χρηματοδότησης</ButtonLink>
                        <ButtonLink to="/Parent/ParentsGuide">Οδηγίες</ButtonLink>
            </div>


        </div>
    );
};

export default HomePageNanny;