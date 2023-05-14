// TC-Keyboard-AllGridChars-Buttons.js

let g_aArrayOfLetterStatusAllow_InAlphaOrder = [];
let g_aArrayOfLetterStatusAllow_InAlphaOrder_NoRepeats = [];

function KB_AGC_SetBackspaceArrows(bBackspaceArrowsActive)
{
    ForIdSetVisibility('Backspace', bBackspaceArrowsActive)
    ForIdSetVisibility('ArrowRight', bBackspaceArrowsActive)
    ForIdSetVisibility('ArrowLeft', bBackspaceArrowsActive)
}

function KB_AGC_SetKeyboardButtons()
{
// deal with the extra keys
    let bBackspaceArrowsActive = false;
    if ( g_KB_Mini_sUsageMode == g_KB_Mini_sUsageMode_ActiveWords )
        bBackspaceArrowsActive = true;
    KB_AGC_SetBackspaceArrows(bBackspaceArrowsActive);
//    
    if ( g_KB_Mini_sUsageMode == g_KB_Mini_sUsageMode_Idle )
    {
        let iCount = g_aArrayOfLetterStatusAllow_InAlphaOrder_NoRepeats.length;
        let sClass = 'KB_Mini_Button KB_Mini_ButtonLetter_Disabled';
        for ( let iButton = 0; iButton < iCount; iButton++ )
            document.getElementById(KB_AllGridChars_MakeButtonId(iButton)).className = sClass;
        return;
    }
//
    if ( g_KB_Mini_sUsageMode == g_KB_Mini_sUsageMode_ActiveWords || 
        g_KB_Mini_sUsageMode == g_KB_Mini_sUsageMode_SpecialClue )
    { // in these cases all the characters are allowed
        let iCount = g_aArrayOfLetterStatusAllow_InAlphaOrder_NoRepeats.length;
        let sClass = 'KB_Mini_Button KB_Mini_ButtonLetter';
        for ( let iButton = 0; iButton < iCount; iButton++ )
            document.getElementById(KB_AllGridChars_MakeButtonId(iButton)).className = sClass;
        return;
    }
// this is the case where grid is active   

    if ( g_KB_Mini_sUsageMode == g_KB_Mini_sUsageMode_ActiveGrid )
    {
        KB_AlphaOrderWithStatus(); // update the codes
        KB_AGC_SetKeyboardButtons_Consolidated();
        return;
    }
    alert('bad mode')
}

function KB_AGC_SetKeyboardButtons_Consolidated()
{
    let iCountB = g_aArrayOfLetterStatusAllow_InAlphaOrder_NoRepeats.length;
    for ( let iButton = 0; iButton < iCountB; iButton++ )
    {
        let aLetterStatusAllow = g_aArrayOfLetterStatusAllow_InAlphaOrder_NoRepeats[iButton];
        let cLetter_NoRepeats = aLetterStatusAllow[0];
        // need to loop through letters with repeats and count the number of this character and the number of not golden squares
        let iAllows = 0;
        let cLetter = 'X';
        for ( let i = 0; i < g_aArrayOfLetterStatusAllow_InAlphaOrder.length; i++ )
        {
            let aLSA_all = g_aArrayOfLetterStatusAllow_InAlphaOrder[i];
            cLetter = aLSA_all[0];
            let cAllow = aLSA_all[2];
            if ( cLetter == cLetter_NoRepeats )
            {
                if ( cAllow != g_cCode_MoveNotAllowed )
                    iAllows++;
            }
        }
        let sClass = 'KB_Mini_Button KB_Mini_ButtonLetter';
        if ( iAllows == 0 )
            sClass += '_Disabled'
        document.getElementById(KB_AllGridChars_MakeButtonId(iButton)).className = sClass;
    }
}

function KB_AllGridChars_MakeButtons()
{// buttons will be created enabled
    g_KB_Buttons_a_of_cLetters.length = 0;
    g_KB_Buttons_a_of_sButtonInner.length = 0;
// want letters to be in alphabetical order
    KB_AlphaOrderWithStatus();
    KB_AlphaOrderWithStatus_NoRepeats();
    let iCount = g_aArrayOfLetterStatusAllow_InAlphaOrder_NoRepeats.length
    if ( g_AGC_bAllowRepeats )
        iCount = g_aArrayOfLetterStatusAllow_InAlphaOrder.length
    for ( let iButton = 0; iButton < iCount; iButton++ )
    {
        let aLetterStatusAllow = g_aArrayOfLetterStatusAllow_InAlphaOrder_NoRepeats[iButton];
        if ( g_AGC_bAllowRepeats )
            aLetterStatusAllow = g_aArrayOfLetterStatusAllow_InAlphaOrder[iButton];
        let cLetter = aLetterStatusAllow[0];
        let s = KB_AllGridChars_MakeButtonInTD(iButton, cLetter);
        g_KB_Buttons_a_of_sButtonInner.push(s);
        g_KB_Buttons_a_of_cLetters.push(cLetter);
    }
}

function KB_AlphaOrderWithStatus()
{
    let aArrayOfLetterStatusAllow = [];
    sAnswersPlayer = g_aGridAnswersPlayer.join('');
    sStatusPlayer  = g_aGridStatusPlayer.join('');
    for ( let i = 0; i < sAnswersPlayer.length; i++ )
    {
        let cLetter = sAnswersPlayer.charAt(i)
        let cStatus = sStatusPlayer.charAt(i)
        if ( cLetter != g_cCode_BlackSquare )
        {
            let aLetterStatusAllow = new Array(3);
            aLetterStatusAllow[0] = cLetter;
            aLetterStatusAllow[1] = cStatus;
            let cAllow = g_cCode_MoveAllowed;
            if ( TC_IsGolden(cStatus) ) cAllow = g_cCode_MoveNotAllowed;
            if ( g_Difficulty_iLevel_Operating == g_Difficulty_iLevel_Hard && TC_IsCorrected(cStatus) ) cAllow = g_cCode_MoveNotAllowed;
            if ( g_Difficulty_iLevel_Operating == g_Difficulty_iLevel_Easy && TC_IsCorrectOrCorrected(cStatus) ) cAllow = g_cCode_MoveNotAllowed;
            aLetterStatusAllow[2] = cAllow;
            aArrayOfLetterStatusAllow.push(aLetterStatusAllow)
        }
    }
// stupid way to sort...but
    g_aArrayOfLetterStatusAllow_InAlphaOrder.length = 0;
    for ( let i = 65; i <= 92; i++)    
    {
        let c = String.fromCharCode(i)
        for ( let iL = 0; iL < aArrayOfLetterStatusAllow.length; iL++)
        {
            let aLetterStatusAllow = aArrayOfLetterStatusAllow[iL];
            if ( aLetterStatusAllow[0] == c )
            {
                g_aArrayOfLetterStatusAllow_InAlphaOrder.push(aLetterStatusAllow)
            }
        }
    }
}

function KB_AlphaOrderWithStatus_NoRepeats()
{
    g_aArrayOfLetterStatusAllow_InAlphaOrder_NoRepeats.length = 0;
    let cLast = 'x'
    for ( let i = 0; i < g_aArrayOfLetterStatusAllow_InAlphaOrder.length; i++ )
    {
        let aLetterStatus = g_aArrayOfLetterStatusAllow_InAlphaOrder[i];
        let cThis = aLetterStatus[0]
        if ( cThis != cLast )
            g_aArrayOfLetterStatusAllow_InAlphaOrder_NoRepeats.push(aLetterStatus)
        cLast = cThis;
    }
}

function KB_AGC_MakeArrowLeftButton()
{
    let sTextForButton = ' ';
    let sTextForId = 'ArrowLeft';
    let sClass = 'KB_Mini_Button KB_Mini_ButtonLeftArrow TC_StartHidden';
    let sIdWrapped = ' Id="' + sTextForId + '" ';
    let sClassWrapped = 'class="' + sClass + '" '; 
    let sOnClick = ' onclick="KB_AGC_KeyboardPressArrowLeft();" ';
    let sButton = '<TD><DIV '+ sIdWrapped + sClassWrapped + sOnClick + '>' + sTextForButton + '</DIV></TD>';
    return sButton;
}

function KB_AGC_MakeArrowRightButton()
{
    let sTextForButton = ' ';
    let sTextForId = 'ArrowRight';
    let sClass = 'KB_Mini_Button KB_Mini_ButtonRightArrow TC_StartHidden';
    let sIdWrapped = ' Id="' + sTextForId + '" ';
    let sClassWrapped = 'class="' + sClass + '" '; 
    let sOnClick = ' onclick="KB_AGC_KeyboardPressArrowRight();" ';
    let sButton = '<TD><DIV '+ sIdWrapped + sClassWrapped + sOnClick + '>' + sTextForButton + '</DIV></TD>';
    return sButton;
}

function KB_AGC_MakeBackspaceButton()
{
    let sTextForButton = ' ';
    let sTextForId = 'Backspace';
    let sClass = 'KB_Mini_Button KB_Mini_ButtonBackspace TC_StartHidden';
    let sIdWrapped = ' Id="' + sTextForId + '" ';
    let sClassWrapped = 'class="' + sClass + '" '; 
    let sOnClick = ' onclick="KB_AGC_KeyboardPressBackspace();" ';
    let sButton = '<TD><DIV '+ sIdWrapped + sClassWrapped + sOnClick + '>' + sTextForButton + '</DIV></TD>';
    return sButton;
}

function KB_AGC_FindBoundsOfButtons()
{
    let iButtons = g_KB_Buttons_a_of_cLetters.length;
    let elemButton = document.getElementById(KB_AllGridChars_MakeButtonId(0));
    let rectButton = GetBoundingClientRectAbsolute(elemButton);
    let iLeft = rectButton.left;
    let iTop = rectButton.top;
    let iRight = rectButton.right;
    let iBottom = rectButton.bottom;
    for ( let iButton = 1; iButton < iButtons; iButton++ )
    {
        elemButton = document.getElementById(KB_AllGridChars_MakeButtonId(iButton));
        rectButton = GetBoundingClientRectAbsolute(elemButton);
        if ( rectButton.left < iLeft ) iLeft = rectButton.left;
        if ( rectButton.right > iRight ) iRight = rectButton.right;
        if ( rectButton.top < iTop ) iTop = rectButton.top;
        if ( rectButton.bottom > iBottom ) iBottom = rectButton.bottom;
    }
// now we check the Backspace button if it is active
    if ( g_KB_bBackspaceKeyActive )
    {
        let elemBackspace = document.getElementById('Backspace');
        rectBackspace = GetBoundingClientRectAbsolute(elemBackspace);
        if ( rectBackspace.right > iRight ) iRight = rectBackspace.right;
    }
    if ( g_KB_bArrowKeysActive )
    {
        let elem = document.getElementById('ArrowLeft');
        let rect = GetBoundingClientRectAbsolute(elem);
        if ( rect.right > iRight ) iRight = rect.right;
        elem = document.getElementById('ArrowRight');
        rect = GetBoundingClientRectAbsolute(elem);
        if ( rect.right > iRight ) iRight = rect.right;
    }
    r = new DOMRect(0, 0, iRight - iLeft, iBottom - iTop)
    return r;
}

function KB_AllGridChars_MakeButtonInTD(iButton, cLetter)
{
    let sId = KB_AllGridChars_MakeButtonId(iButton)
    let sIdWrapped = ' Id="' + sId + '" ';
    let sTextForButton = cLetter;
    let sClass = 'KB_Mini_Button KB_Mini_ButtonLetter';
    if ( g_KB_Buttons_Narrow )
        sClass += '_Narrow'
    let sClassWrapped = 'class="' + sClass + '" '; 
    let sOnClick = ' onclick="KB_AGC_KeyboardPress(' + iButton + ');" ';
    let sButton = '<TD><DIV '+ sIdWrapped + sClassWrapped + sOnClick + '>' + sTextForButton + '</DIV></TD>';
    return sButton;
}

function KB_AGC_SetButtonEnabledClass(iButton, bEnabled)
{
    let sId = KB_AllGridChars_MakeButtonId(iButton);
    let elemButton = document.getElementById(sId);
    let sClass = 'KB_Mini_Button KB_Mini_ButtonLetter';
    if ( !bEnabled )
        sClass += '_Disabled';
    if ( g_KB_Buttons_Narrow )
        sClass += '_Narrow'
    elemButton.className = sClass;
}

function KB_AGC_SetButtonPlacedCorrectly(iButton)
{
    setlineAdd('fm2')
    return;
    let sId = KB_AllGridChars_MakeButtonId(iButton);
    let elemButton = document.getElementById(sId);
    let sClass = 'KB_Mini_Button KB_Mini_ButtonLetter_Disabled';
    if ( g_KB_Buttons_Narrow )
        sClass += '_Narrow'
    elemButton.className = sClass;
}

function KB_GetButtonWidth()
{
    let elemTest = document.getElementById("Test")
    let cLetter = 'W';
    let sInnerLetter = KB_AllGridChars_MakeButtonInTD(0, cLetter);
    elemTest.innerHTML = sInnerLetter;
    let sId = KB_AllGridChars_MakeButtonId(0);
    let elemLetter = document.getElementById(sId)
    let rectButton = elemLetter.getBoundingClientRect();
    let iWidth = rectButton.width; 
    elemTest.innerHTML = '';
    return iWidth;
}

function KB_AllGridChars_MakeThisRow(iStart, iFinish, bLastRow)
{
    let sButtonRow = '<TABLE><TR>';
    for ( iButton = iStart; iButton < iFinish; iButton++)
        sButtonRow += g_KB_Buttons_a_of_sButtonInner[iButton];
    if ( bLastRow )
    {
        if ( g_KB_bBackspaceKeyActive )
            sButtonRow += KB_AGC_MakeBackspaceButton();

        if ( g_KB_bArrowKeysActive )
        {
            let s = KB_AGC_MakeArrowLeftButton();
            sButtonRow += s;
            sButtonRow += KB_AGC_MakeArrowRightButton();
        }
    }
    sButtonRow += '</TR></TABLE>';
    return sButtonRow; 
}
