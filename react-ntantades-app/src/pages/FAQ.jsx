import * as React from 'react';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "../StyleSheets/HomePage.css";

export default function FAQ() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="inner-page" style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Typography
        variant="h3"
        style={{ fontSize: 'x-large', fontStyle: 'bold', marginBottom: '2%' }}
      >
        Συχνές Ερωτήσεις
      </Typography>

      <Accordion
        style={{
          backgroundColor: "#ffffff",
          width: "50%",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)" // Add shadow here
        }}
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Ποιοί έχουν δικαίωμα λήψης χρηματοδότησης και ποιες προϋποθέσεις πρέπει να πληρούν;</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#ffffff" }}>
          <Typography>
            <ul style={{ textAlign: 'justify' }}>
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

      <Accordion
        style={{
          backgroundColor: "#1976d2",
          width: "50%",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)"
        }}
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span" style={{ color: 'white' }}>Πώς λαμβάνω την χρηματοδότηση (voucher) για την πληρωμή της Νταντάς;</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#1976d2" }}>
          <Typography style={{ color: 'white' }}>
            <ul style={{ textAlign: 'justify' }}>
              Μετά την ολοκλήρωση της εργασίας ενός μήνα, συνδέεστε ως κηδεμόνας στην πλατφόρμα και επιλέγεται το κουμπί “Πληρωμή Νταντάς”. Μόλις η Νταντά που συνεργάζεστε λάβει την πληρωμή της μέσω QR code, θα λάβεται μια ειδοποίηση.
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        style={{
          backgroundColor: "#ffffff",
          width: "50%",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)" // Add shadow here
        }}
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">Ποιο είναι το ποσό του «voucher» που καλύπτει το πρόγραμμα;</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#ffffff" }}>
          <Typography>
            <ul style={{ textAlign: 'justify' }}>
              Το ποσό του voucher ανέρχεται στα:
              <li> πεντακόσια (500) ευρώ μηνιαίως, εφόσον η Νταντά εργάζεται
                με καθεστώς πλήρους απασχόλησης. </li>
              <li>τριακόσια (300) ευρώ μηνιαίως, εφόσον η Νταντά εργάζεται με
                καθεστώς μερικής απασχόλησης. </li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        style={{
          backgroundColor: "#1976d2",
          width: "50%",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)"
        }}
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <Typography component="span" style={{ color: 'white' }}>Αν μια Νταντά απασχολείται είτε με μερική είτε με πλήρη απασχόληση σε κάποιο σπίτι επιτρέπεται να συνεργαστεί με άλλον κηδεμόνα  πριν το πέρας της προγραμματισμένης περιόδου;</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#1976d2" }}>
          <Typography style={{ color: 'white' }}>
            <ul style={{ textAlign: 'justify' }}>
              Όχι, σε περίπτωση που μια νταντά εργάζεται ήδη σε κάποιο σπίτι, δεν επιτρέπεται να εργαστεί με άλλον κηδεμόνα πριν το πέρας της προγραμματισμένης περιόδου.
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
