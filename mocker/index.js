const proxy = {
  'GET /api/user': {
    id: 1,
    username: 'kenny',
    sex: 6
  },
  'GET /api/user/list': [
    {
      id: 1,
      username: 'kenny',
      sex: 6
    }, {
      id: 2,
      username: 'kenny',
      sex: 6
    }
  ],
  'GET /api/:owner/:repo/raw/:ref/(.*)': (req, res) => {
    const { owner, repo, ref } = req.params;
    return res.json({
      id: 1,
      owner, repo, ref,
      path: req.params[0]
    });
  },
  // 产品列表
  'GET /api/product/list': (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    let data = [];
    for (i = 1; i < (1 * page + limit); i++) {
      data.push({
        key: i,
        name: "这是一个测试产品",
        category: "博客",
        type: "模板",
        lastDate: "2015-12-12 12:12:12",
      });
    }
    return res.json({
      success: true,
      total: 50,
      page: page,
      limit: limit,
      data: data,
    });
  },
  // ddns列表
  'GET /api/ddns/index': (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    let data = [];
    for (i = 1; i < (1 * page + limit); i++) {
      data.push({
        key: i,
        name: "aaa.ddns.net",
        type: "A",
        levelID: 3,
        ttl: 600,
        package: "免费版",
        lastDate: "2015-12-12 12:12:12",
      });
    }
    return res.json({
      success: true,
      total: 50,
      page: page,
      limit: limit,
      data: data,
    });
  },
    //新增OR修改ddns记录
    'POST /api/ddns/record/update': (req, res) => {
      const { type, title, content } = req.body;
      console.log(req.body);
      return res.json({
        success: true,
        code: 200,
        message: "添加成功",
        data: {
          sn: '20190101',
        }
      });
    },
 // ddns检查域名可用
  'GET /api/ddns/domain/validate': (req, res) => {
    const { hostname = '', domain ='' } = req.query;
    let data = {
      isUse: false
    };
    if (hostname == 'test') {
      data.isUse = true;
    }
  
    return res.json({
      success: true,
      data: data,
    });
  }, 
  //综合记录列表
  'GET /api/ddns/record/synthesize': (req, res) => {
    const { domain ='' } = req.query;
    let data = [
      {
        id: 1,
        type: 'dyn',
        name: 'test',
        github: '',
      },
      {
        id: 2,
        type: 'github',
        name: 'github',
        github: 'https://github.com/test/demo',
      },
  ];
  
    return res.json({
      success: true,
      data: data,
    });
  },  
  // ddns配置
  'GET /api/package/ddns/setting': (req, res) => {
    
    let data = {
      package: [
        {
          id: 1,
          name: "测试版",
          price: 0,
          data: {
            domain: ["dnsoa.free"],
            recordType: ["A"],
            recordLine: ["中国"],
            recordNumber: 1,
            recordMinTTL: 60,
          }
        },
        {
          id: 2,
          name: "个人版",
          price: 5.00,
          data: {
            domain: ["dnsoa.me","dnsoa.free"],
            recordType: ["A","CNAME"],
            recordLine: ["中国","默认"],
            recordNumber: 3,
            recordMinTTL: 30,
          }
        }
      ] 
    };
    return res.json({
      success: true,
      data: data,
    });
  },
  //创建订单
  'POST /api/order/create': (req, res) => {
    const { type, title, content } = req.body;
    console.log(req.body);
    return res.json({
      success: true,
      code: 200,
      message: "添加成功",
      data: {
        sn: '20190101',
      }
    });
  },

  'POST /api/login/account': (req, res) => {
    const { password, username } = req.body;
    if (password === '888888' && username === 'admin') {
      return res.json({
        status: 'ok',
        code: 0,
        token: "sdfsdfsdfdsf",
        data: {
          id: 1,
          username: 'kenny',
          sex: 6
        }
      });
    } else {
      return res.status(403).json({
        status: 'error',
        code: 403
      });
    }
  },
  //注册接口
  'POST /api/account/signup': (req, res) => {
    const { password, username, email } = req.body;

    if (password === '888888' && username === 'admin' && email === 'admin@admin.com') {
      return res.json({
        success: true,
        code: 0,
        message: "注册成功",
        data: {
          username: 'admin',
        }
      });
    } else {
      return res.json({
        success: false,
        code: 403,
        message: "注册失败"
      });
    }
  },
  //登录接口
  'POST /api/account/login': (req, res) => {
    const { password, username } = req.body;

    if (password === 'admin' && username === 'admin') {
      return res.json({
        success: true,
        code: 0,
        message: "登录成功",
        data: {
          username: 'admin',
        }
      });
    } else {
      return res.json({
        success: false,
        code: 403,
        message: "用户名密码不正确"
      });
    }
  },
  'DELETE /api/user/:id': (req, res) => {
    console.log('---->', req.body)
    console.log('---->', req.params.id)
    res.send({ status: 'ok', message: '删除成功！' });
  }
}
module.exports = proxy;
