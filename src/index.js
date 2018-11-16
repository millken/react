import ReactDOM from 'react-dom';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
//import '@icedesign/base/reset.scss';

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
    throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

const data = (
    <h1>Hello,World!</h1>
);

ReactDOM.render(data, ICE_CONTAINER);
