// TC.Cookies.js

var g_iStoredPuzzleCookies = 0;

var g_aCookies = [];
var g_iCookies = 0;

function MakeAndStoreCookie_CurrentPuzzle()
{
    let sValue = g_sPuzzleNumber;
    if ( sValue == '' || sValue == g_PuzzlePath_sTemplate_ReplaceMe )
        sValue = 'none';
    let sCookieName = 'SG2' + '-CurrentPuzzle';
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
    let sCookieCurrentPuzzle = 'SG2' + '-CurrentPuzzle';
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
        return;
    g_aCookies = s.split(';');
    g_iCookies = g_aCookies.length;
}

function HandleCookiesOnStart()
{
    g_Cookie_DifficultyLevel_iLevel = -1;
//    
    let sOurCookieName_Puzzle   = 'SG2' + '-' + g_sPuzzleNumber;
    let sOurCookieName_Settings = 'SG2' + '-Settings'; 
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
var g_Cookie_SA_EB_sWordStatus = 'FFFFFFFFFFFF';
var g_Cookie_Puzzle_Version_sV1000 = 'V1.000';
var g_Cookie_Puzzle_Version_iCount = 13;

function HandleCookie_Puzzle(sOurCookie_Puzzle)
{
    g_Cookie_bValid = false;
    if ( sOurCookie_Puzzle == '')
        return;
    let iEqual = sOurCookie_Puzzle.indexOf("=");
    if ( iEqual == -1 )
        return;
    let sCookieValue = sOurCookie_Puzzle.substring(iEqual + 1);
    let aOurValues = [];
    aOurValues = sCookieValue.split(g_cCookieDelimiter);
    let iOurValues = aOurValues.length;
    let iIndex = 0;
    let sVersion = aOurValues[iIndex++]; //1
    if ( sVersion == g_Cookie_Puzzle_Version_sV1000 && iOurValues == g_Cookie_Puzzle_Version_iCount )
    {
        g_Cookie_sPuzzle = aOurValues[iIndex++]; 
        g_Cookie_sAnswersPlayer = aOurValues[iIndex++];
        g_Cookie_sStatusPlayer = aOurValues[iIndex++];
        g_Cookie_sGridAnswersPlayer = aOurValues[iIndex++];
        g_Cookie_sGridStatusPlayer = aOurValues[iIndex++];
        g_Cookie_bPuzzleSolved = IsTrue(aOurValues[iIndex++]);
        g_Cookie_bGridSolved = IsTrue(aOurValues[iIndex++]);
        g_Cookie_bAnswersSolved = IsTrue(aOurValues[iIndex++]);
        g_Cookie_SA_EB_sWords = aOurValues[iIndex++];
        g_Cookie_SA_EB_sWordStatus =  aOurValues[iIndex++];
        g_Cookie_ElapsedTime_iSecondsPrevious = parseInt(aOurValues[iIndex++]);
        g_Cookie_bValid = true;
        return;
    }
}

function StoreCookie_Puzzle()
{
// for CAB we need to wrap the player answers and status with the '|'
    let sAnswersPlayer = g_CAB_aAnswersPlayer.join('|');
    let sAnswersStatusPlayer = g_CAB_aAnswersPlayerStatus.join('|');
    let sGridAnswersPlayer = g_aGridAnswersPlayer.join('')
    let sGridStatusPlayer = g_aGridStatusPlayer.join('')
    let sCookieToAdd = MakeCookie_Puzzle(g_sPuzzleName, sAnswersPlayer, sAnswersStatusPlayer, sGridAnswersPlayer, sGridStatusPlayer)
    document.cookie = sCookieToAdd;
}

function MakeCookie_Puzzle(sPuzzleName, sAnswersPlayer, sStatusPlayer, sGridAnswersPlayer, sGridStatusPlayer)
{
    let sCookieName = 'SG2' + '-' + g_sPuzzleNumber;
    let sCookie = '';
    sCookie += g_Cookie_Puzzle_Version_sV1000; //0
     sCookie += g_cCookieDelimiter;
    sCookie += sPuzzleName;//1
     sCookie += g_cCookieDelimiter;
    sCookie += sAnswersPlayer;//2
     sCookie += g_cCookieDelimiter;
    sCookie += sStatusPlayer;//3
     sCookie += g_cCookieDelimiter;
    sCookie += sGridAnswersPlayer;//4
     sCookie += g_cCookieDelimiter;
    sCookie += sGridStatusPlayer//5
     sCookie += g_cCookieDelimiter;
//    sCookie += iSeconds;//6
//     sCookie += g_cCookieDelimiter;
    sCookie += g_bPuzzleSolved;//7
     sCookie += g_cCookieDelimiter;
    sCookie += g_bGridSolved;//8
     sCookie += g_cCookieDelimiter;
    sCookie += g_bAnswersSolved;//9
     sCookie += g_cCookieDelimiter;
    let SA_EB_sWords = g_SA_aWords.join(g_cGeneralDelimiter);
    sCookie += SA_EB_sWords;//10
     sCookie += g_cCookieDelimiter;
    sCookie += g_SA_sWordStatus//11
     sCookie += g_cCookieDelimiter;
    let iTotalTime = (g_ElapsedTime_iSecondsPrevious + g_ElapsedTime_iSecondsThisAttempt);
    sCookie += iTotalTime.toString();//12
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
