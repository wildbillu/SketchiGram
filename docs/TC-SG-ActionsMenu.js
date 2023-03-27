// TC-SG-ActionsMenu.js
//
var g_SG_ActionMenu_bActive = false;
var g_sCAB_ActionMenu_Click = '';
var g_sGRB_ActionMenu_Click = '';
var g_SG_ActionMenu_aIds = [];
var g_SG_ActionMenu_aCheckBoxPrefixIds = [];

var g_SG_AM_bSmartMovesOnly = false;
var g_SG_AM_bIndicateCorrectMoves = false;


//let g_ActionMenu_iTop = 150; 
//let g_ActionMenu_iLeft = g_TC_Padding_Left_iSize;


function SG_ActionMenu_SetCheckBoxes()
{
    for ( let i = 0; i < g_SG_ActionMenu_aCheckBoxPrefixIds.length; i++ )
    {   
        let sId = g_SG_ActionMenu_aCheckBoxPrefixIds[i] + '_Button'
        SG_ActionMenu_SetCheckBox(sId, false, true);
    }
}

function SG_ActionMenu_SetVisible()
{
    TC_SetVisible("SG_ActionMenu_Div");
    for ( let i = 0; i < g_SG_ActionMenu_aCheckBoxPrefixIds.length; i++ )
    {   
        TC_SetVisible(g_SG_ActionMenu_aCheckBoxPrefixIds[i] + '_Div')
    }
}

function SG_AM_ShowDualClueSquares()
{
    g_SG_AM_bShowDualClueCircles = !g_SG_AM_bShowDualClueCircles;
    SG_ActionMenu_SetCheckBox("SG_AM_ShowDualClueSquares_Button", g_SG_AM_bShowDualClueCircles, true);
    GRBMS_SetAllButtons();
}

function SG_AM_SmartMove()
{
    g_SG_AM_bSmartMovesOnly = !g_SG_AM_bSmartMovesOnly;
    g_SG_AM_bIndicateCorrectMoves = !g_SG_AM_bIndicateCorrectMoves;
    SG_ActionMenu_SetCheckBox("SG_AM_SmartMove_Button", g_SG_AM_bSmartMovesOnly, true);
}
/*
function SG_AM_IndicateCorrectMoves()
{
    g_SG_AM_bIndicateCorrectMoves = !g_SG_AM_bIndicateCorrectMoves;
    SG_ActionMenu_SetCheckBox("SG_AM_IndicateCorrectMoves_Button", g_SG_AM_bIndicateCorrectMoves, true);
}
*/

function SG_AM_ShowSketchiToonsHint()
{
    TC_DisplayDualClue();
}

function SG_AM_CorrectSelected()
{
}

function SG_AM_RevealRandomSquare()
{
    SG_ShowExtraClue(false);
}

function SG_AM_SolvePuzzle()
{
    Dropdown_More_SolvePuzzle();
}

function SG_AM_ShowScratchArea()
{
    TC_SetVisible("ScratchArea");
}

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
    elemSmartMoveButton = document.getElementById("SG_AM_SmartMove_Button");
    elemSmartMoveButton.style.left = MakePixelString(20);
    elemSmartMoveButton.style.top = MakePixelString(0);
    SG_ActionMenu_SetCheckBoxes();
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


function SG_ActionMenu_ShowClues()
{
    SG_CA_UpdateAndSetVisibility(true);
}


function SG_ActionMenu_MakeCheckBoxButton(sId_Prefix, sFunction, sText)
{
    let sInner = '';
    sInner += '<DIV    Id="' + sId_Prefix + '_Div" class="SG_AM_SmartMove_Div">';
    sInner += '<BUTTON Id="' + sId_Prefix + '_Button" class="SG_ActionMenu_Button_Size_20" onclick="' + sFunction + ';"></BUTTON>';
    sInner += '</DIV>'
    sInner += '<DIV class="SG_ActionMenuButton">' + sText + '</DIV>';
    return sInner;
}

function SG_ActionMenu_MakeInner()
{
    g_SG_ActionMenu_aIds.length = 0;
    g_SG_ActionMenu_aCheckBoxPrefixIds.length;
    let sActionMenu = ''
// first the check box items    
    let sA = ''
    sA = SG_ActionMenu_MakeCheckBoxButton('SG_AM_SmartMove', 'SG_AM_SmartMove()', 'Smart Moves Only');
    sActionMenu += sA;
    g_SG_ActionMenu_aIds.push("SG_AM_SmartMove_Div");
    g_SG_ActionMenu_aCheckBoxPrefixIds.push("SG_AM_SmartMove");
/* this is combined into smart move
    sA = SG_ActionMenu_MakeCheckBoxButton('SG_AM_IndicateCorrectMoves', 'SG_AM_IndicateCorrectMoves()', 'Indicate Correct Moves');
    sActionMenu += sA;
    g_SG_ActionMenu_aIds.push("SG_AM_IndicateCorrectMoves_Div");
    g_SG_ActionMenu_aCheckBoxPrefixIds.push("SG_AM_IndicateCorrectMoves");
*/
    sA = SG_ActionMenu_MakeCheckBoxButton('SG_AM_ShowDualClueSquares', 'SG_AM_ShowDualClueSquares()', 'Show Dual Clue Squares');
    sActionMenu += sA;
    g_SG_ActionMenu_aIds.push("SG_AM_ShowDualClueSquares_Div");
    g_SG_ActionMenu_aCheckBoxPrefixIds.push("SG_AM_ShowDualClueSquares");
// now the just buttons
    sActionMenu += '<BUTTON Id="SG_AM_ShowClues"          class="SG_ActionMenuButton" onclick="SG_ActionMenu_ShowClues();">Show Clues</BUTTON>';
    g_SG_ActionMenu_aIds.push("SG_AM_ShowClues");
    sActionMenu += '<BUTTON Id="SG_AM_CorrectSelected"    class="SG_ActionMenuButton" onclick="SG_CorrectSelected();">Reveal Selected Square</BUTTON>';
    g_SG_ActionMenu_aIds.push("SG_AM_CorrectSelected");
    sActionMenu += '<BUTTON Id="SG_AM_RevealRandomSquare"    class="SG_ActionMenuButton" onclick="SG_AM_RevealRandomSquare();">Reveal Random Square</BUTTON>';
    g_SG_ActionMenu_aIds.push("SG_AM_RevealRandomSquare");
    sActionMenu += '<BUTTON Id="SG_AM_ShowSketchiToonsHint"    class="SG_ActionMenuButton" onclick="SG_AM_ShowSketchiToonsHint();">Show SketchiToons Hint</BUTTON>';
    g_SG_ActionMenu_aIds.push("SG_AM_ShowSketchiToonsHint");
    sActionMenu += '<BUTTON Id="SG_AM_SolvePuzzle"    class="SG_ActionMenuButton" onclick="SG_AM_SolvePuzzle();">Solve Puzzle</BUTTON>';
    g_SG_ActionMenu_aIds.push("SG_AM_SolvePuzzle");
    sActionMenu += '<BUTTON Id="SG_AM_ShowScratchArea"    class="SG_ActionMenuButton" onclick="SG_AM_ShowScratchArea();">Show Scratch Area</BUTTON>';
    g_SG_ActionMenu_aIds.push("SG_AM_ShowScratchArea");
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



function SG_Position_Answer(iRow)
{
    var sSize = ' [' + g_CAB_aAnswerLocations[iRow] + '] ';
    return sSize;
}

function SG_Size_Answer(iRow)
{
    var sSize = ' ( ' + g_CAB_aAnswers[iRow].length + ' letters ) ';
    return sSize;
}

function SG_ActionMenu_SizeAndPosition()
{
    let iWidth = 200;
    let elemActionMenuDiv = document.getElementById("SG_ActionMenu_Div")
    elemActionMenuDiv.style.top = MakePixelString(g_ActionMenu_iTop);
    elemActionMenuDiv.style.left = MakePixelString(g_ActionMenu_iLeft);
    elemActionMenuDiv.style.width = MakePixelString(iWidth);
    iTotalHeight = SG_ActionMenu_FixWidthsReturnHeight(iWidth);
    elemActionMenuDiv.style.height = MakePixelString(iTotalHeight);
    elemActionMenuDiv.style.zIndex = 2;
}




