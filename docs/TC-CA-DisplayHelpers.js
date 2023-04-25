// TC-SG-SG2-CADisplayHelpers.js

var g_SG_Clues_bCreated = false;
var g_SG2_CAB_bVisible = false;
var g_SG_SC_FrameOnly   = -1;
var g_SG_SC_ShowAll     = -2;

var g_SG_aAnswersCorrectInGrid = [];
var g_SG_bAnswersCorrectInGridSet = false;

function SG_CA_UpdateAndSetVisibility(bVisible)
{
    if ( g_ThemeImage_Base_bActive ) 
    {
        TC_ThemeImage_Base_SetVisibility(!bVisible)
    }
    SG_UpdateAnswersCorrectInGridAndDisplay();
    ForIdSetVisibility("SG_Clues_Div", bVisible);
    if ( g_CA_bShowSpecial )
    {
        ForIdSetVisibility("SG_SpecialClue_AnswerItselfText_Div", bVisible);
        ForIdSetVisibility("SG_SpecialClue_Outer_Div", bVisible);
        ForIdSetVisibility("SG_SpecialClue_ClueItselfText_Div", bVisible);
    }
    for ( let iClue = 0; iClue < g_CAB_aAnswers.length; iClue++ )
    {
        if ( !g_CA_bShowSpecial || !TC_ForIndexIsClueTypeSpecial(iClue) )
        {
            let sId = SG_MakeClueTextId(iClue);
            ForIdSetVisibility(sId, bVisible);
        }
    }
}

function SG_UpdateAnswersCorrectInGridAndDisplay()
{
    if ( SG_SetAnswersCorrectInGrid() )
        SG_ResetAnswerFromAnswersCorrectInGrid()
}

function SG_ResetAnswerFromAnswersCorrectInGrid()
{
    if ( g_CA_bShowSpecial ) SG_MakeSpecialCluesAnswerStringAndVisibility();
    for ( let iClue = 0; iClue < g_CAB_aAnswers.length; iClue++ )
    {
        if ( !g_CA_bShowSpecial || !TC_ForIndexIsClueTypeSpecial(iClue) )
        {
            SG_MakeNormalCluesAnswerStringAndVisibility(iClue);
        }
    }
}

function AnswersCorrectInGridInitialize()
{
    let iAnswers = g_CAB_aAnswers.length
    for ( let i = 0; i < iAnswers; i++ ) g_SG_aAnswersCorrectInGrid.push(false);
}

function SG_MakeNormalCluesAnswerStringAndVisibility(iClue)
{
    let sCluePlus = '';
    let bCorrectInGrid = g_SG_aAnswersCorrectInGrid[iClue];
    if ( bCorrectInGrid ) sCluePlus += SG_Position_Answer(iClue);
    sCluePlus += g_CAB_aClues[iClue];
    if ( bCorrectInGrid ) sCluePlus += ' : ';
    if ( bCorrectInGrid ) sCluePlus += g_CAB_aAnswers[iClue];
    if ( !bCorrectInGrid ) sCluePlus += SG_Size_Answer(iClue);
    let sId = SG_MakeClueTextId(iClue);
    let elemClueText = document.getElementById(sId);
    elemClueText.innerHTML = sCluePlus;
    if ( bCorrectInGrid ) 
    {
        ForIdSetVisibility(sId, true);
        ForIdSetVisibility("SG_Clues_Div", true);
    }
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

function SG_MakeSpecialCluesAnswerStringAndVisibility()
{
    let sSpecialAnswerRow0 = '';
    let bCorrectInGrid0 = false;
    if ( TC_ForIndexIsClueTypeSpecial(0) )
    {
        if ( g_SG_aAnswersCorrectInGrid[0] ) bCorrectInGrid0 = true;
        if ( bCorrectInGrid0 ) sSpecialAnswerRow0 += SG_Position_Answer(0);
        if ( bCorrectInGrid0 ) sSpecialAnswerRow0 += g_CAB_aAnswers[0];
        sSpecialAnswerRow0 += g_sSpecialClueBefore;
        if ( !bCorrectInGrid0 ) sSpecialAnswerRow0 += SG_Size_Answer(0);
    }
    let sSpecialAnswerRow1 = '';
    let bCorrectInGrid1 = false;
    if ( TC_ForIndexIsClueTypeSpecial(1) )
    {
        if ( g_SG_aAnswersCorrectInGrid[1] ) bCorrectInGrid1 = true;
        sSpecialAnswerRow1 += g_sSpecialClueMiddle;
        if ( bCorrectInGrid1 ) sSpecialAnswerRow1 += g_CAB_aAnswers[1];
        if ( !bCorrectInGrid1 ) sSpecialAnswerRow1 += SG_Size_Answer(1);
        sSpecialAnswerRow1 += g_sSpecialClueEnd;
        if ( bCorrectInGrid1 ) sSpecialAnswerRow1 += SG_Position_Answer(1);
    }
    let sClueAnswer = '';
    if ( sSpecialAnswerRow0 != '' )
        sClueAnswer += sSpecialAnswerRow0; 
    if ( sSpecialAnswerRow1 != '' )        
        sClueAnswer += sSpecialAnswerRow1; 
    let elem = document.getElementById("SG_SpecialClue_AnswerItselfText_Div")
    elem.innerHTML = sClueAnswer;
    if ( bCorrectInGrid0 || bCorrectInGrid1 )
    {
        let elemSpecial = document.getElementById("SG_SpecialClue_AnswerItselfText_Div")
        elemSpecial.innerHTML = sClueAnswer;
        ForIdSetVisibility("SG_SpecialClue_AnswerItselfText_Div", true);
        if ( g_CA_bShowSpecial )
        {
            ForIdSetVisibility("SG_SpecialClue_Outer_Div", true);
            ForIdSetVisibility("SG_SpecialClue_ClueItselfText_Div", true);
        }
        ForIdSetVisibility("SG_Clues_Div", true);
    }
    return sClueAnswer;
}

function SG_SetAnswersCorrectInGrid()
{
    let bSomethingChanged = false;
    if ( !g_SG_bAnswersCorrectInGridSet ) bSomethingChanged = true; 
    for ( let iAcross = 0; iAcross < g_GR_aAcrossAnswers.length; iAcross++)
    {
        let iClueNumber = g_GR_aAcrossAnswersClueNumber[iAcross]
        let bInitiallyCorrect = g_SG_aAnswersCorrectInGrid[iClueNumber];
        let sAnswer = g_GR_aAcrossAnswers[iAcross];
        let iLength = sAnswer.length;
        let bCorrect = true;
        let iRow = g_GR_aAcrossAnswersStartRow[iAcross];
        let iLetterStart = g_GR_aAcrossAnswersStartLetter[iAcross];
        for ( let iL = 0; iL < iLength; iL++ )
        {
            let cAnswer = GRB_ForRowLetter_GetAnswer(iRow, iLetterStart + iL);
            let cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetterStart + iL);
            if ( cAnswer != cAnswerPlayer ) bCorrect = false;
        }
        g_SG_aAnswersCorrectInGrid[iClueNumber] = bCorrect;
        if ( bCorrect != bInitiallyCorrect ) bSomethingChanged = true;
    }
    for ( let iDown = 0; iDown < g_GR_aDownAnswers.length; iDown++)
    {
        let iClueNumber = g_GR_aDownAnswersClueNumber[iDown];
        let bInitiallyCorrect = g_SG_aAnswersCorrectInGrid[iClueNumber];

        let sAnswer = g_GR_aDownAnswers[iDown];
        let iLength = sAnswer.length;
        let bCorrect = true;
        let iLetter = g_GR_aDownAnswersStartLetter[iDown];
        let iRowStart = g_GR_aDownAnswersStartRow[iDown];
        for ( let iR = 0; iR < iLength; iR++ )
        {
            let cAnswer = GRB_ForRowLetter_GetAnswer(iRowStart + iR, iLetter);
            let cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iRowStart + iR, iLetter);
            if ( cAnswer != cAnswerPlayer ) bCorrect = false;
      
        }
        g_SG_aAnswersCorrectInGrid[iClueNumber] = bCorrect;
        if ( bCorrect != bInitiallyCorrect ) bSomethingChanged = true;
    }
    g_SG_bAnswersCorrectInGridSet = true;
    return bSomethingChanged;
}

