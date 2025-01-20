import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Language as LanguageIcon } from "@mui/icons-material";

const LanguageButton = () => {
    const [language, setLanguage] = useState("el");

    const handleLanguageChange = (event, newLanguage) => {
        if (newLanguage !== null) {
            setLanguage(newLanguage);
            // Implement language change logic here (e.g., updating global language state)
        }
    };

    return (
        <div className="language-switch-container">
            <ToggleButtonGroup
                value={language}
                exclusive
                onChange={handleLanguageChange}
                aria-label="language switch"
                sx={{ height: "30%", width: "50%", justifyContent: "center", alignContent: "center"}}
                
            >
                <ToggleButton
                    value="el"
                    aria-label="Greek"
                    sx={{
                        // width: "15%",
                        backgroundColor: language === "el" ? "primary.main" : "white",
                        color: language === "el" ? "white" : "black",
                        "&.Mui-selected": {
                            backgroundColor: "primary.main",
                            color: "white",
                        },
                    }}
                >
                    EL
                </ToggleButton>
                <ToggleButton
                    value="en"
                    aria-label="English"
                    sx={{
                        // width: "15%",
                        backgroundColor: language === "en" ? "primary.main" : "white",
                        color: language === "en" ? "white" : "black",
                        "&.Mui-selected": {
                            backgroundColor: "primary.main",
                            color: "white",
                        },
                    }}
                >
                    EN
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

export default LanguageButton;
