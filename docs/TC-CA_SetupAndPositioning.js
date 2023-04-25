// TC-SG-SG2-CADisplayHelpers.js

var g_SG_Clues_bCreated = false;
var g_SG2_CAB_bVisible = false;
var g_SG_SC_FrameOnly   = -1;
var g_SG_SC_ShowAll     = -2;

var g_CA_bShowSpecial = false;

function SG_MakeClueTextId(iRow)
{
    return 'SG_Clues_Text_' + iRow;
}

function SG_SetupClueAnswers()
{
    SG_PositionClueOverallDiv();
// first do the special row stuff
    let iWidthClues = g_Window_iWidth - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize;
    let elemClue_Div = document.getElementById("SG_Clues_Div");
    let sFinalInner = '';
    if ( TC_ForIndexIsClueTypeSpecial(0) && TC_ForIndexIsClueTypeSpecial(1) )
        g_CA_bShowSpecial = true;
//
    sFinalInner += '<DIV Id="CA_Title" class="SG_Clues_Text">Clues (not in order)</DIV>'
    if ( g_CA_bShowSpecial )
    {
        let sInnerFullSpecialClue = '';
        sInnerFullSpecialClue += '<DIV Id="SG_SpecialClue_Outer_Div" class="SG_SpecialClue_Outer_Div TC_StartHidden InLineRelative">';
        sInnerFullSpecialClue += '<DIV Id="SG_SpecialClue_ClueItselfText_Div" class="SG_SpecialClue_Text">' + g_ST_sClue_Itself + '</DIV>';
        let sWrappedSpecialClueItself = '<DIV Id="SG_SpecialClue_AnswerItselfText_Div" class="SG_SpecialClue_Text">'
        sWrappedSpecialClueItself += 'DUMMY'; 
        sWrappedSpecialClueItself += '</DIV>'
        sInnerFullSpecialClue += sWrappedSpecialClueItself;
        sInnerFullSpecialClue += '</DIV>';
        sFinalInner += sInnerFullSpecialClue;
    }
    let iMaxRow = g_CAB_aAnswers.length
    for ( let iRow = 0; iRow < iMaxRow; iRow++ )
    {
        if ( !g_CA_bShowSpecial || !TC_ForIndexIsClueTypeSpecial(iRow) )
        {
            let sCluePlus = 'dummy';
            let sWrapped = '<DIV Id="' + SG_MakeClueTextId(iRow) + '" class="SG_Clues_Text TC_StartHidden">' + sCluePlus + '</DIV>'
            sFinalInner += sWrapped;
        }
    }
    elemClue_Div.innerHTML = sFinalInner;
    let iTotalHeight = 0;
    if ( g_CA_bShowSpecial ) iTotalHeight += TC_MoveTopAndAdjustBiggestBottom("SG_SpecialClue_Outer_Div", iTotalHeight);
    let iSingleRowHeight = 0;
    for ( let iRow = 0; iRow < iMaxRow; iRow++ )
    {
        if ( !g_CA_bShowSpecial || !TC_ForIndexIsClueTypeSpecial(iRow) )
        {
            // this part is incase clue needs two rows
            let sId = SG_MakeClueTextId(iRow);
            let elemRow = document.getElementById(sId);
            // need to determine if we need two rows
            let iWidthThisRow = GetWidthOfTextInPixels(elemRow, elemRow.innerHTML);
            let rect = elemRow.getBoundingClientRect();
            iSingleRowHeight = rect.height
            if ( iWidthThisRow > iWidthClues )
                elemRow.style.height = MakePixelString(2 * iSingleRowHeight);
            iTotalHeight += TC_MoveTopAndAdjustBiggestBottom(sId, iTotalHeight);
            document.getElementById(sId).style.width = MakePixelString(iWidthClues);
        }
    }
    iTotalHeight += iSingleRowHeight;
    elemClue_Div.style.width = MakePixelString(iWidthClues);
    elemClue_Div.style.height = MakePixelString(iTotalHeight);
    if ( g_CA_bShowSpecial )
    {
        let elemSpecialClue_Outer = document.getElementById("SG_SpecialClue_Outer_Div");
        elemSpecialClue_Outer.style.width = MakePixelString(iWidthClues-2);
    }
    g_SG_Clues_bCreated = true;
}

function SG_PositionClueOverallDiv()
{
// if the keypad is visible we go below it
// if not we go below the grid
    let elemClues = document.getElementById("SG_Clues_Div");
    let iStartTop = 0;
    let elemKB = document.getElementById("KB_Mini_Div");
    let elemGrid = document.getElementById("Div_Grid");
    let rectGrid = GetBoundingClientRectAbsolute(elemGrid);
    let rectKB = GetBoundingClientRectAbsolute(elemKB);
    if ( window.getComputedStyle(elemKB).visibility === "hidden" ) 
    {
        iStartTop = rectGrid.bottom + g_TC_Padding_Inter_Vertical_iSize;
    }
    else
    {
        iStartTop = rectKB.bottom + g_TC_Padding_Inter_Vertical_iSize;
    }
    elemClues.style.top = MakePixelString(iStartTop);
}
