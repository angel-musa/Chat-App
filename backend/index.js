const express = require("express"); // runs http server
const cors = require("cors"); // so we can call this server from other origins 
const axios = require("axios");


const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => { // takes a username from request body and returns a fake user w username and password 
  const { username } = req.body; // taking username from request body

  try {
    const r = await axios.put(
        'https://api.chatengine.io/users/',  // getting the user in chatengine if they exist else creating it
        {username: username, secret: username, first_name: username}, // user's name has been specified and using that value for their secret and firstanme
        {headers: {"private-key": "5a655540-b778-48ba-ba74-f4cd5726e2a1"}} // using project private key - allows to create/destroy users
    )
    return res.status(r.status).json(r.data); // return data
  }catch(e) {
    return res.status(e.response.status).json(e.response.data); // if something goes wrong return error message (if data specified is incorrect
  }
});

app.listen(3001); // run the port on app 3001