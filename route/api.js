const sf = require('slice-file')
const express = require('express');
const router = express.Router();
const covid = require('../helper/covid');
const fs = require('fs');
const convert = require('xml-js')
const path = require('path')

router.get('/', (req, res, next) => {
  res.send('<h1>api-covid</h1>');
  
});


router.post('/v1/on-covid-19', (req, res, next) => {
  let input = req.body;
       //  covid(input);
     console.log(covid(input));
       const newCovid = (covid(input));
     res.status(200).json(newCovid)
       

});

router.post('/v1/on-covid-19/json', (req, res, next) => {
    let input = req.body;
       //  covid(input);
     console.log(covid(input));
       const newCovid = (covid(input));
     res.status(200).json(newCovid)
       
   
   });
router.post('/v1/on-covid-19/xml', (req, res, next) => {
   let  options = {compact: true, ignoreComment: true, spaces:4}
   let input = req.body;
   const newCovid = (covid(input));
   let xml= convert.json2xml(newCovid,options)  
   res.status(200).type('application/xml').send(xml);

});

router.get('/v1/on-covid-19/logs', (req, res, next) => {
    const resData = [];
    const filename = sf('db/access.log')
    filename.sliceReverse().on('data',(data)=>{
      resData.push(data.toString())
    }).on('end',()=>{
    res.type('text/plain').send(resData.join(''))
          })
});







module.exports = router;
