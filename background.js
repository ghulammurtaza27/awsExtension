importScripts('libs/crypto-js.js');
// const apiKey = "AIzaSyD2Ehafau-Lb4nyi7RrLhx9AQrGPt6SM2o"; // Replace with your actual API key


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'queryGemini') {
    const { prompt } = message;

    (async () => {
      try {
        // Ensure you have the API key
        const apiKey = 'AIzaSyD2Ehafau-Lb4nyi7RrLhx9AQrGPt6SM2o'; // Replace with your actual API key

        // Create the payload
        const payload = {
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        };

        // Set the headers
        const headers = {
          "Content-Type": "application/json"
        };

        // Send the request
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        

        // Extract and clean the guidanceData array from the response
        const responseText = data.candidates[0].content.parts[0].text;

        // Remove the ```json and ``` if present
        const cleanedResponseText = responseText.replace(/```json|```/g, '').trim();

        // Log the cleaned response text for debugging
        

        let guidanceData;
        try {
          guidanceData = JSON.parse(cleanedResponseText);
          console.log(guidanceData);
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          sendResponse({ error: 'Invalid JSON format in response' });
          return;
        }

        sendResponse({ guidanceData: guidanceData });
      } catch (error) {
        console.error('Fetch Error:', error);
        sendResponse({ error: error.message });
      }
    })();

    return true; // Indicates that the response will be sent asynchronously
  }
});
