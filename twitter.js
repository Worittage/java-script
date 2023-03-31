const twitterButtonElement = document.getElementById('buttonElement')
const twitterContentElement = document.getElementById('contentTwitter')

const twitterInputNameElement = document.getElementById('inputName')
const twitterInputCommentElement = document.getElementById('inputComment')
 
//добавление обработчик клика
twitterButtonElement.addEventListener('click', () => {

  
//тут кнопка становится невалидной если поля ввода не заполнены
    twitterButtonElement.setAttribute('disabled', true);

twitterInputNameElement.oninput = function () {
    if (twitterInputNameElement.value.length < 1) {
        twitterButtonElement.setAttribute('disabled', true)
    } else {
        twitterButtonElement.removeAttribute('disabled')
    } 
}
 //////////////////////////////////////////////////////////////////////

  twitterInputNameElement.classList.remove('colorInput') 

  if (twitterInputNameElement.value === "") {
    twitterInputNameElement.classList.add('colorInput')
    return;
  }
  
//обьявление датой
  let date = new Date()

  let year = date.getFullYear()
  let month = date.getMonth() + 1;
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()

 //////////////////////////////////////////////////////////////////////

  let likes = 0


    const newList = twitterContentElement.innerHTML
    twitterContentElement.innerHTML = newList + `<li class="comment">
    <div class="comment-header">
      <div>${twitterInputNameElement.value}</div>
      <div>${day + '.' + '0' + month + '.' + year + '  ' + hours + ':' + minutes}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${twitterInputCommentElement.value}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${likes}</span>
        <button class="like-button"></button>
      </div>
    </div>
  </li>`

  

  twitterInputNameElement.value = "";
  twitterInputCommentElement.value = "";

})
// удаляем последний комент из списка
const deleteComment = () => {
  
  const deleteButtonElement = document.getElementById('buttonDelete');
   const listElement = document.getElementById('contentTwitter')

   deleteButtonElement.addEventListener("click", () => {
    const element = listElement.lastChild;
    element.remove();
   })
 }

 deleteComment()
////////////////////////////////////////////////////////////////////

