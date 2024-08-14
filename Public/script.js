
document.addEventListener('DOMContentLoaded', () =>{
    async function handleRegister(e) {
        e.preventDefault();

        const nombre = document.getElementById('Nombre').value;
        const apellido = document.getElementById('Apellido').value;
        const fecha_nacimiento = document.getElementById('Fecha_Nacimiento').value;
        const direccion = document.getElementById('Direccion').value;
        const telefono = document.getElementById('Telefono').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value; 

        try{
            const res = await fetch('http://localhost:5000/api/auth/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({nombre, apellido, fecha_nacimiento, direccion, telefono, email, password})
            });


            const data = await res.json();
            if (res.status === 200){
                alert ('Resgistro Exitoso');
            }else {
                alert(`Error: ${data.msg}`);
            }

        }catch(error){
            console.error('Error:', error);
            alert('Error de Registro de Usuario')
        }

       }


    async function handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value; 

        try{
            const res = await fetch('http://localhost:5000/api/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password})
            });


            const data = await res.json();
            if (res.status === 200){
                alert ('Login  Exitoso');
            }else {
                alert(`Error: ${data.msg}`);
            }

        }catch(error){
            console.error('Error:', error);
            alert('Error al inicio de sesión')
        }

       }

       document.getElementById('registerForm').addEventListener('submit', handleRegister);
       document.getElementById('loginForm').addEventListener('submit', handleLogin);
   
});

