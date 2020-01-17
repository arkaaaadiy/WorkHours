class WorkHours {
    constructor(el, source) {
        this.$el = document.querySelector(el);
        this.source = source


        if (this.$el) {
            this.printTime()            
        }
    }

    getGroupedDays() {
        const res = []

        source.order.forEach((day, i) => {
            const daySource = this.source.days[day]

            if (!daySource) {
                res.push(null)
                return
            }

            const isIntermediate = () => {
                const previosDay = res[res.length - 1]

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
                res[res.length - 1].names.push(day)
            } else {
                res.push({
                    names: [day],
                    time: daySource
                })
            }

        })

        return res.filter(n => n != null)
    }

    getMinutes(time){
        return `${Math.trunc(time)}.${(time - Math.trunc(time))*60}`
    }

    getDayString(names, start, end){
        return `${this.getPeriodDays(names)}: ${this.getFormatedTime(start)} - ${this.getFormatedTime(end)}`
    }

    getPeriodDays(days) {
        if (days.length > 1) {
            return `${this.getStringShortName(days[0])} - ${this.getStringShortName(days[days.length-1])}`
        } else {
            return `${this.getStringShortName(days[0])}`
        }
    }
    getFormatedTime(time){
        return `${moment(`${this.getMinutes(time)}`, "hhmm").format('LT')}`
    }
    getStringShortName(days){        
        return days.slice(0, 3)        
    }

    printTime($el, days, tagName){
        var $el = $el ||this.$el
        var days = days || this.getGroupedDays()
        var tagName = tagName || 'li'

        days.forEach( e => {
            $el.innerHTML += `<${tagName}>${this.getDayString(e.names, e.time.start, e.time.end)}</${tagName}>`
        })
    }
}

new WorkHours('#box1 ul', source)
new WorkHours('#box2 ul', source2)
new WorkHours('#box3 ul', source3)
