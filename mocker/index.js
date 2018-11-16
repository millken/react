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
      // http://localhost:8081/api/admin/webpack-mock-api/raw/master/add/ddd.md
      // owner => admin
      // repo => webpack-mock-api
      // ref => master
      // req.params[0] => add/ddd.md
      return res.json({
        id: 1,
        owner, repo, ref,
        path: req.params[0]
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
          status: true,
          code: 0,
          message: "注册成功",
          data: {
            username: 'admin',
          }
        });
      } else {
        return res.json({
          status: false,
          code: 403,
          message: "注册失败"
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
  