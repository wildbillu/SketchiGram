// TC-GRBMS-TouchMove.js


var g_GRBMS_TM_Picked_Start_iLeft = 0;
var g_GRBMS_TM_Picked_Start_iTop = 0;

var g_GRBMS_TM_Picked_elem = null;
var g_GRBMS_TM_Picked_sId = '';
var g_GRBMS_TM_Picked_iRow = 0;
var g_GRBMS_TM_Picked_iLetter = 0;

var g_GRBMS_TM_iInitialX = 0;
var g_GRBMS_TM_iInitialY = 0;
//
var g_GRBMS_TM_Found_iRow = -1;
var g_GRBMS_TM_Found_iLetter = -1;
var g_GRBMS_TM_Found_sId = '';

function TC_GRBMS_TouchFunctions(iRow, iLetter)
{
    var sFunctionsToCall = '';
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
    if ( g_GRBMS_TM_Found_sId != '')
    {
        GRBMS_SwitchAnswers(g_GRBMS_TM_Picked_iRow, g_GRBMS_TM_Picked_iLetter, g_GRBMS_TM_Found_iRow, g_GRBMS_TM_Found_iLetter);
    }
// fix up the picked square then make nothing picked
    g_GRBMS_TM_Picked_elem.style.cursor="arrow";
    g_GRBMS_TM_Picked_elem.style.left = MakePixelString(g_GRBMS_TM_Picked_iLetter*g_GRBMS_Square_iSize);
    g_GRBMS_TM_Picked_elem.style.top = MakePixelString(g_GRBMS_TM_Picked_iRow*g_GRBMS_Square_iSize);
    g_GRBMS_TM_Picked_elem.style.zIndex = 0;
// not pick
    if ( g_GBRMS_TM_bAllowEntry ) 
    {
        if ( g_GRBMS_TM_Found_iRow == -1 )
        {
            g_GRBMS_Focus_sId = GRBMS_MakeId(g_GRBMS_TM_Picked_iRow, g_GRBMS_TM_Picked_iLetter);
            GRBMS_ForRowLetter_SetButton(g_GRBMS_TM_Picked_iRow, g_GRBMS_TM_Picked_iLetter, g_TC_cCodeMeaning_HasFocus);
            document.getElementById(g_GRBMS_Focus_sId).focus()
        }
        else
        {
            GRBMS_ForRowLetter_SetButton(g_GRBMS_TM_Picked_iRow, g_GRBMS_TM_Picked_iLetter, g_TC_cCodeMeaning_Inactive);
            g_GRB_Focus_sId = '';
        }
    }
    else
    {
        GRBMS_ForRowLetter_SetButton(g_GRBMS_TM_Picked_iRow, g_GRBMS_TM_Picked_iLetter, g_TC_cCodeMeaning_Inactive);
        g_GRB_Focus_sId = ''
    }
    g_GRBMS_TM_Picked_iRow = -1;
    g_GRBMS_TM_Picked_iLetter = -1;
    g_GRBMS_TM_Picked_sId = '';
    g_GRBMS_TM_Picked_elem = null;
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
    var x = Math.round(e.touches[0].clientX);
    var y = Math.round(e.touches[0].clientY);
    var xMoved = x - g_GRBMS_TM_iInitialX;
    var yMoved = y - g_GRBMS_TM_iInitialY;
    g_GRBMS_TM_Picked_elem.style.position = "absolute";
    g_GRBMS_TM_Picked_elem.style.left = (g_GRBMS_TM_Picked_Start_iLeft + xMoved)  + 'px';
    g_GRBMS_TM_Picked_elem.style.top =  (g_GRBMS_TM_Picked_Start_iTop + yMoved) + 'px';
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
            GRBMS_ForRowLetter_SetButton(g_GRBMS_TM_Found_iRow, g_GRBMS_TM_Found_iLetter, g_TC_cCodeMeaning_Inactive);
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
                    GRBMS_ForRowLetter_SetButton(g_GRBMS_TM_Found_iRow, g_GRBMS_TM_Found_iLetter, g_TC_cCodeMeaning_Inactive);
                }
                g_GRBMS_TM_Found_iRow = iRow;
                g_GRBMS_TM_Found_iLetter = iLetter;
                g_GRBMS_TM_Found_sId = GRBMS_MakeId(iRow, iLetter);
                GRBMS_ForRowLetter_SetButton(g_GRBMS_TM_Found_iRow, g_GRBMS_TM_Found_iLetter, g_TC_cCodeMeaning_ActiveRow);
                bFound = true;
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
        GRBMS_ForRowLetter_SetButton(GRBMS_RowFromId(g_GRBMS_Focus_sId), GRBMS_LetterFromId(g_GRBMS_Focus_sId), g_TC_cCodeMeaning_Inactive);
        g_GRBMS_Focus_sId = '';
    }
    g_GRBMS_TM_Picked_iRow = iRow;
    g_GRBMS_TM_Picked_iLetter = iLetter;
    g_GRBMS_TM_Picked_sId = GRBMS_MakeId(iRow, iLetter);
    g_GRBMS_TM_Picked_elem = document.getElementById(g_GRBMS_TM_Picked_sId);
    GRBMS_ForRowLetter_SetButton(iRow, iLetter, g_TC_cCodeMeaning_HasFocus);
    g_GRBMS_TM_Picked_elem.style.cursor="move";
    g_GRBMS_TM_iInitialX = Math.round(e.touches[0].clientX);
    g_GRBMS_TM_iInitialY = Math.round(e.touches[0].clientY);
    rect = g_GRBMS_TM_Picked_elem.getBoundingClientRect();
    rectBox = document.getElementById("Div_Grid").getBoundingClientRect();
    g_GRBMS_TM_Picked_Start_iLeft = Math.round(rect.left) - Math.round(rectBox.left);
    g_GRBMS_TM_Picked_Start_iTop = Math.round(rect.top) - Math.round(rectBox.top);
    g_GRBMS_TM_Picked_elem.style.zIndex  =  5;
}
