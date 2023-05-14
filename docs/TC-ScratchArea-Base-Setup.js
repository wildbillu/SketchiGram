// TC-ScratchArea-EditBox.js

var g_SA_aWords = [];
var g_SA_iMaxEntries = 5;
var g_SA_sWordStatus = 'XXXXX';
var g_SA_Focus_sId = '';
var g_SA_iCursorPosition = 0;
var g_SA_cCursor = '|';
var g_SA_elemErase = null;

function TC_SA_Erase_DoIt()
{
    if ( g_SA_Focus_sId == '' )
        return;
    let iEntry = TC_SA_EntryFromId(g_SA_Focus_sId);
    let elemEntry = document.getElementById(g_SA_Focus_sId);
    g_SA_aWords[iEntry];
    elemEntry.innerHTML = '';
    g_SA_sWordStatus = replaceAt(g_SA_sWordStatus, iEntry, 'X');
    TC_SA_Focus(elemEntry);
// need to recheck if it is correct    
g_SA_elemErase.remove();
}

function TC_SA_Erase_Cancel()
{
// need to recheck if it is correct    
    let iEntry = TC_SA_EntryFromId(g_SA_Focus_sId);
    let elemEntry = document.getElementById(g_SA_Focus_sId);
    if ( g_SA_sWordStatus.charAt(iEntry) == 'T')
        elemEntry.className = "SA_Entry_Base SA_Entry_Correct";
    g_SA_elemErase.remove();
}

function TC_SA_MakeErasePopup(bRightClick)
{
    if ( g_SA_Focus_sId == '' )
        return;
// if this is right click here we decide if the right click happen while the mouse is over the Entry
    if ( bRightClick )
    {
        let elemEntry = document.getElementById(g_SA_Focus_sId);
        let rectEntry = GetBoundingClientRectAbsolute(elemEntry);
        if ( !IsPointWithinRect(rectEntry, g_MouseClientPosition_x, g_MouseClientPosition_y) )
            return;
    }
    let iEntry = TC_SA_EntryFromId(g_SA_Focus_sId);
    if ( g_SA_aWords[iEntry].length == 0 )
        return;
    g_SA_elemErase = document.createElement('div');
    let sInner = '<TABLE cellspacing=0 cellpadding=0 Id="SA_ClearDiv" class="SA_ClearDiv"><TR>';
    sInner +=    ' <TD Id="SA_Erase_Message" class="SA_ClearDiv_Message" onclick="TC_SA_Erase_Cancel();">Clear?</TD>';
    sInner +=    ' <TD Id="SA_Erase_DoIt" class="SA_ClearDiv_DoIt" onclick="TC_SA_Erase_DoIt();">Yes</TD>';
    sInner +=    ' <TD Id="SA_Erase_Cancel" class="SA_ClearDiv_Cancel" onclick="TC_SA_Erase_Cancel();">No</TD>';
    sInner +=    '</TABLE>';
    g_SA_elemErase.innerHTML = sInner;
    g_SA_elemErase.style.visibility = "hidden";
    document.body.appendChild(g_SA_elemErase);
// position it next to the element
    let elemSA = document.getElementById(g_SA_Focus_sId);
    let rectSA = GetBoundingClientRectAbsolute(elemSA);
    let elem = document.getElementById("SA_ClearDiv");
    elem.style.top = MakePixelString(rectSA.top);
    elem.style.left = MakePixelString(rectSA.right);
    elem.style.height = MakePixelString(rectSA.height);
    g_SA_elemErase.style.visibility = "visible";
}

function TC_SA_ClearEntry(iEntry)
{
    if ( g_SA_aWords[iEntry].length == 0 )
            return;
    let elemClear = document.getElementById(TC_SA_MakeId(iEntry));
    TC_SA_Focus(elemClear);
    TC_SA_MakeErasePopup(false);
}

function TC_SA_Setup()
{
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
    sInner += '<TABLE Id="ScratchArea_Table" cellpadding=0 cellspacing=1 class="ScratchArea_Table">';
    let iEntry = 0;
    while ( iEntry < g_SA_iMaxEntries )
    {
        sInner += '<TR class="ScratchArea_TR">'
        let sId = TC_SA_MakeId(iEntry);
        let sClassName = 'SA_Entry_Base SA_Entry_Inactive';
        if ( g_SA_sWordStatus.charAt(iEntry) == 'T')
            sClassName = 'SA_Entry_Base SA_Entry_Correct';
        let sFunctionsToCall = '';
        sFunctionsToCall += ' onkeypress="return TC_SA_onkeypress(event);"';
        sFunctionsToCall += ' onfocus="TC_SA_Focus(this);" ';
        sFunctionsToCall += ' onkeyup="return TC_SA_onkeyup(event, event.key);"';
        sThisOne = '<TD><DIV tabindex="0" Id="' + sId + '" class= "' + sClassName + '" ';
        sThisOne += sFunctionsToCall + ' >'
        sThisOne += g_SA_aWords[iEntry];
        sThisOne += '</DIV></TD>';
        let sClearBoxId = TC_SA_ClearBox_MakeId(iEntry)
        sThisOne += '<TD><DIV Id="' + sClearBoxId + '" class="SA_ClearBox" onclick="TC_SA_ClearEntry(' + iEntry + ');">X</DIV></TD>'
        sThisOne += '</TR>';
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
    document.getElementById("ScratchArea_Table").style.left = MakePixelString(2);

// bottom right is from the last of the x boxes
    let sClearBoxId_Last = TC_SA_ClearBox_MakeId(g_SA_iMaxEntries - 1);
    let elemClearBoxLast = document.getElementById(sClearBoxId_Last)
    let rectClearBoxLast = GetBoundingClientRectAbsolute(elemClearBoxLast)
    let rectScratch = GetBoundingClientRectAbsolute(elemScratch)
    let iWidthFull = (rectClearBoxLast.right - rectScratch.left)
    elemScratch.style.width = MakePixelString(iWidthFull);
    rectScratch = GetBoundingClientRectAbsolute(elemScratch)
    let iHeightFull = 221;//(rectClearBoxLast.bottom - rectScratch.top)
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
function TC_SA_ClearBox_MakeId(iEntry){return 'TC_SA_ClearBox' + iEntry;}
function TC_SA_MakeId(iEntry){return 'TC_SA_' + iEntry;}
function TC_SA_EntryFromId(sId){return sId.charAt(6);}
