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
      'assets/hero_slide_1.png',
      'assets/hero_slide_2.png',
      'assets/hero_slide_3.png',
      'assets/hero_slide_4.png'
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

  // ==========================================
  // 10. Blog Section Logic (Articles Database & Modal Controls)
  // ==========================================
  const blogPosts = [
    {
      id: "show-cooking-corporate",
      category: "Corporativo",
      date: "16 de Junho de 2026",
      readTime: "4 min de leitura",
      title: "Show Cooking: Como a Gastronomia ao Vivo Transforma Eventos Corporativos em Experiências de Conexão",
      image: "assets/blog_corporate_catering.png",
      excerpt: "Descubra como levar o preparo artesanal de pizzas e tacos mexicanos ao vivo para sua empresa pode quebrar o gelo, engajar colaboradores e surpreender clientes importantes em confraternizações.",
      content: `
        <span class="article-meta">Corporativo • 16 de Junho de 2026 • 4 min de leitura</span>
        <h1 class="article-title" id="modal-title">Show Cooking: Como a Gastronomia ao Vivo Transforma Eventos Corporativos em Experiências de Conexão</h1>
        <img class="article-image" src="assets/blog_corporate_catering.png" alt="Chef preparando pizza-taco em evento corporativo">
        <div class="article-body">
          <p>No cenário empresarial moderno, as confraternizações e eventos de networking deixaram de ser apenas reuniões formais com salgadinhos frios. Hoje, as organizações buscam criar momentos que realmente engajem, marquem a memória dos convidados e fortaleçam as relações comerciais. É aí que entra o conceito de <strong>Show Cooking</strong>.</p>
          
          <p>Preparar pratos sofisticados ao vivo, diante dos olhos dos convidados, vai além de simplesmente servir comida. É uma forma de entretenimento ativo, uma atração gastronômica que gera conversa, desperta curiosidade e aproxima as pessoas de forma natural.</p>
          
          <h3>Quebrando o Gelo com Gastronomia</h3>
          <p>Diferente de um buffet tradicional em que os convidados apenas se servem em uma fila silenciosa, o show cooking de pizzas artesanais e tacos mexicanos cria uma estação de calor e energia. Os convidados assistem à abertura das massas fermentadas lentamente, escolhem os recheios premium na hora e conversam diretamente com os chefes de cozinha.</p>
          <blockquote>"A comida preparada ao vivo quebra as barreiras hierárquicas e estimula diálogos genuínos entre colaboradores e clientes importantes."</blockquote>

          <h3>Praticidade e Sofisticação na Medida Certa</h3>
          <p>Para o setor de recursos humanos ou marketing que planeja o evento, o show cooking oferece uma infraestrutura completamente independente. A equipe da Pizza Taco monta estações de live cooking organizadas, limpas e rápidas, adaptando-se tanto a escritórios modernos (roof tops, varandas corporativas) quanto a espaços de eventos tradicionais. É a fusão perfeita entre a descontração rústica dos tacos e a elegância de pizzas napolitanas assadas em fornos de pedra de alta temperatura.</p>

          <h3>Benefícios para seu Evento Empresarial:</h3>
          <ul>
            <li><strong>Estação de Networking Ativo:</strong> A preparação gera pontos naturais de parada e conversa espontânea.</li>
            <li><strong>Experiência Personalizada:</strong> Cada convidado monta sua pizza ou taco de acordo com suas preferências alimentares (incluindo opções vegetarianas).</li>
            <li><strong>Branding Indireto:</strong> Associar sua marca a uma experiência gastronômica memorável e de alta qualidade gera excelente reputação pós-evento.</li>
          </ul>
          
          <p>Planejar o próximo evento da sua empresa com uma experiência ao vivo é garantir que seus parceiros e colaboradores lembrem da data por muito tempo.</p>
        </div>
      `
    },
    {
      id: "casamento-rustico-chic",
      category: "Casamentos",
      date: "10 de Junho de 2026",
      readTime: "5 min de leitura",
      title: "Casamento Rústico-Chique: O Charme do Buffet Artesanal de Pizza e Taco ao Vivo",
      image: "assets/blog_wedding_catering.png",
      excerpt: "Casamentos ao ar livre ou no campo pedem menus que transmitam calor, afeto e originalidade. Veja por que o buffet artesanal ao vivo é a escolha ideal para recepções modernas.",
      content: `
        <span class="article-meta">Casamentos • 10 de Junho de 2026 • 5 min de leitura</span>
        <h1 class="article-title" id="modal-title">Casamento Rústico-Chique: O Charme do Buffet Artesanal de Pizza e Taco ao Vivo</h1>
        <img class="article-image" src="assets/blog_wedding_catering.png" alt="Buffet rústico de casamento com pizza-tacos artesanais">
        <div class="article-body">
          <p>A busca por casamentos mais intimistas, autênticos e conectados com a natureza trouxe à tona a estética do <strong>rústico-chique</strong>. Casamentos realizados no campo, em praias ou galpões históricos decorados com luzes de filamento pedem um menu que acompanhe essa mesma energia de aconchego, elegância e proximidade.</p>
          
          <p>Os casais contemporâneos têm preferido substituir os jantares formais empratados por buffets dinâmicos de alta gastronomia que promovam interação e descontração de forma sofisticada.</p>
          
          <h3>Show Cooking como Atração no Casamento</h3>
          <p>O buffet artesanal de pizza e tacos mexicanos ao vivo se encaixa perfeitamente nessa proposta. Ver a fumaça sutil saindo dos fornos portáteis de pedra, o cheiro de manjericão fresco e a montagem das tortilhas aquecidas na hora transforma o buffet em parte da cenografia da festa.</p>
          <blockquote>"Mais do que servir uma refeição, levamos um show culinário interativo que celebra o afeto e a partilha."</blockquote>

          <h3>Sofisticação nos Insumos Premium</h3>
          <p>Optar por pizza e tacos não significa abrir mão do luxo. A sofisticação está na curadoria dos ingredientes: mozzarellas artesanais, presunto cru de Parma, pepperoni curado com mel picante silvestre, rúcula baby fresca e jalapeños selecionados. A massa de longa fermentação (48h) confere leveza incomparável, permitindo que os convidados aproveitem a pista de dança sem a sensação de estômago pesado.</p>

          <h3>Por que escolher buffet ao vivo para casamentos?</h3>
          <ul>
            <li><strong>Cardápio Dinâmico e Democrático:</strong> Agrada a todas as idades, desde crianças até os paladares mais exigentes.</li>
            <li><strong>Clima Acolhedor:</strong> Combina perfeitamente com casamentos no campo, mini weddings e recepções vespertinas.</li>
            <li><strong>Serviço Contínuo:</strong> A comida é servida quente e fresca durante todo o período da recepção, eliminando filas frias de buffets tradicionais.</li>
          </ul>
          
          <p>Se o objetivo é criar um dia inesquecível e cheio de personalidade para seus convidados, o show cooking rústico-gourmet é a receita ideal.</p>
        </div>
      `
    },
    {
      id: "guia-de-harmonizacao",
      category: "Experiência Gourmet",
      date: "05 de Junho de 2026",
      readTime: "3 min de leitura",
      title: "Guia de Harmonização: Vinhos e Cervejas Artesanais para Acompanhar Pizza-Tacos",
      image: "assets/blog_wine_pairing.png",
      excerpt: "Eleve o nível do cardápio do seu evento combinando as criações artesanais da Pizza Taco com vinhos selecionados e cervejas artesanais. Dicas simples de sommelier.",
      content: `
        <span class="article-meta">Experiência Gourmet • 05 de Junho de 2026 • 3 min de leitura</span>
        <h1 class="article-title" id="modal-title">Guia de Harmonização: Vinhos e Cervejas Artesanais para Acompanhar Pizza-Tacos</h1>
        <img class="article-image" src="assets/blog_wine_pairing.png" alt="Copos de vinho e cerveja artesanal ao lado de pizza-tacos gourmet">
        <div class="article-body">
          <p>Quando pensamos em buffets de pizza e culinária mexicana, a primeira associação costuma ser com refrigerantes ou cervejas pilsen comerciais. No entanto, o universo do live catering gourmet da Pizza Taco abre portas para combinações enológicas e cervejeiras ricas e surpreendentes.</p>
          
          <p>A harmonização correta realça a acidez dos tomates frescos, equilibra a gordura dos queijos nobres e suaviza a picância dos tacos mexicanos, transformando a refeição em uma verdadeira degustação guiada.</p>
          
          <h3>1. O Match Perfeito com Vinhos</h3>
          <p>A acidez natural do molho de tomate artesanal e a presença do queijo nas pizzas pedem vinhos com acidez equilibrada e taninos macios:</p>
          <ul>
            <li><strong>Margherita e Vinho Chianti (ou Pinot Noir):</strong> A leveza do Pinot Noir ou o frutado de um Chianti italiano jovem combinam divinamente com o frescor do manjericão e da mozzarella.</li>
            <li><strong>Picante Mexicano e Vinhos Carmenere ou Syrah:</strong> Carnes condimentadas e molhos de pimenta pedem tintos estruturados e com notas especiadas, como um Carmenere chileno ou um Syrah nacional.</li>
            <li><strong>4 Queijos com Damasco e Espumante Brut:</strong> A cremosidade dos queijos e a doçura do damasco são perfeitamente limpas pela efervescência e acidez de um bom espumante Brut ou um vinho branco Chardonnay barricado.</li>
          </ul>

          <h3>2. Harmonizando com Cervejas Artesanais</h3>
          <p>As cervejas artesanais possuem perfis de malte e lúpulo que conversam perfeitamente com a complexidade de texturas das nossas receitas:</p>
          <ul>
            <li><strong>Pepperoni com Mel e cervejas Pale Ale ou IPA:</strong> O amargor e as notas cítricas de uma India Pale Ale cortam a gordura e o picante do pepperoni, enquanto o malte caramelizado abraça a doçura do mel.</li>
            <li><strong>Tacos de Carnitas/Picante e cerveja Witbier:</strong> Cervejas de trigo leves com toque de casca de laranja e coentro (estilo Witbier) ajudam a refrescar o paladar após a picância do jalapeño.</li>
          </ul>

          <blockquote>"A harmonização de bebidas premium traz um toque de sofisticação e cuidado que reflete diretamente no sucesso e lembrança do evento."</blockquote>

          <p>Oferecer essas sugestões em um quadro na estação gastronômica ou treinar a equipe para recomendar as bebidas aos convidados eleva o buffet ao status de experiência gastronômica inesquecível.</p>
        </div>
      `
    }
  ];

  // Render cards in grid dynamically
  const blogContainer = document.getElementById('blog-posts-container');
  if (blogContainer) {
    blogContainer.innerHTML = blogPosts.map(post => `
      <article class="blog-card reveal-element" data-post-id="${post.id}" role="button" tabindex="0" aria-label="Ler artigo: ${post.title}">
        <div class="blog-card-image">
          <span class="blog-card-badge">${post.category}</span>
          <img src="${post.image}" alt="${post.title}">
        </div>
        <div class="blog-card-content">
          <span class="blog-card-meta">${post.date} • ${post.readTime}</span>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <span class="blog-card-link">
            Ler Artigo Completo
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </div>
      </article>
    `).join('');
  }

  // Modal Functionality
  const blogModal = document.getElementById('blog-modal');
  const blogModalContent = document.getElementById('blog-modal-content');
  const blogModalClose = document.getElementById('blog-modal-close');
  let lastFocusedElement = null;

  function openArticle(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post || !blogModal || !blogModalContent) return;

    // Save current active element for accessibility focus return
    lastFocusedElement = document.activeElement;

    // Set article content
    blogModalContent.innerHTML = post.content;

    // Show modal
    blogModal.classList.add('open');
    blogModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Add scroll reveal triggers to dynamically rendered content
    const modalReveal = blogModalContent.querySelectorAll('.reveal-element');
    modalReveal.forEach(el => el.classList.add('revealed'));

    // Focus close button for accessibility
    setTimeout(() => {
      blogModalClose.focus();
    }, 100);
  }

  function closeArticle() {
    if (!blogModal) return;

    blogModal.classList.remove('open');
    blogModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore background scrolling

    // Return focus to the element that triggered the modal
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // Event Listeners for Cards
  const blogCards = document.querySelectorAll('.blog-card');
  blogCards.forEach(card => {
    card.addEventListener('click', () => {
      const postId = card.getAttribute('data-post-id');
      openArticle(postId);
    });

    // Handle Enter key for accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const postId = card.getAttribute('data-post-id');
        openArticle(postId);
      }
    });
  });

  // Event Listeners for Modal Closing
  if (blogModalClose) {
    blogModalClose.addEventListener('click', closeArticle);
  }

  if (blogModal) {
    // Close on clicking overlay background (outside card)
    blogModal.addEventListener('click', (e) => {
      if (e.target === blogModal) {
        closeArticle();
      }
    });
  }

  // Handle Escape key to close modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && blogModal && blogModal.classList.contains('open')) {
      closeArticle();
    }
  });

  // Focus trap inside modal for keyboard navigation accessibility
  window.addEventListener('keydown', (e) => {
    if (blogModal && blogModal.classList.contains('open') && e.key === 'Tab') {
      const focusableElements = blogModal.querySelectorAll('button, [tabindex="0"], a');
      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Tab + Shift (backwards)
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else { // Tab (forwards)
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    }
  });

  // Add the newly rendered blog cards to IntersectionObserver if it exists
  if ('IntersectionObserver' in window && window.revealObserver) {
    const newCards = document.querySelectorAll('.blog-card.reveal-element');
    newCards.forEach(el => window.revealObserver.observe(el));
  } else {
    const newCards = document.querySelectorAll('.blog-card.reveal-element');
    newCards.forEach(el => el.classList.add('revealed'));
  }
});
