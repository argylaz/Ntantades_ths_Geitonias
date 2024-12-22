import React from "react";
import ButtonLink from '../components/ButtonLink.jsx';
import '../StyleSheets/ParentsGuide.css';


function ParentsGuide () {
    return (
        <div>
            <div>
                <h2>Οδηγίες προς τους Κηδεμόνες</h2>

                <h3>Οδηγίες Υποβολής Αίτησης για Εύρεση Νταντάς</h3>

                <ul style={{fontSize: '80%',}}>
                    <li> Για να συμμετάσχετε στην Δράση “Νταντάδες της Γειτονιάς” ως κηδεμόνας, αρχικά πρέπει να επιλέξετε “Είμαι Κηδεμόνας” στην Αρχική Σελίδα, και στη συνέχεια να πατήσετε το κουμπί “Είσοδος στην Υπηρεσία με κωδικούς taxisNet”.  </li>
                    <li> Στη συνέχεια, αφού συμπληρώσετε τα απαραίτητα στοιχεία, θα υποβάλλεται την αίτηση σας </li>
                    <li> Μετά την έγκριση της αίτησής σας, αποκτάται δικαίωμα πρόσβασης στα προφίλ των διαθέσιμων Νταντάδων, μέσω του Πληροφοριακού Συστήματος της Δράσης ntantades.gov.gr. Έτσι, θα έχετε τη δυνατότητα να έρθετε σε επαφή μαζί τους και να δρομολογήσετε τη μεταξύ σας συνεργασία. </li>
                    <li> Αφού είστε πλέον συνδεδεμένοι, μπορείτε να πλοηγηθείτε στην Σελίδα Ενεργειών Κηδεμόνων, όπου μπορείτε να επιλέξετε μια από τις ακόλουθες ενέργειες: <b>Αναζήτηση Νταντάδων, Αίτηση ενδιαφέροντος συνεργασίας, Πληρώμη Νταντάς, Ιστορικό Ενεργειών, Λήξη/Ανανέωση 
                    Συνεργασίας</b></li>
                </ul>



            </div>

            <div className= "Back">
                <ButtonLink to="/Parent">Επίστροφή στην Σελίδα Κηδεμόνων</ButtonLink>
            </div>

        </div>
    );
};

export default ParentsGuide;