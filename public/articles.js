let loadBtn = document.getElementById('button');
let modal = document.querySelector('.modal');
let modalContent = document.querySelector('.modal-content');
let closeBtn = document.querySelector('.close-btn');
let mainArticlesDiv = document.getElementById('mainArticlesDiv');

function addShowClassToModal() {
  modal.classList.add('show-modal');
}

function closeModal(event) {
    if (event.target !== modal || event.target === closeBtn) {
        modal.style.display = 'none';
        // modal.classList.remove('show-modal');
    }
}

function handleError(status) {
  let textError = '';
    if (status === 400) {
      textError = 'Произошла ошибка';
    }else if(status === 401){
      textError = 'Пожалуйста, авторизуйтесь';
    }else if(status === 403) {
      textError = 'У вас нет доступа к ленте статей';
    }else{
      textError = 'Внутренняя ошибка сервера, попробуйте позже';
    }
    createModalDOM(textError);
}

function createModalDOM(textError){
  let errParagraph = document.createElement('p');
  errParagraph.innerHTML = textError;
  modalContent.appendChild(errParagraph);
  addShowClassToModal();
  closeBtn.addEventListener('click', closeModal);
  document.body.addEventListener('click', closeModal);
}

function createTitleHTML(title){
  let titlePara = document.createElement('h5');
  titlePara.innerHTML = title;
  return titlePara;
}

function renderArticles(articles){
  console.log(articles)
  for(let i = 0; i < articles.length; i++){
    let articleDiv = document.createElement('div');
    let articleTitle = createTitleHTML(articles[i].title);
    // let articleDescription =
    // let articleTags =
    articleDiv.append(articleTitle);
    mainArticlesDiv.appendChild(articleDiv);
  }
}

loadBtn.addEventListener('click', function(){
  fetch('/api/v1/articles?limit=5')
    .then((response) => {
      if(response.status !== 200){
        handleError(response.status);
      }else{
        return response.json();
      }
    })
    .then((data) => {
      renderArticles(data);
    })
});
