// TC-Place-TouchMovable.js

var g_TM_elemMoving = null;
var g_TM_iElementStartLeft = 0;
var g_TM_iElementStartTop = 0;
var g_TM_iInitialX = 0;
var g_TM_iInitialY = 0;
var g_TM_iRowFound = -1;
var g_TM_iLetterFound = -1;
var g_TM_sWordToPlace = '';
var g_TM_sRowsAllowed = '';
var g_TM_sLettersAllowed = '';

function TC_Place_TouchMovable_MakeFunctionString_Across(sWordToPlace)
{
    var sTouchMovableInner = ' ontouchstart="touchDown(event, ';
    sTouchMovableInner += wrap('Div_Draggable_Across') + ', '
    sTouchMovableInner += wrap(sWordToPlace) + ', '
    sTouchMovableInner += wrap(g_TC_Place_Draggable_sAcrossRowsAllowed) + ', '
// since across we are going to allow no letters
    sTouchMovableInner += wrap('') + ');" '
    sTouchMovableInner += ' ontouchmove="touchMove(event);" ontouchend="touchUp(event);"';    
    return sTouchMovableInner;
}

function TC_Place_TouchMovable_MakeFunctionString_Down(sWordToPlace)
{
    var sTouchMovableInner = ' ontouchstart="touchDown(event, ';
    sTouchMovableInner += wrap('Div_Draggable_Down') + ', '
    sTouchMovableInner += wrap(sWordToPlace) + ', '
// since down we are going to allow no rows
    sTouchMovableInner += wrap('') + ', '
    sTouchMovableInner += wrap(g_TC_Place_Draggable_sDownLettersAllowed) + ');" '
    sTouchMovableInner += ' ontouchmove="touchMove(event);" ontouchend="touchUp(event);"';    
    return sTouchMovableInner;
}

function touchDown(e, sId, sWord, sValidRows, sValidLetters)
{
    e.preventDefault();
    g_TM_elemMoving = document.getElementById(sId);
    g_TM_sWordToPlace = sWord;
    g_TM_sRowsAllowed = sValidRows;
    g_TM_sLettersAllowed = sValidLetters;
    g_TM_elemMoving.style.cursor="move";
    g_TM_iInitialX = Math.round(e.touches[0].clientX);
    g_TM_iInitialY = Math.round(e.touches[0].clientY);
    rect = g_TM_elemMoving.getBoundingClientRect();
    rectBox = document.getElementById("Place_Popup_Window").getBoundingClientRect();
    g_TM_iElementStartLeft = Math.round(rect.left) - Math.round(rectBox.left);
    g_TM_iElementStartTop = Math.round(rect.top) - Math.round(rectBox.top);
}

function touchUp(e)
{
    if ( g_TM_iRowFound != -1 && g_TM_iLetterFound != -1 )
    {
        if ( g_TM_sRowsAllowed != '' ) // must be across
            GRB_ForRowSetAnswerTo(g_TM_iRowFound, g_TM_sWordToPlace);
        else
            GRB_ForLetterSetAnswerTo(g_TM_iLetterFound, g_TM_sWordToPlace);
        Place_Popup_Toggle();
    }
    g_TM_elemMoving.style.left = g_TM_iElementStartLeft + 'px';
    g_TM_elemMoving.style.top = g_TM_iElementStartTop + 'px';
    g_TM_elemMoving = null;
    g_TM_iRowFound = -1;
    g_TM_iLetterFound = -1;
    g_TM_sWordToPlace = '';
    g_TM_sRowsAllowed = '';
    g_TM_sLettersAllowed = '';
    e.preventDefault();
}

function touchMove(e)
{
    if ( !g_TM_elemMoving )
        return;
    var x = Math.round(e.touches[0].clientX);
    var y = Math.round(e.touches[0].clientY);
    var xMoved = Math.round(x - g_TM_iInitialX);
    var yMoved = Math.round(y - g_TM_iInitialY);
    g_TM_elemMoving.style.position = "absolute";
    g_TM_elemMoving.style.left = (g_TM_iElementStartLeft + xMoved)  + 'px';
    g_TM_elemMoving.style.top =  (g_TM_iElementStartTop + yMoved) + 'px';
    rect = g_TM_elemMoving.getBoundingClientRect();
    a_elem = document.elementsFromPoint(rect.left, rect.top)
    var bFound = false;
    var iE = 0;
    while ( iE < a_elem.length && !bFound )
    {
        var sId = a_elem[iE].id;
        if ( sId.startsWith('GRBID_') )
        { // assumes across
            var iRow = GRB_RowFromId(sId)
            var iLetter = GRB_LetterFromId(sId)
            if ( !GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
            {
                var sRow = iRow.toString();
                var sLetter = iLetter.toString();
                if ( g_TM_sRowsAllowed != '' && g_TM_sRowsAllowed.includes(sRow) )
                {
                    g_GRB_bAcross = true;
                    GRB_MoveFocus(iRow, iLetter);
                    g_TM_iRowFound = iRow;
                    g_TM_iLetterFound = iLetter;
                    bFound = true;
                }
                if ( g_TM_sLettersAllowed != '' && g_TM_sLettersAllowed.includes(sLetter))
                {
                    g_GRB_bAcross = false;
                    GRB_MoveFocus(iRow, iLetter);
                    g_TM_iRowFound = iRow;
                    g_TM_iLetterFound = iLetter;
                    bFound = true;
                }
            }
        }
        iE++;
    }
    e.preventDefault();
}

