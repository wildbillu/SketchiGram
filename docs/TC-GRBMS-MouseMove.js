// TC-GRBMS-MouseMove.js

var g_GRBMS_MM_Picked_Start_iLeft = 0;
var g_GRBMS_MM_Picked_Start_iTop = 0;

var g_GRBMS_MM_Picked_elem = null;
var g_GRBMS_MM_Picked_sId = '';
var g_GRBMS_MM_Picked_iRow = 0;
var g_GRBMS_MM_Picked_iLetter = 0;

var g_GRBMS_MM_iInitialX = 0;
var g_GRBMS_MM_iInitialY = 0;
//
var g_GRBMS_MM_Found_iRow = -1;
var g_GRBMS_MM_Found_iLetter = -1;
var g_GRBMS_MM_Found_sId = '';

function TC_GRBMS_MouseFunctions(iRow, iLetter)
{
//    sFunctionsToCall += ' onkeypress="return GRB_onkeypress(event);"';
//    sFunctionsToCall += ' onkeyup="return GRB_onkeyup(event.key,' + iRow + ',' + iLetter + ');"';
    var sFunctionsToCall = '';
    sFunctionsToCall += ' onMouseDown="return GRBMS_onmousedown(event, ' + iRow + ',' + iLetter + ');" ';
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
    {
        return;
    }
    if ( g_GRBMS_MM_Found_sId != '')
        GRBMS_SwitchAnswers(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter, g_GRBMS_MM_Found_iRow, g_GRBMS_MM_Found_iLetter);
// fix up the picked square then make nothing picked
    g_GRBMS_MM_Picked_elem.style.cursor="arrow";
    g_GRBMS_MM_Picked_elem.style.left = MakePixelString(g_GRBMS_MM_Picked_iLetter*g_GRBMS_Square_iSize);
    g_GRBMS_MM_Picked_elem.style.top = MakePixelString(g_GRBMS_MM_Picked_iRow*g_GRBMS_Square_iSize);
    g_GRBMS_MM_Picked_elem.style.zIndex = 0;
    if ( g_GBRMS_MM_bAllowEntry ) 
    {
        if ( g_GRBMS_MM_Found_iRow == -1 )
        {
            g_GRBMS_Focus_sId = GRBMS_MakeId(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter);
            GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter, g_TC_cCodeMeaning_HasFocus);
            document.getElementById(g_GRBMS_Focus_sId).focus();
        }
        else
        {
            GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter, g_TC_cCodeMeaning_Inactive);
            g_GRB_Focus_sId = '';
        }
    }
    else
    {
        GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Picked_iRow, g_GRBMS_MM_Picked_iLetter, g_TC_cCodeMeaning_Inactive);
        g_GRB_Focus_sId = '';
    }
    g_GRBMS_MM_Picked_iRow = -1;
    g_GRBMS_MM_Picked_iLetter = -1;
    g_GRBMS_MM_Picked_sId = '';
    g_GRBMS_MM_Picked_elem = null;
    g_GRBMS_MM_Found_iRow = -1;
    g_GRBMS_MM_Found_iLetter = -1;
    g_GRBMS_MM_Found_sId = '';
setline('MMsID:' + g_GRBMS_MM_Picked_sId + '|')
    Status_Check(false);
}

function GRBMS_mouseMove(e)
{
    if ( g_bGridSolved )
        return;
    if ( !g_GRBMS_MM_Picked_elem )
        return;
    var x = Math.round(e.clientX);
    var y = Math.round(e.clientY);
    var xMoved = x - g_GRBMS_MM_iInitialX;
    var yMoved = y - g_GRBMS_MM_iInitialY;
    g_GRBMS_MM_Picked_elem.style.position = "absolute";
    g_GRBMS_MM_Picked_elem.style.left = (g_GRBMS_MM_Picked_Start_iLeft + xMoved)  + 'px';
    g_GRBMS_MM_Picked_elem.style.top =  (g_GRBMS_MM_Picked_Start_iTop + yMoved) + 'px';
    // now we look to see what is over the top     
    rect = g_GRBMS_MM_Picked_elem.getBoundingClientRect();
    a_elem = document.elementsFromPoint(rect.left, rect.top)
    var bFound = false;
    var iE = 0;
    while ( iE < a_elem.length && !bFound )
    {
        var sId = a_elem[iE].id;
        if ( sId == g_GRBMS_MM_Picked_sId && g_GRBMS_MM_Found_sId != '' )
        { // cant drop on invalid squares
            GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Found_iRow, g_GRBMS_MM_Found_iLetter, g_TC_cCodeMeaning_Inactive);
            g_GRBMS_MM_Found_iRow = -1;
            g_GRBMS_MM_Found_iLetter = -1;
            g_GRBMS_MM_Found_sId = '';
        }
        if ( sId.startsWith('GRBMSID_') && sId != g_GRBMS_MM_Picked_sId )
        {
            var iRow = GRBMS_RowFromId(sId);
            var iLetter = GRBMS_LetterFromId(sId);
            if ( GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter) )
            {
                if ( g_GRBMS_MM_Found_sId != '' )
                {
                    GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Found_iRow, g_GRBMS_MM_Found_iLetter, g_TC_cCodeMeaning_Inactive);
                }
                g_GRBMS_MM_Found_iRow = iRow;
                g_GRBMS_MM_Found_iLetter = iLetter;
                g_GRBMS_MM_Found_sId = GRBMS_MakeId(iRow, iLetter);
                GRBMS_ForRowLetter_SetButton(g_GRBMS_MM_Found_iRow, g_GRBMS_MM_Found_iLetter, g_TC_cCodeMeaning_ActiveRow);
                bFound = true;
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
    g_GRBMS_MM_Picked_iRow = iRow;
    g_GRBMS_MM_Picked_iLetter = iLetter;
    g_GRBMS_MM_Picked_sId = GRBMS_MakeId(iRow, iLetter);
    g_GRBMS_MM_Picked_elem = document.getElementById(g_GRBMS_MM_Picked_sId);
    GRBMS_ForRowLetter_SetButton(iRow, iLetter, g_TC_cCodeMeaning_HasFocus);
    g_GRBMS_MM_Picked_elem.style.cursor="move";
    g_GRBMS_MM_iInitialX = Math.round(e.clientX);
    g_GRBMS_MM_iInitialY = Math.round(e.clientY);
    rect = g_GRBMS_MM_Picked_elem.getBoundingClientRect();
    rectBox = document.getElementById("Div_Grid").getBoundingClientRect();
    g_GRBMS_MM_Picked_Start_iLeft = Math.round(rect.left) - Math.round(rectBox.left);
    g_GRBMS_MM_Picked_Start_iTop = Math.round(rect.top) - Math.round(rectBox.top);
    g_GRBMS_MM_Picked_elem.style.zIndex  =  5;
}

