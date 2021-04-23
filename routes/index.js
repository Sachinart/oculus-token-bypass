var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');
const fakeUa = require('fake-useragent');


/* GET users listing. */
router.get('/', function(req, res, next) {

    let url     = "https://auth.oculus.com/login";

        if(url){
           
            axios.get(url,{headers: {
                    "User-Agent" : fakeUa(),
                    "Host" : "auth.oculus.com",
                    "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",


                }
                }).then((resp) => {

                const results = [];

                const $ = cheerio.load(resp.data);
                console.log(
                    $('body._9l9u').children('div.li')
                .children('.chevronDown').eq(2).html()
                );
                //console.log($("._9d5j").html());
                var url   = $('body._9l9u').html(); //.children('div').eq(0).children('').attr('href');
                var about = url.search('ABOUT');
                var parameter = url.substr(about + 415, 147 );

                //results.push({temp});
                res.send(parameter);

            }).catch((err) => {
                console.log(err);
                res.send([]);
            });
            
        } else {
            res.send('Path is missing in parameter');
        }
});

module.exports = router;