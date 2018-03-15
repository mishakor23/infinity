let btn = document.getElementById('button');
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-btn");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

function status(response) {
    if (response.status !== 200) {
      toggleModal();
      closeBtn.addEventListener("click", toggleModal);
      window.addEventListener("click", windowOnClick);
      return;
    }
    response.json().then(function(data) {
      console.log(data);
    });
  }



btn.addEventListener('click', function(){
  fetch('/api/v1/articles?limit=5')
    .then(status)
    // .then()
    .catch(function(err) {
      console.log('Fetch Error:', err);
    });

  btn.innerHTML = 'Load.....';
  // btn.disabled = true;

});
