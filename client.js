const http2 = require("http2");

const client = http2.connect("http://localhost:3000");

client.on("stream", (pushedStream, requestHeaders) => {
  pushedStream.on("push", (responseHeaders) => {
    console.log("push", responseHeaders);
  });
  let data = "";
  pushedStream.on("data", (chunk) => {
    data += chunk;
  });
  pushedStream.on("end", () => {
    console.log(`Pushed: ${data}`);
  });
});

const req = client.request({ ":path": "/" });
req.setEncoding("utf8");

let data = "";
req.on("data", (chunk) => {
  data += chunk;
});

req.on("end", () => {
  console.log(`finish: ${data}`);
  client.close();
});
req.end();
