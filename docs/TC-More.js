// TC-More.js


function SG_ShowCheckActiveSquare(sAction)
{ //only SketchiGram versions
    SG_Clues_ShowCorrect();
if ( g_GRBMS_Focus_sId == '' )
        return false;
    let iRow = GRBMS_RowFromId(g_GRBMS_Focus_sId);
    let iLetter = GRBMS_LetterFromId(g_GRBMS_Focus_sId);
    if ( sAction == 'Check' )
    {
        GRBMS_ForRowLetterShowCheckSquare(iRow, iLetter, sAction, true);
        GRBMS_ForRowLetter_SetButton(iRow, iLetter, g_TC_cCodeMeaning_HasFocus);
    }
    else
    {
        SG_FixSquare(iRow, iLetter);
    }
}

function SG_ShowCheckActiveAnswer(sAction)
{
    alert('Answer:' + sAction)
    Dropdown_More_FinishUp(true);
}

function Dropdown_More_CheckSquare()
{
    if ( !CAB_ShowCheckActiveSquare('Check') )
    {
        if ( g_bIsTwistiCross )
            GRB_ShowCheckActiveSquare('Check')
        else if ( g_bIsYourMove )
            alert('Need to Implement for YM')
        else if ( g_bIsSketchiGram  )
        {
            SG_ShowCheckActiveSquare('Check');
        }
    } 
    Dropdown_More_FinishUp(false);
}

function Dropdown_More_FinishUp(bNonPlayerFixes)
{
    StoreCookie_Puzzle();    
    Status_Check(bNonPlayerFixes);
    TC_HideMoreActions();
}

function Dropdown_More_ShowSquare()
{
    if ( !CAB_ShowCheckActiveSquare('Show') )
    {
        if ( g_bIsTwistiCross )
            GRB_ShowCheckActiveSquare('Show');
        else if ( g_bIsYourMove )
            alert('Need to Implement for YM')
        else if ( g_bIsSketchiGram )
            SG_ShowCheckActiveSquare('Show')
    }
    Dropdown_More_FinishUp(true);
}

function Dropdown_More_CheckAnswer()
{
    if ( !CAB_ShowCheckAnswerActiveRow('Check') )
        GRB_ShowCheckAnswerActiveRowOrColumn('Check');
    Dropdown_More_FinishUp(false);
}

function Dropdown_More_ShowAnswer()
{
    if ( g_bIsTwistiCross )
    {
        if ( !CAB_ShowCheckAnswerActiveRow('Show') )
            GRB_ShowCheckAnswerActiveRowOrColumn('Show');
    }    
    if ( g_bIsYourMove )
    {
        if ( !CAB_ShowCheckAnswerActiveRow('Show') )
            alert('Need to Implement for YM')
    } 
    if ( g_bIsSketchiGram  )
    {
        SG_ShowCheckActiveAnswer('Show');
    }
    Dropdown_More_FinishUp(true);
}

function Dropdown_More_SolveGrid()
{
    if ( g_bIsTwistiCross )
        GRB_ShowCheckGrid('Show');
    else if ( g_bIsYourMove || g_bIsSketchiGram )
        GRBMS_ShowCheckGrid('Show');
    Dropdown_More_FinishUp(true);
}

function Dropdown_More_SolveAsConventional()
{
    if ( g_bIsSketchiGram )
    {
        alert('option should not be here')
        return;
    }
    if ( g_aAnswerLocations.length != g_iClues ) // should never get here but....
        return;
    var sNewDualClueText = '(' + g_aAnswerLocations[0] + ') ' + g_ST_sClue_Itself + ' (' + g_aAnswerLocations[1] + ')'
	document.getElementById('CA01C').innerHTML = sNewDualClueText;
    for ( iRR = 2; iRR < g_iClues; iRR++ )
    {
        var sId = CAB_MakeIdForClueText(iRRR)
        var eRow = document.getElementById(sId)
        var sClue = g_aClues[iRR];
        var sNewText = '(' + g_aAnswerLocations[iRR] + ') \n' + sClue;
        eRow.innerHTML = sNewText;
    }
    Dropdown_More_FinishUp(false);
}

function Dropdown_More_ResetPuzzle()
{
    if ( g_bIsTwistiCross )
    {
        GRB_ClearGrid();
        CAB_ClearAnswers();
        elem = document.getElementById(CAB_MakeId(0,0)).focus();
    }
    else if ( g_bIsYourMove || g_bIsSketchiGram )
    {
        GRBMS_ScrambleCorrectAnswersToPlayer(true);
        GRBMS_SetAllButtons()
        document.getElementById("KB_Mini_Div").style.visibility = 'hidden';
    }
    Dropdown_More_FinishUp(true);
}

function Dropdown_More_CheckPuzzle()
{
    if ( g_bIsTwistiCross )
        GRB_ShowCheckGrid('Check');
    else if ( g_bIsYourMove || g_bIsSketchiGram )
        GRBMS_ShowCheckGrid('Check');
    CAB_ShowCheckAnswers('Check');
    Dropdown_More_FinishUp(false);
}

function Dropdown_More_SolveAnswers()
{
    if ( g_bIsSketchiGram )
    {
        alert('SolveAnswers should not exist')
        return;
    }
    CAB_ShowCheckAnswers('Show');
    Dropdown_More_FinishUp(true);
}

function Dropdown_More_SolvePuzzle()
{
    Dropdown_More_SolveGrid();
    if ( g_bIsTwistiCross )
    {
        CAB_ShowCheckAnswers('Show');
        GRB_ShowCheckGrid('Show');
    }
    if ( g_bIsYourMove )
    {
        CAB_ShowCheckAnswers('Show');
        GRBMS_ShowCheckGrid('Show');
    }
    Dropdown_More_FinishUp(true);
}

function SetMoreButton(sButton, bEnabled)
{
    var eButton = document.getElementById(sButton);
    eButton.disabled = !bEnabled;
    if ( bEnabled )
        eButton.className = 'Dropdown_More_Button';
    else 
        eButton.className = 'Dropdown_More_Button_Disabled';
}

function FeaturesDependingOnPuzzleSolved_MoreMenu()
{
    SetMoreButton_IfActive("Dropdown_More_SolveGrid", !g_bGridSolved);    
    SetMoreButton_IfActive("Dropdown_More_ShowAnswer", !g_bPuzzleSolved);
    SetMoreButton_IfActive("Dropdown_More_ShowSquare", !g_bPuzzleSolved);
    SetMoreButton_IfActive("Dropdown_More_SolveAnswers", !g_bAnswersSolved);
    SetMoreButton_IfActive("Dropdown_More_SolvePuzzle", !g_bPuzzleSolved);
    SetMoreButton_IfActive("Dropdown_More_CheckAnswer", !g_bPuzzleSolved);
    SetMoreButton_IfActive("Dropdown_More_CheckSquare", !g_bPuzzleSolved);
    SetMoreButton_IfActive("Dropdown_More_CheckPuzzle", !g_bPuzzleSolved);
    SetMoreButton_IfActive("Dropdown_More_SolveAsConventional", !g_bPuzzleSolved);
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
