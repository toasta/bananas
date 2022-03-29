let dqs = function(w)
{
    return(document.querySelector(w))
}

const useful = [
    ['micro', 10**-6],
    ['milli', 10**-3],
    ['centi', 10**-2],
    [],
    ['', 10**-0],
    ['kilo', 10**3],
]

const bananas = [
    ['tenth', 25.4/10000],
    ['thou', 25.4/1000],
    ['inch', 25.4],
    ['foot', 304.8],
    ['yard', 914.4],
    ['mile', 1.61*1000*1000],
    ['letter A', 2.54*0.234],
    ['letter B', 2.54*0.238],
]

function mc(frac)
{
    let co2 = 200000;
    let bestU = 1
    let bestD = 2;
    let bestV = bestU/bestD;

    let mhalf = .5;
    if(frac < .5)
    {
        mhalf = 0;
    }

    while(true)
    {
        const _nD = Math.floor(Math.random() * 20)
        const nD = 2**_nD;
        const nU = Math.floor(
                (Math.random()/2+mhalf) * nD
                )
        const v2 = nU/nD;
        const diff = Math.abs(v2 - frac)
        if(diff < bestV)
        {
            bestU = nU;
            bestD = nD;
            bestV = diff
            if(diff < 1e-8)
            {
                break;
            }
        }
        if (!--co2)
        {
            break;
        }
    }

    return([bestU, bestD, bestV])

}


let doit = function()
{
    const mm = dqs("#mm").value
    let res = []
    res.push('<table class="bcc">')
    co=0
    for(const i of bananas)
    {
        let unit = i[0]
        let factor = i[1]
        let best = mm/factor
        const val = mm/factor;
        const full = Math.floor(val)
        const frac = val - full
        const resu = mc(frac)
        const u = resu[0]
        const d = resu[1]
        const r = resu[2]

        res.push("<tr>")
        res.push("<td>")
        res.push("$$ ")
        if(full)
        {
            res.push(full)
        }
        res.push(`\\frac{ ${u} }{ ${d} } $$`)
        res.push("</td>")
        res.push("<td>")
        res.push(`$$ \\pm \\varepsilon \\tiny{ ${r} } $$`)
        res.push("</td>")

        res.push("<td>")
        res.push(unit)
        res.push("</td>")

        res.push('<td class="p2">&nbsp;</td>')
        if(co < useful.length && useful[co][1])
        {
            res.push('<td class="ar">')
            res.push(     ((mm / 1000) / useful[co][1]).toFixed(3)  )
            res.push("</td>")
            res.push('<td class="ar">')
            res.push('' + useful[co][0] + ' m')
            res.push("</td>")
            res.push("</tr>")
        }
        co++

    }
    res.push("</table>")
    const r = dqs("#res")
    r.innerHTML = res.join("")
    MathJax.typesetClear([r]);
    MathJax.typesetPromise([r]).then(() => {
        //console.log("All good")
    })
}
    
