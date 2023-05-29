// TC-History.js

var TC_aHistory_GridMoves = [];
var TC_aHistory_SpecialClueMoves = [];

function TC_History_Clear()
{
    TC_aHistory_GridMoves.length;
    TC_aHistory_SpecialClueMoves.length;
}

function TC_History_MakeEntry_Grid(cLetter, iRow, iLetter)
{
    let sEntry = '';
    sEntry = 'GP[' + cLetter + ':' + iRow + ':' + iLetter + ']';
    return sEntry;
}

function TC_History_GridEntry_iRow(sEntry)
{
    return parseInt(sEntry.charAt(5))
}
function TC_History_GridEntry_iLetter(sEntry)
{
    return parseInt(sEntry.charAt(7))
}

function TC_History_GridEntry_cLetter(sEntry)
{
    return sEntry.charAt(3);
}

function TC_History_Add_GridLetterPlaced(cLetter, iRow, iLetter)
{   
    let sEntry = TC_History_MakeEntry_Grid(cLetter, iRow, iLetter);
    TC_aHistory_GridMoves.push(sEntry);
}

function TC_History_MakeEntry_SpecialClue(cLetter, iRow, iLetter)
{
    let sEntry = 'SC[' + cLetter + ':' + iRow + ':' + iLetter + ']';
    return sEntry;
}

function TC_History_Add_SpecialClueLetterPlaced(cLetter, iRow, iLetter)
{
    let sEntry = TC_History_MakeEntry_SpecialClue(cLetter, iRow, iLetter);
    TC_aHistory_SpecialClueMoves.push(sEntry);
}

