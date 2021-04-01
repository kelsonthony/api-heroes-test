const Icrud = require('../interfaces/InterfaceIcrud')
const Mongoose = require('mongoose')


const STATUS = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
}

class MongoDB extends Icrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }



    static connect() {
        Mongoose.connect(
            'mongodb://herouser:passwordwordheroes@192.168.1.19:27017/heroesdb',
            {useNewUrlParser: true, useUnifiedTopology: true}, function(error) {
                    if (!error) return;
                        console.log('Connection to MongoDB fail', error);
                });
        
            const connection = Mongoose.connection
            this._connection = connection
            connection.once('open', () => console.log('Mongo DB is Running') )
            return connection;
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState]

        //console.log('my state', state)

        if(state === 'Connected') return state

        if(state !== 'Connecting') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._connection.readyState]
    }

  

    // async create(item) {
   
    //     const resultCreate = await this._schema.create({
    //         nameHero: null,
    //         power: null
    //     })
   
    //     console.log('resultCreate', resultCreate)

    //     return resultCreate
    // }

    create(item) {
        return this._schema.create(item)
        
    }

    // read(item, skip = 0, limit=10) {
    //     return this._heroesMarvel.find(item).skip(skip).limit(limit)
    // }


}

module.exports = MongoDB