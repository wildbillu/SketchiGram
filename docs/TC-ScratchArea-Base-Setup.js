// TC-ScratchArea-EditBox.js

var g_SA_aWords = [];
var g_SA_iMaxEntries = 5;
var g_SA_sWordStatus = 'XXXX';
var g_SA_Focus_sId = '';
var g_SA_iCursorPosition = 0;
var g_SA_cCursor = '|';
var g_SA_bFudgeToKeepFocus = false;

function TC_SA_Setup()
{
    var r = document.querySelector(':root');
    r.style.setProperty('--ColorScratchAreaActive', g_Color_sScratchAreaActive);
//
    let elemDM = document.getElementById("DM_Div");
    let rectDM = GetBoundingClientRectAbsolute(elemDM);
    let iTop = rectDM.bottom + g_TC_Padding_Inter_Vertical_iSize;
    let iLeft = rectDM.left;
    let iWidthDiv = rectDM.width - 2; // for the border
//
    let elemScratch = document.getElementById("ScratchArea");
    elemScratch.style.top = MakePixelString(iTop);
    elemScratch.style.left = MakePixelString(iLeft);
    elemScratch.style.width = MakePixelString(iWidthDiv);
    let sInner = '';
    sInner += '<DIV Id="ScratchArea_Text" class="Scratch_Text">Use this area for candidate answers</DIV>';
    sInner += '<TABLE Id="ScratchArea_TABLE" cellpadding=0 cellspacing=1 class="ScratchArea_TABLE">';
    let iEntry = 0;
    while ( iEntry < g_SA_iMaxEntries )
    {
        sInner += '<TR class="ScratchArea_TR">'
        let sId = TC_SA_MakeId(iEntry);
        let sClassName = 'SA_EB_Entry_Base SA_EB_Entry_Inactive';
        if ( g_SA_sWordStatus.charAt(iEntry) == 'T')
            sClassName = 'SA_EB_Entry_Base SA_EB_Entry_Correct';
        let sFunctionsToCall = '';
        sFunctionsToCall += ' onkeypress="return TC_SA_onkeypress(event);"';
        sFunctionsToCall += ' onfocus="TC_SA_Focus(this);" ';
        sFunctionsToCall += ' onkeyup="return TC_SA_onkeyup(event, event.key);"';
        sThisOne = '<TD><DIV tabindex="0" Id="' + sId + '" class= "' + sClassName + '" ';
        sThisOne += sFunctionsToCall + ' >'
        sThisOne += g_SA_aWords[iEntry];
        sThisOne += '</DIV></TD></TR>';
        sInner += sThisOne;
        iEntry++;
    }
    sInner += '</TABLE>';
    elemScratch.innerHTML = sInner;
    let iWidthEntry = iWidthDiv - 2;
    for ( let iEntry = 0; iEntry < g_SA_iMaxEntries; iEntry++ )
    {
        let sId = TC_SA_MakeId(iEntry);
        let elemEntry = document.getElementById(sId);
        elemEntry.style.width = MakePixelString(iWidthEntry);
        elemEntry.style.left = MakePixelString(iEntry);
    }
    document.getElementById("ScratchArea_TABLE").style.left = MakePixelString(2);
    let sId = TC_SA_MakeId(g_SA_iMaxEntries - 1);
    let elemBottomElement = document.getElementById(sId);
    let rectBottomElement = GetBoundingClientRectAbsolute(elemBottomElement);
    let iBottom = rectBottomElement.bottom;
    let iHeightFull = (iBottom - iTop) + 2;
    elemScratch.style.height = MakePixelString(iHeightFull);
}

function TC_SA_ClearEntries()
{
    g_SA_sWordStatus = ''
    for ( let iEntry = 0; iEntry < g_SA_iMaxEntries; iEntry++ )
    {
        g_SA_aWords[iEntry] = '';
        g_SA_sWordStatus += 'X';
    }
}
function TC_SA_MakeId(iEntry){return 'TC_SA_' + iEntry;}
function TC_SA_EntryFromId(sId){return sId.charAt(6);}
