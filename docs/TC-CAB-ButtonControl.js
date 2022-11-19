// TC-CAB-ButtonControl.js

function CAB_ForRowLetter_SetButton(iRow, iLetter, cCodeForActivity)
{
    var cAnswerPlayer = CAB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    var cStatusPlayer = CAB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    var sId = '';
    sStatusImage = CAB_ButtonBackgroundImage(cAnswerPlayer, cStatusPlayer, cCodeForActivity)
    sId = CAB_MakeId(iRow, iLetter)
    document.getElementById(sId).style.backgroundImage = sStatusImage;
}

function CAB_ButtonBackgroundImage(cLetter, cStatus, cSelection)
{
    var sStatusImage = '';
    sStatusImage  += MakeURLWrappedString(TC_GetButtonFrameImagePathAndName(), true);
    var sStatusOverlay = TC_GetStatusOverlayImagePathAndName(cStatus);
    if ( sStatusOverlay != '' )
    {
        if ( sStatusImage != '' )
            sStatusImage += ', '
        sStatusImage += MakeURLWrappedString(sStatusOverlay, true);
    }
    var cColor = g_sColorCodeForUnknownLetter;
    if ( cStatus == g_TC_cCodeMeaning_Corrected || TC_CorrectOrGolden(cStatus) )
        cColor = g_sColorCodeForCorrectLetter;
    if ( CharValidEntry(cLetter) )
    {
        if ( sStatusImage != '' )
            sStatusImage += ', '
        sStatusImage += MakeURLWrappedString(TC_GetLetterImagePathAndName(cLetter, cColor), true)
    }
    if ( sStatusImage != '' )
        sStatusImage += ', ';
    sStatusImage += MakeURLWrappedString(TC_GetStatusImagePathAndName(cSelection), true);
    return sStatusImage;
}

