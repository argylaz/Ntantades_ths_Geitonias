import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "../StyleSheets/HomePage.css"


export default function FAQ() {
  return (
 
    <div style={{
        width: "50%",
        // display: "flex", // Enables flexbox layout
        flexDirection: "column", // Ensures elements stack vertically
        alignItems: "center", // Centers items horizontally
        justifyContent: "center", // Centers items vertically
        // height: "100vh", // Makes the div fill the full viewport height
    }}>

        <h3 style={{color:"#948472",}}> Συχνές Ερωτήσεις </h3>

        <Accordion style={{backgroundColor:"grey", }}>
            <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            >
            <Typography component="span">Ποιοί έχουν δικαίωμα λήψης χρηματοδότησης και ποιες προϋποθέσεις πρέπει να πληρούν;</Typography>
            </AccordionSummary>
            <AccordionDetails style={{backgroundColor:"grey",}}>
            <Typography>
                <ul style={{textAlign:'left',}}>
                    Όσοι
                    <li> έχουν συμπληρώσει το 18ο έτος της ηλικίας τους, </li>
                    <li> είναι Έλληνες ή αλλοδαποί πολίτες που διαμένουν νόμιμα στην Ελλάδα και
                    έχουν πρόσβαση στην αγορά εργασίας, και</li>
                    <li> πληρούν τις προϋποθέσεις της υπ’ αριθμ: 41866/24-04-2023 Τροποποίησης
                    της Πρόσκλησης Εκδήλωσης Ενδιαφέροντος προς υποψήφιους/ες </li>
                </ul>
                

            </Typography>
            </AccordionDetails>
        </Accordion>

        <Accordion style={{backgroundColor:"bisque", }}>
            <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            >
            <Typography component="span">Πως λαμβάνω την χρηματοδότηση (voucher) για την πληρωμή της Νταντάς;</Typography>
            </AccordionSummary>
            <AccordionDetails style={{backgroundColor:"bisque",}}>
            <Typography>
                <ul style={{textAlign:'left',}}>
                    Μετά την ολοκλήρωση της εργασίας ενός μήνα, συνδέεστε ως κηδεμόνας στην πλατφόρμα και επιλέγεται το κουμπί “Πληρωμή Νταντάς”. Μόλις η Νταντά που συνεργάζεστε λάβει την πληρωμή της μέσω QR code, θα λάβεται μια ειδοποίηση. 
                </ul>

            </Typography>
            </AccordionDetails>
        </Accordion>


        <Accordion style={{backgroundColor:"grey", }}>
            <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            >
            <Typography component="span">Ποιο είναι το ποσό του «voucher» που καλύπτει το πρόγραμμα;</Typography>
            </AccordionSummary>
            <AccordionDetails style={{backgroundColor:"grey",}}>
            <Typography>
                <ul style={{textAlign:'left',}}>
                Το ποσό του voucher ανέρχεται στα:
                    <li> πεντακόσια (500) ευρώ μηνιαίως, εφόσον η Νταντά εργάζεται
                    με καθεστώς πλήρους απασχόλησης </li>
                    <li>τριακόσια (300) ευρώ μηνιαίως, εφόσον η Νταντά εργάζεται με
                    καθεστώς μερικής απασχόλησης </li> 
                </ul>

            </Typography>
            </AccordionDetails>
        </Accordion>


        <Accordion style={{backgroundColor:"bisque", }}>
            <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            >
            <Typography component="span">Εάν μια Νταντά απασχολείται είτε με μερική είτε με πλήρη απασχόληση σε κάποιο σπίτι επιτρέπεται να συνεργαστεί με άλλον κηδεμόνα  πριν το πέρας της προγραμματισμένης περιόδου;</Typography>
            </AccordionSummary>
            <AccordionDetails style={{backgroundColor:"bisque",}}>
            <Typography>
                <ul style={{textAlign:'left',}}>
                ‘Οχι, σε περίπτωση που μια νταντά εργάζεται ήδη σε κάποιο σπίτι, δεν επιτρέπεται να εργαστεί με άλλον κηδεμόνα πριν το πέρας της προγραμματισμένης περιόδου. 
                </ul>

            </Typography>
            </AccordionDetails>
        </Accordion>
    
    </div>
  );
}