let loadBtn = document.getElementById('button');
let modal = document.querySelector('.modal');
let modalContent = document.querySelector('.modal-content');
let closeBtn = document.querySelector('.close-btn');
let mainArticlesDiv = document.getElementById('mainArticlesDiv');

modal.style.display = 'block';

function closeModal(event) {
    if (event.target !== modalContent || event.target === closeBtn) {
        modal.style.display = 'none';
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
  document.body.addEventListener('click', closeModal);
}

function createTitleHTML(title){
  let titlePara = document.createElement('h5');
  titlePara.innerHTML = title;
  return titlePara;
}

function createTagHTML(arr){

}

function createDescriptionHTML(description){

}

function renderArticles(articles){
  console.log(articles)
  for(let i = 0; i < articles.length; i++){
    let articleDiv = document.createElement('div');
    let articleTitle = createTitleHTML(articles[i].title);
    // let articleDescription = createDescriptionHTML(articles[i])
    // let articleTags = createTagHTML(articles[i].tags);
    articleDiv.append(articleTitle, articleDescription, articleTags);
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
