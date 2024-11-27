const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')
if (document.innerWidth < 800){
  document.getElementsByClassName("indetails")[0].style.display="none";
  document.getElementsByClassName("out-items")[0].style.display="none";
  document.getElementsByClassName("outdetails")[0].style.display="flex";
  document.getElementsByClassName("outdetails")[0].style="flex-direction: row;";
}
function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')
document.getElementById("insname").style.display="none";
document.getElementById("insprofile").style.display="none";
document.getElementById("outlogo").style.display="flex";
  closeAllSubMenus()
}
function toggleSidebar1(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')
document.getElementById("insname").style.display="flex";
document.getElementById("insprofile").style.display="initial";
document.getElementById("outlogo").style.display="none";
  closeAllSubMenus()
}

function toggleSubMenu(button){

  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
    if (window.innerWidth>1000){
      toggleSidebar1()
    }
    
  }

  button.nextElementSibling.classList.toggle('show')
  button.classList.toggle('rotate')

  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
  }
}

function closeAllSubMenus(){
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}