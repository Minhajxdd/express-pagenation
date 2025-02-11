 const express = require("express");
 const app = express();

 const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id: 4, name: 'User 4' },
    { id: 5, name: 'User 5' },
    { id: 6, name: 'User 6' },
    { id: 7, name: 'User 7' },
    { id: 8, name: 'User 8' },
    { id: 9, name: 'User 9' },
    { id: 10, name: 'User 10' },
    { id: 11, name: 'User 11' },
    { id: 12, name: 'User 12' },
    { id: 13, name: 'User 13' }
]


const posts = [
    { id: 1, name: 'Post 1' },
    { id: 2, name: 'Post 2' },
    { id: 3, name: 'Post 3' },
    { id: 4, name: 'Post 4' },
    { id: 5, name: 'Post 5' },
    { id: 6, name: 'Post 6' },
    { id: 7, name: 'Post 7' },
    { id: 8, name: 'Post 8' },
    { id: 9, name: 'Post 9' },
    { id: 10, name: 'Post 10' },
    { id: 11, name: 'Post 11' },
    { id: 12, name: 'Post 12' },
    { id: 13, name: 'Post 13' }
]



app.get('/posts', pagenatedResults(posts), (req, res) => {
    res.json(res.pagenatedResults);
});

app.get('/users', pagenatedResults(users), (req, res) => {
    res.json(res.pagenatedResults);

});


function pagenatedResults(model){
    return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {}

    results.results = model.slice(startIndex, endIndex);

    if(endIndex < model.length){
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    if(startIndex > 0 ){
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }

    res.pagenatedResults = results;
    next();

    }
}


 app.listen(8080, () => console.log(`Server started at port 8080`));