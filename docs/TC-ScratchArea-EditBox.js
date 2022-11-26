// TC-ScratchArea-EditBox.js

var g_SA_EB_Focus_sId = '';
var g_SA_EB_iCursorPosition = 2;
var g_SA_EB_cCursor = '|';
//var g_SA_EB_cCursor = String.fromCharCode(0x2502);
var g_SA_EB_bFudgeToKeepFocus = false;

function TC_SA_EB_ClearEntries()
{
    for ( let iEntry = 0; iEntry < g_SA_iMaxEntries.length; iEntry++ )
        g_ScratchArea_aWords[iEntry] = '';
}

function TC_SA_EB_InsertCursorAt(sValue)
{// first remove any existing cursor
    let sValueNoCursor = removeAllChar(sValue, g_SA_EB_cCursor);
    let sValueWithCorrectCursor = insertAt(sValueNoCursor, g_SA_EB_iCursorPosition, g_SA_EB_cCursor);
    return sValueWithCorrectCursor;
}

function TC_SA_EB_AddCharFixup(sValue, sUpper)
{
    sValue = removeAllChar(sValue, g_SA_EB_cCursor);
    sValue = insertAt(sValue, g_SA_EB_iCursorPosition, sUpper);
    g_SA_EB_iCursorPosition++;
    sValue = TC_SA_EB_InsertCursorAt(sValue);
    return sValue;
}

function TC_SA_EB_Entry_AddChar(keypressed)
{ // 
    g_SA_EB_bFudgeToKeepFocus = true;
    if ( g_SA_EB_Focus_sId != '')
    {
        document.getElementById(g_SA_EB_Focus_sId).focus();
    }
    g_SA_EB_bFudgeToKeepFocus = false;
    let elemInputText = document.getElementById(g_SA_EB_Focus_sId);
    var sCC = String.fromCharCode(8);
    let sValue = elemInputText.innerHTML;
    let iLength = sValue.length;
    let iEntry = TC_SA_EB_EntryFromId(g_SA_EB_Focus_sId);
    if ( keypressed == 'ArrowRight' )
    {
        if ( g_SA_EB_iCursorPosition >= iLength -1 )
            return;
        else
        {
            g_SA_EB_iCursorPosition++;
            elemInputText.innerHTML = TC_SA_EB_InsertCursorAt(sValue);
            elemInputText.innerHTML = sValueChanged;
        }
        return;
    }
    if ( keypressed == 'ArrowLeft' )
    {
        if ( g_SA_EB_iCursorPosition == 0 )
            return;
        else
        {
            g_SA_EB_iCursorPosition--;
            elemInputText.innerHTML = TC_SA_EB_InsertCursorAt(sValue);
        }
        return;
    }
    if ( keypressed == sCC || keypressed == 'Backspace' )
    {
        if ( g_SA_EB_iCursorPosition == 0 )
            return;
        let iRemove = g_SA_EB_iCursorPosition - 1;
        sValue = removeAt(sValue, iRemove);
        g_SA_EB_iCursorPosition--;
    }
    else
    {
        let sUpper = keypressed.toUpperCase();
        sValue = TC_SA_EB_AddCharFixup(sValue, sUpper)
    }
    TC_SA_EB_ForEntrySetWord(iEntry, sValue);
    elemInputText.innerHTML = sValue;
    TC_SA_CheckIfEntryMatchesAnAnswer(iEntry)
}

function TC_SA_EB_onkeydown(e)
{// doesnt seem to get this one
    return true;
}

function TC_SA_EB_onkeypress(e)
{ // this is needed to reject invalid keys
    let eKey = e.key;
    let cKey = eKey.toUpperCase();
    if ( g_GRBMS_sAllowedGridLetters.indexOf(cKey) != -1 || eKey.startsWith('Backspace') )
    {
        return true; // let it through
    }        
    let letters = /^[a-zA-Z]$/;
    let sMessage = 'Invalid key';
    if ( eKey.match(letters) ) 
        sMessage = cKey + ' Is Not In the Solution Grid';
    TC_ResultMessage_DisplayForInterval(sMessage, g_ResultMessage_sStyle_Warning, 0, 3);
    e.preventDefault();
    return false;
}

function TC_SA_EB_onkeyup(e, key, iEntry)
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
    TC_SA_EB_Entry_AddChar(key);
    return true;
}

function TC_SA_EB_ForEntrySetWord(iEntry, sValueWithOrWithoutCursor)
{
    let sValueNoCursor = removeAllChar(sValueWithOrWithoutCursor, g_SA_EB_cCursor);
    g_ScratchArea_aWords[iEntry] = sValueNoCursor;
}

function TC_SA_EB_Focus(elemInputText)
{
    if ( g_SA_EB_bFudgeToKeepFocus )
        return;
    if ( g_SA_EB_Focus_sId != '' )
    {
        let elemOldFocus = document.getElementById(g_SA_EB_Focus_sId);
        elemOldFocus.className = "SA_EB_Entry";
        let sValue = elemOldFocus.innerHTML;
        elemOldFocus.innerHTML = removeAllChar(sValue, g_SA_EB_cCursor);
        TC_SA_EB_LoseTheFocusAndCleanup(false);
    }        
    if ( g_SA_EB_Focus_sId == '')
    {
        g_SA_EB_Focus_sId = elemInputText.id;
        elemInputText.className = "SA_EB_Entry_Focus";
        let sValue = elemInputText.innerHTML;
        sValue = TC_SA_EB_InsertCursorAt(sValue)
        elemInputText.innerHTML = sValue;
    }
    KB_Mini_SpecialButtonEnable(true);
}

function TC_SA_EB_LoseTheFocusAndCleanup(bCheck)
{ // we are going to wait until another focus is selected before doing things on lost focus
    if ( g_SA_EB_Focus_sId != '' && bCheck )
    {
        KB_Mini_SpecialButtonEnable(false);
    }
    g_SA_EB_Focus_sId = '';
}


function TC_SA_EB_Setup(iTop, iLeft, iColumns, iWidth)
{
    let elemScratch = document.getElementById("ScratchArea");
    elemScratch.style.top = MakePixelString(iTop);
    elemScratch.style.left = MakePixelString(iLeft);
    elemScratch.style.width = MakePixelString(iWidth+5);
    let sInner = '';
    sInner += '<DIV Id="ScratchArea_Text">Use this area for candidate answers</DIV>';
    sInner += '<TABLE Id="ScratchArea_TABLE" cellpadding=0 cellspacing=1 class="">';
    let iEntry = 0;
    while ( iEntry < g_SA_iMaxEntries )
    {
        sInner += '<TR class="ScratchArea_TR">'
        for ( let iColumn = 0; iColumn < iColumns; iColumn++)
        {
            let sId = TC_SA_EB_MakeId(iEntry);
            let sFunctionsToCall = '';
            sFunctionsToCall += ' onkeydown="return TC_SA_EB_onkeydown(event);"';
            sFunctionsToCall += ' onkeypress="return TC_SA_EB_onkeypress(event);"';
//            sFunctionsToCall += ' onfocusout="TC_SA_EB_LostFocus(' + iEntry + ' );" ';
            sFunctionsToCall += ' onfocus="TC_SA_EB_Focus(this);" ';
//            sFunctionsToCall += ' onchange="TC_SA_EB_Change(this);" ';
//            sFunctionsToCall += ' oninput="TC_SA_EB_Oninput(this);" ';
            sFunctionsToCall += ' onkeyup="return TC_SA_EB_onkeyup(event, event.key,' + iEntry + ');"';
            sThisOne = '<TD><DIV tabindex="0" Id="' + sId + '" class="SA_EB_Entry" ' + sFunctionsToCall + ' >ABCD</DIV></TD>';
            sInner += sThisOne;
            iEntry++;
        }
        sInner += '</TR>'
    }
    sInner += '</TABLE>';
    elemScratch.innerHTML = sInner;
    let iWidthEntry = (iWidth)/iColumns;
    let iEntryAdjust = 0;
    while ( iEntryAdjust < g_SA_iMaxEntries )
    {
        let iEntryLeft = 13;
        for ( let iCC = 0; iCC < iColumns; iCC++)
        {
            let sId = TC_SA_EB_MakeId(iEntryAdjust);
            let elemEntry = document.getElementById(sId);
            elemEntry.style.width = MakePixelString(iWidthEntry);
            iEntryLeft += iWidthEntry + 2;
            elemEntry.style.left = MakePixelString(iEntryLeft);
            iEntryAdjust++;
        }
    }
    document.getElementById("ScratchArea_TABLE").style.left = MakePixelString(2);
    let sId = TC_SA_EB_MakeId(g_SA_iMaxEntries - 1);
    let iBottom = document.getElementById(sId).getBoundingClientRect().bottom;
    let iHeightFull = (iBottom - iTop) + g_TC_Padding_Inter_Vertical_iSize;
    elemScratch.style.height = MakePixelString(iHeightFull);
    elemScratch.style.width = MakePixelString(iWidth+4);
}

function TC_SA_EB_MakeId(iEntry){return 'TC_SA_EB_' + iEntry;}
function TC_SA_EB_EntryFromId(sId){return sId.charAt(9);}
