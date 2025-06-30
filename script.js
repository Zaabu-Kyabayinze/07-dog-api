// Get the <select> element from the page
const breedSelect = document.getElementById('breed-select');

// Function to fetch the list of dog breeds using async/await
async function fetchBreeds() {
  // Fetch the list of breeds from the Dog API
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  // Convert the response to JSON
  const data = await response.json();
  // The breeds are in data.message as an object
  const breeds = data.message;

  // Loop through each breed in the object
  for (const breed in breeds) {
    // Create a new <option> element for each breed
    const option = document.createElement('option');
    option.value = breed; // Set the value to the breed name
    option.textContent = breed; // Set the text to the breed name
    breedSelect.appendChild(option); // Add the option to the <select>
  }
}

// Call the function to fetch and show breeds
fetchBreeds();

// Get the gallery div where the images will be shown
const gallery = document.getElementById('gallery');

// Listen for changes on the breed <select> menu
breedSelect.addEventListener('change', async function() {
  // Get the selected breed from the dropdown
  const selectedBreed = breedSelect.value;

  // If no breed is selected, clear the gallery and stop
  if (!selectedBreed) {
    gallery.innerHTML = '';
    return;
  }

  // Build the API URL for 9 random images of the selected breed
  const imagesUrl = `https://dog.ceo/api/breed/${selectedBreed}/images/random/9`;

  // Fetch 9 random images for the selected breed using async/await
  const response = await fetch(imagesUrl);
  // Convert the response to JSON
  const data = await response.json();
  // Get the array of image URLs from the response
  const dogImages = data.message;

  // Create HTML for all 9 images
  let imagesHtml = '';
  dogImages.forEach(function(imageUrl) {
    imagesHtml += `
      <div class="gallery-item">
        <img src="${imageUrl}" alt="A random image of a ${selectedBreed}" />
      </div>
    `;
  });

  // Show all images in the gallery
  gallery.innerHTML = imagesHtml;
});