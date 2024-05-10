const amqp = require('amqplib/callback_api');
const fs = require('fs');

describe('WebdriverIO Test', () => {
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

          console.log("Waiting for messages in queue...");

          // Set prefetch count to 1 to consume only one message at a time
          channel.prefetch(1);

          channel.consume(queue, async function (message) {
            console.log("Received text from backend:", message.content.toString());
            let receivedText = message.content.toString();

            // Now you can perform actions on the webpage using WebDriverIO
            await browser.url('https://www.google.com/'); // Navigate to your URL
            await $('.gLFyf').setValue(receivedText); // Set value of the element with class 'gLFyf'
            await $('input[type="submit"]').click(); // Click on the submit button

            // Add your remaining WebDriverIO actions here
            // ...
            await browser.pause(10000);
            const links = $$('h3');
            for (let i = 0; i < 3; i++) {
              console.log("AAAAA");
              console.log(links[i]);
              await links[i].click();
              await browser.pause(5000);
              const eles = await browser.$$('p');
              let all_txt = '';
              for (let i = 0; i < eles.length && i < 20; i++) {
                const txt = await eles[i].getText();
                all_txt+='\n';
                all_txt += `${txt}`;
              }
              const file_name = 'txt1.txt';
              fs.appendFileSync(file_name, all_txt, 'utf8');
            //   let keywords = [receivedText];
            //   let sentences = all_txt.match(/[^\.!?]+[\.!\?]+/g) || [];
            //   let sents = [];
            //   keywords.forEach((keyword) => {
            //     const word = new RegExp(`\\b${keyword}\\b`, 'i');
            //     const matchedSents = sentences.filter(sentence => word.test(sentence));
            //     sents = sents.concat(matchedSents);
            //   });
            //   const data = sents.join('\n\n');
            //   console.log("__________---------------------------------________________");
            //   console.log(data);
            //   fs.appendFileSync(file_name, data, 'utf8');
              console.log(`Sentences saved to ${file_name}`);
              await browser.back();
              await browser.pause(5000);
            }

            // Acknowledge receipt of the message
            channel.ack(message);

            // Resolve the promise once message processing is complete
            resolve();
          });
        });
      });
    });

    // Wait for the message processing to complete before finishing the test
    await messagePromise;
  });
});
