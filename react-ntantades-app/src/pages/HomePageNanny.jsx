import React from "react";
import ButtonLink from '../components/ButtonLink.jsx';
import '../StyleSheets/HomePageNanny.css';


function HomePageNanny () {
    return (
        <div className = "home-page">
            <div className = "main-text">
                <header>
                    <h2>Ξεκινήστε την διαδικασία εγγραφής στο Μητρώο Νταντάδων</h2>

                    <br/>
                </header>
            </div>

            <div className= "Login">
                <ButtonLink to="/Login">Είσοδος στην Υπηρεσία με κωδικούς taxis</ButtonLink>
            </div>

            <div className= "Buttons">
                        <ButtonLink to="/Nanny/EligibilityCriteria">Κριτήρια Επιλεξιμότητας</ButtonLink>
                        <ButtonLink to="/Nanny/Guide">Οδηγίες για την Εγγραφή στο Μητρώο Νταντάδων</ButtonLink>
            </div>


        </div>
    );
};

export default HomePageNanny;