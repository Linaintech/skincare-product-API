const express = require('express')
const cors = require('cors')

const logger = require("./logger");
const skincare = require('./skincare.json')
const { capitalise } = require('./helpers/helpers')

const app = express()
app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
  res.send("Welcome to Skincare 101 API")
})
app.get('/skincare', (req, res) => {
  res.send(skincare)
})
app.get('/skincare/:name', (req, res) => {
  const name = req.params.name.toLowerCase()
  const skincare = skincare.find(skincare => skincare.name.toLowerCase() === name)
  console.log(skincare)
  if (skincare === undefined) {
    res.status(404).send({ error: `skincare: ${name} not found :(`})
  }
  res.send(skincare)
})
app.post('/skincare', (req, res) => {
  const ids = skincare.map(skincare => skincare.id)
  let maxId = Math.max(...ids)
  const skincare = skincare.find(skincare => skincare.name === req.body.name)
  if (skincare !== undefined) {
    res.status(409).send({error: "skincare already exists"})
  } else {
    maxId += 1
    const newSkincare = req.body
    newSkincare.id = maxId
    skincare.push(newSkincare)
    res.status(201).send(newSkincare)
  }
})
app.patch("/skincare/:name", (req, res) => {
  const skincare = skincare.find(skincare => skincare.name.toLowerCase() === req.params.name.toLowerCase());
  if (skincare === undefined) {
    return res.status(404).send({error: "skincare does not exist"})
  }
  try {
    const updatedSkincare = { ...req.body, name: capitalise(req.body.name), id: skincare.id}
    const idx = skincare.findIndex(f => f.id === skincare.id);
    skincare[idx] = updatedskincare;
    res.send(updatedSkincare)
  } catch (error) {
    res.status(400).send(error.message)
  }
})
app.delete("/skincare/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const skincareIndex = champions.findIndex(skincare => skincare.name.toLowerCase() === name);
  if (skincareIndex === -1) {
    res.status(404).send({ error: "skincare products does not exist" })
  } else {
    skincare.splice(skincareIndex, 1);
    res.status(204).send()
  }
})

app.get('/products', (req, res) => {
    const products = require('./products.json');
    res.json(products);
  });
  app.get('/products/:id', (req, res) => {
    const products = require('./products.json');
    const id = req.params.id;
    const product = products.find(p => p.id === id);
    res.json(product);
  });

  app.post('/products', (req, res) => {
    const products = require('./products.json');
    const { name, brand, price, description } = req.body;
    const id = Math.random().toString(36).substring(2, 15);
    const product = { id, name, brand, price, description };
    products.push(product);
    fs.writeFile('./products.json', JSON.stringify(products), err => {
      if (err) throw err;
      res.json(product);
    });
  });

  app.delete('/products/:id', (req, res) => {
    const products = require('./products.json');
    const id = req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    const deletedProduct = products.splice(productIndex, 1)[0];
    fs.writeFile('./products.json', JSON.stringify(products), err => {
      if (err) throw err;
      res.json(deletedProduct);
    });
  });

  const express = require('express');
const cors = require('cors');


app.use(express.json());
app.use(cors());

const express = require('express');
const cors = require('cors');
const fs = require('fs');


app.use(express.json());
app.use(cors());

// Endpoint definitions go here

app.listen(3000, () => console.log('Server started on port 3000'));


module.exports = app;
