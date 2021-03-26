const Sequelize = require('sequelize')

const driver = new Sequelize(
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

async function mainPostresConnect() {
    
    const heroesDC = driver.define('postgresheroesDCComics', {
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

    await heroesDC.sync()

    await heroesDC.create({
        name: 'Superman',
        power: 'Force'
    })

    const result = await heroesDC.findAll({
        raw: true,
        attributes: ['name']
    })

    console.log('my result', result)
}

mainPostresConnect()