const http2 = require("http2");

const { HTTP2_HEADER_PATH } = http2.constants;

const server = http2.createServer((req, res) => {
  const stream = res.stream;
  (async () => {
    let disconnected = false;
    stream.on("close", () => {
      disconnected = true;
    });
    for (let i = 1; i <= 10; i++) {
      if (disconnected || !stream.pushAllowed) {
        break;
      }
      stream.pushStream(
        { [HTTP2_HEADER_PATH]: "/random" + i },
        (err, pushStream) => {
          console.log(`push ${i}`);
          pushStream.respond({ ":status": 200 });
          pushStream.end(`push ${i}`);
        }
      );
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));
    }
    if (!disconnected) stream.end("end stream");
  })();
});

server.on("error", console.error);

server.listen(3000);
