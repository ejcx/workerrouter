# workerrouter
A simple router for Cloudflare Workers.

## Example
```
var workerrouter = new require('workerrouter')
var app = new workerrouter();

app.get('^/account/(?<accountid>[0-9a-f]+)$', function(request) {
  return new Response("Hey it worked " + request.params.accountid)
});

app.post('/hello', async function(request) {
  return new Response('Hello World');
})

addEventListener('fetch', event => {
  event.respondWith(app.listen(event));
})
```
