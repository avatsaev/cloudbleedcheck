const express = require('express');
const router = express.Router();
const domainsDB = require('../domains_db');
const xss = require('xss');



router.get('/', (req, res, next) => {

  let domain = xss(req.query['domain']);

  domain = domain.replace(/.*?:\/\//g, "").replace("www.","").replace(/\/$/, "").toLowerCase();

  if(domain){

    let affected_domains = [];
    if(domainsDB.indexOf(domain) != -1){
      affected_domains.push(domain); // distinct result
    } else {
      for(let i = 0; i < domainsDB.length; i++){
        let line = domainsDB[i];
        if(line.indexOf(domain) >= 0){
          affected_domains.push(line);
        }
      }
    }

    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      domain,
      affected: affected_domains
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
