//'     $Revision: 4 $

function browserObj()
{

	this.ver=navigator.appVersion
	this.agent=navigator.userAgent
	this.dom=document.getElementById?1:0;
	this.ie5=(this.ver.indexOf("MSIE 5")>-1 && this.dom && !this.opera5)?1:0;
	this.ie6=(this.ver.indexOf("MSIE 6")>-1 && this.dom && !this.opera5)?1:0;
	this.ie7=(this.ver.indexOf("MSIE 7")>-1 && this.dom && !this.opera5)?1:0;
	this.ie4=(document.all && !this.dom && !this.opera5)?1:0;
	this.ie=(this.ver.indexOf("MSIE ")>-1 && this.dom && !this.opera5 || this.ie4)?1:0;
	this.ns7=(this.dom && !document.insertAdjacentHTML && !this.ie) ?1:0;
	this.ns6=(this.dom && parseInt(this.ver) >= 5 && !this.ie) ?1:0;
	this.ns4=(document.layers && !this.dom && !this.ie)?1:0;
	this.ns=((this.ns4||this.ns6||this.ns7) && !this.ie)?1:0
	this.brwsr=(this.ie||this.ns||this.opera5)
	return this;
}

brwsr = new browserObj();
window.brwsr = brwsr;
