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
    //if(this.value == 0)
      //  return ;
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
    var num = 1;
    for(var i = 0;i < rowsum;i++){
        for(var j = 0;j < colsum;j++){
            this.gameGrid[i][j] = new grid();
            this.gameGrid[i][j].rownum = i;
            this.gameGrid[i][j].colnum = j;
            this.gameGrid[i][j].value = (num *= 2);
            this.gameGrid[i][j].show(this.id);
        }
    }

    //show
    this.showTime();
    this.showScore();
}


gametable.prototype.setScore = function (score) {
    this.score = score;
}

gametable.prototype.showScore = function () {
    document.getElementById("time").innerHTML = this.score + "'";
}

gametable.prototype.setTime = function (time) {
    this.time = time;
}

gametable.prototype.showTime = function () {
    document.getElementById("score").innerHTML = this.score + "s";
}

//游戏面板数字上移
gametable.prototype.upMove = function(){

}

//游戏面板数字下移
gametable.prototype.downMove = function(){

}

//游戏面板数字左移
gametable.prototype.leftMove = function(){

}

//游戏面板数字右移
gametable.prototype.right = function(){

}


