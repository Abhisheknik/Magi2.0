const generateBtn = document.querySelector(".generate-btn");
const promptInput = document.querySelector(".prompt-input");
const generatedImage = document.querySelector(".generated-image");
const recentGeneratedImage = document.querySelector(".recent-image-display");
const downloadBtn = document.querySelector(".download-btn");
// const tshirt_canvas = document.querySelector(".tshirt-canvas-imge");
const showNotification = (message) => {
    alert(message);
};

let currentImage = "";
// let tshirtimage = "";

const generateImage = async() => {
    const prompt = promptInput.value;

    if (prompt) {
        try {
            generatedImage.src = "images/Infinity.svg";

            const response = await fetch("http://localhost:4000/generateImage", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ prompt: prompt }),
            });

            const data = await response.json();
            const image = `data:image/jpeg;base64,${data.image}`;


            currentImage = image;
            
            generatedImage.src = image;
            recentGeneratedImage.src = currentImage;
            downloadBtn.href = image;
        } catch (error) {
            console.log(error);
            showNotification("The image could not be generated.");
            generatedImage.src = "./images/image-placeholder.png";
        }
    } else {
        showNotification("Please enter the prompt");
    }



    
};



generateBtn.addEventListener("click", generateImage);