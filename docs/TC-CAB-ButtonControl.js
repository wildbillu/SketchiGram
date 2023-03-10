// TC-CAB-ButtonControl.js

function CAB_ForRowLetter_SetButton(iRow, iLetter, cCodeForActivity)
{
    var cAnswerPlayer = CAB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    var cStatusPlayer = CAB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    let cDualClueCode = CAB_ForRowLetter_GetDualClueCode(iRow, iLetter);
    var sId = '';
    sStatusImage = CAB_ButtonBackgroundImage(cAnswerPlayer, cStatusPlayer, cCodeForActivity, cDualClueCode)
    sId = CAB_MakeId(iRow, iLetter)
    document.getElementById(sId).style.backgroundImage = sStatusImage;
}

function CAB_ButtonBackgroundImage(cLetter, cStatus, cSelection, cDualClueCode)
{
    let sStatusImage = '';
    sStatusImage = TC_AddWrappedUrlToString(sStatusImage, TC_GetButtonFrameImagePathAndName(), true);
    sStatusImage = TC_AddWrappedUrlToString(sStatusImage, TC_GetStatusOverlayImagePathAndName(cStatus), true);
    let sDualCodeUrl = ''
    if ( cDualClueCode == g_TC_cCodeMeaning_DualClue_Single )
        sDualCodeUrl = g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame_Rounded_ForNoNumberSquares;
    if ( cDualClueCode == g_TC_cCodeMeaning_DualClue_Double )
        sDualCodeUrl = g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame_DoubleRounded_ForNoNumberSquares;
    if ( sDualCodeUrl != '' ) sStatusImage = TC_AddWrappedUrlToString(sStatusImage, sDualCodeUrl, true)

    var cColor = g_cColorCodeForUnknownLetter;
    if ( cStatus == g_TC_cCodeMeaning_Corrected || TC_CorrectOrGolden(cStatus) )
        cColor = g_cColorCodeForCorrectLetter;
    if ( CharValidEntry(cLetter) )
    {
        sStatusImage = TC_AddWrappedUrlToString(sStatusImage, TC_GetLetterImagePathAndName(cLetter, cColor), true)
    }
    sStatusImage = TC_AddWrappedUrlToString(sStatusImage, TC_GetStatusImagePathAndName(cSelection), true)
    return sStatusImage;
}

