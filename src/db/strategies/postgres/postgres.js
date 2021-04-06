const Icrud = require('./../interfaces/InterfaceIcrud')
const Sequelize = require('sequelize')

class Postgres extends Icrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name,
            schema.schema,
            schema.options
        )

        await model.sync()
        return model
    }


    static async connect() {
        const connection = new Sequelize(
                'postgresheroesDCComics',
                'adminpostgres',
                'passwordpostgres',
                {
                    host: '192.168.1.19',
                    dialect: 'postgres',
                    quoteIdentifiers: false,
                    operatorAliases: false,
                    logging: false
                }
        )

        return connection
    }

    async isConnected() {
        try {
            await this._connection.authenticate()
            return true;
        } catch (error) {
            console.log('Fail to Connect to Postgres :/', error)
            return false;
        }
    }
    

    async create(item) {
        const { dataValues } = await this._schema.create(item)
        return dataValues
    }

    async read(item = {}) {
        const result = await this._schema.findAll({
            where: item,
            raw: true
        })

        return result
    }

    async update(id, item) {
        //console.log('my item update', item)

        const result = await this._schema.update(item, {
            where: { id: id}
        })
        //console.log('result', result)

        return result
    }

    async delete(id) {
        const result = id ? {id: id} : {}
        return this._schema.destroy({
            where: result
        })
    }
}

module.exports = Postgres