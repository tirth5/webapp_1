const amqp = require('amqplib/callback_api');
const fs = require('fs');
const axios = require('axios');
const { spawn } = require('child_process');
const { exec } = require('child_process');

describe('WebdriverIO Test', () => {
  before(() => {
    // Clear the content of the txt1.txt file before the test runs
    try {
      fs.writeFileSync('E:/webio/txt1.txt', '');
      fs.writeFileSync('E:/webio/txt2.txt','');
      console.log('txt1.txt file content cleared successfully');
    } catch (error) {
      // Handle error if the file doesn't exist or cannot be cleared
      console.error('Error clearing content of txt1.txt file:', error);
    }
  });

  async function executePythonScript(pythonFilePath) {
    try {
      const { stdout, stderr } = await exec(`python ${pythonFilePath}`);
      console.log(`Python file output: ${stdout}`);
      console.error(`Python file errors: ${stderr}`);
      if(stdout)
      {
        console.log("code is running")
      }
      return stdout;
    } catch (error) {
      console.error(`Error executing Python file: ${error}`);
      throw error;
    }
  }

  async function waitForFileContent(filePath) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        try {
          const stats = fs.statSync(filePath);
          if (stats.size > 0) {
            clearInterval(interval);
            resolve();
          }
        } catch (error) {
          clearInterval(interval);
          reject(error);
        }
      }, 1000); // Poll every second (adjust as needed)
    });
  }

 

  it('should receive text from backend', async () => {
    // Create a Promise to handle AMQP message processing
    const messagePromise = new Promise((resolve, reject) => {
      amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
          reject(error0);
        }

        connection.createChannel(function (error1, channel) {
          if (error1) {
            reject(error1);
          }
          const queue = 'webdriverio_queue';

          channel.assertQueue(queue, {
            durable: false
          });

          console.log("Waiting for messages in queue");

          channel.consume(queue, async function (message) {
            console.log("Received text from backend:", message.content.toString());
          
            let receivedText = message.content.toString();

            await browser.maximizeWindow();
            await browser.url('https://www.google.com/'); 

            await $('.gLFyf').setValue(receivedText); 
            await $('input[type="submit"]').click();
            var f=0;
        
            await browser.pause(15000);
            await browser.waitUntil(async () => {
              const h3Elements = await $$('h3');
              return h3Elements.length > 0; // Return true when at least one h3 element is found
            }, {
              timeout: 10000, // Maximum wait time in milliseconds
              timeoutMsg: 'No h3 elements found within the specified timeout' // Error message if timeout is exceeded
            });
            let j=0;
            const links =await $$('h3');
            for (let i = 0; i < links.length; i++) {
             
              console.log(links[i]);
              await links[i].click();
              await browser.pause(5000);
              const eles = await browser.$$('p');
              let all_txt = '';
              for (let i = 0; i < eles.length; i++) {
                if(j>=1)
                {
                const txt = await eles[i].getText();
                all_txt+='\n';
                all_txt += `${txt}`;
                if(all_txt.length>7000)
                {
                  f=1;
                  break;
                }
                console.log(all_txt.length)
              }
              j++;
              }
              const file_name = 'txt1.txt';
            //  fs.appendFileSync(file_name, all_txt, 'utf8');
           // fs.writeFileSync(file_name, all_txt.replace(/\s+/g, ' ').trim(), 'utf8');
           fs.writeFileSync(file_name, all_txt.replace(/\[.*?\]/g, '').replace(/\s+/g, ' ').trim(), 'utf8');
 
              console.log(`Sentences saved to ${file_name}`);
              if(f==1)break;
              await browser.back();
              await browser.pause(5000);
            }
            // const f_name='E:/webio/txt1.txt';
            // const data =  fs.readFile(f_name, 'utf-8');

            // // Find the index of the first occurrence of '! ' (end of the first sentence)
            // const endIndex = data.indexOf('!') + 2;
    
            // // Remove the first sentence from the content
            // const modifiedContent = data.substring(endIndex);
    
            // // Write the modified content back to the file
            // fs.writeFile(f_name, modifiedContent, 'utf-8');

          
            resolve();
          }, {
            noAck: true
          });
        });
      });
    });
    await messagePromise;

    //-------------------------------------------------------------------------------------------
    //const pythonProcess = spawn('python', ['....python/pyth.py', 'E:/webio/txt1.txt']);
    //////////////////////////////////////
    
// Replace 'pythonFile.py' with the path to your Python file
const pythonFile = 'E:\\webio\\pyth.py';
const pythonExecutionResult = await executePythonScript(pythonFile);


/////////////////////////////////////////
if (pythonExecutionResult) {
    const filePath = 'E:/webio/txt2.txt';
    console.log('Waiting for txt2.txt to contain some content...');
    await waitForFileContent(filePath);
    console.log('txt2.txt contains some content.');

    ///////////////////////

  

    //////////////////////////

    const receivedText = fs.readFileSync(filePath, 'utf-8');

    // Send the text to the backend server
    try {
      const response = await axios.post('http://localhost:3001/receive-text', { text: receivedText });
      console.log(response.data);
    } catch (error) {
      console.error('Error sending text to backend:', error);
    }
  }
  
    // Wait for the message processing to complete before finishing the test
  
  });
});
