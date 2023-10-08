// TC-CluesAsList.js

function TC_CAL_Fill()
{
    let elem = document.getElementById("CluesAsList_Div");
    let sInner = '';
// want to put them in puzzle order
    sInner += '<br>' + '&nbsp;&nbsp;&nbsp;&nbsp;Across' + '<br>';
    let iTotalLines = 5;    
    let iWidthMax = 10;
    for ( let iA = 1; iA < 20; iA++ )    
    {
        let sN = iA.toString();
        let sA = sN + ' Across';
        let iFound = g_CAB_aAnswerLocations.indexOf(sA);
        if ( iFound != -1 )
        {
            let sLineWithNBSP = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + sN + '.&nbsp;' + g_CAB_aClues[iFound] + '&nbsp;:&nbsp;' + g_CAB_aAnswers[iFound]  + '&nbsp;&nbsp;&nbsp;&nbsp;';
            let sLine = sN + '.' + g_CAB_aClues[iFound] + ':' + g_CAB_aAnswers[iFound];
            let iWidth = GetWidthOfTextInPixels(elem, sLine);
            if ( iWidth > iWidthMax ) iWidthMax = iWidth;
            sInner += sLineWithNBSP + '<br>';
            iTotalLines++;
        }
    }
    sInner += '<br>'
    sInner += '&nbsp;&nbsp;&nbsp;&nbsp;Down' + '<br>'
    for ( let iA = 1; iA < 20; iA++ )    
    {
        let sN = iA.toString();
        let sA = sN + ' Down';
        let iFound = g_CAB_aAnswerLocations.indexOf(sA);
        if ( iFound != -1 )
        {   
            let sLineWithNBSP = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + sN + '.&nbsp;' + g_CAB_aClues[iFound] + '&nbsp;:&nbsp;' + g_CAB_aAnswers[iFound] + '&nbsp;&nbsp;&nbsp;&nbsp;';
            let sLine = sN + '.' + g_CAB_aClues[iFound] + ':' + g_CAB_aAnswers[iFound];
            let iWidth = GetWidthOfTextInPixels(elem, sLine);
            if ( iWidth > iWidthMax ) iWidthMax = iWidth;
            sInner += sLineWithNBSP + '<br>';
            iTotalLines++;
        }
    }
    elem.innerHTML = sInner;
    iWidthMax += g_CAL_iPadding;
    let iHeight = iTotalLines * g_CAL_iLineHeight
    elem.style.height = MakePixelString(iHeight);
    elem.style.width  = MakePixelString(iWidthMax);
    let iTop = g_CAL_iBottom - iHeight;
    elem.style.top    = MakePixelString(iTop);
    if ( g_CAL_iLeft != -1 )
        elem.style.left = MakePixelString(g_CAL_iLeft);
    else
        elem.style.left = MakePixelString(TC_LeftForCentering(iWidthMax));
}

function TC_CAL_Show()
{ // already set position
    TC_SetVisible("CluesAsList_Div")
    TC_ForIdSetZIndex("CluesAsList_Div", g_CAL_izIndex);
}

function CAL_Hide()
{
    let elem = document.getElementById("CluesAsList_Div");
    elem.style.visibility = 'hidden';
}
