//show messages in deferent method.
function show(){
    for(var i = 0;i < arguments.length;i++){
        console.log(arguments[i]);
    }
}

//---------------------------------------------------------------------------
function grid(){

}

grid.prototype.gId = null;
grid.prototype.value = null;
grid.prototype.name = "";

grid.prototype.getValue = function () {
    return this.value;
}

grid.prototype.setValue = function (value) {
    this.value = value;
}

grid.prototype.getName = function ( ) {
    return this.name;
}

grid.prototype.setName = function (name) {
    this.name = name;
}

//-----------------------------------------------------------------------

function gametable() {

}

gametable.prototype.gridNum = 16;
gametable.prototype.score = 0;
gametable.prototype.time = 0;

//游戏面板初始化
gametable.prototype.init = function(){
    this.showTime();
    this.showScore();
    var gameGird = new grid()[this.gridNum];//格子实例
    this.setGridId(gameGird);
}

gametable.prototype.setGridId = function(gameGrid){
    var gridId = document.getElementsByTagName("td");
    for(var i = 0;i < gridId.length;i++){
        alert(gridId[i].getAttribute("id") );
        //alert("yes");
    }
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


