// misc.js
// 
// this function allows for closing popup style windows

window.onclick = function(event) 
{
	var sTargetId = event.target.id;
//alert(sTargetId)
    if ( !g_ThemeImage_bIsNormalSize )
	{
		if ( sTargetId.indexOf('Grid_Image') != -1 ) 
		{
			if ( g_ThemeImage_EnlargedSize_iHitCount != 0)
				TC_ThemeImage_SwitchTo_NormalSize();
			g_ThemeImage_EnlargedSize_iHitCount++;
		}
	}

	if ( g_TC_Settings_bActive ){if ( sTargetId.indexOf('Settings') == -1 ) TC_HideSettings();
		else { if ( g_TC_Settings_iActiveCount != 0 )TC_HideSettings();else g_TC_Settings_iActiveCount++;}
	}
	if ( g_TC_MoreActions_bActive )
	{   
		if ( sTargetId.indexOf('Button_More_Image') == -1 ) TC_HideMoreActions();
		else { if ( g_TC_MoreActions_iActiveCount != 0 )TC_HideMoreActions();else g_TC_MoreActions_iActiveCount++;}
	}
	if ( g_TC_Archive_Menu_bActive )
	{   
		if ( sTargetId != 'Archive_Next' && sTargetId != 'Archive_Previous')
		{
			if ( sTargetId.indexOf('Archive') == -1 ) TC_Archive_Activate();
			else { if ( g_TC_Archive_Menu_iActiveCount != 0 )TC_Archive_Activate();else g_TC_Archive_Menu_iActiveCount++;}
		}
	}
	if ( g_GRBMS_ExtraImage_bActive && sTargetId.indexOf('ExtraImage') == -1 && sTargetId.indexOf('DisplayDualClue_Div') )
		TC_HideExtraImage();
	if ( g_GRBMS_SolvedImage_bActive )
	{
		if ( sTargetId.indexOf('SolvedImage') == -1 &&
			sTargetId.indexOf('More') == -1 &&
			sTargetId.indexOf('GR') == -1 )
		TC_HideSolvedImage();
	}
	if ( g_GRBMS_Info_bActive && sTargetId != "Button_Info_Image" )
		TC_HideInfo()

//	if ( g_bPlaceWindow_Active && !sTargetId.startsWith('Place_') )
//		Place_Popup_Toggle();



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

