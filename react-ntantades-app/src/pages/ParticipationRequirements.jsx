import React from "react";
import ButtonLink from '../components/ButtonLink.jsx';
import '../StyleSheets/ParentsGuide.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import BackIcon from '@mui/icons-material/ArrowBack';


function ParticipationRequirements () {
    return (
        <div className="home-page">
            <div>
                <h2>Δικαίωμα συμμετοχής έχουν: </h2>

            </div>

            <div>
                <h3>Για να μπορέσετε να λάβετε χρηματοδότηση ως κηδεμόνας, θα πρέπει: </h3>
            </div>

            <div>
                <ul style={{fontSize: '80%', textAlign:'left', }}>
                    <li> Μητέρες φυσικές, θετές ή ανάδοχες, με βρέφος ή νήπιο, που εργάζονται είτε στο δημόσιο είτε στον ιδιωτικό τομέα, με οποιαδήποτε μορφή απασχόλησης, συμπεριλαμβανομένων και των αυτοαπασχολούμενων και ελεύθερων επαγγελματιών </li>
                    <li> Μητέρες φυσικές, θετές ή ανάδοχες, με βρέφος ή νήπιο, που είναι εγγεγραμμένες στα μητρώα της Δ.ΥΠ.Α. (πρώην ΟΑΕΔ) ως άνεργες</li>
                    <li> Πατέρες φυσικοί, θετοί ή ανάδοχοι, που ασκούν την αποκλειστική γονική μέριμνα βρέφους ή νηπίου και εργάζονται είτε στο δημόσιο είτε στον ιδιωτικό τομέα με οποιαδήποτε μορφή απασχόλησης, συμπεριλαμβανομένων και των αυτοαπασχολούμενων και ελεύθερων επαγγελματιών, </li>
                    <li> Κάθε πρόσωπο στο οποίο έχει ανατεθεί, με δικαστική απόφαση ή εισαγγελική διάταξη, η αποκλειστική επιμέλεια βρέφους ή νηπίου, που εργάζεται είτε στο δημόσιο είτε στον ιδιωτικό τομέα, με οποιαδήποτε μορφή απασχόλησης, συμπεριλαμβανομένων και των αυτοαπασχολούμενων και ελεύθερων επαγγελματιών, </li>
                </ul>

            </div>

            <div>
                <b style={{fontSize: '100%', }}>Επισημαίνεται ότι, οι συνταξιούχοι δεν δύναται να είναι δικαιούχοι της Δράσης καθώς δεν εμπίπτουν στις παραπάνω κατηγορίες</b>                
            </div>

            <Link to="/Parent" style={{ textDecoration: 'none', }}>
                <Button variant="contained" startIcon={<BackIcon />} 
                    sx={{ whiteSpace: 'normal',textAlign: 'center', marginTop:'2%'}}>
                    Επίστροφή στην Σελίδα Κηδεμόνων
                </Button>
            </Link>
        </div>
    );
};

export default ParticipationRequirements;