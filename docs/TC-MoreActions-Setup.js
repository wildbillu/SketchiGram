// TC-MoreActions-Setup.js
//
var g_TC_MoreActions_bActive = false;
var g_sCABOnMoreActionsClick = '';
var g_sGRBOnMoreActionsClick = '';
var g_TC_MoreActions_aIds = [];

function TC_ChangeDirection()
{
    g_GRB_bAcross = !g_GRB_bAcross;
    if ( g_GRB_Focus_sId == '' )
        return;
    if ( g_GRB_bShowSelectRowColumn )
    {
        if ( g_GRB_bAcross )
            GRB_SetActiveRow(g_GRB_Focus_sId)
        else
            GRB_SetActiveLetter(g_GRB_Focus_sId)
    }
}

function TC_Undo()
{
    TC_History_UndoLast();
}

function TC_ShowHint()
{
    CAB_SpecialClueExpandHint();
}

function TC_Deselect()
{
    SyncTo_OthersLoseFocus('NoOne')
}

function MakeMoreActionsInner()
{
    g_TC_MoreActions_aIds.length = 0;
    let sDropdownMenu = '';
    sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_SolveGrid" onclick="Action_SolvePuzzle();">Reveal Puzzle</BUTTON>';
    g_TC_MoreActions_aIds.push("Dropdown_More_SolveGrid");
//
    sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_ResetPuzzle" onclick="Action_ResetPuzzle();">Reset All</BUTTON>';
    g_TC_MoreActions_aIds.push("Dropdown_More_ResetPuzzle");
    return sDropdownMenu;
}

function MoreActions_SizeAndPosition()
{
    let iHeight = 0;
    let iWidthMax = 0;
    let iEntries = g_TC_MoreActions_aIds.length;
    for ( let iEntry = 0; iEntry < iEntries; iEntry++ )
    { // get height and determine widest item
        let elemItem = document.getElementById(g_TC_MoreActions_aIds[iEntry]);
        let rectItem = GetBoundingClientRectAbsolute(elemItem)
        let iWidthThis = rectItem.width + 2 * g_TC_Padding_Inter_Horizontal_iSize;
        if ( iWidthThis > iWidthMax )
            iWidthMax = iWidthThis;
        iHeight += rectItem.height;
    }
    for ( let iEntry = 0; iEntry < g_TC_MoreActions_aIds.length; iEntry++ )
    {
        let elemItem = document.getElementById(g_TC_MoreActions_aIds[iEntry]);
        elemItem.style.width = MakePixelString(iWidthMax)
    }
    var elemDiv = document.getElementById("MoreActions_Div");
    elemDiv.style.width = MakePixelString(iWidthMax);
    elemDiv.style.height = MakePixelString(iHeight)
    elemDiv.style.top = MakePixelString(g_MoreMenu_iTop);
    elemDiv.style.left = MakePixelString(g_MoreMenu_iLeft);
    elemDiv.style.height = MakePixelString(iHeight + 2);
}

function MakeMoreActionsDiv()
{    
    let sMoreActionsInner = MakeMoreActionsInner();
    let sInner = '<DIV Id="MoreActions_Div" class="MoreActions_Div" align=center>' + sMoreActionsInner + '</DIV>';
    return sInner;
}

function TC_HideMoreActions()
{
    var elemImage = document.getElementById("MoreActions_Div");
    elemImage.style.visibility = 'hidden'
    if ( g_sCABOnMoreActionsClick != '')
        document.getElementById(g_sCABOnMoreActionsClick).focus();
    if ( g_sGRBOnMoreActionsClick != '')
    {
        document.getElementById(g_sGRBOnMoreActionsClick).focus();
    }
    g_sCABOnMoreActionsClick = '';
    g_sGRBOnMoreActionsClick = '';
}

function TC_ShowMoreActions()
{
    let elemDiv = document.getElementById("MoreActions_Div");
// assume has correct width and height so just set top and left(to be centered)
    elemDiv.style.visibility = 'visible'
    g_sCABOnMoreActionsClick = g_CAB_Focus_sId;
    g_sGRBOnMoreActionsClick = g_GRB_Focus_sId;
    g_TC_MoreActions_bActive = true;
// set timer for to close this 
    setTimeout(function(){TC_HideMoreActions();}, 10000);   
    
}

function SetMoreButton(sButton, bEnabled)
{
    let eButton = document.getElementById(sButton);
    eButton.disabled = !bEnabled;
    if ( bEnabled )
        eButton.className = 'Dropdown_More_Button';
    else 
        eButton.className = 'Dropdown_More_Button_Disabled';
}

function FeaturesDependingOnPuzzleSolved_MoreMenu()
{
    SetMoreButton_IfActive("Dropdown_More_SolvePuzzle", !g_bPuzzleSolved);
    SetMoreButton_IfActive("Dropdown_More_ResetPuzzle", true);
}

function SetMoreButton_IfActive(sButtonId, bEnabled)
{
    for ( let i = 0; i < g_TC_MoreActions_aIds.length; i++ )
    {
        if ( sButtonId == g_TC_MoreActions_aIds[i] )
        {
            SetMoreButton(sButtonId, bEnabled);
            break;
        }
    }
}
