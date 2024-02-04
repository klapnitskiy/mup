$(document).ready(function () {
  // --------------SCROLL-------------------
  $('a[href="#"]').on("touchend, click", function (e) {
    e.preventDefault();
    $("body,html").animate(
      { scrollTop: $(".toscroll").offset().top - 50 },
      400
    );
  });

  $(".to-comments").on("touchend, click", function (e) {
    e.preventDefault();
    $("body,html").animate(
      { scrollTop: $(".scroll-to-comments").offset().top - 100 },
      400
    );
  });

  $("a").each(function () {
    if ($(this).attr("hre") != "") $(this).attr("href", $(this).attr("hre"));
    if ($(this).attr("href") == $(this).text())
      $(this).css("word-break", "break-all");
  });
});

//newAddComm

var commentsBlock = document.querySelector(".comments__list");
var commForm = comments;

var commentsArr = Object.keys(localStorage)
  .filter(function (key) {
    return /comment_\d+/.test(key);
  })
  .map(function (key) {
    return JSON.parse(localStorage.getItem(key));
  });

commForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var name = this.querySelector("#textareaname").value;
  var text = this.querySelector("#textarea").value;

  var comment = {};
  var tempArr = [];

  comment.name = name;
  comment.text = text;

  commentsArr.push(comment);
  tempArr.push(comment);

  localStorage.setItem(
    "comment_" + commentsArr.length,
    JSON.stringify(comment)
  );
  render(tempArr);
  tempArr = [];

  this.reset();
});

function render(arr) {
  arr.forEach(function (key) {
    ///Comment block
    var item = document.createElement("div");
    item.classList.add("comment");

    //Ava block
    var avaBlock = document.createElement("div");
    avaBlock.classList.add("avatar");
    var avaImg = document.createElement("img");
    avaBlock.append(avaImg);

    //Comment data
    var dataBlock = document.createElement("div");
    dataBlock.classList.add("comm_text");

    //info
    var dataInfo = document.createElement("div");
    dataInfo.classList.add("comments__info");
    dataBlock.append(dataInfo);

    var dataName = document.createElement("span");
    dataName.classList.add("user_name");

    dataInfo.append(dataName);

    //Text
    var textBlock = document.createElement("div");
    dataBlock.append(textBlock);
    var text = document.createElement("p");
    textBlock.append(text);
    //TextImg
    var textImg = document.createElement("img");
    textBlock.append(textImg);
    item.append(avaBlock);
    item.append(dataBlock);

    ///LocalStorage

    if (key.avatar === undefined) {
      avaImg.src = "images/1.jpg";
    } else {
      avaImg.src = "data:image/jpeg;base64," + key.avatar;
    }
    dataName.innerText = key.name;
    text.innerText = key.text;

    if (key.photo === undefined) {
      textImg.remove();
    } else {
      textImg.src = "data:image/jpeg;base64," + key.photo;
    }

    commentsBlock.append(item);
  });
}

("https://webhook.site/c45e738a-2d08-4b77-8b43-c59aec47c8cd");

async function sendData() {
  // Construct a FormData instance
  const formData = new FormData();

  const order_name = $("#luckyshop_name")[0].value;
  const order_phone = $("#luckyshop_phone")[0].value;

  // Add a text field
  formData.append("order_name", order_name);
  formData.append("order_phone", order_phone);

  try {
    const response = await fetch(
      `https://webhook.site/c45e738a-2d08-4b77-8b43-c59aec47c8cd`,
      {
        method: "POST",
        mode: "no-cors",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    console.error(e);
  }
}

const form = document.querySelector("#order_form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData();
});
