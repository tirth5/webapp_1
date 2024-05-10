const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const amqp = require('amqplib/callback_api');
//const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());
var receivedText="";
app.post('/receive-text', (req, res) => {
  receivedText = req.body.text;

  

  console.log('Received text:', receivedText);
  res.send('Text received successfully');
});

// Endpoint to send the received text to the frontend
app.get('/get-received-text', (req, res) => {
  res.send(receivedText);
});

//-------------------------------------------------------------------------------
// Endpoint to receive text from frontend
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    const queue = 'webdriverio_queue';

    // Declare a queue
    channel.assertQueue(queue, {
      durable: false
    });

app.post('/', (req, res) => {
    console.log('Received input value from frontend:', req.body);
    const { inputValue } = req.body;
   // console.log('Received input value from frontend:', inputValue);
 
    channel.sendToQueue(queue, Buffer.from(inputValue));
   
  // Send the input value to WebdriverIO test (replace this with your actual test implementation)
  // For demonstration purpose, just send a success response back
 // res.status(200).send('Received input value successfully');


////////////////////////////

  // exec('npx wdio run wdio.conf.js --spec ./test/specs/testcase.js', { cwd: 'E://webio' }, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error executing WebDriverIO test: ${error.message}`);
  //     res.status(500).send('Internal server error');
  //     return;
  //   }
  //   if (stderr) {
  //     console.error(`WebDriverIO test encountered an error: ${stderr}`);
  //     res.status(500).send('Internal server error');
  //     return;
  //   }
  //   console.log(`WebDriverIO test output: ${stdout}`);
  //   res.status(200).send('Test executed successfully');
  // });



  /////////////////////////
});
});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
