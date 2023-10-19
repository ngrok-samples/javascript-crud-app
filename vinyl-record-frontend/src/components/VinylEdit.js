import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';

const VinylEdit = () => {
  console.log(useParams);
  const { vinylRecordId } = useParams();

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [condition, setCondition] = useState('');

  const navigate = useNavigate();
  const conditionOptions = ['Mint', 'Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];

  useEffect(() => {
    axios.get(`/api/vinyl-records/${vinylRecordId}`) // Adjust the route to match your API
      .then((response) => {
        const record = response.data;
        setTitle(record.title);
        setArtist(record.artist);
        setYear(record.year);
        setGenre(record.genre);
        setCondition(record.condition);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [vinylRecordId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios.put(`/api/vinyl-records/${vinylRecordId}`, { title, artist, year, genre, condition })
      .then(() => {
        // navigate route to list
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Edit Vinyl Record</h2>
      <form onSubmit={handleFormSubmit}>
        <div class="formfield">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="formfield">
          <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
        <div class="formfield">
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div class="formfield">
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div> 
        <div class="formfield">
          <label>
            Condition:
            <select value={condition} onChange={(e) => setCondition(e.target.value)}>
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

export default VinylEdit;
