import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FIREBASE_DB } from '../config/firebase'; // Import your Firebase config
import { collection, onSnapshot, query, where,} from "firebase/firestore";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from  '@mui/icons-material/Search';

import { Link } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowBack';

import "../StyleSheets/Search.css"



function createQuery(colRef, searchParams) {
    let constraints = [];

    // Add conditions dynamically based on filled search parameters
    if (searchParams.firstname) {
        constraints.push(where("firstname", "==", searchParams.firstname));
    }
    if (searchParams.lastname) {
        constraints.push(where("lastname", "==", searchParams.lastname));
    }
    if (searchParams.age) {
        constraints.push(where("age", "==", searchParams.age));
    }

    // Construct the query with dynamic constraints
    return query(colRef, ...constraints);
}


function SearchNannies() {
    const [SearchName, setSearchName] = useState("");
    const [SearchSurname, setSearchSurname] = useState("");
    const [SearchAge, setSearchAge] = useState("");
    const [SearchStatus, setSearchStatus] = useState("");
    const [SearchPlace, setSearchPlace] = useState("");
    const [SearchExperience, setSearchExperience] = useState("");
    const [SearchSpecialization, setSearchSpecialization] = useState("");
    const [results, setResults] = useState([]);


    const navigate = useNavigate();



    const handleSearch = (event) => {

        event.preventDefault();

        try {
            

            // get collection
            const colRef = collection(FIREBASE_DB,"Advertisement");
        
            const searchParams = {
                firstname: SearchName || null,
                lastname: SearchSurname || null,
                age: SearchAge || null,
                employment_status : SearchStatus || null, 
                place : SearchPlace || null, 
                experience : SearchPlace || null, 
                specialization : SearchPlace || null, 
            };
            const q = createQuery(colRef, searchParams);

            let comb_results = [];
            onSnapshot(q, (snapshot) => {
                    let names = [];
                    snapshot.docs.forEach((doc) => {
                        names.push({...doc.data(), id: doc.id});
                    });
                console.log(names);
                comb_results = [...comb_results, ...names];
                setResults(comb_results); 
                navigate("NannyResults", { state: {results: comb_results }}); 

        });

        }
        catch (error){
            console.error(error.message)
        }
            
    }
    


    return (

        <div className='inner-page'>
        <div className='search-box'  >

            <header style={{color:"black",}}> <b>Συμπληρώστε τα φίλτρα Αναζήτησης</b></header>


            <Box sx={{ flexGrow: 1, }}>


                <Grid container spacing={2} style={{margin:"25px",}}>

                {/* Lastname */}
                <FormControl variant="standard" style={{marginRight:"15px"}}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                    Επώνυμο
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        onChange={(e) => setSearchSurname(e.target.value)}
                        startAdornment={
                        <InputAdornment position="start">
                        <SearchIcon />
                        </InputAdornment>
                        }
                    />
                </FormControl>
                
                {/* Firstname */}
                <FormControl variant="standard" >
                    <InputLabel htmlFor="input-with-icon-adornment">
                    Όνομα
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        onChange={(e) => setSearchName(e.target.value)}
                        startAdornment={
                        <InputAdornment position="start">
                        <SearchIcon />
                        </InputAdornment>
                        }
                    />
                </FormControl>

                </Grid>

                <Grid container spacing={2} style={{margin:"25px",}}>
                
                    {/* Age */}
                    <FormControl variant="standard" style={{marginRight:"15px"}}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                        Ηιλικία Νταντάς
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            onChange={(e) => setSearchAge(e.target.value)}
                            startAdornment={
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                            }
                        />
                    </FormControl>


                    {/* Employment-status */}
                    <FormControl variant="standard" >
                        <InputLabel htmlFor="input-with-icon-adornment">
                        Καθεστώς Απασχόλησης
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            onChange={(e) => setSearchStatus(e.target.value)}
                            startAdornment={
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                            }
                        />
                    </FormControl>

                </Grid>

                <Grid container spacing={2} style={{margin:"25px",}}>

                    <FormControl variant="standard" style={{marginRight:"15px"}}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                        Προσδιορισμός Χρόνου
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            onChange={(e) => setSearchName(e.target.value)}
                            startAdornment={
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                            }
                        />
                    </FormControl>

                     {/* Experience */}
                    <FormControl variant="standard">
                        <InputLabel htmlFor="input-with-icon-adornment">
                        Εμπειρία
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            onChange={(e) => setSearchExperience(e.target.value)}
                            startAdornment={
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                            }
                        />
                    </FormControl>

                </Grid>

                <Grid container spacing={2} style={{margin:"25px",}}>

                   
                    <FormControl variant="standard" style={{marginRight:"15px"}}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                        Ειδίκευση
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            onChange={(e) => setSearchSpecialization(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                            }
                            />
                    </FormControl>



                    {/* Place */}
                    <FormControl variant="standard">
                        <InputLabel htmlFor="input-with-icon-adornment">
                        Περιοχή Διαμονής
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            onChange={(e) => setSearchPlace(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                            }
                            />
                    </FormControl>
                        
                </Grid>
                
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', // Aligns the button to the right
                        marginTop: 2, // Adds space above the button
                        marginRight: 3, // Adds some space to the right (optional)
                        // color: "blue";
                    }}
                    >
                    <Button onClick={handleSearch} variant='contained'>
                        Αναζήτηση
                    </Button>
                </Box>
            
            </Box>

            {/* <form>
                <label color='black'>Firstname</label>    
                <input type="text" name="firstname" required onChange={(e) => setSearchName(e.target.value)}/>

                <button onClick={handleSearch}> Search </button>
            </form>  

            <ul> {results.map((name) => ( <li key={name.id}>{name.firstname} {name.lastname}</li> ))} </ul>  */}
    
            <div className='back-button'>
                <Link to="/Parent/Actions/" style={{ textDecoration: 'none',}}>
                    <Button variant="contained" startIcon={<BackIcon />} 
                        sx={{ whiteSpace: 'normal',textAlign: 'center', marginTop:'15%'}}>
                        ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ
                    </Button>
                </Link>
            </div>


        </div>
        </div>
    );
}

export default SearchNannies;