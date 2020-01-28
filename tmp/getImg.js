var request = require('request');
const getImage = (url)=> {
    const chunks = [];
    return new Promise((ok, rej) => {
        request(url, (err, message, response) => {
            if (err) {
                rej(err)
            } else {
                let data = Buffer.concat(chunks).toString('base64');
                data = `data:${'image/jpeg'};base64,`+data;
                ok(data);
            }
            // console.log(response);

        })
            .on('data', function (chunk) {
                chunks.push(chunk);
            }).on('end', () =>{
            console.log('end!!!!!!!!!!!')
    //        console.log(chunks)
            //   let data = `data:${'image/jpeg'};base64,`+chunks.toString('base64');
            //ok(chunks);
        })
            .on('response', function (response) {

            });
    })
}
    getImage('https://deniz.sqrmenu.com/storage/banners/xp2c9Ac7WYsLB9ejAhKSmkWLK6s1K993as7XWMfy.jpeg').then(d=>{
        console.log(d)
    }).catch(e=>{
        console.log(e);
    })
