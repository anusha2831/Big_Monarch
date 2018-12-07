//'     $Revision: 4 $

function getXMLfromNode(objNode){
	if (objNode.xml){
		return objNode.xml
	}
	else{
		var oSerializer = new XMLSerializer(); 
		return oSerializer.serializeToString(objNode); 
	}
}

function clsXMLDOM(){
	this.xmlDoc = CreateXMLDocumentObject()
}

clsXMLDOM.prototype.getXML = function(){
	if (this.xmlDoc.xml){
		return this.xmlDoc.xml
	}
	else{
		var oSerializer = new XMLSerializer(); 
		return oSerializer.serializeToString(this.xmlDoc); 
	}
}

clsXMLDOM.prototype.loadXML = function(inData){
	if (window.DOMParser){
		var oParser = new DOMParser(); 
		this.xmlDoc = oParser.parseFromString(inData, "text/xml")
	}
	else{
		this.xmlDoc = $.parseXML(inData)
	}
}





function CreateMSXMLDocumentObject () {
    if (typeof (ActiveXObject) != "undefined") {
        var progIDs = [
                        "Msxml2.DOMDocument.6.0", 
                        "Msxml2.DOMDocument.5.0", 
                        "Msxml2.DOMDocument.4.0", 
                        "Msxml2.DOMDocument.3.0", 
                        "MSXML2.DOMDocument", 
                        "MSXML.DOMDocument"
                      ];
        for (var i = 0; i < progIDs.length; i++) {
            try { 
                return new ActiveXObject(progIDs[i]); 
            } catch(e) {};
        }
    }
    return null;
}


function CreateXMLDocumentObject (rootName) {
    if (!rootName) {
        rootName = "";
    }
    var xmlDoc = CreateMSXMLDocumentObject ();
    if (xmlDoc) {
        if (rootName) {
            var rootNode = xmlDoc.createElement (rootName);
            xmlDoc.appendChild (rootNode);
        }
    }
    else {
        if (document.implementation.createDocument) {
            xmlDoc = document.implementation.createDocument ("", rootName, null);
        }
    }
    
    return xmlDoc;
}
