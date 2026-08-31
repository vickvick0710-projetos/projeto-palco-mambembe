document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. Filtro Masonry da Galeria de Espetáculos
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-container .btn-filter');
  const galleryItems = document.querySelectorAll('.masonry-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover classe 'active' de todos os botões e adicionar ao atual
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     2. Lightbox Modal para Ampliação de Imagens
     ========================================================================== */
  const lightboxModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalCaption = document.getElementById('modal-caption');

  document.querySelectorAll('.polaroid-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('.polaroid-caption h5');
      const caption = card.querySelector('.polaroid-caption p');

      if (img && title && caption) {
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = title.textContent;
        modalCaption.textContent = caption.textContent;
        
        lightboxModal.show();
      }
    });
  });

  /* ==========================================================================
     3. Smooth Scroll e Marcador Ativo de Navegação
     ========================================================================== */
  const navLinks = document.querySelectorAll('.navbar-vintage .nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    const sections = document.querySelectorAll('section, footer');

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     4. Envio Simulado do Formulário de Contato
     ========================================================================== */
    
     /* Verificar pq o forms não esta funcionando */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando Carta...';

        // Cole aqui a URL gerada pelo Google Apps Script:
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwfO2JLQqXiv92yvVKyo2GuJX4CTP43FWVa2qM34FIzs6qRACy7iBHCeY35wkUuDJppOA/exec';

        const formData = {
        nome: contactForm.querySelector('input[type="text"]').value,
        email: contactForm.querySelector('input[type="email"]').value,
        mensagem: contactForm.querySelector('textarea').value
        };

        fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
        alert('Sua mensagem foi salva na nossa produção! Responderemos em breve.');
        contactForm.reset();
        })
        .catch(error => {
        alert('Erro ao enviar mensagem. Tente novamente.');
        console.error('Erro:', error);
        })
        .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Solicitação';
        });
    });
    }

});