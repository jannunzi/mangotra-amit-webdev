console.log("Hello from the other side");

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/webdev_summer2_2017');

var userSchema = mongoose.Schema({
    username: String,
    first:    String,
    last:     String,

}, {collection: "user"});

var userModel = mongoose.model("UserModel", userSchema);

function createUser(user) {
    userModel.create(user, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
        }
    });
}

function findUserByUsername(user) {
    return userModel.findOne({username: user});
}

function findUserById(id) {
    return userModel.findById(id);
}

function updateUser(userId, newUserValues) {
    return userModel.update({_id: userId}, {
        $set: newUserValues
    });
}

function removeUser(id) {
    return userModel.remove({_id: id});
}


// removeUser("598aa1d5a466b128cafcfbe0")
//     .then(function (status) {
//         console.log(status);
//     });

// updateUser("598aa04b75a4a5289582af6e", {first: "Bob", last: "Marley"})
//     .then(function (status) {
//         console.log(status);
//     });

// findUserById("598a9f6e5567002879f95ed9")
//     .then(function (user) {
//         console.log(user);
//     });

// findUserByUsername("alice")
//     .then(function (user) {
//         console.log(user);
//     });

// function findAllUsers() {
//     return userModel.find();
// }

// createUser({username: 'bob'});


