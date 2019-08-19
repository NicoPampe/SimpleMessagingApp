// This will controle the dc connection. I think I might just "hack" things together and just have 2 connections in a known order.

const pc = new RTCPeerConnection();

const dc1 = pc.createDataChannel("my channel");
dc1.onmessage = function (event) {
  console.log("received: " + event.data);
};

dc1.onopen = function () {
  console.log("datachannel 1 open");
};

dc1.onclose = function () {
  console.log("datachannel 1 close");
};


const dc2 = pc.createDataChannel("my channel");
dc2.onmessage = function (event) {
  console.log("received: " + event.data);
};

dc2.onopen = function () {
  console.log("datachannel 2 open");
};

dc2.onclose = function () {
  console.log("datachannel 2 close");
};

console.log('woot!!');

module.exports { dc1, dc2 };
