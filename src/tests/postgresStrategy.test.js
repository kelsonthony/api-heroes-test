const assert = require('assert')
const Postgres = require('./../db/strategies/postgres/postgres')
const ContextStrategy = require('./../db/strategies/base/contextStrategy')

const contextTest = new ContextStrategy(new Postgres())

const MOCK_HERO_DC_CREATE = {
    name: 'Wonder Woman',
    power: 'Tie'
}

describe('Postgres Strategy', function() {
    this.timeout(Infinity)
    this.beforeAll( async () => {
        await contextTest.connect()
        await contextTest.create(MOCK_HERO_DC_CREATE)
        
        
    })

    it('1 Test PostgreSQL should be Connection', async () => {
        const result = await contextTest.isConnected()
        //console.log('my result Connection', result)
        assert.deepStrictEqual(result, true)
        
    });

    it('2 Test Create a Hero on Database', async () => {
        const result = await contextTest.create(MOCK_HERO_DC_CREATE)
       // console.log('Create my Hero DC', result)
        delete result.id
        assert.deepStrictEqual(result, MOCK_HERO_DC_CREATE)
    });

    it('3 Should be read a list of heroes', async () => {
        //const [result] = await contextTest.read({name: MOCK_HERO_DC_CREATE.name})
        const [result] = await contextTest.read({name: MOCK_HERO_DC_CREATE.name})
        delete result.id
       // const expected = 10
        //console.log('List heroes', result)
        assert.deepStrictEqual(result, MOCK_HERO_DC_CREATE)
    });
    
});