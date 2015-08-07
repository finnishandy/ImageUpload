/**
 * Created by sakariruoho on 7/31/15.
 */
var express = require('express');
var router = express.Router();

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/:id',function(req,res){
    res.sendfile(appRoot + "/uploads/" + req.params.id);
});

module.exports = router;
