var router = require('express').Router();

router.get('/' , (req, res) => {
    res.json({'message': 'hello from ext order router'});
})


module.exports = router;