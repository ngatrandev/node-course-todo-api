var mongoose = require('mongoose');// dùng const bị lỗi do bên file server đã dùng const
mongoose.Promise = global.Promise; //?
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true })

module.exports = {
    mongoose
};