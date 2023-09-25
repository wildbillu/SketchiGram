// TC-Settings-Setup.js
//
var g_TC_Settings_iActiveCount = 0;
var g_TC_Settings_bActive = false;
var g_sCABOnSettingsClick = '';
var g_sGRBOnSettingsClick = '';
var g_TC_Settings_aIds = [];
var g_TC_Settings_aTypes = [];
var g_TC_Settings_aVariables = [];
var g_TC_Settings_bDummy = false;

function MakeSettingsDiv()
{    
    var sSettingsInner = MakeSettingsInner()
    var sInner = '<DIV Id="SettingsDiv" class="SettingsDiv">' + sSettingsInner + '</DIV>';
    return sInner;
}

function MakeSettingsInner()
{
    let sSettingsWindow = '';
    sSettingsWindow += '<TABLE class="SettingsB" Id="Settings_B">'
    sSettingsWindow += ' <TR class="Settings_CloseBoxRow" Id="Settings_F"><TD colspan=2>'
    sSettingsWindow += '  <TABLE Id="Settings_I" class="SettingsI" width=290>'
    sSettingsWindow += '    <TR>'
    sSettingsWindow += '     <TD Id="Settings_G" class="Settings_CloseBoxRow">Settings</TD>'
    sSettingsWindow += '     <TD width="5%"><BUTTON Id="Settings_CloseBox" class="Settings_CloseBox" onclick="TC_HideSettings();">Done</TD>'
    sSettingsWindow += '    </TR>'
    sSettingsWindow += '   </TABLE>';
    sSettingsWindow += ' </TD></TR>';
    let sSubTitle = MakeSubTitleRow('Progress Indicators', 'Settings_STC');
    sSettingsWindow += sSubTitle;
    g_TC_Settings_aVariables.push(g_TC_Settings_bDummy);g_TC_Settings_aVariables.push(g_TC_Settings_bDummy);g_TC_Settings_aIds.push("Settings_STCD"); g_TC_Settings_aTypes.push("SubTitle");
    let sCheckBox = MakeCheckBox(g_bSettings_CAGR_Display_Complete, 'Settings_CAGR_Display_Complete', 'Show Completion(s)');
    sSettingsWindow += sCheckBox;
    sSettingsWindow += '</TABLE>';
    g_TC_Settings_aVariables.push(g_bSettings_CAGR_Display_Complete);g_TC_Settings_aIds.push("Settings_CAGR_Display_Complete"); g_TC_Settings_aTypes.push("Button");
    return sSettingsWindow;
}

function TC_AdjustSettings()
{
    let elemSettingsDiv = document.getElementById("SettingsDiv");
    elemSettingsDiv.visibility = 'visible';
}

function MakeCheckBox(bChecked, sidRaw, stitle)
{
    var sId = 'Id="' + sidRaw + '"';
    var sIdA = 'Id="' + sidRaw + 'A"';
    var sIdB = 'Id="' + sidRaw + 'B"';
    var sChecked = ''
    if ( bChecked )
        sChecked = ' checked ';
    var sCheckBox = ''
    sCheckBox += '<TR align=center><TD>'
    sCheckBox += ' <TABLE class="Settings_TableBorder" ' + sIdA + ' width="90%"><TR>';
    sCheckBox += '  <TD width="95%" '+ sIdB + ' class="Settings_CheckBoxRowTitle">' + stitle + '</TD>';
    sCheckBox += '  <TD width="5%" class="Settings_CheckBox"><INPUT type="checkbox" ' + sChecked +' class="Settings_CheckBox" ' + sId + ' onclick="Button_Settings_GetAllAndSaveCookie();"></TD>';
    sCheckBox += ' </TR></TABLE>';
    sCheckBox += '</TD></TR>'
    return sCheckBox;
}

function MakeSubTitleRow(sSubTitle, sIdRaw)
{
    let sTitleRow = '';
    let sIdA = 'Id="' + sIdRaw + 'A"';
    let sIdB = 'Id="' + sIdRaw + 'B"';
    let sIdC = 'Id="' + sIdRaw + 'C"';
    let sIdD = 'Id="' + sIdRaw + 'D"';
    sTitleRow += '<TR align=center ' + sIdA +'>'
    sTitleRow += '      <TD width=380 ' + sIdD + ' class="Settings_SubtitleRow">' + sSubTitle + '</TD>'
    sTitleRow += '</TR>'
    return sTitleRow;
}

function Button_Settings_GetAllAndSaveCookie()
{
    for ( let iE = 0; iE < g_TC_Settings_aIds.length; iE++ )
    {
        let sId = g_TC_Settings_aIds[iE];
        let sType = g_TC_Settings_aTypes[iE];
        if ( sType == 'Button')
        {
            let elem = document.getElementById(sId);
            let variable = g_TC_Settings_aVariables[iE];
            variable = elem.checked;
        }
    }
    StoreCookie_Settings();
}

function TC_HideSettings()
{
    if  ( !g_TC_Settings_bActive )
        g_TC_Settings_iActiveCount = 0;
    g_TC_Settings_iActiveCount = 0;
    let elemSettingDiv = document.getElementById("SettingsDiv");
    elemSettingDiv.style.visibility = 'hidden'
    if ( g_sCABOnSettingsClick != '')
        document.getElementById(g_sCABOnSettingsClick).focus();
    if ( g_sGRBOnSettingsClick != '')
        document.getElementById(g_sGRBOnSettingsClick).focus();
    g_sCABOnSettingsClick = '';
    g_sGRBOnSettingsClick = '';
}

function TC_ShowSettings()
{
    let elemSettingDiv = document.getElementById("SettingsDiv");
    elemSettingDiv.style.visibility = 'visible'
    g_sCABOnSettingsClick = g_CAB_Focus_sId;
    g_sGRBOnSettingsClick = g_GRB_Focus_sId;
    g_TC_Settings_bActive = true;
}
