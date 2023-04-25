// TC-GRBMS-ContextMenu.js
var g_GRBMS_elemReveal = null;

function TC_GRBMS_Reveal_DoIt()
{
    MAM_RevealSquare();
    g_GRBMS_elemReveal.remove();
}

function TC_GRBMS_Reveal_Cancel()
{
    g_GRBMS_elemReveal.remove();
}

function TC_GRBMS_RevealSquare()
{
// we only get here if want to allow it
    g_GRBMS_elemReveal = document.createElement('div');
    let sInner = '<TABLE Id="GRBMS_ContextMenu_Div" cellspacing=0 cellpadding=0 class="GRBMS_ContextMenu_Div"><TR>';
    sInner +=    ' <TD Id="GRBMS_ContextMenu_Reveal_Title" class="GRBMS_ContextMenu_Reveal_Title" onclick="TC_GRBMS_Reveal_Cancel();">Reveal Square?</TD>';
    sInner +=    ' <TD Id="GRBMS_ContextMenu_Reveal_DoIt" class="GRBMS_ContextMenu_Reveal_DoIt" onclick="TC_GRBMS_Reveal_DoIt();">Yes</TD>';
    sInner +=    ' <TD Id="GRBMS_ContextMenu_Reveal_Cancel" class="GRBMS_ContextMenu_Reveal_Cancel" onclick="TC_GRBMS_Reveal_Cancel();">Cancel</TD>';
    sInner +=    '</TABLE>';
    g_GRBMS_elemReveal.innerHTML = sInner;
    g_GRBMS_elemReveal.style.visibility = "hidden";
    document.body.appendChild(g_GRBMS_elemReveal);
// position it next to the element
    let elemGRBMS = document.getElementById(g_GRBMS_Focus_sId);
    let rectGRBMS = GetBoundingClientRectAbsolute(elemGRBMS);
    let elem = document.getElementById("GRBMS_ContextMenu_Div");
    elem.style.top = MakePixelString(rectGRBMS.top + 20);
    elem.style.left = MakePixelString(rectGRBMS.right - 20);
//    elem.style.height = MakePixelString(rectGRBMS.height);
    g_GRBMS_elemReveal.style.visibility = "visible";
}

function TC_GRBMS_MakeFixSquarePopup(bRightClick)
{
    if ( g_GRBMS_Focus_sId == '' )
        return;
// if this is right click here we decide if the right click happen while the mouse is over the Entry
    if ( bRightClick )
    {
        let elemSquare = document.getElementById(g_GRBMS_Focus_sId);
        let rectSquare = GetBoundingClientRectAbsolute(elemSquare);
        if ( !IsPointWithinRect(rectSquare, g_MouseClientPosition_x, g_MouseClientPosition_y) )
            return;
    }
    TC_GRBMS_RevealSquare();
}

