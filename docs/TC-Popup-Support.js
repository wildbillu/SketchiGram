// misc.js
// 
// this function allows for closing popup style windows

window.onclick = function(event) 
{
	var sTargetId = event.target.id;
	if ( g_TC_Settings_bActive && sTargetId.indexOf('Settings') == -1 )TC_HideSettings();
/*
	if ( g_TC_Archive_Menu_bActive )
	{   
		if ( sTargetId != 'Archive_Next' && sTargetId != 'Archive_Previous')
		{
			if ( sTargetId.indexOf('Archive') == -1 ) TC_Archive_ToggleVisibility();
			else { if ( g_TC_Archive_Menu_iActiveCount != 0 )TC_Archive_ToggleVisibility();else g_TC_Archive_Menu_iActiveCount++;}
		}
	}
*/	
	if ( g_GRBMS_Info_bActive && sTargetId != "Button_Info_Image" )
		TC_HideInfo()
}

function Dropdown_CanOpen()
{
    if ( g_TC_Settings_bActive ) return false;
    if ( g_GRBMS_Info_bActive ) return false;
    return true;
}

