const amqp=require('amqplib/callback_api');
const {exec}=require('child_process');



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

      
          const commandOptions = {
            cwd: 'E:\\webio',
           
        };
        exec('npx wdio run wdio.conf.js --spec ./test/specs/testcase.js',commandOptions,(err,stdout,stderr)=>{
            if(err)
            {
                console.error(`Error:${err}`);
                return;
            }

            console.log(`stdout:${stdout}`);
            console.log(`stderr:${stderr}`);
        });
       
        
        
          resolve();
       
      });
    });
  });
