const sf = require('slice-file')
const express = require('express');
const router = express.Router();
const Covid = require('../model/covid');
const covid = require('../helper/covid');
const fs = require('fs');
const convert = require('xml-js')
const path = require('path')
// const xmlparser = require('express-xml-bodyparser');




router.get('/', (req, res, next) => {
  res.send('<h1>api-covid</h1>');
  
});


router.post('/v1/on-covid-19', (req, res, next) => {
 let input = req.body;
    //  covid(input);
  console.log(covid(input));
    const newCovid = (covid(input));
    // console.log(input.region.avgDailyIncomeInUSD)
    // console.log(input.region.avgDailyIncomePopulation)
    let nw = new Covid(newCovid)
    nw.save()
    .then( covidResult=>{
        res.json(
            covidResult
         )
    })
    

});

router.post('/v1/on-covid-19/json', (req, res, next) => {
    let input = req.body;
       //  covid(input);
     console.log(covid(input));
       const newCovid = (covid(input));
      
       let nw = new Covid(newCovid)
       nw.save()
       .then( covidResult=>{
           res.json(
               covidResult
            )
       })
       
   
   });
router.post('/v1/on-covid-19/xml', (req, res, next) => {
   let  options = {compact: true, ignoreComment: true, spaces:4}
    let input = req.body;
    const json_xml = input;
   let xml= convert.json2xml(json_xml,options)
  //  console.log(xml)
  const newCovid = (covid(xml));


     let nw = new Covid(newCovid)
     nw.save()
.then(covidResult=>{
   console.log(covidResult);

   res.status(200).type('application/xml').send(covidResult)
})
    

});

router.get('/v1/on-covid-19/logs', (req, res, next) => {
    // const data = fs.readFileSync(( 'db/access.log'))
    const resData = [];
    const filename = sf('db/access.log')
    filename.sliceReverse().on('data',(data)=>{
      resData.push(data.toString())
    }).on('end',()=>{
    res.type('text/plain').send(resData.join(''))
          })
});







module.exports = router;
