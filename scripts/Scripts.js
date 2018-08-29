const start = document.getElementById("comments-start");
const commentsForm = document.getElementById("comments-form");

// initial  startup script;
$(document).ready(() => {
  commentsForm.onsubmit = postComment;
  pullData("https://project-1-api.herokuapp.com/comments?api_key=JakeLewochko");
});

//functions for buttons
function like(event) {
  let id = event.target.id
  pullData(`https://project-1-api.herokuapp.com/comments/${id}/like?api_key=JakeLewochko`, 'PUT');
}

function removeComment(event) {
  let id = event.target.id
  pullData(`https://project-1-api.herokuapp.com/comments/${id}?api_key=JakeLewochko`, "DELETE");
}

function postComment(event) {
  event.preventDefault();
  const date = new Date();
  pullData("https://project-1-api.herokuapp.com/comments?api_key=JakeLewochko", "POST", {
  name:event.target.username.value,  
  comment: event.target.comment.value
  });
  event.target.username.value = "";
  event.target.comment.value = "";
}
function timeSpan(postedtime){
  const date = Date.now()
  const timelaps = date - postedtime;
  const years = Math.floor( timelaps / 31556952000);
  const months = Math.floor( timelaps / 2629746000 );
  const days= Math.floor( timelaps / 86400000 );
  const hours= Math.floor( timelaps / 3600000 );
  const minutes= Math.floor( timelaps / 60000 );
  const seconds= Math.floor( timelaps / 1000 );
  const arr = [years,months,days,hours,minutes,seconds];
  let intervalname = ['year','month','day','hour','minute','second'];
  let value = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 1){
      value = arr[i];
      if (value > 1){
       intervalname = intervalname[i] + 's';
      } else {
        intervalname =  intervalname[i];
      }
      break;
    }    
  }
  if (value === 0) {
    return 'Just Now'
  } else {
    return value + ' ' + intervalname + ' ago'
  }
  
  
}
//functions
function renderCommetToDOM(obj) {


  //element creation
  const maindiv = document.createElement("div");
  const topp = document.createElement("p");
  const toppspan = document.createElement("span");
  const bottomp = document.createElement("p");
  const removebutton = document.createElement("p");
  const dividerdiv = document.createElement("div");
  const likediv = document.createElement("div");
  const likebutton = document.createElement("button");
  const likdedivcontainer = document.createElement("div");
  //applying classes
  likebutton.className = "comments-comment__like-button";
  likediv.className = "comments-comment__like-div";
  maindiv.className = "comments-comment";
  topp.className = "comments-comment__label";
  toppspan.className = "comments-comment__label-user-name";
  bottomp.className = "comments-comment__comment";
  removebutton.className = "comments-comment__remove-button";
  dividerdiv.className = "comments__divider";
  likdedivcontainer.className = 'comments-comment__like-div-container';

  //applying text to elements and appending children
  likebutton.innerHTML = `&#x1F44D;`;
  likediv.innerHTML = obj.likes;
  toppspan.innerHTML = obj.name;
  
  topp.innerHTML = timeSpan(obj.timestamp);
  topp.prepend(toppspan);
  bottomp.innerHTML = obj.comment;
  removebutton.innerHTML = "X";
  removebutton.onclick = removeComment;
  removebutton.id = obj.id;
  likebutton.onclick = like;
  likebutton.id = obj.id;
  likdedivcontainer.appendChild(likebutton);
  likdedivcontainer.appendChild(likediv)
  maindiv.appendChild(removebutton);
  maindiv.appendChild(topp);
  maindiv.appendChild(bottomp);
  maindiv.appendChild(likdedivcontainer);

  //inserting into DOM
  start.prepend(dividerdiv);
  start.prepend(maindiv);
  
}

function renderComments(data) {
  console.log(data);

  while (start.firstChild) {
    start.removeChild(start.firstChild);
  }
  data.forEach(element => {
    renderCommetToDOM(element);
  });
}

function pullData(url, method, data) {
  if (method || data) {
    console.log("if");

    fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(
      response =>
        response.status === 200
          ? pullData("https://project-1-api.herokuapp.com/comments?api_key=JakeLewochko")
          : console.log("failed")
    );
  } else {
    console.log("else");
    fetch(url)
      .then(response => response.json())
      .then(data => renderComments(data))
      .catch(err => console.log(err));
  }
}

