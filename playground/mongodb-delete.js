// const MongoClient = require('mongodb').MongoClient;   dùng destructor trong ES6 như bên dưới
const {MongoClient} = require('mongodb');

MongoClient.connect(`mongodb://localhost:27017/TodoApp`, {useNewUrlParser: true}, (err, client)=> {
    if (err) {
        return console.log(`Unable to connect to MongoDB server`);
    }
    console.log(`Connected to MongoDB server`);
    const db = client.db('TodoApp');
    // db.collection('Todos').deleteMany({text: 'Something to do'}).then((result)=> {
    //     console.log(result);
    // })

    // db.collection('Todos').deleteOne({text: 'Something to do'}).then((result)=> {
    //     console.log(result);
    // })

    db.collection('Todos').findOneAndDelete({complete: false}).then((result)=> {
        //nên dùng findOneAndDelete vì result dễ đọc
        console.log(result);
    })
})
