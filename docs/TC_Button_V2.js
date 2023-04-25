// TC_Button_V2.js

function TC_Button_V2(sId, sText, sOnClick)
{
    let sButtonHTML = '';
    sButtonHTML += '<BUTTON class="TC_Button_V2" Id="' + sId + '" onclick="' + sOnClick + '">' + sText + '</BUTTON>';
    return sButtonHTML;
}

function TC_Button_V2_InDiv(sDivId, bStartHidden, sOnClick, sText)
{
    let sHTML = '<DIV Id="' + sDivId + '" ';
    sHTML += 'class="TC_Button_V2_InDiv ';
    if ( bStartHidden )
        sHTML += 'TC_StartHidden';
    sHTML += '" onclick="' + sOnClick + '">'
    sHTML += sText;
    sHTML += '</DIV>'
    return sHTML;
}