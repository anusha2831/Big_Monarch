//  $Revision: 34 $
//  $Modtime: 1/09/13 2:48p $
//  $Archive: /Website/Main/Web01/Includes/JS/clientScript.js $
//  $Author: Rherrmann $
//  $Date: 1/10/13 1:01p $
// 	$CSC: 0 $
// 	$Churn: 0 $
// 	$CRB: 0 $
//	$Projects: 0 $
// 	$RCM: 0 $
//	$Common: 0 $
//	$Includes: 0 $
//	$System: 0 $
//	$DB: 44 $
//	$PDF: 0 $
//	$MAP: 0 $

/************************************
	Start Browser ID;
************************************/
var IE4 = false;
var NN4 = false;
checkBrowser();


function checkBrowser() {
	if (document.all) {
		IE4 = true;
		NN4 = false;
	}else{
		if (document.layers) {
			IE4 = false;
			NN4 = true;
		}else{
			return false;
		}
	}
	//alert(IE4)
	//alert(NN4)
	return true;
}

	/*
	var s = '';
	for (id in window.navigator) {
		s += id + ' ' + window.navigator[id] + '\n';
	}
	alert(s);
	*/
/************************************
	End Browser ID;
************************************/

/************************************
	Start String Manipulation Functions;
************************************/
setStringMethods();
function setStringMethods() {
//--- Method returns true if a string ends in with the value of w;
String.prototype.endsWith = function(w){
	var s = "";
	var l = w.length;
	for (var i = l; i >= 0; i--){
		s += this.charAt(this.length-i);
	}
	return (s == w);
}

//--- Cut off the end of a string by value of i;
String.prototype.sliceLast = function(i){
	return this.slice(0,this.length-i);
}

//--- Cut off the beginning of a string by the value of i;
String.prototype.sliceFirst = function(i){
	return this.slice(i);
}

//--- Trim whitespace from beginning and end of a string;
String.prototype.trim = function(){
	  var s = this;
	  return s.replace(/^ +/,'').replace(/ +$/,'');
	}
}

function removeLastWord(sString,sWord) {
	var iLen = sWord.length;
	sString = sString.trim();
	if (sString.endsWith(sWord)){
		sString = sString.sliceLast(iLen);
	}
	return sString;
}


/************************************
	End String Manipulation Functions;
************************************/




/************************************
	Start Object Constructors;
************************************/
function buildObjects(arrayData, objectType, objectName) {
	var objectObject = new Object();
	var sArguments;
	var sExpression;
	for (var i = 0; i < arrayData.length; i++){
		sArguments = "'" + arrayData[i].join() + "'";
		sArguments = sArguments.replace(/\,/g,"','");
		sExpression = "new " + objectType + "(" + sArguments + ")";
		objectObject[objectName + i] = eval(sExpression);
	}
	return objectObject;
}

function buildAssocArray(arrayData) {
	var objectObject = new Object();
	var sArguments;
	var sExpression;
	for (var i = 0; i < arrayData.length; i++){
		objectObject[arrayData[i]] = 1;
	}
	return objectObject;
}

/************************************
 		End Object Constructors;
************************************/

/************************************
 		Start Form Functions;
************************************/
//---Simple move of selected options in a dropdown (intended for multi-select) to the top of the list
function ClientScriptJS_MoveSelectedDropdownOptionsToTop(objDropdown) {
    var arrOptionsSelected = new Array()
    var arrOptionsUnSelected = new Array()

    for (var count = 0; count < objDropdown.options.length; count++) {
        if (objDropdown.options[count].selected) {
            arrOptionsSelected[arrOptionsSelected.length] = new Array(objDropdown.options[count].value, objDropdown.options[count].text)
        }
        else {
            arrOptionsUnSelected[arrOptionsUnSelected.length] = new Array(objDropdown.options[count].value, objDropdown.options[count].text)
        }
    }

    objDropdown.options.length = 0

    for (var count = 0; count < arrOptionsSelected.length; count++) {
        var newOption = new Option()
        newOption.value = arrOptionsSelected[count][0]
        newOption.text = arrOptionsSelected[count][1]
        newOption.selected = true
        objDropdown.options[objDropdown.options.length] = newOption
    }

    for (var count = 0; count < arrOptionsUnSelected.length; count++) {
        var newOption = new Option()
        newOption.value = arrOptionsUnSelected[count][0]
        newOption.text = arrOptionsUnSelected[count][1]
        objDropdown.options[objDropdown.options.length] = newOption
    }
}

//---Add an Option to a select box;
function addOption(sFormField, sOptionValue, sOptionText) {
	if (sFormField) {
		var newOption  = new Option(sOptionText,sOptionValue);
		var iLen = sFormField.options.length;
		sFormField.options[iLen] = newOption;
		return newOption;
	}
}
	
	
//---Clear All Select Box Options;
function clearOptions(sFormField) {
    if (sFormField) {
        if (sFormField.options) {
            sFormField.options.length = 0;
        }
    }
    try
    {
        while (sFormField.hasChildNodes()) {
            sFormField.removeChild(sFormField.firstChild);
        }
    }
    catch(ex)
    {

    }
}

//---Clear A Select Box Option;
function removeOption(sFormField, theText) {
	var iLen = sFormField.options.length;
	var thisOption;
	var thisID;
	for (var i = 0; i < iLen; i++) {
		if (sFormField.options[i]) {
		thisOption = sFormField.options[i].text;
		thisID = sFormField.options[i].index;
			if (thisOption == theText) {
				if (NN4) { sFormField.options[thisID] = null; }
				if (IE4) { sFormField.remove(thisID); }
			}
		}else{
			return false;
		}
	}
}

// Moves 1 to many selected items from one list to another.
function MoveItems(objDeleteFrom, objAddTo) {
	for (i=0;i<objDeleteFrom.length;i++) {
		if (objDeleteFrom[i].selected) {
		    objAddTo.length++;
			objAddTo[objAddTo.length - 1].value = objDeleteFrom[i].value;
			objAddTo[objAddTo.length - 1].text = objDeleteFrom[i].text;
			MoveDataAttributes(objDeleteFrom[i], objAddTo[objAddTo.length - 1]);
			objDeleteFrom[i] = null;
			i = i - 1;
		}
	}
}

function MoveDataAttributes(fromOption, toOption) {
    $.each(fromOption.attributes, function (i, att) {
        if(att.name.indexOf("data-") === 0)
        {
            $(toOption).attr(att.name, $(fromOption).attr(att.name));
        }
    });
}

// Moves all items from one list to another.
function MoveAllItems(objDeleteFrom, objAddTo)
{
	for (i=0;i<objDeleteFrom.length;i++) {
			objAddTo.length++;
			objAddTo[objAddTo.length - 1].value = objDeleteFrom[i].value;
			objAddTo[objAddTo.length - 1].text = objDeleteFrom[i].text;
			MoveDataAttributes(objDeleteFrom[i], objAddTo[objAddTo.length - 1]);
			objDeleteFrom[i] = null;
			i = i - 1;
	}
}

function ChangeOption(objCombo, strText, strValue, lngIndex) {
	if(objCombo) {
		if(objCombo.length > lngIndex) {
			objCombo.options[lngIndex].text=strText;
			objCombo.options[lngIndex].value=strValue;
		}
	}
}

function buildArray(sData) {
	if(sData){
		var rowDelim = '^@^'; //String.fromCharCode(167) //alt + 0167;
		var colDelim = '!@!'; //String.fromCharCode(254) //alt + 0254;
		var sArrayInfo = sData.split(rowDelim);
		var rsArray = new Array();
		for (var i = 0; i < sArrayInfo.length - 1; i++){
			var xArray = sArrayInfo[i].split(colDelim);
			rsArray[i] = xArray;
		}
	}else{
		rsArray = new Array();
	}
	return rsArray;
}


//---Pass in a 2-D array as [optionValue][optionText];
function buildOptionList(aData) {
	var thisOption;
	var theValue;
	var theText;
	var theOptionList = '';
	for (var i = 0; i < aData.length; i++) {
		thisOption = aData[i];
		theValue = thisOption[0];
		theText = thisOption[1];
		theOptionList += "<option value='" + theValue + "'>" + theText + "</option>";
	}
	return theOptionList;
}

//---Gets the value of the selected radio button in a group;
function getRadioValue(oRadioSet) {
	var sValue = '';
	if (oRadioSet.length) {
		for (var i = 0; i < oRadioSet.length; i++) {
			if (oRadioSet[i].checked) {
				sValue = oRadioSet[i].value;
				break;
			}
		}
	} else {
		sValue = oRadioSet.value;
	}
	return sValue;
}


function CreateHiddenTextElement(oHidden,sElementAttribute,sAddToElement) {
	var strInList = '';
	var oDiv = '';
	
	if(!sElementAttribute || sElementAttribute.length==0) {sElementAttribute='text';}
	if(!sAddToElement || sAddToElement.length==0) {
		if(document.getElementById('divHidden')) {
			oDiv = document.getElementById('divHidden');
		}
		else if(document.forms[0]) {
			oDiv = document.createElement('div');
			oDiv.setAttribute('id','divHidden');
			oDiv.setAttribute('name','divHidden');
			oDiv.style.height = 0;

			document.forms[0].appendChild(oDiv);
		}
		else {
			return;
		}
	}
	else {
		oDiv = document.getElementById(sAddToElement);
	}

	if(oHidden) {
		strInList = GetAttributes(oHidden,sElementAttribute);

		oDiv.innerHTML += '<input type=hidden name="' + oHidden.name + '_' + sElementAttribute + '" id="' + oHidden.name + '_' + sElementAttribute + '" value="' + strInList + '">';
	}
}

function GetAttributes(FormObject,sElementAttribute) {
	var strData = '';
	if(!FormObject) {return '';}
	if(!sElementAttribute || sElementAttribute.length==0) {sElementAttribute='text';}

	if(FormObject.type=='select-one'||FormObject.type=='select-multiple') {
		strData = GetListboxAttributes(FormObject,sElementAttribute);
	}
	else if(FormObject.type=='radio') {
		strData = GetRadioAttributes(FormObject,sElementAttribute);
	}
//	else if(FormObject.type=='checkbox') {
//		strData = GetCheckboxAttributes(FormObject,sElementAttribute);
//	}
	else {
		strData = GetListboxAttributes(FormObject,sElementAttribute);
	}
	return strData;
}

function GetRadioAttributes(oOption, sElementAttribute) {
    var sReturn = '';
    if (oOption) {
        if ($('input[name=' + oOption.name + ']:checked').attr(sElementAttribute) != null) {
            sReturn = $('input[name=' + oOption.name + ']:checked').attr(sElementAttribute);
        }
    }
    return sReturn;
}

function GetListboxAttributes(objInList,sElementAttribute) {
	var lngLoop=0;
	var strInList='';
	if(!sElementAttribute || sElementAttribute.length==0) {sElementAttribute='text';}
	
	if(objInList) {
		if(objInList.options) {
			for(lngLoop=0;lngLoop<objInList.options.length;lngLoop++) {
				if(objInList.options[lngLoop].selected==true) {
					// could not get getAttribute('text') to work.
					strInList += eval('objInList.options[lngLoop].' + sElementAttribute) + ', '
				}
			}
		}
	}
	if(strInList.length > 0) {
		strInList = strInList.substr(0, strInList.length - 2);
	}
	
	return strInList;
}

/************************************
 		End Form Functions;
************************************/

/************************************
 		Start Date Functions;
************************************/

//---Return Total Years; Total Months; Total Days; Total Hours; Total Minutes; Total Seconds; between dates;
function dateDiff(dDate1, dDate2, sReturnType) {
	dDate1 = new Date(dDate1); 
	dDate2 = new Date(dDate2);
	var oDate = new Object();	
	var thisDate1 = dDate1.getDate();
	var thisMonth1 = dDate1.getMonth();
	var thisYear1 = dDate1.getFullYear();	

	var thisDate2 = dDate2.getDate();
	var thisMonth2 = dDate2.getMonth();
	var thisYear2 = dDate2.getFullYear();	
	var newEndDate = new Date((thisMonth2+1)+'/'+(thisDate2+1)+'/'+thisYear2);
	thisMonth2 = newEndDate.getMonth();
	thisDate2 = newEndDate.getDate();
	thisYear2 = newEndDate.getFullYear();

	oDate.Years = thisYear2 - thisYear1 - 1;
	if (thisMonth2 > thisMonth1 || (thisMonth2 == thisMonth1 && thisDate2 > (thisDate1 - 1))) { oDate.Years++; }

	oDate.Months = thisMonth2 - thisMonth1 - 1;	
	if (oDate.Months < 0) { oDate.Months = 12 + oDate.Months; }
	if (thisDate2 > thisDate1 - 1) { oDate.Months++; }
	if(oDate.Months == 12) { oDate.Months = 0; }
	
	oDate.Days = thisDate2 - thisDate1;
	if (oDate.Days < 0) { 
		var tempYear2 = thisYear2;
		var tempMonth2 = thisMonth2 - 1;
	
		if ( tempMonth2 < 0) {
			tempMonth2 = 11;
			tempYear2--;
		}
		var theFirstOfMonth2 = new Date(thisYear2, thisMonth2 , 1);
		var theFirstBeforeMonth2 = new Date(tempYear2, tempMonth2, 1);
		var tempDays = Math.round((theFirstOfMonth2.getTime() / (1000 * 60 * 60 * 24)) - (theFirstBeforeMonth2.getTime() / (1000 * 60 * 60 * 24)));
		oDate.Days = tempDays + oDate.Days;
	}
	oDate.Seconds = Math.round((dDate2.getTime() - dDate1.getTime()) / 1000);
	oDate.Minutes = Math.round(oDate.Seconds / 60);
	oDate.Hours = Math.round(oDate.Minutes / 60);
	oDate.Days = Math.round((dDate2.getTime() - dDate1.getTime()) / (1000 * 60 * 60 * 24));


/* Added to function to calculate term of lease - JB 23/5/02
	var newEndDate = new Date((thisMonth2+1)+'/'+(thisDate2+1)+'/'+thisYear2);
	var newEndmonth = newEndDate.getMonth();
	var newEndday = newEndDate.getDate();
	var newEndyear = newEndDate.getFullYear();
	var years = newEndyear - thisYear1;
	var months = (newEndmonth - thisMonth1);
	var days = (newEndday - thisDate1);

	if (months<0) {
		years--;
		months += 12;
	} else if (days<0) {
		years--;
		months = 11;
		var newStartDate = new Date((thisMonth1)+'/'+thisDate1+'/'+thisYear2);
		days = (dDate2 - newStartDate)/86400000;
	}
	oDate.LSYears = years;
	oDate.LSMonths = months;
	oDate.LSDays = days;
*/
	var newStartDate = new Date((thisMonth1+oDate.Months+1)+'/'+(thisDate1)+'/'+(thisYear1+oDate.Years));
	newStartDate.setDate(newStartDate.getDate() - 1);

	oDate.LSDays = (dDate2 - newStartDate) / 86400000;

// End add - JB 23/05/02
	switch (sReturnType) {
		case 'LSDays':
			return oDate.LSDays;
			break;
		case 'Years':
			return oDate.Years;
			break;
		case 'Months':
			return oDate.Months;
			break;
		case 'Days':
			return oDate.Days;
			break;
		case 'Hours':
			return oDate.Hours;
			break;
		case 'Hours:Minutes':
			var iMinutes = (oDate.Minutes - (oDate.Hours * 60));
			var iHours = oDate.Hours;
			if (iMinutes < 0) {
				iMinutes = (60 + iMinutes);
				iHours--;
			}
			iMinutes = (iMinutes < 10) ? '0' + iMinutes: iMinutes;
			return iHours + ":" + iMinutes;
			break;
		case 'Minutes':
			return oDate.Minutes;
			break;
		case 'Seconds':
			return oDate.Seconds;
			break;
		case 'All':
			return oDate;		
			break;
	}
}

function dateFormat(dDate, sFormat) {
	if (! dDate) {
		return dDate;
	}
	dDate = new Date(dDate);
	var sResult = '';
	var thisMonth = ((dDate.getMonth() + 1) < 10) ? '0' + (dDate.getMonth() + 1) : (dDate.getMonth() + 1);
	var thisDate = (dDate.getDate() < 10) ? '0' + dDate.getDate() : dDate.getDate();
	var thisYear = dDate.getFullYear();
	var thisHour = (dDate.getHours() < 10) ? '0' + dDate.getHours() : dDate.getHours();
	var thisMinute = (dDate.getMinutes() < 10) ? '0' + dDate.getMinutes() : dDate.getMinutes();
	var thisSecond = (dDate.getSeconds() < 10) ? '0' + dDate.getSeconds() : dDate.getSeconds();
	switch (sFormat) {
		case 'MM/DD/YYYY':
			sResult += thisMonth;
			sResult += "/" + thisDate;
			sResult += "/" + thisYear;
			break;
		case 'MM/YYYY':
			sResult += thisMonth;
			sResult += "/" + thisYear;
			break;
		case 'MM/DD':
			sResult += thisMonth;
			sResult += "/" + thisDate;
			break;
		case 'MM/DD/YYYY HH:MM':
			sResult += thisMonth;
			sResult += "/" + thisDate;
			sResult += "/" + thisYear;
			sResult += ' ' + thisHour;
			sResult += ':' + thisMinute;
			break;
		case 'MM/DD/YYYY HH:MM:SS':
			sResult += thisMonth;
			sResult += "/" + thisDate;
			sResult += "/" + thisYear;
			sResult += ' ' + thisHour;
			sResult += ':' + thisMinute;
			sResult += ':' + thisSecond;
			break;
		case 'DD-MMM-YYYY':
			sResult += thisDate;
			sResult += "-" + dateName(dDate , 'Month-3-Upper');
			sResult += "-" + thisYear;
			break;
		case 'MMM-YYYY':
			sResult += "-" + dateName(dDate , 'Month-3-Upper');
			sResult += "-" + thisYear;
			break;
		case 'DD-MMM':
			sResult += thisDate;
			sResult += "-" + dateName(dDate , 'Month-3-Upper');
			break;
		case 'DD-MMM-YYYY HH:MM':
			sResult += thisDate;
			sResult += "-" + dateName(dDate , 'Month-3-Upper');
			sResult += "-" + thisYear;
			sResult += ' ' + thisHour;
			sResult += ':' + thisMinute;
			break;
		case 'DD-MMM-YYYY HH:MM:SS':
			sResult += thisDate;
			sResult += "-" + dateName(dDate , 'Month-3-Upper');
			sResult += "-" + thisYear;
			sResult += ' ' + thisHour;
			sResult += ':' + thisMinute;
			sResult += ':' + thisSecond;
			break;
		case 'HH:MM':
			sResult += thisHour;
			sResult += ':' + thisMinute;
			break;
		case 'YYYY-MM-DD':
			sResult += thisYear;
			sResult += '-';
			sResult += thisMonth;
			sResult += '-';
			sResult += thisDate;
			break;
	}										
	return sResult;
}


function dateTimeSplice(dDate, dTime) {
	dDate = new Date(dDate);
	dTime = (dTime) ? dTime : '00:00';
	var iYear = dDate.getFullYear();
	var iMonth = dDate.getMonth();
	var iDate = dDate.getDate();
	var iHour =  dTime.slice(0,2);
	var iMinute = dTime.slice(3);
	var dResult = new Date(iYear, iMonth, iDate, iHour, iMinute, 0);
	dDate = null
	return dResult;
}

				
function dateName(dDate, sDayMonth) {
	var sResult;
	dDate = new Date(dDate);
	var aDay3Lower = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
	var aDay3Upper = new Array("SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT");
	var aMonth3Lower = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",	"Aug", "Sep", "Oct", "Nov", "Dec");
	var aMonth3Upper = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL",	"AUG", "SEP", "OCT", "NOV", "DEC");
	var thisDate = new Date(dDate);
	var sDay3Lower = aDay3Lower [dDate.getDay()];
	var sDay3Upper = aDay3Upper [dDate.getDay()];
	var sMonth3Lower = aMonth3Lower [dDate.getMonth()];
	var sMonth3Upper = aMonth3Upper [dDate.getMonth()];
	switch (sDayMonth) {
		case 'Day-3-Lower':
			sResult = sDay3Lower;
			break;
		case 'Day-3-Upper':
			sResult = sDay3Upper ;
			break;
		case 'Month-3-Lower':
			sResult = sMonth3Lower ;
			break;
		case 'Month-3-Upper':
			sResult = sMonth3Upper;
			break;
		case 'Day-Month-3-Lower':
			sResult = sDayName + ' ' + sMonth3Lower;
			break;
		case 'Day-Month-3-Upper':
			sResult = sDay3Upper + ' ' + sMonth3Upper;
			break;
		default:
			return false;
	}
	return sResult;
}


function dateAdd(sInterval, iNumber, dDate) {
	iNumber = parseInt(iNumber);
	dDate = new Date(dDate);
	var iYear = dDate.getFullYear();
	var iMonth = dDate.getMonth();
	var iDate = dDate.getDate();
	var iHour = dDate.getHours();
	var iMinute = dDate.getMinutes();
	var iSecond = dDate.getSeconds();
	switch (sInterval) {
		case 'yyyy':	//---Year;
			iYear += iNumber;
			break;
		case 'q':		//---Quarter;
			iMonth += (iNumber * 3);
			break;
		case 'm':		//---Month;
			iMonth += iNumber;
			break;
		case 'y':		//---Day Of Year;
			
			break;
		case 'd':		//---Day;
			iDate += iNumber;
			break;
		case 'w':		//---Weekday
			
			break;
		case 'ww':		//---Week Of Year;

			break;
		case 'h':		//---Hour;
			iHour += iNumber;
			break;
		case 'n':		//---Minute;
			iMinute += iNumber;
			break;
		case 's':			//---Second;
			iSecond += iNumber;
			break;
		default:
			return false;
	}
	dDate = new Date(iYear, iMonth, iDate, iHour, iMinute, iSecond);
	return dDate 
}

function weekDay(dDate) {
	var thisDate = new Date(dDate);
	var thisDay = thisDate.getDay();
	if (thisDay != 0 && thisDay != 6) { return true; }
	return false;
}

//var iDayDiff = ((dEndDate - dStartDate)/(1000*60*60*24));
//1000*60*60*24 = Days;
//iDiff = (dEndDate - dStartDate)/(1000)  // the number of seconds between the times;
//if Math.floor(iDiff/24*60*60) = 0  // there is less than one day between the two times;
//if Math.floor(iDiff/(60*60)) = 0  // there is less than one hour between the two times;
//if Math.floor(iDiff/(60)) = 0  //there is less than one minute between the two times;
/************************************
 		End Date Functions;
************************************/

function CYNBool(DataIn) {
	var varReturn;
	var sData = new String(DataIn);
	
    if (sData.toUpperCase() == "Y") { varReturn = true;
    } else if (sData.toUpperCase() == "N") { varReturn = false;
    } else if (sData == "") { varReturn = false;
    } else if (sData.toUpperCase() == "TRUE") { varReturn = "Y";
    } else if (sData.toUpperCase() == "FALSE") { varReturn = "N";
    } else { varReturn = false; 
    }
    return varReturn;
}

String.prototype.whereIsIt = function(){
	var re1 = /\/web\d+/ig;
	var re2 = /\//ig;
	var i = (this.indexOf(re1.exec(this)) +1);
	return this.indexOf(re2.exec(this), i);
}
//Takes current page location 'http://server/web01/dir/file.asp'
//and returns 'http://server/web01'
//if you send in sPage, it will return: 'http://server/web01/otherdir/yourpage.asp'
//  make sure to send in sPage starting with a /
function getFullWebServerPath(sPage){
	var sPath=document.location.href;
	/* old way
		var iPos=sPath.whereIsIt();
	*/
	//sPath=sPath.toUpperCase();
	iPos=sPath.toUpperCase().indexOf('/WEB')+6;
	var sNewPath=sPath.substr(0,iPos);
	if(sPage){
		return sNewPath+sPage;
	}else{
		return sNewPath;
	}
}
//common button object this will hold the functions to perform with events etc.
function clsSButton(strBID){
         this.ID = strBID;
         this.ref = document.getElementById(strBID);
         this.parentRef = null;
         this.ev_mOut  = null;
         this.ev_mOver = null;
         this.ev_click = null;
         this.intref   = null;
         //this.title = null;
         this.enIMG = null;
         this.disIMG = null;
         if(this.ref)
         {
         	this.parentRef = this.ref.parentNode.parentNode;
                this.ev_mOut  = this.ref.onmouseout;
                this.ev_mOver = this.ref.onmouseover;
                this.ev_click = this.ref.onclick;
                //this.title = this.ref.title;
                this.enIMG  = document.getElementById(this.ID+"ENABLE")
                this.disIMG = document.getElementById(this.ID+"DISABLE")
         }
         return this;
}
var arrDButton = new Array();

function enableButtonImage(oButton){
        if(brwsr.ns)
        {
        	oButton.style.MozOpacity = 100 + "%";
        }
        else{
            	oButton.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
        }
}
function switchButtonTitle(strButtonID,strTitle)
{
     tempButton = getButtonRef(strButtonID);
     tempButton.ref.title = strTitle;
     tempButton.enIMG.title = strTitle;
     tempButton.disIMG.title = strTitle;
}
function switchButtonImage(strButtonID,objImage)
{
   tempImg = null;
   if(!objImage.src)
   {
   	tempImg = new Image();
   	tempImg.src = objImage;
   }
   else{
       	tempImg = objImage;
   }
   var tempButton = getButtonRef(strButtonID);
   tempButton.enIMG.src = tempImg.src;
   tempButton.disIMG.src = tempImg.src;
}
function getButtonRef(strButtonID)
{
   var tempButton
   if(arrDButton[strButtonID])
   {
   	tempButton = arrDButton[strButtonID];
   }
   else{
       	tempButton = new clsSButton(strButtonID);
       	arrDButton[arrDButton.length] = tempButton;
       	arrDButton[strButtonID] = tempButton;
       	tempButton.intref = arrDButton[strButtonID];
   }
   return tempButton;
}

function disableButtonImage(oButton){
      if(brwsr.ns)
      {
      	  oButton.style.MozOpacity = 60 + "%";
      }
      else{
          oButton.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=60)';
      }
}
function disableButton(strButtonID)
{
   var tempButton = getButtonRef(strButtonID);
   if(tempButton && tempButton.ref && document.getElementById(strButtonID))
   {
        var tempButton, tempImages,bImgCount
        if(brwsr.ns)
        {
        	tempButton.parentRef.style.MozOpacity = 60 + '%';
        }
        else{
            	tempButton.parentRef.style.filter = 'alpha(opacity=60)';
        }
   	if(tempButton.ref.style.cursor){
                tempButton.ref.style.cursor = "default";
        }

        if(tempButton.ref && tempButton.ref.onmouseout)
        {
        	tempButton.ref.onmouseout();
        }
	document.getElementById(strButtonID).OldOnClickBeforeDisable = document.getElementById(strButtonID).onclick
        tempButton.ref.onmouseover = null;
        tempButton.ref.onmouseout = null;
        tempButton.ref.onclick = null;
        document.getElementById(tempButton.ID+"ENABLE").style.display="none";
        document.getElementById(tempButton.ID+"DISABLE").style.display="inline";

   }
}
function enableButton(strButtonID)
{
   var tempButton
   if(arrDButton[strButtonID])
   {
   	tempButton = arrDButton[strButtonID];
   }
   if(tempButton && tempButton.ref && document.getElementById(strButtonID))
   {
        var tempButton, tempImages,bImgCount
        if(brwsr.ns)
        {
        	tempButton.parentRef.style.MozOpacity = 100 +"%";
        }
        else{
            	tempButton.parentRef.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
        }
   	if(tempButton.ref.style.cursor){
        tempButton.ref.style.cursor = "pointer";
    }
   	tempButton.ref.onmouseover = tempButton.ev_mOver;
   	tempButton.ref.onmouseout = tempButton.ev_mOut;
   	tempButton.ref.onclick = tempButton.ev_click;
        tempImages = tempButton.ref.getElementsByTagName("IMG")
        document.getElementById(tempButton.ID+"ENABLE").style.display="inline";
   	document.getElementById(tempButton.ID+"DISABLE").style.display="none";
        /*if(tempImages)
        {
        	for(bImgCount = 0; bImgCount < tempImages.length; bImgCount++)
        	{
        		enableButtonImage(tempImages[bImgCount])
        	}
        }*/
   }
}
function resetButtons()
{
	var x
	if(arrDButton)
	{
    	   for(x=0; x < arrDButton.length;x++)
    	   {
    		enableButton(arrDButton[x].ID)
    	   }
        }
}

function isButtonEnabled(strButtonID)
{
	var objButton;
	var blnEnabled = false;

	if(arrDButton[strButtonID]) {objButton = arrDButton[strButtonID];}
	if(objButton)
	{
		if (objButton.ref.style.cursor == "pointer") {blnEnabled = true;}
	}
	
	return blnEnabled;
}

var ocsXMLCache='';
function sessionPulse(SessionGuid) {
	oXMLCache = new init_RSProxyXML('oXMLCache');
	oXMLCache.async=false;
	
	var sFile=getFullWebServerPath('/Common/SessionPulse.asp');
	if(SessionGuid) {sFile+='?SessionGuid=' + SessionGuid}
	
	//prompt('', sFile);
	oXMLCache.loadXML(sFile);
}


function QueryParser(q) {
    if (q.length > 1 && q.indexOf('?') === 0) {
        this.q = q.substring(1, q.length);
    }
    else {
        this.q = q;
    }
    this.keyValuePairs = new Array();
    if (q) {
        for (var i = 0; i < this.q.split("&").length; i++) {
            this.keyValuePairs[i] = this.q.split("&")[i];
        }
    }
    this.getKeyValuePairs = function() { return this.keyValuePairs; }
    this.getValue = function(s) {
        for (var j = 0; j < this.keyValuePairs.length; j++) {
            if (this.keyValuePairs[j].split("=")[0] == s)
                return this.keyValuePairs[j].split("=")[1];
        }
        return false;
    }
    this.getParameters = function() {
        var a = new Array(this.getLength());
        for (var j = 0; j < this.keyValuePairs.length; j++) {
            a[j] = this.keyValuePairs[j].split("=")[0];
        }
        return a;
    }
    this.getLength = function() { return this.keyValuePairs.length; }
}

//Fixed to work with ie10 non compat mode in almost all circumstances
function PostUrl(fullUrl, theWindow) {
    var pos = fullUrl.indexOf('?');
    var url = fullUrl;
    var qs = '';
    var currentPath = '';

    if (pos >= 0) {
        url = fullUrl.substr(0, pos);
        qs = fullUrl.substr(pos, fullUrl.length - pos);
    }

    //append the current path to the url if you are using relative path or not using any path
    if (url.indexOf("../") > -1 || url.indexOf("/") == -1) {
        pos = document.location.pathname.lastIndexOf("/")
        if (pos >= 0) {
            currentPath = document.location.pathname.substr(0, pos + 1);
        }
    }
    url = currentPath + url;

    var page = new QueryParser(qs);
    var args = page.getParameters();

    var html = "<html><body onload=\"document.getElementById('postForm').submit();\"><form id=\"postForm\" name=\"postForm\" method=\"post\" action=\"" + url + "\">";
    for (var i = 0; i < args.length; i++) {
        if (page.getValue(args[i]) != 'false') {
            html += "<input type=\"hidden\" name=\"" + args[i] + "\" value=\"" + unescape(page.getValue(args[i])) + "\" />";
        }
    }
    html += "</form></body></html>"

    if (theWindow == null || theWindow == window) {
        if (typeof parent.ReloadMainWin === 'function') {
            window.setTimeout(function () { parent.ReloadMainWin(html) }, 200);
        }
        else {
            //This block of code will error in ie 10 non compat if there is no main_win in the parent (ex a popup page that does not use frames popup)
            window.document.open();
            window.document.write(html);
            window.document.close();
        }
    }
    else {
        theWindow.document.open();
        theWindow.document.write(html);
        theWindow.document.close();
    }
}



function GetJsonObject(url, data) {
    var returnObject = new JsonObject();

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: JSON.stringify(data),
        dataType: "json",
        async: false,
        success: function (o) { if (o && o.d) { returnObject.Result = o.d; } },
        error: function (xmlHttpRequest, textStatus, errorThrown) { returnObject.XmlHttpRequest = xmlHttpRequest; returnObject.TextStatus = textStatus; returnObject.ErrorThrown = errorThrown; }
    });

    return returnObject;
}

function JsonObject() {
    this.Result;
    this.XmlHttpRequest;
    this.TextStatus;
    this.ErrorThrown;
}

function RemoteNumberFormatter(currencyId) {
    if (currencyId == null || currencyId == undefined) {
        currencyId = -1;
    }
    this.CurrencyId = currencyId;
    this.Numbers = new Array();
    this.Result = null;

    this.AddNumber = function (format, value, id) {
        if (id == null || id == undefined) {
            id = this.Numbers.length.toString();
        }
        this.Numbers.push({ I: id, F: format, V: value });
    }
    this.Format = function () {
        var wrapped = { CurrencyId: currencyId, Items: this.Numbers };
        this.Result = GetJsonObject(getFullWebServerPath('/Services/Common/Format.asmx/FormatNumbers'), wrapped).Result;
    }

    this.GetResult = function (indexOrId) {
        for (var i = 0; i < this.Result.length; i++) {
            if (this.Result[i].I == indexOrId) {
                return this.Result[i];
            }
        }
        return null;
    }
}

// when putting javascript into a string to be loaded as innerHTML, rather than escaping use this:
function ClientScript_HtmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

function ClientScript_HtmlUnescape(value) {
    return String(value)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}