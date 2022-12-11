// TC.Cookies.js

var g_iStoredPuzzleCookies = 0;

var g_aCookies = [];
var g_iCookies = 0;

function MakeAndStoreCookie_CurrentPuzzle()
{
    let sValue = g_sPuzzleNumber;
    if ( sValue == '' || sValue == g_PuzzlePath_sTemplate_ReplaceMe )
        sValue = 'none';
    let sCookieName = g_sPuzzleType + '-CurrentPuzzle';
    let sCookie = '';
    sCookie += sValue;
    let exdays = 365;
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    let sFullCookie = sCookieName + "=" + sCookie + ";" + expires;
    document.cookie = sFullCookie;
}

function FromCookies_GetCurrentPuzzle()
{
    g_TC_sPuzzle_Cookie = '';
    let sCookieCurrentPuzzle = g_sPuzzleType + '-CurrentPuzzle';
    for ( let iCookie = 0; iCookie < g_iCookies ; iCookie++)
    {
        let sThisCookie = g_aCookies[iCookie];
        if ( sThisCookie.includes(sCookieCurrentPuzzle) )
        {
            let aOurValues = FromCookieParseContents(sThisCookie)
            if ( aOurValues.length == 1 )
            {
                g_TC_sPuzzle_Cookie = aOurValues[0];
                if ( g_TC_sPuzzle_Cookie == 'none')
                    g_TC_sPuzzle_Cookie = '';
            }
        }
    }
}

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
    var sCookieToAdd = MakeCookie_Settings()
    document.cookie = sCookieToAdd;
}

function GetAndSplitCookies()
{
    let s = document.cookie;
    if ( s == '' )
    {
        setlineAdd('NoCookies.') 
        return;
    }
    g_aCookies = s.split(';');
    g_iCookies = g_aCookies.length;
}

function HandleCookiesOnStart()
{
    g_Cookie_DifficultyLevel_iLevel = -1;
//    
    let sOurCookieName_Puzzle   = g_sPuzzleType + '-' + g_sPuzzleNumber;
    let sOurCookieName_Settings = g_sPuzzleType + '-Settings'; 
    let sOurCookie_Puzzle = '';
    let sOurCookie_Settings = '';
//
    for ( let iCookie = 0; iCookie < g_iCookies ; iCookie++)
    {
        let sThisCookie = g_aCookies[iCookie]
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
var g_Cookie_SA_EB_sWords = '||||||||||||';
var g_Cookie_DifficultyLevel_iLevel = -1;
var g_Cookie_SA_EB_sWordStatus = 'FFFFFFFFFFFF';


function HandleCookie_Puzzle(sOurCookie_Puzzle)
{
    if ( sOurCookie_Puzzle == '')
        return;
    let iEqual = sOurCookie_Puzzle.indexOf("=");
    if ( iEqual == -1 )
        return false;
    let sCookieValue = sOurCookie_Puzzle.substring(iEqual + 1);
    let aOurValues = [];
    aOurValues = sCookieValue.split(g_cCookieDelimiter);
    let iOurValues = aOurValues.length;
    if ( iOurValues != 14 )
        return false;
    g_Cookie_sPuzzle = aOurValues[0];
    g_Cookie_sAnswersPlayer = aOurValues[1];
    g_Cookie_sStatusPlayer = aOurValues[2];
    g_Cookie_sGridAnswersPlayer = aOurValues[3];
    g_Cookie_sGridStatusPlayer = aOurValues[4];
    g_Cookie_bPuzzleSolved = IsTrue(aOurValues[6]);
    g_Cookie_bGridSolved = IsTrue(aOurValues[7]);
    g_Cookie_bAnswersSolved = IsTrue(aOurValues[8]);
    g_Cookie_SA_EB_sWords = aOurValues[9];
    g_Cookie_DifficultyLevel_iLevel = aOurValues[10];
    g_Cookie_SA_EB_sWordStatus =  aOurValues[11];
    g_Cookie_ElapsedTime_iSecondsPrevious = parseInt(aOurValues[12]);
    g_Cookie_bValid = true;
}

function StoreCookie_Puzzle()
{
// for CAB we need to wrap the player answers and status with the '|'
    var sAnswersPlayer = g_aAnswersPlayer.join('|');
    var sAnswersStatusPlayer = g_aAnswersStatusPlayer.join('|');
    var sGridAnswersPlayer = g_aGridAnswersPlayer.join('')
    var sGridStatusPlayer = g_aGridStatusPlayer.join('')
    var sCookieToAdd = MakeCookie_Puzzle(g_sPuzzleName, sAnswersPlayer, sAnswersStatusPlayer, sGridAnswersPlayer, sGridStatusPlayer, 0)
    document.cookie = sCookieToAdd;
//    setlineAdd('CPS:' + ++g_iStoredPuzzleCookies);
}

function MakeCookie_Puzzle(sPuzzleName, sAnswersPlayer, sStatusPlayer, sGridAnswersPlayer, sGridStatusPlayer, iSeconds)
{
    var sCookieName = g_sPuzzleType + '-' + g_sPuzzleNumber;
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
    let SA_EB_sWords = g_SA_EB_aWords.join(g_TC_cGeneralDelimiter);
    sCookie += g_cCookieDelimiter;
    sCookie += SA_EB_sWords;
    sCookie += g_cCookieDelimiter;
    sCookie += g_DifficultyLevel_iLevel;
    sCookie += g_cCookieDelimiter;
    sCookie += g_SA_EB_sWordStatus
    sCookie += g_cCookieDelimiter;
    let iTotalTime = (g_ElapsedTime_iSecondsPrevious + g_ElapsedTime_iSecondsThisAttempt);
    sCookie += iTotalTime.toString();
    sCookie += g_cCookieDelimiter;
    sCookie += 99;
    //
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
