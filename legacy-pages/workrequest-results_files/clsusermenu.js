//'     $Revision: 11 $
var objMenuTrans = null;
var blMenuTrans = false;
function translateUserMenu()
{
     objMenuTrans  = new init_ClientSideTranslation('objMenuTrans','ADM-H140,ADM-H139,ADM-H136,ADM-H137,ADM-H138',transMenuComplete);
}
function transMenuComplete()
{
     blMenuTrans = true;
}

function clsUserMenu(menuText, obj, xPos,yPos){
         scrObj = new clsScreen();
         this.scrRef = scrObj;//reference to the screen object
         this.menu = ""
         this.x = (!xPos ? 1 : xPos)
         this.y = (!yPos ? 1 : yPos)
         this.menuText = menuText; //title displayed on the menu
         this.obj = obj; //reference to actual variable name of the menu
         this.items  = new Array(); //menu items stored here
         this.groups = new Array();
         this.count = 0;
         //eval(this.obj + "=this")
}
//---------------------------------------
//clsUMenuLink
//strUrl = the url for the menu item
//strText = the text to display on menu
//strTarget = optional target for link(self by default)
//strGroup = optional existing clsMenuGroup
//strClass = CSS class identifier
//------------------------------------


function clsUMenuGroup(strName,strDisplay,blSys){
         this.name  = strName;
         this.display = strDisplay;
         this.items = new Array();
         this.count = 0;
         this.system = !blSys?false:true;
}
clsUserMenu.prototype.addMenuGroup = function(strVarName, strDisplay,blSystem)
{
        var nGroup
         if(blSystem == true && this.groups.length > 0)
         {
         	tempGroup = this.groups[0];
         	this.groups[this.groups.length] = tempGroup;
         	this.groups[0] = new clsUMenuGroup(strVarName, strDisplay,blSystem);
         	nGroup = this.groups[0]
         }
         else{
             	this.groups[this.groups.length] = new clsUMenuGroup(strVarName, strDisplay,blSystem)
             	nGroup = this.groups[this.groups.length-1]
         }
         this[strVarName] = nGroup;
}
clsUMenuGroup.prototype.addMenuLink = function(strID,strUrl, strText, strTarget,strExternal)
{
        if(!strUrl||!strText)
	{
		return false;
	}
	else{
	    	if(strID==""||strID==null){strID = this.items.length}
	    	this.items[this.items.length] = new clsUMenuLink(strID,strUrl, strText, strTarget,strExternal)
	    	//this.count++;
	}
}
clsUMenuGroup.prototype.getLinks = function()
{
        var x, strOutput
        strOutput = "<table width=\"100%\" height=\"100%\" cellspacing=\"0\" cellpadding=\"2\" border=\"0\"><tr><td colspan=\"2\" class=\"UMGroupHeader\">"+this.display+"</td></tr>";
        if(this.items.length > 0)
        {
          for(x = 0; x < this.items.length; x++)
          {
                if(this.items[x].external)
                {
                	strOutput +="<tr><td width=\"5%\" class=\"UMLinkEX\">&#187;</td><td width=\"95%\" class=\"UMLinkEX\"><a onclick=\"parent.parent.frames['framComToolbar'].openMenu()\" class='clsUML' href=\""+this.items[x].url+"\" "+this.items[x].CSS+" "+this.items[x].URLtarget+">"+this.items[x].text+"</a></td></tr>";
                }
                else{
                    	strOutput +="<tr><td width=\"5%\">&#187;</td><td width=\"95%\" class=\"UMLink\"><a onclick=\"parent.parent.frames['framComToolbar'].openMenu()\" class='clsUML' href=\""+this.items[x].url+"\" "+this.items[x].CSS+" "+this.items[x].URLtarget+">"+this.items[x].text+"</a></td></tr>";
                }
                this.count++
          }
        }
        else{
                strOutput +="<tr><td width=\"5%\">&nbsp;</td><td class=\"UMLink\">&nbsp;</td></tr>";
                this.count++;
        }
        strOutput+="</table>"
        this.count++
        return strOutput;
}
function clsUMenuLink(strID,strUrl, strText, strTarget,blExternal)
{
         this.ID = strID;
         this.url = strUrl;
         this.text = strText;
         this.URLtarget = (!strTarget || strTarget == "" ? "target='_self'" : "target='"+strTarget+"'");
         this.external = (blExternal) ? blExternal : false;
         //this.group = (!strClass ? "" : "class='"+strClass+"'");

}
clsUserMenu.prototype.addMenuLink = function(strID,strUrl, strText, strTarget, strExternal)
{
	if(!strUrl||!strText)
	{
		return false;
	}
	else{
	    	if(!strID){strID = this.items.length}
	    	this.items[this.items.length] = new clsUMenuLink(strID,strUrl, strText, strTarget,strExternal)
	}
}

clsUserMenu.prototype.drawMenu = function()
{

 var menuFace ="<table cellspacing=\"1\" cellpadding=\"0\" border=\"0\" width=\"100%\" height=\"100%\"><tr>"
 menuFace +=   "<td valign=\"top\" align=\"center\"><table class='clsUserMenuFace' cellspacing='3' cellpadding='2' border='0' width='100%' valign='top' align=\"center\">"
 menuFace +="   <tr><td class='UM'>"+this.menuText+"</td></tr>"
 for(x = 0; x < this.groups.length; x++)
 {
 	menuFace += "<tr><td class=\"UMGroup\">" + eval("this."+this.groups[x].name+".getLinks();") + "</td></tr>"
 	this.count+=eval("this."+this.groups[x].name+".count+1")
 	eval("this."+this.groups[x].name+".count=0")
 	if(this.groups[x].system == true && x+1 > this.groups.length && this.groups[x+1].system == false){menuFace += "<tr><td class=\"UMLink\"><hr class=\"UMGroup\" NOSHADE size=\"1\" width=\"100%\"></td></tr>";}
 }
 for(x=0; x<this.items.length;x++)
 {
 	if(this.items[x].external)
        {

        	menuFace+="<tr><td class=\"UMLinkEX\"><a onclick=\"parent.parent.frames['framComToolbar'].openMenu()\" class='clsUML' href=\""+this.items[x].url+"\" "+this.items[x].URLtarget+">"+this.items[x].text+"</a></td></tr>";
        }
        else{
            	menuFace+="<tr><td class=\"UMLink\"><a onclick=\"parent.parent.frames['framComToolbar'].openMenu()\" class='clsUML' href=\""+this.items[x].url+"\" "+this.items[x].URLtarget+">"+this.items[x].text+"</a></td></tr>";
        }

        this.count++;
 }
 menuFace +="</table></td></tr></table>"
 document.getElementsByTagName("BODY")[0].innerHTML=("<body marginheight=\"0\" marginwidth=\"0\" topmargin=\"0\" leftmargin=\"0\" class=\"UM\">"+menuFace+"</body>");
}
var addLWin = 0
document.addLWin = addLWin;
var addUM_LINK = "";
document.addUM_LINK  = addUM_LINK;
var addUM_TITLE = ""
document.addUM_TITLE = addUM_TITLE;
var addUM_COLLREF = "";
document.addUM_COLLREF = addUM_COLLREF;
clsUserMenu.prototype.addUMFavorite = function()
{
	if (!parent.window.frames["main_win"].UserMenuPreventLinking){
		addUM_LINK = parent.window.frames["main_win"].document.location.href;
		addUM_TITLE = (parent.window.frames["main_win"].document.title && parent.window.frames["main_win"].document.title != "") ? parent.window.frames["main_win"].document.title : parent.window.frames["main_win"].document.location.pathname ;
		addUM_COLLREF = parent.window.frames["main_win"].objLinkCollection ? parent.window.frames["main_win"].objLinkCollection : "";
		if(addUM_TITLE.indexOf("/") != -1)
		{
			tempArr = addUM_TITLE.split("/")
			addUM_TITLE = tempArr[tempArr.length-1];
		}
		var tempWin = parent.parent.frames['main_win_parent'].document.getElementById("frmPopWin")
		tempWin.src = webserverPath_JS + "/USER/umAddFavorite.asp";
		tempWin.style.left = "40%";
		tempWin.style.top = "20%";
		tempWin.style.width = "400px";
		tempWin.style.height = "330px";
		tempWin.style.border = "1px solid #666666";
		tempWin.style.visibility = "VISIBLE";
		tempWin.style.zIndex ="700";
	}
	else {
		alert(strCannotLink)
	}

}
clsUserMenu.prototype.addEXFavorite = function()
{
     addUM_LINK = parent.window.frames["main_win"].document.location.href;
     addUM_TITLE = (parent.window.frames["main_win"].document.title && parent.window.frames["main_win"].document.title != "") ? parent.window.frames["main_win"].document.title : parent.window.frames["main_win"].document.location.pathname ;
     addUM_COLLREF = parent.window.frames["main_win"].objLinkCollection ? parent.window.frames["main_win"].objLinkCollection : "";
     if(addUM_TITLE.indexOf("/") != -1)
     {
     	tempArr = addUM_TITLE.split("/")
        addUM_TITLE = tempArr[tempArr.length-1];
     }
     var tempWin = parent.parent.frames['main_win_parent'].document.getElementById("frmPopWin")
     tempWin.src = webserverPath_JS + "/USER/UMAddExternalFavorite.asp";
     tempWin.style.left = "40%";
     tempWin.style.top = "20%";
     tempWin.style.width = "400px";
     tempWin.style.height = "380px";
     tempWin.style.border = "1px solid #666666";
     tempWin.style.visibility = "VISIBLE";
     tempWin.style.zIndex ="300";
}
clsUserMenu.prototype.organizeUMFavorite = function()
{
     var tempWin = parent.parent.frames['main_win_parent'].document.getElementById("frmPopWin")
     tempWin.src = webserverPath_JS + "/User/umOrganizeFavorites.asp";
     tempWin.style.left = "40%";
     tempWin.style.top = "20%";
     tempWin.style.width = "400px";
     tempWin.style.height = "300px";
     tempWin.style.border = "1px solid #666666";
     tempWin.style.visibility = "VISIBLE";
     tempWin.style.zIndex ="300";
}



function scrollM(){
        window.userMenu.scrRef.updatePos();
        window.userMenu.menu.moveIt((window.userMenu.x+window.userMenu.scrRef.scrollOver) ,(window.userMenu.y+window.userMenu.scrRef.scrollDown));
}
clsUserMenu.prototype.userMClick = function(){
        clearInterval(scrollInterval);
        var newX, newY
        this.scrRef.updatePos();
        this.drawMenu();
        if((this.menu.x+200)>this.scrRef.maxWidth)
        {
           newX = this.scrRef.maxWidth-200-5
        }
        else{
           newX = this.menu.x;
        }
        if((this.menu.y+((this.items.length*23)+this.menu.h))>this.scrRef.maxHeight)
        {
           newY = this.menu.y -((this.menu.y+((this.items.length*23)+this.menu.h))- this.scrRef.maxHeight)
        }
        else{
           newY = this.menu.y;
        }
        this.menu.eraseSelects();
        this.menu.moveIt(newX,newY)
        this.menu.clipTo(0,200,((this.count*this.menu.h)+this.menu.h),0,30000);
}

document.userMenu = new clsUserMenu("", "userMenu");
window.userMenu = userMenu;
var userMenu = document.userMenu
