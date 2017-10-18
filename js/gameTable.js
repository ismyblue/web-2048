//show messages in deferent method.
function show(){
    for(var i = 0;i < arguments.length;i++){
        console.log(arguments[i]);
    }
}

//---------------------------------------------------------------------------

function grid(){

    //this 修饰的属性是公有，var 是局部私有，无修饰符是全局私有,
    this.id = NaN;
    this.rownum = 0;
    this.colnum = 0;
    this.type = "";
    this.value = 0;

}

//在UI上显示格子
grid.prototype.show = function (tableid) {
    var td = document.getElementById(tableid).rows[this.rownum].cells[this.colnum];
    this.type = "type" + this.value.toString();
    td.setAttribute("class",this.type);
    td.innerHTML = "";
    if(this.value != 0)
        td.innerHTML = this.value;

}

//-----------------------------------------------------------------------

function gametable() {
    this.time = 0;
    this.score = 0;
    this.rowsum = 0;
    this.colsum = 0;
    this.gridsum = 0;

}


//游戏面板初始化
gametable.prototype.init = function(id,rowsum,colsum){
    this.id = id;
    this.rowsum = rowsum;
    this.colsum = colsum;
    this.gridsum = this.rowsum * this.colsum;
    this.time = 0;
    this.score = 0;

    //创建一个游戏表格
    var contetns = document.getElementById("game-contents");
    contetns.innerHTML = "";
    var tb = document.createElement("table");
    tb.setAttribute("id","table-game");
    contetns.appendChild(tb);
    for(var i = 0;i < rowsum;i++){
        var tr = document.createElement("tr");
        for(var j = 0;j < colsum;j++){
            var td = document.createElement("td");
            tr.appendChild(td);
        }
        tb.appendChild(tr);
    }

    //创建所有的游戏格子，初始化
    this.gameGrid = new Array(rowsum);
    for(var i = 0;i < rowsum;i++){
        this.gameGrid[i] = new Array(colsum);
    }

    for(var i = 0;i < rowsum;i++){
        for(var j = 0;j < colsum;j++){
            this.gameGrid[i][j] = new grid();
            this.gameGrid[i][j].rownum = i;
            this.gameGrid[i][j].colnum = j;
            this.gameGrid[i][j].value = 0;
            this.gameGrid[i][j].show(this.id);
        }
    }
    this.addRandom();
    this.addRandom();
    //show
    this.showGrid();
}

//显示游戏分数
gametable.prototype.showScore = function () {
    document.getElementById("score").innerHTML = this.score + "'";
}

//显示游戏时间
gametable.prototype.showTime = function () {
    document.getElementById("time").innerHTML = this.time + "s";
}

//显示游戏所有信息，图片，时间，分数
gametable.prototype.showGrid = function () {
    for(var i = 0;i < this.rowsum;i++){
        for(var j = 0;j < this.colsum;j++){
            this.gameGrid[i][j].show(this.id);
        }
    }
    this.showScore();
    this.showTime();
}

//增加一个随机数2
gametable.prototype.addRandom = function () {
    var i = Math.random() * 4 ;
    var j = Math.random() * 4 ;
    while(this.gameGrid[parseInt(i)][parseInt(j)].value != 0){
        i = Math.random() * 4 ;
        j = Math.random() * 4 ;
    }
    this.gameGrid[parseInt(i)][parseInt(j)].value = 2;
}

//游戏面板数字上移
gametable.prototype.upMove = function(){
    var i,j,k;
    var test = false;//不能增加随机数
    for(j = 0;j < this.colsum;j++){
        var index = 0;
        for(i = 0;i < this.rowsum ;i++){
            if(this.gameGrid[i][j].value == 0){
                continue;
            }
            for(k = i+1;k < this.rowsum;k++) {
               if (this.gameGrid[i][j].value == this.gameGrid[k][j].value) {
                   this.gameGrid[i][j].value = 0;
                   this.gameGrid[index][j].value = this.gameGrid[k][j].value * 2;
                   this.score += this.gameGrid[index][j].value;
                   this.gameGrid[k][j].value = 0;
                   index++;
                   test = true;//可以增加随机数
                   break;
               }
           }
           if(k == this.rowsum){
               var t = this.gameGrid[i][j].value;
               this.gameGrid[i][j].value = 0;
               this.gameGrid[index][j].value = t;
               if(i != index){
                   test = true;//可以增加随机数
               }
               index++;
           }
        }
    }
    if(test == true)
        this.addRandom();
    this.showGrid();
}

//游戏面板数字下移
gametable.prototype.downMove = function(){
    var i,j,k;
    var test = false;
    for(j = 0;j < this.colsum;j++){
        var index = this.rowsum-1;
        for(i = this.rowsum - 1;i >= 0 ;i--){
            if(this.gameGrid[i][j].value == 0){
                continue;
            }
            for(k = i-1;k >= 0;k--) {
                if (this.gameGrid[i][j].value == this.gameGrid[k][j].value) {
                    this.gameGrid[i][j].value = 0;
                    this.gameGrid[index][j].value = this.gameGrid[k][j].value * 2;
                    this.score += this.gameGrid[index][j].value;
                    this.gameGrid[k][j].value = 0;
                    test = true;//可以增加随机数
                    index--;
                    break;
                }
            }
            if(k == -1){
                var t = this.gameGrid[i][j].value;
                this.gameGrid[i][j].value = 0;
                this.gameGrid[index][j].value = t;
                if(i != index)
                    test = true;//可以增加随机数
                index--;
            }
        }
    }
    if(test == true)
        this.addRandom();
    this.showGrid();
}

//游戏面板数字左移
gametable.prototype.leftMove = function(){
    var i,j,k;
    var test = false;
    for(i = 0;i < this.rowsum;i++){
        var index = 0;
        for(j = 0;j < this.colsum ;j++){
            if(this.gameGrid[i][j].value == 0){
                continue;
            }
            for(k = j+1;k < this.colsum;k++) {
                if (this.gameGrid[i][j].value == this.gameGrid[i][k].value) {
                    this.gameGrid[i][j].value = 0;
                    this.gameGrid[i][index].value = this.gameGrid[i][k].value * 2;
                    this.score += this.gameGrid[i][index].value;
                    this.gameGrid[i][k].value = 0;
                    tese = true;//可以增加随机数
                    index++;
                    break;
                }
            }
            if(k == this.colsum){
                var t = this.gameGrid[i][j].value;
                this.gameGrid[i][j].value = 0;
                this.gameGrid[i][index].value = t;
                if(j != index)
                    test = true;//可以增加随机数
                index++;
            }
        }
    }
    if(test == true)
        this.addRandom();
    this.showGrid();
}

//游戏面板数字右移
gametable.prototype.rightMove = function() {
    var i,j,k;
    var test = false;
    for(i = 0;i < this.rowsum;i++){
        var index = this.colsum-1;
        for(j = this.colsum-1;j >= 0;j--){
            if(this.gameGrid[i][j].value == 0){
                continue;
            }
            for(k = j-1;k >= 0;k--) {
                if (this.gameGrid[i][j].value == this.gameGrid[i][k].value) {
                    this.gameGrid[i][j].value = 0;
                    this.gameGrid[i][index].value = this.gameGrid[i][k].value * 2;
                    this.score += this.gameGrid[i][index].value;
                    this.gameGrid[i][k].value = 0;
                    test = true;
                    index--;
                    break;
                }
            }
            if(k == -1){
                var t = this.gameGrid[i][j].value;
                this.gameGrid[i][j].value = 0;
                this.gameGrid[i][index].value = t;
                if(j != index)
                    test = true;//可以增加随机数
                index--;
            }
        }
    }
    if(test == true)
        this.addRandom();
    this.showGrid();
}


