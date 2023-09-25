// TC-PointerSupport.js

var g_Pointer_sMouse = 'Mouse';
var g_Pointer_sTouch = 'Touch';
var g_Pointer_sNoOne = 'NoOne';
var g_Pointer_sWho   = g_Pointer_sNoOne;

var g_PointerDown_sWhere_Unspecified = 'Unspecified';
var g_PointerDown_sWhere_Global      = 'Global';
var g_PointerDown_sWhere_GRB         = 'GRB';
var g_PointerDown_sWhere_CAB         = 'CAB';
var g_PointerDown_sWhere                 = g_PointerDown_sWhere_Unspecified

var g_Swipe_iMaxTime_ms                = 500;
var g_Swipe_Distance_iMin              = 50;
var g_Swipe_Distance_iMaxPerpendicular = 300;

var g_GlobalSwipe_Start_iX        = 0;
var g_GlobalSwipe_Start_iY        = 0;
var g_GlobalSwipe_Start_iTime_ms  = new Date().getTime();

var g_GRBSwipe_sIdActive          = '';
var g_GRBSwipe_Start_iX           = 0;
var g_GRBSwipe_Start_iY           = 0;
var g_GRBSwipe_Start_iTime_ms     = new Date().getTime();

let ii =0;
let g_bFocusArea = false;
var g_Everywhere_Start_iX = 0;
var g_Everywhere_Start_iY = 0;

function TC_Swipe_Result(iElapsed, iDelta_X, iDelta_Y)
{
    let sSwipe = 'slow';
    if ( iElapsed > g_Swipe_iMaxTime_ms )  // has to happen fast
        return sSwipe;
    sSwipe = 'perp';
    if ( Math.abs(iDelta_Y) > g_Swipe_Distance_iMaxPerpendicular )
        return sSwipe + iDelta_Y;
    if ( iDelta_X > g_Swipe_Distance_iMin )
        return 'right';
    if ( iDelta_X < -g_Swipe_Distance_iMin)
        return 'left'
    return 'short';
}

function TC_GlobalSwipe_Start(iInitialX, iInitialY)
{
    g_GlobalSwipe_Start_iX = iInitialX;
    g_GlobalSwipe_Start_iY = iInitialY;
    g_GlobalSwipe_Start_iTime_ms = new Date().getTime();
}

function TC_GlobalSwipe_Finish(iFinalX, iFinalY)
{
    let iTime_ms_Finish = new Date().getTime();
    let iElapsed = iTime_ms_Finish - g_GlobalSwipe_Start_iTime_ms;
    let iDelta_X = iFinalX - g_GlobalSwipe_Start_iX;
    let iDelta_Y = iFinalY - g_GlobalSwipe_Start_iY;
    return TC_Swipe_Result(iElapsed, iDelta_X, iDelta_Y);
}

function TC_Global_Up(e)
{
    if ( g_PointerDown_sWhere == g_PointerDown_sWhere_Global )
    {
        let iFinalX = GRB_GetXFromEvent(e);
        let iFinalY = GRB_GetYFromEvent(e);
        let sSwipe = TC_GlobalSwipe_Finish(iFinalX, iFinalY);
        if ( sSwipe == 'left')
            TC_History_UndoLast();
    }
    g_PointerDown_sWhere = g_PointerDown_sWhere_Unspecified;
    g_Pointer_sWho = g_Pointer_sNoOne;
}

function TC_Global_Down(e, sWho)
{
    g_Pointer_sWho = sWho;
    if ( g_PointerDown_sWhere == g_PointerDown_sWhere_Unspecified )
    {
        g_PointerDown_sWhere = g_PointerDown_sWhere_Global;
        let iX = GRB_GetXFromEvent(e)
        let iY = GRB_GetYFromEvent(e)
        TC_GlobalSwipe_Start(iX, iY) 
    }
}

function TC_Global_Out(e)
{
    if ( g_Pointer_sWho == g_Pointer_sNoOne )
        return;
    TC_Global_Up(e)
}

function TC_Global_MouseMove(e)
{
    e.preventDefault();
    if ( g_Pointer_sWho == g_Pointer_sNoOne )
        return;
    TM_iFinalX = GRB_GetXFromEvent(e);
    TM_iFinalY = GRB_GetYFromEvent(e);
}

function TC_GRBSwipe_Start(iInitialX, iInitialY)
{
    g_GRBSwipe_Start_iX = iInitialX;
    g_GRBSwipe_Start_iY = iInitialY;
    g_GRBSwipe_Start_iTime_ms = new Date().getTime();
}

function TC_GRBSwipe_Finish(iFinalX, iFinalY)
{
    let iTime_ms_Finish = new Date().getTime();
    let iElapsed = iTime_ms_Finish - g_GRBSwipe_Start_iTime_ms;
    let iDelta_X = iFinalX - g_GRBSwipe_Start_iX;
    let iDelta_Y = iFinalY - g_GRBSwipe_Start_iY;
    return TC_Swipe_Result(iElapsed, iDelta_X, iDelta_Y);
}
