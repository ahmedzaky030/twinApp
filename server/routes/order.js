var router = require('express').Router();

router.get('/' , (req, res) => {
    res.json({'message': 'hello from Order router'});
})


module.exports = router;