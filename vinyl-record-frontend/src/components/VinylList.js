import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VinylList = () => {
  const [vinylRecords, setVinylRecords] = useState([]);

  useEffect(() => {
    fetchVinylRecords();
  }, []);

  const fetchVinylRecords = () => {
    axios.get('/api/vinyl-records') 
      .then((response) => {
        setVinylRecords(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteVinylRecord = (title, id) => {
    axios.delete(`/api/vinyl-records/${id}`)
    .then(() => {
      // refresh vinylRecord list
      fetchVinylRecords();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <div>
      <Link to="/add">
        <button className="button" type="button">
          Add Record
        </button>
      </Link>
      <h2>Vinyl Records List</h2>
      <ul>
        {vinylRecords.map((record) => (
          <li key={record._id}>
            {record.title} by {record.artist} <Link to={`/edit/${record._id}`}>Edit</Link> <Link onClick={ () => { if (window.confirm(`Are you sure you want to delete ${record.title}`)) deleteVinylRecord(record.title, record._id) } }>Delete</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VinylList;
