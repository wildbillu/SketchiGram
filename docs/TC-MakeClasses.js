// TC-MakeClasses.js

function TC_MakeClassesForSquares()
{
    let sheetBase = document.createElement('style')
    let sBaseInner = '.TC_Square_Base{left:0px;top:0px;background-color:white;padding:0px;border-collapse:collapse;outline:none;border:0px solid black;caret-color:transparent;background-repeat:no-repeat;display:table-cell;user-select:none;}'
    sheetBase.innerHTML = sBaseInner;
    document.body.appendChild(sheetBase);
// now determine the sizes based on gridwidth
    g_GRB_Square_iSize = 80;
    let iFontSize   = 80;
    let iLineHeight = 80;
    let is = 80;
    switch ( g_iGridWidth )
    {
        case 3:
            g_GRB_Square_iSize = 146; iFontSize = 120; iLineHeight = 150;
            break;
        case 4:
            g_GRB_Square_iSize = 136; iFontSize = 100; iLineHeight = 140;
            break;
        case 5:  // 630/5 = 126
            g_GRB_Square_iSize = 122; iFontSize = 80; iLineHeight = 126;
            break;
        case 6:  // 630/6 = 105
            is = 84;
            g_GRB_Square_iSize = 101; iFontSize = 60; iLineHeight = 105;
            break;
        case 7:  // 630/7 = 90
            is = 84;
            g_GRB_Square_iSize = is; iFontSize = 45; iLineHeight = is + 4;
            break;
        case 8:  // 630/8 = 76
            is = 68;
            g_GRB_Square_iSize = 68; iFontSize = 40; iLineHeight = is + 4;
            break;
    }
// first for the Grid
    let sheetElement = document.createElement('style');
    let sElementInner = '.TC_Square_Grid_Element{width:' + g_GRB_Square_iSize + 'px;height:' + g_GRB_Square_iSize + 'px;background-size:' + g_GRB_Square_iSize + 'px;}';
    sheetElement.innerHTML = sElementInner;
    document.body.appendChild(sheetElement);

//    let sheetHover = document.createElement('style');
//    let sHoverInner = '.TC_Square_Grid_Element:hover{background-color: lightblue;}'
//    sheetHover.innerHTML = sHoverInner;
//    document.body.appendChild(sheetHover);

    // the character
    let sheetCharacter = document.createElement('style')
    let sCharacterInner = '.TC_Square_Grid_Character{'
    sCharacterInner += 'text-align:center;font-family:Arial, Helvetica, sans-serif;font-style:normal;'
    sCharacterInner += 'line-height:' + iLineHeight + 'px;font-size:' + iFontSize + 'px;'
//    sCharacterInner += 'cursor: pointer;'
//    sCharacterInner += 'cursor: url(images/StatusIndicators/ArrowCursor.png), pointer; '
    sCharacterInner += '}';
    sheetCharacter.innerHTML = sCharacterInner;
    document.body.appendChild(sheetCharacter);
// now for the CAB / Special Clue 
// right now this is always size 40 - but done so could change in the future
    let sheetCABElement = document.createElement('style')
    let sElementCABInner = '.TC_Square_CAB_Element{width:' + g_CAB_Square_iSize + 'px;height:' + g_CAB_Square_iSize + 'px;background-size:' + g_CAB_Square_iSize + 'px;}';
    sheetCABElement.innerHTML = sElementCABInner;
    document.body.appendChild(sheetCABElement);
// the character
    let sheetCABCharacter = document.createElement('style')
    let CAB_iLineHeight = g_CAB_Square_iSize;
    let CAB_iFontSize   = g_CAB_Square_iSize * .8;

    let sCharacterCABInner = '.TC_Square_CAB_Character{text-align:center;font-family:Arial, Helvetica, sans-serif;font-style:normal;'
    sCharacterCABInner += 'line-height:' + CAB_iLineHeight + 'px;font-size:' + CAB_iFontSize + 'px;}'
    sheetCABCharacter.innerHTML = sCharacterCABInner;
    document.body.appendChild(sheetCABCharacter);
}

