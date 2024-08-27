const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// Importing routers
const DentistRouter = require('./Router/dentist_router');
const AdminRouter = require('./Router/admin_router');
const SubscriptionRouter = require('./Router/subscription_router');
const PatientRouter=require('./Router/patient_router');
// Apply CORS middleware before defining routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());
app.use('/uploads', express.static('uploads'));
// Define routes
app.use('/dentist', DentistRouter);
app.use('/admin', AdminRouter);
app.use('/subscription', SubscriptionRouter);
app.use('/patient',PatientRouter)

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
