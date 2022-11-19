// TC-GRB-ButtonControl.js
function GRB_AddWrappedUrlToString(sStarting, sNew)
{
    let sFinal = sStarting;
    if ( sStarting != '' )
        sFinal += ', '
    sFinal += MakeURLWrappedString(sNew, false);
    return sFinal;
}

function GRB_ButtonBackgroundImage(cLetter, cStatus, cNumber, cSelection)
{
    var sStatusImage = '';
    if ( cLetter == g_TC_cCharacterDenotingBlackSquare )
    {
        sStatusImage  = MakeURLWrappedString(TC_GetBlackSquareImagePathAndName(), false);
        return sStatusImage;
    }
    sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, TC_GetButtonFrameImagePathAndName());
    sStatusImage = GRB_AddWrappedUrlToString(sStatusImage,TC_GetStatusOverlayImagePathAndName(cStatus));
    if ( cNumber != g_TC_cCharacterDenotingNoNumberSquare )
    {
        var iNumber = parseInt(cNumber) + 1;
        var sNumber = iNumber.toString();
        if ( sNumber.length == 1 )
            sNumber = '0' + sNumber;
            sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, TC_GetGridNumberImagePathAndName(sNumber));
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
        sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, TC_GetStatusImagePathAndName(cSelection));
    return sStatusImage;
}

function GRB_ForRowLetter_SetButton(iRow, iLetter, cCodeForActivity)
{
    var cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    var cStatusPlayer = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    var cNumbering    = g_sGridNumbering.charAt(iRow*g_iGridWidth+iLetter);
    var sId = '';
    sStatusImage = GRB_ButtonBackgroundImage(cAnswerPlayer, cStatusPlayer, cNumbering, cCodeForActivity)
    sId = GRB_MakeId(iRow, iLetter);
    var elemButton = document.getElementById(sId);
    if ( elemButton )
        elemButton.style.backgroundImage = sStatusImage;
//    else
//        alert('Error GRB_ForRowLetter_SetButton:' + iRow + iLetter + cCodeForActivity)
}

