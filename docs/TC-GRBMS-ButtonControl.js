// TC-GRBMS-ButtonControl.js

function TC_GRBMS_SetPickedForMove(iPickedRow, iPickedLetter)
{
    let cLetterPicked = GRB_ForRowLetter_GetAnswerPlayer(iPickedRow, iPickedLetter);
    let cStatusPlayer = g_cCode_Normal;
    sStatusImage = GRBMS_ButtonBackgroundImage(cLetterPicked, cStatusPlayer, 0, g_cCode_HasFocus, g_cCode_ClueType_Normal);
    let sId = GRBMS_MakeId(iPickedRow, iPickedLetter)
    let elem = document.getElementById(sId);
    elem.style.backgroundImage = sStatusImage;
    g_GRBMS_MM_Picked_bAlteredForMove = true; // not arrow but might be no circles
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
    if ( TC_IsGolden(cStatusPlayer) )
        cColor = g_Color_sLetterCorrect;
    if ( g_bShowCorrectLetters || g_bPuzzleSolved )
    {
        if ( TC_IsCorrectOrCorrected(cStatusPlayer) )
            cColor = g_Color_sLetterCorrect;
    }
    else 
    {
        if ( cStatusPlayer == g_cCode_Corrected )
            cColor = g_Color_sLetterCorrect;
    }
    elem.style.color = cColor;
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


