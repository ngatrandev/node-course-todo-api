const mongoose = require('mongoose');
const User = mongoose.model('User', {
    // User sẽ chạy vào users collection.
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 1
    }
});

// const user = new User({
// email: 'myemail@gmail.com'
// });

// user.save().then((doc)=> {
// console.log('Save user', doc);
// }, (err) => {
//     console.log('Unable to save user', err);
// })

module.exports = {User};