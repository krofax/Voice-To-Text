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
      

      if(transcript.includes('heading')) {
        p.style.fontSize = "30px";
        p.style.textDecoration = "underline";
        transcript.replace('heading', '')
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

    //get the stop button
    let stopBtn = document.querySelector('.stop')
    stopBtn.addEventListener('click', stopWriting)

    function renderPage() {
      let countWords = document.querySelector('.words').textContent;
      if(countWords.length >= 400){
        const storeField = localStorage.setItem(countWords, countWords);
        document.querySelector('.words').innerHTML = '';

      }
      else {
        alert('He no work ooh!!')
      }
    }

  //function that stops recording 
  function stopWriting() {
    // recognition.abort()
    //count words
    let totalWords = document.querySelector('.words').textContent;
    if(totalWords.length >= 20){
      console.log('The words are greater than 30', totalWords.length)
      renderPage()
    }
    else{
      console.log('its less than')
    }
  }

  

  //get download button
  const downloadBtn = document.querySelector('.save');

  downloadBtn.addEventListener('click', getContent);

  function getContent() {
     let content = document.querySelector('.words').textContent;
    console.log(content)
    fetch('http://localhost:8080/pdf', { 
  method: 'POST', 
  mode: 'no-cors',
  body: content, 
  headers: {'Content-Type': 'application/pdf'},
  
})
.then(res => console.log('it worked!!!!'))
  }
  
  // function countWords() {

  // }
