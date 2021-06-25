import { textToEmoji, emojiToText } from './mapper';

document.addEventListener('DOMContentLoaded', function () {
  const resultArea = document.getElementById('result');
  const textAreaText = document.getElementById('text');
  const buttonT2E = document.getElementById('translateText');
  const buttonE2T = document.getElementById('translateEmoji');
  const buttonCopy = document.getElementById('copyToClipboard');
  const spinner = document.getElementById('spinner');

  // Handle click button [Text to Emoji]
  buttonT2E.addEventListener('click', () => {
    resultArea.value = '';
    resultArea.value = textToEmoji(textAreaText.value);
  });

  // Handle click button [Emoji to Text]
  buttonE2T.addEventListener('click', () => {
    resultArea.value = '';
    resultArea.value = emojiToText(textAreaText.value);
  });

  // Copy to clipboard
  const copyToClipboard = () => {
    buttonCopy.style.display = 'none';
    spinner.style.display = 'block';

    /* Get the text field */
    const copyText = resultArea;

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand('copy');

    setTimeout(() => {
      buttonCopy.style.display = 'block';
      spinner.style.display = 'none';
      buttonCopy.setAttribute('uk-icon', 'icon: check');
    }, 500);
    setTimeout(() => {
      buttonCopy.setAttribute('uk-icon', 'icon: copy');
    }, 3000);
  };

  buttonCopy.addEventListener('click', copyToClipboard);
});
