var router = require('express').Router();

router.get('/' , (req, res) => {
    res.json({'message': 'hello from Technician router'});
})


module.exports = router;