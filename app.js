const express = require('express');
const session=require('express-session');
const MongodbSession=require('connect-mongodb-session')(session);

const URI='mongodb+srv://swaroop:Swaroop@123@cluster0.jndjv.mongodb.net/ToDoList?retryWrites=true&w=majority';

const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/userroutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store=new MongodbSession({
    uri:URI,
    collection:'mysession'
});

app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret:'my secret code',
    resave:false,
    saveUninitialized:false,
    store:store
}))

app.use(userRoutes);

app.use('/', (req, res, next) => {
    res.redirect('/login');
})

app.listen(3000, (res, err) => {
    if (err) {
        console.log('err');
    }
    console.log('connected on port 3000');
});

