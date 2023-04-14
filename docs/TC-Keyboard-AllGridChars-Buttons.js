// TC-Keyboard-AllGridChars-Buttons.js

function KB_AGC_MakeArrowLeftButton()
{
    let sTextForButton = ' ';
    let sTextForId = 'ArrowLeft';
    let sClass = 'KB_Mini_Button KB_Mini_ButtonLeftArrow StartHidden';
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
    let sClass = 'KB_Mini_Button KB_Mini_ButtonRightArrow StartHidden';
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
    let sClass = 'KB_Mini_Button KB_Mini_ButtonBackspace_Disabled StartHidden';
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

function KB_AGC_EnabledStateAllButtons(bOverrideAllToBeEnabled)
{
    g_KB_AGC_AllButtonsEnabled = bOverrideAllToBeEnabled;
    for ( let i = 0; i < g_KB_Buttons_a_of_cLetters.length; i++)
    {
        let bEnabled = true;
        if ( !bOverrideAllToBeEnabled )
           bEnabled = !g_KB_Buttons_a_of_bPlacedCorrectly[i];
        KB_AGC_SetButtonEnabledClass(i, bEnabled)
    }
    let bBackspaceVisible = false;
    let sClassBackspace = 'KB_Mini_Button KB_Mini_ButtonBackspace_Disabled';
    if ( bOverrideAllToBeEnabled )
    {
        bBackspaceVisible = true;
        sClassBackspace = 'KB_Mini_Button KB_Mini_ButtonBackspace';
    }
    if ( g_KB_bBackspaceKeyActive )
    {
        let elemBackspace = document.getElementById('Backspace');
        ForIdSetVisibility('Backspace', bBackspaceVisible)
        elemBackspace.className = sClassBackspace;
    }
    if ( g_KB_bArrowKeysActive )
    {
        ForIdSetVisibility('ArrowRight', bBackspaceVisible)
        ForIdSetVisibility('ArrowLeft', bBackspaceVisible)
    }
}

function KB_AllGridChars_MakeButtonInTD(iButton, cLetter, bPlacedCorrectly)
{
    let sId = KB_AllGridChars_MakeButtonId(iButton)
    let sIdWrapped = ' Id="' + sId + '" ';
    let sTextForButton = cLetter;
    let sClass = 'KB_Mini_Button KB_Mini_ButtonLetter';
    if ( bPlacedCorrectly )
        sClass += '_Disabled'
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
    g_KB_Buttons_a_of_bPlacedCorrectly[iButton] = true;
    let sId = KB_AllGridChars_MakeButtonId(iButton);
    let elemButton = document.getElementById(sId);
    let sClass = 'KB_Mini_Button KB_Mini_ButtonLetter_Disabled';
    if ( g_KB_Buttons_Narrow )
        sClass += '_Narrow'
    elemButton.className = sClass;
}

function KB_AllGridChars_MakeButtons()
{
    g_KB_Buttons_a_of_cLetters.length = 0;
    g_KB_Buttons_a_of_bPlacedCorrectly.length = 0;
    g_KB_Buttons_a_of_sButtonInner.length = 0;
//    
    let sAnswersPlayer = g_aGridAnswersPlayer.join('');
    let sStatusPlayer  = g_aGridStatusPlayer.join('');
    let iButtons = sAnswersPlayer.length;
    let iButtonActive = 0;
    for ( let iButton = 0; iButton < iButtons; iButton++ )
    {
        let cStatusPlayer = sStatusPlayer.charAt(iButton);
        let cAnswer = sAnswersPlayer.charAt(iButton)
        if ( cAnswer != g_cCode_BlackSquare )
        {
            let bProperlyPlaced = false;
            if ( cStatusPlayer == g_cCode_Corrected && !g_bPrintedFormat ) bProperlyPlaced = true;
            if ( cStatusPlayer == g_cCode_Correct   && !g_bPrintedFormat ) bProperlyPlaced = true;
            if ( cStatusPlayer == g_cCode_Golden ) bProperlyPlaced = true;
            let cLetter = sAnswersPlayer.charAt(iButton);
            let s = KB_AllGridChars_MakeButtonInTD(iButtonActive, cLetter, bProperlyPlaced);
            g_KB_Buttons_a_of_sButtonInner.push(s);
            g_KB_Buttons_a_of_cLetters.push(cLetter);
            g_KB_Buttons_a_of_bPlacedCorrectly.push(bProperlyPlaced);
            iButtonActive++
        }
    }
}

function KB_GetButtonWidth()
{
    let elemTest = document.getElementById("Test")
    let cLetter = 'W';
    let sInnerLetter = KB_AllGridChars_MakeButtonInTD(0, cLetter, true);
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
