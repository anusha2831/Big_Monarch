//'     $Revision: 3 $

function MousePos(e){
	if(!e)
	{
		this.x = "";
		this.y = "";
		this.scrX = "";
		this.scrY = "";
		this.maxWidth = "";
		this.maxHeight = "";
		this.scrollDown = 0;
		this.scrollOver = 0;
	}
	else{
		this.x=(brwsr.ns4 || brwsr.ns6)? e.pageX : event.x + document.body.scrollLeft || event.clientX + document.body.scrollLeft
		this.y=(brwsr.ns4 || brwsr.ns6)? e.pageY : event.y + document.body.scrollTop ||  event.clientY + document.body.scrollTop
		this.scrX = e.screenX;
	        this.scrY = e.screenY;
		this.maxWidth = (brwsr.ns4 || brwsr.ns6)? window.innerWidth+window.pageXOffset : screen.width + document.body.scrollLeft; 
		this.maxHeight = (brwsr.ns4 || brwsr.ns6)? window.innerHeight+window.pageYOffset : screen.height + document.body.scrollTop;
		this.scrollDown = (brwsr.ns4 || brwsr.ns6)? window.pageYOffset : document.body.scrollTop; 
		this.scrollOver = (brwsr.ns4 || brwsr.ns6)? window.pageXOffset : document.body.scrollLeft;  
	}
}
//updating mouse position
MousePos.prototype.updatePos = function(e){
	this.x = (brwsr.ns4 || brwsr.ns6)? e.pageX : event.x + document.body.scrollLeft||event.clientX + document.body.scrollLeft
	this.y=(brwsr.ns4 || brwsr.ns6)?e.pageY : event.y + document.body.scrollTop || event.clientY + document.body.scrollTop
	this.scrX = e.screenX;
	this.scrY = e.screenY;
	this.maxWidth = (brwsr.ns4 || brwsr.ns6)? window.innerWidth+window.pageXOffset : screen.width + document.body.scrollLeft; 
	this.maxHeight = (brwsr.ns4 || brwsr.ns6)? window.innerHeight+window.pageYOffset : screen.height + document.body.scrollTop; 
	this.scrollDown = (brwsr.ns4 || brwsr.ns6)? window.pageYOffset : document.body.scrollTop; 
	this.scrollOver = (brwsr.ns4 || brwsr.ns6)? window.pageXOffset : document.body.scrollLeft;
}

