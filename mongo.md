db.users.insertOne({
    name: '李四',
    age: 11
})
db.users.insertMany([{
    name: '李一',
    age: 11
}, {
    name: '立即',
    age: 87
}])

db.users.remove({
    name: '张三'
}, {
    justOne: true
});
db.users.save({
    _id: ObjectId("5c428218f23f266d83306d72"),
    name: '王四'
});

ObjectId("5c428218f23f266d83306d72")
db.users.update({
    name: '李四'
}, {
    $set: {
        age: 100
    }
}, {
    multi: true
});
db.users.update({
    name: '朝气'
}, {
    $set: {
        age: 100
    }
}, {
    upsert: true,
    multi: true
});
db.films.insertMany(

    [{
            "rating": {
                "max": 10,
                "average": 9.6,
                "stars": "50",
                "min": 0
            },
            "genres": [
                "犯罪",
                "剧情"
            ],
            "title": "肖申克的救赎",
            "collect_count": 1612930,
            "year": "1994"
        },
        {
            "rating": {
                "max": 10,
                "average": 9.6,
                "stars": "50",
                "min": 0
            },
            "genres": [
                "剧情",
                "爱情",
                "同性"
            ],
            "title": "霸王别姬",
            "year": "1993"
        },
        {
            "rating": {
                "max": 10,
                "average": 9.4,
                "stars": "50",
                "min": 0
            },
            "genres": [
                "剧情",
                "动作",
                "犯罪"
            ],
            "title": "这个杀手不太冷",
            "year": "1994"
        },
        {
            "rating": {
                "max": 10,
                "average": 9.4,
                "stars": "50",
                "min": 0
            },
            "genres": [
                "剧情",
                "爱情"
            ],
            "title": "阿甘正传",
            "year": "1994"
        },
        {
            "rating": {
                "max": 10,
                "average": 9.5,
                "stars": "50",
                "min": 0
            },
            "genres": [
                "剧情",
                "喜剧",
                "爱情"
            ],
            "title": "美丽人生",
            "year": "1997"
        },
        {
            "rating": {
                "max": 10,
                "average": 9.3,
                "stars": "50",
                "min": 0
            },
            "genres": [
                "剧情",
                "爱情",
                "灾难"
            ],
            "title": "泰坦尼克号",
            "year": "1997"
        },
        {
            "rating": {
                "max": 10,
                "average": 9.3,
                "stars": "50",
                "min": 0
            },
            "genres": [
                "剧情",
                "动画",
                "奇幻"
            ],
            "title": "千与千寻",
            "year": "2001"
        },
        {
            "rating": {
                "max": 10,
                "average": 9.5,
                "stars": "50",
                "min": 0
            },
            "genres": [
                "剧情",
                "历史",
                "战争"
            ],
            "title": "辛德勒的名单",
            "year": "1993"
        },
        {
            "rating": {
                "max": 10,
                "average": 9.3,
                "stars": "50",
                "min": 0
            },
            "genres": [
                "剧情",
                "科幻",
                "悬疑"
            ],
            "title": "盗梦空间",
            "year": "2010"
        },
        {
            "rating": {
                "max": 10,
                "average": 9.3,
                "stars": "50",
                "min": 0
            },
            "genres": [
                "爱情",
                "科幻",
                "动画"
            ],
            "title": "机器人总动员",
            "year": "2008"
        }
    ]

)

db.films.find({
    year: {
        $lte: '2010',
        $gte: '2006'
    },
})
db.films.find({
    $or: [{
            year: {
                $gte: '2008'
            }
        },
        {
            title: "辛德勒的名单"
        }
    ]
})
db.films.find({
    title: /^机/
})
db.films.find({
    title: /空间$/
})
db.films.find({}, {
    title: 1,
})
db.films.findAndModify({
    query: {
        year: {
            $lte: '2000'
        }
    },
    update: {
        $set: {
            like: 'ok'
        }
    }
})
db.films.findAndModify({
    query: {
        title: '霸王别姬'
    },
    update: {
        $set: {
            aaa: '111'
        }
    },
    new:true,
})
db.films.findAndModify({
    query: {
        title: '霸王'
    },
    update: {
        $set: {
            bbb: '111'
        }
    },
    new:true,
    upsert:true
})
db.films.findAndModify({
    query: {
        title: '霸王'
    },
    remove:true,
})