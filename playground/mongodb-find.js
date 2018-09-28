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
    
    // db.collection('Todos').find({complete: true}).toArray().then((docs)=> {
    //     //Trong find() có thể có điều kiện, nếu không sẽ tìm hết các obj
    //     console.log(`Todos`);
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log(`Unable to fetch todos`, err);
    // })


    // db.collection('Todos').find({complete: false}).count().then((count)=> {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log(`Unable to fetch todos`, err);
    // })

    db.collection('Users').find({name: 'ngatran'}).toArray().then((docs)=> {
        console.log(JSON.stringify(docs, undefined, 2));
    })
    //client.close();
})
