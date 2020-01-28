const fetch = require("isomorphic-fetch");
var request = require('request');
const fileType = require('file-type');
const https = require("https");

const host = window.location.hostname;
const port = (window.location.port!=="")?`:${window.location.port}/`:'/';
const protocol = window.location.protocol;
const _url = window._url||`${protocol}//${host}${port}`;

function submit(path,data={},_method='GET') {
    let agent = new https.Agent({rejectUnauthorized: false});

    let options = {
        method:(_method!=='GET')?'POST':'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };

    if(_method!=='GET'){
        options.body = JSON.stringify({...data,_method});
    }
    const url = path.includes('http')?path:_url+path;

    if(url.includes('https')){
        options.agent=agent;
    }

    return fetch(url,options).then(d=>d.json());
}

function getAsset(path) {
    let agent = new https.Agent({rejectUnauthorized: false});

    let options = {
        method:'GET',
       /* headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },*/
    };

    const url = path.includes('http')?path:_url+path;
    if(url.includes('https')){
        options.agent=agent;
    }

    return fetch(url,options).then(d=>d.body());
}

const getImage = (url)=>{
    const chunks=[];
    return new Promise((ok,rej)=>{
        request(url,  (err, message, response)=> {
           if(err){
               rej(err)
           }else{
               let data = Buffer.concat(chunks).toString('base64');
               data = `data:${'image/jpeg'};base64,`+data;
               ok(data);
             //  let type = fileType(response);

           }
            // console.log(response);

        })
            .on('data', function (chunk) {
                chunks.push(chunk);
            }) .on('end', function (chunk) {
       //         console.log('end!!!!!!!!!!!')
               /* let data = `data:${'image/jpeg'};base64,`+chunks.toString('base64');
                ok(data);*/
            })
            .on('response', function (response) {

            });
    })

   /* let options = {method:'GET'};
    let agent = new https.Agent({rejectUnauthorized: false});
    if(url.includes('https')){
        options.agent=agent;
    }
    return fetch(url).then(res => {
       // console.log(res);
        res.body.pipe(process.stdout);
        const chunks=[];
        /!*res.body.on('data', chunk => {
            chunks.push(chunk);
            // Got a chunked buffer
        }).on('end', () => {
            // end of stream
            console.log(chunks);
            Promise.resolve(chunks)
        })*!/
      //  return res.buffer();
        return Promise.resolve('oj')
    }).then(buf => {
        let type = fileType(buf);
        let data = `data:${type.mime};base64,`+buf.toString('base64');
        return data;
    })*/
};


module.exports = {
    getAsset,
    submit,
    getImage,
    _url

}
