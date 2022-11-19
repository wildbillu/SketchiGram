// TC-Status-Process.js

var g_TC_iSquares = 0;
var g_TC_iSquares_Correct = 0;
var g_TC_iGridAnswers = 0;
var g_TC_iGridAnswers_Correct = 0;
var g_TC_iClueAnswers = 0;
var g_TC_iClueAnswers_Correct = 0;

var g_TC_Status_bFirstCheck = true;
var g_TC_Status_iChanges    = 0;
var g_TC_Status_sChanges    = '';

var g_TC_ShadeBackgroundOnStatus_bActive = true;
var g_TC_ShadeBackgroundOnStatus_sId = "Body_Any";
var g_TC_ShadeBackgroundOnStatus_fMaxOpacity = 0.1;
var g_TC_ShadeBackgroundOnStatus_sColorCode = 'rgba(0,255,0,O)';

function Status_Check_AddChange(sNew)
{
    if ( g_TC_Status_sChanges != '' )
        g_TC_Status_sChanges += g_TC_cGeneralDelimiter;
    g_TC_Status_sChanges += sNew;
}

function Status_Check(bNonPlayerFixes)
{ // called everytime character is done, show answer(CA or GR), solve(CA, GR, All)
    g_TC_Status_iChanges    = 0;
    g_TC_Status_sChanges    = '';
    var bInitiallySolved = g_bPuzzleSolved;
    if ( g_bSettings_CA_Display_ShowProgress && g_bIsSketchiGram )
    {
        var sSQ = Status_Check_Squares();
        var elemCA = document.getElementById("StatusControl_CA")
        elemCA.innerHTML = sSQ;
    }
    if ( g_bSettings_CA_Display_ShowProgress && (g_bIsTwistiCross || g_bIsYourMove ) )
    {
        var sCA = Status_Check_Answers();
        var elemCA = document.getElementById("StatusControl_CA")
        elemCA.innerHTML = sCA;
    }
    if ( g_bSettings_CA_Display_ShowProgress )
    {
        var sGR = Status_Check_Grid();
        elemGR = document.getElementById("StatusControl_GR")
        elemGR.innerHTML = sGR;
    }
    if ( g_bIsTwistiCross || g_bIsYourMove )
        g_bPuzzleSolved = g_bAnswersSolved && g_bGridSolved;  
    if ( g_bIsSketchiGram )
        g_bPuzzleSolved = g_bGridSolved;  
    Status_ShadeBackground();
    if ( !bInitiallySolved && g_bPuzzleSolved && g_bSettings_CAGR_Display_Complete )
    {
        TC_ShowSolvedImage();
    }
    else if ( !g_TC_Status_bFirstCheck && ( g_TC_Status_iChanges > 0 ))
    {
        let sMessageStyle = g_ResultMessage_sStyle_Positive;
        if ( bNonPlayerFixes )
            sMessageStyle = g_ResultMessage_sStyle_InfoOnly;
        TC_ResultMessage_DisplayForInterval(g_TC_Status_sChanges, sMessageStyle, g_TC_Status_iChanges, 3);
    }
    FeaturesDependingOnPuzzleSolved();
    StoreCookie_Puzzle();
    g_TC_Status_bFirstCheck = false;
}

function Status_ShadeBackground()
{
    if ( !g_TC_ShadeBackgroundOnStatus_bActive )
        return;
    var fFractionComplete = 0.0;
    if ( g_bIsSketchiGram )
    {
        var iTotal = g_TC_iSquares;// + g_TC_iGridAnswers;
        var iTotal_Correct = g_TC_iSquares_Correct;// + g_TC_iGridAnswers_Correct;
        fFractionComplete = iTotal_Correct/iTotal;
    }
    else 
    {
        var iTotal = g_TC_iGridAnswers + g_TC_iClueAnswers;
        var iTotal_Correct = g_TC_iGridAnswers_Correct + g_TC_iClueAnswers_Correct;
        fFractionComplete = iTotal_Correct/iTotal;
    }

    var fOpacity = g_TC_ShadeBackgroundOnStatus_fMaxOpacity * fFractionComplete;
    var elemBody = document.getElementById(g_TC_ShadeBackgroundOnStatus_sId);
    var sOpacity = fOpacity.toString();
    var sRGBAColor = g_TC_ShadeBackgroundOnStatus_sColorCode.replace("O", sOpacity);
    elemBody.style.backgroundColor = sRGBAColor;
}

function FeaturesDependingOnPuzzleSolved()
{
    FeaturesDependingOnPuzzleSolved_MoreMenu();
    if ( g_bIsTwistiCross )
    {
        if ( g_Place_bPopupPlaceSupport )
            Place_Set_EnabledDisabled(!g_bGridSolved);
        if ( g_Place_bDirectPlaceSupport )
            TC_Place_Direct_Buttons_EnableDisable_All(!g_bGridSolved);
    }
}

function Status_Check_Squares()
{
    let iSquares_Correct_Starting = g_TC_iSquares_Correct;
    g_TC_iSquares_Correct = 0;
    g_TC_iSquares = 0;
    var sSQ = '';
    for ( var iRow = 0; iRow < g_iGridHeight; iRow++ )
    {
        for ( var iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            if ( !GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
            {
                g_TC_iSquares++;
                if ( GRB_ForRowLetter_GetAnswer(iRow, iLetter) == GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter) )
                    g_TC_iSquares_Correct++;
            }
        }
    }
    var sSQ = 'Chars: ' + g_TC_iSquares_Correct + ' of ' + g_TC_iSquares;
    if ( g_TC_iSquares_Correct > iSquares_Correct_Starting )
    {
        let iNew = g_TC_iSquares_Correct - iSquares_Correct_Starting;
        let sMessage = iNew + ' Square Solved';
        if ( iNew > 1 )
            sMessage = iNew + ' Squares Solved';
        Status_Check_AddChange(sMessage);
        g_TC_Status_iChanges += iNew;
    }
    return sSQ;
}

function Status_Check_Grid()
{
    let iGridAnswers_Correct_Starting = g_TC_iGridAnswers_Correct;
    g_TC_iGridAnswers_Correct = 0;
    var iGRRows = g_iGridWidth;
    for ( var iGRRow = 0; iGRRow < iGRRows; iGRRow++ )
    {
        if ( g_aGridAnswersPlayer[iGRRow] == g_aGridAnswers[iGRRow] )
            g_TC_iGridAnswers_Correct++;
    }
    var iGRLetters = g_iGridHeight
    // down grid answers - dont need to check for black squares cause player answer will have the .
    for (var iGRLetter = 0; iGRLetter < iGRLetters; iGRLetter++ )
    {
        var bLetterCorrect = true;
        for ( var iRow = 0; iRow < g_iGridHeight; iRow++)
        {
            if ( GRB_ForRowLetter_GetAnswer(iRow, iGRLetter) != GRB_ForRowLetter_GetAnswerPlayer(iRow, iGRLetter) )
                bLetterCorrect = false;
        }
        if ( bLetterCorrect )
            g_TC_iGridAnswers_Correct++;
    }
    g_TC_iGridAnswers = g_iGridWidth + g_iGridHeight;
    sGR = 'Grid: ' + g_TC_iGridAnswers_Correct + ' of ' + g_TC_iGridAnswers;
    if ( g_TC_iGridAnswers_Correct == g_TC_iGridAnswers )
        g_bGridSolved = true;
    else
        g_bGridSolved = false;
    if ( g_TC_iGridAnswers_Correct > iGridAnswers_Correct_Starting )
    {
        let iNew = g_TC_iGridAnswers_Correct - iGridAnswers_Correct_Starting;
        let sMessage = iNew + ' Grid Word Solved';
        if ( iNew > 1 )
            sMessage = iNew + ' Grid Words Solved';
        Status_Check_AddChange(sMessage);
        g_TC_Status_iChanges += iNew;
    }
    return sGR;
}

function Status_Check_Answers()
{
    iClueAnswers_Correct_Starting = g_TC_iClueAnswers_Correct;
    g_TC_iClueAnswers_Correct = 0;
    g_TC_iClueAnswers = g_aAnswers.length
    for ( var iRow = 0; iRow < g_TC_iClueAnswers; iRow++)  
    {
        if ( g_aAnswers[iRow] == g_aAnswersPlayer[iRow])
        g_TC_iClueAnswers_Correct++
    }
    var sCA = 'Not Active'
    if ( g_bSettings_CA_Display_ShowProgress )
    {
        var sCA = 'Clues: ' + g_TC_iClueAnswers_Correct + ' of ' + g_TC_iClueAnswers;
    }
    if ( g_TC_iClueAnswers_Correct == g_TC_iClueAnswers)
        g_bAnswersSolved = true;
    else
        g_bAnswersSolved = false;
    if  ( g_TC_iClueAnswers_Correct > iClueAnswers_Correct_Starting )
    {
        let iNew = g_TC_iClueAnswers_Correct - iClueAnswers_Correct_Starting;
        let sMessage = iNew + ' Clue Solved';
        if ( iNew > 1 )
            sMessage= iNew + ' Clues Solved';
        Status_Check_AddChange(sMessage);
        g_TC_Status_iChanges += iNew;
    }
    return sCA;
}

