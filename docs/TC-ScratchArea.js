// TC-ScratchArea.js

var g_SA_Focus_sId = '';
var g_SA_Focus_sCurrentValue = '';
var g_SA_iMaxEntries = 12;

function TC_SA_onkeydown(e)
{
    return true;
}

function TC_SA_onkeypress(e)
{
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

function TC_SA_onkeyup(e, key, iEntry)
{
    let cKey = key.toUpperCase();
    if ( g_GRBMS_sAllowedGridLetters.indexOf(cKey) == -1 )
    {
        e.preventDefault();
        return false;
    }
    TC_SA_UpdateValueInArray(g_SA_Focus_sId);
    return true;
}

function TC_SA_ClearEntries()
{
    for ( let i = 0; i < g_SA_iMaxEntries; i++)
    {
        g_ScratchArea_aWords[i] = '';
        document.getElementById(TC_ScratchArea_MakeId(i)).value = '';
    }
}

function TC_SA_UpdateValueInArray(sId)
{
    let elemInputText = document.getElementById(sId);
    let sValue = elemInputText.value;
    sValue = sValue.toUpperCase();
    let iEntry = TC_ScratchArea_EntryFromId(sId);
    g_ScratchArea_aWords[iEntry] = sValue;
    StoreCookie_Puzzle();
}

function TC_SA_Entry_AddChar(keypressed)
{
    let elemInputText = document.getElementById(g_SA_Focus_sId);
    let sValue = elemInputText.value;
    let iCursor = elemInputText.selectionStart;
    var sCC = String.fromCharCode(8);
    if ( keypressed == sCC )
    {
        if ( iCursor == 0 )
            return;
        let iRemove = iCursor - 1;
        sValue = removeAt(sValue, iRemove);
        elemInputText.value = sValue;        
        elemInputText.setSelectionRange(iRemove, iRemove);
        elemInputText.focus();
        TC_SA_CheckIfEntryMatchesAnAnswer(elemInputText.id);
        TC_SA_UpdateValueInArray(g_SA_Focus_sId);
        return;
    }
// need to handle backspace here
    sValue = sValue.substring(0, iCursor) + keypressed + sValue.substring(iCursor)
    elemInputText.value = sValue;
    elemInputText.setSelectionRange(iCursor+1, iCursor+1);
    elemInputText.focus();
    TC_SA_UpdateValueInArray(g_SA_Focus_sId);
    TC_SA_CheckIfEntryMatchesAnAnswer(g_SA_Focus_sId);
}

function TC_SA_CheckIfEntryMatchesAnAnswer(sId)
{
    let elemInputText = document.getElementById(sId);
    let sValue = elemInputText.value;
    sValue = sValue.toUpperCase();
    for ( let iAnswer = 0; iAnswer < g_aAnswers.length; iAnswer++ )
    {
        let sAnswer = g_aAnswers[iAnswer];
        if ( sAnswer == sValue )
        {
            let sMessage = sValue + ' is a correct grid answer'
            TC_ResultMessage_DisplayForInterval(sMessage, g_ResultMessage_sStyle_Positive, 2, 3);
            SG_Clues_ShowClue_ResetAnswer(iAnswer, false, true, false);
            break;
        }
    }
}

function TC_SA_CheckIfEntryMatchesAnAnswer(iEntry)
{
    let sValue = g_ScratchArea_aWords[iEntry];
    sValue = sValue.toUpperCase();
    for ( let iAnswer = 0; iAnswer < g_aAnswers.length; iAnswer++ )
    {
        let sAnswer = g_aAnswers[iAnswer];
        if ( sAnswer == sValue )
        {
            let sMessage = sValue + ' is a correct grid answer'
            TC_ResultMessage_DisplayForInterval(sMessage, g_ResultMessage_sStyle_Positive, 2, 3);
            SG_Clues_ShowClue_ResetAnswer(iAnswer, false, true, false);
            break;
        }
    }
}

function TC_SA_Oninput(elemInputText)
{
    TC_SA_CheckIfEntryMatchesAnAnswer(elemInputText.id);
}

function TC_SA_Change(elemInputText)
{
}

function TC_SA_Focus(elemInputText)
{
    if ( g_SA_Focus_sId != '' )
        TC_SA_LoseTheFocusAndCleanup(false);
    if ( g_SA_Focus_sId == '')
    {
        g_SA_Focus_sId = elemInputText.id;
    }
    KB_Mini_SpecialButtonEnable(true);
}

function TC_SA_LoseTheFocusAndCleanup(bCheck)
{ // we are going to wait until another focus is selected before doing things on lost focus
    if ( g_SA_Focus_sId != '' && bCheck )
    {
        KB_Mini_BackspaceEnable(false);
    }
    g_SA_Focus_sId = '';
}

function TC_SA_LostFocus(iEntry)
{
}

function TC_ScratchArea_MakeId(iEntry)
{
    return 'TC_SA' + iEntry;
}

function TC_ScratchArea_EntryFromId(sId)
{
    return sId.charAt(5);
}


function TC_ScratchArea_Setup(iTop, iLeft, iColumns, iWidth)
{
    let elemScratch = document.getElementById("ScratchArea");
    elemScratch.style.top = MakePixelString(iTop);
    elemScratch.style.left = MakePixelString(iLeft);
    elemScratch.style.width = MakePixelString(iWidth);
    let sInner = '';
    sInner += '<DIV Id="ScratchArea_Text" class="ScratchArea_Text">Use this area for candidate answers</DIV>';
    sInner += '<TABLE Id="ScratchArea_TABLE" cellpadding=0 cellspacing=1 class="">';
    let iEntry = 0;

    while ( iEntry < g_SA_iMaxEntries )
    {
        sInner += '<TR class="ScratchArea_TR">'
        for ( let iColumn = 0; iColumn < iColumns; iColumn++)
        {
            let sId = TC_ScratchArea_MakeId(iEntry);
            let sFunctionsToCall = '';
//            sFunctionsToCall += ' onkeydown="return TC_SA_onkeydown(event);"';
            sFunctionsToCall += ' onkeypress="return TC_SA_onkeypress(event);"';
            sFunctionsToCall += ' onfocusout="TC_SA_LostFocus(' + iEntry + ' );" ';
            sFunctionsToCall += ' onfocus="TC_SA_Focus(this);" ';
            sFunctionsToCall += ' onchange="TC_SA_Change(this);" ';
            sFunctionsToCall += ' oninput="TC_SA_Oninput(this);" ';
            sFunctionsToCall += ' onkeyup="return TC_SA_onkeyup(event, event.key,' + iEntry + ');"';
            sThisOne = '<TD><input value="' + g_ScratchArea_aWords[iEntry] + '" Id="' + sId + '" type="text" class="ScratchArea_Entry" ' + sFunctionsToCall + ' ></TD>';
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
            let sId = TC_ScratchArea_MakeId(iEntryAdjust);
            let elemEntry = document.getElementById(sId);
            elemEntry.style.width = MakePixelString(iWidthEntry);
            iEntryLeft += iWidthEntry + 2;
            elemEntry.style.left = MakePixelString(iEntryLeft);
            iEntryAdjust++;
        }
    }
    document.getElementById("ScratchArea_TABLE").style.left = MakePixelString(2);
    let sId = TC_ScratchArea_MakeId(g_SA_iMaxEntries - 1);
    let iBottom = document.getElementById(sId).getBoundingClientRect().bottom;
    let iHeightFull = (iBottom - iTop) + g_TC_Padding_Inter_Vertical_iSize;
    elemScratch.style.height = MakePixelString(iHeightFull);
    elemScratch.style.width = MakePixelString(iWidth);
}
