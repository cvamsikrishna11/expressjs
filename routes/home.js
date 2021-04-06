const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.pug', { 'title': 'my express app', 'message': 'hello this is vamsi' })
});

module.exports = router;