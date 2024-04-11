document.addEventListener("DOMContentLoaded", function() {
  const step1Form = document.getElementById("step1Form");
  const step2Form = document.getElementById("step2Form");
  const resultTableBody = document.getElementById("resultTableBody");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");

  const backToStep2Btn = document.getElementById("backToStep2");
  const themeToggleBtn = document.querySelector(".theme-toggle");
  const backToStep1Btn = document.getElementById("backToStep1");
    
  const formData = JSON.parse(localStorage.getItem("formData")) || {};
  document.getElementById("name").value = formData.name || "";
  document.getElementById("email").value = formData.email || "";
  document.getElementById("cep").value = formData.cep || "";

  step1Form.addEventListener("submit", function(event) {
    event.preventDefault();

    localStorage.setItem("formData", JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      cep: document.getElementById("cep").value
    }));

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const cep = document.getElementById("cep");

    if (!name.value || !email.value || !cep.value || !validateEmail(email.value)) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    step1.style.display = "none";
    step2.style.display = "block";
  });

  step2Form.addEventListener("submit", function(event) {
    event.preventDefault();

    const numMen = parseInt(document.getElementById("numMen").value);
    const numWomen = parseInt(document.getElementById("numWomen").value);
    const numChildren = parseInt(document.getElementById("numChildren").value);
    const numDrinkers = parseInt(document.getElementById("numDrinkers").value);

    if (isNaN(numMen) || isNaN(numWomen) || isNaN(numChildren) || isNaN(numDrinkers)) {
      alert("Por favor, insira apenas números inteiros não negativos.");
      return;
    }

    const meat = (0.4 * numMen) + (0.32 * numWomen) + (0.2 * numChildren);
    const garlicBread = (2 * (numMen + numWomen)) + numChildren;
    const charcoal = numMen + numWomen + numChildren + numDrinkers;
    const salt = 0.04 * (numMen + numWomen + numChildren + numDrinkers);
    const ice = Math.ceil((numMen + numWomen + numChildren + numDrinkers) / 10) * 5;
    const soda = Math.ceil((numMen + numWomen + numChildren + numDrinkers) / 5);
    const water = Math.ceil((numMen + numWomen + numChildren + numDrinkers) / 5);
    const beer = 3 * numDrinkers;

    resultTableBody.innerHTML = `
      <tr><td>Carne</td><td>${meat.toFixed(2)} KG</td></tr>
      <tr><td>Pão de alho</td><td>${garlicBread}</td></tr>
      <tr><td>Carvão</td><td>${charcoal} KG</td></tr>
      <tr><td>Sal</td><td>${salt.toFixed(2)} KG</td></tr>
      <tr><td>Gelo</td><td>${ice} KG</td></tr>
      <tr><td>Refrigerante</td><td>${soda} garrafas de 2L</td></tr>
      <tr><td>Água</td><td>${water} garrafas de 1L</td></tr>
      <tr><td>Cerveja</td><td>${beer} garrafas de 600ml</td></tr>
    `;

    step2.style.display = "none";
    step3.style.display = "block";
  });
  

// Regex para validar o email
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  
  function toggleTheme() {
    document.body.classList.toggle("dark-theme");
  }

  themeToggleBtn.addEventListener("click", toggleTheme);

  backToStep2Btn.addEventListener("click", function() {
    step3.style.display = "none";
    step2.style.display = "block";

  });

  backToStep1Btn.addEventListener("click", function() {
    step3.style.display = "none";
    step1.style.display = "block";
  });
});
