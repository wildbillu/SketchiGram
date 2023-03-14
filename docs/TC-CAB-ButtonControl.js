// TC-CAB-ButtonControl.js

function CAB_ForRowLetter_SetButton(iRow, iLetter, cCodeForActivity)
{
    let cAnswerPlayer = CAB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    let cStatusPlayer = CAB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    let cDualClueCode = CAB_ForRowLetter_GetDualClueCode(iRow, iLetter);
    let sId = '';
    sStatusImage = CAB_ButtonBackgroundImage(cAnswerPlayer, cStatusPlayer, cCodeForActivity, cDualClueCode)
    sId = CAB_MakeId(iRow, iLetter);
    let elem = document.getElementById(sId);
    let cToShow = ' ';
    if ( CharValidEntry(cAnswerPlayer) )
        cToShow = cAnswerPlayer;
    elem.innerHTML = cToShow;
    elem.style.backgroundImage = sStatusImage;
    if ( !g_CA_Squares_bButtons )
    {
        let cColor = g_Color_sLetterUnknown;
        if ( cStatusPlayer == g_TC_cCodeMeaning_Corrected || TC_CorrectOrGolden(cStatusPlayer) )
            cColor = g_Color_sLetterCorrect;
        elem.style.color = cColor;
    }
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
    if ( g_CA_Squares_bButtons )
    {
        let cColor = g_cColorCodeForUnknownLetter;
        if ( cStatus == g_TC_cCodeMeaning_Corrected || TC_CorrectOrGolden(cStatus) )
            cColor = g_cColorCodeForCorrectLetter;
        if ( CharValidEntry(cLetter) )
        {
            sStatusImage = TC_AddWrappedUrlToString(sStatusImage, TC_GetLetterImagePathAndName(cLetter, cColor), true)
        }
    }
    sStatusImage = TC_AddWrappedUrlToString(sStatusImage, TC_GetStatusImagePathAndName(cSelection), true)
    return sStatusImage;
}

