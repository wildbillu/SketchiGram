// 
var g_MouseClientPosition_x = -1;
var g_MouseClientPosition_y = -1;
function TC_MousePositionSupport(event) 
{ // looped in to body
    g_MouseClientPosition_x=event.clientX;
    g_MouseClientPosition_y=event.clientY;
}

function TC_KeyboardSupport_KeyPress(e) 
{
    e = e || window.event;
}

function TC_KeyboardSupport_KeyUp(e) 
{ // doesnt seem needed with  tabindex="0" to the divs
//    if ( KB_AGC_KeyboardPress_GRBMS(e.key) )
//        return;
//    if ( KB_AGC_KeyboardPress_CAB(e.key) )
//        return;
//    if ( KB_AGC_KeyboardPress_SA_EB(e.key) )
//        setlineAdd('WKB.')
}

function TC_MouseSupport_RightClick()
{
    window.addEventListener('contextmenu', (event) => 
    {
        event.preventDefault();
        TC_SA_MakeErasePopup(true);
        TC_CAB_MakeFixSquarePopup(true);
        TC_GRBMS_MakeFixSquarePopup(true);
    });
}



