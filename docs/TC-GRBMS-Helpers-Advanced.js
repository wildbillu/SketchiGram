// TC-GRBMS-Helpers-Advanced.js

function GRBMS_SetAllButtons_Phantom()
{
    for ( var iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( var iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            GRBMS_ForRowLetter_SetButton_Phantom(iRow, iLetter, g_TC_cCodeMeaning_Inactive)
        }
    }
}

function GRBMS_ForRowLetter_SetButton_Phantom(iRow, iLetter, cCodeForActivity)
{
    var sId = '';
    var sId = GRBMS_Phantom_MakeId(iRow, iLetter)
    var elem = document.getElementById(sId);
    elem.style.backgroundImage = GRB_ButtonBackgroundImage(g_TC_cCharMeaningNotSet, g_TC_cCodeMeaning_Normal, g_TC_cCharacterDenotingNoNumberSquare, g_TC_cCodeMeaning_Inactive);
    elem.style.left = MakePixelString(iLetter*g_GRBMS_Square_iSize)
    elem.style.top = MakePixelString(iRow*g_GRBMS_Square_iSize)
}

function GRBMS_MakeGrid_Phantom()
{
    elem = document.getElementById("Div_Grid_Phantom");
    var iRow = 0;
    var sButtons = ''
    for ( var iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( var iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            sButtons += TC_GRBMS_MakeButton_Phantom(iRow, iLetter, g_TC_cCodeMeaning_Normal);
        }
    }
    elem.innerHTML = sButtons;
}

function GRBMS_Phantom_MakeHTMLId(iRow, iLetter)
{
    var sHTMLId = 'Id="' + GRBMS_Phantom_MakeId(iRow, iLetter) + '" ';
    return sHTMLId
}

function GRBMS_Phantom_MakeId(iRow, iLetter)
{
    let sId = 'Phantom_' + iRow + '_' + iLetter;
    return sId;
}

function TC_GRBMS_MakeButton_Phantom(iRow, iLetter)
{ // will determine itself whether blacksquare or has number
    var sInner = '';
    sInner += '<BUTTON ';
    sInner += GRBMS_Phantom_MakeHTMLId(iRow, iLetter);
    sInner += ' class="' + g_GRBMS_Square_sClass + '" '; 
    sInner += '>'
    sInner += '</BUTTON>';
    return sInner;
}

function GRBMS_SwitchAnswers(A_iRow, A_iLetter, B_iRow, B_iLetter)
{
    var A_cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(A_iRow, A_iLetter);
    var B_cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(B_iRow, B_iLetter);
    // switch
    GRB_ForRowLetter_SetAnswerPlayer(A_cAnswerPlayer, B_iRow, B_iLetter);
    GRB_ForRowLetter_SetAnswerPlayer(B_cAnswerPlayer, A_iRow, A_iLetter);
    // since we moved letters we no longer if the status is correct
    if ( g_bSettings_CAGR_Answers_ShowCorrectLetters )
    {
        GRBMS_ForRowLetterShowCheckSquare(A_iRow, A_iLetter, 'Check', false)
        GRBMS_ForRowLetterShowCheckSquare(B_iRow, B_iLetter, 'Check', false)
    }
    else
    {
        GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Normal, B_iRow, B_iLetter);
        GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Normal, A_iRow, A_iLetter);
    }
    GRBMS_ForRowLetter_SetButton(A_iRow, A_iLetter, g_TC_cCodeMeaning_Inactive);
    GRBMS_ForRowLetter_SetButton(B_iRow, B_iLetter, g_TC_cCodeMeaning_Inactive);
// need to make sure cannot change anything
}

function GRBMS_MakeGrid()
{
    elem = document.getElementById("Div_Grid");
    var iRow = 0;
    var sButtons = ''
    for ( var iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( var iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            sButtons += TC_GRBMS_MakeButton(iRow, iLetter, g_TC_cCodeMeaning_Normal);
        }
    }
    elem.innerHTML = sButtons;
}

function GRBMS_SetGridButtonsGridAndPhantomGridPosition()
{
    GRBMS_SetAllButtons();
    elemGrid = document.getElementById("Div_Grid");
    let iWidth = g_iGridWidth * g_GRBMS_Square_iSize;
    var iHeight = g_iGridHeight * g_GRBMS_Square_iSize;
    elemGrid.style.width = MakePixelString(iWidth);
    elemGrid.style.height = MakePixelString(iHeight);
    let iTop = g_GRBMS_TopMatter_iHeight + g_GRBMS_PuzzleTitle_iHeight + g_TC_Padding_Inter_Vertical_iSize;
    elemGrid.style.top = MakePixelString(iTop);
    elemGrid.style.left = MakePixelString(g_TC_Padding_Left_iSize);
// now the phantom grid
    let elemGrid_Phantom = document.getElementById('Div_Grid_Phantom');
//  let rectGrid = elemGrid.getBoundingClientRect();
    let rectGrid = GetBoundingClientRectAbsolute(elemGrid);
    elemGrid_Phantom.style.top = MakePixelString(rectGrid.top);
    elemGrid_Phantom.style.left = MakePixelString(rectGrid.left);
}

function GRBMS_FindFirstSquareWithPlayerAnswer(sUpper, bRejectSquaresThatMake2Changes, cLetterOfSquareBeingFixed)
{
    let aPossibles = [];
    for ( var iRow = 0; iRow < g_iGridHeight; iRow++ )
    {
        for ( var iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            if ( GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter) )
            {
                let cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
                let cStatusPlayer = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
                let bCorrectOrCorrected = false;
                if ( cStatusPlayer == g_TC_cCodeMeaning_Correct )
                    bCorrectOrCorrected = true;
                if ( cStatusPlayer == g_TC_cCodeMeaning_Corrected )
                    bCorrectOrCorrected = true;
                if ( !bCorrectOrCorrected && ( cAnswerPlayer == sUpper ) ) 
                {
                    aPossibles.push(GRBMS_MakeId(iRow, iLetter));
                }
            }
        }
    }
    let iPossibles = aPossibles.length;
    if ( iPossibles == 0 )
        return '';
    if ( iPossibles == 1 || !bRejectSquaresThatMake2Changes )
        return aPossibles[0];
    for ( let iC = 0; iC < iPossibles; iC++ )
    {
        let iRow    = GRBMS_RowFromId(aPossibles[iC])
        let iLetter = GRBMS_LetterFromId(aPossibles[iC]);
        let cThisOne = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
        if ( cThisOne != cLetterOfSquareBeingFixed )
            return aPossibles[iC];
    }
    return aPossibles[0];
}

function GRBMS_SetAllowedGridLetters()
{
    var sAllowedLetters = '';
    var sLocalGridSolution = g_aGridAnswers.join('');
    for ( var i = 0; i < sLocalGridSolution.length; i++ )
    {
        var cLetter = sLocalGridSolution.charAt(i);
        if ( cLetter != g_TC_cCharacterDenotingBlackSquare && !sAllowedLetters.includes(cLetter))
            sAllowedLetters += cLetter;
    }
    g_GRBMS_sAllowedGridLetters = sAllowedLetters;
}

function GRBMS_SetAllButtons()
{
    for ( var iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( var iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            GRBMS_ForRowLetter_SetButton(iRow, iLetter, g_TC_cCodeMeaning_Inactive)
        }
    }
}

function GRBMS_ForRowLetter_SetButton(iRow, iLetter, cCodeForActivity)
{
    var cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    var cStatusPlayer = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    var cNumbering    = g_sGridNumbering.charAt(iRow*g_iGridWidth+iLetter);
    var sId = '';
    sStatusImage = GRB_ButtonBackgroundImage(cAnswerPlayer, cStatusPlayer, cNumbering, cCodeForActivity)
    var sId = GRBMS_MakeId(iRow, iLetter)
    var elem = document.getElementById(sId);
    elem.style.backgroundImage = sStatusImage;
    elem.style.left = MakePixelString(iLetter*g_GRBMS_Square_iSize)
    elem.style.top = MakePixelString(iRow*g_GRBMS_Square_iSize)
}

function TC_GRBMS_MakeButton(iRow, iLetter)
{ // will determine itself whether blacksquare or has number
    var sHTMLId = GRBMS_MakeHTMLId(iRow, iLetter);
    var sInner = '';
    var sFunctionsToCall = '';
    sFunctionsToCall += TC_GRBMS_MouseFunctions(iRow, iLetter);
    sFunctionsToCall += TC_GRBMS_TouchFunctions(iRow, iLetter);
//    sFunctionsToCall += ' onMouseDown="return GRB_onmousedown(' + iRow + ',' + iLetter + ');"'
    sFunctionsToCall += ' onkeypress="return GRBMS_onkeypress(event);"';
    sFunctionsToCall += ' onkeyup="return GRBMS_onkeyup(event.key,' + iRow + ',' + iLetter + ');"';
    sFunctionsToCall += ' onfocus="GRBMS_onfocus(this);"';
    sInner += '<BUTTON ';
    sInner += sHTMLId;
    sInner += ' class="' + g_GRBMS_Square_sClass + '" '; 
    sInner += sFunctionsToCall;
    sInner += '>'
    sInner += '</BUTTON>';
    return sInner;
}

function GRBMS_ForRowWithFocus_SetAnswerBoxStyles()
{
    var iRowActive = -1;
    if ( g_CAB_Focus_sId != '' )
    {
        iRowActive = CAB_RowFromId(g_CAB_Focus_sId);
    }
    if ( iRowActive == 0 || iRowActive == 1 )
        document.getElementById('GRBMS_Div_CAB_DualClue').className = 'GRBMS_Div_CAB_DualClue CAB_Color_Active';
    else
        document.getElementById('GRBMS_Div_CAB_DualClue').className = 'GRBMS_Div_CAB_DualClue CAB_Color_InActive';
    for ( iR = 2; iR < g_iClues; iR++)
    {
        var s = CAB_MakeIdForRow(iR)
        var elem = document.getElementById(s)
        if ( iR == iRowActive )
            elem.className = 'GRBMS_Div_CAB_Clue_Single_Row_Active';
        else
            elem.className = 'GRBMS_Div_CAB_Clue_Single_Row';
    }
}

function GRBMS_ForRowLetterShowCheckSquare(iRow, iLetter, sToDo, bIncorrectOverride)
{
    if ( !GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter) )
        return; // actually we should never get here
    var bSetLetter = GRB_ForRowLetter_IsPlayerAnswerSet(iRow, iLetter)
    var cAnswer = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
    var cAnswerPlayerInitial = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    if ( sToDo == 'Check' )
    { // if the character is not set and it is Check we do nothing
        if ( !bSetLetter )
            return;
            if ( cAnswer == cAnswerPlayerInitial)
            GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Correct, iRow, iLetter);
        else
        {
            if ( !bIncorrectOverride )
                GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Incorrect, iRow, iLetter);
            else
                GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_IncorrectWithOverride, iRow, iLetter);
        }
    }
    else if ( sToDo == 'Show' )
    { // whatever happens the character is set to the correct letter
        GRB_ForRowLetter_UpdateAnswersPlayer(cAnswer, iRow, iLetter);
        if ( cAnswer == cAnswerPlayerInitial )
            GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Correct, iRow, iLetter);
        else
            GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Corrected, iRow, iLetter);
    }
}

function GRBMS_ForLetter_SetButtons(iLetter, cCode)
{
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++ )
    {
        GRBMS_ForRowLetter_SetButton(iRow, iLetter, cCode);
    }
}

function GRBMS_ForRow_SetButtons(iRow, cCode)
{
    for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
    {
        GRBMS_ForRowLetter_SetButton(iRow, iLetter, cCode);
    }
}


