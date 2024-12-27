import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FIREBASE_DB } from '../config/firebase'; // Import your Firebase config
import { collection, onSnapshot, query, where, } from "firebase/firestore";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from  '@mui/icons-material/Search';

import "../StyleSheets/Search.css"


function SearchNannies() {
    const [SearchName, setSearchName] = useState("");
    const [SearchSurname, setSearchSurname] = useState("");
    const [SearchAge, setSearchAge] = useState("");
    const [results, setResults] = useState([]);

    const navigate = useNavigate();



    const handleSearch = (event) => {

        event.preventDefault();

        try {

            // get collection
            const colRef = collection(FIREBASE_DB,"users");
        
        
            // queries
            const queries = [
                query(colRef, where("firstname", "==", SearchName)),
                query(colRef, where("lastname", "==", SearchSurname)),
                query(colRef, where("age", "==", SearchAge))
            ];
            
            // const q = query(colRef, where("firstname", "==", SearchName))

            let comb_results = [];
            // real time collection data
            queries.forEach((q) => { 
                onSnapshot(q, (snapshot) => {
                    let names = [];
                    snapshot.docs.forEach((doc) => {
                        names.push({...doc.data(), id: doc.id});
                    });
                console.log(names);
                comb_results = [...comb_results, ...names];
                setResults(comb_results); 
                navigate("NannyResults", { state: { results: comb_results } }); 
                });
            });
        }
        catch (error){
            console.error(error.message)
        }
            
    }
    


    return (

        <div className='search-box' >

            <header style={{color:"#948472",}}> <b>Συμπληρώστε τα φίλτρα Αναζήτησης</b></header>


            <Box sx={{ flexGrow: 1, }}>


                <Grid container spacing={2} style={{margin:"25px",}}>

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


                    <FormControl variant="standard" >
                        <InputLabel htmlFor="input-with-icon-adornment">
                        Χρόνος Απασχόλησης
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


                    <FormControl variant="standard">
                        <InputLabel htmlFor="input-with-icon-adornment">
                        Εμπειρία
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


                    <FormControl variant="standard" style={{marginRight:"15px"}}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                        Ειδίκευση
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


                    <FormControl variant="standard">
                        <InputLabel htmlFor="input-with-icon-adornment">
                        Περιοχή Διαμονής
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
                
                <Button onClick={handleSearch} variant='contained'>Αναζήτηση</Button>
            
            </Box>

            {/* <form>
                <label color='black'>Firstname</label>    
                <input type="text" name="firstname" required onChange={(e) => setSearchName(e.target.value)}/>

                <button onClick={handleSearch}> Search </button>
            </form>    */

            <ul> {results.map((name) => ( <li key={name.id}>{name.firstname} {name.lastname}</li> ))} </ul> }
    
        </div>
    );
}

export default SearchNannies;