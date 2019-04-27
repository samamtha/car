const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

let dirname = path.join(__dirname,'data.txt')

app.get('/:car', (req, res) => {
    let car = req.params.car;
    if(car == 'find'){
        fs.readFile(dirname, (err, data) => {
            if(err){
                console.log(err);
                res.header({'Access-Control-Allow-Origin':'*'});
                 return res.send('获取车位信息失败!');
            }else{
                //console.log(data.toString());
                res.header({'Access-Control-Allow-Origin':'*'});
                return res.send(data.toString());
            }
        });


    }else if(/^0[01]1[01]$/.test(car)){
        fs.writeFile(dirname,car,(err)=>{
            if(err){
                console.log('数据保存失败');
            }else{
                console.log('数据保存成功');
            }
        })
        res.header({'Access-Control-Allow-Origin':'*'});
        res.send('got it!');
    }else{
        res.header({'Access-Control-Allow-Origin':'*'});
        res.send('参数错误');
    }

});

app.use(express.static('public'));
app.listen(7000,'0.0.0.0',()=>console.log('开始监听'));