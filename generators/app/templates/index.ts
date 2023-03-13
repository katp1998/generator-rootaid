import express from 'express';
<% if (mongodb) { %>
import mongoose from 'mongoose'
<% } %>
const app = express();
 
app.get('/', (req, res) => {
  res.send('Hello World');
});

<% if (mongodb) { %>
mongoose().then(() => {
  console.log("Database loaded!");
  app.listen(3000, () => console.log("Up and Running on port 3000"));
})
<% } else { %>
app.listen(3000, () => console.log("Up and Running on port 3000"));
<% } %>