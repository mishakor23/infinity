let loadBtn = document.getElementById('button');
let modal = document.querySelector('.modal');
let modalContent = document.querySelector('.modal-content');
let closeBtn = document.querySelector('.close-btn');
let mainArticlesDiv = document.getElementById('mainArticlesDiv');
let errParagraph = document.createElement('p');


function closeModal(event) {
    if (event.target === modal || event.target === closeBtn){
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
  errParagraph.innerHTML = textError;
  modalContent.appendChild(errParagraph);
  modal.style.display = 'block';
  document.body.addEventListener('click', closeModal);
}

function createTitleHTML(title){
  let titlePara = document.createElement('h3');
  titlePara.innerHTML = title;
  return titlePara;
}

function createTagHTML(arr){
  let tags = document.createElement('p');
  tags.innerHTML = arr.join(', ');
  return tags;
}

function createDescriptionHTML(description){
  let descriptionContainer = document.createElement('div');
  let descShort = document.createElement('p');
  let descFull = document.createElement('p');
  let btnCollapse = document.createElement('button');
  let btnCollapseText = document.createTextNode('collapse');
  let btnExpand = document.createElement('button');
  let btnExpandText = document.createTextNode('expand');
  descriptionContainer.append(descShort, descFull);
  descShort.innerHTML = description.split(' ').slice(0, 5).join(' ');
  btnCollapse.appendChild(btnCollapseText);
  descShort.appendChild(btnCollapse);
  descFull.innerHTML = description;
  btnExpand.appendChild(btnExpandText);
  descFull.appendChild(btnExpand);
  descFull.style.display = 'none';
  btnCollapse.addEventListener('click', function(e){
    if(e.target){
      descShort.style.display = 'none';
      descFull.style.display = 'block';
    }
  });
  btnExpand.addEventListener('click', function(e){
    if(e.target){
      descShort.style.display = 'block';
      descFull.style.display = 'none';
    }
  });
  return descriptionContainer;
}

function renderArticles(articles){
  if(!articles) return;
  for(let i = 0; i < articles.length; i++){
    let articleDiv = document.createElement('div');
    let articleTitle = createTitleHTML(articles[i].title);
    let articleDescription = createDescriptionHTML(articles[i].description)
    let articleTags = createTagHTML(articles[i].tags);
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
    .catch(error => handleError(error.status));
});
