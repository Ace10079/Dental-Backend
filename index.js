const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000
const cors = require('cors');
require('dotenv').config(); // Load environment variables

// Importing routers
const DentistRouter = require('./Router/dentist_router');
const AdminRouter = require('./Router/admin_router');
const SubscriptionRouter = require('./Router/subscription_router');
const PatientRouter = require('./Router/patient_router');
const SaveRouter = require('./Router/saveRoutes');
const TransactionRouter=require('./Router/subscription_router')
// Apply CORS middleware before defining routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Serve static files from 'img' directory
app.use('/images', express.static('img'));

// Define routes
app.use('/dentist', DentistRouter);
app.use('/admin', AdminRouter);
app.use('/subscription', SubscriptionRouter);
app.use('/patient', PatientRouter);
app.use('/save', SaveRouter);
app.use('/transaction',TransactionRouter)
// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
