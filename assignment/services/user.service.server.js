var app = require("../../express");
var userModel = require("../models/user.model.server");

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);


function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.json(status);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
    // for(var u in users) {
    //     if(users[u]._id === userId) {
    //         users[u] = user;
    //         res.send(user);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
    // user._id = (new Date()).getTime() + "";
    // users.push(user);
    // res.send(user);
}

function deleteUser(req, res) {
    var userId =  req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        });
    // for(var u in users) {
    //     if(users[u]._id === userId) {
    //         delete users[u];
    //     }
    // }
}

function getUserById(req, res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
    // for(var u in users) {
    //     if (users[u]._id === userId) {
    //         res.send(users[u]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user != null) {
                    res.json(user);
                    return;
                } else {
                    res.sendStatus(404).send(err);
                    return;
                }
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            });
        // for(var u in users) {
        //     var _user = users[u];
        //     if(_user.username === username && _user.password === password) {
        //         res.send(_user);
        //         return;
        //     }
        // }
        return;
    } else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
        // for(var u in users) {
        //     if (users[u].username === username) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
    }
    res.send("0");
}