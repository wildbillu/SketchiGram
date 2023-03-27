// 

function TC_KeyboardSupport_KeyPress(e) 
{
    e = e || window.event;
}

function TC_KeyboardSupport_KeyUp(e) 
{
    if ( KB_AGC_KeyboardPress_GRBMS(e.key) )
        return;
    if ( KB_Mini_KeyboardPress_CAB(e.key) )
        return;
    KB_Mini_KeyboardPress_SA_EB(e.key);

    e = e || window.event;
}
