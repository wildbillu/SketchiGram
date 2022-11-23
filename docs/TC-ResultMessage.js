// TC-ResultMessage.js

var g_TC_ResultMessage_Active = false;
var g_ResultMessage_sStyle_Warning = 'Warning';
var g_ResultMessage_sStyle_Positive = 'Positive';
var g_ResultMessage_sStyle_InfoOnly = 'InfoOnly';

var g_ResultMessage_sLevel_Genius = 'Genius!!';
var g_ResultMessage_sLevel_Excellent = 'Excellent!';
var g_ResultMessage_sLevel_GoodJob = 'Good Job';
var g_ResultMessage_sLevel_InfoOnly = 'FYI';

function TC_ResultMessage_Setup(iTop)
{
    let elemResultMessage_Div = document.getElementById("ResultMessage_Div");
// locate message and size
// over lay it on Progress grid etc
    if ( !g_bIsSketchiGramVariant2 )
    {
        let elemCA = document.getElementById("StatusControl_CA");
        let rectCA = elemCA.getBoundingClientRect();
        let elemGR = document.getElementById("StatusControl_GR");
        let rectGR = elemGR.getBoundingClientRect();
        let iLeft = rectGR.left;
        let iRight = rectCA.right;
        elemResultMessage_Div.style.left = MakePixelString(iLeft);
        elemResultMessage_Div.style.width = MakePixelString(iRight - iLeft);
        let elemStatus = document.getElementById("Div_StatusControl_Left");
        let rectStatus = elemStatus.getBoundingClientRect();
        if ( iTop == 0 )
            iTop  = rectStatus.top;
        let iHeight = rectStatus.height;
        elemResultMessage_Div.style.top = MakePixelString(iTop);
        elemResultMessage_Div.style.height = MakePixelString(iHeight);
    }
    else
    { 
        let rectResultMessage_Div = elemResultMessage_Div.getBoundingClientRect();
        let iWidthElement = rectResultMessage_Div.width
        let iLeft = TC_LeftForCentering(iWidthElement);
        elemResultMessage_Div.style.left = MakePixelString(iLeft)
        elemResultMessage_Div.style.top = MakePixelString(iTop);
    }
}

function TC_ResultMessage_DisplayForInterval(sMessage, sStyle, iNumber, iSeconds)
{
    if ( g_TC_ResultMessage_Active )
        return;
    let elemResultMessage_Div = document.getElementById("ResultMessage_Div");
// sStyle determines the class and more
    if ( sStyle == g_ResultMessage_sStyle_Warning )
    {
        let sClassName = 'ResultMessage_Div_Warning';
        elemResultMessage_Div.className = sClassName;
        elemResultMessage_Div.innerHTML = sMessage;
        elemResultMessage_Div.style.visibility = 'visible';
        setTimeout(function(){TC_ResultMessage_RemoveCurrentMessage();},iSeconds*1000);
        g_TC_ResultMessage_Active = true;
        return;
    }    
    let sClassName = 'ResultMessage_Div';
    let aMessages = sMessage.split('|');
    let iMessages = aMessages.length;
    var sTop = g_ResultMessage_sLevel_GoodJob;
    if ( iNumber > 1 )
        sTop = g_ResultMessage_sLevel_Excellent;
    if ( iNumber > 2 )
        sTop = g_ResultMessage_sLevel_Genius;
    if ( sStyle == g_ResultMessage_sStyle_InfoOnly )
    {
        sClassName = 'ResultMessage_Div_InfoOnly';
        sTop = g_ResultMessage_sLevel_InfoOnly;
    }
    elemResultMessage_Div.className = sClassName;
    let sInner = '';
    sInner += '<DIV Id="RM" class="ResultMessage_Div_TitleLine">' + sTop + '</DIV>';
    for ( let i = 0; i < iMessages; i++ )
    {
        let sIdHTML = 'Id="RM' + i + '" ';
        sInner += '<DIV ' + sIdHTML + ' class="ResultMessage_Div_AdditionalLines">' + aMessages[i] + '</DIV>';
    }
    let iTotalHeight = 0;
    elemResultMessage_Div.innerHTML = sInner;
    let elemRM = document.getElementById("RM");
    let rectRM = elemRM.getBoundingClientRect();
    iTotalHeight += rectRM.height;
    for ( let i = 0; i < iMessages; i++ )
    {
        let sId = 'RM' + i;
        let elemRMi = document.getElementById(sId);
        let rectRMi = elemRMi.getBoundingClientRect();
        iTotalHeight += rectRMi.height;
    }
    elemResultMessage_Div.style.height = MakePixelString(iTotalHeight);
    elemResultMessage_Div.style.visibility = 'visible';
    setTimeout(function(){TC_ResultMessage_RemoveCurrentMessage();},iSeconds*1000);    
    g_TC_ResultMessage_Active = true;
}

function TC_ResultMessage_RemoveCurrentMessage()
{
    let elemResultMessage_Div = document.getElementById("ResultMessage_Div");
    elemResultMessage_Div.innerHTML = 'empty';
    elemResultMessage_Div.style.visibility = 'hidden';
    g_TC_ResultMessage_Active = false;
}
