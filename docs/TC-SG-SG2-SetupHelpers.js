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
                let cSpecial = GRB_ForRowLetter_GetDualClueCode(iRow, iLetter);
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
    g_TC_iBiggestBottom += rectHeight;
    return rectHeight;
}

function SG_AdjustGridImage()
{
    var elemGridDiv = document.getElementById("Div_Grid");
    var rectGridDiv = elemGridDiv.getBoundingClientRect();
    var iWidthGrid = rectGridDiv.width;
// determine the width of things
    var iWidthRemaining = (g_TC_iBiggestRight - iWidthGrid - g_TC_Padding_Inter_Horizontal_iSize);
    var iWidth = 0.9 * iWidthRemaining;
    var iSpace = 0.05 * iWidthRemaining;
    var iLeft = rectGridDiv.right +  iSpace;
    var iTop = rectGridDiv.top;
    var elemGridImageDiv = document.getElementById("Div_Grid_Image")
    elemGridImageDiv.style.width = MakePixelString(iWidth);
    elemGridImageDiv.style.top = MakePixelString(iTop);
    elemGridImageDiv.style.left = MakePixelString(iLeft);
// these are relative to the box
    var elemGridExtraDiv = document.getElementById("Grid_Image_Extra")
    elemGridExtraDiv.style.width = MakePixelString(iWidth);
    elemGridExtraDiv.style.top = MakePixelString(5);
    elemGridExtraDiv.style.left = MakePixelString(0);
    fWidthToHeight = GetWidthToHeightRatioOfImageWithId("ThemeImage");
    var elemGridImageItselfDiv = document.getElementById("ThemeImage")
    elemGridImageItselfDiv.style.width = MakePixelString(iWidth);
    var iHeightImage = iWidth/fWidthToHeight;
    elemGridImageItselfDiv.style.height = MakePixelString(iHeightImage);
    elemGridImageItselfDiv.style.top = MakePixelString(25);
    elemGridImageItselfDiv.style.left = MakePixelString(0);
    elemGridImageDiv.style.height = iHeightImage + 30;
}

function SG_LoadGridImage()
{
    var sImage = '';
    sImage += '<DIV Id="Grid_Image_Extra" class="Div_Grid_Image_Extra">Click Image to Expand Dual Clue<DIV>';
    sImage += '<img Id="ThemeImage" class="Div_ThemeImage" onclick="TC_ShowExtraImage();" src="' + g_PuzzlePath_sName_Image + '" alt="BB" height="200"></img>';
    document.getElementById('Div_Grid_Image').innerHTML = sImage;
}

