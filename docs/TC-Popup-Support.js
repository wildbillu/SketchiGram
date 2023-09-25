// misc.js
// 
// this function allows for closing popup style windows

window.onclick = function(event) 
{
	var sTargetId = event.target.id;
	if ( g_TC_Settings_bActive && sTargetId.indexOf('Settings') == -1 )TC_HideSettings();
	if ( g_GRB_Info_bActive && sTargetId.indexOf("Info") == -1 )
		TC_HideInfo()
}

function Dropdown_CanOpen()
{
    if ( g_TC_Settings_bActive ) return false;
    if ( g_GRB_Info_bActive ) return false;
    return true;
}

