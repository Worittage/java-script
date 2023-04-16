const buttonElement = document.getElementById("add-button");
const deleteButtonElement = document.getElementById("delete-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const mainForm = document.querySelector(".add-form");

let comments;

function myFetch(text, name) {
  console.log(text, name); return fetch("https://webdev-hw-api.vercel.app/api/v1/worittage/comments", {
  method: "POST",
  body: JSON.stringify({
    text: text,
    name: name
  })
})
//.then((response) => {
//  return response.json()
//})
//.then((responseData) => {
//  comments = responseData.comments
//  renderComments()
//})
}

function promisFetch() {
  return fetch("https://webdev-hw-api.vercel.app/api/v1/worittage/comments", {
  method: "GET"
})
.then((response) => {
return response.json()
.then((responseData) => {
comments = responseData.comments
renderComments()
})
})
}
// Изменение лайков

const changeLikesListener = () => {
  const buttonLikeElements = document.querySelectorAll(".like-button");

  for (const buttonLikeElement of buttonLikeElements) {
    buttonLikeElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = buttonLikeElement.dataset.index;

      if (comments[index].liked === false) {
        comments[index].liked = true;
        comments[index].likes += 1;
      } else if (comments[index].liked === true) {
        comments[index].liked = false;
        comments[index].likes -= 1;
      }
      renderComments();    
    });
  }
};

function formatDate() {
  const options = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    timezone: "UTC",
    hour: "numeric",
    minute: "2-digit",
  };
  const date = new Date().toLocaleString("ru-RU", options);
  return date;
}


//Добавление комментария

buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove("error");
  textInputElement.classList.remove("error");

  if (nameInputElement.value === "" || textInputElement.value === "") {
    nameInputElement.classList.add("error");
    textInputElement.classList.add("error");
    return;
  }
 
  
  formatDate()

  comments.push({
    name: nameInputElement.value
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;"),
    date: date,
    text: textInputElement.value
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;"),
    likes: 0,
    liked: false,
  });

  myFetch(textInputElement.value, nameInputElement.value)
  .then(() => {
    return promisFetch()
  })

  nameInputElement.value = "";
  textInputElement.value = "";
});

// блокировка кнопки
const validateInput = () => {
  if (nameInputElement.value === "" || textInputElement.value === "") {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};
const buttonBlock = () => {
  validateInput();
  document.querySelectorAll("#name-input,#text-input").forEach((el) => {
    el.addEventListener("input", () => {
      validateInput();
    });
  });
};

// ввод по кнопке enter

mainForm.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    buttonElement.click();
    nameInputElement.value = "";
    textInputElement.value = "";
  }
});

//удаление последнего комментария

/* const deleteComment = () => {
  const deleteButtonElement = document.getElementById("delete-button");
  deleteButtonElement.addEventListener("click", () => {
    const liIndex = listElement.innerHTML.lastIndexOf("<li data-text");
    listElement[liIndex].remove();
    
  });
}; */

// ответ на комментарии

const editComment = () => {
  const comments = document.querySelectorAll(".comment");
  const textInputElement = document.getElementById("text-input");
  for (const comment of comments) {
    comment.addEventListener("click", () => {
      const textComment = comment.dataset.text;
      textInputElement.value = textComment;
    });
  }
};

//DOM 2



//рендер-функция

const renderComments = () => {
  console.log(comments);
  const commentsHtml = comments
    .map((student, index) => {
      return `<li data-text = '&gt ${student.text} \n ${
        student.author.name
      }' class="comment">
          <div class="comment-header">
            <div>${student.author.name}</div>
            <div>${student.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${student.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${student.likes}</span>
              <button data-index = '${index}' class="${
        student.isLiked
        ? "like-button -active-like" : "like-button"
      }"></button>
            </div>
          </div>
        </li>`;
    })
    .join("");
  listElement.innerHTML = commentsHtml;

  changeLikesListener();
  /* deleteComment(); */          
  editComment();
};

promisFetch()
buttonBlock();
console.log("It works!");   