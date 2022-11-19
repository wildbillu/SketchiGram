// TC.Cookies.js

var g_iStoredPuzzleCookies = 0;

function StoreCookie_Settings()
{
    var sCookieToAdd = MakeCookie_Settings()
    document.cookie = sCookieToAdd;
}

function HandleCookiesOnStart()
{
    let s = document.cookie;
    if ( s == '' )
    {
        return false;
    }
    var aCookies = s.split(';');
    var iCookies = aCookies.length;
//    
    var sOurCookieName_Puzzle = "SketchiCross-" + g_sPuzzleDate;
    var sOurCookieName_Settings = 'SketchiCross-Settings'; 
    var sOurCookie_Puzzle = '';
    var sOurCookie_Settings = '';
//
    for ( var iCookie = 0; iCookie < iCookies ; iCookie++)
    {
        var sThisCookie = aCookies[iCookie]
        if ( sThisCookie.includes(sOurCookieName_Puzzle) )
            sOurCookie_Puzzle = sThisCookie;
            if ( sThisCookie.includes(sOurCookieName_Settings) )
            sOurCookie_Settings = sThisCookie;
    }
    HandleCookie_Puzzle(sOurCookie_Puzzle);
    HandleCookie_Settings(sOurCookie_Settings);
}
var g_Cookie_bValid = false;
var g_Cookie_sPuzzle = '';
var g_Cookie_sAnswersPlayer = '';
var g_Cookie_sStatusPlayer = '';
var g_Cookie_sGridAnswersPlayer = '';
var g_Cookie_sGridStatusPlayer = '';
var g_Cookie_bPuzzleSolved = false;
var g_Cookie_bGridSolved = false;
var g_Cookie_bAnswersSolved = false;
var g_Cookie_ScratchArea_sWords = '|||||||F|||||';

function HandleCookie_Puzzle(sOurCookie_Puzzle)
{
    if ( sOurCookie_Puzzle == '')
        return;
    var iEqual = sOurCookie_Puzzle.indexOf("=");
    if ( iEqual == -1 )
        return false;
    var sCookieValue = sOurCookie_Puzzle.substring(iEqual + 1);
    var aOurValues = [];
    var aOurValues = sCookieValue.split(g_cCookieDelimiter);
    var iOurValues = aOurValues.length;
    if ( iOurValues != 10 )
        return false;
    g_Cookie_sPuzzle = aOurValues[0];
    g_Cookie_sAnswersPlayer = aOurValues[1];
    g_Cookie_sStatusPlayer = aOurValues[2];
    g_Cookie_sGridAnswersPlayer = aOurValues[3];
    g_Cookie_sGridStatusPlayer = aOurValues[4];
    g_Cookie_bPuzzleSolved = IsTrue(aOurValues[6]);
    g_Cookie_bGridSolved = IsTrue(aOurValues[7]);
    g_Cookie_bAnswersSolved = IsTrue(aOurValues[8]);
    g_Cookie_ScratchArea_sWords = aOurValues[9];
    g_Cookie_bValid = true;
}

function StoreCookie_Puzzle()
{
// for CAB we need to wrap the player answers and status with the '|'
    var sAnswersPlayer = g_aAnswersPlayer.join('|');
    var sAnswersStatusPlayer = g_aAnswersStatusPlayer.join('|');
    var sGridAnswersPlayer = g_aGridAnswersPlayer.join('')
    var sGridStatusPlayer = g_aGridStatusPlayer.join('')
    var sCookieToAdd = MakeCookie_Puzzle(g_sPuzzleDate, g_sPuzzleName, sAnswersPlayer, sAnswersStatusPlayer, sGridAnswersPlayer, sGridStatusPlayer, 0, g_bPuzzleSolved)
    document.cookie = sCookieToAdd;
//    setlineAdd('CPS:' + ++g_iStoredPuzzleCookies);
}

function MakeCookie_Puzzle(sDate, sPuzzleName, sAnswersPlayer, sStatusPlayer, sGridAnswersPlayer, sGridStatusPlayer, iSeconds, bPuzzleSolved)
{
    var sCookieName = 'SketchiCross-' + sDate;
    var sCookie = '';
    sCookie += sPuzzleName;
     sCookie += g_cCookieDelimiter;
    sCookie += sAnswersPlayer;
     sCookie += g_cCookieDelimiter;
    sCookie += sStatusPlayer;
     sCookie += g_cCookieDelimiter;
    sCookie += sGridAnswersPlayer;
     sCookie += g_cCookieDelimiter;
    sCookie += sGridStatusPlayer
    sCookie += g_cCookieDelimiter;
    sCookie += iSeconds;
    sCookie += g_cCookieDelimiter;
    sCookie += g_bPuzzleSolved;
    sCookie += g_cCookieDelimiter;
    sCookie += g_bGridSolved;
    sCookie += g_cCookieDelimiter;
    sCookie += g_bAnswersSolved;
    let ScratchArea_sWords = g_ScratchArea_aWords.join(g_TC_cGeneralDelimiter);
    sCookie += g_cCookieDelimiter;
    sCookie += ScratchArea_sWords;
    var exdays = 365;
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    var sFullCookie = sCookieName + "=" + sCookie + ";" + expires;// + ";path=/";
    return sFullCookie;
}

function DeleteCookiesMatching(sMatch)
{
    let s = document.cookie;
    var aCookies = s.split(';');
    var iCookies = aCookies.length;
    for ( var iCookie = 0; iCookie < iCookies; iCookie++ )
    {
        var sThisCookie = aCookies[iCookie]
        if ( sMatch == '' || sThisCookie.startsWith(sMatch) )
        {
            const d = new Date();
            d.setTime(d.getTime());
            let expires = "expires="+ d.toUTCString();
            sThisCookie += ';' + expires;
            document.cookie = sThisCookie;
        }
    }
setline("ClearedCookies:" + sMatch + ';')
}
