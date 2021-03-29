const Icrud = require('./../interfaces/InterfaceIcrud')
const Sequelize = require('sequelize')

module.exports = class Postgres extends Icrud {
    constructor() {
        super()
        this._driver = null
        this._heroesDC = null
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true;
        } catch (error) {
            console.log('Fail to Connect to Postgres :/', error)
            return false;
        }
    }

    async connect() {
        this._driver = new Sequelize(
            'postgresheroesDCComics',
            'adminpostgres',
            'passwordpostgres',
            {
                host: '192.168.1.19',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAliases: false
            }
        )

        await this.defineModel()
    }

    async defineModel() {
        this._heroesDC = this._driver.define('postgresheroesDCComics', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                required: true,
            },
            power: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROES_DC',
            freezeTableName: false,
            timestamps: false
        })

        await this._heroesDC.sync()
    }

    async create(item) {
        const { dataValues } = await this._heroesDC.create(item)
        return dataValues
    }

    async read(item = {}) {
        const result = await this._heroesDC.findAll({
            where: item,
            raw: true
        })

        return result
    }

    async update(id, item) {
        //console.log('my item update', item)

        const result = await this._heroesDC.update(item, {
            where: { id: id}
        })
        //console.log('result', result)

        return result
    }

    async delete(id) {
        const result = id ? {id: id} : {}
        return this._heroesDC.destroy({
            where: result
        })
    }
}