//'     $Revision: 13 $

var lib_DOC_OBJ = document;

var bodyNode = null;
function createLayer(x,y,w,h,baseName,index,html,parent, color){
	var ob;
                if(parent)
                {
                  parentElm = lib_DOC_OBJ.getElementById(parent);
                }
                else{
                     if(!bodyNode){bodyNode = lib_DOC_OBJ.getElementsByTagName("body")[0]}
                     parentElm = bodyNode;
                }

                nLayer = lib_DOC_OBJ.createElement("div");
                parentElm.appendChild(nLayer)

		//lib_DOC_OBJ.body.insertAdjacentHTML("BeforeEnd",'<div id="'+baseName+'" style="position:absolute;left:'+x+';top:'+y+';width:'+w+';height:'+h+';visibility:hidden;overflow:hidden;z-index:'+index+';background-color:'+color+';layer-background-color:'+color+';padding: 2px;">\n'+html+'\n</div>\n');
		nLayer.id = baseName;
		if(brwsr.ns)
		{
			nLayer.setAttribute("style","position:absolute;left:"+x+";top:"+y+";width:"+w+";height:"+h+";visibility:hidden;overflow:hidden;z-index:"+index+";");
		}
		else{
		    	nLayer.style.cssText = ("position:absolute;left:"+x+";top:"+y+";width:"+w+";height:"+h+";visibility:hidden;overflow:hidden;z-index:"+index+";");
		}

		returnvar =  brwsr.dom ? nLayer:
	               brwsr.ie4?lib_DOC_OBJ.all[baseName]:brwsr.ns4?eval("lib_DOC_OBJ.layers." +ob.id):0;
	        return returnvar;
}


function lib_obj(obj,minimumPix,maximumPix,nest){
        //if(!lib_DOC_OBJ){lib_DOC_OBJ = document;}
	//nest=(!nest) ? "":'lib_DOC_OBJ.'+nest+'.'
	this.evnt=lib_DOC_OBJ.getElementById(obj);
        if(!this.evnt)
        {
           tempLayer = new createLayer(0,0,0,0,obj,300,"&nbsp;", nest, "");
           this.evnt=lib_DOC_OBJ.getElementById(tempLayer.id);//:
	   //brwsr.ie4?lib_DOC_OBJ.all[tempLayer.id]:brwsr.ns4?eval(nest+"lib_DOC_OBJ.layers." +tempLayer.id):0;
        }
	this.css=brwsr.dom||brwsr.ie4?this.evnt.style:this.evnt;
	this.ref=brwsr.dom||brwsr.ie4?document:this.css.document;
	this.x=parseInt(this.css.left)||this.css.pixelLeft||this.evnt.offsetLeft||0;
	this.y=parseInt(this.css.top)||this.css.pixelTop||this.evnt.offsetTop||0
	this.w=this.evnt.offsetWidth||this.css.clip.width||
	  this.ref.width||this.css.pixelWidth||0;
	this.h=this.evnt.offsetHeight||this.css.clip.height||
	  this.ref.height||this.css.pixelHeight||0
	this.c=0 //Clip values
	if((brwsr.dom || brwsr.ie4) && this.css.clip) {
	this.c=this.css.clip;
        this.c=this.c.slice(5,this.c.length-1);
	this.c=this.c.split(' ');
	for(var i=0;i<4;i++){this.c[i]=parseInt(this.c[i])}
	}
	this.ct=this.css.clip.top||this.c[0]||0;
	this.cr=this.css.clip.right||this.c[1]||this.w||0
	this.cb=this.css.clip.bottom||this.c[2]||this.h||0;
	this.cl=this.css.clip.left||this.c[3]||0
	//this.minXPix = !minimumPix ? 0 : minimumPix //Far as it can go Left on the X axis
	//this.maxXPix = !maximumPix ? 0 : maximumPix//Far as it can go Right on the X axis
	this.HIDSELECTS  = null;
	this.ondrag      = null;
	this.onclick     = null;
	this.onmouseover = null;
	this.obj = obj + "Object";
        this.evnt.style.overflow = "visible"
        eval(this.obj + "=this")
	return this;
}
lib_obj.prototype.writeIt = function(text,startHTML,endHTML)
{
	if(brwsr.ns4)
	{
		if(!startHTML)
		{startHTML=""; endHTML=""}
		this.ref.open("text/html"); 
		this.ref.write(startHTML+text+endHTML);
		this.ref.close()
	}
	else{
	    	//alert(this.evnt.innerHTML);
                this.evnt.innerHTML=text;
        }
}

//Move the bar object to a new position	
lib_obj.prototype.moveIt = function(x,y)
{
  this.y = y + "px";
  this.x = x + "px";
  this.css.top=y + "px";
  this.css.left = x + "px";
}
lib_obj.prototype.moveIt_relative = function(x,y)
{
  this.y = y;
  this.x = x;
  this.evnt.offsetTop = y;
  this.evnt.offsetLeft = x;
}

//hide bar
  lib_obj.prototype.hideIt = function()
  {
  	this.css.visibility="hidden";
  	this.showSelects();
  }
  //show bar
  lib_obj.prototype.showIt = function()
  {
  	this.css.visibility="visible";
  	this.eraseSelects();
  }

//Clipping object to ******
lib_obj.prototype.clipTo = function(t,r,b,l,setwidth){

  this.ct=t; 
  this.cr= (r + this.x) > this.maxPix ? r - ((r + this.x) - lastpixel) :  r; 
  this.cb=b; this.cl=l
  
  if(brwsr.ns4){
    this.css.clip.top=t;
    this.css.clip.right=r;
    this.css.clip.bottom=b;this.css.clip.left=l
  }else{
    if(t<0)t=0;if(r<0)r=0;if(b<0)b=0;if(b<0)b=0
    this.css.clip="rect("+t+","+r+","+b+","+l+")";
    if(setwidth){this.css.pixelWidth=this.css.width=r; 
    this.css.pixelHeight=this.css.height=b}
  }
}

//Clipping object by ******
lib_obj.prototype.clipBy = function(t,r,b,l,setwidth){ 
 
  this.clipTo(this.ct+t,this.cr+r,this.cb+b,this.cl+l,setwidth)
}

//Clip animation ************
lib_obj.prototype.clipIt = function(t,r,b,l,step,fn,wh){
  
 
  tstep=Math.max(Math.max(Math.abs((t-this.ct)/step),Math.abs((r-this.cr)/step)),
    Math.max(Math.abs((b-this.cb)/step),Math.abs((l-this.cl)/step)))
  if(!this.clipactive){
    this.clipactive=true; if(!wh) wh=0; if(!fn) fn=0
    this.clip(t,r,b,l,(t-this.ct)/tstep,(r-this.cr)/tstep,
      (b-this.cb)/tstep,(l-this.cl)/tstep,tstep,0, fn,wh)
  }
}
//main clip obj.
lib_obj.prototype.clip = function(t,r,b,l,ts,rs,bs,ls,tstep,astep,fn,wh){
  
  if(astep<tstep){
    if(wh) eval(wh); 
    astep++
    this.clipBy(ts,rs,bs,ls,1);
    setTimeout(this.obj+".clip("+t+","+r+","+b+","+l+","+ts+","+rs+","
      +bs+","+ls+","+tstep+","+astep+",'"+fn+"','"+wh+"')",50)
  }else{
    this.clipactive=false; this.clipTo(t,r,b,l,1);
    if(fn) eval(fn)
  }
}
//Drag drop functions start *******************
dd_is_active=0; dd_obj=0; dd_mobj=0;dd_zIndex= 0;
lib_obj.prototype.addZ = function(){dd_zIndex++; this.css.zIndex=dd_zIndex}
function lib_dd(){
  dd_is_active=1
  if(brwsr.ns4){
    lib_DOC_OBJ.captureEvents(Event.MOUSEMOVE|Event.MOUSEDOWN|Event.MOUSEUP)
  }
  lib_DOC_OBJ.onmousemove=lib_dd_move;
  lib_DOC_OBJ.onmousedown=lib_dd_down
  lib_DOC_OBJ.onmouseup=lib_dd_up
}
lib_obj.prototype.dragdrop = function(obj){
  if(!dd_is_active) lib_dd()
  this.evnt.onmouseover=new Function("lib_dd_over("+this.obj+")")
  this.evnt.onmouseout=new Function("if(dd_obj == 0){dd_mobj=0}")
  if(obj) this.ddobj=obj
}
lib_obj.prototype.nodragdrop = function(){
  this.evnt.onmouseover=""; this.evnt.onmouseout=""
  dd_obj=0; dd_mobj=0
}
//Drag drop event functions
function lib_dd_over(obj)
{
    if(dd_obj == 0)
    {
    	dd_mobj=obj;
    }

}
function lib_dd_up(e)
{
    dd_obj=0;
    if(!brwsr.ns)
    {
    	document.onselectstart="";
    }
}
function lib_dd_down(e){ //Mousedown
  if(dd_mobj && dd_obj==0){
    
    if(!brwsr.ns)
    {
    	document.onselectstart=new Function ("return false");
    }
	if (e){
		x=(brwsr.ns4 || brwsr.ns6)?e.pageX:event.x||event.clientX
		y=(brwsr.ns4 || brwsr.ns6)?e.pageY:event.y||event.clientY
	}else{
		x= event.x||event.clientX
		y= event.y||event.clientY	
	}
    dd_obj=dd_mobj
    dd_obj.clX=x-dd_obj.x; 
    dd_obj.clY=y-dd_obj.y
    dd_obj.addZ();
    return false;
  }
}
function lib_dd_move(e,y,rresize){ //Mousemove
  if (e){
	  x = (e.pageX)?e.pageX:event.x||event.clientX
	  y = (e.pageY)?e.pageY:event.y||event.clientY
  }else{
	  x = event.x||event.clientX
	  y = event.y||event.clientY
  }
  if(dd_obj){
    nx=x-dd_obj.clX; ny=y-dd_obj.clY
    if(dd_obj.ddobj){dd_obj.ddobj.moveIt(nx,ny)}
    else dd_obj.moveIt(nx,ny)
  }
  if(brwsr.ns) return false
}
//Drag drop functions end *************
lib_obj.prototype.bg = function (color){
	if(brwsr.dom || brwsr.ie4) this.css.backgroundColor=color
	else if(brwsr.ns4) this.css.bgColor=color  
}
objIFRAME.prototype.bg = function (color){
	if(brwsr.dom || brwsr.ie4) this.doc.body.style.backgroundColor=color
	else if(brwsr.ns4) this.css.bgColor=color 
}

function bg(color){
	if(brwsr.dom || brwsr.ie4) this.css.backgroundColor=color
	else if(brwsr.ns4) this.css.bgColor=color  
}
lib_obj.prototype.eraseSelects = function(){
   if(!brwsr.ns4 && !brwsr.ns7)
   {
      if(this.HIDSELECTS){this.showSelects();}
      var e = lib_DOC_OBJ.getElementsByTagName("select");
      this.HIDSELECTS = new Array();
      for(i=0;i<e.length;i++)
      {
      	  curSx = 2+abPosX(e[i]);
      	  curSw = 2+e[i].offsetWidth;
      	  curSy = 2+abPosY(e[i]);
      	  curSh = 2+e[i].offsetHeight;
      	  
      	  if(!this.isInsideDiv(e[i])) {
			if(((this.x>curSx && this.x < (curSx+curSw)) ||(this.x+this.evnt.offsetWidth>curSx&&this.x<curSx))
			 && ((this.y>curSy && this.y < (curSy+curSh))||(this.y+this.evnt.offsetHeight>curSy&&this.y<curSy)))

			{	
			     e[i].vis = e[i].style.visibility;
    		     e[i].style.visibility='hidden';
    		     this.HIDSELECTS[this.HIDSELECTS.length] = e[i];
			}
		}
      }
   }
}
lib_obj.prototype.isInsideDiv = function (objCombo) {
	var i=0;
	var objTemp=objCombo.parentNode;

	while(objTemp){
		if(objTemp.id==this.evnt.id) { return true; }
		objTemp=objTemp.parentNode;
	}
	return false;
}
function abPosX(obj) { return (obj.x) ? obj.x : getAbPos(obj,"Left"); }
function abPosY(obj) { return (obj.y) ? obj.y : getAbPos(obj,"Top"); }
function getAbPos(obj,which) {
 iPos = 0;
 while (obj != null) {
   iPos += parseInt(eval('obj.offset' + which));
  obj = obj.offsetParent;
 }
 return iPos;
}

lib_obj.prototype.showSelects = function()
{
   if(!brwsr.ns4 && !brwsr.ns7)
   {
      e = this.HIDSELECTS;
      for(var i=0;i<e.length;i++)
      {
         e[i].style.visibility=e[i].vis;
      }
    }
}
/////////////////////////////////////////////////////////////////////////////////
function objIFRAME(fID)
{
    var nIframe,naIframe
    if(lib_DOC_OBJ)
    {
    	if(lib_DOC_OBJ.createElement)
    	{
           nIframe = lib_DOC_OBJ.createElement("IFRAME")
           nIframe.setAttribute("id",fID)
           nIframe.setAttribute("name",fID)
           nIframe.setAttribute("frameBorder", 0)
           nIframe.setAttribute("src", "/blankpage.htm");
           lib_DOC_OBJ.body.appendChild(nIframe)
           naIframe = lib_DOC_OBJ.getElementById(fID)
           naIframe.style.position = "absolute"
           naIframe.style.visibility = "hidden"
           naIframe.scrolling="no"
           naIframe.frameborder="0"
	        
        }
        this.evnt = naIframe;
        var selectedFrame;
        if (naIframe.document) {
            selectedFrame = naIframe.document.frames[fID];
        } else {
            selectedFrame = naIframe.contentWindow.frames;
        }
        this.doc = selectedFrame.document;

        this.css=brwsr.dom||brwsr.ie4?this.evnt.style:this.evnt;
	this.ref=brwsr.dom||brwsr.ie4?document:this.css.document;
	this.x=parseInt(this.css.left)||this.css.pixelLeft||this.evnt.offsetLeft||0;
	this.y=parseInt(this.css.top)||this.css.pixelTop||this.evnt.offsetTop||0
	this.w=this.evnt.offsetWidth||this.css.clip.width||
	  this.ref.width||this.css.pixelWidth||0;
	this.h=this.evnt.offsetHeight||this.css.clip.height||
	  this.ref.height||this.css.pixelHeight||0
	this.c=0 //Clip values
	if((brwsr.dom || brwsr.ie4) && this.css.clip) {
	this.c=this.css.clip;
        this.c=this.c.slice(5,this.c.length-1);
	this.c=this.c.split(' ');
	for(var i=0;i<4;i++){this.c[i]=parseInt(this.c[i])}
	}
	this.ct=this.css.clip.top||this.c[0]||0;
	this.cr=this.css.clip.right||this.c[1]||this.w||0
	this.cb=this.css.clip.bottom||this.c[2]||this.h||0;
	this.cl=this.css.clip.left||this.c[3]||0
	this.HIDSELECTS = null;
	this.obj = fID;
        eval(this.obj + "=this")
	return this;
    }	
}

objIFRAME.prototype.writeIt = function(text,startHTML,endHTML)
{
	if(brwsr.ns4)
	{
		if(!startHTML)
		{startHTML=""; endHTML=""}
		this.ref.open("text/html"); 
		this.ref.write(startHTML+text+endHTML);
		this.ref.close()
	}
	else{

                this.doc.open()
                this.doc.write("<body marginwidth='0' marginheight='0' topmargin='0' leftmargin='0'>"+text+"</body>")
                this.doc.close()
        }
}

//Move the bar object to a new position	
objIFRAME.prototype.moveIt = function(x,y)
{
  this.y=y;
  this.x=x;
  this.css.top=y;
  this.css.left=x;
}
//hide bar
  objIFRAME.prototype.hideIt = function()
  {
  	this.css.visibility="hidden";
  	//this.showSelects();
  }
  //show bar
  objIFRAME.prototype.showIt = function()
  {
  	this.css.visibility="visible";
  	//this.eraseSelects();
  }
////////////////////////////////////////////////////////////////////
  
