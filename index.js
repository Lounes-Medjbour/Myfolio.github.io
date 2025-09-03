  
    document.addEventListener('DOMContentLoaded', function() {
      // Configuration du carrousel
      const track = document.getElementById('carousel-track');
      const indicatorsContainer = document.getElementById('carousel-indicators');
      const totalItems = track.children.length;
      let index = 0;
      let autoScroll;

      // Création des indicateurs
      for (let i = 0; i < totalItems; i++) {
        const btn = document.createElement('button');
        btn.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(btn);
      }

      // Gestion des boutons de navigation
      document.querySelector('.carousel-btn.prev').addEventListener('click', () => moveSlide(-1));
      document.querySelector('.carousel-btn.next').addEventListener('click', () => moveSlide(1));

      function updateSlide() {
        track.style.transform = `translateX(-${index * 100}%)`;
        document.querySelectorAll('#carousel-indicators button').forEach((btn, i) => {
          btn.classList.toggle('active', i === index);
        });
      }

      function moveSlide(step) {
        index = (index + step + totalItems) % totalItems;
        updateSlide();
        restartAutoScroll();
      }

      function goToSlide(i) {
        index = i;
        updateSlide();
        restartAutoScroll();
      }

      function startAutoScroll() {
        autoScroll = setInterval(() => moveSlide(1), 5000);
      }

      function restartAutoScroll() {
        clearInterval(autoScroll);
        startAutoScroll();
      }

      startAutoScroll();
      updateSlide();

      // Animation au défilement
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
      });

      // Configuration d'EmailJS
      (function() {
        // Initialisation d'EmailJS avec votre Public Key
        emailjs.init("adER8VDN9D0Y0PybB"); // Remplacez par votre clé publique EmailJS
      })();

      // Gestion du formulaire de contact
      const contactForm = document.getElementById('contact-form');
      const formMessage = document.getElementById('form-message');
      const submitBtn = document.getElementById('submit-btn');

      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Afficher l'état de chargement
        submitBtn.textContent = 'Envoi en cours...';
        contactForm.classList.add('loading');
        formMessage.style.display = 'none';
        
        // Envoyer le formulaire via EmailJS
        emailjs.sendForm('service_1zpratk', 'template_s2nwqgm', this)
          .then(function() {
            // Succès
            formMessage.textContent = 'Message envoyé avec succès! Je vous répondrai bientôt.';
            formMessage.className = 'form-message success-message';
            formMessage.style.display = 'block';
            
            // Réinitialiser le formulaire
            contactForm.reset();
          }, function(error) {
            // Erreur
            formMessage.textContent = 'Une erreur s\'est produite. Veuillez réessayer ou me contacter directement par email.';
            formMessage.className = 'form-message error-message';
            formMessage.style.display = 'block';
            console.error('Erreur EmailJS:', error);
          })
          .finally(function() {
            // Restaurer le bouton d'envoi
            submitBtn.textContent = 'Envoyer';
            contactForm.classList.remove('loading');
          });
      });
    });
  