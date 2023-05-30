let BASE_URL="  http://localhost:3000/cards"
let form=document.querySelector("form")
let allInpus=document.querySelectorAll(".form-control")
form.addEventListener("submit",function(e){
    e.preventDefault()
    let obj={
        img:`./FINALEXAM/images/${allInpus[0].value.split("\\")[2]}`,
        title:allInpus[1].value,
        info:allInpus[2].value
    }
    axios.post(`${BASE_URL}`,obj)
    window.location="index.html"

})