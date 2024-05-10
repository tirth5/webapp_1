describe('demo test',function() {

    it('my first test',async () => {
      browser.url("https://codeforces.com")
     
      const link = await $('=Enter')

await expect(link).toHaveAttribute('href', '/enter?back=%2F')
      await link.click()
      await $('#handleOrEmail').setValue('tirthchavda33@gmail.com')
      await $('#password').setValue('@TIRTHchavda5')
      await $('.submit').click()
      console.log("tirth chavda it is successfull")
      await $('=PROBLEMSET').click()
      await $('[title="Difficulty"]').click()
      await $('[title="Difficulty"]').click()
      for(let i=0;i<94;i++)
      {
            const ele=await browser.$('[href="/problemset/problem/231/A"]').isExisting()
            if(ele)
            {
                  await $('[href="/problemset/problem/231/A"]').click()
                  break;
            }
            else{
                  await $(`[href="/problemset/page/${i+2}"]`).click()
            }
            
      }
      await $('=SUBMIT').click()
      browser.pause(5000)

   await $(".ace_content").setValue(`#include<iostream>
      using namespace std;
       
      main()
      {
          int n;
       
          cin>>n;
          if(n%2==0 && n>2)
          {
              cout<<"YES";
          }
          else
          {
              cout<<"NO";
          }
       
       
          }`)


      // const link1 = await $('=tirthchavda')

      // await expect(link1).toHaveAttribute('href', '/profile/tirthchavda')
      //       await link1.click()
            console.log("tirth chavda it is successfull__1")
     
    })
})

