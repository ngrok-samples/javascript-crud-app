const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/vinyl-records', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Mongoose schema and model definition for VinylRecord
const vinylRecordSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
    },
    genre: {
      type: String,
    },
    condition: {
      type: String,
    },
  });

// Create a Mongoose model using the schema
const VinylRecord = mongoose.model('VinylRecord', vinylRecordSchema);

// Initialize Express Application
const app = express();

// Set the server port either by an environment variable or use 3500 as default
const port = process.env.PORT || 3500;

// Configuring Express app with the CORDS and BodyParser libraries
app.use(cors());
app.use(bodyParser.json());

// API ROUTES
// Create a new vinyl record (Create)
app.post('/api/vinyl-records', (req, res) => {
    const { title, artist, year, genre, condition } = req.body;
  
    const newVinylRecord = new VinylRecord({
      title,
      artist,
      year,
      genre,
      condition,
    });
  
    newVinylRecord.save()
      .then(() => {
        res.status(201).json({ message: 'Vinyl record created successfully' });
      })
      .catch((error) => {
        res.status(400).json({ error: 'Unable to create vinyl record', details: error });
      });
  });
  
  // Get a list of all vinyl records (Read All)
  app.get('/api/vinyl-records', (req, res) => {
    VinylRecord.find()
      .then((vinylRecords) => {
        res.status(200).json(vinylRecords);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Server error', details: error });
      });
  });
  
  // Get a single vinyl record by ID (Read One)
  app.get('/api/vinyl-records/:id', (req, res) => {
    VinylRecord.findById(req.params.id)
      .then((vinylRecord) => {
        if (!vinylRecord) {
          return res.status(404).json({ error: 'Vinyl record not found' });
        }
        res.status(200).json(vinylRecord);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Server error', details: error });
      });
  });
  
  // Update a vinyl record by ID (Update)
  app.put('/api/vinyl-records/:id', (req, res) => {
    VinylRecord.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((vinylRecord) => {
        if (!vinylRecord) {
          return res.status(404).json({ error: 'Vinyl record not found' });
        }
        res.status(200).json({ message: 'Vinyl record updated successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Server error', details: error });
      });
  });
  
  // Delete a vinyl record by ID (Delete)
  app.delete('/api/vinyl-records/:id', (req, res) => {
    VinylRecord.findByIdAndRemove(req.params.id)
      .then((vinylRecord) => {
        if (!vinylRecord) {
          return res.status(404).json({ error: 'Vinyl record not found' });
        }
        res.status(204).json({ message: 'Vinyl record deleted successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Server error', details: error });
      });
  });
  
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});