const Mongoose = require('mongoose')

const { Schema } = Mongoose
Mongoose.Promise = global.Promise

const HeroSchema = new Schema({
    nameHero: {
        type: String
        
    },
    power: {
        type: String
        
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = Mongoose.model('heroesModel', HeroSchema)
