// TC-GeneralFunctions
// 
// to detect window back forth...


function openFullscreen() 
{
    let elem = document.getElementById("Body_Any");
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

function MakeRectWithBuffer(rect, iBuffer)
{
    let iLeft = rect.left + iBuffer;
    let iTop  = rect.top  + iBuffer;
    let iWidth = rect.width - 2 * iBuffer;
    let iHeight = rect.height - 2 * iBuffer;
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
    return context.measureText(sText).width;
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
        return;
    g_sToDisplay += sAdd;
    var elem = document.getElementById("Messages");
    if ( !elem )
        return
    elem.style.visibility = 'visible';
    elem.innerHTML = g_sToDisplay;
}

function setline(sAdd)
{
    if ( !g_bDisplayMessages)
        return;
    var elem = document.getElementById("Messages");
    if ( !elem )
        return;
    elem.style.visibility = 'visible';
    g_sToDisplay = sAdd;
    elem.innerHTML = g_sToDisplay;
}

function replaceAt(sOriginal, index, sReplacement) 
{
    let sNew = sOriginal.substring(0, index);
    sNew += sReplacement
    sNew += sOriginal.substring(index + sReplacement.length);
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
