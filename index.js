const express = require('express');
const app = express();
const port = 3000;
const DentistRouter=require('./Router/dentist_router');
const AdminRouter=require('./Router/admin_router');
const SubscriptionRouter=require('./Router/subscription_router')

app.use(express.json());
app.use('/dentist',DentistRouter);
app.use('/admin',AdminRouter);
app.use('/subscription',SubscriptionRouter);
// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
