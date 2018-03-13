function EventListener(obj,evt,fnc,useCapture){
	if (!useCapture) useCapture=false;
	if (obj.addEventListener){
		obj.addEventListener(evt,fnc,useCapture);
		return true;
	} else if (obj.attachEvent) return obj.attachEvent("on"+evt,fnc);
	else{
		MyAttachEvent(obj,evt,fnc);
		obj['on'+evt]=function(){ MyFireEvent(obj,evt) };
	}
} 

function MyAttachEvent(obj,evt,fnc){
	if (!obj.myEvents) obj.myEvents={};
	if (!obj.myEvents[evt]) obj.myEvents[evt]=[];
	var evts = obj.myEvents[evt];
	evts[evts.length]=fnc;
}
function MyFireEvent(obj,evt){
	if (!obj || !obj.myEvents || !obj.myEvents[evt]) return;
	var evts = obj.myEvents[evt];
	for (var i=0,len=evts.length;i<len;i++) evts[i]();
} 

////------------------------------------------------------------------------

function WebPDecDemo() {
	var canvas = document.getElementById("outputDecoderCanvas"),
	context = canvas.getContext("2d"),
	outputData = null,
	output = null,
	active = null,
	img = document.createElement("img"),
	decSpeedResult = document.getElementById("decSpeedResult"),
	decSaveButtons = document.getElementById("decSaveButtons");
	
	clearCanvas = function () {
		context.clearRect(0, 0, canvas.width, canvas.height);
	};
	resizeCanvas = function () {
		canvas.width=img.width;
		canvas.height=img.height;
	}
	if (typeof FileReader !== "undefined")	
	context.fillText("Drop an *.WEBP image here and wait", 60, 80);
	else
	context.fillText("Choose on an sample image 1 - 5.webp", 56, 80);
		
	EventListener(img, "load", function () {
		clearCanvas();
		resizeCanvas();
		context.drawImage(img, 0, 0);
		finishInit();
	}, false);
	
	EventListener(canvas, "dragenter", function (evt) {
		evt.preventDefault();
		evt.stopPropagation();
	}, false);

	EventListener(canvas, "dragover", function (evt) {
		evt.preventDefault();
		evt.stopPropagation();
	}, false);

	EventListener(canvas, "drop", function (evt) {
		var files = evt.dataTransfer.files;
		if (files.length > 0) {
			evt.preventDefault();
			evt.stopPropagation();
			var file = files[0];
			if (typeof FileReader !== "undefined") {
				var freader = new FileReader();
				freader.onload = function (evt) {
					if (WebPDecodeAndDraw(evt.target.result)) {
						finishDecoding(); 
					} else {
						//alert('This isn\'t a webp image.');
					}
				};
				freader.readAsBinaryString(file);
			} else {
				alert('Your Browser don\'t support the Filereader API');
			}
		}
			
	}, false);
	
	createSaveButtons = function () {
		if (decSaveButtons.innerHTML=='') {
			var imageOptions=new Array('PNG','png','JPEG','jpeg','Bitmap','bmp');//
			
			for(var i=0; i<imageOptions.length;i +=2) {
				var saveImage = document.createElement("button");
				saveImage.innerHTML = "Save as "+imageOptions[i+1];
				EventListener(saveImage,"click", function (evt) {
					window.open(canvas.toDataURL("image/"+evt.target.innerHTML.split(" ")[2]));
					evt.preventDefault();
				}, false);
				decSaveButtons.appendChild(saveImage);
			}
		}
	};
	
	finishDecoding = function () {
		createSaveButtons();
	};
	
    function convertBinaryToArray(binary) {
        var arr = new Array();
    	var num=binary.length;
    	var i;
    	for(i=0;i<num;++i)
    	    arr.push(binary.charCodeAt(i));
        return arr;
    }

		var webpdecoder=new WebPDecoder();var viewer;
	WebPDecodeAndDraw = function (response) {var stop=false;if(viewer) {stop=true;viewer.stopdrawing();}
		var start = new Date();

			response=convertBinaryToArray(response);//unkonvertierung in char
		///--------- libwebpjs 0.6.0 decoder code start ---------------------------------------------
		
		var imagearray=WebPRiffParser(response,0);
		imagearray['response']=response;
		imagearray['rgbaoutput']=true;
		imagearray['dataurl']=false;
		viewer = new WebPImageViewer(webpdecoder,imagearray,function(frame){
		
		var ctx = canvas.getContext('2d');
		var width=imagearray['header']?imagearray['header']['canvas_width']:frame['imgwidth'];
		var height=imagearray['header']?imagearray['header']['canvas_height']:frame['imgheight'];
		canvas.height=height;
		canvas.width=width;
		var imagedata = ctx.createImageData(width, height);	
		var rgba=frame['rgbaoutput'];	
		for(var i=0;i<width*height*4;i++)
			imagedata.data[i]=rgba[i];
		ctx.putImageData(imagedata, 0, 0);
		/*var img = new Image();
		img.onload = function(){
			canvas.height=img.height;
			canvas.width=img.width;
			ctx.drawImage(img,0,0);
		};
		img.src = frame['dataurl'];*/
		
		});
		var end = new Date();
		var bench_libwebp=(end-start);
		decSpeedResult.innerHTML='Speed result:<br />libwebpjs: finish in '+bench_libwebp+'ms'+(imagearray['frames'].length>1?' ('+imagearray['frames'].length+' frames)':''); 
		//var height=[0];
		//var width=[0];
		//var bitmap = webpdecoder.WebPDecodeRGBA(response,0,response.length,width,height);
		
		///--------- libwebpjs 0.6.0 decoder code end ---------------------------------------------
		
		/*if (bitmap) {
			//Draw Image
			var start = new Date();
			var biHeight=height[0]; var biWidth=width[0];
			
			canvas.height=biHeight;
			canvas.width=biWidth;
			
			var context = canvas.getContext('2d');
			var output = context.createImageData(canvas.width, canvas.height);
			var outputData = output.data;
			
			for (var h=0;h<biHeight;h++) {			
				for (var w=0;w<biWidth;w++) {
					outputData[0+w*4+(biWidth*4)*h] = bitmap[0+w*4+(biWidth*4)*h];
					outputData[1+w*4+(biWidth*4)*h] = bitmap[1+w*4+(biWidth*4)*h];
					outputData[2+w*4+(biWidth*4)*h] = bitmap[2+w*4+(biWidth*4)*h];
					outputData[3+w*4+(biWidth*4)*h] = bitmap[3+w*4+(biWidth*4)*h];
	
				};			
			}
			
			context.putImageData(output, 0, 0);
			var end = new Date();
			var bench_canvas=(end-start);*/
			
			finishDecoding() 
		/*}*/
	};
};
