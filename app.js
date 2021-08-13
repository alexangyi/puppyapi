const datalist = document.querySelector("#dog-breeds");
const searchButton = document.querySelector("#search-button");
const breedInput = document.querySelector("#breed-input");
const gallery = document.querySelector("#gallery")

console.log(breedInput);
console.log(searchButton);
console.log(datalist);

//state
let dogImages = []

async function fetchBreeds() {
    const response = await axios.get("https://dog.ceo/api/breeds/list/all")
    const breeds = response.data.message;

    for (let key in breeds) {
        const option = document.createElement("option");
        option.value = key;
        datalist.append(option)

    }
}
async function fetchImages() {
    dogImages = [];
    var breed = breedInput.value;
    const url = `https://dog.ceo/api/breed/${breed}/images`
    const response = await axios.get(url)
    for (item of response.data.message) {
        //updates the state
        dogImages.push(item);
        gallery.append(item);
    }
    console.log(dogImages)

    renderImages();
}

function renderMessage() {
    message.innerHTML = `Found ${dogImages.length} results`;
}

function renderImages() {
  gallery.innerHTML = "";
  console.log("Rendering images...");
  renderMessage();  
  for (image of dogImages) {
      
      const currentImage = document.createElement("img");
      currentImage.src = image;
      console.log(currentImage);
      gallery.append(currentImage)
  }
}

searchButton.addEventListener("click",  () => {
    fetchImages();
    breedInput.value = "";
});

breedInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    fetchImages();
    breedInput.value = "";
  }
});

fetchBreeds()