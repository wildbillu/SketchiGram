// TC-Place-MouseMovable.js

var g_MM_elemMoving = null;
var g_MM_iElementStartLeft = 0;
var g_MM_iElementStartTop = 0;
var g_MM_iInitialX = 0;
var g_MM_iInitialY = 0;
var g_MM_iRowFound = -1;
var g_MM_iLetterFound = -1;
var g_MM_sWordToPlace = '';
var g_MM_sRowsAllowed = '';
var g_MM_sLettersAllowed = '';

function TC_Place_MouseMovable_MakeFunctionString_Across(sWordToPlace)
{
    var sMouseMovableInner = ' onmousedown="mouseDown(event, ';
    sMouseMovableInner += wrap('Div_Draggable_Across') + ', '
    sMouseMovableInner += wrap(sWordToPlace) + ', '
    sMouseMovableInner += wrap(g_TC_Place_Draggable_sAcrossRowsAllowed) + ', '
// since across we are going to allow no letters
    sMouseMovableInner += wrap('') + ');" '
    sMouseMovableInner += ' onmousemove="mouseMove(event);" onmouseUp="mouseUp(event);"';    
    return sMouseMovableInner;
}

function TC_Place_MouseMovable_MakeFunctionString_Down(sWordToPlace)
{
    var sMouseMovableInner = ' onmousedown="mouseDown(event, ';
    sMouseMovableInner += wrap('Div_Draggable_Down') + ', '
    sMouseMovableInner += wrap(sWordToPlace) + ', '
// since down we are going to allow no rows
    sMouseMovableInner += wrap('') + ', '
    sMouseMovableInner += wrap(g_TC_Place_Draggable_sDownLettersAllowed) + ');" '
    sMouseMovableInner += ' onmousemove="mouseMove(event);" onmouseUp="mouseUp(event);"';    
    return sMouseMovableInner;
}

function mouseDown(e, sId, sWord, sValidRows, sValidLetters)
{
    e.preventDefault();
    g_MM_sWordToPlace = sWord;
    g_MM_sRowsAllowed = sValidRows;
    g_MM_sLettersAllowed = sValidLetters;
    g_MM_elemMoving = document.getElementById(sId);
    g_MM_elemMoving.style.cursor="move";
    g_MM_iInitialX = Math.round(e.clientX);
    g_MM_iInitialY = Math.round(e.clientY);
    rect = g_MM_elemMoving.getBoundingClientRect();
    rectBox = document.getElementById("Place_Popup_Window").getBoundingClientRect();
    g_MM_iElementStartLeft = Math.round(rect.left) - Math.round(rectBox.left);
    g_MM_iElementStartTop = Math.round(rect.top) - Math.round(rectBox.top);
}

function mouseUp(ev)
{
    ev.preventDefault();
    if ( !g_MM_elemMoving )
        return;
    if ( g_MM_iRowFound != -1 && g_MM_iLetterFound != -1 )
    {
        if ( g_MM_sRowsAllowed != '' ) // must be across
            TC_MM_SetRow(g_MM_iRowFound, g_MM_sWordToPlace);
        else
            TC_MM_SetLetter(g_MM_iLetterFound, g_MM_sWordToPlace);
        Place_Popup_Toggle();
    }
    g_MM_elemMoving.style.left = g_MM_iElementStartLeft + 'px';
    g_MM_elemMoving.style.top = g_MM_iElementStartTop + 'px';
    g_MM_elemMoving = null;
    g_MM_iRowFound = -1;
    g_MM_iLetterFound = -1;
    g_MM_sWordToPlace = '';
    g_MM_sRowsAllowed = '';
    g_MM_sLettersAllowed = '';
}

function TC_MM_SetLetter(iLetter, sWord)
{
    if ( g_bIsTwistiCross ) 
        GRB_ForLetterSetAnswerTo(iLetter, sWord);
    else
        GRBMS_ForLetterSetAnswerTo(iLetter, sWord);
}

function GRBMS_ForLetterSetAnswerTo(iLetter, sWord)
{
    let aResults = [];
    for ( let iRow = 0; iRow < sWord.length; iRow++ )
        aResults.push(GRBMS_ReplaceAt(sWord.charAt(iRow), iRow, iLetter));
    Status_Check(false);
}

function GRBMS_ForRowSetAnswerTo(iRow, sWord)
{
    let aResults = [];
    for ( let iLetter = 0; iLetter < sWord.length; iLetter++ )
        aResults.push(GRBMS_ReplaceAt(sWord.charAt(iLetter), iRow, iLetter));
    Status_Check(false);
}

function TC_MM_SetRow(iRow, sWord)
{
    if ( g_bIsTwistiCross ) 
        GRB_ForRowSetAnswerTo(iRow, sWord);
    else
        GRBMS_ForRowSetAnswerTo(iRow, sWord);
}

function TC_MM_MatchId(sId)
{
    if ( g_bIsTwistiCross && sId.startsWith('GRBID_') )
        return true;
    if ( g_bIsYourMove && sId.startsWith('GRBMSID_') )
        return true;
    return false;
}

function TC_MM_MoveFocus(iRow, iLetter)
{
    if ( g_bIsTwistiCross ) 
        GRB_MoveFocus(iRow, iLetter);
}

function TC_MM_RowFromId(sId)
{
    if ( g_bIsTwistiCross ) return GRB_RowFromId(sId);
    return GRBMS_RowFromId(sId);
}

function TC_MM_LetterFromId(sId)
{
    if ( g_bIsTwistiCross ) return GRB_LetterFromId(sId);
    return GRBMS_LetterFromId(sId);
}

function TC_MM_IsBlackSquare(iRow, iLetter)
{
    if ( g_bIsTwistiCross ) return GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter);
    return GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter)
}

function mouseMove(e)
{
    if ( !g_MM_elemMoving )
        return;
    var x = Math.round(e.clientX);
    var y = Math.round(e.clientY);
    var xMoved = x - g_MM_iInitialX;
    var yMoved = y - g_MM_iInitialY;
    g_MM_elemMoving.style.position = "absolute";
    g_MM_elemMoving.style.left = (g_MM_iElementStartLeft + xMoved)  + 'px';
    g_MM_elemMoving.style.top =  (g_MM_iElementStartTop + yMoved) + 'px';
    rect = g_MM_elemMoving.getBoundingClientRect();
    a_elem = document.elementsFromPoint(rect.left, rect.top)
    var bFound = false;
    var iE = 0;
    while ( iE < a_elem.length && !bFound )
    {
        var sId = a_elem[iE].id;
        if ( TC_MM_MatchId(sId) )
        { // assumes across
            var iRow = TC_MM_RowFromId(sId);
            var iLetter = TC_MM_LetterFromId(sId);
            if ( !TC_MM_IsBlackSquare(iRow, iLetter) )
            {
                var sRow = iRow.toString();
                var sLetter = iLetter.toString();
                if ( g_MM_sRowsAllowed != '' && g_MM_sRowsAllowed.includes(sRow) )
                {
                    g_GRB_bAcross = true;
                    TC_MM_MoveFocus(iRow, iLetter);
                    g_MM_iRowFound = iRow;
                    g_MM_iLetterFound = iLetter;
                    bFound = true;
                }
                if ( g_MM_sLettersAllowed != '' && g_MM_sLettersAllowed.includes(sLetter))
                {
                    g_GRB_bAcross = false;
                    TC_MM_MoveFocus(iRow, iLetter);
                    g_MM_iRowFound = iRow;
                    g_MM_iLetterFound = iLetter;
                    bFound = true;
                }
            }
        }
        iE++;
    }
    e.preventDefault();
}
