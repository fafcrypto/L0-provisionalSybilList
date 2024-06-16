import React, { useState } from 'react';
import axios from 'axios';
import { parse } from 'papaparse'; // Assurez-vous que papaparse est installé

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const csvFiles = [
    'https://raw.githubusercontent.com/fafcrypto/L0-provisionalSybilList/main/provisionalSybilList_part_1.csv',
    'https://raw.githubusercontent.com/fafcrypto/L0-provisionalSybilList/main/provisionalSybilList_part_2.csv',
    'https://raw.githubusercontent.com/fafcrypto/L0-provisionalSybilList/main/provisionalSybilList_part_3.csv',
    'https://raw.githubusercontent.com/fafcrypto/L0-provisionalSybilList/main/provisionalSybilList_part_4.csv',
    'https://raw.githubusercontent.com/fafcrypto/L0-provisionalSybilList/main/provisionalSybilList_part_5.csv',
    'https://raw.githubusercontent.com/fafcrypto/L0-provisionalSybilList/main/provisionalSybilList_part_6.csv'
  ];

  const handleSearch = async () => {
    try {
      const requests = csvFiles.map(url => axios.get(url));
      const responses = await Promise.all(requests);
      const combinedData = responses.flatMap(response => parse(response.data, { header: true }).data);
      const filteredResults = combinedData.filter(item => item.address && item.address.includes(searchTerm));
      setResults(filteredResults);
    } catch (error) {
      console.error('Error fetching or parsing CSV:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter search term..."
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((item, index) => (
          <li key={index}>{item.address}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
