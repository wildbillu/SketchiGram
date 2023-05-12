// TC-GRBMS-SetupHelpers.js

function TC_GRBMS_MakeButton(iRow, iLetter)
{ // will determine itself whether blacksquare or has number
    let sHTMLId = GRBMS_MakeHTMLId(iRow, iLetter);
    let sInner = '';
    let sFunctionsToCall = '';
    sFunctionsToCall += TC_GRBMS_MouseFunctions_Consolidated(iRow, iLetter)
    sFunctionsToCall += TC_GRBMS_TouchFunctions_Consolidated(iRow, iLetter)
    sFunctionsToCall += ' onkeypress="return GRBMS_onkeypress(event);" ';
    sFunctionsToCall += ' onkeyup="return GRBMS_onkeyup(event.key,' + iRow + ',' + iLetter + ');"';
    sInner += '<DIV tabindex="0" ';
    sInner += sHTMLId;
    sInner += ' class="' + g_GRBMS_Square_sClass + '" '; 
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
//                var cGoldenLetter = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
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

function GRBMS_ScrambleCorrectAnswersToPlayer(bReplaceCorrectAndCorrected)
{ // reconstitute the string
    let sPlaced = '';
    let sGridAsString = g_aGridAnswers.join('');
    let sAllLettersToPlace = sGridAsString;
    sGridAsString = GRB_ChangeForbiddenCharactersToDot(sGridAsString, bReplaceCorrectAndCorrected)
    let sNoDots = '';
    let iMaxCheck = 0;
    sNoDots = removeAllChar(sGridAsString, '.');
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            let cStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter)
            let bMoveThisOne = true;
            if ( !bReplaceCorrectAndCorrected )
            {
                if ( cStatus == g_cCode_Corrected )
                    bMoveThisOne = false;
                if ( cStatus == g_cCode_Correct )
                    bMoveThisOne = false;
            }
            if ( GRB_ForRowLetter_IsSquareGoldenOrBlack(iRow, iLetter) )
                bMoveThisOne = false;
            if ( bMoveThisOne )
            {
                let iCheck = 0;
                let bReplaced = false;
                while ( !bReplaced )
                {
                    let iV = sNoDots.length;
                    let iP = Math.floor(Math.random() * iV);
                    let cLetter = sNoDots.charAt(iP)
                    let sAnswerPlayer = g_aGridAnswersPlayer[iRow];
                    let cAnswer = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
                    if ( cLetter != cAnswer || iCheck > 200)
                    {
                        sPlaced += cLetter;
                        g_aGridAnswersPlayer[iRow] = replaceAt(sAnswerPlayer, iLetter, cLetter);
                        let sNew = sNoDots.substring(0, iP);
                        sNew += sNoDots.substring(iP+1)
                        sNoDots = sNew;
                        GRB_ForRowLetter_SetStatusPlayer(g_cCode_Normal, iRow, iLetter);
                        if ( g_bSettings_CAGR_Answers_ShowCorrectLetters )
                        {
                            GRBMS_ForRowLetterShowCheckSquare(iRow, iLetter, 'Check', false);
                        }
                        bReplaced = true;
                    }
                    iCheck++;
                }
                if ( iCheck > iMaxCheck )
                    iMaxCheck = iCheck;
            }
            else
            {
                sPlaced += GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
            }
        }
    }         
    let iLettersPlaced = sPlaced.length;
    let iAllLettersToPlace = sAllLettersToPlace.length;
    if ( iLettersPlaced != iAllLettersToPlace)
        alert('Mismatch.Placed:' + iLettersPlaced + 'ToPlace:' + iAllLettersToPlace)
}

