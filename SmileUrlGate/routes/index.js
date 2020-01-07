var express = require('express');
var router = express.Router();
const urlSchema = require('../model/urlModel');
var createError = require('http-errors');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.params.id+"gg");
  res.render('index');
});

router.get('/:shortUrl',(req,res,next)=>{
    urlSchema.findOne({'shortUrl':req.params.shortUrl})
    .then(data=>{
      if(data){
      res.redirect('http://'+data.longUrl);
    }else{
      next(createError(404));
    }
    });
})

module.exports = router;
