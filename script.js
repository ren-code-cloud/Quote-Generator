const textElement = document.getElementById("text");
const typingSpeed = 100; // Adjust the typing speed in milliseconds
const generateEl = document.querySelector('.generate');
const soundEl = document.querySelector('.sound');
const copyEl = document.querySelector('.copy');
const authorEl = document.querySelector('.author');

document.addEventListener('DOMContentLoaded', () => {
  const quoteGenerator = async () => {
  authorEl.textContent = '';
  const dots = document.createElement('span');
  dots.setAttribute("class", "typing-dots");
  textElement.textContent = `Loading`;
  textElement.appendChild(dots);

  const response = await fetch('https://api.quotable.io/random');
  const data = await response.json();
  let quote = `✍️ ${data.content}`;
  let author = `📝 ${data.author}`;
  let textToType = `${quote}`;
  console.log(quote);
  console.log(author);


  let index = 0;

  function typeText() {
    if (index < quote.length) {
      textElement.textContent += quote.charAt(index);
      index++;
      setTimeout(typeText, typingSpeed);
    } else if (index === quote.length) {
      index++;
      setTimeout(typeText, 1000);
      authorEl.innerText = `${author}`
    } else if (index > quote.length && index < textToType.length) {
      textElement.textContent += textToType.charAt(index);
      index++;
      setTimeout(typeText, typingSpeed);
    }
  }
  
  setTimeout(() => {
    authorEl.textContent = '';
    textElement.textContent = ''; // Clear the previous quote and author
    index = 0; // Reset the index
    typeText();
  }, 3000); // Adjust the duration (in milliseconds) of the loading animation
};


  soundEl.addEventListener('click', () => {
    const textToCopy = textElement.textContent.trim().substring(1);
    const author = authorEl.textContent.trim().substring(1);
    console.log(textToCopy);
    const utterance = new SpeechSynthesisUtterance(`${textToCopy} by ${author}`);
    speechSynthesis.speak(utterance);
  });

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
  });

  quoteGenerator(); // Generate initial quote on page load
});
