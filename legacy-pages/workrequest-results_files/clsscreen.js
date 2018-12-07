//'     $Revision: 4 $

function clsScreen(document){
        this.docRef = (document?document+".document":"document")
	this.scrollDown = 0
	this.scrollOver = 0
	this.maxWidth   = 0
	this.maxHeight  = 0
}

//updating mouse position
clsScreen.prototype.updatePos = function(){
	this.maxWidth = (brwsr.ns4 || brwsr.ns6)? window.innerWidth+window.pageXOffset : eval(this.docRef+".body.offsetWidth");
	this.maxHeight = (brwsr.ns4 || brwsr.ns6)? window.innerHeight+window.pageYOffset : eval(this.docRef+".body.offsetHeight");
	this.scrollDown = (brwsr.ns4 || brwsr.ns6)? window.pageYOffset : eval(this.docRef+".body.scrollTop");
	this.scrollOver = (brwsr.ns4 || brwsr.ns6)? window.pageXOffset : eval(this.docRef+".body.scrollLeft");
}
