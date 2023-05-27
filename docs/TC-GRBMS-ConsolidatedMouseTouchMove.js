// TC-GRBMS-ConsolidatedMouseTouchMove.js

var g_GRBMS_MoveActive_sMouse = 'Mouse';
var g_GRBMS_MoveActive_sTouch = 'Touch';
var g_GRBMS_MoveActive_sNoOne = 'NoOne';

var g_GRBMS_Move_sActive = g_GRBMS_MoveActive_sNoOne;

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

function GRBMS_MT_Down(e, iRow, iLetter, sWho)
{
    g_GRBMS_Move_sActive = sWho;
    GRBMS_ondown(e, iRow, iLetter);
}

function GRBMS_ondown(e, iRow, iLetter)
{
    e.preventDefault();
    if ( g_bGridSolved )
        return;
// can never pick up black square or golden square
    let cStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter)
    if ( TC_IsGoldenOrBlackSquare(cStatus) )
        return;
// can never pick up a corrected square (they will not exist in Expert Mode)        
    if ( TC_IsCorrected(cStatus) )
        return;
    if ( !g_bAllowCorrectLettersToChange && TC_IsCorrect(cStatus) )
    {
        return;
    }
    let sId = GRBMS_MakeId(iRow, iLetter)
    let elem = document.getElementById(sId);
    GRBMS_onfocus(elem);
    g_GRBMS_MM_Found_bMouseOut = false;
    GRBMS_ForRowLetter_SetButton(iRow, iLetter, g_cCode_HasFocus);
    let cLetterBeingReplaced = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    KB_Mini_SetInstructionLine(cLetterBeingReplaced);
//
    g_GRBMS_MM_Picked_iRow = iRow;
    g_GRBMS_MM_Picked_iLetter = iLetter;
    g_GRBMS_MM_Picked_sId = GRBMS_MakeId(iRow, iLetter);
    g_GRBMS_MM_Picked_elem = document.getElementById(g_GRBMS_MM_Picked_sId);
    g_GRBMS_MM_Picked_elem.style.cursor="move";
    if ( g_GRBMS_Move_sActive == g_GRBMS_MoveActive_sMouse )
    {
        g_GRBMS_MM_iInitialX = Math.round(e.clientX);
        g_GRBMS_MM_iInitialY = Math.round(e.clientY);
    }
    else if ( g_GRBMS_Move_sActive == g_GRBMS_MoveActive_sTouch )
    {
        g_GRBMS_MM_iInitialX = Math.round(e.touches[0].clientX);
        g_GRBMS_MM_iInitialY = Math.round(e.touches[0].clientY);
    }
    rect = g_GRBMS_MM_Picked_elem.getBoundingClientRect();
    rectBox = GetBoundingClientRectAbsolute(document.getElementById("Div_Grid"));
    g_GRBMS_MM_Picked_Start_iLeft = Math.round(rect.left) - Math.round(rectBox.left);
    g_GRBMS_MM_Picked_Start_iTop = Math.round(rect.top) - Math.round(rectBox.top);
//
    g_GRBMS_MM_Picked_elem.style.zIndex  =  5;
    SyncTo_OthersLoseFocus('GR')
}

function GRBMS_mouseUp(event)
{
    if ( g_bGridSolved )
        return;
    if ( !g_GRBMS_MM_Picked_elem )
        return;
    if ( g_GRBMS_MM_Found_sId == '' || g_GRBMS_MM_Found_bMouseOut )
    {
        g_GRBMS_MM_Picked_elem.style.cursor="default";
        g_GRBMS_MM_Picked_elem.style.left = MakePixelString(g_GRBMS_MM_Picked_iLetter*g_GRBMS_Square_iSize);
        g_GRBMS_MM_Picked_elem.style.top = MakePixelString(g_GRBMS_MM_Picked_iRow*g_GRBMS_Square_iSize);
        g_GRBMS_MM_Picked_elem.style.zIndex = 0;
        GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter, g_cCode_HasFocus);
        GRBMS_clearPickedAndFoundVariables();
        return;   
    }
    GRBMS_SwitchAnswers(g_GRBMS_MM_Found_iRow, g_GRBMS_MM_Found_iLetter, g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter); // new
    bDropped = true;
    GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Found_iRow, g_GRBMS_MM_Found_iLetter, g_cCode_Inactive);
    let elemFound = document.getElementById(GRBMS_MakeId(g_GRBMS_MM_Found_iRow, g_GRBMS_MM_Found_iLetter));
    elemFound.style.cursor="default";
    KB_Mini_SetInstructionLine('');        
    // fix up the picked square then make nothing picked
    g_GRBMS_MM_Picked_elem.style.cursor="default";
    g_GRBMS_MM_Picked_elem.style.left = MakePixelString(g_GRBMS_MM_Picked_iLetter*g_GRBMS_Square_iSize);
    g_GRBMS_MM_Picked_elem.style.top = MakePixelString(g_GRBMS_MM_Picked_iRow*g_GRBMS_Square_iSize);
    g_GRBMS_MM_Picked_elem.style.zIndex = 0;
    GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter, g_cCode_Inactive);
    GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter, g_cCode_HasFocus);
    GRBMS_ForAll_SetStatusFromState()
    GRBMS_MoveToNextAvailable(g_GRBMS_MM_Found_iRow, g_GRBMS_MM_Found_iLetter)
    GRBMS_clearPickedAndFoundVariables();
    Status_Check(false);
}

function GRBMS_mouseMove_New(e)
{
    if ( g_bGridSolved )
        return;
    if ( !g_GRBMS_MM_Picked_elem )
        return;
    if ( !g_GRBMS_MM_Picked_bAlteredForMove )
       TC_GRBMS_SetPickedForMove(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter)
    g_GRBMS_MM_Picked_bAlteredForMove = true;
// this is the part that moves the active square    
    let x = 0.0;
    let y = 0.0;
    let xMoved = 0;
    let yMoved = 0;
    if ( g_GRBMS_Move_sActive == g_GRBMS_MoveActive_sMouse )
    {
        x = Math.round(e.clientX);
        y = Math.round(e.clientY);
        xMoved = x - g_GRBMS_MM_iInitialX;
        yMoved = y - g_GRBMS_MM_iInitialY;
    }
    else if ( g_GRBMS_Move_sActive == g_GRBMS_MoveActive_sTouch )
    {
        x = Math.round(e.touches[0].clientX);
        y = Math.round(e.touches[0].clientY);
        xMoved = x - g_GRBMS_MM_iInitialX;
        yMoved = y - g_GRBMS_MM_iInitialY;
    }
    else
    g_GRBMS_MM_Picked_elem.style.position = "absolute";
    let iLeftRelative = g_GRBMS_MM_Picked_Start_iLeft + xMoved;
    let iTopRelative = g_GRBMS_MM_Picked_Start_iTop + yMoved;
    g_GRBMS_MM_Picked_elem.style.left = MakePixelString(iLeftRelative);
    g_GRBMS_MM_Picked_elem.style.top =  MakePixelString(iTopRelative);
// now we look to see what is over the top     
    let rectActive = GetBoundingClientRectAbsolute(g_GRBMS_MM_Picked_elem);
// this is where it gets the point to the middle
    let FindElements_iX = rectActive.left + g_GRBMS_Square_iSize/2; 
    let FindElements_iY = rectActive.top + g_GRBMS_Square_iSize/2; 
    FindElements_iX += window.scrollX;
    FindElements_iY += window.scrollY;
//
    a_elem = document.elementsFromPoint(FindElements_iX, FindElements_iY)
    let iE = 0;
    let bFound = false;
    let iElements = a_elem.length;
    let sElemId = ""
    for( let ii = 0; ii < iElements; ii++){sElemId += a_elem[ii].id + '|';}
    while ( iE < iElements && !bFound )
    {
        let sId = a_elem[iE].id;
        if ( sId.startsWith('GRBMSID_') && sId != g_GRBMS_MM_Picked_sId ) //&& sId != g_GRBMS_MM_Found_sId )
        {
            let iRow    = GRBMS_RowFromId(sId);
            let iLetter = GRBMS_LetterFromId(sId);
            if ( GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter) )
            {
                if ( IsLocationInGridSquareWithBuffer(iRow, iLetter, FindElements_iX, FindElements_iY) )
                {
                    bFound = true;
                    g_GRBMS_MM_Found_iRow = iRow;
                    g_GRBMS_MM_Found_iLetter = iLetter;
                    g_GRBMS_MM_Found_sId = GRBMS_MakeId(iRow, iLetter);
                }
                else
                { // we are over the square, but not within the bound
                    g_GRBMS_MM_Found_iRow = -1;
                    g_GRBMS_MM_Found_iLetter = -1;
                    g_GRBMS_MM_Found_sId = '';
                }
            }
        }
        iE++;
    }
    e.preventDefault();
}

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
    let cStatusPlayer = g_cCode_Normal;
    let cCodeForActivity = g_cCode_HasFocusBeingMoved;
    if ( bCorrect ) 
        cStatusPlayer = g_cCode_Correct;
    var sId = '';
    let cSpecialClueCode = GRB_ForRowLetter_GetSpecialClueCode(iRow, iLetter)
    sStatusImage = GRBMS_ButtonBackgroundImage(cLetterPicked, cStatusPlayer, 0, cCodeForActivity, cSpecialClueCode);
    var sId = GRBMS_MakeId(iPickedRow, iPickedLetter)
    var elem = document.getElementById(sId);
    elem.style.backgroundImage = sStatusImage;
}

function GRBMS_mouseOut(e)
{
    if (!g_GRBMS_MM_Picked_elem) return;
        g_GRBMS_MM_Found_bMouseOut = true;
    GRBMS_mouseUp(e)
}

function GRBMS_clearPickedAndFoundVariables()
{
    g_GRBMS_MM_Picked_iRow = -1;
    g_GRBMS_MM_Picked_iLetter = -1;
    g_GRBMS_MM_Picked_sId = '';
    g_GRBMS_MM_Picked_elem = null;
    g_GRBMS_MM_Picked_bAlteredForMove = false;
    g_GRBMS_MM_Found_iRow = -1;
    g_GRBMS_MM_Found_iLetter = -1;
    g_GRBMS_MM_Found_sId = '';
}
