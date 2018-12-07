//'     $Revision: 6 $

function clsRemoteLocalizer(){
     this.translationPage = getFullWebServerPath("/includes/ASP/remoteBigInternational.asp");
     this.objXMLHTTP = new clsXMLHTTP();
     this.tokensXML = new clsXMLDOM();
     this.translatedXML = new clsXMLDOM();
     this.localizeNode = null;
     this.tokensNode = null;
     this.tokenArray = null;
     this.init();

}

clsRemoteLocalizer.prototype.init = function()
{
    this.localizeNode = this.tokensXML.xmlDoc.createElement("localize");
    this.tokensNode = this.tokensXML.xmlDoc.createElement("tokens");
    this.tokensXML.xmlDoc.appendChild(this.localizeNode);
    this.localizeNode.appendChild(this.tokensNode);
    this.tokenArray = new Array();
}
clsRemoteLocalizer.prototype.addTokens= function(tok)
{

      for(etok=0;etok<tok.length;etok++)
      {
  	     tokenNode = this.tokensXML.xmlDoc.createElement(tok[etok]);
  	     this.tokensNode.appendChild(tokenNode);
      }
}
clsRemoteLocalizer.prototype.addToken= function(tok)
{

      tokenNode = this.tokensXML.xmlDoc.createElement(tok);

      this.tokensNode.appendChild(tokenNode);

}
clsRemoteLocalizer.prototype.sendTokens= function()
{
    this.objXMLHTTP.open("POST",this.translationPage,false);
    this.objXMLHTTP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    this.objXMLHTTP.setRequestHeader("LOCALIZATIONREQUEST",escape(this.tokensXML.getXML()));
    this.objXMLHTTP.setRequestHeader("Content-Length","0");
    this.objXMLHTTP.send();
    this.translatedXML.loadXML(this.objXMLHTTP.responseText());
    translatedTokenNode = this.translatedXML.xmlDoc.childNodes[0].childNodes[0].childNodes
    for(tc = 0;tc<translatedTokenNode.length;tc++)
    {
    	this.tokenArray[translatedTokenNode[tc].nodeName] = unescape(translatedTokenNode[tc].childNodes[0].nodeValue);
    }
    return true;
}
var G_OBJREMOTELOCALIZER = null;
function getLocalizedArrayJS(arrTokens)
{ 
     //alert("called remote localize RS");
    //Check if the global locaizer used for this is created
    G_OBJREMOTELOCALIZER = (G_OBJREMOTELOCALIZER == null?new clsRemoteLocalizer():G_OBJREMOTELOCALIZER);
    //Add the tokens
    G_OBJREMOTELOCALIZER.addTokens(arrTokens);
    //Send The tokens
    G_OBJREMOTELOCALIZER.sendTokens();  
    return G_OBJREMOTELOCALIZER.tokenArray;
}







