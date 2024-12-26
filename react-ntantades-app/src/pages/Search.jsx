// 





import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FIREBASE_AUTH,  FIREBASE_DB } from '../config/firebase'; // Import your Firebase config

// /ςεδατνατν ιεχε υοπ bd σεσ ncraes ωνακ
 // 
function SearchNannies() {
    const [searchLocation, setSearchLocation] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const q = query(
                collection(FIREBASE_AUTH, 'nannies'),
                where('location', '==', searchLocation) // Search by location
            );

            const querySnapshot = await getDocs(q);
            const nannies = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setResults(nannies);
        } catch (error) {
            console.error('Error fetching nannies:', error);
        }
    };

    return (
        <div>
            <h2>Search Nannies</h2>
            <input
                type="text"
                placeholder="Enter location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <ul>
                {results.map((nanny) => (
                    <li key={nanny.id}>
                        <strong>{nanny.name}</strong> - {nanny.location}
                        <br />
                        Skills: {nanny.skills.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchNannies;