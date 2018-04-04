const Koa = require("koa")
const fs = require("fs")
const http2 = require("http2")
const Router = require("koa-router")

const app = new Koa()
const router = Router();


var options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt")
}

router.get("/user/:id", (ctx, next) => {
  ctx.body = `your ID is ${ctx.params["id"]}`
})

app.use(router.routes())
app.use(router.allowedMethods())
http2.createServer(options, app.callback()).listen(3000)
