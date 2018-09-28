// const MongoClient = require('mongodb').MongoClient;   dùng destructor trong ES6 như bên dưới
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect(`mongodb://localhost:27017/TodoApp`, {useNewUrlParser: true}, (err, client)=> {
    if (err) {
        return console.log(`Unable to connect to MongoDB server`);
    }
    console.log(`Connected to MongoDB server`);
    const db = client.db('TodoApp');
//    db.collection('Todos').findOneAndUpdate({
//        _id: new ObjectID ("5badf4b251a09845d4170f72")}, {
//     //docs.mongodb.com/manual/reference/operator/update/ để xem update operator
//       $set: {complete: false}
//     }).then((result)=> {
//         console.log(result);
//     })
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5bab440ba4e42a1f4c9bd999")
        //taị sao phải dùng new ObjectID?
    }, {
       $set: {name: "NGA"},
       $inc: {age: 1}
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    })
})
