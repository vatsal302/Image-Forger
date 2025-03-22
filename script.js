document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "pT1cFD8D9AD13LOPfAez7CXDDThVYF30"; // Replace with your Runware API key
  const API_URL = "https://api.runware.ai/v1";

  const promptInput = document.getElementById("promptInput");
  const generateButton = document.getElementById("generateButton");
  const imageContainer = document.getElementById("imageContainer");

  if (!promptInput || !generateButton || !imageContainer) {
    console.error("One or more elements not found!");
    return;
  }

  generateButton.addEventListener("click", async () => {
    const prompt = promptInput.value;

    if (!prompt) {
      alert("Please enter a prompt!");
      return;
    }

    try {
      // Create the payload for the API request
      const payload = [
        {
          taskType: "authentication",
          apiKey: API_KEY
        },
        {
          taskType: "imageInference",
          taskUUID: generateUUID(), // Generate a unique task UUID
          positivePrompt: prompt,
          width: 512,
          height: 512,
          model: "civitai:102438@133677", // Replace with your desired model
          numberResults: 1
        }
      ];

      // Send the request to the Runware API
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      // Check for errors
      if (data.error) {
        console.error("API Error:", data.error);
        alert(
          "Failed to generate image. Please check the console for details."
        );
        return;
      }

      // Display the generated image
      if (data.data && data.data.length > 0) {
        const imageURL = data.data[0].imageURL;
        imageContainer.innerHTML = `<img src="${imageURL}" alt="Generated Image" />`;
      } else {
        alert("No image generated. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please check the console for details.");
    }
  });

  // Helper function to generate a unique task UUID
  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
});
