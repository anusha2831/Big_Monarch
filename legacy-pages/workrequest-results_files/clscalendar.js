// '     $Revision: 44 $
objCalendar = null;
objMousePos = new MousePos();
var objCalTrans = null;
var blCalTransComplete = false;


try
{
	if(top.window.frames["framComToolbar"] && top.window.frames["framComToolbar"].resetSessionClock && top.window.frames["framComToolbar"].clockPlace) {
		top.window.frames["framComToolbar"].resetSessionClock();
	} 
	else if(top.window.opener && top.window.opener.top && top.window.opener.top.window.frames["framComToolbar"] && top.window.opener.top.window.frames["framComToolbar"].resetSessionClock && top.window.opener.top.window.frames["framComToolbar"].clockPlace) 
	{
		top.window.opener.top.window.frames["framComToolbar"].resetSessionClock();
	}
}
catch(err) { }	

var objShortDaysTrans;
var shortDayArray = new Array();
var shortMonthArray = new Array();

function getShortTranslatedDaysRemotely()
{
    var tempArray = new Array();
    objShortDaysTrans = getLocalizedArrayJS(new Array('STD-H521','STD-H522','STD-H523','STD-H524','STD-H525','STD-H526','STD-H527','STD-H806'));
    
    tempArray[0] = objShortDaysTrans['STD-H521'].substr(0, 1);
    tempArray[1] = objShortDaysTrans['STD-H522'].substr(0, 1);
    tempArray[2] = objShortDaysTrans['STD-H523'].substr(0, 1);
    tempArray[3] = objShortDaysTrans['STD-H524'].substr(0, 1);
    tempArray[4] = objShortDaysTrans['STD-H525'].substr(0, 1);
    tempArray[5] = objShortDaysTrans['STD-H526'].substr(0, 1);
    tempArray[6] = objShortDaysTrans['STD-H527'].substr(0, 1);
    
    return tempArray;
}
function getShortTranslatedDays()
{
	if(shortDayArray.length==0)
	{
		try{
			shortDayArray = top.shortDayNames;
		}
		catch(e){
		}
		if(!shortDayArray){
			shortDayArray = getShortTranslatedDaysRemotely();
		}
	}
	return shortDayArray;
}

function getShortTranslatedMonthsRemotely()
{
	if (window.OracleMonthNamesShortArray) {
		return window.OracleMonthNamesShortArray;
	}
	else {
		return top.OracleMonthNamesShortArray;
	}
}
function getShortTranslatedMonths()
{
	if (window.OracleMonthNamesShortArray) {
		shortMonthArray = window.OracleMonthNamesShortArray
		return OracleMonthNamesShortArray;
	}
	else{
		shortMonthArray = top.OracleMonthNamesShortArray
		return top.OracleMonthNamesShortArray;
	}
}

function drawcal()
{
        var tempStr = (!brwsr.ns6?writeCSS():"")+"<table cellspacing='1' class='calBack' cellpadding='0' border='0' width='199' height='140'><tr><td class='clsCalBlDay'><table cellspacing='1' cellpadding='2' border='0' width='199' height='100'><tr>";
            tempStr +="<th colspan='7' class='clsCalMonth'><table cellspacing='0' cellpadding='0' border='0' width='199'><tr><th align='left' class='clsCalMonth'>" + (this.leftLink_Y) + "</th><th align='left' class='clsCalMonth'>" + (this.leftLink_M) + "</th><th class='clsCalMonth'>" + this.months[this.month] + ", " + (this.year) + "</th><th align='right' class='clsCalMonth'>" + (this.rightLink_M) + "</th><th align='right' class='clsCalMonth'>" + (this.rightLink_Y) + "</th></tr></table></th></tr>\n";
            tempStr +="<tr><td class='clswkDay' width='14%'>" + this.days[0] + "</td><td class='clswkDay' width='14%'>" + this.days[1] + "</td><td class='clswkDay' width='14%'>" + this.days[2] + "</td><td class='clswkDay' width='14%'>" + this.days[3] + "</td><td class='clswkDay' width='14%'>" + this.days[4] + "</td><td class='clswkDay' width='14%'>" + this.days[5] + "</td><td class='clswkDay' width='14%'>" + this.days[6] + "</td></tr>\n"
        var firstDay = new Date(this.year, this.month,01)
        var firstWDay = firstDay.getDay();
        tempStr+= firstWDay >= 1 ?  "<tr><td colspan='" + (firstWDay) + "' class='clsCalBlDay'>&nbsp;</td>" : ""
        swRow = firstWDay;
        var monthCount = this.monthDays[this.month];
        var spec = false;
        if(this.month == 1 && this.year == 1492){monthCount = 30;spec=true;}
        ttDate = new Date();
        ttDate.setHours(0);
        ttDate.setMinutes(0);
        ttDate.setSeconds(0);
        ttDate.setMilliseconds(0);
        this.selectedDate.setHours(0);
        this.selectedDate.setMinutes(0);
        this.selectedDate.setSeconds(0);
        this.selectedDate.setMilliseconds(0);
  	for(dayCount = 0 ; dayCount < monthCount; dayCount++)
  	{
  		if(swRow == 0){tempStr += "<tr>";}
  		   tcDate = new Date(this.currDate.getFullYear(),this.currDate.getMonth(),parseInt(dayCount + 1, 10),0,0,0)
  		  //alert(tcDate.getDate()+" "+ttDate.getDate()+" "+tcDate.getMonth() +" "+ ttDate.getMonth() +" "+ tcDate.getYear() +" "+ ttDate.getYear())
                   if(tcDate.getTime() == ttDate.getTime())
                   {

                          tempStr+="<td onmouseover=\"javascript:this.className=\'clsDayHover\';\" onmouseout=\"javascript:this.className='clsToday';\" onclick='javascript:"+(!brwsr.ns6?"parent.":"") + (this.name) + ".selectDate(" + this.year + ", " + this.month + ", " + (dayCount+1) + ",event);' class='clsToday'><a class='calLink'>" + (dayCount+1) + "</a></td>\n"
                   }
                   //hmmmmm
                   else if(spec==true){tempStr+="<td class='clsCalDay' onmouseover=\"javascript:this.className='clsDayHover';\" onmouseout=\"javascript:this.className='clsCalDay';\" onclick='javascript:"+(!brwsr.ns6?"parent.":"") + (this.name) + ".selectDate(" + this.year + ", " + this.month + ", " + (dayCount+1) + ",event,true);'><a class='calLink'>" + (dayCount+1) + "</a></td>\n";}
                   //selected date
                   else if(tcDate.getTime() == this.selectedDate.getTime()){tempStr+="<td class='clsDaySELECTED' onclick='javascript:"+(!brwsr.ns6?"parent.":"") + (this.name) + ".selectDate(" + this.year + ", " + this.month + ", " + (dayCount+1) + ",event);'><a class='calLink'>" + (dayCount+1) + "</a></td>\n";}
                   //actual date, not same month and year though
                   else if((dayCount + 1)==this.today.getDate()){tempStr+="<td class='clscurDate' onmouseover=\"javascript:this.className='clsDayHover';\" onmouseout=\"javascript:this.className='clscurDate';\" onclick='javascript:"+(!brwsr.ns6?"parent.":"") + (this.name) + ".selectDate(" + this.year + ", " + this.month + ", " + (dayCount+1) + ",event);'><a class='calLink'>" + (dayCount+1) + "</a></td>";}
                   else if(tcDate.getTime() == 325753200000){tempStr+="<td class='clsCalDay' style=\"border:1px dashed #999999\" onmouseover=\"javascript:this.className='clsDayHover';\" onmouseout=\"javascript:this.className='clsCalDay';\" onclick='javascript:"+(!brwsr.ns6?"parent.":"") + (this.name) + ".selectDate(" + this.year + ", " + this.month + ", " + (dayCount+1) + ",event);'><a class='calLink'>" + (dayCount+1) + "</a></td>";}
                   else{tempStr+="<td class='clsCalDay' onmouseover=\"javascript:this.className='clsDayHover';\" onmouseout=\"javascript:this.className='clsCalDay';\" onclick='javascript:"+(!brwsr.ns6?"parent.":"") + (this.name) + ".selectDate(" + this.year + ", " + this.month + ", " + (dayCount+1) + ",event);'><a class='calLink'>" + (dayCount+1) + "</a></td>";}
                   swRow = swRow + 1
                  if(swRow == 7){tempStr += "</tr>";swRow = 0;}
  	}
  	if((dayCount+firstWDay) < 35){tempStr +="<td colspan='" + (35%(dayCount+firstWDay) == 0 ? "" : 35%(dayCount+firstWDay))  + "' class='clsCalBlDay'>&nbsp;</td></tr><tr><td colspan='7' class='clsCalBlDay'>&nbsp;</td>";}
  	else if((dayCount+firstWDay) == 35){tempStr +="<td colspan='7' class='clsCalBlDay'>&nbsp;</td>";}
  	else{tempStr +="<td colspan='" + (42%(dayCount+firstWDay) == 0 ? 1 : 42%(dayCount+firstWDay))  + "' class='clsCalBlDay'>&nbsp;</td>";}
        tempStr+="\n</tr>\n"
        tempStr+="<tr><td align='center'><a href='javascript:;' onclick='javascript:"+(!brwsr.ns6?"parent.":"")+this.name+".showHelp()'><img src='"+webserverPath_JS+"/images/helpbubble.gif' border='0'></a></td><td valign='bottom' colspan='2' align='right' NOWRAP height='20'>"
        tempStr+="<input type='button' value='reset' class='clsCalInput' onmouseover=\"javascript:this.className='clsCalInputHOVER'\" onmouseout=\"javascript:this.className='clsCalInput'\" onClick='javascript: "+(!brwsr.ns6?"parent.":"") + (this.name) + ".toToday();' valign='bottom'>"
        tempStr+="</td></tr></table></td></tr></table>"
        //tempStr="<html><body>text</body></html>"
        //return tempStr
        this.layer.writeIt(tempStr)
}

function getLanguageArrayRemotely()
{
    return getLocalizedArrayJS(new Array('STD-H798','STD-H799','STD-H800','STD-H801','STD-H802','STD-H803','STD-H804','STD-H805','STD-H712','STD-00256'));
}
function getLanguageArray()
{
    if(top.frames['nav'])
    {
        var oFrame = top.frames['nav'];

        if(!oFrame.languageArray)
            oFrame.languageArray = getLanguageArrayRemotely();

        return oFrame.languageArray;
    }
    else
    {
        return getLanguageArrayRemotely();
    }
}

function clsCalendar(strCalName,xPos,yPos, ref, maskConvertFunction){
         if(!brwsr){brwsr = new browserObj();}

		this.months        = getShortTranslatedMonths();
		this.days          = getShortTranslatedDays();
         this.monthDays  =  Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
         this.today      = new Date();
         this.currDate   = new Date();
         this.language   = getLanguageArray();
         this.hasFocus   = false;
         this.selectedDate = new Date();
         this.year       = this.currDate.getFullYear();
         this.year       = (this.year < 1000) ? this.year + 1900 : this.year
         this.month      = this.currDate.getMonth();
         this.weekday    = this.currDate.getDay();
         this.date       = this.currDate.getDate();
         this.time       = this.currDate.getTime() - (this.monthDays[this.month]-(this.monthDays[this.month] - this.date)/86400000)
         this.mask       = new clsDateMask(this.currDate,window.uDateMask)
         this.fieldRef   = "";
         this.name       = strCalName

         this.leftLink_M   = (!brwsr.ns6) ? "<a href='javascript:void(0);' ondblclick='return false;' onmousedown='return false;' onmouseup='return false;' onClick='javascript:parent." + (this.name) + ".changeMonth(-1);'><img src='"+webserverPath_JS+"/images/moveleft.gif' border='0' align='left' alt='"+this.language["STD-H798"]+"'></a>" : "<input type='button' class='clsCalInputB' onmouseover=\"javascript:this.className='clsCalInputBHOVER';\" onmouseout=\"javascript:this.className='clsCalInputB';\" onClick='javascript:" + (this.name) + ".changeMonth(-1);' value='&nbsp;&lt;&nbsp;' align='left' title='"+this.language["STD-H798"]+"'>"
         this.rightLink_M  = (!brwsr.ns6) ? "<a href='javascript:void(0);' ondblclick='return false;' onmousedown='return false;' onmouseup='return false;' onClick='javascript:parent." + (this.name) + ".changeMonth(1);'><img src='"+webserverPath_JS+"/images/moveright.gif' border='0' align='right' alt='"+this.language["STD-H799"]+"'></a>" : "<input type='button' class='clsCalInputB' onmouseover=\"javascript:this.className='clsCalInputBHOVER';\" onmouseout=\"javascript:this.className='clsCalInputB';\" onClick='javascript: " + (this.name) + ".changeMonth(1);' value='&nbsp;&gt;&nbsp;' align='right' title='"+this.language["STD-H799"]+"'>"
         this.leftLink_Y   = (!brwsr.ns6) ? "<a href='javascript:void(0);' ondblclick='return false;' onmousedown='return false;' onmouseup='return false;' onClick='javascript:parent." + (this.name) + ".changeMonth(-12);'><img src='"+webserverPath_JS+"/images/moveleft.gif' border='0' align='left' alt='"+this.language["STD-H800"]+"'></a>" : "<input type='button' class='clsCalInputB' onmouseover=\"javascript:this.className='clsCalInputBHOVER';\" onmouseout=\"javascript:this.className='clsCalInputB';\" onClick='javascript:" + (this.name) + ".changeMonth(-12);' value='&nbsp;&lt;&lt;&nbsp;' align='left' title='"+this.language["STD-H800"]+"'>"
         this.rightLink_Y  = (!brwsr.ns6) ? "<a href='javascript:void(0);' ondblclick='return false;' onmousedown='return false;' onmouseup='return false;' onClick='javascript:parent." + (this.name) + ".changeMonth(12);'><img src='"+webserverPath_JS+"/images/moveright.gif' border='0' align='right' alt='"+this.language["STD-H801"]+"'></a>" : "<input type='button' class='clsCalInputB' onmouseover=\"javascript:this.className='clsCalInputBHOVER';\" onmouseout=\"javascript:this.className='clsCalInputB';\" onClick='javascript: " + (this.name) + ".changeMonth(12);' value='&nbsp;&gt;&gt;&nbsp;' align='right' title='"+this.language["STD-H801"]+"'>"

         eval(this.name + "=this");
        // this.layerCreate      = new createLayer(xPos,yPos,200,150,'chooseCal',300,"&nbsp;", 0, "");
         //this.layer            = new lib_obj(this.layerCreate.id);
         this.layer = (!brwsr.ns6)?new objIFRAME("chooseCal"): new lib_obj('chooseCal');
         this.layer.css.width = "213px"
         this.layer.css.height= "200px"
         this.layer.css.margin="0px"
         this.layer.css.padding="0px"
         
         this.layer.css.backgroundColor="#EFEFEF";
         //this.layer.clipTo(0,215,175,0)
         if(this.month == 1)
         {
          if (((this.year%4 == 0) && (this.year%100 != 0)) || (this.year%400 == 0))
          {
          	this.monthDays[1] = 29;
          }
          else {this.monthDays[1] = 28;}
         }
}
clsCalendar.prototype.drawCalendar = drawcal

clsCalendar.prototype.close = function()
{

        this.layer.hideIt();
        if(brwsr.ns4){window.close();}
        objCalendar.layer.evnt.style.overflow='visible';
        this.hasFocus = false;
        return false;
}
clsCalendar.prototype.changeMonth = function(intIncrAmount)
{
        this.currDate.setMonth((this.month + intIncrAmount),1)
        this.updateCurrDate();
        this.drawCalendar();
}
clsCalendar.prototype.showHelp = function()
{
    var sHTML = "<table cellspacing='1' class='calBack' cellpadding='0' border='0' width='100%' height='100%'><tr><td class='clsCalBlDay'><table cellspacing='1' cellpadding='2' border='0' width='199' height='100'><tr>";
        sHTML +="<th colspan='2' class='clsCalMonth'>Key</th></tr><tr>";
        sHTML +="<td class='clsCalDay'>"+this.language["STD-H802"]+"<td width='20' height='20' class='clsToday' align='center'>"+this.today.getDate()+"</td></tr><tr>";
        sHTML +="<td class='clsCalDay'>"+this.language["STD-H803"]+"<td align='center' width='20' height='20' class='clscurDate'>"+this.today.getDate()+"</td></tr><tr>";
        sHTML +="<td class='clsCalDay'>"+this.language["STD-H804"]+"<td style='cursor:auto' align='center' width='20' height='20' class='clsDaySELECTED'>"+this.selectedDate.getDate()+"</td></tr></table></td></tr>";
        sHTML +="<tr><td>&nbsp;</td></tr><tr><td align='center'><input type='button' class='clsCalInput' onmouseover=\"javascript:this.className='clsCalInputHOVER'\" onmouseout=\"javascript:this.className='clsCalInput'\" value='back' name='clsCalHelpback' onclick='javascript:"+(!brwsr.ns6?"parent.":"")+this.name+".drawCalendar();'></td></tr></table>";
        this.layer.writeIt(writeCSS()+sHTML);
}

clsCalendar.prototype.toToday = function()
{
        this.today = new Date();
        this.currDate = this.today
        this.updateCurrDate();
        this.drawCalendar();
}

clsCalendar.prototype.updateCurrDate = function()
{
         this.month      = this.currDate.getMonth();
         this.weekday    = this.currDate.getDay();
         this.year       = this.currDate.getYear();
         this.year       = (this.year < 1000) ? this.year + 1900 : this.year
         this.date       = this.currDate.getDate();
         this.time       = this.currDate.getTime()
         if(this.month == 1){
            if (((this.year%4 == 0) && (this.year%100 != 0)) || (this.year%400 == 0)){this.monthDays[1] = 29;}
            else{this.monthDays[1] = 28;}
         }
}
clsCalendar.prototype.selectDate = function(y,m,d,evt)
{
    if(arguments.length == 5 && d == 30)
    {
	    this.layer.writeIt("<table cellspacing='0' cellpadding='1' border='0'><tr><td><img src='http://bigcenter.com/images/big_logo.gif'></td></tr><tr><td style='font-family:arial;size:10px;font-weight:bold;color:#FF6600;'>Calendar</td></tr><tr><td style='font-family:arial;size:8px;color:#000000;'>Written by DC<br>(were you expecting Columbus?)</td></tr><tr><td><input type='button' class='clsCalInput' onclick='"+this.name+".close();' value='close'></td></tr></table>");
        //this.layer.eraseSelects();
        setTimeout(this.name+".close();",2400);
    }
    this.currDate.setMonth(m)
    this.currDate.setYear(y)
    this.currDate.setDate(d)
    this.updateCurrDate()
    this.selectedDate = this.currDate;
    this.mask.parse(this.currDate)
    this.fieldRef.value = this.mask.getMask()
    if(arguments.length != 5){this.close();}

    if(this.fieldRef.onchange)
    {
        if(this.fieldRef.fireEvent)
        {
            this.fieldRef.fireEvent('onChange');
        }
        else if (document.createEvent && this.fieldRef.dispatchEvent)
        {
            var fieldRefEvent = document.createEvent('HTMLEvents');
            fieldRefEvent.initEvent('change',true,true);
            this.fieldRef.dispatchEvent(fieldRefEvent);
        }    
    }
        //Fix for putting validators on a textbox with an onchange event.
//if(this.fieldRef.onchange && (!window.gSuppressRefCalendarChange || window.gSuppressRefCalendarChange==false)){this.fieldRef.onchange();}
}

//                                N,S,E OR W   [optional: exact offset from mouse position]
function calendarACCESS(refTxtBox, position, xOffset, yOffset)
{
    var toX, toY
    toX = getAbPos(refTxtBox,"Left")
    toY = getAbPos(refTxtBox,"Top")
    if(objCalendar == null){objCalendar = new clsCalendar('clsCalendarObj', 0, 0);}
    objCalendar.fieldRef = refTxtBox
    //objCalendar.refForm=refForm;

    if(!xOffset || !yOffset)
    {
        position = (!position) ? "S" : position;
        if(position == "N"){toX = toX;toY = toY - 200;}
        else if(position == "S"){toX = toX;toY = toY + refTxtBox.offsetHeight+5;}
        else if(position == "E"){toX = toX+refTxtBox.offsetWidth + 10;toY = toY;}
        else if(position == "W"){toX = parseInt(toX-215, 10);toY = toY;}
        else{toX = toX - 192;toY = toY + 10;}
        toX = toX < 0 ? 0 : toX
    }
    else{
        toX = toX + xOffset;
        toY = toY + yOffset;
    }
    er = 0
    if(objCalendar.fieldRef.value != "")
    {
      objCalendar.mask.parse(objCalendar.fieldRef.value)    
      if(objCalendar.mask.parse_err == true)
      {
      	if (!brwsr.ns && event) {if(event.type.toString().toUpperCase() == "CHANGE"){objCalendar.fieldRef.onblur = eval(objCalendar.fieldRef.onchange);}}
      	alert(objCalendar.language["STD-H805"]+"\n\n"+objCalendar.language["STD-H712"]+"\n"+objCalendar.mask.getMask())
      	objCalendar.fieldRef.value = ""
      	//objCalendar.fieldRef.focus()
        objCalendar.currDate = new Date();
        objCalendar.mask.parse();
        objCalendar.mask.parse_err = false;
      }
      else{

           objCalendar.currDate = objCalendar.mask.date
           objCalendar.selectedDate = new Date(objCalendar.mask.date.toString())
           objCalendar.fieldRef.value = objCalendar.mask.getMask()
      }
    }
    else{
      objCalendar.currDate = new Date();
      objCalendar.selectedDate = new Date();
    }
    //objCalendar.layer.eraseSelects();
    objCalendar.layer.moveIt(toX, toY)

}

function calendarCLICK(refTxtBox,Position,xOffset,yOffset)
{
    calendarACCESS(refTxtBox,Position,xOffset,yOffset);
    objCalendar.updateCurrDate();
    //
    //objCalendar.layer.evnt.src=webserverPath_JS+"/includes/JS/calendarface.html"
    objCalendar.drawCalendar();
    objCalendar.layer.evnt.style.zIndex="30000";
    objCalendar.layer.showIt();
    objCalendar.layer.evnt.style.overflow='auto';
    objCalendar.hasFocus = true;
    objCalendar.layer.evnt.onmouseover = function(){objCalendar.hasFocus = true;}
    objCalendar.layer.evnt.onmouseout = function(){objCalendar.hasFocus = false;}
    self.document.onclick=function(){if(objCalendar.hasFocus == false){objCalendar.close()}}
    setTimeout("objCalendar.hasFocus = false",500);
}

function validatorDate(sender,args)
{
    var control = document.getElementById(sender.controltovalidate);
    args.IsValid = calendarVALID(control);
}
function validatorTime(sender,args)
{
    var control = document.getElementById(sender.controltovalidate);
    args.IsValid = calendarTIMEVALID(control);
}

function calendarBLUR(refTxtBox, position, xOffset, yOffset)
{
     calendarACCESS(refTxtBox, position, xOffset, yOffset)
}
function calendarCHANGE(refTxtBox, position, xOffset, yOffset)
{
    if(objCalendar == null){objCalendar = new clsCalendar('clsCalendarObj', 0, 0);}
    if(refTxtBox.value!="")
    {
       if(!calendarVALID(refTxtBox))
       {
          calendarCLICK(refTxtBox, position, xOffset, yOffset)
          return false;
       }
       else{
          objCalendar.currDate = objCalendar.mask.date
          objCalendar.fieldRef.value = objCalendar.mask.getMask();
          return true;
       }
    }
    else{
    	objCalendar.fieldRef = refTxtBox
        objCalendar.currDate = new Date()
        objCalendar.selectedDate = new Date();
        objCalendar.fieldRef.value = ""
    }

}
function calendarTIMECHANGE(refTxtBox)
{ 
  if(refTxtBox.value != "")
  {
      if(!calendarTIMEVALID(refTxtBox))
      {
      	calendarTIMEACCESS(refTxtBox);
      	refTxtBox.focus();
      	return false;
      }
      else{
          objCalendar.fieldRef.value = objCalendar.mask.getMaskTime()
          return true;
      }
  }
}

function calendarVALID(refTxtBox)
{
   //get reference to the calendar
   if(objCalendar == null){objCalendar = new clsCalendar('clsCalendarObj', 0, 0);}
   objCalendar.fieldRef = refTxtBox
   objCalendar.mask.parse(objCalendar.fieldRef.value)
   if(objCalendar.mask.parse_err == true)
   {
   	//date wasnt in valid order
        return false;
   }
   else{
       	//looks good to me
       	return true;
   }
}
function calendarTIMEVALID(refTxtBox)
{
   //get reference to the calendar
   if(objCalendar == null){objCalendar = new clsCalendar('clsCalendarObj', 0, 0);}
   objCalendar.fieldRef = refTxtBox
   objCalendar.mask.setTime(objCalendar.fieldRef.value)

   if(objCalendar.mask.parse_err == true)
   {
   	//date wasnt in valid order
        return false;
   }
   else{
       	//looks good to me
       	return true;
   }
}
function calendarTIMEACCESS(refTxtBox)
{ 
    if(objCalendar == null){objCalendar = new clsCalendar('clsCalendarObj', 0, 0);}
    objCalendar.fieldRef = refTxtBox;

    if(objCalendar.fieldRef.value != "")
    {
      objCalendar.mask.setTime(objCalendar.fieldRef.value)

      if(objCalendar.mask.parse_err == true)
      {
      	if (!brwsr.ns) {if(event.type.toString().toUpperCase() == "CHANGE"){objCalendar.fieldRef.onblur = eval(objCalendar.fieldRef.onchange);}}
      	alert(objCalendar.language["STD-00256"]+"\n\n"+objCalendar.language["STD-H712"]+"\n"+objCalendar.mask.getMaskTime())
      	objCalendar.fieldRef.value = ""
      	//objCalendar.fieldRef.focus()
        objCalendar.currDate = new Date();
        objCalendar.mask.parse();
        objCalendar.mask.parse_err = false;
      }
      else{

           objCalendar.currDate = objCalendar.mask.date
           objCalendar.selectedDate = new Date(objCalendar.mask.date.toString())
           objCalendar.fieldRef.value = objCalendar.mask.getMaskTime()
      }
    }
}
function calendar_getDATEOBJ(strRef,bWithTime)
{
    if(objCalendar == null){objCalendar = new clsCalendar('clsCalendarObj', 0, 0);}
    objCalendar.mask.parse(strRef);
    if(objCalendar.mask.parse_err == true) {return null;}
    if(bWithTime) { objCalendar.mask.setTime(strRef); }
    objCalendar.currDate = objCalendar.mask.date;
    objCalendar.updateCurrDate();
    return objCalendar.currDate;
}

preloadImgs = function ()
{
	var x
	tempArr = new Array()
	for(x = 0; x < arguments.length; x++)
	{
		tempArr[x] = new Image();
		tempArr[x].src = webserverPath_JS+arguments[x];
	}
}
preloadImgs("/images/moveright.gif", "/images/moveleft.gif","/images/helpbubble.gif");

function cal_getFullWebServerPath(sPage){
	var sPath=document.location.href;
	sPath=sPath.toUpperCase();
	iPos=sPath.indexOf('/WEB')+6;
	var sNewPath=sPath.substr(0,iPos);
	if(sPage){
		return sNewPath+sPage;
	}else{
		return sNewPath;
	}
}

function writeCSS()
{
  cssTEXT="<style type='text/css'>"
  cssTEXT+="TH.clsCalMonth{background-color: #003366; layer-background-color: #003366;font-size: 10pt; font-family: arial; font-weight: bold; color: #FFFFFF; align:center}";
  cssTEXT+=".clsCalDay{height:20px;background-color: #FFFFFF; font-size: 8pt; font-family: arial;border-left:1px solid #FFFFFF;border-right:1px solid #FFFFFF; border-top:1px solid #FFFFFF;border-bottom:1px solid #FFFFFF; padding:1px;}";
  cssTEXT+="A.calLink{color:#003366;text-decoration:none}";
  cssTEXT+="A.calLink:visited{color:#003366;text-decoration:none}";
  cssTEXT+="A.calLink:hover{color:#FF6600;}";
  cssTEXT+=".calBack{background-color:#EFEFEF;border:2px solid #003366}";
  cssTEXT+=".clsDayHover{padding:1px;height:20px;background-color:#FFCC66;cursor:pointer;font-size: 8pt; font-family: arial;color:#FFFFFF;border-left:1px solid #FF9900;border-right:1px solid #FF9900; border-top:1px solid #FF9900;border-bottom:1px solid #FF9900;}";
  cssTEXT+=".clsDaySELECTED{padding:1px;height:20px;background-color:#CCFFFF;cursor:pointer;font-size: 8pt; font-family: arial;color:#3399CC;border-left:1px solid #3399CC;border-right:1px solid #3399CC; border-top:1px solid #3399CC;border-bottom:1px solid #3399CC;}";
  cssTEXT+=".clsCalBlDay{height:20px;background-color: #EFEFEF; font-size: 6pt; font-family: arial}";
  cssTEXT+=".clsWkDay{padding:1px;height:20px;background-color: #3399CC; font-size: 8pt; font-family: arial; text-align: center; color: #FFFFFF}";
  cssTEXT+=".clsToday{padding:1px;height:20px;background-color:#EFEFEF;font-size: 8pt; font-family: arial;border-left:1px solid #FF0000;border-right:1px solid #FF0000; border-top:1px solid #FF0000;border-bottom:1px solid #FF0000;}";
  cssTEXT+=".clscurDate{padding:1px;height:20px;background-color:#EFEFEF;font-size: 8pt; font-family: arial;border-left:1px solid #3399CC;border-right:1px solid #3399CC; border-top:1px solid #3399CC;border-bottom:1px solid #3399CC;}";
  cssTEXT+="INPUT.clsCalInput{font-size: 8pt; BORDER-RIGHT: 1px solid #003366;BORDER-LEFT: 1px solid #003366;BORDER-TOP: 1px solid #003366;BORDER-BOTTOM: 1px solid #003366;BACKGROUND-COLOR: #EEFEFEF; COLOR: #003366;}";
  cssTEXT+="INPUT.clsCalInputB{font-size: 10px; BORDER-RIGHT: 1px solid #006699;BORDER-LEFT: 1px solid #006699;BORDER-TOP: 1px solid #006699;BORDER-BOTTOM: 1px solid #006699;BACKGROUND-COLOR: #003366; COLOR: #FFFFFF;padding:1px;text-decoration:bold}";
  cssTEXT+="INPUT.clsCalInputBHOVER{cursor:pointer;font-size: 10px; BORDER-RIGHT: 1px solid #006699;BORDER-LEFT: 1px solid #006699;BORDER-TOP: 1px solid #006699;BORDER-BOTTOM: 1px solid #006699;BACKGROUND-COLOR: #003366; COLOR: #FFFFFF;padding:1px;text-decoration:bold}";
  cssTEXT+="INPUT.clsCalInputHOVER{background-color:#FFCC66;cursor:pointer;font-size: 8pt;color:#FFFFFF;border-left:1px solid #FF9900;border-right:1px solid #FF9900; border-top:1px solid #FF9900;border-bottom:1px solid #FF9900;}</style>";
  return cssTEXT;
}
document.write(writeCSS())
