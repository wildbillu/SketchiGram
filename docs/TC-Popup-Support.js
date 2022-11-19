// misc.js
// 
// this function allows for closing popup style windows
window.onclick = function(event) 
{
	var sTargetId = event.target.id;
//	if ( g_GRBMS_ExtraImage_bActive && sTargetId.indexOf('ExtraImage') == -1 )
//		TC_HideExtraImage();
//	if ( g_GRBMS_SolvedImage_bActive && sTargetId.indexOf('SolvedImage') == -1 )
//		TC_HideSolvedImage();
	if ( g_GRBMS_Info_bActive && sTargetId != "Button_Info_Image" )
		TC_HideInfo()
//	if ( g_bPlaceWindow_Active && !sTargetId.startsWith('Place_') )
//		Place_Popup_Toggle();
	if ( g_TC_Settings_bActive )
	{
		if ( sTargetId.indexOf('Settings') == -1 ) 
			TC_HideSettings();
	}
	if ( g_TC_MoreActions_bActive && ( sTargetId != "Button_More_Image") )
		TC_HideMoreActions();	
}

function Dropdown_CanOpen()
{
    if ( g_bPlaceWindow_Active ) return false;
    if ( g_TC_Settings_bActive ) return false;
    if ( g_GRBMS_Info_bActive ) return false;
    if ( g_GRBMS_ExtraImage_bActive ) return false;
    if ( g_GRBMS_SolvedImage_bActive ) return false;
    if ( g_TC_MoreActions_bActive ) return false;
    return true;
}

