const Mongoconnection = require('../database/monodb');
const User = require('../models/usermodel').UserModel;
const Task = require('../models/tasks').Task;

exports.getLoginpage = (req, res, next) => {
    res.render('login', {
        title: 'LogIn'
    });
};

exports.getSignuppage = (req, res, next) => {
    res.render('signup', {
        title: 'SignUp',
        message: ''
    });
};

exports.postLoginpage = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
        email: email,
        password: password
    })
        .then((doc) => {
            req.session.isAuth=true;
            res.redirect('/dashboard/' + doc._id);
        })
        .catch((err) => {
            console.log(err);
        })

};

exports.postSignuppage = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = new User({
        email: email,
        password: password
    }).save()
        .then((doc) => {
            const task = new Task({
                _id: doc._id,
                tasks: []
            }).save()
                .then((doc) => {
                    console.log(doc);
                })
                .catch((err) => {
                    console.log(err);
                })
            res.redirect('/login');
        })
        .catch((err) => {
            res.redirect('/signup');
        })
};

exports.getDashboard = (req, res, next) => {
    const id= req.params.id;
    User.findOne({ _id: id })
        .then((doc) => {
            Task.findOne({_id:doc._id})
                .then((taskdoc) => {
                    res.render('dashboard', {
                        title: 'DashBoard',
                        hasTasks:taskdoc.tasks,
                        id:taskdoc._id
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
};

exports.getLogout=(req,res,next)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    })
}

exports.postDashboard=(req,res,next)=>{
    Task.updateOne({_id:req.params.id},{$push:{tasks:[req.body.task]}})
    .then((doc)=>{
        console.log("sucessfully updated")
        res.redirect('/dashboard/'+req.params.id);
    })
    .catch((err)=>{
        console.log(err);
    });
}