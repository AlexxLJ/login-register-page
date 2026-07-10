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
