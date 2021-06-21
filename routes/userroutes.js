const express = require('express');
const isAuth=require('../controllers/isAuth').isAuth;

const Routes = express.Router();

const userController = require('../controllers/usercontroller');

Routes.get('/login', userController.getLoginpage);

Routes.get('/signup', userController.getSignuppage);

Routes.post('/login',userController.postLoginpage);

Routes.post('/signup',userController.postSignuppage);

Routes.get('/dashboard/:id',isAuth,userController.getDashboard);

Routes.get('/logout',userController.getLogout);

Routes.post('/dashboard/:id',isAuth,userController.postDashboard);

module.exports = Routes;