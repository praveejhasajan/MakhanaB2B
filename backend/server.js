const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Make sure to add this line
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Delivery charges data
const deliveryRates = [
  { zone: 'local', pincodeStart: 110000, pincodeEnd: 119999, ratePerKg: 50 },
  { zone: 'state', pincodeStart: 120000, pincodeEnd: 129999, ratePerKg: 100 },
  { zone: 'interstate', pincodeStart: 130000, pincodeEnd: 199999, ratePerKg: 150 },
];

// Function to calculate delivery charge
function getDeliveryCharge(pincode, weight) {
  const rate = deliveryRates.find(
    (zone) => pincode >= zone.pincodeStart && pincode <= zone.pincodeEnd
  );
  return rate ? rate.ratePerKg * weight : 200; // Default charge if no match
}

// New route to calculate delivery charges
app.get('/calculate-delivery', (req, res) => {
  const { pincode, weight } = req.query;

  if (!pincode || !weight) {
    return res.status(400).json({ message: 'Pincode and weight are required' });
  }

  const deliveryCharge = getDeliveryCharge(parseInt(pincode), parseFloat(weight));
  res.json({ deliveryCharge });
});

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

const contactRouter = require('./routes/contact');
app.use('/contact', contactRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
