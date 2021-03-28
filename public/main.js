var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var changeColor = document.getElementsByClassName("change")

Array.from(thumbUp).forEach(function (element) {
  element.addEventListener('click', function () {
    const listItem = this.closest('.message')
    const name = listItem.querySelector('.nameClass').innerText
    const quote = listItem.querySelector('.quoteClass').innerText
    const thumbUp = parseFloat(listItem.querySelector('.thumbUPS').innerText)
    fetch('thumbUp', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': name,
          'quote': quote,
          'thumbUp': thumbUp
        })
      })
      // .then(response => {
      //   if (response.ok) return response.json()
      // })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});

Array.from(thumbDown).forEach(function (element) {
  element.addEventListener('click', function () {
    const listItem = this.closest('.message')
    const name = listItem.querySelector('.nameClass').innerText
    const quote = listItem.querySelector('.quoteClass').innerText
    const thumbDown = parseFloat(listItem.querySelector('.thumbDOWNS').innerText)
    fetch('thumbDown', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': name,
          'quote': quote,
          "thumbDown": thumbDown
        })
      })
      // .then(response => {
      //   if (response.ok) return response.json()
      // })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});

Array.from(changeColor).forEach(function (element) {
  element.addEventListener('click', function () {
    //'closeest'--target closest css selector
    const listItem = this.closest('.message')
    //innerHTML grabs everything, innerTEXT grabs the text 
    const name = listItem.querySelector('.nameClass').innerText
    const quote = listItem.querySelector('.quoteClass').innerText
    //parseFloat--change to a number
    const thumbUp = parseFloat(listItem.querySelector('.thumbUPS').innerText)
    fetch('coloredChange', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': name,
          'quote': quote,
          'thumbUp': thumbUp
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const quote = this.parentNode.parentNode.childNodes[3].innerText
    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'quote': quote
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});