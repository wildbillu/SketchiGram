// TC.Cookies.js

var g_iStoredPuzzleCookies = 0;

var g_aCookies = [];
var g_iCookies = 0;

var g_Cookie_bValid = false;
var g_Cookie_sAnswersPlayer = '';
var g_Cookie_sStatusPlayer = '';
var g_Cookie_sGridAnswersPlayer = '';
var g_Cookie_sGridStatusPlayer = '';
var g_Cookie_bPuzzleSolved = false;
var g_Cookie_bGridSolved = false;
var g_Cookie_bAnswersSolved = false;
var g_Cookie_CAB_sAnswerType = 'S|N|N|N|N|N|N|N|N|N|N|N|N|N|N|N|N|N|N|N|N|N|N|N|N|N'

function FromCookieParseContents(sCookie)
{
    let aOurValues = [];
    let iEqual = sCookie.indexOf("=");
    if ( iEqual != -1 )
    {
        let sCookieValue = sCookie.substring(iEqual + 1);
        aOurValues = sCookieValue.split(g_cCookieDelimiter);
    }
    return aOurValues;
}

function StoreCookie_Settings()
{
    let sCookieToAdd = MakeCookie_Settings()
    document.cookie = sCookieToAdd;
}

function GetAndSplitCookies()
{
    let s = document.cookie;
    if ( s == '' )
        return;
    g_aCookies = s.split(';');
    g_iCookies = g_aCookies.length;
}

function HandleSettingsCookieOnStart()
{
    let sOurCookieName_Settings = 'SG2' + '-Settings'; 
    let sOurCookie_Settings = '';
//
    for ( let iCookie = 0; iCookie < g_iCookies ; iCookie++)
    {
        let sThisCookie = g_aCookies[iCookie]
        if ( sThisCookie.includes(sOurCookieName_Settings) )
            sOurCookie_Settings = sThisCookie;
    }
    HandleCookie_Settings(sOurCookie_Settings);
}

function HandlePuzzleCookieOnStart(sPuzzleNumber)
{
    let sOurCookieName_Puzzle   = 'SG2' + '-' + sPuzzleNumber;
    let sOurCookie_Puzzle = '';
//
    for ( let iCookie = 0; iCookie < g_iCookies ; iCookie++)
    {
        let sThisCookie = g_aCookies[iCookie]
        if ( sThisCookie.includes(sOurCookieName_Puzzle) )
            sOurCookie_Puzzle = sThisCookie;
    }
    HandleCookie_Puzzle(sOurCookie_Puzzle);
}


function DeleteCookiesMatching(sMatch)
{
    let s = document.cookie;
    let aCookies = s.split(';');
    let iCookies = aCookies.length;
    for ( let iCookie = 0; iCookie < iCookies; iCookie++ )
    {
        let sThisCookie = aCookies[iCookie]
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
