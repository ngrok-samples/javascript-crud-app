import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VinylAdd = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [condition, setCondition] = useState('');
  const conditionOptions = ['Mint', 'Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/vinyl-records', { title, artist, year, genre, condition })
      .then(() => {
        // navigate route to default List view
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    // navigate route to default List view
    navigate('/');
  };

  return (
    <div>
      <h2>Add Vinyl Record</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="formfield">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="formfield">
          <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
        <div className="formfield">
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="formfield">
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div> 
        <div className="formfield">
          <label>
            Condition:
            <select 
              value={condition} 
              onChange={(e) => setCondition(e.target.value)}>
              {conditionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div class="formfield">
          <button type="submit" className="button">Add Record</button>
          <button type="button" className="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default VinylAdd;
