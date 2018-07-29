class Canvas {
    constructor(canvas, config) {
        this.canvas = canvas;
        this.paint = this.canvas.getContext('2d');
        this.lineWidth = config.lineWidth || 1;
        this.lineNum = config.lineNum || 5;
        this.dotNum = config.dotNum || 20;
        this.dotR = config.dotR || 1;
        this.foregroundColor = config.foregroundColor || [129, 250];
        this.backgroundColor = config.backgroundColor || [50, 128];
        this.fontSize = config.fontSize || 20;
        this.fontFamily = config.fontFamily || 'Georgia';
        this.fontStyle = config.fontStyle || 'fill'; // stroke
        this.content = config.content || 'acdefhijkmnpwxyABCDEFGHJKMNPQWXY12345789'; // 验证码的因子
        this.len = 4; // 验证码长度
        this.str = '';
    }

    getColor(arr) {
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

    getRand(a, b) {
        return Math.floor(Math.random() * (b - a) + a);
    }

    getText() {
        let len = this.content.length, str = '';
        for (let i = 0; i < this.len; i++) {
            str += this.content[this.getRand(0, len)];
        }
        this.str = str;
    }

    line() {
        let x = this.getRand(0, this.canvas.width), y = this.getRand(0, this.canvas.height),
            endx = this.getRand(0, this.canvas.width), endy = this.getRand(0, this.canvas.width);
        this.paint.beginPath();
        this.paint.lineWidth = this.lineWidth;
        this.paint.strokeStyle = `rgba(${this.getColor()[0]}, ${this.getColor()[1]}, ${this.getColor()[2]}, 0.8)`; // 路径颜色
        this.paint.moveTo(x, y);
        this.paint.lineTo(endx, endy);
        this.paint.closePath();
        this.paint.stroke(); // 进行绘制
    }

    arc() {
        let x = this.getRand(0, this.canvas.width), y = this.getRand(0, this.canvas.height);
        this.paint.beginPath();
        this.paint.arc(x, y, this.dotR, 0, Math.PI * 2, false);
        this.paint.closePath();
        this.paint.fillStyle = `rgba(${this.getColor()[0]}, ${this.getColor()[1]}, ${this.getColor()[2]}, 0.8)`;
        this.paint.fill()
    }

    font() {
        this.getText();
        this.paint.font = `${this.fontSize}px ${this.fontFamily}`;
        let fontStyle = `${this.fontStyle}Text`;
        let colorStyle = `${this.fontStyle}Style`;
        this.paint[colorStyle] = `rgba(${this.getColor()[0]}, ${this.getColor()[1]}, ${this.getColor()[2]}, 0.8)`;
        this.paint[fontStyle](this.str, 10, 50);
    }

    clear() {
        this.paint.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
