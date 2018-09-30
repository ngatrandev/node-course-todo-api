const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
app.use(bodyParser.json())// đây là middleware có bodyParser.json để chuyển các request thành json.
app.post('/todos', (req, res)=> {
const todo = new Todo ({
    text: req.body.text
});
todo.save().then((doc)=> {
    res.send(doc);
}, (e) => {
    res.status(400).send(e);
})
})
app.get('/todos', (req, res)=> {
    Todo.find().then((todos)=> {
        res.send({todos});
    }, (err)=> {
        res.status(400).send(err);
    })
})
app.get('/todos/:id', (req, res)=> {
const id = req.params.id;
if (!ObjectID.isValid(id)) {
    return res.status(404).send();//send() empty send back
};
Todo.findById(id).then((todo)=> {
if (!todo) {
    return res.status(404).send();
}
res.send({todo});
}).catch((e)=> {
    res.status(404).send()
})

})

app.listen(8080, ()=> {
  console.log('Started on port 8080'); 
});

module.exports = {app};





