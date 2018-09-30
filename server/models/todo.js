const mongoose = require('mongoose');
const Todo = mongoose.model('Todo', {
    //mongoose.model tương tự constructor trong class.
    // Todo sẽ chạy vào todos trong collection
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true   
    } ,
    complete: {
        type: Boolean,
        default: false
    },
    completeAt: {
        type: Number,
        default: null
    }

});
module.exports = {Todo};
// const newTodo = new Todo ({
//     text: 'Cook dinner'
// });
// //newTodo sẽ chạy theo model của Todo
// newTodo.save().then((doc) => {
//     console.log('Save todo', doc);
// }, (err)=> {
//     console.log('Unable to save todo');
// });

// const otherTodo = new Todo({
//     text: '     Edit this video       ',
//     // complete: true,
//     // completeAt: 123
// });

// otherTodo.save().then((doc) => {
//     console.log('Save otherTodo', doc);
// }, (err) => {
//     console.log('Unable to save otherTodo', err);
// });