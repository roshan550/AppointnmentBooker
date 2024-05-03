// Write your code below:
function handleFormSubmit(event) {
    event.preventDefault();
    const name=event.target.username.value;
    const email=event.target.email.value;
    const phone=event.target.phone.value;
  
    const obj={
      name,
      email,
      phone
    }
    axios.post("https://crudcrud.com/api/202f38cff94d4bef945eb5ea3ae61ecc/apointmentData",obj)
    .then((res)=>{
      showUserOnScreen(res.data)
      console.log(res)
    })
    .catch((err)=>{
                  document.body.innerHTML=document.body.innerHTML+"<h4>something went wrong</h4>"
          console.log(err)
    })
    
  }
  window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/202f38cff94d4bef945eb5ea3ae61ecc/apointmentData")
    .then((res)=>{console.log(res)
                 for(var i=0;i<res.data.length;i++){
                   showUserOnScreen(res.data[i])
                 }})
    .catch((err)=>console.log(err))
  })
  function showUserOnScreen(user){
    document.getElementById('email').value='',
    document.getElementById('username').value='',
    document.getElementById('phone').value=''
  
      if(localStorage.getItem(user.email)!=null){
      removeUserFromScreen(user.email)
      }
    const parentNode=document.getElementById('ListOfUsers')
    const childHTML=`<li id=${user._id}> ${user.name}-${user.email}-${user.phone}
                     <button onclick=deleteUser('${user._id}')>Delete</button>
                      <button onclick=editUserDetails('${user.email}','${user.name}','${user.phone}','${user._id}')>Edit</button>
                     </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;
  } 
  function editUserDetails(emailId,name,phone,userId){
     document.getElementById('email').value=emailId,
    document.getElementById('username').value=name,
    document.getElementById('phone').value=phone,
      removeUserFromScreen(userId)
       deleteUser(userId)
  }
  function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/202f38cff94d4bef945eb5ea3ae61ecc/apointmentData/${userId}`)
    .then((res)=>{removeUserFromScreen(userId)
    console.log(res)})
    .catch((err)=>{console.log(err)})
  }
  function removeUserFromScreen(userId){
    const parentNode=document.getElementById('ListOfUsers')
    const childNode=document.getElementById(userId)
    if(childNode){
      parentNode.removeChild(childNode)
    }
  }