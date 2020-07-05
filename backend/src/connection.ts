import mongoose from 'mongoose';

//Mongodb native driver approach
// let mongoClient = mongo.MongoClient;
// const teste = () => {
//     mongoClient.connect('mongodb://localhost:27017', options, function (err, client) {
//         assert.equal(null, err);
//         const db = client.db('todoApp');
//         db.collection('tasks').find().toArray(function (err, docs) {
//             assert.equal(err, null);
//             console.log('Connected successfully to server');
//             console.log(docs);
//             client.close();
//         });
//     })
// };

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 5000
};

const url = <string>process.env.DB_URL;

//Mongoose ORM approach
try {
    mongoose.connect(url, options);
} catch (error) {
    console.log(error);
}

const connectionDb = mongoose.connection;

connectionDb.on('connected', function () {
    console.log('Connected to mongo server.');
});

connectionDb.on('error', function (err) {
    console.log(err);
});

export default connectionDb;