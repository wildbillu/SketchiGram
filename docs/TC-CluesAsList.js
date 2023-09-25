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
    iWidthMax += g_CAL_iPadding;

    elem.style.height = MakePixelString(iTotalLines * 20);
    elem.style.width  = MakePixelString(iWidthMax);
    elem.style.top    = MakePixelString(g_CAL_iTop);
    if ( g_CAL_iLeft != -1 )
        elem.style.left = MakePixelString(g_CAL_iLeft);
    else
        elem.style.left = MakePixelString(TC_LeftForCentering(iWidthMax));
    elem.innerHTML = sInner;
}

function TC_CAL_Show()
{
    let elem = document.getElementById("CluesAsList_Div");
    let rectElem = GetBoundingClientRectAbsolute(elem);
    let iHeight = rectElem.height;
    let iTop = g_Window_iHeight - iHeight;
    elem.style.top = MakePixelString(iTop);
    elem.style.visibility = 'visible';
    

    g_bSuppressGridNumbers = false;
    GRB_SetAllButtons_Inactive();
}

function CAL_Hide()
{
    let elem = document.getElementById("CluesAsList_Div");
    elem.style.visibility = 'hidden';
}
