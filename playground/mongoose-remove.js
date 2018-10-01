const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');// ./../ để ra khỏi folder playground đến folder server
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
Todo.remove({}).then((result)=> {
    console.log(result);
});