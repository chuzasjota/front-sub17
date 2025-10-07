const form = document.getElementById('loginForm');
const msg = document.getElementById('loginMessage');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const json = await res.json();
      if (json.success) {
        msg.textContent = 'Login correcto';
        // Guardar token y redirigir al admin principal
        if (json.token) {
          localStorage.setItem('token', json.token);
        }
        window.location.href = './index.html';
      } else {
        msg.textContent = json.message || 'Credenciales inválidas';
      }
    } catch (err) {
      console.error(err);
      msg.textContent = 'Error de conexión';
    }
  });
}
