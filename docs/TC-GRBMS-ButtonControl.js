// TC-GRBMS-ButtonControl.js

function TC_GRBSwipe_SetButtonStyle(bActive, iRow, iLetter)
{
    let elemButton = document.getElementById(GRB_MakeId(iRow, iLetter));
    if ( bActive ) 
    {
//        TC_GRB_SetPickedForSwipe(iRow, iLetter);
//        "pointer"; 
        elemButton.style.cursor = "url(images/StatusIndicators/SwipeCursor-A-64.png), pointer";
}
    else
    {
        GRB_ForRowLetter_SetButton(iRow, iLetter, g_cCode_Inactive);
        elemButton.style.cursor = "default";
    }
}

function TC_GRB_SetPickedForSwipe(iPickedRow, iPickedLetter)
{
    let cLetterPicked = GRB_ForRowLetter_GetAnswerPlayer(iPickedRow, iPickedLetter);
    let cStatusPlayer = g_cCode_Normal;
    sStatusImage = GRB_ButtonBackgroundImage(cLetterPicked, cStatusPlayer, 0, g_cCode_HasFocusBeingSwiped, g_cCode_ClueType_Normal);
    let sId = GRB_MakeId(iPickedRow, iPickedLetter)
    let elem = document.getElementById(sId);
    elem.style.backgroundImage = sStatusImage;
}

function GRB_ButtonBackgroundImage(cLetter, cStatus, iGridNumber, cCodeForActivity, cSpecialClueCode)
{
    let sStatusImage = '';
    if ( TC_IsBlackSquare(cLetter) )
        return sStatusImage;
    sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, TC_GetButtonFrameImagePathAndName());

    if ( cStatus == g_cCode_Golden )
    {
        sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, g_sImagePath_StatusIndicators + g_sStatusButtonName_GoldenSquare);
    }
    else
    {
        if ( cCodeForActivity == g_cCode_HasFocusBeingSwiped )
            sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, g_sImagePath_StatusIndicators + g_sStatusButtonName_BeingSwiped);
        sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, TC_GetStatusImagePathAndName(cCodeForActivity));
    }
    sStatusImage = GRB_AddWrappedUrlToString(sStatusImage,TC_GetStatusOverlayImagePathAndName(cStatus));
    if ( !g_bSuppressGridNumbers && iGridNumber != 0 )
    {
        let sGridNumber = iGridNumber.toString();
        if ( sGridNumber.length == 1 )
            sGridNumber = '0' + sGridNumber;
        sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, TC_GetGridNumberImagePathAndName(sGridNumber));
    }
// now we do the special clue overlay
    if ( g_SyncSketchiToonsClue )
    {
        let sRound = '';
        if ( cSpecialClueCode == g_cCode_AnswerType_Single )
        {
            sRound = g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame_Rounded_ForNoNumberSquares
            if ( !g_bSuppressGridNumbers && iGridNumber != 0 )
                sRound = g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame_Rounded_ForNumberSquares
        }
        else if ( cSpecialClueCode == g_cCode_AnswerType_Double )
        {
            sRound = g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame_DoubleRounded_ForNoNumberSquares;
            if ( !g_bSuppressGridNumbers && iGridNumber != 0 )
                sRound = g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame_DoubleRounded_ForNumberSquares;
        }
        if ( sRound != '' ) sStatusImage = GRB_AddWrappedUrlToString(sStatusImage, sRound);
    }
    return sStatusImage;
}

function GRB_ForRowLetter_SetButton(iRow, iLetter, cCodeForActivity)
{
    let sId = GRB_MakeId(iRow, iLetter);
    let elem = document.getElementById(sId);
   let cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
   let cStatusPlayer = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
   let cSpecialClueCode = GRB_ForRowLetter_GetSpecialClueCode(iRow, iLetter);
    elem.style.left = MakePixelString(iLetter*g_GRB_Square_iSize)
    elem.style.top = MakePixelString(iRow*g_GRB_Square_iSize)
    if ( cAnswerPlayer == g_cCode_BlackSquare )
    {
        elem.style.backgroundColor = 'black'
        return;
    }
    let iGridNumber = g_aGridNumbers[iRow*g_iGridWidth+iLetter];
    let sStatusImage = '';
    sStatusImage = GRB_ButtonBackgroundImage(cAnswerPlayer, cStatusPlayer, iGridNumber, cCodeForActivity, cSpecialClueCode);
    elem.style.backgroundImage = sStatusImage;
//    
    elem.style.left = MakePixelString(iLetter*g_GRB_Square_iSize)
    elem.style.top = MakePixelString(iRow*g_GRB_Square_iSize)
    if ( CharValidEntry(cAnswerPlayer) )
        elem.innerHTML = cAnswerPlayer;    
    let cColor = g_Color_sLetterUnknown;
    elem.style.color = cColor;
}

function GRB_ForLetter_SetButtons(iLetter, cCode)
{
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++ )
        GRB_ForRowLetter_SetButton(iRow, iLetter, cCode);
}

function GRB_ForRow_SetButtons(iRow, cCode)
{
    for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        GRB_ForRowLetter_SetButton(iRow, iLetter, cCode);
}


