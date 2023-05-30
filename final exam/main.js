let BASE_URL=" http://localhost:3000/cards"
let menu=document.querySelector(".fa-bars")
let nav=document.querySelector("nav")
menu.addEventListener("click",function(){
    nav.classList.toggle("show")
    this.classList.contains("fa-bars")
    ?(this.classList="fa-solid fa-xmark")
    :(this.classList="fa-solid fa-bars")
})
let row = document.querySelector(".last-row");
let search = document.querySelector(".search");
let sortBtn = document.querySelector(".sortBtn");
function allData(arr) {
  row.innerHTML = "";
  arr.forEach((obj) => {
    row.innerHTML += `
        <span class=" col-md-4 col-sm-12 my-3">
                <div class="card" >
                    <img src="${obj.img}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 >${obj.title}</h5>
                      <p>${obj.info}</p>
                    </div>
                    <div><button class="btn btn-danger" onclick=deleteCard(${obj.id},this)>Delete</button></div>
                  </div>
            </span>
        `;
  });
}
axios(`${BASE_URL}`).then((res)=>allData(res.data))
async function deleteCard(id,btn){
    await axios.delete(`${BASE_URL}/${id}`)
    btn.closest("span").remove()
}

search.addEventListener("input",function(e){
    console.log(e.target.value)
    axios(`${BASE_URL}`).then((res)=>{
        let filteredData=res.data.filter((item)=>item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()))
        allData(filteredData)
    })

})
sortBtn.addEventListener("click",function(){
    if(sortBtn.innerHTML=="Asc"){
        axios(`${BASE_URL}`).then((res)=>{
            let sortAsc=res.data.sort((a,b)=>a.price-b.price)
            allData(sortAsc)
        })
        this.innerHTML="Des"
    }else if(this.innerHTML=="Des"){
        axios(`${BASE_URL}`).then((res)=>{
            let sortAsc=res.data.sort((a,b)=>b.price-a.price)
            allData(sortAsc)
        })
        this.innerHTML="Def"
    }else{
        axios(`${BASE_URL}`).then((res)=>{
            allData(res.data)
        })
        this.innerHTML="Asc"
    }
})