const formData = {
  email: '',
  message: '',
};

const generalEl = document.querySelector('.feedback-form');

const textInput = document.querySelector('input[name="email"]');

const textareaInput = document.querySelector('textarea[name="message"]');

window.addEventListener('load', () => {
  const savedText = localStorage.getItem('feedback-form-state');

  if (savedText) {
    try {
      const { email, message } = JSON.parse(savedText);
      formData.email = email || '';
      formData.message = message || '';

      textInput.value = formData.email;
      textareaInput.value = formData.message;
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);

      localStorage.removeItem('feedback-form-state');
    }
  } else {
    textInput.value = '';
    textareaInput.value = '';
  }
});

generalEl.addEventListener('input', () => {
  formData.email = textInput.value.trim();
  formData.message = textareaInput.value.trim();
  if (formData.email !== '' || formData.message !== '') {
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }
});

generalEl.addEventListener('submit', addMessage);

function addMessage(event) {
  event.preventDefault();

  const textTrimmedValue = textInput.value.trim();
  const textareaTrimmedValue = textareaInput.value.trim();

  formData.email = textTrimmedValue;
  formData.message = textareaTrimmedValue;

  if (textTrimmedValue !== '' && textareaTrimmedValue !== '') {
    console.log(formData);
    generalEl.reset();
  } else if (textTrimmedValue === '' || textareaTrimmedValue === '') {
    alert('Please fill both form');
  }

  localStorage.removeItem('feedback-form-state');
}
