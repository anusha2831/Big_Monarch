//'     $Revision: 3 $

function clsXMLHTTP(){
    this.xmlhttp = null;
    this.readyState = null;
    this.responseBody = null;
    this.responseStream = null;
    this.responseText = null;
    this.responseXML = null;
    this.onreadystatechange = null;
    this.status = null;
    this.statusText = null;
    this.abort = null;
    this.getAllResponseHeaders = null;
    this.getResponseHeader = null;
    this.open = null;
    this.send = null;
    this.setRequestHeader = null;
    this.init();
}
clsXMLHTTP.prototype.init = function()
{
    try {

	objXMLHTTP = new XMLHttpRequest();
    }catch(e){
	        //IE test
	        try {

		    objXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");

		}catch(e){
		//End up here if this is an old browser that we dont even support
		    objXMLHTTP = null;

		}
    }
    this.xmlhttp = objXMLHTTP;

    this.readyState = function(){return this.xmlhttp.readyState};
    this.responseBody = function(){return this.xmlhttp.responseBody};
    this.responseStream = function(){return this.xmlhttp.responseStream};
    this.responseText = function(){return this.xmlhttp.responseText};
    this.responseXML = function(){return this.xmlhttp.responseXML};
    this.status = function(){return this.xmlhttp.status};
    this.statusText = function(){return this.xmlhttp.statusText};
    this.abort = function(){return this.xmlhttp.abort};
    //alert(this.xmlhttp.onreadystatechange.toSource());
    this.setRequestHeader= function(strName,strValue){return this.xmlhttp.setRequestHeader(strName,strValue);} 
    this.send = function(strbody)
    {
        if(this.xmlhttp)
        {
        	this.xmlhttp.send(strbody);
        }
    }
    this.onreadystatechange = function(strFunctionName){this.xmlhttp.onreadystatechange = strFunctionName}
    //this.getAllResponseHeaders  = this.xmlhttp.getAllResponseHeaders;
    //this.getResponseHeader = this.xmlhttp.getResponseHeader;
    this.open = function(bstrMethod, bstrUrl, varAsync, bstrUser, bstrPassword){return this.xmlhttp.open(bstrMethod, bstrUrl, varAsync, bstrUser, bstrPassword)}

}



