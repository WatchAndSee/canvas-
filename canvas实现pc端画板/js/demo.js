/**
 * drawing Board nan.xue
 */
var drawingLineObj={
    cavs:$('.cavs').get(0),
    context:$('.cavs').get(0).getContext('2d'),
    colorBoard:$('#colorBoard').get(0),
    cleanBoard:$('#cleanBoard'),
    eraser:$('#eraser'),
    rescind:$('#rescind'),
    lineRuler:$('#lineRuler').get(0),
    boolean:false,
    imgArr:[],
    init:function(){
        this.context.lineCap='round';//线条的起始样式
        this.context.lineJion='round';//转弯
        this.draw();
        this.btnAllfn();
    },
    btnAllfn:function(){
        var self=this;
        this.colorBoard.onchange=function(){
            console.log(this.value);
            self.context.strokeStyle=this.value;
        };
        this.lineRuler.onchange=function(){
            self.context.lineWidth=this.value;
        };

        var btnUlNode=$('.btn-list').get(0);
        console.log(btnUlNode);
        btnUlNode.onclick=function(e){
            console.log(e.target.id);
            switch(e.target.id){

                case "cleanBoard":
                    self.context.clearRect(0,0,self.cavs.offsetWidth,self.cavs.offsetHeight);                   break;
                case "eraser":
                    self.context.strokeStyle="#fff";
                    break;
                case "rescind":
                    if(self.imgArr.length>0){
                        self.context.putImageData(self.imgArr.pop(),0,0);
                    }
                    break;
            }


        }
    },
    draw:function(){
        var cavs=this.cavs,
            self=this;
        var c_x=cavs.offsetLeft,
            c_y=cavs.offsetTop;
        cavs.onmousedown=function(e){
            self.boolean=true;
            self.context.beginPath();
            var m_x=e.pageX-c_x,
                m_y=e.pageY-c_y;
            
            var imgData=self.context.getImageData(0,0,self.cavs.offsetWidth,self.cavs.offsetHeight);
            self.imgArr.push(imgData);
           
            self.context.moveTo(m_x,m_y);//鼠标在画布上的触点
            this.onmousemove=function(e){
                if(self.boolean){
                    self.context.lineTo(e.pageX-c_x,e.pageY-c_y);
                    self.context.stroke();
                }
             
            };
            this.onmouseup=function(){
                    self.context.closePath();
                    this.onmousemove=null;
                    self.boolean=false;
            };
            this.onmouseleave=function(){
                self.context.closePath();
                this.onmousemove=null;
                self.boolean=false;
            };
        };
    }
}
drawingLineObj.init();