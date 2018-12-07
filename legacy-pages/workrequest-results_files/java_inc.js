//' $Revision: 10 $

var MODAL
MODAL = 0
self.focus();

//check if a maxLength has been reached in a text fields (onSubmit)
function isMaxLength(oField, iMaxLength, sFieldName)
{	
	var sErr='';
	
	if(oField.value.length > iMaxLength)
	{				
		sErr+= 'Length of ' + sFieldName + ' field cannot be longer than ' + iMaxLength;
		sErr+= '.\nCurrently it is ' + oField.value.length + ' characters in length.';
	}
	return sErr;
}

function isMaxLengthOnBlur(oField, iMaxLength, sFieldName)
{
	var sErr=isMaxLength(oField, iMaxLength, sFieldName);
	if(sErr)
	{
		alert(sErr);
		oField.focus();
		return false;
	}
}

function HandleFocus()
{
//remove me from all of your body tags!
//this function is mearly here to stop errors generating from trying to access it
}

//Will open a new window
function WindowOpen(url,w,h, N)
{	//url is the location, w is the width, h is the height
	self.modal="hasChild"
	var winl = (screen.width - w) / 2;
	var wint = (screen.height - h) / 2;
	MODAL = window.open(url, N,
	"toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,height=" + h + ",width=" + w + "top=" + wint + ",left=" + winl);
	MODAL.hasParent = true;
}

function WindowOpenCenterScreen(sPath,sWinName,iWidth,iHeight,sOptions){
	var iLeft=(screen.width-iWidth)/2;
	var iTop=(screen.height-iHeight)/2;
	var sLocation='top='+iTop+',left='+iLeft+',width='+iWidth+',height='+iHeight+';';
	var sFullOptions=sLocation;
	if(sOptions){
		if(sOptions.length){
			sFullOptions=sOptions+','+sLocation;
		}
	}
	window.open(sPath, sWinName, sFullOptions);
}

//Will open a new window with a file menu ¬JB
function ExcelOpen(url,w,h, N)
{	//url is the location, w is the width, h is the height
	var winl = (screen.width - w) / 2;
	var wint = (screen.height - h) / 2;
	window.open(url, N,
	"toolbar=yes,location=no,directories=no,status=no,menubar=yes,scrollbars=yes,resizable=yes,height=" + h + ",width=" + w + "top=" + wint + ",left=" + winl);
}

function Parent_OnFocus()
{
	if (self.modal == "hasChild")
	{
		MODAL.focus();
		self.blur();
	}
}

function Parent_OnClose()
{
	if (self.modal == "hasChild")
		{
			MODAL.hasParent = false;
			MODAL.close();
		}
}

//Use this as:
//in the child
//<body onUnload="javascript: Child_OnClose()">
function Child_OnClose()
{
	if (self.hasParent == true)
	{
		window.opener.modal = "noChild"
		window.opener.focus();
	}
}

function Child_OnLoad()
{
	if (self.hasParent == true)
	{
		window.opener.modal = "hasChild"
		self.focus();
	}
}

function Child_OnClose()
{
	if (self.hasParent == true)
	{
		window.opener.modal = "noChild"
		window.opener.focus();
	}
}

//do not use this for a window with any controls on it.
function Child_OnBlur()
{
	if (self.modal != "hasChild")
		{
			if (self.hasParent == true)
			{window.opener.blur();}
			self.focus();
		}
	else
		{
			MODAL.focus();
		}
}

function IgnoreEvents(e)
{
  return false
}


//Similar to the INstr function of VBscript
function InStr(intStart, strSearched, strSought)
{
	if (intStart < 1){
		return 0;
	}
	if (strSearched.length < 1)
	{	return 0;
	}else if(strSearched == null){
		return 0;
	}else if(strSearched.length < 1){
		return 0;
	}else if(strSought == null){
		return 0;
	}else if(strSought.length < 1){
		return 0;
	}else{
		strSearched = strSearched.substr(intStart-1)
	}
	if((strSearched.search(strSought)) > 0){
		return (strSearched.search(strSought) + intStart);
	}else{
		return 0;
	}
}

// THE FORMAT specified is : DD-MMM-YYYY (for BIG)
//SIMILAR to the IsDate function in VBSCRIPT
function IsDate(tBox, sDispName, bRequired, bSetToCurrent, bClearOut)
{
	if (!document.all){
		bClearOut = true;
	}
	//textBox should be sent as document.thisFormName.txtBoxName 
	//strDisplName would be what appears in the alert if there is a problem with the date.
	// the alert is sDispname + " Must be a valid date " + etc....l.
	var m, d, y, h, n
	var err_msg = false;
	var sDate;

	//months is just a pick list that will return the index value into the sMonths array
	var months = {'JAN':0,'FEB':1,'MAR':2,'APR':3,'MAY':4,'JUN':5,'JUL':6,'AUG':7,'SEP':8,'OCT':9,'NOV':10,'DEC':11 };
	var iMonth;
	var sMonths = new Array();
	sMonths[0]  = "Jan";
	sMonths[1]  = "Feb";
	sMonths[2]  = "Mar";
	sMonths[3]  = "Apr";
	sMonths[4]  = "May";
	sMonths[5]  = "Jun";
	sMonths[6]  = "Jul";
	sMonths[7]  = "Aug";
	sMonths[8]  = "Sep";
	sMonths[9]  = "Oct";
	sMonths[10] = "Nov";
	sMonths[11] = "Dec";
	
	sDate = tBox.value;

	if ((bRequired == true)){
		if ((sDate.length) <= 0)
			{err_msg = true;}
	}else if ((bRequired == false)){
		if ((sDate.length) <= 0)
			{return true;}
	}

	if (InStr(1, sDate, "-") == 3) {
		d = sDate.substr(0,2);
	}
	else {err_msg = true;}

	if (InStr(4, sDate, "-") == 7) {
		m = sDate.substr(3,3).toUpperCase();
		iMonth = months[m];
	} else {err_msg = true;}

	y = sDate.substr(7,4);
	
	if (y.length < 4) {
		if (y <= 99 && y >= 38){
			y = 19 + y;
		}else{
			y = 20 + y;
		}
	}
	
	//checking to see if there are non mumerics at the end of the string
	var check;
	check = sDate.substr((sDate.length-1), 1)
	if (isNaN(check))
	{err_msg = true;}
	
	var monthDays = new Array(31,28,31,30,31,30,31,31,30,31,30,31)
	if (((y % 4 == 0) && (y % 100 != 0)) || (y % 400 == 0))
		monthDays[1] = 29;

	if ((sDate.length) != 11 ) {
		err_msg = true;
	}else
	if ( months[m] == null ) {
		err_msg = true;
	}else{
		if (err_msg == false){
			if (d.substr(0,1) == '0' ){
				if (isNaN(d.substr(1,1)) || (d == '00')) {
					err_msg = true;
				}	
			}else if ((isNaN(d)) || ((d < 1) || (d > 31))) {
					err_msg = true;
			}else
			if ((isNaN(y)) || ((y < 1000) || (y > 3000))) {
				err_msg = true;
			}else if (d > monthDays[iMonth]){ 
				alert(sDispName + " is not a valid number of days for that month")
				if (bClearOut) {
					tBox.value = '';
				}
				tBox.focus();
				tBox.select();
				return false;
			}
		}
	}

	if (err_msg == true)
	{	alert(sDispName + " must be in the format DD-MMM-YYYY \n And a Valid Date (between the Years 1000 and 3001.)")
		if (bSetToCurrent) {
			var dtD = new Date();
			var dtDYear = dtD.getYear();

			if (dtDYear < 2000)
				dtDYear = (dtD.getYear() + 1900);
			if (dtD.getDate() < 10) {
				d = '0'+dtD.getDate();
			}else {
				d = dtD.getDate();
			}
			tBox.value = d + "-" + sMonths[dtD.getMonth()] + "-" + dtDYear;
		}else if (bClearOut) {
			tBox.value = '';
		}
		tBox.focus();
		tBox.select();
		return false;
	}else{ return true; }
}

//function to determine if the passed in time is a valid time
// BIG format is HH:NN (00:00 - 23:59)
function IsTime(tBox, sDisplayName, bRequired, bSetToCurrent, bClearOut) {
	var bError = false;
	var sTime = tBox.value;
	var sHours = sTime.substr(0,2);
	var sMinutes = sTime.substr(3,2);
	var iCheck = 0;
	var iCheck2 = 0;
	
	if ((bRequired == true)){
		if ((sTime.length) <= 0){bError = true;}
	}else if ((bRequired == false)){
		if ((sTime.length) <= 0){return true;}
	}

	if (sTime.length != 5) {
		bError = true;
	}
	// hour and minute separator must be a colon (:)
	if (sTime.substr(2,1) != ':') { bError = true; }
	
	//both hours and minutes must be 2 digits
	if ( (sHours.length != 2) || (sMinutes.length != 2) ) { bError = true; }
		
	// 1st char of hours : 0<=x<=2
	iCheck = sHours.substr(0,1);
	if ( isNaN(iCheck) ) {
		bError = true;
	}else {
		iCheck = parseInt(iCheck);
		if ( (iCheck > 2) || (iCheck < 0) ) { bError = true; }
		
		// 2nd char of hours : if 1st char = 0 || 1 : 0<=x<=9
		//					   if 2nd char = 2 : 0<=x<=3
		iCheck2 = sHours.substr(1,1);
		if ( isNaN(iCheck2) ) { 
			bError = true;
		}else { 
			iCheck2 = parseInt(iCheck2);
		
			if ( iCheck == 2 ) {
				if ( (iCheck2 < 0) || (iCheck2 > 3) ) { bError = true; }
			}
		}
	}
	
	// 1st char of minutes : 0<=x<=5
	// 2nd char of minutes : 0<=x<=9
	iCheck = sMinutes.substr(0,1);
	if ( isNaN(iCheck) ) {
		bError = true;
	}else {
		iCheck = parseInt(iCheck);
		if ( (iCheck > 5) || (iCheck < 0) ) { bError = true; }
		
		iCheck = sHours.substr(1,1);
		if ( isNaN(iCheck2) ) { bError = true; } 
	}	

	if (bError == true) {
		window.alert(sDisplayName + ' must be in the format HH:NN \n and a valid time (between 00:00 and 23:59)');
		if (bSetToCurrent) {
			var dDate = new Date();
			
			sHours = (dDate.getHours() < 10) ? ('0' + dDate.getHours()) : dDate.getHours();
			sMinutes = (dDate.getMinutes() < 10) ? ('0' + dDate.getMinutes()) : dDate.getMinutes();
			tBox.value = sHours + ":" + sMinutes;
		}else if (bClearOut) {
			tBox.value = '';
		}
		tBox.focus();
		tBox.select();
		return false;
	}else { return true; }
}

//Returns the index of the selected radion button
function GetRadioValue(radioObject){// checks the criteria that is selected (by month, next 30 days etc.)
		var checked = false
		for (var i = 0; i < radioObject.length; i++)
		{
		if (radioObject[i].checked) 
			{	checked = 'true'
				break
			}
		}
		//this is to check to see that they did check something
		if (checked == 'true')
			return radioObject[i].value 
		else
			return ""
}

function ClosePleaseWait()
{
	var pleasewait = window.open('pm_pleasewait.asp', 'pleasewait','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,height=1,width=1');
	pleasewait.close();
}

function LoadPleaseWait()
{
	window.open('pm_pleasewait.asp', 'pleasewait','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,height=1,width=1');
}

function TableMouseOver()
{
	if (event.srcElement.parentElement.originalColor > "")
	{
		event.srcElement.parentElement.style.backgroundColor = 'yellow'
	}
}

function TableMouseOut()
{
	if (event.srcElement.parentElement.originalColor > "")
	{
	event.srcElement.parentElement.style.backgroundColor = event.srcElement.parentElement.originalColor
	}
}

function AdjustDate(dateYear,dateMon,dateDay)
{
	var NewDate = new Date(dateYear,dateMon,dateDay);
	return NewDate.toLocaleString();
}

//BETA!!
//Similar to the Trim function of VB
function Trim(strX)
{
	while (strX.substr(0,1) == ' ')
	{
		strX = strX.substr(1,(strX.length -1))
	}
	while (strX.substr(strX.length-1,1) == ' ')
	{
		strX = strX.substr(0,(strX.length -1))
	}
	return strX;
}


//****************************************************************************
// Purpose:    checks to see if the value entered is valid.  
// Inputs:     sChars = AN, N, or A
//                    = Also can pass a user defined set of valid characters if needed
//             oField = The field name that needs checking
//             sDefaultValue = The original default value, if any
//			   bUseDefaultValue = boolean flag to indicate whether or not to replace
//			   the existing value in the control with the default value.
// Returns:    None; Just an alert message that forces users enter valid chars
//****************************************************************************
function CheckValidInput(sChars,oField,sDefaultValue,bUseDefaultValue){
	var sValidChars;
	var sChar = '';   
	var sErrMsg = '';
	var bFailed = false;
	
	if (sChars == 'AN') { 	//alphanumeric only; no special symbols
		sErrMsg = ' - You have entered an invalid character \n';
		sValidChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	}
	else if (sChars == 'N') {    //numeric only
		sErrMsg = ' - You must enter a numeric value \n';
		sValidChars = '0123456789';
	}
	else if (sChars == 'A') {     //alpha only
		sErrMsg = ' - You must enter an alpha character only \n'
		sValidChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'	
	 }
	 else {
		//user defined valid chars
		sErrMsg = " - You have entered an invalid character \n"
		sValidChars = sChars
	 }
	 for (var i=0;i<oField.value.length;i++){
	 	sChar = '' + oField.value.substring(i,i+1);
	 	if (sValidChars.indexOf(sChar) == "-1") {
	 		bFailed = true;
	   };
	 }

	if (bFailed) {
	    alert(sErrMsg);
		if (bUseDefaultValue) { oField.value = sDefaultValue; }
		oField.focus();
		oField.select();
	}
   return;
 } 
 
 
  //**************************************************************
// Converts the standard BIG format to JavaScript acceptable format
// Input:   sDate: Date in "dd-mmm-yyyy" format
//          sType: Future use for now
//                 Idea: bigDate, bigTime, bigDateTime
//                 Refers to the format sDate is coming in
//**************************************************************
function ConvertBIG2JSDate(sDate,sType)   {
   
   if (sDate.length == 17){
	  var aMonths = new Array();
	  aMonths[0]  = "Jan";
	  aMonths[1]  = "Feb";
	  aMonths[2]  = "Mar";
	  aMonths[3]  = "Apr";
	  aMonths[4]  = "May";
	  aMonths[5]  = "Jun";
	  aMonths[6]  = "Jul";
	  aMonths[7]  = "Aug";
	  aMonths[8]  = "Sep";
	  aMonths[9]  = "Oct";
	  aMonths[10] = "Nov";
	  aMonths[11] = "Dec";     
	   
	  //Date
      var dDate    = sDate.substr(0,2);
      //Month
      var dMonth   = sDate.substr(3,3);
      for (var i = 0; i < aMonths.length;i++){
         if (aMonths[i]==dMonth){
            dMonth= i + 1
            break;
         }
      }      
      //Year
      var dYear    = sDate.substr(7,4);
      //Hour
      var dHr      = sDate.substr(12,2);
      if (dHr.substr(0,1)=='0'){
         dHr = dHr.substr(1,1)
      }
      //Minute
      var dMin     = sDate.substr(15,2);
      if (dMin.substr(0,1)=='0'){
         dMin = dMin.substr(1,1)
      }
      
      return dMonth + '/' + dDate + '/' + dYear + ' ' + dHr + ':' + dMin
   }
}

function KeyPressCheckChars(sValidChars,oField,event){
	var strCharacter = '';   
	var bFailed = false;

	if(event.which) {
		strCharacter=event.which;
	}
	else {
		strCharacter=event.keyCode;
	}
//	alert(String.fromCharCode(strCharacter));
	if (sValidChars.indexOf(String.fromCharCode(strCharacter)) == "-1" && strCharacter != 8 &&  strCharacter != 46 && strCharacter != 37 &&  strCharacter != 39) {
		bFailed = true;
	}

	if (bFailed) {
		return false;
	}
	else {
		return true;
	}
}

function onChangeCheckChars(sValidChars,oField){
	var strCharacter = '';   
	var bFailed = false;
	var strFieldValue = oField.value;
	var strNewFieldValue = '';
	
	for(var i=0;i<strFieldValue.length;i++) {
		if (sValidChars.indexOf(strFieldValue.substr(i,1)) == "-1") {

		}
		else {
			strNewFieldValue += strFieldValue.substr(i,1);
		}
	}
	oField.value = strNewFieldValue;
}

//Function to 'decode' an asp-urlencoded string.
function URLDecode(strURLEncodedString)
{
	var rgxExp = /\+/g;

	return unescape(String(strURLEncodedString).replace(rgxExp, " ")); 
}

function IsItemSelected(oCombo, CheckNegativeValue) {

	if(oCombo && oCombo.type=='select-one') {
		if(oCombo.selectedIndex < 0 || !oCombo.options[oCombo.options.selectedIndex] || oCombo.options[oCombo.options.selectedIndex].value.length == 0 || (CheckNegativeValue==true && oCombo.options[oCombo.options.selectedIndex].value < 0)) {
			return false;
		}
		else {
			return true;
		}
	}
	else {
		return true;
	}
}