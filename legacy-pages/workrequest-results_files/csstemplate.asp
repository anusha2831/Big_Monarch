

/********************************************************************************/
BODY, TABLE, TD, EM, P
{
	font-family:				verdana,helvetica;
	font-size:					8pt;
	color:						black;

}

TEXTAREA, INPUT, SELECT
{
	font-family:				verdana,helvetica;
	font-size:					8pt;
	color:						black;

}

EM
{
background-color:				yellow;
font-style:						normal;
}

/********************************************************************************/
/*For Standard Link Throughout the site											*/
A
{
	font-style:					Normal;
	text-decoration:			underline;
	color:						#003366;
}
A:HOVER
{
	font-style:					Normal;
	text-decoration:			underline;
	color:						#993366;
}
/*
A:VISITED
{
	font-style:					;
	text-decoration:			;
	color:						;
}
*/
A:ACTIVE
{
	font-style:					Normal;
	text-decoration:			underline;
	color:						#993366;
}
/********************************************************************************/
/* For Top Navigation (menu)													*/
A.clsMenuTop
{
	font-family:				verdana,helvetica;
	font-size:					8pt;
	font-weight:				Bold;
	font-style:					Normal;
	text-decoration:			none;
	color:						#000000;
		
}
A.clsMenuTop:HOVER
{
	font-style:					Normal;
	text-decoration:			underline;
	color:						black;
}
/*
A.clsMenuTop:VISITED
{
	font-style:					;
	text-decoration:			;
	color:						;
}
*/
A.clsMenuTop:ACTIVE
{
	font-style:					Normal;
	text-decoration:			none;
	color:						white;
}

/********************************************************************************/
TABLE.clsTblWithBorder 
{
	font-family:				verdana,helvetica;
	border:						1px black solid
}

/********************************************************************************/
/* Used for Columns Headers													    */
TH
{
	font-family:				verdana,helvetica;
	font-style:					Normal;
	font-size:					10pt;
	text-decoration:			none;
	text-align:					center;
	color:						white;
	font-weight:				bold;
	background-color:			#336666;					
}

TH a
{
	font-family:				verdana,helvetica;
	color:						white;
}
/*
TH a:VISITED
{
	color:						yellow;
}
*/
TH a:HOVER
{
	color:						yellow;
}

/*Display the first option of a select box as white*/
OPTION.clsClear
{
    color: white;
}

.clsSubHeading
{
    background-color:           #99CC99;	
	text-align:					center;
}

.clsSmall
{
    font-size:                  8pt;
}

/********************************************************************************/
/*Used to alternate colors in a row or any other element when showing a list	*/
.clsContrast
{
	background-color:			#e0e0e0;	
}

.clsRow
{
    background-color: #fff;
}

/*Used to show darker alternate colors in a row or any other element when showing a list	*/
.clsDarkContrast
{
	background-color:			#b0b0b0;	
}


/********************************************************************************/
/*Use for all Error Displays													*/
.clsError
{
	font-family:				verdana,helvetica;
	font-size:					10pt;
	font-style:					Normal;
	color:						red;
	font-weight:				bold;
}
/********************************************************************************/

/********************************************************************************/
/*Use for all Message Displays													*/
.clsMessage
{
	font-family:				verdana,helvetica;
	font-size:					10pt;
	font-style:					Normal;
	color:						#000099;
	font-weight:				bold;
}
/********************************************************************************/


/*For Labels used in forms or any other uses									*/
.clsLbl
{
	font-family:				verdana,helvetica;
	font-size:					8pt;
    font-weight:				bold;
	text-align:					right;
	color:                      black;
}
.clsLblCenter
{
	font-family:				verdana,helvetica;
	font-size:					8pt;
    font-weight:				bold;
	text-align:					center;
	color:                      black;
}
/********************************************************************************/
/*For Labels used in forms or any other uses that need left justify				*/
.clsLblLeft
{
	font-family:				verdana,helvetica;
	font-size:					8pt;
    font-weight:				bold;
	text-align:					left;
	color:                      black;
}

/********************************************************************************/
/*For Labels in a form that are required for the user to fill out				*/	
.clsLblRequired
{
	font-family:				verdana,helvetica;
	font-size:					8pt;
	font-weight:				bold;
	text-align:					right;
	color:						red;		
}

/********************************************************************************/
/*For Labels in a form that are disabled										*/	
.clsLblDisabled
{
	font-family:				verdana,helvetica;
	font-size:					8pt;
	font-weight:				bold;
	text-align:					right;
	color:						gray;		
}

/********************************************************************************/
/*For Labels in a form that are required for the user to fill out				*/	
.clsLblLeftRequired
{
	font-family:				verdana,helvetica;
	font-size:					8pt;
	font-weight:				bold;
	text-align:					left;
	color:						red;		
}
/********************************************************************************/

/********************************************************************************/
/*For Labels in a form that are disabled										*/	
.clsLblLeftDisabled
{
	font-family:				verdana,helvetica;
	font-size:					8pt;
	font-weight:				bold;
	text-align:					left;
	color:						gray;		
}
/********************************************************************************/

/* Used for Page Header if Header tags are not desired							*/
.clsPageHdr
{

	font-family:				verdana,arial,helvetica;
	font-size:					12pt;
	font-style:					normal;
	font-weight:				bold;
	text-decoration:			none;
	color:						white;
	background-color:           #003366;
	text-align:                 center;

}
/********************************************************************************/
/* Used for Page Sub-Header														*/
.clsPageSubHdr
{

	font-family:				verdana,arial,helvetica;
	font-size:					8pt;
	font-style:					normal;
	font-weight:				bold;
	text-decoration:			none;
	color:						black;
	background-color:           #b0b0b0;
	text-align:                 center;

}
/********************************************************************************/
/*Used for Page numbering														*/
.clsPageNum 
{
	font-family:				verdana,helvetica;
	font-size:					8pt;
}
/********************************************************************************/
/*Used for Page Footers															*/
.clsFooter
{
	font-family:				verdana,helvetica;
	font-size:					8pt;
	font-style:					Normal;
	color:						black;
}
/********************************************************************************/
/*Used for Total Columns 														*/
.clsTotal
{
	font-family:				verdana,helvetica;
	font-size:					8pt;
	font-style:					normal;
	text-decoration:			none;
	color:						black;
	font-weight:				bold;
	background-color:			lightyellow;
}

/********************************************************************************/
/*Used for Highlighting something.  Currently being used in the drop down menu of Sub-Contractors  */
.clsHighLight
{
   background-color:			silver;
	font-family:				verdana,helvetica;
	font-size:					8pt;
	font-style:					normal;
	color:					   black;
	font-weight:				bold;
}

/*******************************************************************************/
/*Used to override text alignment in tags that align text*/

.clsTxt
{
	font-family:				verdana,helvetica;
	font-size:					8pt;
	color:                      black;
}

.clsTxtLeft
{
	text-align:					left;
}

.clsTxtRight
{
	text-align:					right;
}

TABLE.clsTblFrm
{
	background-color: #e0e0e0;
	
}
.clsTblFrm.TR.clsTblFrmContrast
{
	background-color: #FFFFFF;
	
}

.clsSubSectionHeader
{
 	font-family:				verdana,helvetica;
	font-style:					Normal;
	font-size:					10pt;
	text-decoration:			none;
	text-align:					center;
	color:						black;
	font-weight:				bold;
	background-color:			beige;		
}
.clsSubSectionHeaderRequired
{
 	font-family:				verdana,helvetica;
	font-style:					Normal;
	font-size:					10pt;
	text-decoration:			none;
	text-align:					center;
	color:						red;
	font-weight:				bold;
	background-color:			beige;		
}

.menubutton
{
    border-left: solid 1px #EFEFEF;
    border-top: solid 2px #EFEFEF;
    border-right: solid 1px #666666; 
    border-bottom: solid 2px #666666;
    background-color:#EFEFEF;
	cursor: arrow;
	width: 35px;
	height: 35px;
	max-width: 35px;
	max-height: 35px;
	clip: rect(0px,0px,35px,35px)
	overflow:hidden;
}
.menubuttonDISABLE
{
	border-left: solid 1px #666666;
    border-top: solid 1px #666666;
    border-right: solid 1px #EFEFEF; 
    border-bottom: solid 1px #EFEFEF;
    background-color:#EFEFEF;
	cursor: arrow;
	width: 35px;
	height: 35px;
	max-width: 35px;
	max-height: 35px;
	clip: rect(0px,0px,35px,35px)
	overflow:hidden;
}  

.menubuttonHOVER
{
    border-left: solid 1px #FFFF66;
    border-top: solid 2px #FFFF66;
    border-right: solid 1px #FF9900;
    border-bottom: solid 2px #CC9900;
    background-color:#FFCC33;
	cursor: pointer;
	width: 35px;
	height: 35px;
	max-width: 35px;
	max-height: 35px;
	clip: rect(0px,0px,35px,35px)
	overflow:hidden;
}
.menubuttonsmall
{
    border-left: solid 1px #EFEFEF;
    border-top: solid 2px #EFEFEF;
    border-right: solid 1px #666666; 
    border-bottom: solid 2px #666666;
    background-color:#EFEFEF;
	cursor: arrow;
	width: 18px;
	height: 18px;
	max-width: 18px;
	max-height: 18px;
	clip: rect(0px,0px,18px,18px)
	overflow:hidden;
}
.menubuttonsmallDISABLE
{
    border-left: solid 1px #666666;
    border-top: solid 1px #666666;
    border-right: solid 1px #EFEFEF; 
    border-bottom: solid 2px #666666;
	cursor: arrow;
	width: 18px;
	height: 18px;
}  

.menubuttonsmallHOVER
{
    border-left: solid 1px #FFFF66;
    border-top: solid 2px #FFFF66;
    border-right: solid 1px #FF9900;
    border-bottom: solid 2px #CC9900;
    background-color:#FFCC33;
	cursor: pointer;
	width: 18px;
	height: 18px;
}


.UCTitleDiv
{
	border-top: 1px black solid;
    border-right: 1px black solid;
    border-left: 1px black solid;
    border-bottom: 0px solid #EFEFEF;
    background-color:#EFEFEF;
    width:100%;
    padding:3px
    font-family: verdana, arial, sans, serif;
    font-size: 15px;
    font-weight: bold;
    color: #666666;
    vertical-align:bottom;
    height:22px;
 }
 .UCTopDiv
 {
	border-bottom: 1px black solid;
    width:100%;
    height:100%;
    padding:0px
    text-align:right;
    vertical-align:bottom;
 }
 .UCIDiv
 {
	 background-color:#EFEFEF;
     position:relative;
     border-right: 1px black solid;
     border-top: 0px solid #EFEFEF;
     border-bottom: 1px black solid;
     border-left: 1px black solid;
     padding: 2px;
 }
 .UCFrame
 {
	position:relative;
    border: 1px solid #CCCCCC;
    padding: 0px;
    vertical-align:bottom;
    width:99%;
    height:99%;
 }
 .UC
 {
   border-bottom: 15px solid #CCCCCC;
   background-color:#CCCCCC;
   padding:0px;
 }
 .UMGroup
 {
    border-bottom: 1px black solid;
    border-right:  1px black solid;
    border-top:  1px black solid;
    border-left:  1px black solid;
    background-color:#e0e0e0;
 }
 .UMGroupHeader
 {
	background-color:#336666;
	border-bottom: 1px black solid;
	font-family: Verdana;
    font-weight:bold;
    font-size:8pt;
    color:white;
 }
  .UMLink
 {
    background-color:#e0e0e0;
    font-family: arial;
    font-size:8pt;
 }
 .UMLinkEX
 {
    background-color:#CCCCCC;
    font-family: arial;
    font-size:8pt;    
 }
 .UM
 {
    background-color:#e0e0e0;
    font-family: Verdana;
    font-weight:bolder;
    font-size:12pt;
    color:#999999;
 }
 .UCOMP
 {
	background-color: #EFEFEF;
	border:2px solid #999999;
	padding:2px;
	cursor:auto;
 }
 .UCOMPhover
 {
	background-color: #EFEFEF;
	border-left:2px solid #3300FF;
	border-right:2px solid #3300FF;
	border-top:2px solid #3300FF;
	border-bottom:2px solid #3300FF;
	padding:2px;
	cursor:pointer;
 }
 .seFolderCLICK
 {
    background-color:#e0e0e0;
    border-right: 1px black solid;
    border-top: 1px black solid;
    border-bottom: 1px black solid;
    border-left: 1px black solid;
    padding: 2px;
 }
 
 tr.highlight
 {
    background-color:#9CB2CE;
}