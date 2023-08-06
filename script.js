const textElement = document.getElementById("text");
const typingSpeed = 100; // Adjust the typing speed in milliseconds
const generateEl = document.querySelector('.generate');
const soundEl = document.querySelector('.sound');
const copyEl = document.querySelector('.copy');
const authorEl = document.querySelector('.author');

document.addEventListener('DOMContentLoaded', () => {
  
  const quoteGenerator = async () => {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    let textToType = await `✍️ ${data.content}`;
    let dataText = await data.content;
    authorEl.innerText = await `📝 ${data.author}`;
    console.log(textToType);
    let index = 0;

    function typeText() {
      if (index < textToType.length) {
        textElement.textContent += textToType.charAt(index);
        index++;
        setTimeout(typeText, typingSpeed);
      }
    }
  
    textElement.textContent = ''; // Clear the previous quote
    index = 0; // Reset the index
    typeText();
  }
  soundEl.addEventListener('click', () => {
    const textToCopy = textElement.textContent.trim().substring(1)
    const author = authorEl.textContent.trim().substring(1);
    console.log(textToCopy)
    const utterance = new SpeechSynthesisUtterance(`${textToCopy} by ${author}`);
    speechSynthesis.speak(utterance);
  })

  const copyToClipboard = () => {
    const textToCopy = textElement.textContent.trim();
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => alert('Text copied to clipboard!'))
        .catch((error) => console.error('Error copying text:', error));
    }
  };

  copyEl.addEventListener('click', () => {
    copyToClipboard();
  });

  generateEl.addEventListener('click', () => {
    quoteGenerator();
  })

  quoteGenerator(); // Generate initial quote on page load
});