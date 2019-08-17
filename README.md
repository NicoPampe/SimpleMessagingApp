# SimpleMessagingApp
A simple messaging app to let 2 hardcoded users chat with one another.

# Notes and ideas to reflect on later:
## Before Starting....
1) I could simply send messages over a dataChannel. Already know how to set those up so it would be faster. Is there a better solutions then sending a message over the dc? Probably. But I'm going to stick with the knowledge I currently have without researching another solution. Then, after it get it (hopefully) workin, I want to see if there was a better solution or different place I could have sent messages over.
2) I need to get something running locally. For this part I'm going to rely on some npm modules. I want to focus more on building it rather then really spending time getting the service running since I currently plan on just running locally.
3) I'm probably going to use browserfy because I'm use to it, but this could also be a time to explore...
4) ohhh but if I have time I could get this running w/ k8s and digital ocean. I've been wanting to try a few things with those since a hackathon so now might be a perfect time to explore! Stretch goals.

## Init
Ok: as I'm getting things set up, making a list of stuff I normally like doing so I'm going to try and make sure I get that done:

* Keep a clean layout. I should be putting the real code in modules and in dirs.
* Tests are super cool. I want to strive to have somewhat descent code coverage and have simple unit tests around the dc. I should be able to build tests before I even build the other stuff.
* Wow, so after thinking I was smart and going to use babel to try new es6 (I have it working in other projects, but it's already set up, thus I didn't really need to think about things), I got stuck just trying to use es6 import/export. I was trying to reference outside info as little as possible but quickly started to struggle just getting the init set up to use babel. Hopefully I can come back and truly get it working, but it doesn't feel needed right now since it's just tying to use es6 https://stackoverflow.com/questions/38296667/getting-unexpected-token-export -> https://github.com/babel/babel/issues/8482


## Reference:
* RTCDataChannel https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel
* I normally use node.js require but was reading that there is a new method w/ es6. I want to try and structure modules here in that pattern:
** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
** https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
