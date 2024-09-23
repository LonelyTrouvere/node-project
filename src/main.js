import Fastify from 'fastify'
import { createRequire } from "module"

const require = createRequire(import.meta.url);
const products = require("./products.json");

const fastify = Fastify({
  logger: true
})

fastify.get('/products', (req, rep) => {
    rep.send(products)
})

fastify.get('/products/:id', (req, rep) => {
    const id = Number.parseInt(req.params.id)
    const product = products.find(x => x.id === id)
    if(!product){
        rep.code(404).send({ error: "Product doen't exist" })
    }
    rep.send(product)
})

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})