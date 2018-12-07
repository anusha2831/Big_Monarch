//'     $Revision: 4 $

var CONST_POPUPIFRAMEIDTOKEN = "objPopIFramePopUP";
var CONST_IPOP_FORM = 1;
var CONST_IPOP_PROMPT  = 2;
if(!top.frames["main_win_parent"].CONST_POPUPMANAGER)
{
   top.frames["main_win_parent"].CONST_POPUPMANAGER = new clsIFramePopUpManager();
}
var currpopUpManager = top.frames["main_win_parent"].CONST_POPUPMANAGER;
function clsIFramePopUpManager()
{
      this.used = new Array();
      this.unused = new Array();
      this.allframes = new Array();
      this.currCount = 0;
      this.readyState = false;
      //alert("made pop up manager");
}
clsIFramePopUpManager.prototype.remove = function(strIndex)
{
        if(this.used[strIndex])
        {
           //alert("was one in used");
           ////alert("putting into unused");
      	   var retireLayer;
      	   retireLayer = this.used[strIndex]
      	   this.unused[this.unused.length] = retireLayer;
      	   this.used.splice(strIndex,1)

      	        for(x = 0; x < this.used.length;x++)
      	        {
      	    	     this.used[x].usedIndex = x;
      	        }
           //alert("this.unused.length="+this.unused.length);
        }
}
clsIFramePopUpManager.prototype.reuse = function()
{
      ////alert("called reuse");
      var recycleLayer
      recycleLayer = this.unused[this.unused.length-1];
      this.used[this.used.length] = recycleLayer;
      //recycleLayer.LMindex = this.used.length-1
      this.unused.splice(this.unused.length-1,1)
      return recycleLayer;
}
clsIFramePopUpManager.prototype.init = function()
{
     tempWin = window.openIPopUp("/blankpage.htm","","-20","-20","1","1");
     tempWin.close();
     this.readyState = true;

}
clsIFramePopUpManager.prototype.getPopUp = function () {
    var gLayer;
    //alert("gettting popup");
    //alert("this.unused.length="+this.unused.length);


    if (this.unused.length < 1) {
        var tempLayer = new clsIFramePopUp(this);
        this.allframes[this.allframes.length] = tempLayer;
        this.used[this.used.length] = tempLayer;
        tempLayer.popUpIndex = this.currCount;
        tempLayer.usedIndex = this.currCount;
        this.currCount++;
        tempLayer.createIFrame();
        gLayer = tempLayer;
    }
    else if (this.unused.length == 1) {
        //alert("created spare");

        gLayer = this.reuse();
        gLayer.usedIndex = this.used.length - 1;
        gLayer.iframe.style.display = "block";
        gLayer.iframe.style.visibility = "visible";

        var tempLayer = new clsIFramePopUp(this);
        this.allframes[this.allframes.length] = tempLayer;
        this.used[this.used.length] = tempLayer;
        tempLayer.popUpIndex = this.currCount;
        tempLayer.usedIndex = this.currCount;
        this.currCount++;
        tempLayer.createIFrame();
        tempLayer.close();

    }
    else {
        gLayer = this.reuse();
        gLayer.usedIndex = this.used.length - 1;
        //gLayer.iframe.style.height="400px";
        //gLayer.iframe.style.width="400px";
        gLayer.iframe.style.display = "block";
        //gLayer.iframe.style.position="absolute";
        gLayer.iframe.style.visibility = "visible";
    }
    gLayer.closed = false;
    return gLayer;
}

function clsIFramePopUp(objManager)
{
      this.title = "";
      this.type=CONST_IPOP_FORM;
      this.title_maxlength = 0;
      this.manager = objManager;
      this.iframe = null;
      this.parnt = top.frames["main_win_parent"];
      this.parentBody = null;
      this.opener = null;
      this.ID = CONST_POPUPIFRAMEIDTOKEN+this.manager.currCount;
      this.popUpIndex = null;
      this.usedIndex  = null;
      this.loaded = false;
      this.created = false;
      this.frame_window = null;
      this.targetName = null;
      this.URL = null;
      this.closed = false;
      this.width = 1;
      this.height= 1;
      this.top = -1;
      this.left = -1;
      this.window =null;
      this.titleRef = null;
      //this.errObj = new Error();
}
//clsIFramePopUp.prototype.valueOf = function()
//{
//    return this.frame_window;
//}
clsIFramePopUp.prototype.createIFrame = function () {
    if (!this.parnt) {
        throw (new Error("BIG APP ERROR: the frame \"main_win_parent\" does not exist. Could not Create instance of clsIFramePopUp"));
        return false;
    }
    else {
        this.iframe = this.parnt.document.createElement("iframe");
        this.iframe.id = this.ID;
        this.iframe.setAttribute("frameborder", "1")
        if (!brwsr.ns) { this.iframe.style.border = "2px solid #999999"; }
        this.iframe.setAttribute("border", "1");
        this.iframe.setAttribute("bordercolor", "#999999");
        this.iframe.setAttribute("src", "/blankpage.htm");
        this.iframe.style.position = brwsr.ns ? "fixed" : "absolute";
        this.iframe.style.display = "block";
        this.iframe.style.visibility = "visible"
        this.iframe.style.zIndex = "1000";
        this.iframe.setAttribute("name", this.ID);
        if (!this.parentBody) { this.parentBody = this.parnt.document.getElementsByTagName("body")[0]; }
        this.parentBody.appendChild(this.iframe);
        //this.created = true;
        this.parnt.frames[this.ID].location = getFullWebServerPath("/common/popUpControl.asp?popUpName=" + this.ID + "&popUpIndex=" + this.popUpIndex);
    }
}
clsIFramePopUp.prototype.completeIFrame = function()
{

    this.iframe.style.top = this.top;
    this.iframe.style.left = this.left;
    this.iframe.style.width = this.width;
    this.iframe.style.height = this.height
    this.title_maxlength = Math.round((this.width-50)/8);

}
clsIFramePopUp.prototype.frameLoadComplete = function()
{
    this.loaded = true;
    this.completeIFrame();
    this.iframe.setAttribute("name",(this.targetName?this.targetName:this.ID));
    this.iframe.setAttribute("ID",(this.targetName?this.targetName:this.ID));
    if(this.URL && this.URL != this.frame_window.document.location.href )
    {
    	this.frame_window.document.location.href=this.URL;
    }
    //this.frame_window.iopener = this.opener;
    //this.frame_window.iparent = this.parent;
    //alert("frameloadComplete "+this.frame_window.iopener);
    if(this.title){this.setTitle(this.title);}
}
clsIFramePopUp.prototype.internalDocLoad = function()
{
    this.titleRef= this.parnt.frames[this.ID].frames[0].document.getElementById("popUpTitle");
    //top.frames["main_win_parent"].frames[this.ID].frames[1].iopener = this.opener;
    //top.frames["main_win_parent"].frames[this.ID].frames[1].iparent = this.parent;
    this.frame_window = this.parnt.frames[this.ID].frames[1];
    this.window = this.frame_window;
    this.created = true;
    this.completeIFrame();
}

clsIFramePopUp.prototype.close = function()
{
     //alert("close");
     this.iframe.style.visibility = "hidden";
     this.iframe.style.width="1";
     this.iframe.style.height="1";
     this.iframe.style.top="-20";
     this.iframe.style.left="-20";
     this.closed = true;
     this.manager.remove(this.usedIndex);
     if(this.titleRef)
     {
     	this.titleRef.innerHTML = "";
     	this.titleRef.setAttribute("title","");
     }
     if(this.type==CONST_IPOP_PROMPT)
     {
     	tempdiv = this.parnt.document.getElementById("iPopUpPROMPT_DISABLE");
        //tempdiv.style.height=1;
        //tempdiv.style.width=1;
        tempdiv.style.position=(brwsr.ns)? "fixed" : "absolute";
        tempdiv.style.left="-2"
        tempdiv.style.top="0"
        tempdiv.style.zIndex = 0;
        tempdiv.style.display ="none";
     }
     if(this.frame_window)
     {
        this.frame_window.document.location = "/blankpage.htm";
     }
}
clsIFramePopUp.prototype.moveTo = function(strLeft,strTop)
{
     if(isNaN(strLeft))
     {
     	throw(new Error("BIG APP ERROR: (clsIFramePopUp.moveTo) Invalid Argument, strLeft is not a Number. Could not move window."));
     	return false;
     }
     else if(isNaN(strTop))
     {
     	throw(new Error("BIG APP ERROR: (clsIFramePopUp.moveTo) Invalid Argument, strTop is not a Number. Could not move window."));
     }
     else{
        this.left = strLeft;
        this.top =  strTop;
        this.iframe.style.left = this.left;
        this.iframe.style.top = this.top;
        return true;
     }
}
clsIFramePopUp.prototype.resizeTo = function(strWidth,strHeight)
{
     if(isNaN(strWidth))
     {
     	throw(new Error("BIG APP ERROR: (clsIFramePopUp.moveTo) Invalid Argument, strWidth is not a Number. Could not move window."));
     	return false;
     }
     else if(isNaN(strHeight))
     {
     	throw(new Error("BIG APP ERROR: (clsIFramePopUp.moveTo) Invalid Argument, strHeight is not a Number. Could not move window."));
     }
     else{
        this.width = strWidth;
        this.height =  strHeight;
        this.iframe.style.width = this.width;
        this.iframe.style.height = this.height;
        this.title_maxlength = Math.round((this.width-50)/8);
        this.setTitle(this.title);
        return true;
     }
}
clsIFramePopUp.prototype.setTitle = function(strTitle)
{
     this.title = strTitle;
     this.titleRef.innerHTML = this.title.substr(0,this.title_maxlength)+(this.title.length >this.title_maxlength ? "...":"");
     this.titleRef.setAttribute("title",this.title);
}

this.openIPopUp = function (strURL, strName, strTop, strLeft, strWidth, strHeight, strTitle) {
    var tempIFrameObj = currpopUpManager.getPopUp();
    if (strURL) { tempIFrameObj.URL = strURL; }
    if (strTop) { tempIFrameObj.top = strTop; }
    if (strLeft) { tempIFrameObj.left = strLeft; }
    if (strWidth) { tempIFrameObj.width = strWidth; }
    if (strHeight) { tempIFrameObj.height = strHeight; }
    if (strTitle) { tempIFrameObj.title = strTitle; }
    if (strName) { tempIFrameObj.targetName = strName; }
    tempIFrameObj.opener = this;
    tempIFrameObj.parent = this;
    //alert(this.name);

    if (tempIFrameObj.created == true) {
        tempIFrameObj.frameLoadComplete();
    }
    return tempIFrameObj;
}

this.openIPopUp_PROMPT = function(strURL,strName,strTop,strLeft,strWidth,strHeight,strTitle)
{
     var tempIFrameObj = currpopUpManager.getPopUp();
     if(strURL){tempIFrameObj.URL = strURL;}
     if(strTop){tempIFrameObj.top = strTop;}
     if(strLeft){tempIFrameObj.left = strLeft;}
     if(strWidth){tempIFrameObj.width = strWidth;}
     if(strHeight){tempIFrameObj.height = strHeight;}
     if(strTitle){tempIFrameObj.title = strTitle;}
     if(strName){tempIFrameObj.targetName = strName;}
     tempIFrameObj.opener = this;
     tempIFrameObj.parent = this;
     tempIFrameObj.type = CONST_IPOP_PROMPT;
     //alert(this.name);

     if(tempIFrameObj.created == true)
     {
     	tempIFrameObj.frameLoadComplete();
     }
     tempdiv = tempIFrameObj.parnt.document.getElementById("iPopUpPROMPT_DISABLE");
     //tempdiv.style.height=screen.width*2;
     //tempdiv.style.width=screen.height*2;
     if(brwsr.ns){tempdiv.style.position="fixed";}
     //tempdiv.style.left="0"
     //tempdiv.style.top="0"
     tempdiv.style.display ="inline";
     setTimeout("tempdiv.style.zIndex = 990;",300);
     return tempIFrameObj;
}


