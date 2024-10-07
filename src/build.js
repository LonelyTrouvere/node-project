import fastify from 'fastify'
import { createRequire } from "module"

const require = createRequire(import.meta.url);
const products = require("./products.json");

export function build(opts={}) {
    const app = fastify(opts)

    app.get('/products', (req, rep) => {
        rep.send(products)
    })
    
    app.put('/new-route', {}, (req) => {})

    app.get('/products/:id', (req, rep) => {
        const id = Number.parseInt(req.params.id)
        const product = products.find(x => x.id === id)
        if(!product){
            rep.code(404).send({ error: 'Product does not exist' })
        }
        rep.send(product)
    })
    
    app.get('/', function (request, reply) {
      reply.send({ hello: 'world' })
    })
  
    return app
  }
  