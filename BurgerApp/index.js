import {menuArray} from "/data.js"

const bodyEl = document.querySelector("body")
const sectionEl = document.getElementById("section")
const theOrderEl = document.getElementById("btm-section")
const listOrderEl = document.getElementById("order")
const totalCostEl = document.getElementById("total-cost")
const orderForm = document.getElementById('order-form')
const rateEL = document.getElementById("rate")

let myOrder = []


bodyEl.addEventListener("click", function(e){
    if(e.target.dataset.addId){
        addItem(e.target.dataset.addId)
    }else if(e.target.dataset.remove) {
        removeItem(e.target.dataset.remove)
    }else if (e.target.id === "order-btn") {
        document.getElementById("absolute-form").classList.remove("hidden")
    } else if (e.target.id === "close-btn") {
        document.getElementById("absolute-form").classList.add("hidden")
    } else if (e.target.id === "submit-btn") {
        e.preventDefault()
        finishOrder()
    } else if (e.target.id === "rate-btn") {
        hide(rateEL)
        document.getElementById("par").classList.remove("hidden")
        document.getElementById("par").innerHTML = "We have received your rate!"
    } else if(e.target.id === "mini") {
        theOrderEl.classList.add("hidden")
    }
})

rateEL.addEventListener("mouseover", function(e){
    if(e.target.classList[1] === "fa-star") {
        rateStars(e.target.id)
    }
})

const allItems = menuArray.map(item => {
    return `
    <div class="section-item">
        <div class="sub-section-1">
            <div>
                <img
                class="item-img"
                src="./images/${item.emoji}"
                alt="${item.name}">
                   
            </div>
            <div>
                <h2>${item.name}</h2> 
                <h4 class="light">${item.ingredients}</h4>
                <h3>$${item.price}</h3>
            </div>
        </div>
        <div class="sub-section-2">
            <div>
                <button class="btn" id="btn-add" data-add-Id="${item.id}">+</button>
            </div>
        </div>
    </div>
    `
    

}).join('')

function addItem(givenValue) {
    hide(rateEL)
    hide(document.getElementById("love-msg"))
    hide(document.getElementById("par"))
    let selectedItem = menuArray.filter(item => {
         if(item.id === Number(givenValue)) {
            return item
         }
    },)[0]
    if(!myOrder.includes(selectedItem)) {
        myOrder.push(selectedItem)
        orderRender(selectedItem)
        theOrderEl.classList.remove("hidden")
    } 
}

function removeItem(givenValue) {
    for(let i=0; i < myOrder.length; i++) {
        if(myOrder[i].id === Number(givenValue)) {
            myOrder.splice(i, 1)
        }
    }
    clearOrder(myOrder)
    myOrder.forEach(item => orderRender(item))
    calculateTotalCost(myOrder)
}

function orderRender(givenValue) {
    listOrderEl.innerHTML += `
    <div class="items-ordered">
        <div class="items-ordered-left">
            <h3>${givenValue.name}</h3>
            <h4 class="remove-btn" data-remove="${givenValue.id}">remove</h4>
        </div>
        <h4>$${givenValue.price}</h4>
    </div>
` 
    calculateTotalCost(myOrder)
}

function clearOrder() {
    listOrderEl.innerHTML = ``
    myOrder.length === 0 ? hide(theOrderEl) : `` 
}

function calculateTotalCost(givenValue) {
    if(givenValue.length > 0) {
        let totalCost = myOrder.map(item => {
            return item.price
        })
        totalCostEl.innerHTML = `
        $${totalCost.reduce((total, price) => total + price)}
        `
    } else {
        totalCostEl.innerHTML = '$0'
    }
}

function finishOrder() {     
        let allChecked = checkInputs()  
        if(allChecked === true ) {
            const loginFormData = new FormData(orderForm)
            const name = loginFormData.get("name")
            hide(document.getElementById("absolute-form"))
            theOrderEl.classList.add("hidden") 
            document.getElementById("love-msg").innerHTML = `
            Thanks, ${name}! Your order is on it's way
            `
            document.getElementById("love-msg").classList.remove("hidden")
            rateEL.classList.remove("hidden")
            myOrder = []
            listOrderEl.innerHTML = ``
            clearForm()
        }else {
            alert("Please fill all the boxes")
        }
}

function clearForm() {
    console.log("hey")
    document.getElementById("name-input").value = ""
    document.getElementById("card-input").value = ""
    document.getElementById("cvv-input").value = ""
}
function checkInputs() {
    if(!document.getElementById("name-input").value || !document.getElementById("card-input").value
    || !document.getElementById("cvv-input").value) {
        return false
    } else {
        return true
    }
}

function rateStars(givenValue) {
    clearStars()
    for(let i = 1; i<(1+Number(givenValue)); i++){
        document.getElementById(`${i}`).style.color = "gold"
    }
    setTimeout(() => {
        rateTitle(givenValue)
    }, 50);
}

function clearStars() {
    for(let i = 1; i<6; i++){
        document.getElementById(`${i}`).style.color = "inherit"
    }
}

function rateTitle(givenValue) {
    let answer = ""
    console.log(givenValue)
    switch(givenValue) {
        case `1` :
            answer ='Bad'
            break
        case `2` :
            answer ='Medium'
            break
        case `3` :
            answer ='Good'
            break
        case `4` :
            answer ='Very Good'
            break
        case `5` :
            answer ='Excellent!'
            break
        default:
            answer =`Rate us!`
    }
    document.getElementById("rate-an").innerHTML = answer
}

function hide(givenValue) {
    givenValue.classList.add("hidden")
}

sectionEl.innerHTML = allItems