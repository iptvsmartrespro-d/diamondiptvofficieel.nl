document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    // Clear previous errors
    form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(field => {
      field.classList.remove('error');
    });

    // Validate required fields
    const naam = form.querySelector('#contact-naam');
    const email = form.querySelector('#contact-email');
    const bericht = form.querySelector('#contact-bericht');

    if (!naam.value.trim()) { 
      naam.classList.add('error'); 
      isValid = false; 
    }
    
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { 
      email.classList.add('error'); 
      isValid = false; 
    }
    
    if (!bericht.value.trim()) { 
      bericht.classList.add('error'); 
      isValid = false; 
    }

    if (isValid) {
      // Show success message
      const successDiv = document.createElement('div');
      successDiv.className = 'form-success';
      successDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Bedankt! We nemen zo snel mogelijk contact met je op.';
      
      form.innerHTML = '';
      form.appendChild(successDiv);
    }
  });

  // Add error class styling dynamically if it wasn't added in CSS
  const style = document.createElement('style');
  style.textContent = `
    .form-input.error, .form-textarea.error, .form-select.error { 
      border-color: var(--color-accent) !important; 
    } 
    .form-success { 
      display: flex; 
      align-items: center; 
      gap: 12px; 
      padding: 20px; 
      background: rgba(34, 197, 94, 0.1); 
      border: 1px solid rgba(34, 197, 94, 0.3); 
      border-radius: 10px; 
      color: #22c55e; 
      font-weight: 500; 
    } 
    .form-success svg { 
      width: 24px; 
      height: 24px; 
      flex-shrink: 0; 
    }
  `;
  document.head.appendChild(style);
});
