// TC-ElapsedTime.js

var g_ElapsedTime_iSecondsPrevious = 0;
var g_ElapsedTime_iSecondsThisAttempt = 0;
var g_ElapsedTime_iInitialTimeInSeconds = 0;
var g_ElapsedTime_IntervalId = 0;
var g_ElapsedTime_eDiv = 0;

function TC_ElapsedTime_Pause()
{
    TC_ElapsedTime_Clear();
    g_ElapsedTime_iSecondsPrevious += g_ElapsedTime_iSecondsThisAttempt;
    g_ElapsedTime_iSecondsThisAttempt = 0;
}

function TC_ElapsedTime_Resume()
{
    const d = new Date();
    g_ElapsedTime_iInitialTimeInSeconds = Math.trunc(d.getTime()/1000);
    TC_ElapsedTime_Process();
    g_ElapsedTime_IntervalId = setInterval(TC_ElapsedTime_Process, 1000);
}

function TC_ElapsedTime_StartOver()
{

    TC_ElapsedTime_Clear();
    g_ElapsedTime_iSecondsPrevious = 0;
    g_ElapsedTime_iSecondsThisAttempt = 0;
    const d = new Date();
    g_ElapsedTime_iInitialTimeInSeconds = Math.trunc(d.getTime()/1000);
    TC_ElapsedTime_Process();
    g_ElapsedTime_IntervalId = setInterval(TC_ElapsedTime_Process, 1000);
}

function TC_ElapsedTime_Clear()
{
    if ( g_ElapsedTime_IntervalId == 0 )
        return;
    clearInterval(g_ElapsedTime_IntervalId);
    g_ElapsedTime_IntervalId = 0;
}

function TC_ElapsedTime_Process()
{
    const d = new Date();
    let iCurrentTimeInSeconds = Math.trunc(d.getTime()/1000);
    g_ElapsedTime_iSecondsThisAttempt = Math.trunc(iCurrentTimeInSeconds - g_ElapsedTime_iInitialTimeInSeconds);
    let iTotalTimeInSeconds = g_ElapsedTime_iSecondsThisAttempt + g_ElapsedTime_iSecondsPrevious;
    let iHours   = Math.trunc(iTotalTimeInSeconds/3600);
    let iMinutes = Math.trunc((iTotalTimeInSeconds - iHours * 3600)/60 );
    let iSeconds = Math.trunc(iTotalTimeInSeconds - iHours * 3600 - iMinutes * 60);
    let sFormatted = '';
    if ( iHours )
        sFormatted += iHours.toString() + ':';
    if ( iMinutes > 10 )
        sFormatted += iMinutes.toString() + ':';
    else
    {
        if ( iHours == 0 )
            sFormatted += iMinutes.toString() + ':';
        else
            sFormatted += '0' + iMinutes.toString() + ':';
    }
    if ( iSeconds < 10 )
        sFormatted += '0';
    sFormatted += iSeconds.toString();
    StoreCookie_Puzzle();
    g_ElapsedTime_eDiv.innerHTML = g_Timer_sLabel + sFormatted;
}

function TC_ElapsedTime_Setup()
{
    const d = new Date();
    g_ElapsedTime_iInitialTimeInSeconds = Math.trunc(d.getTime()/1000);
    g_ElapsedTime_eDiv = document.getElementById("ElapsedTime_Div");
    g_ElapsedTime_eDiv.style.left = MakePixelString(g_Timer_iLeft);
    g_ElapsedTime_eDiv.style.top = MakePixelString(g_Timer_iTop);
    TC_ElapsedTime_Process();
    if ( !g_bPuzzleSolved )
        g_ElapsedTime_IntervalId = setInterval(TC_ElapsedTime_Process, 1000);
}