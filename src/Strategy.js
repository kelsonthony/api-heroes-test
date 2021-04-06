class NotImplementedException extends Error {
    constructor() {
        super('Not Implemented Exception')
    }
}

class Icrud {
    
    create(item) {
        throw new NotImplementedException()
    }

    read(query) {
        throw new NotImplementedException()
    }

    update(id, item) {
        throw new NotImplementedException()
    }

    delete(id) {
        throw new NotImplementedException()
    }

}

class Postgres extends Icrud {
    
    constructor() {
        super()
    }

    create(item) {
        console.log('Item salve on Postgre Database :)')
    }

}


class ContextStrategy {
    
    constructor(strategy) {
        this._database = strategy
    }

    create(item) {
        return this._database.create(item)
    }

    read(item) {
        return this._database.read(item)
    }

    update(id, item) {
        return this._database.update(id, item)
    }

    delete(id) {
        return this._database.delete(id)
    }

}

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create()

const contextMongoDB = new ContextStrategy(new MongoDB())
contextMongoDB.create()