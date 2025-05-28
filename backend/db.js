const mongoose = require('mongoose');
const removeExpiredUnavailableSlots = require('./middlewares/anavailable');
const mongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected!');
    setInterval(removeExpiredUnavailableSlots, 20000);
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
  }
};

module.exports = mongodb;
