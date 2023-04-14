// TC-ScratchArea-CoreProcessing.js

function TC_SA_Entry_AddChar(keypressed)
{
    g_SA_bFudgeToKeepFocus = true;
    if ( g_SA_Focus_sId != '')
    {
        document.getElementById(g_SA_Focus_sId).focus();
    }
    g_SA_bFudgeToKeepFocus = false;
    if ( g_SA_Focus_sId == '' )
        return;
    let elemInputText = document.getElementById(g_SA_Focus_sId);
    var sCC = String.fromCharCode(8);
    let sValue = elemInputText.innerHTML;
    let iLength = sValue.length;
    let iEntry = TC_SA_EntryFromId(g_SA_Focus_sId);
    if ( keypressed == 'ArrowRight' )
    {
        if ( g_SA_iCursorPosition >= iLength -1 )
            return;
        else
        {
            g_SA_iCursorPosition++;
            elemInputText.innerHTML = TC_SA_InsertCursorAt(sValue);
        }
        return;
    }
    if ( keypressed == 'ArrowLeft' )
    {
        if ( g_SA_iCursorPosition == 0 )
            return;
        else
        {
            g_SA_iCursorPosition--;
            elemInputText.innerHTML = TC_SA_InsertCursorAt(sValue);
        }
        return;
    }
    if ( keypressed == sCC || keypressed == 'Backspace' )
    {
        if ( g_SA_iCursorPosition == 0 )
            return;
        let iRemove = g_SA_iCursorPosition - 1;
        sValue = removeAt(sValue, iRemove);
        g_SA_iCursorPosition--;
    }
    else
    {
        if ( iLength > g_iGridHeight && iLength > g_iGridWidth )
        {
            let sMessage = 'No Words ' + iLength + ' letters long';
            TC_ResultMessage_DisplayForInterval(sMessage, g_ResultMessage_sStyle_Warning, 0, 3);
            return;
        }
        let sUpper = keypressed.toUpperCase();
        sValue = TC_SA_AddCharFixup(sValue, sUpper)
    }
    TC_SA_ForEntrySetWord(iEntry, sValue);
    elemInputText.innerHTML = sValue;
    TC_SA_CheckIfEntryMatchesAnAnswer(iEntry, elemInputText);
}

function TC_SA_onkeypress(e)
{ // this is needed to reject invalid keys
    let eKey = e.key;
    let cKey = eKey.toUpperCase();
    if ( g_GRBMS_sAllowedGridLetters.indexOf(cKey) != -1 || eKey.startsWith('Backspace') || eKey.startsWith('Arrow') )
    {
        return true; // let it through
    }        
    let letters = /^[a-zA-Z]$/;
    let sMessage = 'Invalid key';
    if ( eKey.match(letters) ) 
        sMessage = cKey + ' Is Not In the puzzle';
    TC_ResultMessage_DisplayForInterval(sMessage, g_ResultMessage_sStyle_Warning, 0, 3);
    e.preventDefault();
    return false;
}

function TC_SA_onkeyup(e, key)
{ // this is where things get diverted to the real add character
// could handle moving cursor location here    
    let cKey = key.toUpperCase();
    let bProcess = false;
    if ( g_GRBMS_sAllowedGridLetters.indexOf(cKey) != -1 ) bProcess = true;
    if ( key == 'Backspace' ) bProcess = true;
    if ( key == 'ArrowRight' ) bProcess = true;
    if ( key == 'ArrowLeft' ) bProcess = true;
    if ( !bProcess )
    {
        e.preventDefault();
        return false;
    }
    TC_SA_Entry_AddChar(key);
    return true;
}

function TC_SA_LoseFocus()
{
    if ( g_SA_Focus_sId == '' )
        return;
    let elemOldFocus = document.getElementById(g_SA_Focus_sId);
    let iEntry = TC_SA_EntryFromId(g_SA_Focus_sId);
    let sClassName = "SA_EB_Entry_Base SA_EB_Entry_Inactive";
    if ( g_SA_sWordStatus.charAt(iEntry) == 'T' )
        sClassName = "SA_EB_Entry_Base SA_EB_Entry_Correct";
    elemOldFocus.className = sClassName;
    let sValue = elemOldFocus.innerHTML;
    let sNewInnerHTML = removeAllChar(sValue, g_SA_cCursor);
    elemOldFocus.innerHTML = sNewInnerHTML;
    let elemWithFocus = document.getElementById(g_SA_Focus_sId);
    elemWithFocus.blur();
    g_SA_Focus_sId = '';

}

function TC_SA_Focus(elemInputText)
{
// if this element is already correct, do not accept focus
    let iEntry = TC_SA_EntryFromId(elemInputText.id);
    if ( g_SA_sWordStatus.charAt(iEntry) == 'T')
        return;
    if ( g_SA_Focus_sId != '' )
    { // need to fix previous focus
        let elemOldFocus = document.getElementById(g_SA_Focus_sId);
        let iEntry = TC_SA_EntryFromId(g_SA_Focus_sId);
        let sClassName = "SA_EB_Entry_Base SA_EB_Entry_Inactive";
        if ( g_SA_sWordStatus.charAt(iEntry) == 'T' )
            sClassName = "SA_EB_Entry_Base SA_EB_Entry_Correct";
        elemOldFocus.className = sClassName;
        let sValue = elemOldFocus.innerHTML;
        elemOldFocus.innerHTML = removeAllChar(sValue, g_SA_cCursor);
    }        
    g_SA_Focus_sId = elemInputText.id;
    SyncTo_OthersLoseFocus('SA')
    elemInputText.className = "SA_EB_Entry_Base SA_EB_Entry_Focus";
    let sValue = elemInputText.innerHTML;
    sValue = TC_SA_InsertCursorAt(sValue)
    elemInputText.innerHTML = sValue;
    KB_AGC_SpecialButtonEnable(true);
}

function TC_SA_LoseTheFocusAndCleanup(bCheck)
{ // we are going to wait until another focus is selected before doing things on lost focus
    if ( g_SA_Focus_sId ) // != '' && bCheck )
    {
        KB_AGC_EnabledStateAllButtons(false);
        TC_SA_LoseFocus();
    }
    g_SA_Focus_sId = '';
}

