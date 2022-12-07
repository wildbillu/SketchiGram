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

function TC_HideSettings()
{
    if  ( !g_TC_Settings_bActive )
        g_TC_Settings_iActiveCount = 0;
    g_TC_Settings_iActiveCount = 0;
    var elemSettingDiv = document.getElementById("SettingsDiv");
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
    var elemSettingDiv = document.getElementById("SettingsDiv");
    elemSettingDiv.style.visibility = 'visible'
    g_sCABOnSettingsClick = g_CAB_Focus_sId;
    g_sGRBOnSettingsClick = g_GRB_Focus_sId;
    g_TC_Settings_bActive = true;
}

function TC_AdjustSettings()
{
    var elemSettingsDiv = document.getElementById("SettingsDiv");
// need to determine both the width and height 
    let iWidthMax = 0;
    let iHeightTotal = 30; // padding top bottom
    for ( let iE = 0; iE < g_TC_Settings_aIds.length; iE++ )
    {
        let sId = g_TC_Settings_aIds[iE];
        let sType = g_TC_Settings_aTypes[iE];
        let elem = document.getElementById(sId);
        let elemRect = elem.getBoundingClientRect();
        let elemiHeight = elemRect.height;
        if ( sType == 'button')
            iHeightTotal += elemiHeight;
        else
            iHeightTotal += 2 * elemiHeight;
        if ( elemRect.width > iWidthMax )
            iWidthMax = elemRect.width;
    }
    iWidthMax += 100;
    elemSettingsDiv.style.width = MakePixelString(iWidthMax);
    let iLeftForCentering = TC_LeftForCentering(iWidthMax);
    elemSettingsDiv.style.left = MakePixelString(iLeftForCentering);
    elemSettingsDiv.style.top = MakePixelString(80)
    elemSettingsDiv.style.height = MakePixelString(iHeightTotal)
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
    sCheckBox += '  <TD width="5%" class="Settings_CheckBox"><INPUT type="checkbox" ' + sChecked +' class="Settings_CheckBox"' + sId + ' onclick="Button_Settings_GetAllAndSaveCookie();"></TD>';
    sCheckBox += ' </TR></TABLE>';
    sCheckBox += '</TD></TR>'
    return sCheckBox;
}

function MakeSubTitleRow(sSubTitle, sIdRaw)
{
    var sTitleRow = '';
    var sId = 'Id="' + sIdRaw + '"';
    var sIdA = 'Id="' + sIdRaw + 'A"';
    var sIdB = 'Id="' + sIdRaw + 'B"';
    sTitleRow += '<TR align=center ' + sIdA +'><TD>'
    sTitleRow += '  <TABLE ' + sIdB + ' class="Settings_TableBorder Settings_Center" width="90%">';
    sTitleRow += '    <TR ' + sId + 'class="Settings_Center" align=center >'; 
    sTitleRow += '      <TD width="100%" ' + sId + 'class="Settings_SubtitleRow">' + sSubTitle + '</TD>'
    sTitleRow += '    </TR>'
    sTitleRow += '  </TABLE>';
    sTitleRow += '</TD></TR>'
    return sTitleRow;
}

function MakeSettingsInner()
{
    var sPopupWindow = '';
    sPopupWindow += '<TABLE class="Settings_TableBorder" Id="Settings_B" width="100%">'
    sPopupWindow += '<TR class="Settings_CloseBoxRow" Id="Settings_F" ><TD>'
    sPopupWindow += '<TABLE Id="Settings_I" width="100%"><TR><TD width="95%" Id="Settings_G" class="Settings_CloseBoxRow">Settings</TD><TD width="5%"><BUTTON Id="Settings_CloseBox" class="Settings_CloseBox" onclick="TC_HideSettings();">Done</TD></TR></TABLE>';
    sPopupWindow += '</TD></TR>';
//    
    if ( g_bIsTwistiCross || g_bIsYourMove || g_bIsSketchiGramVariant1 )
    {
        sPopupWindow += MakeSubTitleRow('Check and Show Correct Items', 'Settings_STA');
        g_TC_Settings_aVariables.push(g_TC_Settings_bDummy);g_TC_Settings_aIds.push("Settings_STA"); g_TC_Settings_aTypes.push("SubTitle");

        sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Answers_CheckRow, 'Settings_CAGR_Answers_CheckRow', 'Check each answer and mark when correct');
        g_TC_Settings_aVariables.push(g_bSettings_CAGR_Answers_CheckRow);g_TC_Settings_aIds.push("Settings_CAGR_Answers_CheckRow"); g_TC_Settings_aTypes.push("Button");
         
        sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Answers_ShowCorrectLetters, "Settings_CAGR_Answers_ShowCorrectLetters", 'Mark each square when correct');
        g_TC_Settings_aVariables.push(g_bSettings_CAGR_Answers_ShowCorrectLetters);g_TC_Settings_aIds.push("Settings_CAGR_Answers_ShowCorrectLetters"); g_TC_Settings_aTypes.push("Button");
    }

    if ( g_bIsTwistiCross || g_bIsYourMove || g_bIsSketchiGramVariant1 )
    {
        sPopupWindow += MakeSubTitleRow('Actions On Add Letter', 'Settings_STB');
        g_TC_Settings_aVariables.push(g_TC_Settings_bDummy);g_TC_Settings_aIds.push("Settings_STB"); g_TC_Settings_aTypes.push("SubTitle");

        sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares, "Settings_CAGR_Navigation_WithinWord_SkipFilledSquares", 'Skip Filled Squares')
        g_TC_Settings_aVariables.push(g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares);g_TC_Settings_aIds.push("Settings_CAGR_Navigation_WithinWord_SkipFilledSquares"); g_TC_Settings_aTypes.push("Button");

        sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare, 'Settings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare', 'Jump to empty square at end of word')
        g_TC_Settings_aVariables.push(g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare);g_TC_Settings_aIds.push("Settings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare"); g_TC_Settings_aTypes.push("Button");

        sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue, 'Settings_CAGR_Navigation_EndOfWord_JumpToNextClue', 'Jump to next word at completed word')
        g_TC_Settings_aVariables.push(g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue);g_TC_Settings_aIds.push("Settings_CAGR_Navigation_EndOfWord_JumpToNextClue"); g_TC_Settings_aTypes.push("Button");
    }
    sPopupWindow += MakeSubTitleRow('Progress Indicators', 'Settings_STC')
    g_TC_Settings_aVariables.push(g_TC_Settings_bDummy);g_TC_Settings_aVariables.push(g_TC_Settings_bDummy);g_TC_Settings_aIds.push("Settings_STC"); g_TC_Settings_aTypes.push("SubTitle");

    if ( g_bIsTwistiCross || g_bIsYourMove || g_bIsSketchiGramVariant1 )
    {
        sPopupWindow += MakeCheckBox(g_bSettings_CA_Display_ShowProgress, 'Settings_CA_Display_ShowProgress', 'Show progress for clue answers')
        g_TC_Settings_aVariables.push(g_bSettings_CA_Display_ShowProgress);g_TC_Settings_aIds.push("Settings_CA_Display_ShowProgress"); g_TC_Settings_aTypes.push("Button");

        sPopupWindow += MakeCheckBox(g_bSettings_GR_Display_ShowProgress, 'Settings_GR_Display_ShowProgress', 'Show progress for grid answers')
        g_TC_Settings_aVariables.push(g_bSettings_GR_Display_ShowProgress);g_TC_Settings_aIds.push("Settings_GR_Display_ShowProgress"); g_TC_Settings_aTypes.push("Button");
    }
    sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Display_Complete, 'Settings_CAGR_Display_Complete', 'Show Completion(s)')
    g_TC_Settings_aVariables.push(g_bSettings_CAGR_Display_Complete);g_TC_Settings_aIds.push("Settings_CAGR_Display_Complete"); g_TC_Settings_aTypes.push("Button");
    sPopupWindow += '</TABLE>';
    return sPopupWindow;
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



