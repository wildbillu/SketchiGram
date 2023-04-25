// TC-Settings-DifficultySupport.js
//var g_Difficulty_iLevel_OnNewPuzzle = g_Difficulty_iLevel_Expert;

function DS_SetButtons()
{
    let elemExpert = document.getElementById("Settings_Button_Expert");
    if ( g_Difficulty_iLevel_OnNewPuzzle == g_Difficulty_iLevel_Expert ) 
        elemExpert.className = "Settings_ButtonItem_Base Settings_ButtonItem_Selected"
    else 
        elemExpert.className = "Settings_ButtonItem_Base Settings_ButtonItem_Enabled"
    let elemHard = document.getElementById("Settings_Button_Hard");
        if ( g_Difficulty_iLevel_OnNewPuzzle == g_Difficulty_iLevel_Hard ) 
        elemHard.className = "Settings_ButtonItem_Base Settings_ButtonItem_Selected"
    else 
        elemHard.className = "Settings_ButtonItem_Base Settings_ButtonItem_Enabled"
    let elemEasy = document.getElementById("Settings_Button_Easy");
    if ( g_Difficulty_iLevel_OnNewPuzzle == g_Difficulty_iLevel_Easy ) 
        elemEasy.className = "Settings_ButtonItem_Base Settings_ButtonItem_Selected"
    else 
        elemEasy.className = "Settings_ButtonItem_Base Settings_ButtonItem_Enabled"
}

function DS_Expert()
{
    g_Difficulty_iLevel_OnNewPuzzle = g_Difficulty_iLevel_Expert;
    DS_SetButtons();
}

function DS_Hard()
{
    g_Difficulty_iLevel_OnNewPuzzle = g_Difficulty_iLevel_Hard;
    DS_SetButtons();
}

function DS_Easy()
{
    g_Difficulty_iLevel_OnNewPuzzle = g_Difficulty_iLevel_Easy;
    DS_SetButtons();
}

function MakeDifficultySupportDiv()
{    
    let sInner = '';
    sInner += '<TR Id="SettingsDifficultyDiv" class="SettingsDifficultyDiv"><TD>';
    sInner += '  <TABLE>';
    sInner += '   <TR>';
    sInner += '    <TD class="SettingsDifficulty_Title">Select Difficulty</TD>'
    sInner += '    <TD><DIV Id="Settings_Button_Expert" onClick="DS_Expert();" class="Settings_ButtonItem_Base Settings_ButtonItem_Selected">Expert</DIV></TD>';
    sInner += '    <TD><DIV Id="Settings_Button_Hard"   onClick="DS_Hard();"   class="Settings_ButtonItem_Base Settings_ButtonItem_Enabled">Hard</DIV></TD>';
    sInner += '    <TD><DIV Id="Settings_Button_Easy"   onClick="DS_Easy();"   class="Settings_ButtonItem_Base Settings_ButtonItem_Enabled">Easy</DIV></TD>';
    sInner += '   </TR>';
    sInner += '   <TR><TD>&nbsp;</TD><TD colspan=3 class="SettingsDifficulty_Title">Applies to next new puzzle</TD></TR>'
    sInner += '  </TABLE>'
    sInner += ' </TD>';

    sInner += '</TD></TR>';
    return sInner;
}

