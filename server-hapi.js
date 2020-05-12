const http2 = require('http2')
const Hapi = require('@hapi/hapi')

const { HTTP2_HEADER_PATH } = http2.constants;

const init = async () => {
  const server = Hapi.server({
    listener: http2.createServer(),
    host: 'localhost',
    port: 3000
  })
  server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
      const stream = request.raw.res.stream
      let disconnected = false;
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
      return "disconnected"
    }
  });
  await server.start()
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init()
