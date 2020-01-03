 window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  
  let p = document.createElement('p');
  const words = document.querySelector('.words');
  words.appendChild(p);
  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
      const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
      p.textContent = poopScript;
      if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
      }
  });
  recognition.addEventListener('end', recognition.start);

  //get the start button
  let startBtn = document.querySelector('.start')
  startBtn.addEventListener('click', startWriting)
  //function that triggers the button
  function startWriting() {
    recognition.start();
  }

  //get download button
  const downloadBtn = document.querySelector('.save');

  downloadBtn.addEventListener('click', getContent);

  function getContent() {
    // let data = document.querySelector('.words').textContent;
    //https://pdf-downloader-speech.herokuapp.com
    let data = 'im a text been coverted to a pdf'
    console.log(data)
    fetch('https://pdf-downloader-speech.herokuapp.com/pdf',
    {mode: 'no-cors'},
    {cache: 'no-cache'},
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/pdf',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  // async function postData(url = '', data = {}) {
  //   // Default options are marked with *
  //   const response = await fetch(url, {
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     mode: 'cors', // no-cors, *cors, same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       'Content-Type': 'application/json'
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: 'follow', // manual, *follow, error
  //     referrerPolicy: 'no-referrer', // no-referrer, *client
  //     body: JSON.stringify(data) // body data type must match "Content-Type" header
  //   });
  //   return await response.json(); // parses JSON response into native JavaScript objects
  // }
  
  // postData('http://localhost:8080/pdf', { answer: 'im a string ooh' })
  //   .then((data) => {
  //     console.log(data); // JSON data parsed by `response.json()` call
  //   });

  
  