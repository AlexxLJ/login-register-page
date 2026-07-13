const flipCard = document.getElementById('flipCard');
    const registerText = document.getElementById('registerText');
    const loginText = document.getElementById('loginText');

    registerText.addEventListener('click', () => {
        flipCard.style.transform = 'rotateY(180deg)';
    });

    loginText.addEventListener('click', () => {
        flipCard.style.transform = 'rotateY(0deg)';
    });



function togglePasswordVisibility() {
    const toggleBtn = event.currentTarget; 
    const wrapper = toggleBtn.closest(".password-wrapper");
    const input = wrapper.querySelector('input[name="password"]');
    const icon = toggleBtn.querySelector("i");

    const isVisible = input.type === "text";
    input.type = isVisible ? "password" : "text";

    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
}



document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Evita recargar la página

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const remember = document.getElementById("rememberPassword").checked;

    if (remember) {
        let savedUsers = JSON.parse(localStorage.getItem("savedUsers")) || [];

        // Evitar duplicados
        const exists = savedUsers.some(u => u.username === username);
        if (!exists) {
            savedUsers.push({ username, password });
            localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
        }
    }

    
    console.log("Login enviado:", username, password);
});


const usernameInput = document.querySelector('input[name="username"]');
const suggestionsBox = document.getElementById("suggestions");

usernameInput.addEventListener("input", () => {
    const text = usernameInput.value.toLowerCase();
    const savedUsers = JSON.parse(localStorage.getItem("savedUsers")) || [];

    const matches = savedUsers.filter(u => 
        u.username.toLowerCase().startsWith(text)
    );

    suggestionsBox.innerHTML = "";

    if (text.length === 0 || matches.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    suggestionsBox.style.display = "block";

    matches.forEach(user => {
        const item = document.createElement("div");
        item.classList.add("suggestion-item");
        item.textContent = user.username;

        item.addEventListener("click", () => {
            usernameInput.value = user.username;
            document.querySelector('input[name="password"]').value = user.password;
            suggestionsBox.style.display = "none";
        });

        suggestionsBox.appendChild(item);
    });
});
