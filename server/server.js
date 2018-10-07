require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json())// đây là middleware có bodyParser.json để chuyển các request thành json.
app.post('/todos', authenticate, (req, res)=> {
const todo = new Todo ({
    text: req.body.text,
    _creator: req.user._id//để lấy id của user
});
todo.save().then((doc)=> {
    res.send(doc);
}, (e) => {
    res.status(400).send(e);
})
})
app.get('/todos',authenticate, (req, res)=> {
    Todo.find({
        _creator: req.user._id
    }).then((todos)=> {
        res.send({todos});
    }, (err)=> {
        res.status(400).send(err);
    })
})
//các method liên quan todos/:id thường chạy qua authenticate
//để test phải đúng cả id của todo và _creator(id của user) mới chạy
// khi send từ postman phải nhập id từ url và x-auth từ header.
app.get('/todos/:id', authenticate, (req, res)=> {
const id = req.params.id;
if (!ObjectID.isValid(id)) {
    return res.status(404).send();//send() empty send back
};
Todo.findOne({
    _id: id,
    _creator: req.user._id
}).then((todo)=> {
if (!todo) {
    return res.status(404).send();
}
res.send({todo});
}).catch((e)=> {
    res.status(404).send()
})

})
app.delete('/todos/:id', authenticate, (req, res)=> {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo)=> {
        if(!todo) {
            return res.status(400).send();
        }
        res.send({todo});

    }).catch((e)=> {
        res.status(400).send();
    })
})
app.patch('/todos/:id', authenticate, (req, res)=> {
    const id = req.params.id;
    //Creates an object composed of the picked object properties.
    const body = _.pick(req.body, ['text', 'complete']);
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    };
    if(_.isBoolean(body.complete) && body.complete) {
        body.completeAt = new Date().getTime();
    //để khi update complete = true thì completeAt sẽ chạy getTime
    } else {
        body.complete = false;
        body.completeAt = null;
    }
    Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo)=> {
       if(!todo) {
           return res.status(404).send();
       } 
       res.send({todo})
    }).catch((e) => {
        res.status(400).send();
    })
});
app.post('/users', (req, res)=> {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User (body);
    user.save().then(()=> {
     return user.generateAuthToken();
    }).then((token)=> {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.get('/users/me', authenticate, (req, res)=> {
    res.send(req.user);
});

app.post('/users/login', (req, res)=> {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredential(body.email, body.password).then((user)=> {
      return user.generateAuthToken().then((token)=> {
          res.header('x-auth', token).send(user);//trả về header là x-auth và trả về body là user
        //do generateAuthToken cuối cùng trả về token nên viết then((token))
      })
    }).catch((e)=> {
        res.status(400).send();
    })
})

app.delete('/users/me/token', authenticate, (req, res)=> {
    req.user.removeToken(req.token).then(()=> {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
})
app.listen(port, ()=> {
  console.log(`Started up at port ${port}`); 
});

module.exports = {app};





