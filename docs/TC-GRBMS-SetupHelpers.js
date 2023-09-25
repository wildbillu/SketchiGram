// TC-GRBMS-SetupHelpers.js

function TC_GRB_MakeButton(iRow, iLetter)
{ // will determine itself whether blacksquare or has number
    let sHTMLId = GRB_MakeHTMLId(iRow, iLetter);
    let sInner = '';
    let sFunctionsToCall = '';
    sFunctionsToCall += TC_GRB_MouseFunctions_Consolidated(iRow, iLetter)
    sFunctionsToCall += TC_GRB_TouchFunctions_Consolidated(iRow, iLetter)
    sInner += '<DIV tabindex="0" ';
    sInner += sHTMLId;
    sInner += ' class="' + g_GRB_Square_sClass + '" '; 
    sInner += sFunctionsToCall;
    sInner += '></DIV>'
    return sInner;
}

// we cannot move the 'golden square' if there is one and we must remove that letter from the list of characters
function GRB_ChangeForbiddenCharactersToDot(sAllowedLetters, bReplaceCorrectAndCorrected)
{
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++ )
    {
        for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            if ( GRB_ForRowLetter_IsGoldenSquare(iRow, iLetter) )
            {
                sAllowedLetters = replaceAt(sAllowedLetters, iRow*g_iGridWidth+iLetter, '.') 
            }
            else
            {
                if ( !bReplaceCorrectAndCorrected )
                {
                    let cStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
                    if ( cStatus == g_cCode_Corrected || cStatus == g_cCode_Correct )
                    {
                        sAllowedLetters = replaceAt(sAllowedLetters, iRow*g_iGridWidth+iLetter, '.') 

                    }
                }
            }
        }
    }
    return sAllowedLetters;
}

