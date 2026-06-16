document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Navigation Scroll Effect & Active Link Highlight (Scroll Spy)
  // ==========================================
  const navbar = document.querySelector('.navbar');
  const navLinksList = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Scroll Spy active state tracking
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.navbar-link');
    let currentActiveId = 'home';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentActiveId = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      const target = item.getAttribute('data-target').substring(1);
      if (target === currentActiveId) {
        item.classList.add('active');
      }
    });
  });

  // ==========================================
  // 2. Mobile Menu Toggle
  // ==========================================
  if (menuToggle && navLinksList) {
    menuToggle.addEventListener('click', () => {
      navLinksList.classList.toggle('open');
      
      // Animate hamburger toggle
      const spans = menuToggle.querySelectorAll('span');
      if (navLinksList.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // ==========================================
  // 3. Smooth Button Scrolling Helper
  // ==========================================
  const scrollButtons = document.querySelectorAll('[data-target]');
  scrollButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.querySelector(targetId);
      
      // Close mobile menu if open
      if (navLinksList && navLinksList.classList.contains('open')) {
        menuToggle.click();
      }
      
      if (targetEl) {
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // 4. Hero Section Slideshow/Carousel
  // ==========================================
  const heroImageSide = document.querySelector('.hero-image-side');
  const sliderPrev = document.querySelector('.hero-slider-controls .slider-btn[aria-label="Slide anterior"]');
  const sliderNext = document.querySelector('.hero-slider-controls .slider-btn[aria-label="Próximo slide"]');
  
  if (heroImageSide && sliderPrev && sliderNext) {
    const slideImages = [
      'assets/hero_party.png',
      'assets/event_setup.png',
      'assets/chef_cooking.png'
    ];
    let currentSlide = 0;
    
    const setSlide = (index) => {
      heroImageSide.style.backgroundImage = `url('${slideImages[index]}')`;
    };
    
    sliderNext.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slideImages.length;
      setSlide(currentSlide);
    });
    
    sliderPrev.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slideImages.length) % slideImages.length;
      setSlide(currentSlide);
    });
  }

  // ==========================================
  // 5. Sabores Section Horizontal Scrolling Button
  // ==========================================
  const scrollContainer = document.getElementById('flavors-scroll-container');
  const scrollRightBtn = document.getElementById('slide-flavors-right');
  
  if (scrollContainer && scrollRightBtn) {
    scrollRightBtn.addEventListener('click', () => {
      const cardWidth = 280 + 24; // Card flex basis width + grid gap spacing
      const currentScroll = scrollContainer.scrollLeft;
      const totalWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (currentScroll >= totalWidth - 10) {
        // Loop back to start if reached end of list
        scrollContainer.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        scrollContainer.scrollTo({
          left: currentScroll + cardWidth,
          behavior: 'smooth'
        });
      }
    });
  }

  // ==========================================
  // 6. Accordion FAQ Section Toggles
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other active questions (optional accordion behavior)
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
      });
      
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ==========================================
  // 7. Interactive Event Quiz Logic
  // ==========================================
  let currentStep = 1;
  const totalSteps = 4;
  
  // Elements
  const quizSteps = document.querySelectorAll('.quiz-step');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const progressFill = document.getElementById('quiz-progress-fill');
  const stepCounter = document.getElementById('quiz-step-counter');

  // Step 1 input
  const guestSlider = document.getElementById('guests');
  const guestValueDisplay = document.getElementById('guests-val');
  if (guestSlider && guestValueDisplay) {
    guestSlider.addEventListener('input', (e) => {
      guestValueDisplay.textContent = e.target.value;
    });
  }

  // Step 2, 3, 4 option selectors
  const optionCards = document.querySelectorAll('.quiz-option-card');
  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      // Find siblings and remove active state
      const radioName = card.querySelector('input[type="radio"]').name;
      const groupCards = document.querySelectorAll(`input[name="${radioName}"]`);
      groupCards.forEach(input => {
        input.closest('.quiz-option-card').classList.remove('active', 'active-lime', 'active-tomato');
      });

      // Select active accent color based on radio type
      const radioVal = card.querySelector('input[type="radio"]').value;
      if (radioName === 'buffet-type') {
        if (radioVal === 'combo') card.classList.add('active-tomato');
        else if (radioVal === 'pizza') card.classList.add('active');
        else card.classList.add('active-lime');
      } else if (radioName === 'drinks-type') {
        card.classList.add('active-lime');
      } else {
        card.classList.add('active');
      }

      card.querySelector('input[type="radio"]').checked = true;
    });
  });

  // Navigation Logic
  if (btnNext && btnPrev) {
    btnNext.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        currentStep++;
        updateQuizStep();
      } else if (currentStep === totalSteps) {
        // Calculate and show results
        calculateQuizResult();
        currentStep++;
        updateQuizStep();
      }
    });

    btnPrev.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateQuizStep();
      }
    });
  }

  function updateQuizStep() {
    // Hide all steps
    quizSteps.forEach(step => step.classList.remove('active'));
    
    // Show active step
    const activeStepEl = document.getElementById(`quiz-step-${currentStep}`);
    if (activeStepEl) activeStepEl.classList.add('active');

    // Update Progress
    if (currentStep <= totalSteps) {
      const percentage = (currentStep / totalSteps) * 100;
      progressFill.style.width = `${percentage}%`;
      stepCounter.textContent = `Passo ${currentStep} de ${totalSteps}`;
      
      // Update buttons
      btnPrev.style.display = currentStep === 1 ? 'none' : 'block';
      btnNext.textContent = currentStep === totalSteps ? 'Finalizar e Ver Orçamento' : 'Avançar';
      btnNext.style.display = 'block';
    } else {
      // Result step
      progressFill.style.width = '100%';
      stepCounter.textContent = 'Orçamento Estimado';
      btnPrev.style.display = 'block';
      btnNext.style.display = 'none'; // Hide next on result page
    }
  }

  // Calculator logic using quiz inputs
  function calculateQuizResult() {
    const guests = parseInt(guestSlider.value);
    
    // Get choices
    let partyStyle = 'casual';
    document.querySelectorAll('input[name="party-style"]').forEach(input => {
      if (input.checked) partyStyle = input.value;
    });

    let drinksType = 'refri';
    document.querySelectorAll('input[name="drinks-type"]').forEach(input => {
      if (input.checked) drinksType = input.value;
    });

    let buffetType = 'combo';
    document.querySelectorAll('input[name="buffet-type"]').forEach(input => {
      if (input.checked) buffetType = input.value;
    });

    // Buffet base calculations
    let pizzasQty = 0;
    let tacosQty = 0;
    
    if (buffetType === 'pizza' || buffetType === 'combo') {
      pizzasQty = Math.ceil(guests / 2.5);
    }
    if (buffetType === 'taco' || buffetType === 'combo') {
      tacosQty = guests * 3;
    }

    // Staffing requirements
    const teamQty = Math.max(2, Math.ceil(guests / 20) + 1);

    // Pricing rates (BRL)
    const BASE_RATES = { pizza: 55, taco: 60, combo: 85 };
    const DRINKS_RATES = { refri: 0, beer: 15, openbar: 30 };
    const baseSetupFee = 400;

    let costPerGuest = BASE_RATES[buffetType] + DRINKS_RATES[drinksType];
    let subtotal = (guests * costPerGuest) + baseSetupFee;

    // Apply multiplier based on event style
    if (partyStyle === 'wedding' || partyStyle === 'corporate') {
      subtotal = subtotal * 1.1; // +10% setup/coordination premium
    }

    const finalTotal = Math.round(subtotal);

    // Update results display
    document.getElementById('res-guests').textContent = `${guests} convidados`;
    document.getElementById('res-pizzas').textContent = pizzasQty > 0 ? `${pizzasQty} pizzas` : '-';
    document.getElementById('res-tacos').textContent = tacosQty > 0 ? `${tacosQty} tacos` : '-';
    document.getElementById('res-team').textContent = `${teamQty} profissionais`;
    document.getElementById('res-total').textContent = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(finalTotal);

    // Dynamic WhatsApp messaging builder (Pointing to layouts number: +55 (11) 98765-4321)
    const sendWhatsAppBtn = document.getElementById('send-whatsapp-quiz');
    if (sendWhatsAppBtn) {
      sendWhatsAppBtn.onclick = () => {
        const partyLabel = { casual: 'Aniversário / Festa Casual', corporate: 'Evento Corporativo', wedding: 'Casamento / Noivado' }[partyStyle];
        const drinksLabel = { refri: 'Apenas Refrigerante & Água', beer: 'Cerveja & Caipirinhas', openbar: 'Open Bar Premium' }[drinksType];
        const buffetLabel = { pizza: 'Apenas Pizzas', taco: 'Apenas Tacos', combo: 'Combo Pizza & Taco' }[buffetType];

        const messageText = `Olá Pizza Taco! Acabei de simular um orçamento personalizado no site:
- *Convidados*: ${guests} pessoas
- *Tipo de Festa*: ${partyLabel}
- *Opção de Cardápio*: ${buffetLabel}
- *Bebidas*: ${drinksLabel}
- *Consumo Estimado*: ${pizzasQty > 0 ? pizzasQty + ' pizzas ' : ''}${tacosQty > 0 ? 'e ' + tacosQty + ' tacos' : ''}
- *Equipe Recomendada*: ${teamQty} profissionais
- *Simulação de Valor*: ${document.getElementById('res-total').textContent}

Gostaria de verificar a disponibilidade de datas!`;

        const encodedMessage = encodeURIComponent(messageText);
        window.open(`https://api.whatsapp.com/send?phone=5511987654321&text=${encodedMessage}`, '_blank');
      };
    }
  }

  // Initialize Quiz Navigation buttons states
  updateQuizStep();

  // ==========================================
  // 8. Polaroid Drag-and-Drop Sandbox
  // ==========================================
  const sandbox = document.getElementById('polaroid-sandbox');
  const cards = document.querySelectorAll('.polaroid-card');

  if (sandbox && cards.length > 0) {
    const sandboxWidth = sandbox.clientWidth;
    const sandboxHeight = sandbox.clientHeight;

    // Scatter cards randomly initially
    cards.forEach((card, index) => {
      // Distribute them evenly in ranges so they don't overlap entirely at start
      const cols = Math.ceil(Math.sqrt(cards.length));
      const col = index % cols;
      const row = Math.floor(index / cols);

      const segmentX = sandboxWidth / cols;
      const segmentY = sandboxHeight / Math.ceil(cards.length / cols);

      // Random jitter within segment
      const randomX = segmentX * col + (Math.random() * (segmentX - 260) + 10);
      const randomY = segmentY * row + (Math.random() * (segmentY - 320) + 20);
      const randomRotation = Math.floor(Math.random() * 20) - 10; // -10 to 10 degrees

      card.style.left = `${Math.max(10, Math.min(sandboxWidth - 260, randomX))}px`;
      card.style.top = `${Math.max(10, Math.min(sandboxHeight - 320, randomY))}px`;
      card.style.transform = `rotate(${randomRotation}deg)`;
    });

    // Drag-and-Drop Physics Logic (Mouse and Touch Support)
    cards.forEach(card => {
      let active = false;
      let currentX;
      let currentY;
      let initialX;
      let initialY;
      let xOffset = 0;
      let yOffset = 0;

      // Extract raw styling position coordinates
      function getPosition() {
        xOffset = parseFloat(card.style.left) || 0;
        yOffset = parseFloat(card.style.top) || 0;
      }

      // Drag start trigger
      const dragStart = (e) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        getPosition();
        
        if (e.type === "touchstart") {
          initialX = e.touches[0].clientX - xOffset;
          initialY = e.touches[0].clientY - yOffset;
        } else {
          initialX = e.clientX - xOffset;
          initialY = e.clientY - yOffset;
        }

        if (e.target.closest('.polaroid-card') === card) {
          active = true;
          card.classList.add('dragging');
          
          // Elevate current card above all other polaroids
          cards.forEach(c => c.style.zIndex = "20");
          card.style.zIndex = "99";
        }
      };

      // Dragging movement loop
      const drag = (e) => {
        if (!active) return;
        e.preventDefault();

        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }

        // Keep card bounds inside sandbox area
        const finalX = Math.max(0, Math.min(sandbox.clientWidth - card.clientWidth, currentX));
        const finalY = Math.max(0, Math.min(sandbox.clientHeight - card.clientHeight, currentY));

        card.style.left = `${finalX}px`;
        card.style.top = `${finalY}px`;
      };

      // Drag end trigger
      const dragEnd = () => {
        if (!active) return;
        initialX = currentX;
        initialY = currentY;
        active = false;
        card.classList.remove('dragging');
      };

      // Event Listeners for both Desktop & Mobile touch devices
      card.addEventListener('mousedown', dragStart, { passive: true });
      card.addEventListener('touchstart', dragStart, { passive: true });

      window.addEventListener('mousemove', drag, { passive: false });
      window.addEventListener('touchmove', drag, { passive: false });

      window.addEventListener('mouseup', dragEnd, { passive: true });
      window.addEventListener('touchend', dragEnd, { passive: true });
    });
  }

  // ==========================================
  // 9. Scroll Reveal IntersectionObserver
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal-element');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
});
