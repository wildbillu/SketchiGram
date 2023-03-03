// TC-GRBMS-MouseMove.js

var g_GRBMS_MM_Picked_Start_iLeft = 0;
var g_GRBMS_MM_Picked_Start_iTop = 0;

var g_GRBMS_MM_Picked_elem = null;
var g_GRBMS_MM_Picked_sId = '';
var g_GRBMS_MM_Picked_iRow = 0;
var g_GRBMS_MM_Picked_iLetter = 0;
var g_GRBMS_MM_Picked_bAlteredForMove = false;

var g_GRBMS_MM_iInitialX = 0;
var g_GRBMS_MM_iInitialY = 0;
//
var g_GRBMS_MM_Found_iRow = -1;
var g_GRBMS_MM_Found_iLetter = -1;
var g_GRBMS_MM_Found_sId = '';
var g_GRBMS_MM_Found_bMouseOut = false;

function TC_GRBMS_IsPickedLetterCorrectForFoundLocation(iPickedRow, iPickedLetter, iFoundRow, iFoundLetter)
{
    let cLetterPicked = GRB_ForRowLetter_GetAnswerPlayer(iPickedRow, iPickedLetter);
    let cLetterCorrectAnswer = GRB_ForRowLetter_GetAnswer(iFoundRow, iFoundLetter);
    let bCorrect = false;
    if ( cLetterPicked == cLetterCorrectAnswer )
        bCorrect = true;
    return bCorrect;
}

function TC_GRBMS_IndicatePickedLetterCorrectOrNot(iPickedRow, iPickedLetter, iFoundRow, iFoundLetter)
{
    let cLetterPicked = GRB_ForRowLetter_GetAnswerPlayer(iPickedRow, iPickedLetter);
    bCorrect = TC_GRBMS_IsPickedLetterCorrectForFoundLocation(iPickedRow, iPickedLetter, iFoundRow, iFoundLetter);
    let cStatusPlayer = g_TC_cCodeMeaning_Normal;
    let cCodeForActivity = g_TC_cCodeMeaning_HasFocusBeingMoved
    if ( bCorrect ) 
        cStatusPlayer = g_TC_cCodeMeaning_Correct;
    var sId = '';
    let bIsDualClueSquare = GRB_ForRowLetter_IsDualClueSquare(iRow, iLetter);
    sStatusImage = GRB_ButtonBackgroundImage(cLetterPicked, cStatusPlayer, 0, cCodeForActivity, bIsDualClueSquare)
    var sId = GRBMS_MakeId(iPickedRow, iPickedLetter)
    var elem = document.getElementById(sId);
    elem.style.backgroundImage = sStatusImage;
}

function GRBMS_PickingAdjustment(iRow, iLetter, iPickedX, iPickedY)
{
    let iBuffer = 6;
    let elemGrid = document.getElementById('Div_Grid');
    let rectGrid = elemGrid.getBoundingClientRect();
    let sId = GRBMS_MakeId(iRow, iLetter);
    let elemFound = document.getElementById(sId);
    let rectFound = elemFound.getBoundingClientRect();
    let elemFound_iLeft = Math.round(rectFound.left - rectGrid.left);
    let elemFound_iTop  = Math.round(rectFound.top -  rectGrid.top);
    let elemFound_iWidth = Math.round(rectFound.width);
    let elemFound_iHeight = Math.round(rectFound.height);
    let rectFoundRelative = new DOMRect(elemFound_iLeft, elemFound_iTop, elemFound_iWidth, elemFound_iHeight)
    let rectFoundRelativeWithBuffer = MakeRectWithBuffer(rectFoundRelative, iBuffer);
    let bWithin = IsPointWithinRect(rectFoundRelativeWithBuffer, iPickedX, iPickedY);
    return bWithin;
}

function GRBMS_mouseOut(e)
{
    if (!g_GRBMS_MM_Picked_elem) return;
    g_GRBMS_MM_Found_bMouseOut = true;
    GRBMS_mouseUp(e)
}


function TC_GRBMS_MouseFunctions(iRow, iLetter)
{
    var sFunctionsToCall = '';
    sFunctionsToCall += ' onmouseout="return GRBMS_mouseOut(event);" ';
    sFunctionsToCall += ' onmousedown="return GRBMS_onmousedown(event, ' + iRow + ',' + iLetter + ');" ';
    sFunctionsToCall += ' onfocus="GRBMS_onfocus(this);" ';
    sFunctionsToCall += ' onmousemove="GRBMS_mouseMove(event);" ';
    sFunctionsToCall += ' onmouseUp="GRBMS_mouseUp(event);" ';
    return sFunctionsToCall;
}

function GRBMS_mouseUp(event)
{
    if ( g_bGridSolved )
        return;
    if ( !g_GRBMS_MM_Picked_elem )
        return;
    let bDropped = false;
    if ( g_GRBMS_MM_Found_sId != '')
    {
        if ( !g_GRBMS_MM_Found_bMouseOut )
        {
            GRBMS_SwitchAnswers(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter, g_GRBMS_MM_Found_iRow, g_GRBMS_MM_Found_iLetter);
            bDropped = true;
        }
        GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Found_iRow, g_GRBMS_MM_Found_iLetter, g_TC_cCodeMeaning_Inactive);
        let elemFound = document.getElementById(GRBMS_MakeId(g_GRBMS_MM_Found_iRow, g_GRBMS_MM_Found_iLetter));
        elemFound.style.cursor="default";
        KB_Mini_SetInstructionLine('');        
    }
    // fix up the picked square then make nothing picked
    g_GRBMS_MM_Picked_elem.style.cursor="default";
    g_GRBMS_MM_Picked_elem.style.left = MakePixelString(g_GRBMS_MM_Picked_iLetter*g_GRBMS_Square_iSize);
    g_GRBMS_MM_Picked_elem.style.top = MakePixelString(g_GRBMS_MM_Picked_iRow*g_GRBMS_Square_iSize);
    g_GRBMS_MM_Picked_elem.style.zIndex = 0;
    GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter, g_TC_cCodeMeaning_Inactive);
    if ( g_GBRMS_MM_bAllowEntry && !bDropped ) 
    {
        g_GRBMS_Focus_sId = GRBMS_MakeId(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter);
        GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter, g_TC_cCodeMeaning_HasFocus);
        document.getElementById(g_GRBMS_Focus_sId).focus();
    }
    else
        g_GRBMS_Focus_sId = '';
//
    g_GRBMS_MM_Picked_iRow = -1;
    g_GRBMS_MM_Picked_iLetter = -1;
    g_GRBMS_MM_Picked_sId = '';
    g_GRBMS_MM_Picked_elem = null;
    g_GRBMS_MM_Picked_bAlteredForMove = false;
    g_GRBMS_MM_Found_iRow = -1;
    g_GRBMS_MM_Found_iLetter = -1;
    g_GRBMS_MM_Found_sId = '';
    Status_Check(false);
}

function GRBMS_mouseMove(e)
{
    if ( g_bGridSolved )
        return;
    if ( !g_GRBMS_MM_Picked_elem )
        return;
    if ( !g_GRBMS_MM_Picked_bAlteredForMove )
        GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter, g_TC_cCodeMeaning_HasFocusBeingMoved);
    g_GRBMS_MM_Picked_bAlteredForMove = true;
    let x = Math.round(e.clientX);
    let y = Math.round(e.clientY);
    let xMoved = x - g_GRBMS_MM_iInitialX;
    let yMoved = y - g_GRBMS_MM_iInitialY;
    g_GRBMS_MM_Picked_elem.style.position = "absolute";
    let iLeftRelative = g_GRBMS_MM_Picked_Start_iLeft + xMoved;
    let iTopRelative = g_GRBMS_MM_Picked_Start_iTop + yMoved;
    g_GRBMS_MM_Picked_elem.style.left = MakePixelString(iLeftRelative);
    g_GRBMS_MM_Picked_elem.style.top =  MakePixelString(iTopRelative);
    // now we look to see what is over the top     
    rect = g_GRBMS_MM_Picked_elem.getBoundingClientRect();
    a_elem = document.elementsFromPoint(rect.left, rect.top)
    let iE = 0;
    let bFound = false;
    while ( iE < a_elem.length && !bFound )
    {
        let sId = a_elem[iE].id;
        if ( sId == g_GRBMS_MM_Picked_sId && g_GRBMS_MM_Found_sId != '' )
        { // cant drop on invalid squares
            GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Found_iRow, g_GRBMS_MM_Found_iLetter, g_TC_cCodeMeaning_Inactive);
            g_GRBMS_MM_Found_iRow = -1;
            g_GRBMS_MM_Found_iLetter = -1;
            g_GRBMS_MM_Found_sId = '';
        }
        if ( sId.startsWith('GRBMSID_') && sId != g_GRBMS_MM_Picked_sId )
        {
            let iRow = GRBMS_RowFromId(sId);
            let iLetter = GRBMS_LetterFromId(sId);
            if ( GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter) )
            {
                if ( g_GRBMS_MM_Found_sId != '' )
                {
                    GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Found_iRow, g_GRBMS_MM_Found_iLetter, g_TC_cCodeMeaning_Inactive);
                }
                if ( GRBMS_PickingAdjustment(iRow, iLetter, iLeftRelative, iTopRelative) )
                {
                    bFound = true;
                    let bCorrectDrop = TC_GRBMS_IsPickedLetterCorrectForFoundLocation(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter, iRow, iLetter);
                    if ( !g_SG_AM_bSmartMovesOnly || bCorrectDrop )
                    {
                        g_GRBMS_MM_Found_iRow = iRow;
                        g_GRBMS_MM_Found_iLetter = iLetter;
                        g_GRBMS_MM_Found_sId = GRBMS_MakeId(iRow, iLetter);
                        GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Found_iRow, g_GRBMS_MM_Found_iLetter, g_TC_cCodeMeaning_ActiveRow);
                    }
                    if ( g_SG_AM_bIndicateCorrectMoves )
                        TC_GRBMS_IndicatePickedLetterCorrectOrNot(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter, iRow, iLetter);
                }
            }
        }
        iE++;
    }
    e.preventDefault();
}


function GRBMS_onmousedown(e, iRow, iLetter)
{
    e.preventDefault();
    if ( g_bGridSolved )
        return;
// cannot pick up black square or golden square
    if ( !GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter) )
        return;
    if ( g_GRBMS_Focus_sId != '' )
    {
        GRBMS_ForRowLetter_SetButton(GRBMS_RowFromId(g_GRBMS_Focus_sId), GRBMS_LetterFromId(g_GRBMS_Focus_sId), g_TC_cCodeMeaning_Inactive);
        g_GRBMS_Focus_sId = '';
    }
    g_GRBMS_MM_Found_bMouseOut = false;
    let cLetterBeingReplaced = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    KB_Mini_SetInstructionLine(cLetterBeingReplaced);
//
    g_GRBMS_MM_Picked_iRow = iRow;
    g_GRBMS_MM_Picked_iLetter = iLetter;
    g_GRBMS_MM_Picked_sId = GRBMS_MakeId(iRow, iLetter);
    g_GRBMS_MM_Picked_elem = document.getElementById(g_GRBMS_MM_Picked_sId);
    g_GRBMS_MM_Picked_elem.style.cursor="move";
    g_GRBMS_MM_iInitialX = Math.round(e.clientX);
    g_GRBMS_MM_iInitialY = Math.round(e.clientY);
    rect = g_GRBMS_MM_Picked_elem.getBoundingClientRect();
    rectBox = document.getElementById("Div_Grid").getBoundingClientRect();
    g_GRBMS_MM_Picked_Start_iLeft = Math.round(rect.left) - Math.round(rectBox.left);
    g_GRBMS_MM_Picked_Start_iTop = Math.round(rect.top) - Math.round(rectBox.top);
    g_GRBMS_MM_Picked_elem.style.zIndex  =  5;
}

