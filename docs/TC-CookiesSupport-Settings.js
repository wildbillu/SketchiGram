// TC-CookiesSupport-Settings.js
// settings

var g_sSettings_Versions_aNames  = [];
var g_sSettings_Versions_aCounts = [];
var g_sSettings_Version_Current_iIndex    = 0;
var g_bSettings_ShowInfoOnStart = false;

function Settings_SetupVersions()
{ // we are not going to support old versions
    g_sSettings_Versions_aNames.push('V01.05'); g_sSettings_Versions_aCounts.push(3); 
}

var g_bSettings_CAGR_Display_Complete = true;
var g_iSettings_DaysToExpire = 30;

function HandleCookie_Settings(sOurCookie_Settings)
{
    if ( sOurCookie_Settings == '')
        return;
    let iEqual = sOurCookie_Settings.indexOf("=");
    if ( iEqual == -1 )
    {   
        setline('CS:cookiemissing=')
        return false;
    }
    let sCookieValue = sOurCookie_Settings.substring(iEqual + 1);
    let aOurValues = sCookieValue.split(g_cCookieDelimiter);
    let iOurValues = aOurValues.length;
    if ( iOurValues == 0 )
        return;
    let sVersionRead = aOurValues[0];
    let iVersionIndex = -1;
    for ( let i = 0; i < g_sSettings_Versions_aNames.length; i++ )
    {
        if ( g_sSettings_Versions_aNames[i] == sVersionRead )
            iVersionIndex = i;
    }
    if ( iVersionIndex == -1 )
        return false;
    if ( iOurValues != g_sSettings_Versions_aCounts[iVersionIndex] )
    {
        setline('CS:WrongNumberOfValues. Have:' + iOurValues + '.Need:' + g_sSettings_Versions_aCounts[iVersionIndex])
        return false;
    }
    let iOurValue = 1;
    g_bSettings_CAGR_Display_Complete = IsTrue(aOurValues[iOurValue++]);
    g_TC_Archive_Cookie_iSize = aOurValues[iOurValue++];
    g_TC_Archive_Cookie_sYearMonth = aOurValues[iOurValue++];
}

function MakeCookie_Settings()
{
    let sCookieName = 'SG2' + '-Settings'; 
    let sCookie = '';
    sCookie += g_sSettings_Versions_aNames[g_sSettings_Version_Current_iIndex];
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Display_Complete;
    sCookie += g_cCookieDelimiter; sCookie += g_TC_Archive_Cookie_iSize;
    sCookie += g_cCookieDelimiter; sCookie += g_TC_Archive_Cookie_sYearMonth;
//    
    const d = new Date();
    d.setTime(d.getTime() + (g_iSettings_DaysToExpire*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    var sFullCookie = sCookieName + "=" + sCookie + ";" + expires;// + ";path=/";
    return sFullCookie;
}

