const form = document.querySelector(".form-wrapper");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("fname").value;
  const email = document.getElementById("email").value;

  const question = document.getElementById("question").value;

  const message = {
    name,
    email,
    question,
  };

  const rainyCloudContainer = document.querySelector(".rainy-cloud-container");
  rainyCloudContainer.style.display = "flex";

  setTimeout(() => {
    console.log("Message:", message);

    rainyCloudContainer.style.display = "none";

    const modal = document.getElementById("checkout-modal");
    const modalMessage = document.getElementById("modal-message");
    const modalClose = document.getElementById("modal-close");

    modalMessage.innerText = "Thank you for your message!";
    modal.style.display = "flex";

    modalClose.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }, 2000);
});
