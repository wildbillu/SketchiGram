// TC-CAB-ContextMenu.js
var g_CAB_elemReveal = null;

function TC_CAB_Reveal_DoIt()
{
    g_CAB_elemReveal.remove();
}

function TC_CAB_Reveal_Cancel()
{
    g_CAB_elemReveal.remove();
}

function TC_CAB_RevealSquare()
{
// we only get here if want to allow it
    g_CAB_elemReveal = document.createElement('div');
    let sInner = '<TABLE Id="CAB_ContextMenu_Div" cellspacing=0 cellpadding=0 class="CAB_ContextMenu_Div"><TR>';
    sInner +=    ' <TD Id="CAB_ContextMenu_Reveal_Title" class="CAB_ContextMenu_Reveal_Title" onclick="TC_CAB_Reveal_Cancel();">Reveal Square?</TD>';
    sInner +=    ' <TD Id="CAB_ContextMenu_Reveal_DoIt" class="CAB_ContextMenu_Reveal_DoIt" onclick="TC_CAB_Reveal_DoIt();">Yes</TD>';
    sInner +=    ' <TD Id="CAB_ContextMenu_Reveal_Cancel" class="CAB_ContextMenu_Reveal_Cancel" onclick="TC_CAB_Reveal_Cancel();">Cancel</TD>';
    sInner +=    '</TABLE>';
    g_CAB_elemReveal.innerHTML = sInner;
    g_CAB_elemReveal.style.visibility = "hidden";
    document.body.appendChild(g_CAB_elemReveal);
// position it next to the element
    let elemCAB = document.getElementById(g_CAB_Focus_sId);
    let rectCAB = GetBoundingClientRectAbsolute(elemCAB);
    let elem = document.getElementById("CAB_ContextMenu_Div");
    elem.style.top = MakePixelString(rectCAB.top + 5);
    elem.style.left = MakePixelString(rectCAB.right - 5);
//    elem.style.height = MakePixelString(rectGRBMS.height);
    g_CAB_elemReveal.style.visibility = "visible";
}

function TC_CAB_MakeFixSquarePopup(bRightClick)
{
    if ( g_CAB_Focus_sId == '' )
        return;
// if this is right click here we decide if the right click happen while the mouse is over the Entry
    if ( bRightClick )
    {
        let elemSquare = document.getElementById(g_CAB_Focus_sId);
        let rectSquare = GetBoundingClientRectAbsolute(elemSquare);
        if ( !IsPointWithinRect(rectSquare, g_MouseClientPosition_x, g_MouseClientPosition_y) )
            return;
    }
    TC_CAB_RevealSquare();
}

