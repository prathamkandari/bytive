const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: String,
  techStack: String,
  fieldOfInterest: String,
  seeking: String,
  bio: String,
  gitHubURL: String,
  twitterURL: String,
  linkedINURL: String,
  websiteURL: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model('User', userSchema);

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Register user
app.post('/api/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new UserModel({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login user
app.post('/api/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ email: user.email }, 'your_secret_key');
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all user profiles
app.get('/api/profiles', async (req, res) => {
  try {
    const profiles = await UserModel.find({}, '-password');
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Search user profiles
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;
    const profiles = await UserModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { techStack: { $regex: query, $options: 'i' } },
        { bio: { $regex: query, $options: 'i' } },
      ],
    }, '-password');
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get user profile by ID
app.get('/api/profile/:id', async (req, res) => {
    try {
      const profile = await UserModel.findById(req.params.id, '-password');
      if (!profile) return res.status(404).json({ message: 'Profile not found' });
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Edit user profile
  app.put('/api/profile/edit', authenticateToken, async (req, res) => {
    try {
      // Ensure the user can only edit their own profile
      if (req.user.email !== req.body.email) {
        return res.status(403).json({ message: 'Forbidden: You can only edit your own profile' });
      }
  
      const updatedProfile = await UserModel.findOneAndUpdate(
        { email: req.body.email },
        { $set: { ...req.body } },
        { new: true, projection: '-password' }
      );
  
      if (!updatedProfile) return res.status(404).json({ message: 'Profile not found' });
  
      res.json(updatedProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Delete user profile
  app.delete('/api/profile/delete', authenticateToken, async (req, res) => {
    try {
      // Ensure the user can only delete their own profile
      if (req.user.email !== req.body.email) {
        return res.status(403).json({ message: 'Forbidden: You can only delete your own profile' });
      }
  
      const deletedProfile = await UserModel.findOneAndDelete({ email: req.body.email });
      if (!deletedProfile) return res.status(404).json({ message: 'Profile not found' });
  
      res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
