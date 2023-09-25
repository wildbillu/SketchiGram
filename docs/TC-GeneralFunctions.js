// TC-GeneralFunctions
// 
// function TC_LeftForCentering(iWidthElement)
// function ForIdSetVisibility(sId, bVisible)



// to detect window back forth...

var g_GBRMS_fBufferFraction = .05;



function TC_MonthInWordsPlusYear(sYearMonth)
{
    let sYear = sYearMonth.slice(0, 4);
    let sMonth = MonthYearToNameOfMonth(sYearMonth)
    let sYearMonthName = sMonth + ' ' + sYear;
    return sYearMonthName;
}

function MonthYearToNameOfMonth(sYearMonth)
{
    if ( sYearMonth.includes('-01') )
        return 'January';
    if ( sYearMonth.includes('-02') )
        return 'Februar';
    if ( sYearMonth.includes('-03') )
        return 'March';
    if ( sYearMonth.includes('-04') )
        return 'April';
    if ( sYearMonth.includes('-05') )
        return 'May';
    if ( sYearMonth.includes('-06') )
        return 'June';
    if ( sYearMonth.includes('-07') )
        return 'July';
    if ( sYearMonth.includes('-08') )
        return 'August'
    if ( sYearMonth.includes('-09') )
        return 'September'
    if ( sYearMonth.includes('-10') )
        return 'October'
    if ( sYearMonth.includes('-11') )
        return 'November'
    if ( sYearMonth.includes('-12') )
        return 'December'
}


function TC_GetYearFromDate(sDate)
{
    iYear = parseInt(sDate.slice(0, 4));
    return iYear;
}

function TC_GetMonthFromDate(sDate)
{
    iMonth = parseInt(sDate.slice(5, 7));
    return iMonth;
}

function TC_GetDayFromDate(sDate)
{
    iMonth = parseInt(sDate.slice(8, 10));
    return iMonth;
}

function TC_GetBoundingClientRectAbsoluteFromId(sId)
{
    return GetBoundingClientRectAbsolute(document.getElementById(sId));
}

function TC_SetWidthOfElementByIdIfExists(sId, iWidth)
{
    let elem = document.getElementById(sId)
    if ( !elem )
        return;
    elem.style.width = MakePixelString(iWidth)
}

function TC_GetWidthOfInnerTextInPixels(sId)
{
    let elem = document.getElementById(sId)
    return GetWidthOfTextInPixels(elem, elem.innerHTML);
}

function TC_GetHeightOfElementById(sId)
{
    let elem = document.getElementById(sId)
    let rect = GetBoundingClientRectAbsolute(elem);
    return rect.height;
}

function IsLocationInGridSquareWithBuffer(iRow, iLetter, iPickedX, iPickedY)
{ // use global coordinates
    let fBuffer = g_GBRMS_fBufferFraction * g_GRB_Square_iSize;
    let rectFoundSquare = GetBoundingClientRectAbsolute(document.getElementById(GRB_MakeId(iRow, iLetter)));
// we need square relative to the grid top left
    let elemFound_iLeft   = Math.round(rectFoundSquare.left);
    let elemFound_iTop    = Math.round(rectFoundSquare.top );
    let elemFound_iWidth  = Math.round(rectFoundSquare.width);
    let elemFound_iHeight = Math.round(rectFoundSquare.height);
    let rectFoundRelative = new DOMRect(elemFound_iLeft, elemFound_iTop, elemFound_iWidth, elemFound_iHeight)
    let rectFoundRelativeWithBuffer = MakeRectWithBuffer(rectFoundRelative, fBuffer);
    let bWithin = IsPointWithinRect(rectFoundRelativeWithBuffer, iPickedX, iPickedY);
    return bWithin;
}

function MakeRectWithBuffer(rect, fBuffer)
{
    let iLeft   = rect.left + fBuffer;
    let iTop    = rect.top  + fBuffer;
    let iWidth  = rect.width - 2 * fBuffer;
    let iHeight = rect.height - 2 * fBuffer;
    let rectWithBuffer = new DOMRect(iLeft, iTop, iWidth, iHeight);
    return rectWithBuffer;
}

function IsPointWithinRect(rect, iX, iY)
{
    if ( iX < rect.left ) return false;
    if ( iX > rect.right ) return false;
    if ( iY < rect.top ) return false;
    if ( iY > rect.bottom ) return false;
    return true;
}

function IsTrue(s){var b = false;if ( s == 'true')b = true;return b;}

function openFullscreen() 
{
    let elem = document.getElementById("Body_Intro");
    if (elem.requestFullscreen) 
    {
      elem.requestFullscreen();
    } 
    else if (elem.webkitRequestFullscreen) 
    { /* Safari */
      elem.webkitRequestFullscreen();
    } 
    else if (elem.msRequestFullscreen) 
    { /* IE11 */
      elem.msRequestFullscreen();
    }
}

function ForIdSetVisibility(sId, bVisible)
{
    let sVisible = 'visible';
    if ( !bVisible )
        sVisible = 'hidden';
    document.getElementById(sId).style.visibility = sVisible;
}


function TC_LeftForCentering(iWidthElement)
{
    let iWidthRemaining  = g_Window_iWidth - iWidthElement;
    let iLeftForCentering = g_TC_Padding_Left_iSize + iWidthRemaining / 2;
    return iLeftForCentering;
}

function TC_SetVisible(sId)
{
    document.getElementById(sId).style.visibility = 'visible';
}

function TC_GetRandomInt(iMax)
{
    let iP = Math.floor(Math.random() * iMax);
    return iP;
}

function MakeURLWrappedString(sPathAndFileName, bSingle)
{
    var s = '';
    if ( bSingle ) 
        s = "url('" + sPathAndFileName + "') ";
    else
        s = 'url("' + sPathAndFileName + '") ';
    return s;
}

function GetWidthToHeightRatioOfImageWithId(sImageId)
{
    let elem = null;
    elem = document.getElementById(sImageId);
    if ( !elem ) return 1.02;
    let height = elem.naturalHeight;
    let width  = elem.naturalWidth;
    if (width == 0.0 || height == 0.0 )
        return 1.01;
    let scale = width/height;
    return scale
}

function GetComputedStyleProperty(elem, sProperty)
{
    var cssObj = window.getComputedStyle(elem, null);
    var sValue = cssObj.getPropertyValue(sProperty);
    return sValue;
}

function GetBoundingClientRectAbsolute(elem)
{
    let rectRelative = elem.getBoundingClientRect();
    let iTop = rectRelative.top + window.scrollY;
    let iLeft = rectRelative.left + window.scrollX;
    let rectAbsolute = new DOMRect(iLeft, iTop, rectRelative.width, rectRelative.height)
    return rectAbsolute;
}

function GetComputedStylePropertyAsInt(elem, sProperty)
{
    let cssObj = window.getComputedStyle(elem, null);
    let sValue = cssObj.getPropertyValue(sProperty);
    sValue = removePX(sValue)
    let iValue = parseInt(sValue);
    return iValue;
}

function GetWidthOfTextInPixels(elem, sText)
{ // elem is used to get the font
    var sFont = GetComputedStyleProperty(elem, 'font');
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    context.font = sFont;
    let text = context.measureText(sText);
    let iWidth = text.width;
    return iWidth;
}

var g_iScreen_Width = 600;
var g_iScreen_Height= 800;
function getResolution() 
{
g_iScreen_Width = Math.round(screen.width * window.devicePixelRatio);
g_iScreen_Height= Math.round(screen.height * window.devicePixelRatio);
}

function MakePixelString(i)
{
    var s = i.toString() + 'px';
    return s;
}

function RectAsString(sName, rect)
{
    var s = sName + ':' + rect.left + '|' + rect.top + '|' + rect.width + '|' + rect.height;
    return s;
}

function ScreenSizes() 
{
    g_iBody_Width = Math.round(document.body.getBoundingClientRect().width);
    g_iBody_Height= Math.round(document.body.getBoundingClientRect().height);
    g_iHTML_Width = Math.round(document.documentElement.getBoundingClientRect().width);
    g_iHTML_Height= Math.round(document.documentElement.getBoundingClientRect().height);
}

function setlineAdd(sAdd)
{
    if ( !g_bDisplayMessages)
        return 0;
    g_sToDisplay += sAdd;
    let elem = document.getElementById("Messages");
    if ( !elem )
        return 1;
    elem.style.visibility = 'visible';
    elem.innerHTML = g_sToDisplay;
    return 2;
}

function setline(sAdd)
{
    if ( !g_bDisplayMessages)
        return 0;
    let elem = document.getElementById("Messages");
    if ( !elem )
        return 1;
    elem.style.visibility = 'visible';
    g_sToDisplay = sAdd;
    elem.innerHTML = g_sToDisplay;
    return 2;
}

function replaceAt(sOriginal, index, sReplacement) 
{
    let sNew = sOriginal.substring(0, index);
    sNew += sReplacement
    sNew += sOriginal.substring(index + sReplacement.length);
    return sNew;
}

function FixSpecialCharacters(sOriginal)
{
    iTM = sOriginal.indexOf('%26');
    if ( iTM == -1 )
        return sOriginal;
    let bGotThemAll = false;
    let sNew = sOriginal;  
    while ( !bGotThemAll ) 
    {
        iTM = sNew.indexOf('%26');
        if ( iTM == -1 )
            bGotThemAll = true;
        else 
            sNew = replaceMultiAt(sNew, iTM, '%26', '&trade;')
    }
    return sNew;
}

function replaceMultiAtString(sOriginal, sOld, sReplacement) 
{
    let iIndex = sOriginal.indexOf(sOld);
    if ( iIndex == -1 )
        return sOriginal;
    let sNew = sOriginal.substring(0, iIndex);
    sNew += sReplacement;
    let sEnd = sOriginal.substring(iIndex + sOld.length);
    sNew += sEnd;
    return sNew;
}

function replaceMultiAt(sOriginal, index, sOld, sReplacement) 
{
    let sNew = sOriginal.substring(0, index);
    sNew += sReplacement;
    let sEnd = sOriginal.substring(index + sOld.length);
    sNew += sEnd;
    return sNew;
}

function removeAt(sOriginal, index) 
{
    var sNew = sOriginal.substring(0, index);
    sNew += sOriginal.substring(index + 1);
    return sNew;
}

function removePX(sOriginal)
{
    var sNew = ''; 
    for ( let i = 0; i < sOriginal.length; i++ )
    {
        let cThisChar = sOriginal.charAt(i);
        if ( cThisChar != 'p' && cThisChar != 'x' )
            sNew += cThisChar;
    }            
    return sNew;
}

function removeAllChar(sOriginal, cChar) 
{
    var sNew = ''; 
    for ( let i = 0; i < sOriginal.length; i++ )
    {
        let cThisChar = sOriginal.charAt(i);
        if ( cThisChar != cChar )
            sNew += cThisChar;
    }            
    return sNew;
}

function insertAt(sOriginal, iAt, cChar) 
{
    let sResult = sOriginal.substring(0, iAt) + cChar + sOriginal.substring(iAt);
    return sResult;
}
