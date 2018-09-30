const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');// ./../ để ra khỏi folder playground đến folder server
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
// const id = "bb0a398d906be175818b058"
// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid')
// };
// Todo.find({
//     _id: id
// }).then((todos)=> {
//     console.log('Todos', todos);
// });
// Todo.findOne({
//     _id: id
// }).then((todo)=> {
//     console.log('Todo', todo);
// });
//find trả về array, findOne trả về 1 object
// Todo.findById(id).then((todo)=> {
//     if (!todo) {
//         return console.log('id not found')
//         //khi id sai todo = null, dùng if để báo sai id
//     }
//     console.log('Todo by id', todo);
// }).catch((e)=> console.log(e));
User.findById("5bafa0345f88d92b60e66a92").then((user)=> {
if (!user) {return console.log('Unable to find user')};;
console.log(JSON.stringify(user, undefined, 2));
}, (e)=> {
console.log(e);
})