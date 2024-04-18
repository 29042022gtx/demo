const n = document.getElementById("n")
const kq = document.getElementById("kq")
const log = document.getElementById("log")
const dung = document.getElementById("auto")
var tiep=false
for (var i=0; i<log.children.length; i++)
    log.children[i].style.visibility="hidden"
n.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        xuLi();
        reload();
    }
});
run()


function reset() {
    for (var i=0; i<log.children.length; i++)
    log.children[i].style.visibility="hidden"
}

function dt() {
    tiep=!tiep
    dung.classList.toggle("active")
}

async function run() {
    if (tiep)
        await random()
    await sleep(1200)
    run()
}

async function random() {
    let val=parseInt(Math.random() * 101)
    n.value = val
    // await sleep(250)
    kq.innerHTML="...&nbsp"
    await sleep(600)
    document.getElementById("ok").classList.toggle("active")
    document.getElementById("ok").click()
    await sleep(200)
    document.getElementById("ok").classList.toggle("active")
    return true
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

function chay() {
    var n=parseFloat(prompt("Nhap n:"))
    while (isNaN(n))
        n=parseInt(prompt("Nhap lai:"))
    var tiep
    if (nguyenTo(n))
        tiep=confirm("n la so nguyen to! \nTiep tuc?")
    else
        tiep=confirm("n khong phai so nguyen to! \nTiep tuc?")
    return tiep
}

function nguyenTo(n) {
    for (let i=2; i<n; i++)
        if (n%i==0)
            return false;
    return Number.isInteger(n) && n>=2;
}