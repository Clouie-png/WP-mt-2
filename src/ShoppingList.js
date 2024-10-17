import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography, Grid } from '@mui/material';


const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [price, setPrice] = useState('');

  const addItem = () => {
    const trimmedInput = input.trim();
    const parsedPrice = parseFloat(price);

    if (trimmedInput === '' || isNaN(parsedPrice) || parsedPrice <= 0) {
      alert("Please enter a valid item name and price.");
      return;
    }

    const existingItem = items.find((item) => item.name === trimmedInput);
    if (existingItem) {
      const addAgain = window.confirm(
        `"${trimmedInput}" is already in the cart. Do you want to add it again with the same or a new price?`
      );
      if (!addAgain) {
        setInput('');
        setPrice('');
        return;
      }
    }

    setItems([...items, { name: trimmedInput, price: parsedPrice }]);
    setInput('');
    setPrice('');
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    let total = 0;
    for (const item of items) {
      total += item.price;
    }
    return total.toFixed(2);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      
      <div>
        <TextField
          label="Item Name"
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Item Price"
          variant="outlined"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ marginBottom: '10px' }}
          type="number"
        />
        <Button variant="contained" onClick={addItem}>
          Add Item
        </Button>
      </div>
      
      {items.length > 0 ? (
        <List>
          {items.map((item, index) => (
            <ListItem key={index}>

              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item xs={8}>
                  <ListItemText primary={item.name} />
                </Grid>
                <Grid item xs={2} style={{ textAlign: 'right' }}>
                  <Typography variant="body1">${item.price.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <IconButton color="secondary" onClick={() => removeItem(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          Your cart is empty.
        </Typography>
      )}
      
      {items.length > 0 && (
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Total Price: ${calculateTotal()}
        </Typography>
      )}
    </div>
  );
};

export default ShoppingList;