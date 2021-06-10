const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('articles')
});


module.exports = router;