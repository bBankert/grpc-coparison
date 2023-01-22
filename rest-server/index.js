const express = require('express');
const restApi = express();

restApi.use(express.json())

//prevent cache for fair tests
restApi.use((req,res,next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
})

restApi.get('/ping',(req,res) => {
    res
    .status(200)
    .json({ status: 'healthy' })
});

restApi.post('/data',(req,res) => {
    console.log('Rest request',req.body);
    res.status(200);
});


restApi.get('/test-data/1',(req,res) => {
    res
    .status(200)
    .json({
        name: 'tom',
        job: 'office worker',
        favoriteFood: 'pizza'
    })
})


restApi.listen(3001,() => {
    console.log('Listening on port 3001');
});