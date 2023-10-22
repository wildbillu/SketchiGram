// TC-GeneralFunctions

var g_iScreen_Width = 600;
var g_iScreen_Height= 800;
// 
// function TC_LeftForCentering(iWidthElement)
// function ForIdSetVisibility(sId, bVisible)

// to detect window back forth...

var g_GBRMS_fBufferFraction = .05;

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
    ForIdSetVisibility(sId, true)
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

function getResolution() 
{
    g_iScreen_Width = Math.round(screen.width * window.devicePixelRatio);
    g_iScreen_Height= Math.round(screen.height * window.devicePixelRatio);
}

function TC_ForIdSetZIndex(sId, izIndex)
{
    let elem = document.getElementById(sId)
    let ss = izIndex.toString();
    elem.style.zIndex = ss;
}

function MakePixelString(i)
{
    let s = i.toString() + 'px';
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
    if ( !g_Message_bVisible)
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
    if ( !g_Message_bVisible)
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
