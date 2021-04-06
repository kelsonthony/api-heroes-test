const ContextStrategy = require('./src/db/strategies/base/contextStrategy')
const Postgres = require('./src/db/strategies/postgres/postgres')

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create()
