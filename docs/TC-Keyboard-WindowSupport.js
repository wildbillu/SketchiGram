// 
var g_MouseClientPosition_x = -1;
var g_MouseClientPosition_y = -1;

function TC_MouseSupport_RightClick()
{
    window.addEventListener('contextmenu', (event) => 
    {
        event.preventDefault();
        TC_CAB_MakeFixSquarePopup(true);
        TC_GRB_MakeFixSquarePopup(true);
    });
}



