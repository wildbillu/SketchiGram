// TC-GRB-ButtonControl.js
function GRB_AddWrappedUrlToString(sStarting, sNew)
{
    let sFinal = sStarting;
    if ( sStarting != '' )
        sFinal += ', '
    sFinal += MakeURLWrappedString(sNew, false);
    return sFinal;
}

function GRB_ButtonBackgroundImage(cLetter, cStatus, iGridNumber, cCodeForActivity, bIsDualClueSquare)
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
    if ( iGridNumber != 0 && cCodeForActivity != g_TC_cCodeMeaning_HasFocusBeingMoved )
    {
        var sGridNumber = iGridNumber.toString();
        if ( sGridNumber.length == 1 )
            sGridNumber = '0' + sGridNumber;
        sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, TC_GetGridNumberImagePathAndName(sGridNumber));
        }
// now we do the dual clue overlay if needed
    if ( g_SG_AM_bShowDualClueSquares && bIsDualClueSquare )
    {
        let sRound = g_sImagePath_GridNumbersAndFrames + '/' + g_sStatusButtonName_Frame_Rounded_ForNoNumberSquares
        if ( iGridNumber != 0 && cCodeForActivity != g_TC_cCodeMeaning_HasFocusBeingMoved )
            sRound = g_sImagePath_GridNumbersAndFrames + '/' + g_sStatusButtonName_Frame_Rounded_ForNumberSquares
        sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, sRound);

    }

    let cColor = g_sColorCodeForUnknownLetter;
    if ( cStatus == g_TC_cCodeMeaning_Corrected || TC_CorrectOrGolden(cStatus) )
        cColor =g_sColorCodeForCorrectLetter;
    if ( CharValidEntry(cLetter) )
    {
        sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, TC_GetLetterImagePathAndName(cLetter, cColor));
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
    let bIsDualClueSquare = GRB_ForRowLetter_IsDualClueSquare(iRow, iLetter);
    sStatusImage = GRB_ButtonBackgroundImage(cAnswerPlayer, cStatusPlayer, iGridNumber, cCodeForActivity, bIsDualClueSquare)
    sId = GRB_MakeId(iRow, iLetter);
    var elemButton = document.getElementById(sId);
    if ( elemButton )
        elemButton.style.backgroundImage = sStatusImage;
//    else
//        alert('Error GRB_ForRowLetter_SetButton:' + iRow + iLetter + cCodeForActivity)
}

