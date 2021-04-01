const ContextStrategy = require('./src/db/strategies/base/contextStrategy')
const Postgres = require('./src/db/strategies/postgres/postgres')
const MongoDB = require('./src/db/strategies/mongo/mongo')

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create()

const contextMongoDB = new ContextStrategy(new MongoDB())
contextMongoDB.create()