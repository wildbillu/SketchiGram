// TC-GRBMS-Helpers-Advanced.js
var g_GRBMS_elemReveal = null;

function TC_GRBMS_Reveal_DoIt()
{
    alert('doit')
}
function TC_GRBMS_Reveal_Cancel()
{
    alert('cancel')
}

function TC_GRBMS_RevealSquare()
{
// we only get here if want to allow it
    g_GRBMS_elemReveal = document.createElement('div');
    let sInner = '<TABLE Id="GRBMS_Reveal_Div" cellspacing=0 cellpadding=0 class="SA_ClearDiv"><TR>';
    sInner +=    ' <TD Id="GRBMS_Reveal_Message" class="SA_ClearDiv_Message" onclick="TC_GRBMS_Reveal_Cancel();">Reveal?</TD>';
    sInner +=    ' <TD Id="GRBMS_Reveal_DoIt" class="SA_ClearDiv_DoIt" onclick="TC_GRBMS_Reveal_DoIt();">Yes</TD>';
    sInner +=    ' <TD Id="GRBMS_Reveal_Cancel" class="SA_ClearDiv_Cancel" onclick="TC_GRBMS_Reveal_Cancel();">Cancel</TD>';
    sInner +=    '</TABLE>';
    g_GRBMS_elemReveal.innerHTML = sInner;
    g_GRBMS_elemReveal.style.visibility = "hidden";
    document.body.appendChild(g_GRBMS_elemReveal);
// position it next to the element
    let elemGRBMS = document.getElementById(g_GRBMS_Focus_sId);
    let rectGRBMS = GetBoundingClientRectAbsolute(elemGRBMS);
    let elem = document.getElementById("GRBMS_Reveal_Div");
    elem.style.top = MakePixelString(rectGRBMS.top);
    elem.style.left = MakePixelString(rectGRBMS.right);
    elem.style.height = MakePixelString(rectGRBMS.height);
    g_GRBMS_elemReveal.style.visibility = "visible";
}

function TC_GRBMS_MakeFixSquarePopup(bRightClick)
{
    if ( g_GRBMS_Focus_sId == '' )
        return;
// if this is right click here we decide if the right click happen while the mouse is over the Entry
    if ( bRightClick )
    {
        let elemSquare = document.getElementById(g_GRBMS_Focus_sId);
        let rectSquare = GetBoundingClientRectAbsolute(elemSquare);
        if ( !IsPointWithinRect(rectSquare, g_MouseClientPosition_x, g_MouseClientPosition_y) )
            return;
    }
    TC_GRBMS_RevealSquare();
}

function GRBMS_ShowGrid()
{
    GRBMS_LoseCurrentFocus();
    for ( let iR = 0; iR < g_iGridHeight; iR++)
    {
        for ( let iL = 0; iL < g_iGridWidth; iL++ )
        {
            let cAnswer = GRB_ForRowLetter_GetAnswer(iR, iL);
            let cAnswerPlayerInitial = GRB_ForRowLetter_GetAnswerPlayer(iR, iL);
            if ( cAnswer != cAnswerPlayerInitial)
            {
                GRB_ForRowLetter_UpdateAnswersPlayer(cAnswer, iR, iL);
                GRB_ForRowLetter_SetStatusPlayer(TC_CodeCorrected(), iR, iL)
                GRBMS_ForRowLetter_SetButton(iR, iL, g_cCode_Inactive);
            }
        }
    }
    Sync_GridChange();
    return true;
}

function GRBMS_ForRowLetterShowSquare(iRow, iLetter, sToDo, bIncorrectOverride)
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
            GRB_ForRowLetter_SetStatusPlayer(g_cCode_Correct, iRow, iLetter);
        else
        {
            if ( !bIncorrectOverride )
                GRB_ForRowLetter_SetStatusPlayer(g_cCode_Incorrect, iRow, iLetter);
            else
                GRB_ForRowLetter_SetStatusPlayer(g_cCode_IncorrectWithOverride, iRow, iLetter);
        }
    }
    else if ( sToDo == 'Show' )
    { // whatever happens the character is set to the correct letter
        GRB_ForRowLetter_UpdateAnswersPlayer(cAnswer, iRow, iLetter);
        if ( cAnswer == cAnswerPlayerInitial )
            GRB_ForRowLetter_SetStatusPlayer(g_cCode_Correct, iRow, iLetter);
        else
            GRB_ForRowLetter_SetStatusPlayer(g_cCode_Corrected, iRow, iLetter);
    }
}

function GRB_ForRowLetter_IsSquareGoldenOrBlack(iRow, iLetter)
{
    if ( GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
        return true;
    if ( GRB_ForRowLetter_IsGoldenSquare(iRow, iLetter) )
        return true;
    return false;
}

function GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter)
{
    if ( GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
        return false;
    if ( GRB_ForRowLetter_IsGoldenSquare(iRow, iLetter) )
        return false;
    if ( GRB_ForRowLetter_IsPlayerAnswerCorrect(iRow, iLetter) )
        return false;
    if ( GRB_ForRowLetter_IsPlayerAnswerCorrected(iRow, iLetter) )
        return false;
    return true;
}

function GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter)
{
    var cAnswerPlayer = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
    if ( TC_IsBlackSquare(cAnswerPlayer) )
        return true;
    return false;
}

function GRB_ForRowLetter_IsGoldenSquare(iRow, iLetter)
{
    if ( GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter) == g_cCode_Golden )
        return true;
    return false;
}

function GRB_ForRowLetter_IsPlayerAnswerCorrected(iRow, iLetter)
{
    let cStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( cStatus == g_cCode_Corrected )
        return true;
    return false;
}

function GRB_ForRowLetter_IsPlayerAnswerCorrect(iRow, iLetter)
{
    if ( GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter) == g_cCode_Correct )
        return true;
    return false;
}

function TC_AddWrappedUrlToString(sStarting, sNew, bSingle)
{
    let sFinal = sStarting;
    if ( sStarting != '' )
        sFinal += ', '
    sFinal += MakeURLWrappedString(sNew, bSingle);
    return sFinal;
}

function GRB_AddWrappedUrlToString(sStarting, sNew)
{
    let sFinal = sStarting;
    if ( sStarting != '' )
        sFinal += ', '
    sFinal += MakeURLWrappedString(sNew, false);
    return sFinal;
}

function GRBMS_ButtonBackgroundImage(cLetter, cStatus, iGridNumber, cCodeForActivity, cSpecialClueCode)
{
    let sStatusImage = '';
    if ( TC_IsBlackSquare(cLetter) )
        return sStatusImage;
    if ( cCodeForActivity != g_cCode_HasFocusBeingMoved )
        sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, TC_GetButtonFrameImagePathAndName());
    sStatusImage = GRB_AddWrappedUrlToString(sStatusImage,TC_GetStatusOverlayImagePathAndName(cStatus));
    if ( !g_bSuppressGridNumbers && iGridNumber != 0 && cCodeForActivity != g_cCode_HasFocusBeingMoved )
    {
        let sGridNumber = iGridNumber.toString();
        if ( sGridNumber.length == 1 )
            sGridNumber = '0' + sGridNumber;
        sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, TC_GetGridNumberImagePathAndName(sGridNumber));
        }
// now we do the special clue overlay if needed
    if ( g_SG_AM_bShowSpecialClueCircles )
    {
        let sRound = '';
        if ( cSpecialClueCode == g_cCode_AnswerType_Single )
        {
            sRound = g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame_Rounded_ForNoNumberSquares
            if ( !g_bSuppressGridNumbers && iGridNumber != 0 && cCodeForActivity != g_cCode_HasFocusBeingMoved )
                sRound = g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame_Rounded_ForNumberSquares
        }
        else if ( cSpecialClueCode == g_cCode_AnswerType_Double )
        {
            sRound = g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame_DoubleRounded_ForNoNumberSquares;
            if ( !g_bSuppressGridNumbers && iGridNumber != 0 && cCodeForActivity != g_cCode_HasFocusBeingMoved )
                sRound = g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame_DoubleRounded_ForNumberSquares;
        }
        if ( sRound != '' ) sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, sRound);
    }
    if ( g_bPuzzleSolved  && ( cSpecialClueCode == g_cCode_AnswerType_Double || cSpecialClueCode == g_cCode_AnswerType_Single ) )
    {
        sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, g_sImagePath_StatusIndicators + g_sStatusButtonName_SolvedSpecial);
    }
    else if ( cStatus == g_cCode_Golden && !g_bPuzzleSolved )
    {
        sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, g_sImagePath_StatusIndicators + g_sStatusButtonName_GoldenSquare);
    }
    else
    {
        if ( cCodeForActivity == g_cCode_HasFocusBeingMoved )
            sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, g_sImagePath_StatusIndicators + g_sStatusButtonName_BeingMoved);
        sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, TC_GetStatusImagePathAndName(cCodeForActivity));
    }
    return sStatusImage;
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
        GRB_ForRowLetter_SetStatusPlayer(g_cCode_Normal, B_iRow, B_iLetter);
        GRB_ForRowLetter_SetStatusPlayer(g_cCode_Normal, A_iRow, A_iLetter);
    }
    GRBMS_ForRowLetter_SetButton(A_iRow, A_iLetter, g_cCode_Inactive);
    GRBMS_ForRowLetter_SetButton(B_iRow, B_iLetter, g_cCode_Inactive);
    KB_AGC_Changed(A_iRow, A_iLetter, B_iRow, B_iLetter);
    Sync_GridChange();
    SyncTo_OthersLoseFocus('NoOne');
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
                if ( cStatusPlayer == g_cCode_Correct )
                    bCorrectOrCorrected = true;
                if ( cStatusPlayer == g_cCode_Corrected )
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
        if ( !TC_IsBlackSquare(cLetter) && !sAllowedLetters.includes(cLetter))
            sAllowedLetters += cLetter;
    }
    g_GRBMS_sAllowedGridLetters = sAllowedLetters;
    let iLength = g_GRBMS_sAllowedGridLetters.length;
    for ( let i = 0; i < iLength; i++ )
        g_GRBMS_sAllowedGridLetters_Selectable += 'T';
}

function GRBMS_SetAllButtons()
{
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            GRBMS_ForRowLetter_SetButton(iRow, iLetter, g_cCode_Inactive)
        }
    }
}

function GRBMS_MakeGrid()
{
    let sButtons = ''
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            sButtons += TC_GRBMS_MakeButton(iRow, iLetter, g_cCode_Normal);
        }
    }
    let elem = document.getElementById("Div_Grid");
    elem.innerHTML = sButtons;
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
    sFunctionsToCall += ' onclick="GRBMS_onfocus(this);"'
    sInner += '<DIV tabindex="0" ';
    sInner += sHTMLId;
    sInner += ' class="' + g_GRBMS_Square_sClass + '" '; 
    sInner += sFunctionsToCall;
    sInner += '></DIV>'
    return sInner;
}

function GRBMS_ForRowLetter_SetButton(iRow, iLetter, cCodeForActivity)
{
    let sId = GRBMS_MakeId(iRow, iLetter);
    let elem = document.getElementById(sId);
   let cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
   let cStatusPlayer = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
   let cSpecialClueCode = GRB_ForRowLetter_GetSpecialClueCode(iRow, iLetter);
    elem.style.left = MakePixelString(iLetter*g_GRBMS_Square_iSize)
    elem.style.top = MakePixelString(iRow*g_GRBMS_Square_iSize)
    if ( cAnswerPlayer == g_cCode_BlackSquare )
    {
        elem.style.backgroundColor = 'black'
        return;
    }
    if ( g_bSuppressNonGolden && cStatusPlayer != 'G' && cAnswerPlayer != g_cCode_BlackSquare )
        cAnswerPlayer = ' ';
    let iGridNumber = g_aGridNumbers[iRow*g_iGridWidth+iLetter];
    let sStatusImage = '';
    sStatusImage = GRBMS_ButtonBackgroundImage(cAnswerPlayer, cStatusPlayer, iGridNumber, cCodeForActivity, cSpecialClueCode);
    elem.style.backgroundImage = sStatusImage;
//    
    elem.style.left = MakePixelString(iLetter*g_GRBMS_Square_iSize)
    elem.style.top = MakePixelString(iRow*g_GRBMS_Square_iSize)
    if ( CharValidEntry(cAnswerPlayer) )
        elem.innerHTML = cAnswerPlayer;    
    let cColor = g_Color_sLetterUnknown;
    if ( cStatusPlayer == g_cCode_Corrected || TC_CorrectOrGolden(cStatusPlayer) )
        cColor = g_Color_sLetterCorrect;
    elem.style.color = cColor;
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
            GRB_ForRowLetter_SetStatusPlayer(g_cCode_Correct, iRow, iLetter);
        else
        {
            if ( !bIncorrectOverride )
                GRB_ForRowLetter_SetStatusPlayer(g_cCode_Incorrect, iRow, iLetter);
            else
                GRB_ForRowLetter_SetStatusPlayer(g_cCode_IncorrectWithOverride, iRow, iLetter);
        }
    }
    else if ( sToDo == 'Show' )
    { // whatever happens the character is set to the correct letter
        GRB_ForRowLetter_UpdateAnswersPlayer(cAnswer, iRow, iLetter);
        if ( cAnswer == cAnswerPlayerInitial )
            GRB_ForRowLetter_SetStatusPlayer(g_cCode_Correct, iRow, iLetter);
        else
            GRB_ForRowLetter_SetStatusPlayer(g_cCode_Corrected, iRow, iLetter);
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


