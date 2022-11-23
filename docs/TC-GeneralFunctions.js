// TC-GeneralFunctions
// 

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
    let iWidthRemaining  = g_TC_iBiggestRight - iWidthElement;
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
    var elem = null;
    elem = document.getElementById(sImageId)
    var height = elem.naturalHeight;
    var width  = elem.naturalWidth;
    if (width == 0.0 || height == 0.0 )
        return 1.011;
    var scale = width/height;
    return scale
}

function GetWidthToHeightRatioOfImages()
{
    return GetWidthToHeightRatioOfImageWithId('ExtraImage');
}

function GetComputedStyleProperty(elem, sProperty)
{
    var cssObj = window.getComputedStyle(elem, null);
    var sValue = cssObj.getPropertyValue(sProperty);
    return sValue;
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
//    setline('W:' + g_iScreen_Width + " H:" + g_iScreen_Height);
    g_iBody_Width = Math.round(document.body.getBoundingClientRect().width);
    g_iBody_Height= Math.round(document.body.getBoundingClientRect().height);
//    setlineAdd(' Body.W:' + g_iBody_Width + " H:" + g_iBody_Height);
    g_iHTML_Width = Math.round(document.documentElement.getBoundingClientRect().width);
    g_iHTML_Height= Math.round(document.documentElement.getBoundingClientRect().height);
//    setlineAdd(' HTML.W:' + g_iHTML_Width + " H:" + g_iHTML_Height);
}

function CharValidEntry(cLetter) 
{
    if ( cLetter != '' && cLetter !=' ' && cLetter != g_TC_cCharMeaningNotSet )
        return true;
    return false;
}

function IfCharNotSet(cLetter) 
{
    if ( cLetter != '' && cLetter !=' ' && cLetter != g_TC_cCharMeaningNotSet )
        return true;
    return false;
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
    var sNew = sOriginal.substring(0, index);
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