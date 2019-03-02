class Canvas {
    constructor(canvas, config = {}) {
        this.canvas = canvas;
        this.paint = this.canvas.getContext('2d');
        this.lineWidth = config.lineWidth || 0.5; // 线条宽度
        this.lineNum = config.lineNum || 2; // 线条数量
        this.dotNum = config.dotNum || 10; // 点的数量
        this.dotR = config.dotR || 1; // 点的半径
        this.foregroundColor = config.foregroundColor || [10, 80]; // 前景色区间
        this.backgroundColor = config.backgroundColor || [150, 250]; // 背景色区间
        this.fontSize = config.fontSize || 28; // 字体大小
        this.fontFamily = config.fontFamily || 'Georgia'; // 字体类型
        this.fontStyle = config.fontStyle || 'fill'; // 字体绘制方法，fill/stroke
        this.content = config.content || 'acdefhijkmnpwxyABCDEFGHJKMNPQWXY12345789'; // 验证码的因子
        this.len = config.len || 4; // 验证码长度
        this.callback = function () {};
        this.canvas.onclick = () => {
            this.drawAgain();
        }
    }

    getColor(arr) { // 随机获取颜色
        let a, b, color = [];
        if (arr[0] > arr [1]) {
            a = arr [1];
            b = arr[0];
        } else {
            a = arr [0];
            b = arr[1];
        }
        color[0] = this.getRand(a, b);
        color[1] = this.getRand(a, b);
        color[2] = this.getRand(a, b);
        return color;
    }

    getRand(a, b) { // 获取某个区间的随机数
        return Math.floor(Math.random() * (b - a) + a);
    }

    getText() { // 随机获取验证码
        let len = this.content.length, str = '';
        for (let i = 0; i < this.len; i++) {
            str += this.content[this.getRand(0, len)];
        }
        return str;
    }

    line() { // 绘制线条
        for (let i = 0; i < this.lineNum; i++) {
            let x = this.getRand(0, this.canvas.width), y = this.getRand(0, this.canvas.height),
                endx = this.getRand(0, this.canvas.width), endy = this.getRand(0, this.canvas.width);
            this.paint.beginPath();
            this.paint.lineWidth = this.lineWidth;
            this.paint.strokeStyle = `rgba(${this.getColor(this.foregroundColor)[0]}, ${this.getColor(this.foregroundColor)[1]}, ${this.getColor(this.foregroundColor)[2]}, 0.8)`; // 路径颜色
            this.paint.moveTo(x, y);
            this.paint.lineTo(endx, endy);
            this.paint.closePath();
            this.paint.stroke(); // 进行绘制
        }
    }

    arc() { // 绘制圆点
        for (let i = 0; i < this.dotNum; i++) {
            let x = this.getRand(0, this.canvas.width), y = this.getRand(0, this.canvas.height);
            this.paint.beginPath();
            this.paint.arc(x, y, this.dotR, 0, Math.PI * 2, false);
            this.paint.closePath();
            this.paint.fillStyle = `rgba(${this.getColor(this.foregroundColor)[0]}, ${this.getColor(this.foregroundColor)[1]}, ${this.getColor(this.foregroundColor)[2]}, 0.8)`;
            this.paint.fill();
        }
    }

    font() { // 绘制文字
        let str = this.getText();
        this.callback(str);
        this.paint.font = `${this.fontSize}px ${this.fontFamily}`;
        this.paint.textBaseline = 'middle';
        let fontStyle = `${this.fontStyle}Text`;
        let colorStyle = `${this.fontStyle}Style`;
        for (let i = 0; i < this.len; i++) {
            let fw = this.paint.measureText(str[i]).width;
            let x = this.getRand(this.canvas.width / this.len * i + fw/2, (this.canvas.width / this.len) * (i + 1) - fw-5);
            let deg = this.getRand(-6, 6);//字体的旋转角度
            this.paint[colorStyle] = `rgba(${this.getColor(this.foregroundColor)[0]}, ${this.getColor(this.foregroundColor)[1]}, ${this.getColor(this.foregroundColor)[2]}, 0.8)`;
            this.paint.save();
            this.paint.rotate(deg * Math.PI / 180);
            this.paint[fontStyle](str[i], x, this.canvas.height / 2);
            this.paint.restore();
        }
    }

    draw(callback) { // 画图
        this.callback = callback;
        this.paint.fillStyle = `rgba(${this.getColor(this.backgroundColor)[0]}, ${this.getColor(this.backgroundColor)[1]}, ${this.getColor(this.backgroundColor)[2]}, 0.8)`;
        this.paint.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.line();
        this.arc();
        this.font();
    }

    clear() { // 清除画布
        this.paint.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawAgain() { // 更新画布
        this.clear();
        this.draw(this.callback);
    }
}
if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
    module.exports = Canvas;
}
