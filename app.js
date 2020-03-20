const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', (req, res) => {
    jwt.verify(req.token, 'Secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post Created...',
                authData
            });
        }
    });

});

app.post('/api/login', verifyToken, (req, res) => {
    // Mock User
    const user = {
        id: 1,
        username: 'ty',
        email: 'Ty@gmail.com'
    }
    jwt.sign({user}, 'Secretkey', (err, token) => {
        res.json({
            token
        })
    });
});

// FORMAT OFF TOKEN
//Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // next middleware
        next();
    } else {
        //Forbidden
        res.sendStatus(403);
    }
}

app.listen(5000, () => console.log('Server started on port 5000'));
 