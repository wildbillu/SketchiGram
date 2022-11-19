// TC-GRBMS-SetupHelpers.js

// we cannot move the 'golden square' if there is one and we must remove that letter from the list of characters
function GRB_ChangeForbiddenCharactersToDot(sAllowedLetters, bReplaceCorrectAndCorrected)
{
    for ( var iRow = 0; iRow < g_iGridHeight; iRow++ )
    {
        for ( var iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
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
                    if ( cStatus == g_TC_cCodeMeaning_Corrected || cStatus == g_TC_cCodeMeaning_Correct )
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
    var sPlaced = '';
    var sGridAsString = g_aGridAnswers.join('');
    let sAllLettersToPlace = sGridAsString;
    sGridAsString = GRB_ChangeForbiddenCharactersToDot(sGridAsString, bReplaceCorrectAndCorrected)
    var sNoDots = '';
let iMaxCheck = 0;
    for ( var i=0; i< sGridAsString.length; i++)
        if ( sGridAsString.charAt(i) != '.' ) sNoDots += sGridAsString.charAt(i);
    for ( var iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( var iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            let cStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter)
            let bMoveThisOne = true;
            if ( !bReplaceCorrectAndCorrected )
            {
                if ( cStatus == g_TC_cCodeMeaning_Corrected )
                    bMoveThisOne = false;
                if ( cStatus == g_TC_cCodeMeaning_Correct )
                    bMoveThisOne = false;
            }
            if ( GRB_ForRowLetter_IsSquareGoldenOrBlack(iRow, iLetter) )
                bMoveThisOne = false;
            if ( bMoveThisOne )
            {
                let iCheck = 0;
                var bReplaced = false;
                while ( !bReplaced )
                {
                    var iV = sNoDots.length;
                    var iP = Math.floor(Math.random() * iV);
                    var cLetter = sNoDots.charAt(iP)
                    var sAnswerPlayer = g_aGridAnswersPlayer[iRow];
                    var cAnswer = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
                    if ( cLetter != cAnswer || iCheck > 200)
                    {
                        sPlaced += cLetter;
                        g_aGridAnswersPlayer[iRow] = replaceAt(sAnswerPlayer, iLetter, cLetter);
                        var sNew = sNoDots.substring(0, iP);
                        sNew += sNoDots.substring(iP+1)
                        sNoDots = sNew;
                        GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Normal, iRow, iLetter);
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
setlineAdd(iMaxCheck + '|')
}

