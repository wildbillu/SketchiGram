// TC-ControlRow.js
var g_CR_array_sId = [];
var g_CR_array_bEnabled = [];
var g_CR_array_sHint = [];
var g_CR_iTimerToShow_iID = 0;
var g_CR_iTimerToShow_iMS = 2000;

var g_CR_iTimerToHide_iID = 0;
var g_CR_iTimerToHide_iMS = 4000;

var g_CR_sFocus = '';

function TC_CR_Hint_TimerToShow_Start()
{
    TC_CR_Hint_TimerToShow_Clear();
    g_CR_iTimerToShow_iID = setInterval(TC_CR_Hint_Show, g_CR_iTimerToShow_iMS);
}

function TC_CR_Hint_TimerToShow_Clear()
{
    if ( g_CR_iTimerToShow_iID != 0 )
    {
        clearInterval(g_CR_iTimerToShow_iID);
        g_CR_iTimerToShow_iID = 0;
    }
}

function TC_CR_Hint_TimerToHide_Start()
{
    TC_CR_Hint_TimerToHide_Clear();
    g_CR_iTimerToHide_iID = setInterval(TC_CR_Hint_Hide, g_CR_iTimerToHide_iMS);
}

function TC_CR_Hint_TimerToHide_Clear()
{
    if ( g_CR_iTimerToHide_iID != 0 )
    {
        clearInterval(g_CR_iTimerToHide_iID);
        g_CR_iTimerToHide_iID = 0;
    }
}

function TC_CR_Hint_Show()
{
    let elemHint = document.getElementById("TopRowHint");
    elemHint.style.visibility = 'visible';
    TC_CR_Hint_TimerToShow_Clear()
    TC_CR_Hint_TimerToHide_Start()
}

function TC_CR_Hint_Hide()
{
    let elemHint = document.getElementById("TopRowHint");
    elemHint.style.visibility = 'hidden';
}

function TC_MouseOut_CRButton(sId)
{
    TC_CR_Hint_Hide();
    TC_CR_Hint_TimerToShow_Clear();
    TC_CR_Hint_TimerToHide_Clear();
}

function TC_MouseOver_CRButton(sId)
{
    let elemOver = document.getElementById(sId);
    let iIndex = g_CR_array_sId.indexOf(sId);
    let rectOver = GetBoundingClientRectAbsolute(elemOver);
    let iHalf = rectOver.width / 2;
    let elemHint = document.getElementById("TopRowHint");
    elemHint.style.top  = MakePixelString(rectOver.top + iHalf);
    elemHint.style.left = MakePixelString(rectOver.left + iHalf);
    let sHint = g_CR_array_sHint[iIndex];
    let iHeight = 20;
    let iWidth = 0;
    let iBR = sHint.indexOf("<br>");
    if ( iBR != -1 )
    {
        iHeight = 40;
        let iWidthLine1 = Math.round(GetWidthOfTextInPixels(elemHint, sHint.substring(0, iBR)));
        let iWidthLine2 = Math.round(GetWidthOfTextInPixels(elemHint, sHint.substring(iBR)));
        iWidth = Math.max(iWidthLine1, iWidthLine2);
    }
    else
        iWidth = GetWidthOfTextInPixels(elemHint, sHint);
    elemHint.style.width  = MakePixelString(iWidth + 10);
    elemHint.style.height = MakePixelString(iHeight + 10);
    elemHint.innerHTML = sHint;
    TC_CR_Hint_TimerToShow_Start();
}

function TC_CR_GetStatus(sId)
{
    let iIndex = g_CR_array_sId.indexOf(sId);
    if ( iIndex == -1 )
        return;
    return g_CR_array_bEnabled[iIndex];
}

function TC_CR_SetStatus(sId, bEnabled)
{
    let iIndex = g_CR_array_sId.indexOf(sId);
    if ( iIndex == -1 )
        return;
    g_CR_array_bEnabled[iIndex] = bEnabled;
    TC_CR_SetEnabledDisabled();
}

function TC_CR_SetEnabledDisabled()
{
    for ( let i = 0; i < g_CR_array_sId.length; i++ )
    {
        let sId      = g_CR_array_sId[i];
        let bEnabled = g_CR_array_bEnabled[i];
        let elem = document.getElementById(sId);
        if ( elem )
        {
            if ( bEnabled )
                elem.style.backgroundColor = 'white';
            else
                elem.style.backgroundColor = 'lightgray';
        }
    }
}

function TC_MakeCRButton(sId, sImage, sFunction, sClass)
{
    sImage = '<img Id="' + sId + '" src="' + TC_FullButtonName(sImage) + '" alt="' + sId + '" width=100%>';
    sInnerHTML = '';
    sInnerHTML += '<BUTTON Id="'
    sInnerHTML += sId + '" '
    sInnerHTML += 'class="' + sClass + '" '
    sInnerHTML += 'onclick="' + sFunction + '" '
    sInnerHTML += ' onmouseover="TC_MouseOver_CRButton(\'' + sId + '\')";'
    sInnerHTML += ' onmouseout="TC_MouseOut_CRButton(\'' + sId + '\')";'
    sInnerHTML += ' ontouchout="TC_MouseOut_CRButton(\'' + sId + '\')";'
    sInnerHTML += '>';
    sInnerHTML += sImage;
    sInnerHTML += '</BUTTON>';
    return sInnerHTML;
}

function TC_MakeControlRow()
{
    g_CR_array_bEnabled.length = 0;
    g_CR_array_sId.length = 0;
    g_CR_array_sHint.length = 0;
    let sButtonsHTML = '';
    let iButtons = 0;
    sButtonsHTML += TC_MakeCRButton('Info',            'Button_Info.png',            'TC_ShowInfo();',        'TopRowControl_Info'); g_CR_array_sId.push('Info');            g_CR_array_sHint.push('Show Instructions');                 g_CR_array_bEnabled.push(true);  iButtons++;
    sButtonsHTML += TC_MakeCRButton('Deselect',        'Button_Deselect.png',        'TC_Deselect();',        'TopRowControl_Info'); g_CR_array_sId.push('Deselect');        g_CR_array_sHint.push('Press to clear selected');           g_CR_array_bEnabled.push(false); iButtons++;
    sButtonsHTML += TC_MakeCRButton('Undo',            'Button_Undo.png',            'TC_Undo();',            'TopRowControl_Info'); g_CR_array_sId.push('Undo');            g_CR_array_sHint.push('Press to Undo last change');         g_CR_array_bEnabled.push(false); iButtons++;
    sButtonsHTML += TC_MakeCRButton('ChangeDirection', 'Button_ChangeDirection.png', 'TC_ChangeDirection();', 'TopRowControl_Info'); g_CR_array_sId.push('ChangeDirection'); g_CR_array_sHint.push('Press to change <br> direction in grid'); g_CR_array_bEnabled.push(true);  iButtons++;
    MakeSettingsDiv();
    sButtonsHTML += TC_MakeCRButton('Settings',        'Button_Settings.png',        'TC_ShowSettings();',    'TopRowControl_Info'); g_CR_array_sId.push('Settings');        g_CR_array_sHint.push('Show and change <br> Game Settings');     g_CR_array_bEnabled.push(true);  iButtons++;
    sButtonsHTML += MakeMoreActionsDiv()
    sButtonsHTML += TC_MakeCRButton('Actions',         'Button_More.png',             'TC_ShowMoreActions();', 'TopRowControl_Info'); g_CR_array_sId.push('Actions');        g_CR_array_sHint.push('More Actions');                      g_CR_array_bEnabled.push(true);  iButtons++;

//    sButtonsHTML += Make_Button_MoreActions(); iButtons++;
    let iWidthButtons = iButtons * g_GRB_TopRow_Buttons_iSize;
//
    let elemControlStatusRight = document.getElementById("Div_StatusControl_Right");
    elemControlStatusRight.innerHTML = sButtonsHTML;
    elemControlStatusRight.style.width = MakePixelString(iWidthButtons);
    elemControlStatusRight.style.height = MakePixelString(g_GRB_TopRow_Buttons_iSize);
//   
    elemControlStatusRight.style.top = MakePixelString(g_StatusControlRow_iTop);
    let iLeft = g_StatusControlRow_iLeft;
    if ( g_StatusControlRow_iLeft == -1 )
        iLeft = TC_LeftForCentering(iWidthButtons)
    elemControlStatusRight.style.left = MakePixelString(iLeft)
    MoreActions_SizeAndPosition();
    TC_CR_SetEnabledDisabled();
}