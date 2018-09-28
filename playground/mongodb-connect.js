// const MongoClient = require('mongodb').MongoClient;   dùng destructor trong ES6 như bên dưới
const {MongoClient} = require('mongodb');

MongoClient.connect(`mongodb://localhost:27017/TodoApp`, {useNewUrlParser: true}, (err, client)=> {
    if (err) {
        return console.log(`Unable to connect to MongoDB server`);
        // thay vì viết if else có thể viết if return.
        // Nếu có error và chạy vào return thì code sẽ dừng không chạy phần còn lại.
    }
    console.log(`Connected to MongoDB server`);
    const db = client.db('TodoApp');
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     complete: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log(`Unable to insert todo`, err);
    //     }
    //     console.log (JSON. stringify(result.ops, undefined, 2));
    // })
    db.collection('Users').insertOne({
        name: "ngatran",
        age: 27,
        location: "Viet Nam"
    }, (err, result) => {
        if (err) {
            return console.log(`Unable to insert Users`, err);
        }
        console.log(result.ops);
    })
    client.close();
})
