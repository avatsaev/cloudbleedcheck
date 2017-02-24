const express = require('express');
const router = express.Router();
const domainsDB = require('../domains_db');
const xss = require('xss');

router.get('/', (req, res, next) => {

  let domain = xss(req.query['domain']);

  domain = domain.replace(/.*?:\/\//g, "").replace("www.","").toLowerCase();

  if(domain){

    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      domain,
      affected: domainsDB.indexOf(domain) != -1
    }));

  }else{

    res.status(422);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      error: "domain param required"
    }));

  }


});

module.exports = router;
