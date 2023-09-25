// TC-GRBMS-ConsolidatedMouseTouchSetup.js

function TC_GRB_MouseFunctions_Consolidated(iRow, iLetter)
{
    let sFunctionsToCall = '';
    let sWhoWrapped = "'" + g_Pointer_sMouse + "'"
    sFunctionsToCall += ' onmousedown="GRB_MT_Down(event, ' + iRow + ',' + iLetter + ',' + sWhoWrapped + '); "';
    sFunctionsToCall += ' onmouseout ="GRB_MT_Out (event);" ';
    sFunctionsToCall += ' onmousemove="GRB_MT_Move(event);" ';
    sFunctionsToCall += ' onmouseUp  ="GRB_MT_Up  (event);" ';
    sFunctionsToCall += ' onmouseOver="GRB_MT_Over(event);" ';
    return sFunctionsToCall;
}

function TC_GRB_TouchFunctions_Consolidated(iRow, iLetter)
{
    let sWhoWrapped = "'" + g_Pointer_sTouch + "'"
    let sFunctionsToCall = '';
    sFunctionsToCall += ' ontouchstart="GRB_MT_Down(event, ' + iRow + ',' + iLetter + ',' + sWhoWrapped + '); "';
    sFunctionsToCall += ' ontouchout  ="GRB_MT_Out (event);" ';
    sFunctionsToCall += ' ontouchmove ="GRB_MT_Move(event);" ';
    sFunctionsToCall += ' ontouchend  ="GRB_MT_Up  (event);" ';
    return sFunctionsToCall;
}