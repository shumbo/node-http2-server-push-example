# node-http2-server-push-example

Send/receive HTTP/2 server push with Node.js

This repo includes three examples:

+ `server.js` uses "stream" event
+ `server-handler.js` uses [compaticility API](https://nodejs.org/api/http2.html#http2_compatibility_api) (i.e. `(req, res) => void`)
+ `server-hapi.js` uses [hapi.js](https://hapi.dev/)

Once you start a server, run `client.js` to access. You can also use other http clients that support http2 server push, such as [nghttp2](https://nghttp2.org/documentation/index.html).

## Usage

```
git clone https://github.com/shumbo/node-http2-server-push-example.git
yarn
node server.js # to start server
node client.js # to start client
```
