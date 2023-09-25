// TC-History.js

var TC_aHistory_GridMoves = [];

var TC_aHistory_Exchanges = [];
var TC_History_bUndoAllowed = false;

function TC_History_UndoLast()
{
    if ( TC_aHistory_Exchanges.length == 0 )
        return;
    let a = TC_aHistory_Exchanges.pop();
    if ( a[0] == 'GE' )
    {
        GRB_SwitchAnswers(a[3], a[4], a[1], a[2]);
        let elem = document.getElementById(GRB_MakeId(a[1], a[2]));
        GRB_onfocus(elem);
        TC_aHistory_Exchanges.pop();// pop so it doesnt become a redo
        TC_CR_SetStatus('Undo', !(TC_aHistory_Exchanges.length == 0));
        return;
    }
    if ( a[0] == 'SC' )
    {
        CAB_ForRowLetter_DoItAll(a[4], a[1], a[2]);
        let elem = document.getElementById(CAB_MakeId(a[1], a[2]));
        CAB_onfocus(elem);
        TC_aHistory_Exchanges.pop();// pop so it doesnt become a redo
        TC_CR_SetStatus('Undo', !(TC_aHistory_Exchanges.length == 0));
        return;
    }
}

function TC_History_AddEntry_GridExchange(iRow_A, iLetter_A, iRow_B, iLetter_B)
{
    let aGE = [];
    aGE.push('GE')
    aGE.push(iRow_A);
    aGE.push(iLetter_A);
    aGE.push(iRow_B);
    aGE.push(iLetter_B);
    TC_aHistory_Exchanges.push(aGE);
    TC_History_bUndoAllowed = true;
    TC_CR_SetStatus('Undo', !(TC_aHistory_Exchanges.length == 0))
}

function TC_History_Clear()
{
    TC_aHistory_GridMoves.length = 0;
    TC_aHistory_Exchanges.length = 0;
}

function TC_History_Add_SpecialClueLetterPlaced(cLetter, iRow, iLetter, cInitialLetter)
{
    let aSC = [];
    aSC.push('SC')
    aSC.push(iRow);
    aSC.push(iLetter);
    aSC.push(cLetter);
    aSC.push(cInitialLetter);
    TC_aHistory_Exchanges.push(aSC);
    TC_History_bUndoAllowed = true;
    TC_CR_SetStatus('Undo', !(TC_aHistory_Exchanges.length == 0))

}

