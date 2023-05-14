// TC-MakeClasses.js

function TC_MakeClassesForSquares()
{
    let sheetBase = document.createElement('style')
    let sBaseInner = '.TC_Square_Base{left:0px;top:0px;background-color:white;border-collapse:collapse;outline:none;border:0px solid black;caret-color:transparent;background-repeat:no-repeat;display:table-cell;}'
    sheetBase.innerHTML = sBaseInner;
    document.body.appendChild(sheetBase);
// now determine the sizes based on gridwidth
    g_GRBMS_Square_iSize = 80;
    let iFontSize   = 80;
    let iLineHeight = 80;
    switch ( g_iGridWidth )
    {
        case 4:
            g_GRBMS_Square_iSize = 96; iFontSize = 74; iLineHeight = 100;
            break;
        case 5:
            g_GRBMS_Square_iSize = 76; iFontSize = 50; iLineHeight = 76;
            break;
        case 6:
            g_GRBMS_Square_iSize = 64; iFontSize = 40; iLineHeight = 64;
            break;
        case 7:
            g_GRBMS_Square_iSize = 54; iFontSize = 35; iLineHeight = 54;
            break;
    }
// first for the Grid
    let sheetElement = document.createElement('style')
    let sElementInner = '.TC_Square_Grid_Element{width:' + g_GRBMS_Square_iSize + 'px;height:' + g_GRBMS_Square_iSize + 'px;background-size:' + g_GRBMS_Square_iSize + 'px;}';
    sheetElement.innerHTML = sElementInner;
    document.body.appendChild(sheetElement);
    // the character
    let sheetCharacter = document.createElement('style')
    let sCharacterInner = '.TC_Square_Grid_Character{text-align:center;font-family:Arial, Helvetica, sans-serif;font-style:normal;'
    sCharacterInner += 'line-height:' + iLineHeight + 'px;font-size:' + iFontSize + 'px;}'
    sheetCharacter.innerHTML = sCharacterInner;
    document.body.appendChild(sheetCharacter);
// now for the CAB / Special Clue 
// right now this is always size 40 - but done so could change in the future
    g_CAB_Square_iSize  = 40;
    iFontSize = 31;
    iLineHeight = 40;
    let sheetCABElement = document.createElement('style')
    let sElementCABInner = '.TC_Square_CAB_Element{width:' + g_CAB_Square_iSize + 'px;height:' + g_CAB_Square_iSize + 'px;background-size:' + g_CAB_Square_iSize + 'px;}';
    sheetCABElement.innerHTML = sElementCABInner;
    document.body.appendChild(sheetCABElement);
// the character
    let sheetCABCharacter = document.createElement('style')
    let sCharacterCABInner = '.TC_Square_CAB_Character{text-align:center;font-family:Arial, Helvetica, sans-serif;font-style:normal;'
    sCharacterCABInner += 'line-height:' + iLineHeight + 'px;font-size:' + iFontSize + 'px;}'
    sheetCABCharacter.innerHTML = sCharacterCABInner;
    document.body.appendChild(sheetCABCharacter);
}

