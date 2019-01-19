const fs = require('fs');
const path = require('path');
const qs = require('querystring');

// 引入mongodb 的模块
const MongoClient = require('mongodb').MongoClient;
// 定义连接数据库的地址；
const url = 'mongodb://localhost:27017';

module.exports = {
    // 原本是login:function(){};可写为login(){};
    login(req, res) {
        var data = fs.readFileSync(path.resolve(__dirname, '../view/login.html'));
        res.writeHead(200, {
            'Content-type': 'text/html;charset=utf-8',
        });
        res.write(data);
        res.end();
    },

    register(req, res) {
        var data = fs.readFileSync(path.resolve(__dirname, '../view/register.html'));
        res.writeHead(200, {
            'Content-type': 'text/html;charset=utf-8',
        });
        res.write(data);
        res.end();

    },

    home(req, res) {
        res.writeHead(200, {
            'Content-type': 'text/html;charset=utf-8',
        });
        res.write('<h1>home</h1>');
        res.end();
    },

    //注册时表单获取的信息，还有req,res不能写反，否则 下面写的req,res的方法和属性将失效。
    registerFn(req,res){
        // 1.得到页面传递过来的用户名与密码。
        // form表单post方式传递过来的数据流可用querystring模块的qs.parse(x)转换成对象{name:xxx,pwd:xxx}。
        var rawData = '';
        req.on('data',(chunk)=>{
            rawData += chunk;
            console.log(rawData);
        });
        req.on('end',()=>{
            var params = qs.parse(rawData);
            console.log(params);
            // 2.将获得的用户名和密码params  {name:xxx,pwd:xxx}写入数据库
            // 2.1 连接数据库,第二个参数可不设，但是终端会报错，但不影响程序。
            MongoClient.connect(url,{useNewUrlParser:true},(error,client)=>{
                // client 数据库的连接对象,{}里面有方法和属性
                if(error){
                    console.log('连接数据库失败');
                }else{
                    console.log('连接数据库成功');
                    // 2.2 选择数据库
                    var db = client.db('1811');
                    // 2.3 使用 db 去操作
                    db.collection('users').insertOne({
                        name:params.userName,
                        pwd:params.pwd
                    },(err)=>{
                        if (err) {
                            console.log("注册失败");
                        } else {
                            console.log("注册成功");
                            // 3.记得在操作完成之后，将数据库关闭。
                            client.close();
                            // 关闭请求
                            res.end();
                        }
                    });
                }
            });
        });
        
    },
    loginFn(req,res){
        res.writeHead(200,{
            'Content-type':'text/html;charset=utf-8',
        })
        var rawData = "";
        req.on('data',(chunk)=>{
            rawData += chunk;
        });

        req.on('end',(chunk)=>{
            var params = qs.parse(rawData);

            MongoClient.connect(url,{useNewUrlParser:true},(err,client)=>{
                if (err) {
                    console.log("数据库连接失败");
                    res.write("数据库连接失败");
                } else {
                    console.log("数据库连接成功");
                    res.write("数据库连接成功");
                    var db = client.db('1811');
                    // 可转换成数组
                    /* db.collection('users').find({
                        name:params.userName,
                        pwd:params.pwd,
                    }).toArray(); */

                    // count()里面加function(){}回调函数，两个参数err，错误信息，num，返回结果。
                    db.collection('users').find({
                        name:params.userName,
                        pwd:params.pwd,
                    }).count(function (err,num) {
                        if (err) {
                            console.log('查询失败')
                        } else {
                            console.log('查询成功');
                            // 判断查找到的记录条数
                            if (num >= 1) {
                                console.log('登录成功');
                                res.write('登录成功');
                            } else {
                                console.log('登录失败');
                                res.write('登录失败');
                            }
                        }
                        // 关闭请求和关闭数据库要放在所有事情都做完之后。即上面if{}else{}语句结束的后面。
                        client.close();
                        res.end();
                    });
                }
            });
        });
    }
};