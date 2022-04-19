const billValue    = document.querySelector("#bill-value")
const peopleNumber = document.querySelector("#people-value")
const tips         = document.querySelectorAll(".tips div")
const customTip    = document.querySelector("#custom")
const labelErrP    = document.querySelector(".people .error")
const tipAmountEl  = document.querySelector(".value-tip")
const totAmountEl  = document.querySelector(".value-total")
const resetBtn     = document.querySelector(".reset")

function validBill() {
    if(!isNaN(billValue.value)) {
        if (billValue.value >= 0) {
            return true
        }
    }
}

function validPeople() {
    if(!isNaN(peopleNumber.value)) {
        if(peopleNumber.value === "0") {
            labelErrP.classList.remove("hide")
            peopleNumber.classList.add("error")
            return false
        } else {
            labelErrP.classList.add("hide")
            peopleNumber.classList.remove("error")
            return true
        }
    }
}


let billAmount       = 0
let tipPercent       = 0
let customTipPercent = 0
let tipAmount        = 0
let totalAmount      = 0
let numPeople        = 0

tips.forEach(tip => {
    tip.addEventListener("click", ()=> {

        if(validBill() && validPeople()) {

            customTipPercent = 0
            tips.forEach(tip=>tip.classList.remove("clicked"))
            tip.classList.add("clicked")

            billAmount = parseFloat(billValue.value)
            numPeople  = parseInt(peopleNumber.value)
            tipPercent = parseFloat(tip.dataset.num / 100)
            
            let totalTip   = billAmount * tipPercent
            let tipPerson   = (totalTip / numPeople).toFixed(2)
            let totalPerson = ((billAmount + totalTip) / numPeople).toFixed(2)

            tipAmountEl.textContent = `$${tipPerson}`
            totAmountEl.textContent = `$${totalPerson}`
        }
    })
})

function calculateCustomTip() {
    if(validBill() && validPeople()) {
        billAmount = parseFloat(billValue.value)
        numPeople  = parseInt(peopleNumber.value)
        customTipPercent = parseFloat(customTip.value / 100)
        let totalTip   = billAmount * customTipPercent
        let tipPerson   = (totalTip / numPeople).toFixed(2)
        let totalPerson = ((billAmount + totalTip) / numPeople).toFixed(2)

        tipAmountEl.textContent = `$${tipPerson}`
        totAmountEl.textContent = `$${totalPerson}`
   }
}


customTip.addEventListener("input",()=> {

    tips.forEach(tip=>tip.classList.remove("clicked"))
    if (customTip.value !== "") {
        calculateCustomTip()
    }
})
billValue.addEventListener("input",()=> {

    tips.forEach(tip=>tip.classList.remove("clicked"))
    if (customTip.value !== "") {
        calculateCustomTip()
    }
})
peopleNumber.addEventListener("input",()=> {
    validPeople()
    tips.forEach(tip=>tip.classList.remove("clicked"))
    if (customTip.value !== "") {
        calculateCustomTip()
    }
})

resetBtn.addEventListener("click", ()=> {
    billAmount       = 0
    tipPercent       = 0
    customTipPercent = 0
    tipAmount        = 0
    totalAmount      = 0
    numPeople        = 0
    tipAmountEl.textContent = "$0.00"
    totAmountEl.textContent = "$0.00"
    billValue.value = ""
    peopleNumber.value = ""
    tips.forEach(tip=>tip.classList.remove("clicked"))

})