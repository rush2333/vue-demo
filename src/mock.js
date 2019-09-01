import Mock from 'mockjs';


var Random = Mock.Random;
var mock = Mock.mock;


function getQueryVariable(url, variable) {
    var query = url.substring(url.indexOf('?') + 1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
Mock.mock('http://rush2333.com/api/image',
    {
        'list|4': [{
            'id|+1': 1,
            'image_url': Random.image('300x150', '#50B347', '#FFF', 'Mock.js')
        }]

    }
)

Mock.mock(/http:\/\/rush2333.com\/api\/getnewslist/, {
    'data|6-15': [{
        'id|+1': 1,
        'title|': '@ctitle(8,13)',
        'add_time': '@datetime',
        'summary': '@cparagraph(2,4)',
        'click|1-500': 300,
        'img_url': Random.image('100x80', '#894FC4', '#FFF', 'png', 'Fake data')

    }]
}
)

Mock.mock('http://rush2333.com/api/getNew',
    {
        data: [{
            'id|1-599': 1,
            'title|': '@ctitle(9,18)',
            'add_time': '@datetime',
            'click|1-500': 100,
            'content': '@cparagraph(13,30)'

        }]
    })

Mock.mock(/http:\/\/rush2333.com\/api\/getCategoryList/,
    {
        'data|4-9': [{
            'id|1-300': 1,
            'title': '@ctitle(4)'
        }]

    })

Mock.mock(/http:\/\/rush2333.com\/api\/getImages/, {
    'data|0-4': [{
        'id|1-10000': 20,
        'title': '@csentence(2,3)',
        'summary': '@cparagraph(2,3)',
        'img_url': Random.image('400x200', '#894FC4', '#FFF', 'png', 'Fake Img')
    }]
})
Mock.mock(/http:\/\/rush2333.com\/api\/getImageInfo/, 'get', function (options) {
    let url = options.url;
    let id = getQueryVariable(url, 'id');
    return {
        data: [{
            'id': id,
            'title': mock('@ctitle(9,18)'),
            'add_time': mock('@datetime'),
            'content': mock('@cparagraph(13,30)'),
            'click': Random.natural(1, 800),
        }]
    }
})
Mock.mock(/http:\/\/rush2333.com\/api\/getThumImages/, {
    'data|5': [{
        'msrc': Random.image('80x80', '#894FC4', '#FFF', 'png', 'Fake Img'),
        'src': Random.image('320x200', '#894FC4', '#FFF', 'png', 'Fake Img'),
        'w': 600,
        'h': 600

    }]
})


Mock.mock(/http:\/\/rush2333.com\/api\/getComment/, function (options) {
    return Mock.mock({
        'data|10': [{
            'add_time': '@datetime',
            'content': '@cparagraph(1)',
            'user_name': '@cword(2,3)'
        }]
    })

})

Mock.mock(/http:\/\/rush2333.com\/api\/postComment/, 'post', (config) => {
    console.log(config);
    let { body } = config;
    body = JSON.parse(body);
    console.log(body);
    if (body.content) {
        return ({
            code: '200',
            msg: '上传成功'
        })
    }
}
)
Mock.mock(/http:\/\/rush2333.com\/api\/getGoodsList/, 'get', function (options) {
    let url = options.url;
    let pageIndex = getQueryVariable(url, 'pageIndex');
    console.log(pageIndex)
    if (pageIndex <= 3) {
        return Mock.mock(
            {
                'message|10': [{
                    'id|1-300': 1,
                    'title': '@ctitle(6,13)',
                    'zhaiyao': '@cparagraph(2,3)',
                    'img_url': Random.image('200x200', '#894FC4', '#FFF', 'png', 'Fake Img'),
                    'sell_price|1-800': 699,
                    'market_price|800-1000': 800,
                    'stock_quantity|1-99': 1,
                }]

            }
        )
    } else {
        return Mock.mock(
            {
                'message|1-8': [{
                    'id|1-300': 1,
                    'title': '@ctitle(6,13)',
                    'zhaiyao': '@cparagraph(2,3)',
                    'img_url': Random.image('200x200', '#894FC4', '#FFF', 'png', 'Fake Img'),
                    'sell_price|1-800': 699,
                    'market_price|800-1000': 800,
                    'stock_quantity|1-99': 1,
                }]

            }
        )
    }
}
)