const assert = require('assert')
const MongoDB = require('../db/strategies/mongo/mongodb')
const heroSchema = require('./../db/strategies/mongo/schemas/heroSchema')
const Context = require('./../db/strategies/base/contextStrategy')



const MOCK_HERO_CREATE = {
    nameHero: '',
    power: ''
}

const MOCK_HERO_DEFAULT = {
    nameHero: `Captain America-${Date.now()}`,
    power: 'Shield'
}

//const contextTest = new Context( new mongoDB())
//const contextTest = new Context( new mongoDB(connection, heroSchema))

let contextTest = {}

describe.only('Test Mongo Connection', function() {
    this.beforeAll( async () => {
        const connection = await MongoDB.connect()
        contextTest = new Context( new MongoDB(connection, heroSchema))
        
        await contextTest.create(MOCK_HERO_DEFAULT)
    
    })
    

    it('1 Check the connection to Mongo DB', async () => {
        
        const result = await contextTest.isConnected()

        const expected = 'Connected'

        assert.deepStrictEqual(result, expected)
        console.log('my result connection to mongo DB', result)
        console.log('my expected connection to Mongo DB', expected)
    });

    it('2 Create a new Hero on MongoDB', async () => {

        const { nameHero, power } = await contextTest.create({MOCK_HERO_CREATE})

        assert.deepStrictEqual({ nameHero: nameHero, power: power }, MOCK_HERO_CREATE)
        console.log('Result to create here', {nameHero, power})
    });

    // it('Read a list to Heros on MongoDB', async () => {
    //     const [{nameHero, power}] = await contextTest.read({nameHero: MOCK_HERO_DEFAULT.nameHero})

    //     const result = { nameHero, power}

    //     assert.deepStrictEqual(result, MOCK_HERO_DEFAULT)
    //     console.log('Result List', result)
    // });
});

