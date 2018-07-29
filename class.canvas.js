class Canvas {
    constructor(canvas, config) {
        this.canvas = canvas;
        this.paint = this.canvas.getContext('2d');
        this.lineWidth = config.lineWidth || 1;
        this.lineNum = config.lineNum || 5;
        this.dotNum = config.dotNum || 20;
        this.dotR = config.dotR || 1;

        this.foregroundColor = "#000";
        this.backgroundColor = "#000";
        this.fontSize = config.fontSize || 20;
        this.content = "";
    }

    line(x, y, endx, endy) {
        this.paint.beginPath();
        this.paint.lineWidth = this.lineWidth;
        this.paint.strokeStyle = this.color; // 路径
        this.paint.moveTo(x, y);
        this.paint.lineTo(endx, endy);
        this.paint.closePath();
        this.paint.stroke(); // 进行绘制
    }

    arc(x, y, endx, endy) {
        this.paint.beginPath();
        this.paint.arc(x, y, this.r, 0, Math.PI * 2, false);
        this.paint.closePath();
        this.paint.fillStyle = color;
        this.paint.fill()
    }

    clear() {
        this.paint.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
