// let burgers = []

document.addEventListener("DOMContentLoaded", () => {
  
  const burgerContainer = document.querySelector("#burger-menu");
  
  fetch('http://localhost:3000/burgers')
  .then (resp => resp.json())
  .then (burgers => burgers.forEach(burger => displayBurger(burger)))
  
  function displayBurger(burger){
    burgerContainer.innerHTML += `
    <div class="burger">
    <h3 class="burger_title">${burger.name}</h3>
    <img src=${burger.image}>
    <p class="burger_description">
    ${burger.description}
    </p>
    <button class="button" id = ${burger.id} >Add to Order</button>
    <button class="d-btn" id = ${burger.id} > Delete</button>
    
    </div>
    `
  }
  
  document.addEventListener('click',function(e){
    const orderContainer = document.querySelector("#order-list")
    if (e.target.className === "button"){
      // debugger
      // const h3 = document.getElementsByClassName('burger_titile');
      // debugger
      
      let burger = e.target.parentNode.children[0].innerText
      let li = document.createElement('li')
      li.innerText = burger
      // debugger
      orderContainer.append(li)
    }
    
    else if 
    (e.target.className === "d-btn"){
      e.target.parentNode.remove()
    }
    
  })
  
  // console.log(customForm);
  
  const customForm = document.getElementById('custom-burger');
  customForm.addEventListener('submit',function(e){
     e.preventDefault()
     form = e.target
     name = form.name.value
    //  debugger
     description = form.description.value
     image = form.url.value

     const customBurger = {name, description, image}

     customForm.reset()

     fetch('http://localhost:3000/burgers',{
       method: "POST",
       headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       },
       body: JSON.stringify(
         customBurger
       )
      })
      
      .then (resp => resp.json())
      .then (burger => displayBurger(burger))
    
    
  })
})
