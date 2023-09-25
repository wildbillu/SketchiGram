// TC-GRBMS-ConsolidatedMouseTouchMove.js

var g_TM_bMoved = false;

function GRB_MT_Over(e)
{

}

function GRB_MT_Down(e, iRow, iLetter, sWho)
{
    g_TM_bMoved = false;
//
    e.preventDefault();
    g_PointerDown_sWhere = g_PointerDown_sWhere_GRB;
    g_Pointer_sWho       = sWho;
    if ( g_bGridSolved )
        return;
    let cStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter)
// can never pick black squares
    if ( TC_IsBlackSquare(cStatus) )
        return;
// if CAB square does not have the focus, then we cannot pick golden or corrected
    if ( g_CAB_Focus_sId == '' && ( TC_IsGolden(cStatus) || TC_IsCorrected(cStatus) ) )
        return;
// if neither CAB or GRB has focus, we just want to set the GRB Focus to this and not consider swipe?
    let sId_GRB = GRB_MakeId(iRow, iLetter)
    if ( g_CAB_Focus_sId == '' && g_GRB_Focus_sId == '' )
    {
        let elem = document.getElementById(sId_GRB);
        GRB_onfocus(elem);
        return;
    }
// if the square selected to swipe is the one with the focus we just want to do onfocus - will alter direction?
    if ( g_GRB_Focus_sId == sId_GRB )
    {
        let elem = document.getElementById(sId_GRB);
        GRB_onfocus(elem);
        return;
    }
    g_Pointer_sWho = sWho;
    g_GRBSwipe_sIdActive = sId_GRB;
    let iX = GRB_GetXFromEvent(e);
    let iY = GRB_GetYFromEvent(e)
    TC_GRBSwipe_Start(iX, iY)    
    TC_GRBSwipe_SetButtonStyle(true, iRow, iLetter);
}

function GRB_GetXFromEvent(e)
{
    if ( g_Pointer_sWho == g_Pointer_sMouse )
        return Math.round(e.clientX);
    if ( g_Pointer_sWho == g_Pointer_sTouch )
    {
        if ( e.touches.length != 0 )
        {
            let iX = Math.round(e.touches[0].clientX);
            return iX;
        }
        return TM_iFinalX;
    }
    return -2;
}

function GRB_GetYFromEvent(e)
{
    if ( g_Pointer_sWho == g_Pointer_sMouse )
        return Math.round(e.clientY);
    if ( g_Pointer_sWho == g_Pointer_sTouch )
    {
        if ( e.touches.length != 0 )
            return Math.round(e.touches[0].clientY);
        return TM_iFinalY;
    }
    return -1;
}

function GRB_MT_Up(e)
{
    if ( g_bGridSolved )
        return;
    if ( g_GRBSwipe_sIdActive == '' )
        return;
    let sSwipe = 'none';
    if ( g_TM_bMoved )
    {
        let iFinalX = GRB_GetXFromEvent(e);
        let iFinalY = GRB_GetYFromEvent(e);
        sSwipe = TC_GRBSwipe_Finish(iFinalX, iFinalY);
        if ( sSwipe == 'right' )
        {
            g_Pointer_sWho = g_Pointer_sNoOne;
            let iRow_Swiped    = GRB_RowFromId   (g_GRBSwipe_sIdActive)
            let iLetter_Swiped = GRB_LetterFromId(g_GRBSwipe_sIdActive)
            // remove the swiped symbol - early so it can be reset if needed
            TC_GRBSwipe_SetButtonStyle(false, iRow_Swiped, iLetter_Swiped);
            if ( g_GRB_Focus_sId != '' )
            {
                let iRow    = GRB_RowFromId(g_GRB_Focus_sId);
                let iLetter = GRB_LetterFromId(g_GRB_Focus_sId);
                GRB_SwitchAnswers(iRow, iLetter, iRow_Swiped, iLetter_Swiped);
                GRB_MoveToNextAvailable(iRow, iLetter)
                // want to go to the next in GRB
            }
            if ( g_CAB_Focus_sId != '' )
            {
                let iRow          = CAB_RowFromId(g_CAB_Focus_sId);
                let iLetter       = CAB_LetterFromId(g_CAB_Focus_sId);
                let cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iRow_Swiped, iLetter_Swiped)
                CAB_ForRowLetter_DoItAll(cAnswerPlayer, iRow, iLetter)
            }
            // cleanup for next
            g_GRBSwipe_sIdActive = '';
            Status_Check();
            return;
        }
    }        
// clear swiped and undo if needed
    let iRow_Swiped    = GRB_RowFromId   (g_GRBSwipe_sIdActive)
    let iLetter_Swiped = GRB_LetterFromId(g_GRBSwipe_sIdActive)
    TC_GRBSwipe_SetButtonStyle(false, iRow_Swiped, iLetter_Swiped);
    let elem = document.getElementById(g_GRBSwipe_sIdActive);
    g_GRBSwipe_sIdActive = '';
    GRB_onfocus(elem);
    if ( sSwipe == 'left' )
    {
        TC_History_UndoLast();
    }       
}

function GRB_MT_Move(e)
{
    if ( g_bGridSolved )
        return;
    if ( g_GRBSwipe_sIdActive == '' )
        return;
    g_TM_bMoved = true;
    TM_iFinalX = GRB_GetXFromEvent(e);
    TM_iFinalY = GRB_GetYFromEvent(e);
    e.preventDefault();
}

function GRB_MT_Out(e)
{
    if ( g_GRBSwipe_sIdActive == '' )
        return;
    GRB_MT_Up(e)
}
