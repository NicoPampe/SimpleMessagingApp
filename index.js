// :( import/export modules should be working. I have just been stumbling to much w/ the compiler and don't want that to be the focus
// import { connectionManager } from 'src/connection/connectionManager';

// Load the elemnts once
const connectButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');
const localSendMsgButton = document.getElementById('localSendMsgButton');
const localChannelMsgText = document.getElementById('localChannelMsgText');
const localMsgTextarea = document.getElementById('localMsgTextarea');
const remoteSendMsgButton = document.getElementById('remoteSendMsgButton');
const remoteChannelMsgText = document.getElementById('remoteChannelMsgText');
const remoteMsgTextarea = document.getElementById('remoteMsgTextarea');

// event listeners
connectButton.addEventListener('click', connect);
disconnectButton.addEventListener('click', disconnect);

localSendMsgButton.addEventListener('click', (event) => {
  const input = localChannelMsgText.value || 'I guess I can send a defualt string...';
  const data = { message: input };
  try {
    localDataChannel.send(JSON.stringify(data));
  } catch (e) {
    window.alert(e);
  }
});

remoteSendMsgButton.addEventListener('click', (event) => {
  const input = remoteChannelMsgText.value || 'A defualt string from the remote peer coonection? Crazy!';
  const data = { message: input };
  try {
    remoteDataChannel.send(JSON.stringify(data));
  } catch (e) {
    window.alert(e);
  }
});

// helpers
function displayMessage(msg, target) {
  if (target === 'local') {
    const oldText = localMsgTextarea.value;
    localMsgTextarea.value = `${msg}\n${oldText}`; // TODO: this will always add a new line. Shouldn't add a new line if oldText is empty
  } else if (target === 'remote') {
    const oldText = remoteMsgTextarea.value;
    remoteMsgTextarea.value = `${msg}\n${oldText}`; // TODO: this will always add a new line. Shouldn't add a new line if oldText is empty
  }
}

////////////////////////////////////////////////////////////////////////////////
// This should all be living in the connectionManager //
// TODO: this is actually a really bad layout. It's making everything easy to override. Should be more of a singleton with a larger `create` func
let localPC, localDataChannel, remoteDataChannel, remotePC;

function connect() {
  // TODO: this really needs to be a promise and handle way more error cases.
  //  just having it `return` is not enough for a good product. Code Smell
  if (localPC && localPC.connectionState === 'connected') {
    window.alert('The local peer connection is already connected!')
    return;
  }
  if (remotePC && remotePC.connectionState === 'connected') {
    window.alert('The remote peer connection is already connected!')
    return;
  }


  // Set up local and remote peer connections
  localPC = new RTCPeerConnection();
  localDataChannel = localPC.createDataChannel('local channel');
  /// event handlers ///
  localDataChannel.onmessage = function (event) {
    const data = JSON.parse(event.data);
    console.log('received: ', data);
    displayMessage(data.message, 'local'); // hard coding this path. There should be checks in place
  };

  localDataChannel.onopen = function () {
    console.log('datachannel 1 open');
  };

  localDataChannel.onclose = function () {
    console.log('datachannel 1 close');
  };

  remotePC = new RTCPeerConnection();
  remotePC.ondatachannel = function(event) {
    remoteDataChannel = event.channel

    /// event handlers ///
    remoteDataChannel.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log('received: ', data);
      displayMessage(data.message, 'remote'); // hard coding this path. There should be checks in place
    };
    remoteDataChannel.onopen = function () {
      console.log('datachannel 2 open');
    };
    remoteDataChannel.onclose = function () {
      console.log('datachannel 2 close');
    };
  }

  // ICE negotion set up
  localPC.onicecandidate = e => !e.candidate
    || remotePC.addIceCandidate(e.candidate)
    .catch(handleAddCandidateError);

  remotePC.onicecandidate = e => !e.candidate
    || localPC.addIceCandidate(e.candidate)
    .catch(handleAddCandidateError);

  // Handle the ICE connections
  // Notes: I spent some time trying to remember the flow of ICE.
  //  I know there is a need for an offer answer before the channels are open.
  //  What I was missed before I looked up an example from the mozilla docs was the call to set the remote desc on the localPC
  //  Now the connection has been set and the messages should be able to be sent :)
  localPC.createOffer()
    .then(offer => localPC.setLocalDescription(offer))
    .then(() => remotePC.setRemoteDescription(localPC.localDescription))
    .then(() => remotePC.createAnswer())
    .then(answer => remotePC.setLocalDescription(answer))
    .then(() => localPC.setRemoteDescription(remotePC.localDescription))
    .catch(handleCreateDescriptionError);
}

function disconnect() {
  // RTCPeerConnection close doesn't return anything. No promises
  localPC.close();
  remotePC.close();
}

function handleAddCandidateError(error) {
  console.log('There was an error onicecandidate', error);
  disconnect();
}

function handleCreateDescriptionError(error) {
  console.log('There was an error for localPC createOffer', error);
  disconnect();
}
