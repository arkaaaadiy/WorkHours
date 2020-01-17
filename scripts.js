function test(el, source) {        
   let ul = document.getElementById(el)
//    identic(source)
   let res = identic(source);
    res.map((day) => {
        
         let start = moment(`${minutes(day.time.start)}`, "hhmm").format('LT')
         let end = moment(`${minutes(day.time.end)}`, "hhmm").format('LT')
         let li = document.createElement('li')
         li.innerText = `${getPeriod(getSliceName(day.names))}: ${start} - ${end}`
         ul.append(li)
    })
}
test('box1', source)
test('box2', source2)
test('box3', source3)

function minutes(number) {
    return `${Math.trunc(number)}.${(number - Math.trunc(number))*60}`
}
function getSliceName(arr) {
    let result =  arr.map(str => {        
        return str.slice(0,3)        
    })  
    return result
}

function getPeriod(arr) {
    if (arr.length > 1) {
        return `${arr[0]} - ${arr[arr.length-1]}`
    } else {
        return arr
    }
}
function identic(source) {
    const res = []

    source.order.forEach((day, i) => {
        const daySource = source.days[day]        
        
        if (!daySource) {
            res.push(null)
            return
        }
        
        const isIntermediate = () => {
            const previosDay = res[res.length-1]
            
            if (res.length == 0) {
                return false
            }
            if (previosDay == null) {
                return false
            }
            if (previosDay.time.start !== daySource.start) {
                return false
            }
            if (previosDay.time.end !== daySource.end) {
                return false
            }
            return true
        }

        
        if (isIntermediate()) {            
            res[res.length-1].names.push(day)            
        } else {            
            res.push({
                names: [day],
                time: daySource
            })
        }
        
    })
    
    return res.filter(n => n!=null)
   
    // for (const day of Object.entries(obj.days)) {        
    //     start.push(day)
    // }
    // let simile = {
    //     firste: true,
    //     strat: 0,
    //     end: 0
    // } 
    
    // test = start.filter(function (elem, pos, arr) {
    //     console.log(arr.indexOf(elem[1]));
    //     return pos !== arr.indexOf(elem) || pos !== arr.lastIndexOf(elem);
    // });
    // console.log('test',test);
    // start.map(e => {        
    //     if (e[1] == simile.strat && e[2] == simile.end){
    //        console.log('if',e);
    //     } else if (simile.firste){
    //         simile.strat = e[1]
    //         simile.end = e[2]
    //         simile.firste = false
    //         console.log('elseif',e); 
    //     } else {
    //         simile.strat = e[1]
    //         simile.end = e[2]
    //          console.log('elseif', e);
    //     }
    // })  
    // console.log(simile);   
    
    // console.log(start);
}
