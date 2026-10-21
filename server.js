/**
 * Midterm API Project - COMP229
 * Implement the six equipment API endpoints described in README.md.
 * Use the array index as the ID: index 0 is the first equipment item.
 * Add exactly two personalized items to the five supplied below.
 */
import express from 'express';

const app = express();
app.use(express.json());

let equipment = [
  { name: 'USB Microphone', category: 'audio', brand: 'AudioLab', year: 2021, quantity: 5 },
  { name: 'LED Panel', category: 'lighting', brand: 'BrightWorks', year: 2022, quantity: 4 },
  { name: 'Network Switch', category: 'networking', brand: 'NetCore', year: 2020, quantity: 3 },
  { name: 'Cable Tester', category: 'tools', brand: 'TestPro', year: 2019, quantity: 6 },
  { name: 'Studio Headphones', category: 'audio', brand: 'SoundCraft', year: 2023, quantity: 8 }
];

app.get('/api/equipment', (req, res) => {
  res.json(equipment);
  res.status(501).send('Not Implemented');
});

// Keep the filter route before /:id.
app.get('/api/equipment/filter', (req, res) => {
  let filteredEquipment = equipment;
  if (req.query.category) {
    filteredEquipment = filteredEquipment.filter(
      item => 
        item.category.toLocaleLowerCase() === req.query.category.toLocaleLowerCase()
    );
  }
//other fields 
  if (req.query.name) {
    filteredEquipment = filteredEquipment.filter(item => item.name === (req.query.name));
  }
  if (req.query.brand) {
    filteredEquipment = filteredEquipment.filter(item => item.brand === (req.query.brand));
  }
  if (req.query.year) {
    filteredEquipment = filteredEquipment.filter(item => item.year === Number(req.query.year));
  }
  if (req.query.quantity) {
    filteredEquipment = filteredEquipment.filter(item => item.quantity === Number(req.query.quantity));
  }

  res.json(filteredEquipment);
 // res.status(501).send('Not Implemented');
});

app.get('/api/equipment/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id < 0 || id >= equipment.length) {
    res.status(404).send('Not Found');
    return;
  }
  res.json(equipment[id]);

  res.status(501).send('Not Implemented');
});

app.post('/api/equipment', (req, res) => {
const newItem = req.body;
  if (!newItem || typeof newItem !== 'object') {
    res.status(400).send('Bad Request: Invalid item data');
    return;
  }
  if (!newItem.name || !newItem.category || !newItem.brand || typeof newItem.year !== 'number' || typeof newItem.quantity !== 'number') {
    res.status(400).send('Bad Request: Fields Required  {name, category, brand, year (number), quantity (number)}');
    return;
  }
 const existingItem = equipment.find(item => item.name === newItem.name && item.category === newItem.category && item.brand === newItem.brand);
  if (existingItem) {
    res.status(409).send('Conflict: Item already exists');
    return;
  }
  equipment.push(newItem);
  res.status(201).json(newItem);
 // res.status(501).send('Not Implemented');
});

app.put('/api/equipment/:id', (req, res) => {
const id = Number(req.params.id);
  if (isNaN(id) || id < 0 || id >= equipment.length) {
    res.status(404).send('Not Found');
    return;
  }
  const updatedItem = req.body;
  if (!updatedItem || typeof updatedItem !== 'object') {
    res.status(400).send('Bad Request: Invalid item data');
    return;
  }
  if (!updatedItem.name || !updatedItem.category || !updatedItem.brand || typeof updatedItem.year !== 'number' || typeof updatedItem.quantity !== 'number') {
    res.status(400).send('Bad Request: Fields Required {name, category, brand, year (number), quantity (number)}');
    return;
  }
  equipment[id] = updatedItem;
  res.json(updatedItem);
 // res.status(501).send('Not Implemented');
});

app.delete('/api/equipment/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id < 0 || id >= equipment.length) {
    res.status(404).send('Not Found');
    return;
  }
  equipment.splice(id, 1);
  res.status(204).send();
  // res.status(501).send('Not Implemented');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', err => {
  if (err) {
    console.error(`Cannot start on port ${PORT}: ${err.message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
