const express = require('express');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const NM = [
  "XANVIR",
  "6X",
  "NIHA",
  "NURIN",
  "HASSAN",
  "HAMIM",
  "SAKIBIN"
];

const NML = NM[Math.floor(Math.random() * NM.length)];
console.log(NML);


const app = express();
const port = 3000;
app.set('json spaces', 4);
app.get('/', (req, res) => {
  res.send('Asslamualaykum 🥰❤️‍🩹')
});
// Replace 'your-hosting-url' with your actual hosting URL
const hostingUrl = 'https://removebg.xanxunder11.repl.co';

// Serve files from the 'cache' directory under the '/removedbg' route
app.use('/removedbg', express.static('database'));

app.get('/removebg', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json({
    error: `Please provide a vaild url`,
    Example: `${hostingUrl}/removebg url=http://upload.xanxunder11.repl.co/success/4303c1c3-ab09-4d2d-872b-8d969b935ac0.jpeg`
  });
  try {
    // Create form data
    const formData = new FormData();

    // Append fields to formData
    formData.append('size', 'auto');
    formData.append('image_url', url); // Replace with the actual image URL

    // Make API call to remove.bg
    const response = await axios({
      method: 'post',
      url: 'https://api.remove.bg/v1.0/removebg',
      data: formData,
      responseType: 'arraybuffer',
      headers: {
        ...formData.getHeaders(),
        'X-Api-Key': '5mwA5CasNZiQuxTSCSsHGSoV',
      },
      encoding: null,
    });

    // Check if the API call was successful
    if (response.status !== 200) {
      console.error('Error:', response.status, response.statusText);
      return res.status(500).send('Error 🙂💔');
    }

    // Save the image without background
    fs.writeFileSync(__dirname + `${NML}.png`, response.data);

    // Send a success response with the accessible image URL

    const accessibleImageUrl = `${hostingUrl}/removedbg/${NML}.png`;

    res.json({
      status: true,
      author: `TANVIR_6X`,
      removed_BG: accessibleImageUrl,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.json({ status: false, error: 'Sorry, something went wrong.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://xanvir:${port}`);
});
