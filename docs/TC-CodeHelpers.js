// TC-CodeHelpers.js

function TC_CorrectOrGolden(cLetter)
{
    if (cLetter == g_cCode_Correct || cLetter == g_cCode_Golden )
        return true;
    return false;
}

function TC_IsBlackSquare(cLetter)
{
    if (cLetter == g_cCode_BlackSquare )
        return true;
    return false;
}

function TC_CorrectCorrectedOrGolden(cLetter)
{
    if ( cLetter == g_cCode_Corrected || cLetter == g_cCode_Correct || cLetter == g_cCode_Golden )
        return true;
    return false;
}

function CharValidEntry(cLetter) 
{
    if ( cLetter != '' && cLetter !=' ' && cLetter != g_cCode_MeaningNotSet )
        return true;
    return false;
}

function IfCharNotSet(cLetter) 
{
    if ( cLetter != '' && cLetter !=' ' && cLetter != g_cCode_MeaningNotSet )
        return true;
    return false;
}