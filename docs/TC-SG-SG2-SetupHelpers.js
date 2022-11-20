// TC-SG-SG2-SetupHelpers.js

var g_SG_Clues_bCreated = false;
var g_SG_iExtraCluesShown = 0;

function SG_ShowExtraClue()
{
    if ( g_SG_iExtraCluesShown > 0 )
        return;
    let GRBMS_Focus_sId_saved = g_GRBMS_Focus_sId;
    let aPossibleIds = [];
    // change the first not correct clue - later do random
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            let bValid = GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter);
            if ( bValid )
            {
                aPossibleIds.push(GRBMS_MakeId(iRow, iLetter) );
            }
        }
    }
    let iValids = aPossibleIds.length;
    if ( iValids == 0 )
        return false;
    let iRandom = TC_GetRandomInt(iValids);
    let sIdToFix = aPossibleIds[iRandom];
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
    GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Corrected, iRowFound, iLetterFound);
    GRBMS_ForRowLetter_SetButton(iRowFound, iLetterFound, g_TC_cCodeMeaning_Inactive);
// in case we fixed the replaced one
    let iRowReplaced = GRBMS_RowFromId(sIdReplaced);
    let iLetterReplaced = GRBMS_LetterFromId(sIdReplaced);
    let cAnswerReplaced = GRB_ForRowLetter_GetAnswer(iRowReplaced, iLetterReplaced);
    let cAnswerPlayerReplaced = GRB_ForRowLetter_GetAnswerPlayer(iRowReplaced, iLetterReplaced);
    if ( cAnswerReplaced == cAnswerPlayerReplaced )
    {
        GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Corrected, iRowReplaced, iLetterReplaced);
        GRBMS_ForRowLetter_SetButton(iRowReplaced, iLetterReplaced, g_TC_cCodeMeaning_Inactive);
    }
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

function SG_ActionMenu_SizeAndPosition()
{
    var elemGridImageDiv = document.getElementById("Div_Grid_Image");
    var rectGridImageDiv = elemGridImageDiv.getBoundingClientRect();
    var iTop = rectGridImageDiv.bottom + g_TC_Padding_Inter_Vertical_iSize;
    var iLeft = rectGridImageDiv.left;
    var iWidth = rectGridImageDiv.width;
    var elemActionMenuDiv = document.getElementById("SG_ActionMenu_Div")
    elemActionMenuDiv.style.top = MakePixelString(iTop);
    elemActionMenuDiv.style.left = MakePixelString(iLeft);
    elemActionMenuDiv.style.width = MakePixelString(iWidth);
    iTotalHeight = SG_ActionMenu_FixWidthsReturnHeight(iWidth);
    elemActionMenuDiv.style.height = MakePixelString(iTotalHeight);
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
    var elemPuzzleDualClue = document.getElementById("Div_PuzzleDualClue");
    if ( elemPuzzleDualClue )
    {
        iTop = elemPuzzleDualClue.getBoundingClientRect().bottom + g_TC_Padding_Inter_Vertical_iSize;
    }
    var elemGridImageDiv = document.getElementById("Div_Grid_Image")
    elemGridImageDiv.style.width = MakePixelString(iWidth);
    elemGridImageDiv.style.top = MakePixelString(iTop);
    elemGridImageDiv.style.left = MakePixelString(iLeft);
// these are relative to the box
    var elemGridExtraDiv = document.getElementById("Grid_Image_Extra")
    elemGridExtraDiv.style.width = MakePixelString(iWidth);
    elemGridExtraDiv.style.top = MakePixelString(5);
    elemGridExtraDiv.style.left = MakePixelString(0);
    fWidthToHeight = GetWidthToHeightRatioOfImageWithId("Grid_Image_Itself");
    var elemGridImageItselfDiv = document.getElementById("Grid_Image_Itself")
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
    sImage += '<img Id="Grid_Image_Itself" class="Div_Grid_Image_Itself" onclick="TC_ShowExtraImage();" src="' + g_PuzzlePath_sThisPuzzle_Image + '" alt="BB" height="200"></img>';
    document.getElementById('Div_Grid_Image').innerHTML = sImage;
}

function SG_Adjust_KBAndIntro(iKBRows)
{
    var iWidthGrid = g_iGridWidth * g_GRBMS_Square_iSize;
    //
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
    var elem_KB = document.getElementById('KB_Mini_Div');
    elem_KB.style.top = MakePixelString(g_TC_iBiggestBottom);
    elem_KB.style.width = MakePixelString(iWidthGrid);
    elem_KB.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    var elemButtonDiv = document.getElementById("KB_Mini_ButtonRow_Div");
    elemButtonDiv.style.width = MakePixelString(iWidthGrid);
    var elemInstructionsDiv = document.getElementById("KB_Mini_Instructions_Div");
    elemInstructionsDiv.style.width = MakePixelString(iWidthGrid);
    var rectInstructionsDiv = elemInstructionsDiv.getBoundingClientRect();
    elem_KB.style.height = MakePixelString(iKBRows * 42 + rectInstructionsDiv.height);// fix this?
    var rect_KB = elem_KB.getBoundingClientRect();
    g_TC_iBiggestBottom += rect_KB.height;
}

function SG_Adjust_GridAndPhantomGridPosition()
{
    var elemGrid = document.getElementById('Div_Grid');
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
    elemGrid.style.top = MakePixelString(g_TC_iBiggestBottom)
    var iWidthGrid = g_iGridWidth * g_GRBMS_Square_iSize;
    var iHeightGrid = g_iGridHeight * g_GRBMS_Square_iSize;
    elemGrid.style.width = MakePixelString(iWidthGrid);
    elemGrid.style.height = MakePixelString(iHeightGrid);
// put grid to left
    elemGrid.style.left = MakePixelString(g_TC_Padding_Left_iSize);
// now the phantom grid
    let elemGrid_Phantom = document.getElementById('Div_Grid_Phantom');
    elemGrid_Phantom.style.top = MakePixelString(g_TC_iBiggestBottom);
    elemGrid_Phantom.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    g_TC_iBiggestBottom += iHeightGrid;
}

function SG_SetSizes()
{
// decide on button size based upon grid size
// looking for the grid to be around 200
// our choices are 40, 50, 60 
// allow grid to be 75% of width
    var iMaxGridWidth = 0.75 * g_TC_iBiggestRight;
    var iButtonSize = Math.round(iMaxGridWidth/g_iGridWidth);
//
    g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_40 TC_Button_Square_Absolute';
    g_GRBMS_Square_iSize = 40;
    if ( iButtonSize > 49 )
    {
        g_GRBMS_Square_iSize = 50;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_50 TC_Button_Square_Absolute';
    }
    if ( iButtonSize > 59 )
    {
        g_GRBMS_Square_iSize = 60;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_60 TC_Button_Square_Absolute';
    }
    if ( iButtonSize > 69 )
    {
        g_GRBMS_Square_iSize = 70;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_70 TC_Button_Square_Absolute';
    }
    if ( iButtonSize > 79 )
    {
        g_GRBMS_Square_iSize = 80;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_80 TC_Button_Square_Absolute';
    }
// we can alter CAB size here also
    g_GRBMS_CAB_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_30 TC_Button_Square_Relative';
    g_GRBMS_CAB_Square_iSize = 30;    
}
