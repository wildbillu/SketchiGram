// TC-GRBMS-TouchMove.js


var g_GRBMS_TM_Picked_Start_iLeft = 0;
var g_GRBMS_TM_Picked_Start_iTop = 0;

var g_GRBMS_TM_Picked_elem = null;
var g_GRBMS_TM_Picked_bAlteredForMove = false;
var g_GRBMS_TM_Picked_sId = '';
var g_GRBMS_TM_Picked_iRow = 0;
var g_GRBMS_TM_Picked_iLetter = 0;

var g_GRBMS_TM_iInitialX = 0;
var g_GRBMS_TM_iInitialY = 0;
//
var g_GRBMS_TM_Found_iRow = -1;
var g_GRBMS_TM_Found_iLetter = -1;
var g_GRBMS_TM_Found_sId = '';
var g_GRBMS_TM_Found_bTouchOut = false;

function GRBMS_touchOut(e)
{
    if (!g_GRBMS_TM_Picked_elem) return;
    g_GRBMS_TM_Found_bTouchOut = true;
    GRBMS_touchUp(e)
}

function TC_GRBMS_TouchFunctions(iRow, iLetter)
{
    var sFunctionsToCall = '';
    sFunctionsToCall += ' ontouchout="return GRBMS_touchOut(event);" ';
    sFunctionsToCall += ' ontouchstart="return GRBMS_touchDown(event, ' + iRow + ',' + iLetter + ');" ';
    sFunctionsToCall += ' ontouchmove="GRBMS_touchMove(event);" ';
    sFunctionsToCall += ' ontouchend="GRBMS_touchUp(event);" ';
    sFunctionsToCall += ' onfocus="GRBMS_onfocus(this);" ';
    return sFunctionsToCall;
}

function GRBMS_touchUp(event)
{
    if ( g_bGridSolved )
        return;
    if ( !g_GRBMS_TM_Picked_elem )
        return;  
    let bDropped = false;      
    if ( g_GRBMS_TM_Found_sId != '')
    {
        if ( !g_GRBMS_TM_Found_bTouchOut )
        {
            GRBMS_SwitchAnswers(g_GRBMS_TM_Picked_iRow, g_GRBMS_TM_Picked_iLetter, g_GRBMS_TM_Found_iRow, g_GRBMS_TM_Found_iLetter);
            bDropped = true;
        }
        GRBMS_ForRowLetter_SetButton(g_GRBMS_TM_Found_iRow, g_GRBMS_TM_Found_iLetter, g_cCode_Inactive);
        let elemFound = document.getElementById(GRBMS_MakeId(g_GRBMS_TM_Found_iRow, g_GRBMS_TM_Found_iLetter));
        elemFound.style.cursor="default";
        KB_Mini_SetInstructionLine('');   
    }
// fix up the picked square then make nothing picked
    g_GRBMS_TM_Picked_elem.style.cursor="default";
    g_GRBMS_TM_Picked_elem.style.left = MakePixelString(g_GRBMS_TM_Picked_iLetter*g_GRBMS_Square_iSize);
    g_GRBMS_TM_Picked_elem.style.top = MakePixelString(g_GRBMS_TM_Picked_iRow*g_GRBMS_Square_iSize);
    g_GRBMS_TM_Picked_elem.style.zIndex = 0;
// not pick
    GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter, g_cCode_Inactive);
    if ( g_GBRMS_TM_bAllowEntry && !bDropped ) 
    {
        g_GRBMS_Focus_sId = GRBMS_MakeId(g_GRBMS_TM_Picked_iRow, g_GRBMS_TM_Picked_iLetter);
        GRBMS_ForRowLetter_SetButton(g_GRBMS_TM_Picked_iRow, g_GRBMS_TM_Picked_iLetter, g_cCode_HasFocus);
        document.getElementById(g_GRBMS_Focus_sId).focus();
    }
    else
        g_GRBMS_Focus_sId = '';

    g_GRBMS_TM_Picked_iRow = -1;
    g_GRBMS_TM_Picked_iLetter = -1;
    g_GRBMS_TM_Picked_sId = '';
    g_GRBMS_TM_Picked_elem = null;
    g_GRBMS_TM_Picked_bAlteredForMove = false;
    g_GRBMS_TM_Found_iRow = -1;
    g_GRBMS_TM_Found_iLetter = -1;
    g_GRBMS_TM_Found_sId = '';
    Status_Check(false);
}

function GRBMS_touchMove(e)
{
    if ( g_bGridSolved )
        return;
    if ( !g_GRBMS_TM_Picked_elem )
        return;
    if ( !g_GRBMS_TM_Picked_bAlteredForMove )
        GRBMS_ForRowLetter_SetButton(g_GRBMS_TM_Picked_iRow, g_GRBMS_TM_Picked_iLetter, g_cCode_HasFocusBeingMoved);
        g_GRBMS_TM_Picked_bAlteredForMove = true;
        var x = Math.round(e.touches[0].clientX);
    var y = Math.round(e.touches[0].clientY);
    var xMoved = x - g_GRBMS_TM_iInitialX;
    var yMoved = y - g_GRBMS_TM_iInitialY;
    g_GRBMS_TM_Picked_elem.style.position = "absolute";
    let iLeftRelative = g_GRBMS_TM_Picked_Start_iLeft + xMoved;
    let iTopRelative = g_GRBMS_TM_Picked_Start_iTop + yMoved;

    g_GRBMS_TM_Picked_elem.style.left = MakePixelString(iLeftRelative);
    g_GRBMS_TM_Picked_elem.style.top =  MakePixelString(iTopRelative);
    // now we look to see what is over the top     
    rect = g_GRBMS_TM_Picked_elem.getBoundingClientRect();
    a_elem = document.elementsFromPoint(rect.left, rect.top)
    var bFound = false;
    var iE = 0;
    while ( iE < a_elem.length && !bFound )
    {
        var sId = a_elem[iE].id;
        if ( sId == g_GRBMS_TM_Picked_sId && g_GRBMS_TM_Found_sId != '' )
        {
            GRBMS_ForRowLetter_SetButton(g_GRBMS_TM_Found_iRow, g_GRBMS_TM_Found_iLetter, g_cCode_Inactive);
            g_GRBMS_TM_Found_iRow = -1;
            g_GRBMS_TM_Found_iLetter = -1;
            g_GRBMS_TM_Found_sId = '';
        }
        if ( sId.startsWith('GRBMSID_') && sId != g_GRBMS_TM_Picked_sId )
        {
            var iRow = GRBMS_RowFromId(sId);
            var iLetter = GRBMS_LetterFromId(sId);
            if ( GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter) )
            {
                if ( g_GRBMS_TM_Found_sId != '' )
                {
                    GRBMS_ForRowLetter_SetButton(g_GRBMS_TM_Found_iRow, g_GRBMS_TM_Found_iLetter, g_cCode_Inactive);
                }
                if ( GRBMS_PickingAdjustment(iRow, iLetter, iLeftRelative, iTopRelative) )
                {
                    bFound = true;
                    let bCorrectDrop = TC_GRBMS_IsPickedLetterCorrectForFoundLocation(g_GRBMS_TM_Picked_iRow, g_GRBMS_TM_Picked_iLetter, iRow, iLetter);
                    if ( !g_SG_AM_bSmartMovesOnly || bCorrectDrop )
                    {
                        g_GRBMS_TM_Found_iRow = iRow;
                        g_GRBMS_TM_Found_iLetter = iLetter;
                        g_GRBMS_TM_Found_sId = GRBMS_MakeId(iRow, iLetter);
                        GRBMS_ForRowLetter_SetButton(g_GRBMS_TM_Found_iRow, g_GRBMS_TM_Found_iLetter, g_cCode_ActiveRow);
                    }
                    if ( g_SG_AM_bIndicateCorrectMoves )
                        TC_GRBMS_IndicatePickedLetterCorrectOrNot(g_GRBMS_TM_Picked_iRow, g_GRBMS_TM_Picked_iLetter, iRow, iLetter);

                }
            }
        }
        iE++;
    }
    e.preventDefault();
}

function GRBMS_touchDown(e, iRow, iLetter)
{
    e.preventDefault();
// cannot pick up black square or golden square
    if ( !GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter) )
        return;    
    if ( g_bGridSolved )
        return;
    if ( g_GRBMS_Focus_sId != '' )
    {
        GRBMS_ForRowLetter_SetButton(GRBMS_RowFromId(g_GRBMS_Focus_sId), GRBMS_LetterFromId(g_GRBMS_Focus_sId), g_cCode_Inactive);
        g_GRBMS_Focus_sId = '';
    }
    let cLetterBeingReplaced = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    KB_Mini_SetInstructionLine(cLetterBeingReplaced);
    g_GRBMS_TM_Picked_iRow = iRow;
    g_GRBMS_TM_Picked_iLetter = iLetter;
    g_GRBMS_TM_Picked_sId = GRBMS_MakeId(iRow, iLetter);
    g_GRBMS_TM_Picked_elem = document.getElementById(g_GRBMS_TM_Picked_sId);
    g_GRBMS_TM_Picked_elem.style.cursor="move";
    g_GRBMS_TM_iInitialX = Math.round(e.touches[0].clientX);
    g_GRBMS_TM_iInitialY = Math.round(e.touches[0].clientY);
    rect = g_GRBMS_TM_Picked_elem.getBoundingClientRect();
    rectBox = document.getElementById("Div_Grid").getBoundingClientRect();
    g_GRBMS_TM_Picked_Start_iLeft = Math.round(rect.left) - Math.round(rectBox.left);
    g_GRBMS_TM_Picked_Start_iTop = Math.round(rect.top) - Math.round(rectBox.top);
    g_GRBMS_TM_Picked_elem.style.zIndex  =  5;
    Sync_FocusChange('GR')
}
