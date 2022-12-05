// TC-MoreActions-Setup.js
//
var g_TC_MoreActions_bActive = false;
var g_sCABOnMoreActionsClick = '';
var g_sGRBOnMoreActionsClick = '';
var g_TC_MoreActions_aIds = [];

function Make_Button_MoreActions()
{
    sImage = '<img Id="Button_More_Image" src="' + TC_FullButtonName('Button_More.png') + '" alt="Actions" width=100%>'
    var sDropdownMenu = '';
    sDropdownMenu += '<BUTTON Id="MoreButton" class="TopRowControl_Button" onclick="TC_ShowMoreActions();" >' + sImage + '</BUTTON>';
    return sDropdownMenu;
}

function MakeMoreActionsInner()
{
    g_TC_MoreActions_aIds.length = 0;
    var sDropdownMenu = '';
    if ( g_bIsTwistiCross || g_bIsYourMove || g_bIsSketchiGramVariant1 )
    {
        sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_CheckAnswer" onclick="Dropdown_More_CheckAnswer();">Check Selected Answer</BUTTON>';
        g_TC_MoreActions_aIds.push("Dropdown_More_CheckAnswer");

        sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_ShowAnswer" onclick="Dropdown_More_ShowAnswer();">Reveal Selected Answer</BUTTON>';
        g_TC_MoreActions_aIds.push("Dropdown_More_ShowAnswer");

        sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_SolveAnswers" onclick="Dropdown_More_SolveAnswers();">Reveal Answers To Clues</BUTTON>';
        g_TC_MoreActions_aIds.push("Dropdown_More_SolveAnswers");
    }
    sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_CheckSquare" onclick="Dropdown_More_CheckSquare();">Check Selected Square</BUTTON>';
    g_TC_MoreActions_aIds.push("Dropdown_More_CheckSquare");
//
    sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_ShowSquare" onclick="Dropdown_More_ShowSquare();">Reveal Selected Square</BUTTON>';
    g_TC_MoreActions_aIds.push("Dropdown_More_ShowSquare");
//
    sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_SolveGrid" onclick="Dropdown_More_SolveGrid();">Reveal Answers To Grid</BUTTON>';
    g_TC_MoreActions_aIds.push("Dropdown_More_SolveGrid");
//
    if ( g_bIsTwistiCross || g_bIsYourMove || g_bIsSketchiGramVariant1 )
    {
        sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_SolveAsConventional" onclick="Dropdown_More_SolveAsConventional();">Solve As Standard Crossword</BUTTON>';
        g_TC_MoreActions_aIds.push("Dropdown_More_SolveAsConventional");
    
        sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_CheckPuzzle" onclick="Dropdown_More_CheckPuzzle();">Check Puzzle</BUTTON>';
        g_TC_MoreActions_aIds.push("Dropdown_More_CheckPuzzle");

        sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_SolvePuzzle" onclick="Dropdown_More_SolvePuzzle();">Reveal Puzzle</BUTTON>';
        g_TC_MoreActions_aIds.push("Dropdown_More_SolvePuzzle");
    }
    sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_ResetPuzzle" onclick="Dropdown_More_ResetPuzzle();">Reset All</BUTTON>';
    g_TC_MoreActions_aIds.push("Dropdown_More_ResetPuzzle");
    return sDropdownMenu;
}

function MoreActions_SizeAndPosition()
{
    let iHeight = 0;
    let iWidthMax = 0;
    for ( let iEntry = 0; iEntry < g_TC_MoreActions_aIds.length; iEntry++ )
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
//
    let elemMoreButton = document.getElementById("MoreButton");
    let rectMoreButton = GetBoundingClientRectAbsolute(elemMoreButton);
    let iTopMenu = rectMoreButton.bottom;
    let iLeftMenu = rectMoreButton.right - iWidthMax;
    elemDiv.style.top = MakePixelString(iTopMenu);
    elemDiv.style.left = MakePixelString(iLeftMenu);
    elemDiv.style.height = MakePixelString(iHeight + 2);
}

function MakeMoreActionsDiv()
{    
    var sMoreActionsInner = MakeMoreActionsInner()
    var sInner = '<DIV Id="MoreActions_Div" class="MoreActions_Div StartHidden" align=center>' + sMoreActionsInner + '</DIV>';
    return sInner;
}

function TC_HideMoreActions()
{
    var elemImage = document.getElementById("MoreActions_Div");
    elemImage.style.visibility = 'hidden'
    if ( g_sCABOnSettingsClick != '')
        document.getElementById(g_sCABOnMoreActionsClick).focus();
    if ( g_sGRBOnSettingsClick != '')
        document.getElementById(g_sGRBOnMoreActionsClick).focus();
    g_sCABOnMoreActionsClick = '';
    g_sGRBOnMoreActionsClick = '';
}

function TC_ShowMoreActions()
{
    var elemDiv = document.getElementById("MoreActions_Div");
// assume has correct width and height so just set top and left(to be centered)
    elemDiv.style.visibility = 'visible'
    g_sCABOnMoreActionsClick = g_CAB_Focus_sId;
    g_sGRBOnMoreActionsClick = g_GRB_Focus_sId;
    g_TC_MoreActions_bActive = true;
}
