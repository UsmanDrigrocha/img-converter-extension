function convertImage() {
  const input = document.getElementById('imageInput');
  const format = document.getElementById('formatSelect').value;
  const resultContainer = document.getElementById('resultContainer');

  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const convertedImage = canvas.toDataURL(`image/${format}`);
        resultContainer.innerHTML = `
            <a href="${convertedImage}" download="converted_image.${format}">
              <img src="${convertedImage}" alt="Converted Image" class="converted-image">
              <p id="convertButton">Download Converted Image</p>
            </a>`;
      };
    };
    reader.readAsDataURL(file);
  }
}


// Event listener for the Convert button
document.addEventListener('DOMContentLoaded', function () {
  const convertBtn = document.getElementById('convertBtn');
  convertBtn.addEventListener('click', convertImage);
});