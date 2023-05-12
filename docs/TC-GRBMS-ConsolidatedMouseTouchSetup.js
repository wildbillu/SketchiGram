// TC-GRBMS-ConsolidatedMouseTouchSetup.js

function TC_GRBMS_MouseFunctions_Consolidated(iRow, iLetter)
{
    let sFunctionsToCall = '';
    let sWhoWrapped = "'" + g_GRBMS_MoveActive_sMouse + "'"
    sFunctionsToCall += ' onmousedown="return GRBMS_MT_Down(event, ' + iRow + ',' + iLetter + ',' + sWhoWrapped + '); "';
    sFunctionsToCall += ' onmouseout="return GRBMS_mouseOut(event);" ';
    sFunctionsToCall += ' onmousemove="GRBMS_mouseMove_New(event);" ';
    sFunctionsToCall += ' onmouseUp="GRBMS_mouseUp(event);" ';
    return sFunctionsToCall;
}

function TC_GRBMS_TouchFunctions_Consolidated(iRow, iLetter)
{
    let sWhoWrapped = "'" + g_GRBMS_MoveActive_sTouch + "'"
    let sFunctionsToCall = '';
    sFunctionsToCall += ' ontouchstart="return GRBMS_MT_Down(event, ' + iRow + ',' + iLetter + ',' + sWhoWrapped + '); "';
    sFunctionsToCall += ' ontouchout="return GRBMS_mouseOut(event);" ';
    sFunctionsToCall += ' ontouchmove="GRBMS_mouseMove_New(event);" ';
    sFunctionsToCall += ' ontouchend="GRBMS_mouseUp(event);" ';
    return sFunctionsToCall;
}