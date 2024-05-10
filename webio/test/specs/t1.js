const amqp = require('amqplib/callback_api');
const fs=require('fs')
describe('WebdriverIO Test', () => {
  it('should receive text from backend', async () => {
    amqp.connect('amqp://localhost', function(error0, connection) {
      if (error0) {
        throw error0;
      }


      connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }
        const queue = 'webdriverio_queue';

        channel.assertQueue(queue, {
          durable: false
        });
  
        console.log("Waiting for messages in queue...");

        channel.consume(queue, async function(message) {
            console.log("__________----------------------------")
          console.log("Received text from backend:", message.content.toString());
          let tr=message.content.toString();
          console.log(tr)
 browser.url("https://www.google.com/")
 
           await $('.gLFyf').setValue(tr)
           await $('input[type="submit"]').click()
browser.pause(5000)
const links=$$('h3')
for(let i=0;i<3;i++)
{
  await links[i].click();
  browser.pause(5000)
  browser.setTimeout({'pageLoad':5000});
  const eles =await browser.$$('p')
  let all_txt=''
  for(let i=0;i<eles.length && i<20;i++)
  {

    const txt=await eles[i].getText();

    all_txt+=`${txt}`;


  }

  const file_name='txt1.txt';
  fs.appendFileSync(file_name,all_txt,'utf8');
  console.log(`Sentences saved to ${file_name}`);
  let keywords=[tr];
  let sentences=all_txt.match(/[^\.!?]+[\.!\?]+/g)||[]

  let sents=[]
  keywords.forEach((keyword)=>{
    const word=new RegExp(`\\b${keyword}\\b`,'i');
    const matchedSents=sentences.filter(sentence=>word.test(sentence));

    sents=sents.concat(matchedSents)
  });

  const data=sents.join('\n\n');
  fs.appendFileSync(file_name,data,'utf8');
  console.log(`Sentences saved to ${file_name}`);
  browser.back()
  browser.pause(5000)



}
          // browser.key("Enter")
          // Perform the necessary actions in the test with the received text
          // For example, assert that the received text matches expectations
        }, {
          noAck: true
        });
      });
    });

  });
});
