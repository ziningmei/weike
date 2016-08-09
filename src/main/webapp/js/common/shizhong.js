$(function(){
	var iNow = 0;
	var arr = ["#ffae00","black"];

	myClock();
	myday();
    setInterval(myClock,1000);//每一秒钟重绘一次	
		setInterval(myday,1000);
 function myday(){
 	var a = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
 	var week = new Date().getDay();
 	var dateDom=new Date();
	 	var year=dateDom.getFullYear();
	 	var month=dateDom.getMonth()+1;
	 	var day=dateDom.getDate();
	 	var mm=year+"-"+month+"-"+day;
	 	var myCanvas = document.getElementById("myCanvas");
		 	var cxt=myCanvas.getContext("2d");
	 	cxt.font="14px 黑体";
		//绘制实心字
		cxt.fillStyle="red";//填充红色
		cxt.fillText(mm,50,105);
 	for(var ind=0;ind<6;ind++){
 		if(week==ind){
 			var myCanvas = document.getElementById("myCanvas");
		 	var cxt=myCanvas.getContext("2d");
			cxt.font="14px 黑体";
			//绘制实心字
			cxt.strokeStyle="red";//填充红色
			cxt.strokeText(a[ind],55,55);
 		}
 }
}
 
 
    function myClock(){	
    	//得到年月日
		
    	

		var myCanvas = document.getElementById("myCanvas");		
		var oC = myCanvas.getContext("2d");
		//得到时分秒
		var now = new Date(),
		sec = now.getSeconds(),
		min = now.getMinutes(),
		hour = now.getHours();
		hour = hour>=12 ? hour-12 : hour;

		iNow++;
		iNow = iNow%2;		

		oC.save();//save():保存当前环境的状态
			//初始化画布
			oC.clearRect(0,0,myCanvas.width,myCanvas.height);//clearRect:在给定的矩形内清除指定的像素 
			oC.translate(75,75);//translate:重新映射画布上的 (0,0) 位置
			oC.scale(0.5,0.5);//scale:缩放当前绘图至更大或更小
			oC.rotate(-Math.PI/2);//rotate:旋转当前绘图
			 //  Math.PI: PI 属性就是 π，即圆的周长和它的直径之比
			//白色背景
			oC.save();
				oC.fillStyle = "#ccc";
				oC.beginPath();//beginPath:起始一条路径，或重置当前路径
				oC.arc(0,0,14+0,0,Math.PI*2,true);//arc:创建弧/曲线（用于创建圆形或部分圆）
				oC.fill();//fill:填充当前绘图（路径）
			oC.restore();//restore:返回之前保存过的路径状态和属性

			oC.strokeStyle = "#548B54";//strokeStyle:设置或返回用于笔触的颜色、渐变或模式
			oC.fillStyle = "black";//fillStyle:设置或返回用于填充绘画的颜色、渐变或模式
			oC.lineWidth = 4;//设置或返回当前的线条宽度
			oC.lineCap = "round";	//设置或返回线条的结束端点样式		

			//时针刻度
			oC.save();
				oC.beginPath();
				for(var i=0; i<12; i++){	
					oC.moveTo(110,0);//把路径移动到画布中的指定点，不创建线条
					oC.lineTo(120,0);//添加一个新点，然后在画布中创建从该点到最后指定点的线条
					oC.rotate(Math.PI/6);//旋转当前绘图
				}
				oC.stroke();//绘制已定义的路径
			oC.restore();

			//分针刻度
			oC.save();
				oC.fillStyle = "black";
				oC.lineWidth = 2;
				oC.beginPath();
				for(var i=0; i<60; i++){
					if(i%5 != 0){
						oC.moveTo(116,0);
						oC.lineTo(120,0);
					}
					oC.rotate(Math.PI/30);
				}
				oC.stroke();
			oC.restore();			
			
			oC.save();
				oC.rotate(Math.PI/2);
				oC.font = "30px impact";
				//12点
				oC.fillText("12",-15,-80);	
				oC.fillText("1",40,-75);	//文本的 x 坐标位置,文本的 y 坐标位置		
				oC.fillText("2",80,-35);		
				//3点
				oC.fillText("3",88,13);					
				//6点
				oC.fillText("6",-8,104);				
				//9点
				oC.fillText("9",-103,11);					
			oC.restore();
			
			//画时针
			oC.save();
				oC.strokeStyle = "#ff3300";
				oC.rotate((Math.PI/6)*hour+(Math.PI/360)*min+(Math.PI/21600)*sec);	
				oC.lineWidth = 8;
				oC.beginPath();
				oC.moveTo(-20,0);
				oC.lineTo(60,0);
				oC.stroke();
			oC.restore();
			
			//画分针
			oC.save();
				oC.rotate((Math.PI/30)*min+(Math.PI/1800)*sec);
				oC.strokeStyle = "#27A9E3";
				oC.lineWidth = 6;
				oC.beginPath();
				oC.moveTo(-28,0);
				oC.lineTo(90,0);
				oC.stroke();
			oC.restore();

			//画秒针
			/*oC.save();
				oC.rotate(sec*Math.PI/30);
				oC.strokeStyle = "#D40000";
				oC.lineWidth = 3;
				oC.beginPath();
				oC.moveTo(-30,0);
				oC.lineTo(105,0);
				oC.stroke();
			oC.restore();*/
	
			//风车秒针
			oC.save();
				oC.rotate(sec*Math.PI/30);				

				oC.save();					
					oC.fillStyle = "#f23";
					oC.beginPath();
					oC.arc(94,0,10,0,Math.PI,true);
					oC.fill();
				oC.restore();

				oC.save();
					oC.rotate(Math.PI/2);
					oC.fillStyle = "#ffae00";
					oC.beginPath();
					oC.arc(10,-84,10,0,Math.PI,true);				
					oC.fill();
				oC.restore();

				oC.save();
					oC.fillStyle = "#27A9E3";
					oC.beginPath();
					oC.arc(74,0,10,Math.PI,Math.PI*2,true);
					oC.fill();
				oC.restore();

				oC.save();
					oC.rotate(Math.PI/2);
					oC.fillStyle = "#0eaf52";
					oC.beginPath();
					oC.arc(-10,-84,10,Math.PI,Math.PI*2,true);
					oC.fill();
				oC.restore();
			oC.restore()
			//风车秒针


			//表框
			oC.save();
				oC.lineCap = "butt";
				oC.lineWidth = 16;
				oC.save();				
					oC.strokeStyle = "#BBFFFF";
					oC.beginPath();
					oC.arc(0,0,142,0,Math.PI*2,true);
					oC.stroke();
				oC.restore();

				oC.save();
					oC.strokeStyle = "#C0FF3E";
					oC.beginPath();
					oC.arc(0,0,142,0,Math.PI/iNow*5/3,true);
					oC.stroke();
				oC.restore();
			oC.restore();

			//中心点
			oC.save();
				oC.fillStyle = "#fff";
				oC.beginPath();
				oC.arc(0,0,4,0,Math.PI*2,true);
				oC.fill();
			oC.restore();
			

		oC.restore();
	};

});
