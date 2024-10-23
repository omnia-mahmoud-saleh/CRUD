let input= document.querySelectorAll("input");
let addproduct = document.getElementById("addproduct");

// table data
let product_name = document.getElementById("name");
let category = document.getElementById("category");
let cost_input = document.querySelectorAll("#cost_input input");
let count = document.getElementById("count");
let image = document.getElementById("my_image");

let emptytask=document.getElementById("empty_task");
let product_div = document.getElementById("product_div");
let product = document.getElementById("product");
let clear_all = document.getElementById("clear_all");
let tbody = document.getElementById("tbody");
let layout = document.getElementById("layout");
let layout2 = document.querySelector(".layout2");
let close_icon = document.getElementById("closeicon");
let closemodal = document.getElementById("closemodal")
let confirmdelete = document.getElementById("confirmdelete");
let mood = 'create';
let globalid;


// function to get net profit
let get_profit= ()=>{
    let cost=cost_input[0].value;
    let tax =cost_input[1].value;
    let my_return =cost_input[2].value;
    let discount =cost_input[3].value;
    let sales_cost =cost_input[4].value;
    let net_profit =cost_input[5].value;

    let tax_cost= cost * (+tax/100);
    let costafteraddtax= +cost+ +tax_cost;
    let my_return_profit = +costafteraddtax + +my_return;
    let discountcost = my_return_profit *(+discount/100);
    let my_return_profit_after_discount= my_return_profit - discountcost;
    cost_input[4].value=Math.ceil(+my_return_profit_after_discount);
    cost_input[5].value=Math.ceil(my_return_profit_after_discount- +costafteraddtax);

}
for (let i = 0 ;i<cost_input.length ; i++){
    cost_input[i].addEventListener('keyup',get_profit);
}

// -------------check empty_task----------------------
if(localStorage.myProducts == null){
    all_product= [] ;
} else{
    all_product=JSON.parse(localStorage.getItem("myProducts"));
}

let checkempty = ()=>{
    if(tbody.childElementCount==0 || localStorage.length==0 || all_product.length==0){
        emptytask.classList.remove("none");
        product_div.classList.add("none");
        clear_all.classList.add("none");
 }   else{
        emptytask.classList.add("none");
        product_div.classList.remove("none");
        clear_all.classList.remove("none");
   }
}
checkempty();
// ---------------------------------------------------------------

let reset_input = ()=>{
    product_name.value = "";
    category.value = "";
    cost_input[0].value = "";
    cost_input[1].value = "";
    cost_input[2].value = "";
    cost_input[3].value = "";
    cost_input[4].value = "";
    cost_input[5].value = "";
    image.value = "";
}


let creat_object = ()=>{
    let new_product={
        product_name : product_name.value, 
        category : category.value,
        cost : cost_input[0].value,
        tax : cost_input[1].value,
        my_return : cost_input[2].value,
        discount : cost_input[3].value,
        sales_cost : cost_input[4].value,
        net_profit : cost_input[5].value,
        image : image.value,
    }

    //if(errors.length == 0 && errorsnumber.length == 0) { 
    if (mood == 'create'){
        if (count.value <=0){
            all_product.push(new_product);
        } else{
            for(let i =1 ; i<count.value ; i++){
                all_product.push(new_product);
            }
        }
       } else{
            all_product[globalid] = new_product;
            count.disabled = false;
            addproduct.innerHTML = "Add Product";
            addproduct.classList.replace  ("btn-warning","btn-info");
        }
    
   

    all_product.push(new_product);
    localStorage.setItem("myProducts", JSON.stringify(all_product));
    product_div.classList.remove("none");
    clear_all.classList.remove("none");
    emptytask.classList.add("none");
    console.log(all_product);
    show_data();
    reset_input();

  }
    // }

addproduct.addEventListener("click",creat_object);

//================show data in table========================
let show_data = ()=> {
    let table_row = "";
    for (let i = 0 ; i< all_product.length; i++){
        table_row +=`
        <tr>
        <th> ${i+1} </th>
        <th> ${all_product[i].product_name}</th>
        <th> ${all_product[i].category}</th>
        <td> <i onclick= "remove_one_item(${i})" class="text-danger fa-solid fa-trash"></i></td>
         <td><i onclick = "view_one_item(${i})" class="text-primary fa-solid fa-eye"></i></td>
          <td><i onclick = "update(${i})"  class="text-warning fa-solid fa-pen-to-square"></i></td>
        </tr> `
    }
    tbody.innerHTML = table_row;
    checkempty();
}
show_data();

//-------- delete_all_products ---------------
let clear_all_btn = ()=>{
   /* if(confirm("are you sure")){
        localStorage.clear();
        all_product.splice(0);
        show_data();
    } */

        layout2.style.display = "block";
}
clear_all.addEventListener('click',clear_all_btn);

close_icon.addEventListener("click",function(){
    layout2.style.display = "none";
})

closemodal.addEventListener("click",function(){
    layout2.style.display = "none";
})

let confirm_delete_all = ()=> {
    localStorage.clear();
    all_product.splice(0);
    show_data();
}
confirmdelete.addEventListener("click",confirm_delete_all);


// remove one item 
let remove_one_item = (i) => {
    
        all_product.splice(i, 1);
        localStorage.myProducts = JSON.stringify(all_product);
        show_data();
    
}

// view items
let view_one_item = (i) =>{
    layout.style.display= "flex";
    layout.innerHTML = `
         <div id="my_model" class="my_model col-6">
        <div class="card mx-auto">
            <div class="card-body col-12">
                <button onclick="close_model()" type="button" class="bg-danger btn-close float-end" aria-label="Close"></button>
                <h6> Product Name : ${all_product[i].product_name} </h6>
                <hr>
                <h6> Category : ${all_product[i].category} </h6>
                <hr>
                <h6> Cost : ${all_product[i].cost} </h6>
                <hr>
                <h6> Tax : ${all_product[i].tax} </h6>
                <hr>
                <h6> My_Return : ${all_product[i].my_return} </h6>
                <hr>
                <h6> Discount : ${all_product[i].discount} </h6>
                <hr>
                <h6> Sales Cost : ${all_product[i].sales_cost} </h6>
                <hr>
                <h6> Net Profit : ${all_product[i].net_profit} </h6>
                <hr>
                <img src = "${all_product[i].image}"id=img-model width= "250" height="200" class=" mx-auto d-block">
            </div>
        </div>
       </div>
    `
    show_data();
    checkempty();
}

let close_model = ()=>{
    layout.style.display = "none";
}

layout.addEventListener ("click",close_model);

// update item
let update = (i)=> {
    mood= "update";
    product_name.value = all_product[i].product_name;
    category.value = all_product[i].category;
    cost_input[0].value = all_product[i].cost;
    cost_input[1].value = all_product[i].tax;
    cost_input[2].value =all_product[i].my_return;
    cost_input[3].value = all_product[i].discount;
    cost_input[4].value = all_product[i].sales_cost;
    cost_input[5].value = all_product[i].net_profit;
    image.value = all_product[i].image
    count.disabled = true;
    addproduct.innerHTML = ` update product ${i+1}`;
    addproduct.classList.replace  ("btn-info","btn-warning");
}

