import dotenv from "dotenv";
import express, { response } from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// GET route to retrieve all articles
app.get("/article", async (req, res) => {
  try {
    const [data] = await pool.execute("SELECT * FROM articles");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

// POST route to create a new article
app.post("/article", async (req, res) => {
  const { title, content } = req.body; // Assuming you're sending title and content in the request body

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    // Corrected query execution with a comma between query and values
    const [result] = await pool.execute(
      "INSERT INTO articles (title, content) VALUES (?, ?)",
      [title, content]
    );

    // Sending the newly created article as a response
    res.status(201).json({
      message: "Article created successfully",
      article: {
        id: result.insertId,
        title,
        content,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

// DELETE route to delete an article by ID
app.delete("/article/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.execute("DELETE FROM articles WHERE article_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    console.error("Error deleting article:", err.message);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

// PATCH route to partially update an article by ID
app.patch("/article/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  // Prepare an array to hold the values for update
  const updateFields = [];
  const updateValues = [];

  if (title) {
    updateFields.push("title = ?");
    updateValues.push(title);
  }

  if (content) {
    updateFields.push("content = ?");
    updateValues.push(content);
  }

  if (author) {
    updateFields.push("author = ?");
    updateValues.push(author);
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ error: "No fields to update provided" });
  }

  // Add the article_id to the values array at the end
  updateValues.push(id);

  try {
    // Construct the dynamic SQL query for the fields to update
    const query = `UPDATE articles SET ${updateFields.join(", ")} WHERE article_id = ?`;

    const [result] = await pool.execute(query, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json({
      message: "Article updated successfully",
      booking: {
        id,
        title: title || undefined, // Return updated title if available
        content: content || undefined, // Return updated content if available
        author: author || undefined, // Return updated author if available
      },
    });
  } catch (err) {
    console.error("Error updating article:", err.message);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

app.post("/booking", async (req, res) => {
  const { user_id, trainer_id, session_date, session_time, status } = req.body;

  if (!user_id || !trainer_id || !session_date || !session_time) {
    return res.status(400).json({ error: "user_id, trainer_id, session_date, and session_time are required" });
  }

  try {
    // Check if the user exists
    const [user] = await pool.execute("SELECT * FROM users WHERE user_id = ?", [user_id]);
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the trainer exists
    const [trainer] = await pool.execute("SELECT * FROM trainers WHERE trainer_id = ?", [trainer_id]);
    if (trainer.length === 0) {
      return res.status(404).json({ error: "Trainer not found" });
    }

    // Insert the new booking into the bookings table
    const [result] = await pool.execute(
      "INSERT INTO bookings (user_id, trainer_id, session_date, session_time, status) VALUES (?, ?, ?, ?, ?)",
      [user_id, trainer_id, session_date, session_time, status || 'pending']  // Default status is 'pending'
    );

    res.status(201).json({
      message: "Booking created successfully",
      booking: {
        booking_id: result.insertId,
        user_id,
        trainer_id,
        session_date,
        session_time,
        status: status || 'pending',
      },
    });
  } catch (err) {
    console.error("Error inserting booking:", err.message);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

// GET all bookings
app.get("/booking", async (req, res) => {
  try {
    const [data] = await pool.execute("SELECT * FROM bookings");
    res.json(data);
  } catch (err) {
    console.error("Error fetching bookings:", err.message);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

// GET a specific booking by ID
app.get("/booking/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [data] = await pool.execute("SELECT * FROM bookings WHERE booking_id = ?", [id]);

    if (data.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(data[0]);
  } catch (err) {
    console.error("Error fetching booking:", err.message);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

// PATCH to update booking details (e.g., changing status)
app.patch("/booking/:id", async (req, res) => {
  const { id } = req.params;
  const { status, session_date, session_time } = req.body;

  const updateFields = [];
  const updateValues = [];

  if (status) {
    updateFields.push("status = ?");
    updateValues.push(status);
  }

  if (session_date) {
    updateFields.push("session_date = ?");
    updateValues.push(session_date);
  }

  if (session_time) {
    updateFields.push("session_time = ?");
    updateValues.push(session_time);
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ error: "No fields to update provided" });
  }

  updateValues.push(id); // Append booking_id to values

  try {
    const query = `UPDATE bookings SET ${updateFields.join(", ")} WHERE booking_id = ?`;

    const [result] = await pool.execute(query, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking: {
        booking_id: id,
        status: status || undefined,
        session_date: session_date || undefined,
        session_time: session_time || undefined,
      },
    });
  } catch (err) {
    console.error("Error updating booking:", err.message);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

// DELETE a booking by ID
app.delete("/booking/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.execute("DELETE FROM bookings WHERE booking_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Error deleting booking:", err.message);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

// GET all locations
app.get('/location', async (req, res) => {
  try {
    const [data] = await pool.execute('SELECT * FROM locations');
    res.json(data);
  } catch (err) {
    console.error('Error fetching locations:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// GET a location by ID
app.get('/location/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [data] = await pool.execute('SELECT * FROM locations WHERE location_id = ?', [id]);

    if (data.length === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }

    res.json(data[0]);
  } catch (err) {
    console.error('Error fetching location:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// POST a new location
app.post('/location', async (req, res) => {
  const { city, province, country } = req.body;

  if (!city || !country) {
    return res.status(400).json({ error: 'City and country are required' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO locations (city, province, country) VALUES (?, ?, ?)',
      [city, province, country]
    );

    res.status(201).json({
      message: 'Location created successfully',
      location: {
        location_id: result.insertId,
        city,
        province,
        country,
      },
    });
  } catch (err) {
    console.error('Error inserting location:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// PATCH to update location details
app.patch('/location/:id', async (req, res) => {
  const { id } = req.params;
  const { city, province, country } = req.body;

  const updateFields = [];
  const updateValues = [];

  if (city) {
    updateFields.push('city = ?');
    updateValues.push(city);
  }

  if (province) {
    updateFields.push('province = ?');
    updateValues.push(province);
  }

  if (country) {
    updateFields.push('country = ?');
    updateValues.push(country);
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ error: 'No fields to update provided' });
  }

  updateValues.push(id); // Append location_id to values

  try {
    const query = `UPDATE locations SET ${updateFields.join(', ')} WHERE location_id = ?`;
    const [result] = await pool.execute(query, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }

    res.status(200).json({
      message: 'Location updated successfully',
      location: {
        location_id: id,
        city: city || undefined,
        province: province || undefined,
        country: country || undefined,
      },
    });
  } catch (err) {
    console.error('Error updating location:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// DELETE a location by ID
app.delete('/location/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.execute('DELETE FROM locations WHERE location_id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }

    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (err) {
    console.error('Error deleting location:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// GET all order items
app.get('/order_item', async (req, res) => {
  try {
    const [data] = await pool.execute('SELECT * FROM order_items');
    res.json(data);
  } catch (err) {
    console.error('Error fetching order items:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// GET a specific order item by ID
app.get('/order_item/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [data] = await pool.execute('SELECT * FROM order_items WHERE order_item_id = ?', [id]);

    if (data.length === 0) {
      return res.status(404).json({ error: 'Order item not found' });
    }

    res.json(data[0]);
  } catch (err) {
    console.error('Error fetching order item:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// POST a new order item
app.post('/order_item', async (req, res) => {
  const { order_id, product_id, subscription_id, quantity, price } = req.body;

  if (!order_id || !product_id || !quantity || !price) {
    return res.status(400).json({ error: 'Order ID, product ID, quantity, and price are required' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO order_items (order_id, product_id, subscription_id, quantity, price) VALUES (?, ?, ?, ?, ?)',
      [order_id, product_id, subscription_id || null, quantity, price]
    );

    res.status(201).json({
      message: 'Order item created successfully',
      order_item: {
        order_item_id: result.insertId,
        order_id,
        product_id,
        subscription_id,
        quantity,
        price,
      },
    });
  } catch (err) {
    console.error('Error inserting order item:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// PATCH to update order item details
app.patch('/order_item/:id', async (req, res) => {
  const { id } = req.params;
  const { order_id, product_id, subscription_id, quantity, price } = req.body;

  const updateFields = [];
  const updateValues = [];

  if (order_id) {
    updateFields.push('order_id = ?');
    updateValues.push(order_id);
  }

  if (product_id) {
    updateFields.push('product_id = ?');
    updateValues.push(product_id);
  }

  if (subscription_id !== undefined) {
    updateFields.push('subscription_id = ?');
    updateValues.push(subscription_id);
  }

  if (quantity) {
    updateFields.push('quantity = ?');
    updateValues.push(quantity);
  }

  if (price) {
    updateFields.push('price = ?');
    updateValues.push(price);
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ error: 'No fields to update provided' });
  }

  updateValues.push(id); // Append order_item_id to values

  try {
    const query = `UPDATE order_items SET ${updateFields.join(', ')} WHERE order_item_id = ?`;
    const [result] = await pool.execute(query, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order item not found' });
    }

    res.status(200).json({
      message: 'Order item updated successfully',
      order_item: {
        order_item_id: id,
        order_id,
        product_id,
        subscription_id,
        quantity,
        price,
      },
    });
  } catch (err) {
    console.error('Error updating order item:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// DELETE an order item by ID
app.delete('/order_item/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.execute('DELETE FROM order_items WHERE order_item_id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order item not found' });
    }

    res.status(200).json({ message: 'Order item deleted successfully' });
  } catch (err) {
    console.error('Error deleting order item:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// GET all orders
app.get('/order', async (req, res) => {
  try {
    const [data] = await pool.execute('SELECT * FROM orders');
    res.json(data);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// GET a specific order by ID
app.get('/order/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [data] = await pool.execute('SELECT * FROM orders WHERE order_id = ?', [id]);

    if (data.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(data[0]);
  } catch (err) {
    console.error('Error fetching order:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// POST a new order
app.post('/order', async (req, res) => {
  const { user_id, total_amount, status } = req.body;

  if (!user_id || !total_amount) {
    return res.status(400).json({ error: 'User ID and total amount are required' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)',
      [user_id, total_amount, status || 'pending']  // Default status is 'pending'
    );

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        order_id: result.insertId,
        user_id,
        total_amount,
        status: status || 'pending',
      },
    });
  } catch (err) {
    console.error('Error inserting order:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// PATCH to update order details (e.g., changing status)
app.patch('/order/:id', async (req, res) => {
  const { id } = req.params;
  const { status, total_amount } = req.body;

  const updateFields = [];
  const updateValues = [];

  if (status) {
    updateFields.push('status = ?');
    updateValues.push(status);
  }

  if (total_amount) {
    updateFields.push('total_amount = ?');
    updateValues.push(total_amount);
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ error: 'No fields to update provided' });
  }

  updateValues.push(id); // Append order_id to values

  try {
    const query = `UPDATE orders SET ${updateFields.join(', ')} WHERE order_id = ?`;
    const [result] = await pool.execute(query, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order updated successfully',
      order: {
        order_id: id,
        status: status || undefined,
        total_amount: total_amount || undefined,
      },
    });
  } catch (err) {
    console.error('Error updating order:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// DELETE an order by ID
app.delete('/order/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.execute('DELETE FROM orders WHERE order_id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting order:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
