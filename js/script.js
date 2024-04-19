const n = document.getElementById("n")
const kq = document.getElementById("kq")
const log = document.getElementById("log")
const okbtn = document.getElementById("ok")
const resetbtn = document.getElementById("reset")
const autobtn = document.getElementById("auto")
let tiep=false, processing=false
n.addEventListener("keydown", function (e) {
    if (e.code === "Enter" || e.key === "Enter") {  //checks whether the pressed key is "Enter"
        xuLi();
        reload();
    }
});
// auto()
run()

async function run() {
    while (true) {
        if (tiep) {
            await random()
            await sleep(1200)
        }
        await sleep(50)
    }
}

function enable(){
    okbtn.removeAttribute("disabled")
    resetbtn.removeAttribute("disabled")
    autobtn.removeAttribute("disabled")
}

function disable() {
    okbtn.setAttribute("disabled", "")
    resetbtn.setAttribute("disabled", "")
    autobtn.setAttribute("disabled", "")
}

async function auto() {
    autobtn.classList.toggle("active")
    tiep=!tiep
}

async function reset() {
    resetbtn.classList.toggle("active")
    tiep=false
    disable()
    autobtn.classList.remove("active")
    reload()
    await clear()
    resetbtn.classList.toggle("active")
    enable()
}

async function clear() {
    await sleep(100)
    var i=log.children.length-1
    while (n.value.length>0) {
        n.value=""
        await sleep(300)
    }
    for (i; i>=0; i--) {
        if (!(log.children[i-1].innerHTML==="&nbsp;"))
            await sleep(250)
        log.children[--i].innerHTML="&nbsp"
        log.children[--i].innerHTML="&nbsp"
    }
}

async function random() {
    let val=parseInt(Math.random() * 101)
    kq.innerHTML="..."
    while (n.value.length>0) {
        n.value=n.value.slice(0, n.value.length-1)
        await sleep(300)
    }
    var s=""+val
    for (var i=0; i<s.length; i++) {
        n.value+=s.at(i)
        await sleep(300)
    }
    await sleep(600)
    if (tiep) {
        okbtn.classList.add("active")
        okbtn.click()
        await sleep(200)
        okbtn.classList.remove("active")
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function reload() {
    n.value=""
    kq.innerHTML="Hay nhap so!"
}

function xuLi() {
    for (var i=1; i<=3; i++)
        log.removeChild(log.lastElementChild)

    const split = document.createElement("div")
    split.classList.add("split")
    log.insertBefore(split, log.firstElementChild)

    let result = document.createElement("div")
    result.classList.add("result")
    log.insertBefore(result, log.firstElementChild)

    let casee = document.createElement("div")
    casee.classList.add("case")
    log.insertBefore(casee, log.firstElementChild)

    casee = document.getElementsByClassName("case")
    result = document.getElementsByClassName("result")

    let val=parseInt(n.value)
    casee[0].innerHTML = val
    if (nguyenTo(val)) {
        kq.innerHTML = "n la so nguyen to!"
        result[0].innerHTML = "ok"
    } else {
        kq.innerHTML = "n khong phai so nguyen to!"
        result[0].innerHTML = "no"
    }
    return true
}

function nguyenTo(n) {
    for (let i=2; i<n; i++)
        if (n%i==0)
            return false;
    return Number.isInteger(n) && n>=2;
}