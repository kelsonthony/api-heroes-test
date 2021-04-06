const assert = require('assert')
const Postgres = require('./../db/strategies/postgres/postgres')
const heroSchema = require('./../db/strategies/postgres/schema/heroSchema')
const ContextStrategy = require('./../db/strategies/base/contextStrategy')



const MOCK_HERO_DC_CREATE = {
    name: 'Wonder Woman',
    power: 'Tie'
}

let contextTest = {}

describe('Postgres Strategy', function() {
    this.timeout(Infinity)
    this.beforeAll( async function() {

        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, heroSchema)
        contextTest = new ContextStrategy(new Postgres(connection, model))
        await contextTest.delete()
        await contextTest.create(MOCK_HERO_DC_CREATE)
        
        
    })

    it('1 Test PostgreSQL should be Connection', async () => {
        const result = await contextTest.isConnected()
        console.log('my result Connection', result)
        assert.deepStrictEqual(result, true)
        
    });

    it('2 Test Create a Hero on Database', async () => {
        const result = await contextTest.create(MOCK_HERO_DC_CREATE)
        delete result.id
        assert.deepStrictEqual(result, MOCK_HERO_DC_CREATE)
        console.log('Create my Hero DC', result)
    });

    it('3 Should be read a list of heroes', async () => {
        //const [result] = await contextTest.read({name: MOCK_HERO_DC_CREATE.name})
        const [result] = await contextTest.read({name: MOCK_HERO_DC_CREATE.name})
        delete result.id
       
        console.log('List heroes', result)
        assert.deepStrictEqual(result, MOCK_HERO_DC_CREATE)
    });

    it('4 Update a Hero', async () => {
        const [itemUpdate] = await contextTest.read({
            name: MOCK_HERO_DC_CREATE.name,
            power: MOCK_HERO_DC_CREATE.power
        })
        const newItem = {
            ...MOCK_HERO_DC_CREATE,
            name: 'Superman',
            power: 'Super Force'
        }

        console.log('my itemUpdate', itemUpdate)

        const [result] = await contextTest.update(itemUpdate.id, newItem)
        const [itemUpdated] = await contextTest.read({ id: itemUpdate.id })
        console.log('result update', result)
        assert.deepStrictEqual(result, 1)
        assert.deepStrictEqual(itemUpdated.name, newItem.name)
    });

    it('4 Delete a Hero by ID', async () => {
        const [item] = await contextTest.read({})
        const result = await contextTest.delete(item.id)
        console.log('result delete', result)
        assert.deepStrictEqual(result, 1)
    });

    
});