//'     $Revision: 4 $
function ulinkCollection()
{
    this.criteria = new Array();
    this.session  = new Array();
    this.target = "";
    this.title = "";
}
ulinkCollection.prototype.addCriteria = function(strName, strValue)
{
    if(strName && strValue)
    {
    	this.criteria[this.criteria.length] = new uLinkCriteria(strName,strValue)
    }
}
ulinkCollection.prototype.addSessionCriteria = function(strName)
{
    if(strName)
    {
    	this.session[this.session.length] = new uSessionCriteria(strName)
    }
}
function uLinkCriteria(strCName, strCVal)
{
    this.name  = strCName;
    this.value = strCVal;
    this.type  = "ULL"
}
function uSessionCriteria(strCName)
{
    this.name = strCName;
    this.type = "ULS"
}

var objLinkCollection = new ulinkCollection();
window.objLinkCollection = objLinkCollection;
document.objLinkCollection = objLinkCollection;
