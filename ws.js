import ws from "k6/ws";

export let options = {
  stages: [
    { duration: "1m", target: 10 },
    { duration: "5m", target: 100 },
    { duration: "55m", target: 300 },
  ],
};

export default function () {
  const url = "wss://bgapi.bitget47.top/socket.io/?EIO=3&transport=websocket";
  const response = ws.connect(url, {}, function (socket) {
    socket.on("open", function open() {
      console.log("connected");
      socket.send('42["sub","kline_1_3_1min"]');
    });

    socket.on("message", function (message) {
      console.log(`Received message: ${message}`);
    });

    socket.on("close", function () {
      console.log("disconnected");
    });
  });

  if (!response) {
    console.log("WebSocket handshake failed");
    return;
  }
}

