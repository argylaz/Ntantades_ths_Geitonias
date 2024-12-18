import React from "react";
import ButtonLink from '../components/ButtonLink.jsx';
import '../StyleSheets/HomePage.css';


function HomePageNanny () {
    return (
        <div className = "home-page">
            <div className = "main-text">
                <header>
                    <h2>Ξεκινήστε την διαδικασία εγγραφής στο Μητρώο Νταντάδων</h2>

                
                    <div className= "Buttons">
                        <ButtonLink to="/SignIn">Είσοδος στην Υπηρεσία με κωδικούς taxis</ButtonLink>
                    </div>

                         
                </header>
                
                
            </div>
        </div>
    );
};

export default HomePageNanny;