// 
import React, { useState } from 'react';
import { FIREBASE_DB } from '../config/firebase'; // Import your Firebase config
import { collection, onSnapshot, query, where, } from "firebase/firestore";


// const getUsers = async () => {
//   const usersSnapshot = await getDocs(collection(FIREBASE_DB, "users"));
//   return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// };
 
function SearchNannies() {
    const [SearchName, setSearchName] = useState("");
    const [results, setResults] = useState([]);

    
    // const q = query(collection(FIREBASE_DB, "users"), where("firstname", "==", true));


    // const handleSearch = async () => {
    //     try {
    //         // const q = query(
    //         //     // collection(FIREBASE_DB, 'users'),
    //         //     getUsers(),
    //         //     where('firstname', '==', SearchName) // Search by FirstName
    //         // );

    //         const q = query(collection(FIREBASE_DB, "users"), where("firstname", "==", true));

    //         const querySnapshot = await getDocs(q);
    //         const users = querySnapshot.docs.map((doc) => ({
    //             id: doc.id,
    //             ...doc.data(),
    //         }));

    //         setResults(users);
    //     } catch (error) {
    //         console.error('Error fetching nannies:', error);
    //     }
    // };

    const handleSearch = (event) => {

        event.preventDefault();

        try {

            // get collection
            const colRef = collection(FIREBASE_DB,"users")
        
        
            // queries
            const q = query(colRef, where("firstname", "==", SearchName))

        
            // real time collection data
            onSnapshot(q, (snapshot) => {
                let names = []
                snapshot.docs.forEach((doc) => {
                    names.push({...doc.data(), id: doc.id})
                }) 
                console.log(names)
                setResults(names)
            })

        }
        
        catch (error){
            console.error(error.message)
        }
            
    }
    


    return (

        <div>
            <form>
                <label>Firstname</label>    
                <input type="text" name="firstname" required onChange={(e) => setSearchName(e.target.value)}/>

                <button onClick={handleSearch}> Search </button>
            </form>    

            <ul> {results.map((name) => ( <li key={name.id}>{name.firstname} {name.lastname}</li> ))} </ul>
    
        </div>
    );
}

export default SearchNannies;