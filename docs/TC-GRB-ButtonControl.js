// TC-GRB-ButtonControl.js

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

function GRB_ButtonBackgroundImage(cLetter, cStatus, iGridNumber, cCodeForActivity, cDualClueCode)
{
    var sStatusImage = '';
    if ( cLetter == g_TC_cCharacterDenotingBlackSquare )
    {
        sStatusImage  = MakeURLWrappedString(TC_GetBlackSquareImagePathAndName(), false);
        return sStatusImage;
    }
    if ( cCodeForActivity != g_TC_cCodeMeaning_HasFocusBeingMoved )
        sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, TC_GetButtonFrameImagePathAndName());
    sStatusImage = GRB_AddWrappedUrlToString(sStatusImage,TC_GetStatusOverlayImagePathAndName(cStatus));
    if ( !g_bSuppressGridNumbers && iGridNumber != 0 && cCodeForActivity != g_TC_cCodeMeaning_HasFocusBeingMoved )
    {
        var sGridNumber = iGridNumber.toString();
        if ( sGridNumber.length == 1 )
            sGridNumber = '0' + sGridNumber;
        sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, TC_GetGridNumberImagePathAndName(sGridNumber));
        }
// now we do the dual clue overlay if needed
    if ( g_SG_AM_bShowDualClueSquares )
    {
        let sRound = '';
        if ( cDualClueCode == g_TC_cCodeMeaning_DualClue_Single )
        {
            sRound = g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame_Rounded_ForNoNumberSquares
            if ( !g_bSuppressGridNumbers && iGridNumber != 0 && cCodeForActivity != g_TC_cCodeMeaning_HasFocusBeingMoved )
                sRound = g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame_Rounded_ForNumberSquares
        }
        else if ( cDualClueCode == g_TC_cCodeMeaning_DualClue_Double )
        {
            sRound = g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame_DoubleRounded_ForNoNumberSquares;
            if ( !g_bSuppressGridNumbers && iGridNumber != 0 && cCodeForActivity != g_TC_cCodeMeaning_HasFocusBeingMoved )
                sRound = g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame_DoubleRounded_ForNumberSquares;
        }
        if ( sRound != '' ) sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, sRound);
    }
    if ( g_GR_Squares_bButtons )
    {
        let cColor = g_cColorCodeForUnknownLetter;
        if ( cStatus == g_TC_cCodeMeaning_Corrected || TC_CorrectOrGolden(cStatus) )
            cColor = g_cColorCodeForCorrectLetter;
        if ( CharValidEntry(cLetter) )
        {
            sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, TC_GetLetterImagePathAndName(cLetter, cColor));
        }
    }
    if ( cStatus == g_TC_cCodeMeaning_Golden )
    {
        sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, g_sImagePath_StatusIndicators + g_sStatusButtonName_GoldenSquare);
    }
    else
    {
        if ( cCodeForActivity == g_TC_cCodeMeaning_HasFocusBeingMoved )
            sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, g_sImagePath_StatusIndicators + g_sStatusButtonName_BeingMoved);
        sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, TC_GetStatusImagePathAndName(cCodeForActivity));
    }
    return sStatusImage;
}

function GRB_ForRowLetter_SetButton(iRow, iLetter, cCodeForActivity)
{
    let cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    let cStatusPlayer = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    let iGridNumber    = g_aGridNumbers[iRow*g_iGridWidth+iLetter];
    var sId = '';
    let cDualClueCode = GRB_ForRowLetter_GetDualClueCode(iRow, iLetter);
    sStatusImage = GRB_ButtonBackgroundImage(cAnswerPlayer, cStatusPlayer, iGridNumber, cCodeForActivity, cDualClueCode)
    sId = GRB_MakeId(iRow, iLetter);
    var elemButton = document.getElementById(sId);
    if ( elemButton )
        elemButton.style.backgroundImage = sStatusImage;
//    else
//        alert('Error GRB_ForRowLetter_SetButton:' + iRow + iLetter + cCodeForActivity)
}

