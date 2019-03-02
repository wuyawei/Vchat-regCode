## regCode
> canvas实现的验证码
## 用法
``` javascript
    /* 
        下载的js文件
        <script src="index.js"> </script>
    */
    // or
    /* 
        npm install vchat-regcode --save
        import Canvas from 'vchat-regcode';
    */
    
    let regcode = new Canvas(document.querySelector('#regcode'),{
        fontSize: 20,
        lineNum: 2,
        dotNum: 10
    }); // 实例化
    
    regcode.draw((r) => { // 绘制验证码，在回调函数中可以获取图片显示验证码文字，从而判断与用户输入的是否一致
        console.log(r);
    });
```
## 参数

| 参数 | 描述 | 类型 | 默认值 |
| :-: | :-: | :-: | :-: | 
| lineWidth | 线宽 | Number | 0.5 |
| lineNum | 线的条数 | Number | 2 |
| dotNum  | 点的数量 | Number | 10 |
| dotR  | 点的半径 | Number | 1 |
| foregroundColor  | 前景色区间 | Array | [10, 80] |
| backgroundColor  | 背景色区间 | Array | [150, 250] |
| fontSize  | 字体大小 | Number | 28 |
| fontFamily  | 字体类型 | String | 'Georgia' |
| content  | 验证码因子 | String | 'acdefhijkmnpwxyABCDEFGHJKMNPQWXY12345789' |
| fontStyle | 字体绘制类型 | String，支持'fill'/'stroke' (填充or无填充)| fill
| len  | 验证码长度 | Number | 4 |

> 颜色区间数组是指rgb颜色的强度值(0-255, 从暗—>亮)
