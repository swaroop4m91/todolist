const mongo = require('mongoose');

const URL ='mongodb+srv://swaroop:Swaroop@123@cluster0.jndjv.mongodb.net/ToDoList?retryWrites=true&w=majority';

exports.mongoclient = mongo.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
    .then((response) => {
        console.log("connected");
    })
    .catch((err) => {
        console.log(err);
    });
