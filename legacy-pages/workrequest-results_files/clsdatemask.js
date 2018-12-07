//'     $Revision: 23 $

var blRemoteDays;
blRemoteDays = false
var blRemoteDaysR;
blRemoteDaysR = false
var tDayLoadBegin,tMonthLoadBegin;
var blRemoteMonths;
blRemoteMonths = false
var blRemoteMonthsR;
blRemoteMonthsR = false
var objDaysTrans, objMonthTrans;

function getTranslatedDaysRemotely()
{
    var tempArray = new Array();
    objDaysTrans = getLocalizedArrayJS(new Array('STD-H521','STD-H522','STD-H523','STD-H524','STD-H525','STD-H526','STD-H527','STD-H806'));

    tempArray[0] = objDaysTrans['STD-H521']
    tempArray[1] = objDaysTrans['STD-H522']
    tempArray[2] = objDaysTrans['STD-H523']
    tempArray[3] = objDaysTrans['STD-H524']
    tempArray[4] = objDaysTrans['STD-H525']
    tempArray[5] = objDaysTrans['STD-H526']
    tempArray[6] = objDaysTrans['STD-H527']

    return tempArray;
}

function getTranslatedDays()
{
	try{
		dayArray = top.translatedDaysOfTheWeek
	}
	catch(e){
	}

    if (!dayArray)
    {
        dayArray = getTranslatedDaysRemotely();
    }
    
    return dayArray;
}
function transDayComplete(){
     blRemoteDaysR = true;
}

function getTranslatedMonthsRemotely()
{
	// no longer doing this remote
	if (window.OracleMonthNamesLongArray){
		return window.OracleMonthNamesLongArray
	}
	else {
		return top.OracleMonthNamesLongArray
	}
}
function getTranslatedMonths()
{
	if (window.OracleMonthNamesLongArray){
		monthArray = window.OracleMonthNamesLongArray
		return OracleMonthNamesLongArray;
	}
	else {
		monthArray = top.OracleMonthNamesLongArray
		return top.OracleMonthNamesLongArray;
	}
}

function transMonthComplete(){
     blRemoteMonthsR = true;
}

var monthArray = new Array();
var dayArray = new Array();
var defMonths = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
var defDays = new Array('Sunday','Monday','Tuesday','Wedenesday','Thursday','Friday','Saturday');
function clsDateMask(dtDate,strMask){
   this.weekdays         = getTranslatedDays();
   this.months           = getTranslatedMonths();
   this.shortmonths      = getShortTranslatedMonths();

   this.maskRef = (!strMask||strMask =="" ?new clsMask(window.uDateMask): new clsMask(strMask))
   this.maskStr = this.maskRef.valueOf();

   this.maskTimeRef = new clsMaskTime(window.uTimeMask);
   this.maskTimeStr = this.maskTimeRef.valueOf();
   this.date = this.checkDate(dtDate);
   this.mask_components  = this.maskStr.split("")
   this.maskTime_components = this.maskTimeStr.split("");
   this.components       = new Array();
   this.ex_components    = new Array();
   //the index is used within the mask function to look up the component needed without looping
               //aAdDFGghHijlKmksTUwYyM
   this.index = "aAdDFGghHijlKmksTUwYyM"
   this.parse_err = false;
   this.parse = function(objDate)
   {
     this.parse_err = false;
     this.date = this.checkDate(objDate);

     if(this.date == false)
     {
     	this.components[0] = "am"
     	this.components[1] = this.components[0].toUpperCase();
     	this.components[2] = "28"
     	this.components[3] = this.weekdays[0].substr(0,3);
     	this.components[4] = this.months[3]
     	this.components[5] = "2"
     	this.components[6] = "2"
     	this.components[7] = "03"
     	this.components[8] = "02"
     	this.components[9] = "05"
     	this.components[10] = "28"
     	this.components[11] = this.weekdays[0]
     	this.components[12] = "04"
     	this.components[13] = this.shortmonths[3]
     	this.components[14] = "4"
     	this.components[15] = "22"
     	this.components[17] = ""
     	this.components[18] = "0"
     	this.components[19] = "1980"
     	this.components[20] = "80"
     	this.components[21] = this.components[13].toUpperCase();
     	this.parse_err      = true;

     }
     else{
       //a (am or pm)
       this.components[0] = (this.date.getHours() == 0 ? "am" :(  this.date.getHours() > 11)? "pm":"am")
       //A (AM or PM)
       this.components[1] = this.components[0].toUpperCase();
       //d (day with leading zeros
       this.components[2] = (this.date.getDate()>9?this.date.getDate():"0"+this.date.getDate());
       //D (3 length name of the day of the week "Fri")
       this.components[3] = this.weekdays[this.date.getDay()].substr(0,3);
       //F (textual Month, full length)
       this.components[4] = this.months[this.date.getMonth()];
       //G (24hour, no leading zeros)
       this.components[5] = this.date.getHours()
       //g (12hour, no leading zeros)
       this.components[6] = (parseInt(this.components[5],10))>12?((parseInt(this.components[5],10))-12):(this.components[5] == 0)? 12: this.components[5];
       //h (12hour, leading zeros)
       this.components[7] = (this.components[6]<10?"0":"")+this.components[6];
       //H (24hour, leading zeros)
       this.components[8] = (this.components[5]<10?"0":"")+this.components[5];
       //i (minutes)
       this.components[9] = (this.date.getMinutes()<10?"0":"")+this.date.getMinutes();
       //j (day of the month, without leading zeros)
       this.components[10] = this.date.getDate();
       //l (long textual day of the week)
       this.components[11] = this.weekdays[this.date.getDay()]
       //K (month with leading zeros)
       this.components[12] = ((this.date.getMonth()+1)<10?"0":"")+(this.date.getMonth()+1);
       //m (month textual, 3 letters
       this.components[13] = this.shortmonths[this.date.getMonth()];
       //k (month without leading zeros)
       this.components[14] = this.date.getMonth()+1
       //s (seconds 00 to 59)
       this.components[15] = (this.date.getSeconds()<10?"0":"")+this.date.getSeconds();
       //T Timezone setting of the Machine
       this.components[16] = this.date.toString().split(" ")[4]
       //U (seconds since the UNIX epoch)
       this.components[17] = this.date.getTime();
       //w (day of the week 0 through 6)
       this.components[18] = this.date.getDay();
       //Y (full year)
       this.components[19] = this.date.getFullYear()< 1000? this.date.getFullYear()+1900:this.date.getFullYear();
       //y (year, only last 2 digits)
       this.components[20] = this.date.getYear().toString().substr(this.date.getYear().toString().length-2,2)
       //M month 3 length UCase
       this.components[21] = this.components[13].toUpperCase();
     }
   }
   this.parse();
   this.masked = false;
   this.maskedTime = false;
   this.getMask = function()
    {
       strMasked = ""
       for(x=0;x<this.mask_components.length;x++)
       {
       	  if(this.mask_components[x] == '\\')
       	  {
       	     if(this.mask_components[x+1]&&this.mask_components[x+1] == "n")
             {
             	strMasked+="\n"
             }else{
       	        //escaped so we will skip it and add the next char
       	        strMasked+=this.mask_components[x+1];
       	     }
       	     x++;
       	  }
       	  else if(this.index.indexOf(this.mask_components[x]) != -1)
       	  {
       	  //   alert("component " + this.mask_components[x] + "\nindex of "+this.mask_components[x]+" is "+this.index.indexOf(this.mask_components[x]))
       	     strMasked+=this.components[this.index.indexOf(this.mask_components[x])];
       	  }else{
       	     strMasked+=this.mask_components[x];
       	  }
       }
        this.masked = strMasked;
        return strMasked;
    }
    this.getMaskTime = function()
    {
       strMasked = ""
       for(x=0;x<this.maskTime_components.length;x++)
       {
       	  if(this.maskTime_components[x] == '\\')
       	  {
       	     if(this.maskTime_components[x+1]&&this.maskTime_components[x+1] == "n")
             {
             	strMasked+="\n"
             }else{
       	        //escaped so we will skip it and add the next char
       	        strMasked+=this.maskTime_components[x+1];
       	     }
       	     x++;
       	  }
       	  else if(this.index.indexOf(this.maskTime_components[x]) != -1)
       	  {
       	     //alert("index of "+this.maskTime_components[x]+" is "+this.index.indexOf(this.maskTime_components[x]))
       	     strMasked+=this.components[this.index.indexOf(this.maskTime_components[x])];
       	  }else{
       	     strMasked+=this.maskTime_components[x];
       	  }
       }

        this.maskedTime = strMasked;
        return strMasked;
    }
    this.getMaskDateTime = function()
    {
		return this.getMask()+' '+this.getMaskTime();
    }

    this.reloadMask = function(strMask)
    {
    	this.maskRef.reloadMask(strMask)
    	this.mask_components = this.maskRef.mask.split()
    }
    //this.valueOf = function(){return
    //this.toString = this.valueOf();
    //return this.getMask()
}
clsDateMask.prototype.setTime = function(objTime)
{
     this.parse_err = false;
     timeDate = this.checkTime(objTime)

     if(timeDate == false)
     {
     	this.parse_err = true;
     	return false;
     }
     else{
        this.date.setHours(timeDate.getHours());
        this.date.setMinutes(timeDate.getMinutes());
        this.date.setSeconds(timeDate.getSeconds());
        this.parse(this.date)
        return true;
     }
}
clsDateMask.prototype.checkDate = function(objDate)
{
     if(!objDate || objDate =="")
     {
     	return new Date();
     }
     else if(!objDate.getTime)
     {
     	//if a date object wasnt passed we make one
     	//out of the string that was passed
     	return this.maskRef.makeDate(objDate);
     }
     else{
        return objDate;
     }
}

clsDateMask.prototype.checkTime = function(objTime)
{
     if(!objTime || objTime =="")
     {
     	return new Date();
     }
     else if(!objTime.getTime)
     {
     	//if a date object wasnt passed we make one
     	//out of the string that was passed
     	return this.maskTimeRef.makeTime(objTime);
     }
     else{
        return objTime;
     }
}

var gDateMaskObj = null;

Date.prototype.toMask = function()
{
    if(gDateMaskObj == null)
    {
    	gDateMaskObj = new clsDateMask(this,window.uDateMask)
    }
    
    gDateMaskObj.parse(this);

    return gDateMaskObj.getMask();
}
function maskedDate_toDate(strMasked)
{
    if(gDateMaskObj == null)
    {
    	gDateMaskObj = new clsDateMask(strMasked,window.uDateMask)
    }
    else{
        gDateMaskObj.parse(strMasked);
    }
    return gDateMaskObj.date;
}

//small object to assign the neccesary
//pieces of a match
function clsMaskPiece(objMPiece)
{
   this.matched = !objMPiece?false:objMPiece[0]
   this.index = !objMPiece?false:objMPiece.index
   this.valueOf = function(){return this.matched}
   this.toString = this.valueOf()
   return this.valueOf();
}
//object will store the date mask and map neccesary parts
//for easy conversion between
//strings etc.
function clsMask(strMask){
   this.mask = (!strMask?(!window.uDateMask?"d-M-Y":window.uDateMask):strMask)
   //window.uDateMask = this.mask
   this.RE = new RegExp()
   this.index = ""
   this.numeric   = true;
   this.month     = false
   this.date      = false
   this.year      = false
   this.parseMask = function()
    {
    	//alert("date parse mask");
       //Month first
       this.RE.compile("[^FKkMmdjYygGhHis]*([FKkMmdjYygGhHis])?[^FKkMmdjYygGhHis\1]*([FKkMmdjYygGhHis])?[^FKkMmdjYygGhHis\1\2]*([FKkMmdjYygGhHis])?[^FKkMmdjYygGhHis\1\2\3]*([FKkMmdjYygGhHis])?[^FKkMmdjYygGhHis\1\2\3\4]*([FKkMmdjYygGhHis])?[^FKkMmdjYygGhHis\1\2\3\4\5]*([FKkMmdjYygGhHis])?[^FKkMmdjYygGhHis\1\2\3\4\5\6]*")
       t = this.RE.exec(this.mask)
       //the 1st element in the returned object is the source string, so skip it
       t = t.splice(1,t.length)
       //alert("date t="+t);
       //now make a "hash" string of just the pieces we need, which were returned from the reg exp.
       this.index = t.join("");
       this.month = new clsMaskPiece(this.index.match("[FKkMm]"))
       this.date = new clsMaskPiece(this.index.match("[dj]"))
       this.year = new clsMaskPiece(this.index.match("[Yy]"))
       
       //this.hour = new clsMaskPiece(this.index.match("[gGhH]"))
       //this.minute = new clsMaskPiece(this.index.match("[i]"))
       //this.sec = new clsMaskPiece(this.index.match("[s]"))
    }
    clsMask.prototype.reloadMask = function(strNewMask)
    {
       this.mask  = strNewMask;
       this.parseMask();
    }
    this.parseMask();
   this.valueOf = function(){return this.mask}
   //return this.valueOf()
}
function clsMaskTime(strMask){
   this.mask = (!strMask?"G:i":strMask)
   //window.uDateMask = this.mask
   this.RE = new RegExp()
   this.index = ""
   this.numeric   = true;
   this.hour      = false;
   this.minute    = false;
   this.sec       = false;
   this.meridiem  = false;
   this.parsed    = false;
   this.parseMask = function()
   {
   	//alert("time parse mask"+this.index.match("[aA]"));
       //Month first
       this.RE.compile("[^FKkMmdjYygGhHisaA]*([FKkMmdjYygGhHisaA])?[^FKkMmdjYygGhHisaA\1]*([FKkMmdjYygGhHisaA])?[^FKkMmdjYygGhHisaA\1\2]*([FKkMmdjYygGhHisaA])?[^FKkMmdjYygGhHisaA\1\2\3]*([FKkMmdjYygGhHisaA])?[^FKkMmdjYygGhHisaA\1\2\3\4]*([FKkMmdjYygGhHisaA])?[^FKkMmdjYygGhHisaA\1\2\3\4\5]*([FKkMmdjYygGhHisaA])?[^FKkMmdjYygGhHisaA\1\2\3\4\5\6]*")
       t = this.RE.exec(this.mask)
       //the 1st element in the returned object is the source string, so skip it
       t = t.slice(1,t.length)
       //alert("t="+t)
       //now make a "hash" string of just the pieces we need, which were returned from the reg exp.
       this.index = t.join("");
       //alert(this.index)
       this.hour = new clsMaskPiece(this.index.match("[gGhH]"));
       this.minute = new clsMaskPiece(this.index.match("[i]"));
       this.sec = new clsMaskPiece(this.index.match("[s]"));
       this.meridiem = new clsMaskPiece(this.index.match("[aA]"));
       this.parsed = true;
   }
   clsMaskTime.prototype.reloadMask = function(strNewMask)
   {
      this.mask  = strNewMask;
      this.parseMask();
   }
   this.parseMask();
   this.valueOf = function(){return this.mask}
   return this.mask;
   //return this.valueOf()
}

clsMaskTime.prototype.makeTime = function(strTimestamp,strMask)
{
    //alert("called make time " + this.mask)

    var strRegPattern = this.mask
    var tempDate = new Date();
    //get Hours
    strRegPattern = strRegPattern.replace(this.hour.matched,"([0-9]?[0-9])")
    //get Minute
    strRegPattern = strRegPattern.replace(this.minute.matched,"([0-9][0-9])")
    //get Seconds
    strRegPattern = strRegPattern.replace(this.sec.matched,"([0-9][0-9])")
    //alert("this.meridiem = "+this.meridiem);
    //Check for the meridiem

    if(this.meridiem.matched)
    {
        strRegPattern = strRegPattern.replace(this.meridiem.matched,"([aApPmM][aApPmM])");
    }
    else
    {
        strRegPattern = strRegPattern + "$";
    }
    this.RE.compile(strRegPattern)
    //alert(strRegPattern)
    //alert(this.RE.source)
    temp = this.RE.exec(strTimestamp.toUpperCase());
    //alert(temp.toString());
    if(temp != null && this.hour.matched && this.minute.matched)
    {
        if(this.sec.matched)
        {
        	//alert("sec matched");
        	tempDate.setSeconds(temp[this.sec.index+1]);
        }
        if(this.minute.matched)
        {
        	//alert("minute matched");
        	tempDate.setMinutes(temp[this.minute.index+1]);
        }
    
        if(this.meridiem.matched && this.hour.matched)
        {
        	tempMer = temp[this.meridiem.index+1];
        	if(tempMer.toUpperCase() == "PM" && temp[this.hour.index+1] < 12)
        	{
                tempDate.setHours(parseInt(temp[this.hour.index+1],10)+12)
                }
                else if(temp[this.hour.index+1] == 12 && tempMer.toUpperCase() == "AM"){
                   tempDate.setHours(0);
                }
                else{
                   tempDate.setHours(temp[this.hour.index+1]);
                }
        }
        else if(this.hour.matched)
        {
        	tempDate.setHours(temp[this.hour.index+1]);
        }
        //alert(tempDate)
        return tempDate;
    }
    else{
        return false;
    }
}

//this is the main method of the object
//when called, determines the positon of
//each element in the mask, and assigns the
//position of that piece in the mask, to the
//associated property within the object
//clsMask.prototype.parseMask =
//this one is a biggie,
//has to determine the length etc of the info in the string
//and use that to create the date
//returns a javascript date object
clsMask.prototype.makeDate = function(strTimestamp,strMask)
{

    var strStanTime = ""
    var strRegPattern = this.mask
    // var strMonthMask = "("+monthArray[0].toUpperCase()+"|"+monthArray[1].toUpperCase()+"|"+monthArray[2].toUpperCase()+"|"+monthArray[3].toUpperCase()+"|"+monthArray[4].toUpperCase()+"|"+monthArray[5].toUpperCase()+"|"+monthArray[6].toUpperCase()+"|"+monthArray[7].toUpperCase()+"|"+monthArray[8].toUpperCase()+"|"+monthArray[9].toUpperCase()+"|"+monthArray[10].toUpperCase()+"|"+monthArray[11].toUpperCase()+")"
    var strMonthMask = "("+monthArray.join("|")+")";
    strMonthMask = strMonthMask.toUpperCase();
    var strMonthMaskShort = "("
    //var strMonthMaskShort = "("+monthArray[0].toUpperCase().substr(0,3)+"|"+monthArray[1].toUpperCase().substr(0,3)+"|"+monthArray[2].toUpperCase().substr(0,3)+"|"+monthArray[3].toUpperCase().substr(0,3)+"|"+monthArray[4].toUpperCase().substr(0,3)+"|"+monthArray[5].toUpperCase().substr(0,3)+"|"+monthArray[6].toUpperCase().substr(0,3)+"|"+monthArray[7].toUpperCase().substr(0,3)+"|"+monthArray[8].toUpperCase().substr(0,3)+"|"+monthArray[9].toUpperCase().substr(0,3)+"|"+monthArray[10].toUpperCase().substr(0,3)+"|"+monthArray[11].toUpperCase().substr(0,3)+")"
    for(msCount=0;msCount<monthArray.length;msCount++)
    {
    	strMonthMaskShort += shortMonthArray[msCount].toUpperCase() + "|";
    }
    strMonthMaskShort = strMonthMaskShort.substr(0,strMonthMaskShort.length-1)+")";
   //this will reload the mask
   //when u call the function with a new strMask
   if(strMask){this.reloadMask(strMask)}
    //get the Date
    strRegPattern = strRegPattern.replace(this.date.matched,"([0-9]?[0-9])")
    //getYear
    strRegPattern = strRegPattern.replace(this.year.matched,this.year.matched == "Y"?"([0-9][0-9][0-9][0-9])":"([0-9][0-9])")

    //get the month
    if(this.month.matched,this.month.matched == "F")
    {
	     strRegPattern = strRegPattern.replace(this.month.matched,strMonthMask)
    }
    else if(this.month.matched,this.month.matched == "M")
    {
	     strRegPattern = strRegPattern.replace(this.month.matched,strMonthMaskShort)
    }
    else if(this.month.matched,this.month.matched == "m")
    {
	     strRegPattern = strRegPattern.replace(this.month.matched,strMonthMaskShort)
    }
    else{
       strRegPattern = strRegPattern.replace(this.month.matched,"([0-9]+)")
    }
    this.RE.compile(strRegPattern)
    temp = this.RE.exec(strTimestamp.toUpperCase())
    seperator =(this.month.matched == "F"||this.month.matched == "M" ||this.month.matched == "m" ? " " : "/")
    if(this.month && this.year && this.date && temp)
    {

        if(this.year.matched == "y")
        {
           currYear = new Date().getFullYear().toString().substr(0,2)
           makeYear = (temp[this.year.index+1]>=70 ? currYear - 1 : currYear)+temp[this.year.index+1]
        }
        else{
           makeYear = temp[this.year.index+1]
        }
	
	
	var tempMonth=0;

	if(this.month.matched == "F")
	{
              	
		tempMonth=returnTransMonth(temp[this.month.index+1]);
		if ( !IsMonthDayValid ( makeYear, tempMonth, temp[this.date.index+1]))
			return false;		
		
		return new Date(makeYear, tempMonth, temp[this.date.index+1])

        }
        else if(this.month.matched == "M" || this.month.matched == "m")
        {
		           
		tempMonth=returnTransMonthABBR(temp[this.month.index+1]);
		if ( !IsMonthDayValid ( makeYear, tempMonth, temp[this.date.index+1]))
			return false;

		return new Date(makeYear, tempMonth, temp[this.date.index+1])

        }
        else{
              	tempMonth=temp[this.month.index+1]-1;
		if ( !IsMonthDayValid ( makeYear, tempMonth, temp[this.date.index+1]))
			return false;

		return new Date(makeYear, tempMonth, temp[this.date.index+1])

        }
    }
    else{
        return false;
    }

}


function IsMonthDayValid ( Year, Month, Day) {

	//FYI in javascript January is month 0 ...... December is month 11	

	if ( Month < 0 || Month > 11 )
		return false;	

	if ( Day < 1 )
		return false;

	    
	var maxDays = 31;

        if (Month == 3 || Month == 5 || Month == 8 || Month == 10) {
        	maxDays = 30;
        }
            
	if (Month == 1){
		if (Year % 4 > 0)
              		maxDays =28;
               	else
               	if (Year % 100 == 0 && Year % 400 > 0)
                  	maxDays = 28;
    		else
                  	maxDays = 29;
       	}
            

	if (Day <= maxDays) {
		return true;
      	}
	else {
		return false;
	}

         

}


function returnTransMonth(strMonth)
{
    for(var intCount = 0;intCount < monthArray.length;intCount++)
    {
    	if(monthArray[intCount].toUpperCase() == strMonth)
    	{
    		return intCount;
    	}
     }
    return 0;
}
function returnTransMonthABBR(strMonth)
{
    for(var intCount = 0;intCount < shortMonthArray.length;intCount++)
    {
    	if(shortMonthArray[intCount].toUpperCase() == strMonth)
    	{
    		return intCount;
    	}
     }
    return 0;
}






