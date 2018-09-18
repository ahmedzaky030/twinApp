var router = require('express').Router();

router.get('/' , (req, res) => {
    res.json({'message': 'hello from Student router'});
})


module.exports = router;