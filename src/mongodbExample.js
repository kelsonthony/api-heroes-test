// define the connection
const Mongoose = require("mongoose");
    Mongoose.connect(
    "mongodb://herouser:passwordwordheroes@192.168.1.19:27017/heroesdb",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        function(error) {
        if (!error) return;
        console.log("Connection to MongoDB fail", error);
        },
    }
    );

    const connection = Mongoose.connection

    connection.once('open', () => console.log('Mongo DB is Running') )

//define the schema
const HeroSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    power: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

// define the model
const model = Mongoose.model('heroes', HeroSchema)

async function main() {
    const resultCreate = await model.create({
        name: 'Spider man',
        power: 'Web'
    })
    console.log('Result create', resultCreate)

    const listItens = await model.find()

    console.log('List Items', listItens)
}

main()
