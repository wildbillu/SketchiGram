// TC-CAB-ButtonControl.js

function CAB_ForRowLetter_SetButton(iRow, iLetter, cCodeForActivity)
{
    let sId = CAB_MakeId(iRow, iLetter);
    let elem = document.getElementById(sId);
    if ( !elem )
    {
        setlineAdd('Bad'+ iRow + '|' + iLetter);
        return;
    }
    let cAnswerPlayer = CAB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    let cStatusPlayer = CAB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    let cSpecialClueType = CAB_ForRowLetter_GetSpecialClueType(iRow, iLetter);
    sStatusImage = CAB_ButtonBackgroundImage(cStatusPlayer, cCodeForActivity, cSpecialClueType)
    let cToShow = ' ';
    if ( CharValidEntry(cAnswerPlayer) )
        cToShow = cAnswerPlayer;
    elem.innerHTML = cToShow;
//alert(iRow + ':' + iLetter + '.len:' + cToShow.length + '|' + elem.innerHTML + '|')
    elem.style.backgroundImage = sStatusImage;
    let cColor = g_Color_sLetterUnknown;
    if ( cStatusPlayer == g_cCode_Corrected || TC_CorrectOrGolden(cStatusPlayer) )
        cColor = g_Color_sLetterCorrect;
    elem.style.color = cColor;
}

function CAB_ButtonBackgroundImage(cStatus, cSelection, cSpecialClueType)
{
    let sStatusImage = '';
    sStatusImage = TC_AddWrappedUrlToString(sStatusImage, TC_GetButtonFrameImagePathAndName(), true);
    sStatusImage = TC_AddWrappedUrlToString(sStatusImage, TC_GetStatusOverlayImagePathAndName(cStatus), true);
    let sDualCodeUrl = ''
    if ( cSpecialClueType == g_cCode_AnswerType_Single )
        sDualCodeUrl = g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame_Rounded_ForNoNumberSquares;
    if ( cSpecialClueType == g_cCode_AnswerType_Double )
        sDualCodeUrl = g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame_DoubleRounded_ForNoNumberSquares;
    if ( sDualCodeUrl != '' ) sStatusImage = TC_AddWrappedUrlToString(sStatusImage, sDualCodeUrl, true)
    sStatusImage = TC_AddWrappedUrlToString(sStatusImage, TC_GetStatusImagePathAndName(cSelection), true)
    return sStatusImage;
}

