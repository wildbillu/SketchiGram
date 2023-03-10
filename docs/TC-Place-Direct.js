// TC-Place-Direct.js

var g_GR_Draggable_Div_Across_sClass = 'Place_Draggable_Across'
var g_GR_Draggable_Div_Down_sClass = 'Place_Draggable_Down'

var g_Place_Direct_bMouseDown = false;
var g_Place_Direct_MM_elemMoving = null;
var g_Place_Direct_MM_sWord = '';
var g_Place_Direct_MM_bAcross = false;
var g_Place_Direct_MM_Mouse_iInitialX = 0;
var g_Place_Direct_MM_Mouse_iInitialY = 0;
var g_Place_Direct_MM_elem_iInitialX = 0;
var g_Place_Direct_MM_elem_iInitialY = 0;

var g_Place_Direct_MM_Found_sId = '';

function TC_Place_Direct_mouseUp(e)
{
    e.preventDefault();
    if ( !g_Place_Direct_bMouseDown )
        return;
    if ( g_Place_Direct_MM_Found_sId != '' )
    { // so iD is valid     
        if ( g_Place_Direct_MM_bAcross )
        {
            var iRowFound = TC_PD_RowFromId(g_Place_Direct_MM_Found_sId);
            TC_MM_SetRow(iRowFound, g_Place_Direct_MM_sWord);
            if ( g_bIsYourMove ) GRBMS_ForRow_SetButtons(iRowFound, g_TC_cCodeMeaning_Inactive);            
        }
        else
        {
            var iLetterFound = TC_PD_LetterFromId(g_Place_Direct_MM_Found_sId);
            TC_MM_SetLetter(iLetterFound, g_Place_Direct_MM_sWord);
            if ( g_bIsYourMove ) GRBMS_ForLetter_SetButtons(iLetterFound, g_TC_cCodeMeaning_Inactive);            
        }
    }
// we need to get rid of the item
    if ( g_Place_Direct_MM_bAcross )
        elemSA = document.getElementById("Div_Place_Direct_Across");
    else
        elemSA = document.getElementById("Div_Place_Direct_Down");
    elemSA.innerHTML = '';
    elemSA.style.visibility = 'hidden';
    g_Place_Direct_bMouseDown = false;
    g_Place_Direct_MM_Found_sId = '';
    return;
}

function TC_PD_MatchId(sId)
{
    if ( g_bIsTwistiCross && sId.startsWith('GRBID_') )
        return true;
    if ( g_bIsYourMove && sId.startsWith('GRBMSID_') )
        return true;
    return false;
}


function TC_Place_Direct_mouseMove(e)
{
    e.preventDefault();
    if ( !g_Place_Direct_bMouseDown )
        return;
    var x = Math.round(e.clientX);
    var y = Math.round(e.clientY);
    var xMoved = x - g_Place_Direct_MM_Mouse_iInitialX;
    var yMoved = y - g_Place_Direct_MM_Mouse_iInitialY;
    g_Place_Direct_MM_elemMoving.style.position = "absolute";
//
    g_Place_Direct_MM_elemMoving.style.left = (g_Place_Direct_MM_elem_iInitialX + xMoved)  + 'px';
    g_Place_Direct_MM_elemMoving.style.top =  (g_Place_Direct_MM_elem_iInitialY + yMoved) + 'px';
    rect = g_Place_Direct_MM_elemMoving.getBoundingClientRect();
    a_elem = document.elementsFromPoint(rect.left, rect.top)
    var bFound = false;
    var iE = 0;
    while ( iE < a_elem.length && !bFound )
    {
        var sIdCandidate = a_elem[iE].id;
        if ( TC_PD_MatchId(sIdCandidate) )
        { // assumes across
            bFound = true;
            if ( g_Place_Direct_MM_bAcross )
            {
                TC_Place_Direct_HandleFind_Across(sIdCandidate);
            }
            else
            {
                 TC_Place_Direct_HandleFind_Down(sIdCandidate);
            }
        }
        iE++;
    }
}

function TC_PD_RowFromId(sId)
{
    if ( g_bIsTwistiCross ) return GRB_RowFromId(sId);
    return GRBMS_RowFromId(sId);
}

function TC_PD_LetterFromId(sId)
{
    if ( g_bIsTwistiCross ) return GRB_LetterFromId(sId);
    return GRBMS_LetterFromId(sId);
}


function TC_Place_Direct_HandleFind_Across(sIdCandidate)
{
    if ( sIdCandidate == g_Place_Direct_MM_Found_sId )
        return; // nothing to do
    var iRow    = TC_PD_RowFromId(sIdCandidate);
    var iLetter = TC_PD_LetterFromId(sIdCandidate)
    var bValidRow = false;
    if ( !GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
    {
        var iLengthAnswer = GRB_ForRow_GetAnswerLength(iRow);
        if ( g_Place_Direct_MM_sWord.length == iLengthAnswer )
            bValidRow = true;
    }
    let iRow_Old = TC_PD_RowFromId(g_Place_Direct_MM_Found_sId);
    let bSameRow = (iRow == iRow_Old)
// if there is an old location we need to make it inactive (might be in our row, but not our active character)
    if ( g_Place_Direct_MM_Found_sId != '')
    {
        if ( g_bIsTwistiCross ) GRB_ForRow_SetToInactive(iRow_Old);
        if ( g_bIsYourMove    ) GRBMS_ForRow_SetButtons(iRow_Old, g_TC_cCodeMeaning_Inactive)
    }
    if ( bValidRow && !bSameRow)
    {
        var iLetter = TC_PD_LetterFromId(sIdCandidate)
        if ( g_bIsTwistiCross ) GRB_ForRow_SetToActive(iRow, iLetter);
        if ( g_bIsYourMove    ) GRBMS_ForRow_SetButtons(iRow, g_TC_cCodeMeaning_ActiveRow)
        g_Place_Direct_MM_Found_sId = sIdCandidate;
    }
    else
    {
        g_Place_Direct_MM_Found_sId='';
    }
}

function TC_Place_Direct_HandleFind_Down(sIdCandidate)
{
    if ( sIdCandidate == g_Place_Direct_MM_Found_sId )
        return; // nothing to do
    var iRow = TC_PD_RowFromId(sIdCandidate);
    var iLetter = TC_PD_LetterFromId(sIdCandidate)
    var bValidLetter = false;
    if ( !GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
    {
        var iLengthAnswer = GRB_ForLetter_GetAnswerLength(iLetter);
        if ( g_Place_Direct_MM_sWord.length == iLengthAnswer )
            bValidLetter = true;
    }
// if there is an old location we need to make it inactive (might be in our row, but not our active character)
    var iLetter_Old = TC_PD_LetterFromId(g_Place_Direct_MM_Found_sId);
    let bSameLetter = (iLetter == iLetter_Old)

    if ( g_Place_Direct_MM_Found_sId != '')
    {
        if ( g_bIsTwistiCross ) GRB_ForLetter_SetToInactive(iLetter_Old);
        if ( g_bIsYourMove    ) GRBMS_ForLetter_SetButtons(iLetter_Old, g_TC_cCodeMeaning_Inactive)
    }
    if ( bValidLetter && !bSameLetter )
    {
        var iRowValid = TC_PD_RowFromId(sIdCandidate)
        var iLetterValid = TC_PD_LetterFromId(sIdCandidate)
        if ( g_bIsTwistiCross ) GRB_ForLetter_SetToActive(iRowValid, iLetterValid)
        if ( g_bIsYourMove    ) GRBMS_ForLetter_SetButtons(iLetterValid, g_TC_cCodeMeaning_ActiveRow)

        g_Place_Direct_MM_Found_sId = sIdCandidate;
    }
    else
    {
        g_Place_Direct_MM_Found_sId='';
    }
}

function TC_Place_Direct_mouseDown(e, sId, sWord, sAcross)
{
    e.preventDefault();
    g_Place_Direct_MM_elemMoving = document.getElementById(sId);
    g_Place_Direct_MM_sWord = sWord;
    g_Place_Direct_MM_bAcross = false;
    if ( sAcross == 'true')
        g_Place_Direct_MM_bAcross = true;
    g_Place_Direct_MM_Mouse_iInitialX = Math.round(e.clientX);
    g_Place_Direct_MM_Mouse_iInitialY = Math.round(e.clientY);
    g_Place_Direct_MM_elemMoving.style.cursor="move";
    g_Place_Direct_bMouseDown = true;
    rect = g_Place_Direct_MM_elemMoving.getBoundingClientRect();
    g_Place_Direct_MM_elem_iInitialX = rect.left;
    g_Place_Direct_MM_elem_iInitialY = rect.top;
}

function TC_Place_Direct_MouseMovable_MakeFunctionString_Down(sWordToPlace)
{
    var sTouchMovableInner = ' onmouseDown="TC_Place_Direct_mouseDown(event, ';
    sTouchMovableInner += wrap('Div_Place_Direct_Down_Inner') + ', '
    sTouchMovableInner += wrap(sWordToPlace) + ', \'false\');" '
    sTouchMovableInner += ' onmousemove="TC_Place_Direct_mouseMove(event);" onmouseUp="TC_Place_Direct_mouseUp(event);"';    
    return sTouchMovableInner;
}

function TC_Place_Direct_MouseMovable_MakeFunctionString_Across(sWordToPlace)
{
    var sTouchMovableInner = ' onmouseDown="TC_Place_Direct_mouseDown(event, ';
    sTouchMovableInner += wrap('Div_Place_Direct_Across_Inner') + ', '
    sTouchMovableInner += wrap(sWordToPlace) + ', \'true\');" '
    sTouchMovableInner += ' onmousemove="TC_Place_Direct_mouseMove(event);" onmouseUp="TC_Place_Direct_mouseUp(event);"';    
    return sTouchMovableInner;
}

function TC_Place_Direct_MakeButtons(sWordToPlace, bAcross)
{ // a div with buttons with letters etc
    var sTouchMovableInner = '';//TC_Place_Direct_TouchMovable_MakeFunctionString_Across(sWordToPlace);
    var sMouseMovableInner = '';
    if ( bAcross )
        sMouseMovableInner = TC_Place_Direct_MouseMovable_MakeFunctionString_Across(sWordToPlace);
    else        
        sMouseMovableInner = TC_Place_Direct_MouseMovable_MakeFunctionString_Down(sWordToPlace);
    var sInner = '';
    sInner += '<DIV class="'
    sInner += g_GR_Draggable_Div_Across_sClass;
    if ( bAcross )
        sInner += '" Id="Div_Place_Direct_Across_Inner" ' + sMouseMovableInner + sTouchMovableInner + '>';
    else
        sInner += '" Id="Div_Place_Direct_Down_Inner" ' + sMouseMovableInner + sTouchMovableInner + '>';
    for ( var iL = 0; iL < sWordToPlace.length; iL++ )
    {
        var sThisButton = ''
        var cLetter = sWordToPlace.charAt(iL);
        let cDualClueCode = g_TC_cCodeMeaning_DualClue_None;
        var sBackgroundImage = CAB_ButtonBackgroundImage(cLetter,  g_TC_cCodeMeaning_Normal, 'X', cDualClueCode);
        var sButtonClass = g_GRB_Square_sClass;
        if ( g_bIsYourMove )
            sButtonClass = g_GRBMS_Square_sClass;
// but we want relative positioning
        sButtonClass = sButtonClass.replace('Absolute', 'Relative');
        sThisButton += '<BUTTON class="'
        sThisButton += sButtonClass + '" ';
        sThisButton += ' style="background-image:' + sBackgroundImage + '">';
        sThisButton += '</BUTTON>';
        sInner += sThisButton;
    }
    sInner += '</DIV>';
    return sInner;
 }
 
function TC_Place_Direct_Across(iRow)
{
    var elemSA = document.getElementById("Div_Place_Direct_Across");
    var sWordBeingPlaced = CAB_ForRow_GetPlayerAnswer(iRow);
    var sPlaceinnerHTML = TC_Place_Direct_MakeButtons(sWordBeingPlaced, true);
    elemSA.innerHTML = sPlaceinnerHTML;
    var elemInner = document.getElementById("Div_Place_Direct_Across_Inner");
    var iSize = g_GRB_Square_iSize;
    if ( g_bIsYourMove )
        iSize = g_GRBMS_Square_iSize;
    elemInner.style.width = iSize * sWordBeingPlaced.length; // must be same size as grid
    elemInner.style.height = iSize; // must be same size as grid
// find the bottom of the grid
    var sIdLast =''
    if ( g_bIsTwistiCross )
        sIdLast = GRB_MakeId(g_iGridHeight-1, g_iGridWidth-1);
    else if ( g_bIsYourMove )
        sIdLast = GRBMS_MakeId(g_iGridHeight-1, g_iGridWidth-1);
    var rectGrid = document.getElementById(sIdLast).getBoundingClientRect();
    elemInner.style.top = MakePixelString(rectGrid.bottom);
    elemInner.style.left = MakePixelString(rectGrid.right);
    elemSA.style.visibility = 'visible';
    var elemSD = document.getElementById("Div_Place_Direct_Down");
    elemSD.style.visibility = 'hidden';
}

function TC_Place_Direct_Down(iRow)
{
    var elemSD = document.getElementById("Div_Place_Direct_Down");
    var sWordBeingPlaced = CAB_ForRow_GetPlayerAnswer(iRow);
    var sPlaceinnerHTML = TC_Place_Direct_MakeButtons(sWordBeingPlaced, false);
    elemSD.innerHTML = sPlaceinnerHTML;
    var elemInner = document.getElementById("Div_Place_Direct_Down_Inner");
    var iSize = g_GRB_Square_iSize;
    if ( g_bIsYourMove )
        iSize = g_GRBMS_Square_iSize;
    elemInner.style.width = iSize;
    elemInner.style.height = iSize * sWordBeingPlaced.length;
// find the bottom of the grid
    var sIdLast = '';
    if ( g_bIsTwistiCross )
        sIdLast = GRB_MakeId(g_iGridHeight-1, g_iGridWidth-1);
    else
        sIdLast = GRBMS_MakeId(g_iGridHeight-1, g_iGridWidth-1);
    var rectGrid = document.getElementById(sIdLast).getBoundingClientRect();
    elemInner.style.top = MakePixelString(rectGrid.bottom);
    elemInner.style.left = MakePixelString(rectGrid.right);
    elemSD.style.visibility = 'visible';
    var elemSA = document.getElementById("Div_Place_Direct_Across");
    elemSA.style.visibility = 'hidden';
}

function TC_Place_Direct_Buttons_EnableDisable_All(bEnabled)
{
    var istart = 0
    for ( var iRow = istart; iRow < g_aAnswers.length; iRow++ )
        TC_Place_Direct_Buttons_EnableDisable(iRow, bEnabled)
}

function TC_Place_Direct_Buttons_EnableDisable(iRow, bEnabled)
{
    var sColor = '#FFFFFF'
    if ( !bEnabled )
        sColor = '#999999'
    var sButtonIdUp = "PlaceDirect_Up_" + iRow;
    var elemButtonUp = document.getElementById(sButtonIdUp);
    elemButtonUp.style.backgroundColor = sColor;
    elemButtonUp.disabled= !bEnabled;
    var sButtonIdDown = "PlaceDirect_Down_" + iRow;
    var elemButtonDown = document.getElementById(sButtonIdDown);
    elemButtonDown.style.backgroundColor = sColor;
    elemButtonDown.disabled= !bEnabled;
}

function TC_Place_Direct_Buttons(iRow)
{
    var sButton = '';
    var sButtonIdUp = "PlaceDirect_Up_" + iRow;
    sButton += '<BUTTON Id="' + sButtonIdUp + '" class="CA_Place_Across_Button" onclick="return TC_Place_Direct_Across(' + iRow + ')"></BUTTON>'
    var sButtonIdDown = "PlaceDirect_Down_" + iRow;
    sButton += '<BUTTON Id="' + sButtonIdDown + '" class="CA_Place_Down_Button"   onclick="return TC_Place_Direct_Down(' + iRow + ')"></BUTTON>'
    return sButton;
}

