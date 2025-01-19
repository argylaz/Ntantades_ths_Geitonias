import { useLocation } from "react-router-dom";
import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

// Translate function that maps path segments to their Greek equivalents
const translateRouteToGreek = (route) => {
  const translationMap = {
    "/": "Αρχική",
    "/Login": "Σύνδεση",
    "/FAQ": "Συχνές Ερωτήσεις",
    "/NannyInstruction": "Οδηγίες για Νταντάδες",
    "/ParentInstruction": "Οδηγίες για Γονείς",
    "/Register": "Εγγραφή",
    "/Profile": "Προφίλ",
    "/Notifications": "Ειδοποιήσεις",
    "/Edit": "Επεξεργασία",
    "/viewRequest": "Προβολή Αιτήματος",
    "/:requestID": ":requestID",
    "/Parent": "Κηδεμόνες",
    "/ParentsGuide": "Οδηγίες",
    "/FundingRequirements": "Προϋποθέσεις Χρηματοδότησης",
    "/ParticipationRequirements": "Προϋποθέσεις Συμμετοχής",
    "/Actions": "Ενέργειες",
    "/Search": "Αναζήτηση",
    "/NannyResults": "Αποτελέσματα Αναζήτησης Νταντά",
    "/ScheduleMeeting": "Προγραμματισμός Ραντεβού",
    "/ParentPayment": "Πληρωμή Νταντάς",
    "/ParentsRequest": "Αιτήματα Ενδιαφέροντος Συνεργασίας",
    "/CreateInterestRequest": "Δημιουργία Νέας Αίτησης",
    "/ParentActionHistory": "Ιστορικό Ενεργειών",
    "/TerminateContract": "Τερματισμός Συμβολαίου",
    "/ParentReview": "Αξιολόγηση Νταντάς",
    "/ReviewCompleted": "Ολοκλήρωση Αξιολόγησης",
    "/Nanny": "Νταντάδες",
    "/Guide": "Οδηγίες",
    "/EligibilityCriteria": "Κριτήρια Επιλεξιμότητας",
    "/CreateCV": "Δημιουργία Βιογραφικού",
    "/InterestRequests": "Αιτήσεις Ενδιαφέροντος Συνεργασίας",
    "/Advertisement": "Οι αγγελίες μου",
    "/CreateAdvertisement": "Δημιουργία Νέας Αγγελίας",
    "/NannyMeetings": "Τα Ραντεβού μου",
    "/NannyScheduledMeetings": "Προγραμματισμένα ραντεβού",
    "/MeetingRequests": "Αιτήματα Ραντεβού",
    "/NannyPayment": "Λήψη Πληρωμής",
    "/NannyReviews": "Προβολή Αξιολογήσεων",
    "/NannyActionHistory": "Ιστορικό Ενεργειών",
  };

  return translationMap[route] || route; // Return the route if not found in the map
};

const Breadcrumb = () => {
  const location = useLocation();

  // Split the current pathname into its parts (excluding the leading "/")
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Create the full paths up to each segment
  const fullPaths = pathnames.map((_, index) => `/${pathnames.slice(0, index + 1).join("/")}`);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator="›"
      sx={{
        color: 'primary.main',
        fontSize: '0.8rem',
        padding: '1px 5px',
        borderRadius: '25px',
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)',
        '& .MuiBreadcrumbs-separator': { color: 'secondary.main' },
      }}
    >
      {/* Always show the "Αρχική" (Home) link */}
      <Link
        underline="hover"
        color="inherit"
        href="/"
        sx={{
          fontWeight: 500,
          transition: 'color 0.3s',
          '&:hover': {
            color: 'primary.dark',
            textDecoration: 'underline',
          },
        }}
      >
        {translateRouteToGreek("/")}
      </Link>

      {/* Render each path segment as a breadcrumb */}
      {fullPaths.map((path, index) => {
        // Get the segment (last part of the path)
        const segment = pathnames[index];
        const translatedSegment = translateRouteToGreek(`/${segment}`);  // Translate the full path segment

        return index === fullPaths.length - 1 ? (
          <Typography
            key={path}
            color="text.primary"
            sx={{ fontWeight: 'bold', fontSize: '0.8rem', }}
          >
            {translatedSegment} {/* Display the translated breadcrumb text */}
          </Typography>
        ) : (
          <Link
            key={path}
            underline="hover"
            color="inherit"
            href={path}  // Keep the original link for navigation
            sx={{
              fontWeight: 500,
              transition: 'color 0.3s',
              '&:hover': {
                color: 'primary.dark',
                textDecoration: 'underline',
              },
            }}
          >
            {translatedSegment}  {/* Display the translated breadcrumb text */}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
