
const connectDB = require('../config/db');
const User = require('../models/auth');
const bcrypt = require('bcrypt');

const createManualUser = async () => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash('password123', 10); 

    const newUser = new User({
      email: 'admin@example.com', 
      password: hashedPassword
    });

    await newUser.save();
    console.log('Manual user created successfully:', { email: newUser.email, id: newUser._id });

    process.exit(0);
  } catch (error) {
    console.error('Error creating manual user:', error);
    process.exit(1);
  }
};

createManualUser();
