exports.menu = {
  'button': [
    {
      'name': '分析',
      'sub_button': [
        {
          'name': '最热的',
          'type': 'click',
          'key': 'movie_hot'
        },
        {
          'name': '最冷的',
          'type': 'view',
          'url': 'http://baidu.com'
        }
      ]
    },
    {
      'name': '分类',
      'sub_button': [
        {
          'name': '拍照',
          'type': 'pic_photo_or_album',
          'key': 'pic'
        },
        {
          'name': '发送位置',
          'type': 'location_select',
          'key': 'location_select'
        },
        {
          name: '微信相册',
          type: 'pic_weixin',
          key: 'pic_weixin'
        },
        {
          name: '扫码',
          type: 'scancode_push',
          key: 'scancode_push'
        }
      ]
    },
    {
      'name': '帮助',
      'type': 'click',
      'key': 'help'
    }]
}

exports.config = {
  appId: 'wx6f588d7ba5cac142',
  appsecret: 'b979d6f620b34e18503dc6f98d5515f5',
  token: 'abcd123456'
}
