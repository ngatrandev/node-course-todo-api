const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 1, 
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not a valid email`
        }
    },
    password : {
        type: String,
        require: true,
        minlength: 6,
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
}

);
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']) 
};
UserSchema.methods.generateAuthToken = function () {
    //dùng UserSchema.methods. để tạo instance method.
var user = this;
var access = 'auth';
var token = jwt.sign({_id: user._id.toHexString(), access}, "mysecret").toString();
//Phần mysecret là string bất kì đc add vào để tăng bảo mật hoặc xác thực
user.tokens.push({access, token});
return user.save().then(()=> {
    return token;
});
};
UserSchema.statics.findByToken = function (token) {
    //dùng UserSchema.statics để tạo model method
    var User = this;
    var decoded;
    try { 
        decoded = jwt.verify(token, 'mysecret');
        //verify dùng để xác thực data, sẽ báo lỗi nếu data bị thay đổi.
    } catch (e) {
        return Promise.reject();
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,//khi dẫn đến các property bên trong phải để trong quote. nested doc query
        'tokens.access': 'auth'

    })
}
const User = mongoose.model('User', UserSchema);  // User sẽ chạy vào users collection.

// const user = new User({
// email: 'myemail@gmail.com'
// });

// user.save().then((doc)=> {
// console.log('Save user', doc);
// }, (err) => {
//     console.log('Unable to save user', err);
// })

module.exports = {User};