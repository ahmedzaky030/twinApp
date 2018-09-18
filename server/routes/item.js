var router = require('express').Router();

router.get('/' , (req, res) => {
    res.json({'message': 'hello from Item router'});
})


module.exports = router;