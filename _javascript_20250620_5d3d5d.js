document.getElementById('citaForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const cita = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    fecha: document.getElementById('fecha').value,
    hora: document.getElementById('hora').value,
    doctor: document.getElementById('doctor').value
  };

  try {
    const response = await fetch('http://localhost:3000/api/citas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cita)
    });
    
    if (response.ok) {
      alert('Cita agendada correctamente!');
      loadCitas();
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

async function loadCitas() {
  const response = await fetch('http://localhost:3000/api/citas');
  const citas = await response.json();
  const citasList = document.getElementById('citasList');
  
  citasList.innerHTML = citas.map(cita => `
    <div class="cita-item">
      <p><strong>${cita.nombre}</strong> - ${cita.doctor}</p>
      <p>${cita.fecha} a las ${cita.hora}</p>
    </div>
  `).join('');
}

// Cargar citas al iniciar
loadCitas();