# SimpleMessagingApp
A simple messaging app to let two, hardcoded peer connections users chat with one another.

To see this in action:
1. `npm i`
2. `npm run serve`
3. navigate to the url the serve is running at. Location is in the output.
4. Should land on a hosted, insecure site (local machine is hosting).
5. Open the console to help see the output. There is very basic error handling done on this project.

To see the tests in action (they are still WIP):
1. `npm run test`

# Notes, ideas, and thoughts to reflect on:
## Before Starting....
1) I could simply send messages over a dataChannel. Already know how to set those up so it would be faster. Is there a better solutions then sending a message over the dc? Probably. But I'm going to stick with the knowledge I currently have without researching another solution. Then, after it get it (hopefully) workin, I want to see if there was a better solution or different place I could have sent messages over.
2) I need to get something running locally. For this part I'm going to rely on some npm modules. I want to focus more on building it rather then really spending time getting the service running since I currently plan on just running locally.
3) I'm probably going to use browserfy because I'm use to it, but this could also be a time to explore...
4) ohhh but if I have time I could get this running w/ k8s and digital ocean. I've been wanting to try a few things with those since a hackathon so now might be a perfect time to explore! Stretch goals.

## Init
Ok: as I'm getting things set up, making a list of stuff I normally like doing so I'm going to try and make sure I get that done:

* Keep a clean layout. I should be putting the real code in modules and in dirs.
* Tests are super cool. I want to strive to have somewhat descent code coverage and have simple unit tests around the dc. I should be able to build tests before I even build the other stuff.
* Wow, so after thinking I was smart and going to use babel to try new es6. I use it in other projects, but much of those projects already had the ground work, thus I never dealt with it from scratch. Only fixing things in place. I got stuck just trying to use es6 import/export. I was trying to reference outside info as little as possible but quickly started to struggle just getting the init set up to use babel. Hopefully I can come back and truly get this working, but I want to move forward with the project since I can still complete the task with the tools I currently have https://stackoverflow.com/questions/38296667/getting-unexpected-token-export -> https://github.com/babel/babel/issues/8482

## Session 2
I had a lot of ground work set up and sections I wanted to get working. Ben fighting compiler issues and a mix up of wrong/different babel and browserfy set ups. My original goal was to have tests show the messages being sent over the dataChannel. Sadly I kept fighting compiler issues and trying to use new/different patterns for modules.

After spending a bit of time trying to pick up where I left off: I want to make sure I still completed the core problem so I'm going to move forward with running my code all in `index.js` since I did get budo working. I feel like a fool though struggling with getting compilers set up just so I can use es6.

--

Got messages being sent over a data channel working! Most of the parts fell into place how I was expecting and assuming when I started this project. Sadly, I had issues early on with trying to get additional compilers and tools. I had wanted to take a stab at setting up a project w/ babel since all the current project I work on already have those parts. In the end, I failed my few attempts at getting that working and moved forward knowing I could still write the scripts in a single file. It's not ideal but I was trying to stick within a loss timeframe for myself and still show messages could be sent.

I ran out of time to circle back and work on the tests. My original idea (before other issues) was to show a message being sent all through e2e tests. Then write the rest of the code to do the same on the hosted web page. I had enough issues getting karma and jasmine to play nice due to syntax/compiler errors. The afterEach steps where always failing due to syntax errors. Much of the compiler for the tests where expecting es6 and since I failed at getting Babel working, sections where failing and the output was difficult to read. If I had more time or was working on product-ionizing this project, I would have staying on the path of getting the test working solid first before really starting any other sections. This would give quicker developer time and I could have a slew of tests to make sure every new code change helps/passes.

**Final note**: my main goal with this project was to try and look up or reference example code as little as possible. I had 2 major points where I failed:
1) trying to get babel working. Ended up researching a lot and learning a lot.
2) the init ICE connections. I know how the negotiation works but always forget a little step or part. In the end, I needed to reference the docs on steps to connect a local and remote peer connection. I knew I needed the peer connection though to open and use the data channel.

## Reference:
* RTCDataChannel https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel
* I normally use node.js require but was reading that there is a new method w/ es6. I want to try and structure modules here in that pattern:
** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
** https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
