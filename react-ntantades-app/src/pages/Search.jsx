import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../StyleSheets/HomePage.css';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";



// const SearchBar = ({ onSearch }) => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filter, setFilter] = useState("");
    
//     const handleSearch = () => {
//         onSearch({ searchTerm, filter });
//     };
// }

const Search = ({ onSearch }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("");
    
    const handleSearch = () => {
        onSearch({ searchTerm, filter });
    };

    return ( 
        <div className="inner-page" style={{justifyContent:"center",}}>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center"}}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FormControl variant="outlined">
                <InputLabel width="fit-content" >Filter</InputLabel>
                <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                label="Filter"
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="category1">Category 1</MenuItem>
                    <MenuItem value="category2">Category 2</MenuItem>
                </Select>
                </FormControl>
            </div>

            <Button  variant="contained" onClick={handleSearch}>
                Search
            </Button>


        </div>
    );
};

export default Search;




// import React, { useState } from "react";
//   return (
//     <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
//       <TextField
//         label="Search"
//         variant="outlined"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <FormControl variant="outlined">
//         <InputLabel>Filter</InputLabel>
//         <Select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           label="Filter"
//         >
//           <MenuItem value="">None</MenuItem>
//           <MenuItem value="category1">Category 1</MenuItem>
//           <MenuItem value="category2">Category 2</MenuItem>
//         </Select>
//       </FormControl>
//       <Button variant="contained" onClick={handleSearch}>
//         Search
//       </Button>
//     </div>
//   );
// };

// export default SearchBar;