// TC-SG-SG2-SetupHelpers.js

var g_SG_Clues_bCreated = false;
var g_SG_iExtraCluesShown = 0;

function SG_ShowExtraClue(bPreferSpecial)
{
    let GRBMS_Focus_sId_saved = g_GRBMS_Focus_sId;
    let aPossibleIds = [];
    let aPossibleSpecialIds = [];
    // change the first not correct clue - later do random
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            let bValid = GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter);
            if ( bValid )
            {
                let sId = GRBMS_MakeId(iRow, iLetter)
                aPossibleIds.push(sId);
                let cSpecial = GRB_ForRowLetter_GetSpecialClueCode(iRow, iLetter);
                if ( cSpecial != g_cCode_AnswerType_Normal ) aPossibleSpecialIds.push(sId);
            }
        }
    }
    let iValids = aPossibleIds.length;
    if ( iValids == 0 )
        return false;
    iValidsSpecial = aPossibleSpecialIds.length;
//
    let iRandom = TC_GetRandomInt(iValids);
    let sIdToFix = aPossibleIds[iRandom];
    if ( bPreferSpecial && iValidsSpecial != 0)     
    {
        iRandom = TC_GetRandomInt(iValidsSpecial);
        sIdToFix = aPossibleSpecialIds[iRandom];
    }
    let iRowFound = GRBMS_RowFromId(sIdToFix);
    let iLetterFound = GRBMS_LetterFromId(sIdToFix);
    SG_FixSquare(iRowFound, iLetterFound);
    if ( GRBMS_Focus_sId_saved != '' )
        document.getElementById(GRBMS_Focus_sId_saved).focus();
    Status_Check(true);
}

function SG_FixSquare(iRowFound, iLetterFound)
{
    let cCorrect = GRB_ForRowLetter_GetAnswer(iRowFound, iLetterFound);
    let cNow = GRB_ForRowLetter_GetAnswerPlayer(iRowFound, iLetterFound);
    let bRejectCorrectSquares = true;
    let sIdReplaced = GRBMS_ReplaceMeReturnFoundId(iRowFound, iLetterFound, cCorrect, bRejectCorrectSquares, cNow)
    // we need to set this one as corrected    
    GRB_ForRowLetter_SetStatusPlayer(g_cCode_Corrected, iRowFound, iLetterFound);
    GRBMS_ForRowLetter_SetButton(iRowFound, iLetterFound, g_cCode_Inactive);
// in case we fixed the replaced one
    let iRowReplaced = GRBMS_RowFromId(sIdReplaced);
    let iLetterReplaced = GRBMS_LetterFromId(sIdReplaced);
    let cAnswerReplaced = GRB_ForRowLetter_GetAnswer(iRowReplaced, iLetterReplaced);
    let cAnswerPlayerReplaced = GRB_ForRowLetter_GetAnswerPlayer(iRowReplaced, iLetterReplaced);
    if ( cAnswerReplaced == cAnswerPlayerReplaced )
    {
        GRB_ForRowLetter_SetStatusPlayer(g_cCode_Corrected, iRowReplaced, iLetterReplaced);
        GRBMS_ForRowLetter_SetButton(iRowReplaced, iLetterReplaced, g_cCode_Inactive);
    }
    g_GRBMS_Focus_sId = '';
}

function TC_MoveTopAndAdjustBiggestBottom(sId, iTop)
{
    let elem = document.getElementById(sId);
    let rect = elem.getBoundingClientRect();
    let rectHeight = rect.height;
    elem.style.top = MakePixelString(iTop);
//    g_TC_iBiggestBottom += rectHeight;
    return rectHeight;
}



