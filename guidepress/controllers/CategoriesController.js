const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('categories')
});


module.exports = router;