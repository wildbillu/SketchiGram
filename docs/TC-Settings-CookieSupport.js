// TC-Settings-Support.js
// settings
var g_sSettings_Version = 'V01.03';
var g_bSettings_DeleteCookiesOnStartUp = false;
var g_bSettings_CAGR_Answers_CheckRow = false;
var g_bSettings_ShowInfoOnStart = false;//true; 
var g_bSettings_CAGR_Answers_ShowCorrectLetters = true;
var g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares = true;
var g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare = true;
var g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue = true;
var g_bSettings_CA_Display_ShowProgress = true; // not used now
var g_bSettings_GR_Display_ShowProgress = true; // not used now
var g_bSettings_CAGR_Display_Complete = true;
var g_iSettings_DaysToExpire = 30;

function HandleCookie_Settings(sOurCookie_Settings)
{
    if ( sOurCookie_Settings == '')
    {
//        setline('CS:EmptySettingsCookie');
        return;
    }
    var iEqual = sOurCookie_Settings.indexOf("=");
    if ( iEqual == -1 )
    {   
        setline('CS:cookiemissing=')
        return false;
    }
    var sCookieValue = sOurCookie_Settings.substring(iEqual + 1);
    var aOurValues = sCookieValue.split(g_cCookieDelimiter);
    var iOurValues = aOurValues.length;
    if ( iOurValues == 0 )
    {   
        setline('CS:NoValues')
        return false;
    }
    if ( aOurValues[0] != g_sSettings_Version )
    {
        setline('CS:UnsupportedVersion')
        return false;
    }
    var iMustHaveValues = 1;
    if ( g_sSettings_Version == 'V01.01' )
        iMustHaveValues = 12;
    if ( g_sSettings_Version == 'V01.02' )
        iMustHaveValues = 12;
    if ( g_sSettings_Version == 'V01.03' )
        iMustHaveValues = 14;
    if ( iOurValues != iMustHaveValues )
    {
        setline('CS:WrongNumberOfValues. Have:' + iOurValues + '.Need:' + iMustHaveValues)
        return false;
    }
    var iOurValue = 1;
    g_bSettings_DeleteCookiesOnStartUp = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Answers_CheckRow = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_ShowInfoOnStart = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Answers_ShowCorrectLetters = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CA_Display_ShowProgress = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_GR_Display_ShowProgress = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Display_Complete = IsTrue(aOurValues[iOurValue++]);
    g_Difficulty_iLevel_Settings = parseInt(aOurValues[iOurValue++]);
    g_Difficulty_iLevel_OnNewPuzzle = parseInt(aOurValues[iOurValue++]);
    g_iSettings_DaysToExpire = parseInt(aOurValues[iOurValue++]);
}

function MakeCookie_Settings()
{
    let sCookieName = 'SG2' + '-Settings'; 
    let sCookie = '';
    sCookie += g_sSettings_Version; 
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_DeleteCookiesOnStartUp;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Answers_CheckRow;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_ShowInfoOnStart;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Answers_ShowCorrectLetters;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CA_Display_ShowProgress;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_GR_Display_ShowProgress;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Display_Complete;
    sCookie += g_cCookieDelimiter; sCookie += g_Difficulty_iLevel_Settings;
    sCookie += g_cCookieDelimiter; sCookie += g_Difficulty_iLevel_OnNewPuzzle;
    sCookie += g_cCookieDelimiter; sCookie += g_iSettings_DaysToExpire;
//    
    const d = new Date();
    d.setTime(d.getTime() + (g_iSettings_DaysToExpire*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    var sFullCookie = sCookieName + "=" + sCookie + ";" + expires;// + ";path=/";
    return sFullCookie;
}
