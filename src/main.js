import { build } from './build.js'

const fastify = build({
  logger: true
})

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})