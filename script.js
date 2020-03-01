(function () {

  
  
  const startButton = document.querySelector('.btn:nth-child(1)')
  const stopButton = document.querySelector('.btn:nth-child(2)')
  const copyButton = document.querySelector('.btn:nth-child(3)')
  const spanHours = document.querySelector('#hours')
  const spanMinutes = document.querySelector('#minutes')
  const spanSeconds = document.querySelector('#seconds')
  const spanMilliseconds = document.querySelector('#milliseconds')
  let milliseconds 
  let seconds
  let minutes
  let hours 
  let icon = document.createElement('i')
  icon.classList = 'fa-stop fa'
  let icon2 = document.createElement('i')
  icon2.classList = 'fas fa-backward'
  let interval
  let state = false
  let pressStart = false
  let clearButton = false

  function handleStartClick(){
    pressStart = true
    if(clearButton){
      changeButtonToStop()
      clearButton = false
    }
    if(!state){
      state = true
      milliseconds = 0
      seconds = 0
      minutes = 0
      hours = 0
      interval = setInterval((e) => {
        milliseconds += 50
        
        spanMilliseconds.textContent = milliseconds
        if(milliseconds == 1000){
          seconds++
          if(seconds < 10)
            spanSeconds.textContent = '0' + seconds
          else
            spanSeconds.textContent = seconds
          milliseconds = 000 
        }
        if(seconds == 60){

          minutes++
          spanMinutes.textContent = minutes
          seconds = 0
        }
        if(minutes == 60){
          hours++
          spanHours.textContent = hours
          minutes =0
        }
      }, 50);
    }
  }


  function copyToClip() {
    let node = document.querySelector('#numbers')
    let text = document.createElement('textarea')
    text.value = node.textContent.replace(/[^\w\d:]/g, '')
    document.body.appendChild(text)
    text.select()
    node.focus()
    document.execCommand('copy')
    document.body.removeChild(text)
    alert('Copied to clipboard ---->'+ node.textContent.replace(/[^\w\d:]/g, ''))
    
  }
  function handleStopClick() {
    if(!pressStart)
      return
    if(state == false){
      changeButtonToStop()
      clearButton = false
      spanMilliseconds.textContent = '000'
      spanSeconds.textContent = '00'
      spanMinutes.textContent = '00'
      spanHours.textContent = '00'
      milliseconds = '00'
      seconds = '00'
      minutes = '00'
      hours = '00'
      clearInterval(interval)
      pressStart = false
      state = false
      return
    }
    changeButtonToClear()
    clearButton = true
    state = false
    clearInterval(interval)
  }

  function changeButtonToStop(){
      let  p = document.createElement('p')
      stopButton.classList.toggle('stop')
      p.textContent = 'STOP'
      stopButton.textContent = ''
      stopButton.classList.toggle('clear')
      stopButton.appendChild(p)
      stopButton.insertBefore(icon, p)
  }

  function changeButtonToClear(){
    stopButton.textContent = ''
    stopButton.classList.toggle('clear')
    stopButton.classList.toggle('stop')
    let p2 = document.createElement('p')
    p2.textContent = 'CLEAR'
    stopButton.appendChild(p2)
    stopButton.insertBefore(icon2, p2)
  }
  startButton.addEventListener('click', handleStartClick ,false)
  stopButton.addEventListener('click', handleStopClick, false)
  copyButton.addEventListener('click',copyToClip,false )

})()