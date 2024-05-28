document.addEventListener('DOMContentLoaded', () => {
  const promptInput = document.getElementById('prompt');
  const sendRequestButton = document.getElementById('sendRequest');
  const clearResultsButton = document.getElementById('clearResults');
  const responseElement = document.getElementById('response');

  // Load stored results on popup open
  const storedResults = localStorage.getItem('guidanceData');
  if (storedResults) {
    responseElement.innerHTML = storedResults;
  }

  sendRequestButton.addEventListener('click', () => {
    const prompt = promptInput.value;

    if (!prompt) {
      alert('Please enter a prompt.');
      return;
    }

    const promptUpdated = `${prompt}, give your answer in steps and in a json file of this format pointing out to user exactly what fields they have to input by giving field selector for that input and guidance for each step, if they have to visit a new page start from giving url for that page. make sure response is only this array, nothing else, no text, only this array
const guidanceData = [
  {
    "field": "jquery-selector",
    "guidance": "guidance on step"
  },
]
`;

    chrome.runtime.sendMessage({ action: 'queryGemini', prompt: promptUpdated }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Runtime Error:', chrome.runtime.lastError.message);
      } else {
       
        if (response.error) {
          responseElement.textContent = 'Error: ' + response.error;
        } else if (response.guidanceData && response.guidanceData.length > 0) {
          const guidanceContent = response.guidanceData.map(item => `<div class="step">${item.guidance}</div>`).join('\n');
         
          responseElement.innerHTML = guidanceContent;
          // Store results in local storage
          localStorage.setItem('guidanceData', guidanceContent);
        } else {
          responseElement.textContent = 'No guidance data received.';
        }
      }
    });
  });

  clearResultsButton.addEventListener('click', () => {
    // Clear local storage and response element
    localStorage.removeItem('guidanceData');
    responseElement.textContent = '';
    promptInput.value = '';
  });
});
