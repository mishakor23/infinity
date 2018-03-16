let btn = document.getElementById('button');
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-btn");

function showModal() {
  modal.classList.toggle("show-modal");
}

function closeModal(event) {
    if (event.target === modal) {
        showModal();
    }
}

function status(response) {
    if (response.status !== 200) {
      showModal();
      closeBtn.addEventListener("click", showModal);
      window.addEventListener("click", closeModal);
      return;
    }
}



btn.addEventListener('click', function(){
  fetch('/api/v1/articles?limit=5')
    .then(status(response){
      if(response.status !== 200){
        showModal(response.status);
      }else{
        return response.json();
      }
    })
    .then(function(response){
      console.log(response);
    })
});
