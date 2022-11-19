// TC-SG-ActionsMenu.js
//
var g_SG_ActionMenu_bActive = false;
var g_sCAB_ActionMenu_Click = '';
var g_sGRB_ActionMenu_Click = '';
var g_SG_ActionMenu_aIds = [];

var g_SG_ActionMenu_bSmartMovesOnly = true;
var g_SG_ActionMenu_bSmartMovesOnly_Enabled = true;

function SG_ActionMenu_SetCheckBox(sId, bChecked, bEnabled)
{
    var elemButton = document.getElementById(sId);
    if ( bEnabled )
    {
        var sURL = MakeURLWrappedString(g_sImagePath_Buttons + 'CheckBoxButton_Unchecked.png', false);
        if ( bChecked )
            sURL = MakeURLWrappedString(g_sImagePath_Buttons + 'CheckBoxButton_Checked.png', false);
        elemButton.style.backgroundImage = sURL;
        return;
    }
    var sURL = MakeURLWrappedString(g_sImagePath_Buttons + 'CheckBoxButton_Unchecked_Disabled.png', false);
    if ( bChecked )
        sURL = MakeURLWrappedString(g_sImagePath_Buttons + 'CheckBoxButton_Checked_Disabled.png', false);
    elemButton.style.backgroundImage = sURL;
}

function SG_ActionMenu_FixWidthsReturnHeight(iWidth)
{
    elemSmartMoveButton = document.getElementById("SG_AM_SmartMoveButton");
    elemSmartMoveButton.style.left = MakePixelString(20);
    elemSmartMoveButton.style.top = MakePixelString(0);
    SG_ActionMenu_SetCheckBox("SG_AM_SmartMoveButton", g_SG_ActionMenu_bSmartMovesOnly);

    var iTotalHeight = 0; 
    for ( var iItem = 0; iItem < g_SG_ActionMenu_aIds.length; iItem++ )
    {
        var elemItem = document.getElementById(g_SG_ActionMenu_aIds[iItem]);
        elemItem.style.width = MakePixelString(iWidth)
        var rectItem = elemItem.getBoundingClientRect();
        iTotalHeight += rectItem.height;
    }
    return iTotalHeight;
}

function SG_SmartMoves()
{
    if ( !g_SG_ActionMenu_bSmartMovesOnly_Enabled ) 
        return;
    g_SG_ActionMenu_bSmartMovesOnly = !g_SG_ActionMenu_bSmartMovesOnly;
    SG_ActionMenu_SetCheckBox("SG_AM_SmartMoveButton", g_SG_ActionMenu_bSmartMovesOnly, g_SG_ActionMenu_bSmartMovesOnly_Enabled);
}

function SG_ActionMenu_MakeInner()
{
    var sActionMenu = ''
    sActionMenu += '<DIV Id="SG_AM_SmartMove"             class="SG_AM_SmartMove_Div"><BUTTON class="SG_ActionMenu_Button_Size_20" Id="SG_AM_SmartMoveButton" onclick="SG_SmartMoves();"></BUTTON></DIV><DIV class="SG_ActionMenuButton">Smart Moves Only</DIV>';
    g_SG_ActionMenu_aIds.push("SG_AM_SmartMove");
    sActionMenu += '<BUTTON Id="SG_AM_ShowClues"          class="SG_ActionMenuButton" onclick="SG_ShowClues(true, false, false);">Show Clues</BUTTON>';
    g_SG_ActionMenu_aIds.push("SG_AM_ShowClues");
    sActionMenu += '<BUTTON Id="SG_AM_SolveAsCrossword"   class="SG_ActionMenuButton" onclick="SG_ShowClues(true, true, true);">Solve As Crossword</BUTTON>';
    g_SG_ActionMenu_aIds.push("SG_AM_SolveAsCrossword");
    sActionMenu += '<BUTTON Id="SG_AM_CorrectSelected"    class="SG_ActionMenuButton" onclick="SG_CorrectSelected();">Fix Selected Square</BUTTON>';
    g_SG_ActionMenu_aIds.push("SG_AM_CorrectSelected");
    return sActionMenu;
}

function SG_ActionMenu_MakeDiv()
{    
    var sMoreActionsInner = SG_ActionMenu_MakeInner()
    var sInner = '<DIV Id="SG_ActionMenu_Div" class="SG_ActionMenu_Div StartHidden" align=center>' + sMoreActionsInner + '</DIV>';
    return sInner;
}

function SG_CorrectSelected()
{
    if ( g_GRBMS_Focus_sId == "")
        return false;
    iRow = GRBMS_RowFromId(g_GRBMS_Focus_sId);
    iLetter = GRBMS_LetterFromId(g_GRBMS_Focus_sId);
    var cCorrect = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
    GRBMS_onkeyup(cCorrect, iRow, iLetter);
}

function SG_MakeClueTextId(iRow)
{
    return 'SG_Clues_Text_' + iRow;
}

function SG_Position_Answer(iRow)
{
    var sSize = ' [' + g_aAnswerLocations[iRow] + '] ';
    return sSize;
}

function SG_Size_Answer(iRow)
{
    var sSize = ' ( ' + g_aAnswers[iRow].length + ' letters ) ';
    return sSize;
}





