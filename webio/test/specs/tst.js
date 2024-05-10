describe('demo test',function() {

    it('my first test',async () => {
    //   browser.url("http://localhost:3000/login")
    //   browser.pause(5000)
    //   await $('input[type="text"]').setValue("tirth34@gmail.com")
    //   await $('input[type="password"]').setValue("tirth12")
    //   await $('button[type="submit"]').click()
    //   await $('/html/body/div/div/div[2]/div[2]/form/div/input[1]').setValue("nirma")
    //   browser.pause(10000)
    // //   const link = await $('=Enter')
    await browser.url('https://www.google.com/');
    // Navigate to your URL
    receivedText="virat";
   await $('.gLFyf').setValue(receivedText); // Set value of the element with class 'gLFyf'
   await $('input[type="submit"]').click();
    })

})


