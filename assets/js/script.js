document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  initTypingAnimation();
  initMobileMenu();
  initThemeToggle();
  initSmoothScrolling();
  initScrollAnimations();
  initActiveNavigation();
  initProjectModal();
  initProjectFiltering();
  initChatbot();
  initCounterAnimations();
  initKeyboardNavigation();
  initAccessibilityFeatures();
  initErrorHandling();
  
  // Initialize particles after other critical features
  setTimeout(() => {
    initParticles();
  }, 500);

  // Typing Animation
  function initTypingAnimation() {
    const subtitles = [
      "Full Stack Developer",
      "AI Enthusiast", 
      "Tech Leader",
      "Problem Solver",
    ];
    let currentSubtitle = 0;
    let currentChar = 0;
    let isDeleting = false;
    const typingElement = document.getElementById("typing-text");

    if (!typingElement) return;

    function type() {
      const fullText = subtitles[currentSubtitle];

      if (isDeleting) {
        typingElement.textContent = fullText.substring(0, currentChar - 1);
        currentChar--;
      } else {
        typingElement.textContent = fullText.substring(0, currentChar + 1);
        currentChar++;
      }

      let typeSpeed = 100;

      if (isDeleting) {
        typeSpeed /= 2;
      }

      if (!isDeleting && currentChar === fullText.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentSubtitle = (currentSubtitle + 1) % subtitles.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }

    type();
  }

  // Initialize particles
  function initParticles() {
    if (typeof particlesJS !== "undefined") {
      // Get current theme
      const isDark = document.documentElement.classList.contains('dark');
      const particleColor = isDark ? "#ffffff" : "#1e293b";
      const lineColor = isDark ? "#ffffff" : "#1e293b";
      
      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: particleColor },
          shape: { type: "circle" },
          opacity: { value: isDark ? 0.5 : 0.3, random: false },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: lineColor,
            opacity: isDark ? 0.4 : 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
          }
        },
        retina_detect: true
      });
    }
  }

  // Mobile menu toggle
  function initMobileMenu() {
    const mobileToggle = document.getElementById("mobileMenuToggle");
    const navLinks = document.querySelector(".nav-links");
    const body = document.body;

    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        this.classList.toggle("active");
        navLinks.classList.toggle("active");
        body.classList.toggle("mobile-menu-open");
      });

      // Close menu when clicking on a link
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileToggle.classList.remove("active");
          navLinks.classList.remove("active");
          body.classList.remove("mobile-menu-open");
        });
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
          mobileToggle.classList.remove("active");
          navLinks.classList.remove("active");
          body.classList.remove("mobile-menu-open");
        }
      });
    }
  }

  // Theme toggle
  function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    const html = document.documentElement;

    if (!themeToggle) return;

    // Check for saved theme preference or use system preference
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    
    html.classList.add(savedTheme);
    console.log("Theme initialized:", savedTheme);

    themeToggle.addEventListener("click", () => {
      const currentTheme = html.classList.contains("dark") ? "dark" : "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      html.classList.remove(currentTheme);
      html.classList.add(newTheme);
      localStorage.setItem("theme", newTheme);
      console.log("Theme changed to:", newTheme);
      
      // Reinitialize particles with new theme
      setTimeout(() => {
        initParticles();
      }, 100);
    });
  }

  // Smooth scrolling for navigation links
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  // Scroll animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll(".fade-in-up").forEach((el) => {
      observer.observe(el);
    });
  }

  // Active navigation highlight
  function initActiveNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {
      const scrollY = window.pageYOffset;

      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    }

    window.addEventListener("scroll", updateActiveNav);
  }

  // Project modal functionality
  function initProjectModal() {
    const projectData = {
      1: {
        title: "AI ChatBot",
        description: "Advanced AI chatbot that processes uploaded files and returns intelligent responses using state-of-the-art NLP techniques.",
        technologies: ["Python", "Flask", "NLP", "Machine Learning", "AI"],
        images: ["assets/images/aichatbot.png","assets/images/aichatbot2.png"],
        features: [
          "File upload and processing capabilities",
          "Natural language understanding",
          "Context-aware responses",
          "Multi-format document support",
          "Real-time chat interface"
        ],
        liveDemo: "https://colab.research.google.com/drive/1kWkgviAqgbNQfT9coVTGbc6tpXd6OiQm?usp=sharing",
        github: "https://github.com/utkarshrajputt/rag-chatbot"
      },
      2: {
        title: "Smart Marketplace",
        description: "A comprehensive e-commerce platform that facilitates secure transactions between buyers and sellers with AI-powered features.",
        technologies: ["Django", "Python", "PostgreSQL", "AI Chatbot", "REST API"],
        images: ["assets/images/shopease/shopease1.png","assets/images/shopease/shopease2.png","assets/images/shopease/shopease3.png","assets/images/shopease/shopease4.png","assets/images/shopease/shopease5.png","assets/images/shopease/shopease6.png"],
        features: [
          "User authentication and authorization",
          "Product catalog with search functionality",
          "AI-powered recommendation system",
          "Secure payment integration",
          "Real-time messaging system"
        ],
        liveDemo: "https://shopeasestore.pythonanywhere.com/",
        github: "https://github.com/utkarshrajputt/shopease"
      },
      3: {
        title: "NEEV Portal",
        description: "Comprehensive student profiling software designed for SEMCOM College, now used by 900+ students for academic data and communication.",
        technologies: ["PHP", "PDO", "MySQL", "Responsive Design"],
        images: [],
        features: [
          "Role-based dashboards for students and faculty",
          "PDF/Excel report generation",
          "Attendance upload and tracking",
          "Secure student login system",
          "Resource management workflows"
        ],
        liveDemo: "http://202.129.240.162:8081/student/student_login.php",
        github: "https://github.com/utkarshrajputt/semcom_portal"
      },
      4: {
        title: "BLogSite",
        description: "Responsive blogging platform with comprehensive user and author panels featuring post creation, likes, comments, and detailed engagement tracking.",
        technologies: ["PHP", "PDO", "JavaScript", "CSS3"],
        images: [],
        features: [
          "User and author management panels",
          "Post creation and editing tools",
          "Like and comment system",
          "User engagement analytics",
          "Responsive design for all devices"
        ],
        liveDemo: "https://blogo-ut.infinityfreeapp.com/home.php",
        github: "https://github.com/utkarshrajputt/blogo"
      },
      5: {
        title: "LeetCode Streak Bot",
        description: "A daily reminder bot that checks your LeetCode activity and sends motivational praise or hilarious roasts via Telegram based on your coding consistency.",
        technologies: ["Python", "GitHub Actions", "GraphQL", "Telegram API", "AI Motivation"],
        images: [],
        features: [
          "Automated daily LeetCode activity checking",
          "AI-generated motivational messages",
          "Telegram bot integration",
          "GitHub Actions automation",
          "Streak tracking and analytics"
        ],
        liveDemo: "https://t.me/utkarsh_streak_bot",
        github: "https://github.com/utkarshrajputt/leetcode-streak-checker"
      },
      6: {
  title: "QuickTalk",
  description: "A feature-rich social media platform built with Django, featuring real-time interactions, tweet system with media support, user profiles, follow system, and modern dark-themed UI with seamless AJAX functionality.",
  technologies: ["Django", "Python", "Tailwind CSS", "JavaScript", "AJAX", "SQLite", "HTML5"],
  images: [],
  features: [
    "User authentication and secure login/signup system",
    "Tweet creation with text and media upload support",
    "Real-time like/unlike and bookmark functionality via AJAX",
    "User profiles with customizable bios and profile pictures",
    "Follow/unfollow system for social networking",
    "Comment system for engaging discussions",
    "Search and user discovery features",
    "Responsive design optimized for all devices",
    "Modern dark theme with smooth animations",
    "Professional error handling and validation"
  ],
  liveDemo: "https://quicktalk-vjyl.onrender.com/", 
  github: "https://github.com/utkarshrajputt/QuickTalk"
}
    };

    // Modal elements
    const modal = document.getElementById("projectModal");
    const closeBtn = document.querySelector(".close");
    const viewProjectBtns = document.querySelectorAll(".view-project");

    if (!modal || !closeBtn) return;

    // Add click listeners to view project buttons
    viewProjectBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const projectId = this.getAttribute("data-project");
        if (projectId && projectData[projectId]) {
          showProjectModal(projectData[projectId]);
        }
      });
    });

    // Show modal with project data
    function showProjectModal(project) {
      // Update modal content
      document.getElementById("modalTitle").textContent = project.title;
      document.getElementById("modalDescription").innerHTML = `<p>${project.description}</p>`;

      // Update images
      const imagesContainer = document.getElementById("modalImages");
      if (imagesContainer) {
        if (project.images && project.images.length > 0) {
          imagesContainer.classList.add('has-images');
          imagesContainer.innerHTML = project.images
            .map((img, index) => `
              <div class="modal-image" data-image-index="${index}">
                <img src="${img}" alt="${project.title} screenshot" loading="lazy" 
                     data-lightbox-trigger="true" 
                     data-image-src="${img}" 
                     data-project-title="${project.title}" 
                     data-image-index="${index}">
              </div>
            `)
            .join("");
          
          // Add event listeners to images
          const lightboxImages = imagesContainer.querySelectorAll('[data-lightbox-trigger="true"]');
          console.log('Found lightbox images:', lightboxImages.length);
          console.log('Project images:', project.images);
          lightboxImages.forEach((img, index) => {
            console.log('Adding event listener to image:', index, img);
            img.addEventListener('click', (e) => {
              console.log('Image clicked:', index, project.images[index]);
              e.preventDefault();
              e.stopPropagation();
              
              // Check if function exists
              if (typeof window.openImageLightbox === 'function') {
                console.log('Calling openImageLightbox...');
                try {
                  window.openImageLightbox(project.images[index], project.title, index, project.images);
                } catch (error) {
                  console.error('Error calling lightbox:', error);
                }
              } else {
                console.error('openImageLightbox function not found!');
              }
            });
          });
        } else {
          imagesContainer.classList.remove('has-images');
          imagesContainer.innerHTML = "";
        }
      }

      // Update technologies
      const techContainer = document.getElementById("modalTechnologies");
      if (techContainer) {
        techContainer.innerHTML = project.technologies
          .map((tech) => `<span class="tech-tag">${tech}</span>`)
          .join("");
      }

      // Update features
      const featuresContainer = document.getElementById("modalFeatures");
      if (featuresContainer) {
        featuresContainer.innerHTML = `
          <h4>Key Features</h4>
          <ul>
            ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
          </ul>
        `;
      }

      // Update buttons - Show project links section
      const modalLinks = document.getElementById("modalLinks");
      const liveDemoBtn = document.getElementById("liveDemoBtn");
      const githubBtn = document.getElementById("githubBtn");
      
      if (modalLinks) {
        modalLinks.style.display = "flex";
      }
      
      if (liveDemoBtn && project.liveDemo) {
        liveDemoBtn.href = project.liveDemo;
        liveDemoBtn.style.display = "inline-flex";
        // Ensure new tab opening
        liveDemoBtn.removeAttribute('onclick');
        liveDemoBtn.addEventListener('click', function(e) {
          e.preventDefault();
          window.open(this.href, '_blank', 'noopener,noreferrer');
        });
      } else if (liveDemoBtn) {
        liveDemoBtn.style.display = "none";
      }
      
      if (githubBtn && project.github) {
        githubBtn.href = project.github;
        githubBtn.style.display = "inline-flex";
        // Ensure new tab opening
        githubBtn.removeAttribute('onclick');
        githubBtn.addEventListener('click', function(e) {
          e.preventDefault();
          window.open(this.href, '_blank', 'noopener,noreferrer');
        });
      } else if (githubBtn) {
        githubBtn.style.display = "none";
      }

      // Show modal
      modal.classList.add('active');
      document.body.style.overflow = "hidden";
      
      // Focus management for accessibility
      modal.focus();
    }

    // Close modal functionality
    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = "auto";
    }

    closeBtn.addEventListener("click", closeModal);

    // Close modal when clicking outside
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.style.display === "block") {
        closeModal();
      }
    });
  }

  // Project filtering functionality
  function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-in-out';
          } else {
            const categories = card.getAttribute('data-category');
            if (categories && categories.includes(filter)) {
              card.style.display = 'block';
              card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // Add fadeIn animation for project filtering
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  // Enhanced Chatbot functionality with subtle responses and exception handling
  function initChatbot() {
    try {
      const chatbotToggle = document.getElementById("chatbotToggle");
      const chatbotContainer = document.getElementById("chatbotContainer");
      const chatbotClose = document.getElementById("chatbotClose");
      const chatbotInput = document.getElementById("chatbotInput");
      const chatbotSend = document.getElementById("chatbotSend");
      const chatbotMessages = document.getElementById("chatbotMessages");
      const typingIndicator = document.getElementById("typingIndicator");

      if (!chatbotToggle || !chatbotContainer || !chatbotClose || !chatbotInput || !chatbotSend || !chatbotMessages) {
        console.warn("Chatbot elements not found, skipping initialization");
        return;
      }

      // Enhanced chatbot responses with more natural, subtle language
      const responses = {
        greetings: [
          "Hello! I'm here to help you learn more about Utkarsh. What would you like to know? 😊",
          "Hi there! Feel free to ask me anything about Utkarsh's background, projects, or expertise.",
          "Hey! I'm Utkarsh's AI assistant. I'd be happy to share insights about his work and experience.",
          "Welcome! I can tell you about Utkarsh's skills, projects, academic journey, or anything else you're curious about."
        ],
        skills: [
          "Utkarsh has a strong foundation in Python, Django, and AI/ML technologies. He's particularly passionate about building intelligent solutions and currently maintains a 9.3 GPA in his MCA program.",
          "His technical expertise spans full-stack development, machine learning, and AI implementation. He's especially skilled with Python frameworks and modern web technologies.",
          "Utkarsh specializes in Python development, AI/ML systems, and web technologies. His academic excellence (9.3 GPA) reflects his deep understanding of computer applications.",
          "He's proficient in Python, Django, JavaScript, AI/ML, and database management. His projects showcase a perfect blend of theoretical knowledge and practical implementation."
        ],
        projects: [
          "Utkarsh has created some fascinating projects! His AI ChatBot processes documents intelligently, and his e-commerce platform features real-time AI assistance. Both demonstrate his ability to solve real-world problems.",
          "His portfolio includes an advanced AI chatbot with document processing capabilities and a comprehensive marketplace platform. These projects highlight his skills in both AI and full-stack development.",
          "Notable projects include an intelligent document-processing chatbot and a feature-rich e-commerce platform. Each project shows his commitment to creating user-friendly, technologically advanced solutions.",
          "He's built several impressive projects, including AI-powered applications and web platforms that serve hundreds of users. His work often combines cutting-edge AI with practical business solutions."
        ],
        experience: [
          "Utkarsh brings experience from internships at KodeZera and SEMCOM College, where he's worked on production-grade AI systems and platforms serving 900+ users. He's also active in academic leadership roles.",
          "His professional journey includes developing AI chatbots with LLMs, building scalable web applications, and leading student initiatives. He's currently pursuing his MCA while gaining hands-on industry experience.",
          "He has experience in AI development, full-stack programming, and project leadership. His work ranges from optimizing query performance to developing user-friendly interfaces for large-scale applications.",
          "Utkarsh combines academic excellence with practical experience in AI/ML development and web technologies. He's worked on projects that impact hundreds of users while maintaining top academic performance."
        ],
        education: [
          "Utkarsh is currently pursuing his Master of Computer Applications (MCA) at PCCoE, Pune University, where he maintains an impressive 9.3 GPA while working on cutting-edge projects.",
          "He's studying MCA at PCCoE under Pune University with exceptional academic performance (9.3 GPA). His curriculum focuses on advanced computing concepts and practical application development.",
          "Currently in his MCA program at PCCoE, Pune University, Utkarsh excels academically (9.3 GPA) while actively participating in research and development projects.",
          "His academic journey at PCCoE, Pune University has been marked by consistent excellence, maintaining a 9.3 GPA while engaging in both theoretical studies and practical project work."
        ],
        contact: [
          "You can reach out to Utkarsh through the contact form on this website, or connect with him on LinkedIn and GitHub. He's always open to discussing new opportunities and collaborations!",
          "Feel free to use the contact section below, or find him on his professional social profiles. Utkarsh enjoys connecting with fellow developers and potential collaborators.",
          "Utkarsh is available through multiple channels - the contact form here, LinkedIn for professional networking, or GitHub to see his latest code. He welcomes meaningful conversations!",
          "You can connect with Utkarsh via the contact form, LinkedIn for professional discussions, or GitHub to explore his repositories. He's always interested in new projects and opportunities."
        ],
        achievements: [
          "Beyond his 9.3 GPA, Utkarsh serves as PMA President and is actively involved in placement preparation initiatives that have benefited 70+ students. His leadership extends beyond just technical skills.",
          "His achievements include academic excellence, successful project deployments serving hundreds of users, and leadership roles in student organizations. He's also contributed to improving placement outcomes at his college.",
          "Utkarsh has demonstrated excellence in academics, project development, and student leadership. His work has positively impacted hundreds of users and fellow students through various initiatives.",
          "He's achieved recognition for both technical projects and leadership contributions, including platforms used by 900+ students and successful bootcamp programs for peers."
        ],
        technologies: [
          "Utkarsh works with a modern tech stack including Python, Django, React, AI/ML libraries, and cloud technologies. He's always exploring new tools to build better solutions.",
          "His technology arsenal includes Python frameworks, JavaScript libraries, AI/ML tools like TensorFlow, and database systems. He chooses technologies based on project requirements and scalability needs.",
          "He's experienced with Python, Django, React, AI/ML frameworks, MySQL, and various development tools. His approach focuses on selecting the right technology for each specific challenge.",
          "Utkarsh utilizes a diverse range of technologies - from Python and Django for backend development to AI/ML libraries for intelligent features, always prioritizing user experience and performance."
        ],
        motivation: [
          "What drives Utkarsh is the intersection of technology and real-world impact. He believes in creating solutions that not only showcase technical prowess but genuinely help people and businesses.",
          "He's motivated by the challenge of solving complex problems through elegant, efficient code. Utkarsh sees programming as a tool for positive change and innovation.",
          "Utkarsh is passionate about bridging the gap between cutting-edge technology and practical applications. He finds fulfillment in projects that combine technical excellence with meaningful impact.",
          "His motivation comes from the endless possibilities in technology to solve real problems. Whether it's AI, web development, or leadership, Utkarsh approaches each challenge with curiosity and determination."
        ],
        default: [
          "That's an interesting question! While I might not have specific details on that topic, I'd encourage you to reach out to Utkarsh directly through the contact form - he loves engaging conversations.",
          "I appreciate your curiosity! For more detailed information about that, connecting with Utkarsh directly would be your best bet. He's quite responsive and enjoys discussing various topics.",
          "That's a thoughtful question! While I focus on sharing information about Utkarsh's professional background, he'd be the best person to give you insights on that particular topic.",
          "Great question! I'd recommend reaching out to Utkarsh directly for the most comprehensive answer. He's always happy to share his perspectives and experiences.",
          "I understand your interest in that topic! For the most accurate and detailed response, connecting with Utkarsh through his contact information would be ideal."
        ],
        errors: [
          "I apologize, but I seem to have encountered a small hiccup. Could you please try rephrasing your question?",
          "Something didn't quite work as expected on my end. Would you mind asking that again, perhaps in a different way?",
          "I'm having a brief moment of confusion. Could you help me by asking your question in a slightly different manner?",
          "My apologies - I seem to have missed that. Could you please try your question once more?"
        ]
      };

      let isOpen = false;
      let isTyping = false;
      let messageHistory = [];

      // Utility functions
      function getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }

      function sanitizeInput(input) {
        if (typeof input !== 'string') {
          return String(input);
        }
        
        // Only sanitize potentially dangerous HTML/script content
        // Remove script tags and dangerous attributes
        let sanitized = input
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=/gi, '');
        
        // Only escape < and > to prevent HTML injection, but keep quotes and apostrophes readable
        sanitized = sanitized
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        
        return sanitized.trim();
      }

      function sanitizeUserInput(input) {
        if (typeof input !== 'string') {
          return String(input);
        }
        
        // More strict sanitization for user input
        let sanitized = input
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=/gi, '');
        
        // Escape HTML characters for user input
        const escapeMap = {
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;',
          '"': '&quot;',
          "'": '&#x27;'
        };
        
        sanitized = sanitized.replace(/[<>&"']/g, function(match) {
          return escapeMap[match] || match;
        });
        
        return sanitized.trim();
      }

      function getRandomResponse(responseArray) {
        if (!Array.isArray(responseArray) || responseArray.length === 0) {
          return "I'm having trouble processing that right now. Could you try asking in a different way?";
        }
        return responseArray[Math.floor(Math.random() * responseArray.length)];
      }

          // Enhanced message analysis with better pattern matching and AI fallback
          async function checkAndUseAI(message) {
            const lowerMessage = message.toLowerCase().trim();
            const keywords = {
              greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'start'],
              skills: ['skill', 'technology', 'tech', 'programming', 'language', 'framework', 'development', 'coding', 'software'],
              projects: ['project', 'work', 'portfolio', 'build', 'develop', 'application', 'website', 'system'],
              experience: ['experience', 'background', 'career', 'job', 'internship', 'professional', 'workplace'],
              education: ['education', 'study', 'college', 'university', 'degree', 'academic', 'student', 'learning'],
              achievements: ['achievement', 'award', 'recognition', 'accomplishment', 'success', 'leadership', 'president'],
              technologies: ['python', 'django', 'javascript', 'react', 'ai', 'ml', 'machine learning', 'database', 'mysql'],
              motivation: ['motivation', 'inspire', 'passion', 'drive', 'goal', 'vision', 'future', 'ambition'],
              contact: ['contact', 'reach', 'connect', 'email', 'phone', 'social', 'linkedin', 'github']
            };

            // Find the best matching category
            let bestMatch = 'default';
            let maxMatches = 0;

            for (const [category, words] of Object.entries(keywords)) {
              const matches = words.filter(word => lowerMessage.includes(word)).length;
              if (matches > maxMatches) {
                maxMatches = matches;
                bestMatch = category;
              }
            }

            // Determine if we should use AI
            const shouldUseAI = bestMatch === 'default' && maxMatches === 0 && message.length > 10;
            
            return { bestMatch, shouldUseAI, maxMatches };
          }

          // Updated message analysis function
          async function analyzeMessage(message) {
            try {
              const lowerMessage = message.toLowerCase().trim();
              
              // Special cases for specific queries
              if (lowerMessage.includes('gpa') || lowerMessage.includes('grade') || lowerMessage.includes('score')) {
                return { response: getRandomResponse(responses.education), isAI: false };
              }

              if (lowerMessage.includes('help') || lowerMessage.includes('assist') || lowerMessage.includes('support')) {
                return { 
                  response: "I'm here to help! You can ask me about Utkarsh's skills, projects, education, experience, or achievements. What interests you most?", 
                  isAI: false 
                };
              }

              const { bestMatch, shouldUseAI } = await checkAndUseAI(message);

              // If no good match found and has meaningful content, try AI
              if (shouldUseAI) {
                try {
                  const aiResponse = await getAIResponse(message);
                  if (aiResponse) {
                    return { response: aiResponse, isAI: true };
                  }
                } catch (error) {
                  console.warn("AI API failed, using default response:", error);
                }
              }

              return { response: getRandomResponse(responses[bestMatch]), isAI: false };
            } catch (error) {
              console.warn("Error analyzing message:", error);
              return { response: getRandomResponse(responses.errors), isAI: false };
            }
          }

      // DeepSeek AI integration for fallback responses
      async function getAIResponse(userMessage) {
        try {
          const contextPrompt = `You are Utkarsh Rajput's AI assistant on his portfolio website. Utkarsh is a Master of Computer Applications (MCA) student at PCCoE, Pune University with a 9.3 GPA. He's skilled in Python, Django, AI/ML, and full-stack development. He has worked on projects like AI ChatBot, e-commerce platforms, and serves as PMA President.

Keep responses:
- Conversational and helpful
- Under 150 words
- Professional but friendly
- Related to Utkarsh when possible
- Encouraging users to contact him for detailed discussions

User question: "${userMessage}"

Response:`;

          const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer sk-ea8ef3b1f4a9455ea01323ceaf2b5931'
            },
            body: JSON.stringify({
              model: 'deepseek-chat',
              messages: [
                {
                  role: 'user',
                  content: contextPrompt
                }
              ],
              max_tokens: 200,
              temperature: 0.7
            })
          });

          if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
          }

          const data = await response.json();
          
          if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content.trim();
          }
          
          throw new Error('Invalid API response format');
          
        } catch (error) {
          console.warn('DeepSeek API error:', error);
          return null; // Will fall back to default responses
        }
      }

      // Enhanced message display with better UX
      function addMessage(text, sender, showTime = true, isAI = false) {
        try {
          if (!text || typeof text !== 'string') {
            console.warn("Invalid message text provided");
            return;
          }

          const messageDiv = document.createElement("div");
          messageDiv.className = `message ${sender}-message`;
          
          // Add AI indicator class if this is an AI response
          if (isAI && sender === 'bot') {
            messageDiv.classList.add('ai-powered');
          }
          
          const contentDiv = document.createElement("div");
          contentDiv.className = "message-content";
          
          // Use different sanitization based on sender
          let sanitizedText;
          if (sender === 'user') {
            // More strict sanitization for user input
            sanitizedText = sanitizeUserInput(text);
          } else {
            // Lighter sanitization for bot messages (preserve readability)
            sanitizedText = text; // Bot messages are controlled, no need for heavy sanitization
          }
          
          contentDiv.textContent = sanitizedText;
          messageDiv.appendChild(contentDiv);
          
          // Add subtle AI indicator for AI-powered responses
          if (isAI && sender === 'bot') {
            const aiIndicator = document.createElement("div");
            aiIndicator.className = "ai-indicator";
            aiIndicator.innerHTML = "✨ AI-powered";
            aiIndicator.style.cssText = `
              font-size: 0.7rem;
              color: var(--accent-color);
              opacity: 0.6;
              margin-top: 0.25rem;
              font-style: italic;
            `;
            messageDiv.appendChild(aiIndicator);
          }
          
          if (showTime) {
            const timeDiv = document.createElement("div");
            timeDiv.className = "message-time";
            timeDiv.textContent = getCurrentTime();
            messageDiv.appendChild(timeDiv);
          }
          
          // Insert before typing indicator if it exists
          if (typingIndicator && typingIndicator.parentNode === chatbotMessages) {
            chatbotMessages.insertBefore(messageDiv, typingIndicator);
          } else {
            chatbotMessages.appendChild(messageDiv);
          }
          
          // Store in message history
          messageHistory.push({ 
            text: sanitizedText, 
            sender: sender, 
            time: getCurrentTime() 
          });
          
          // Smooth scroll to bottom
          setTimeout(() => {
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
          }, 100);
          
        } catch (error) {
          console.warn("Error adding message:", error);
        }
      }

      function showTypingIndicator(isAI = false) {
        if (typingIndicator) {
          typingIndicator.classList.add("active");
          if (isAI) {
            typingIndicator.setAttribute('data-ai', 'true');
            // Add a temporary status message for AI processing
            const statusMsg = document.createElement('div');
            statusMsg.className = 'ai-status-message';
            statusMsg.textContent = 'Consulting AI for your query...';
            statusMsg.style.cssText = `
              font-size: 0.8rem;
              color: var(--accent-color);
              opacity: 0.7;
              margin-bottom: 0.5rem;
              font-style: italic;
            `;
            typingIndicator.parentNode.insertBefore(statusMsg, typingIndicator);
          }
          chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
      }

      function hideTypingIndicator() {
        if (typingIndicator) {
          typingIndicator.classList.remove("active");
          typingIndicator.removeAttribute('data-ai');
          // Remove any AI status message
          const statusMsg = chatbotMessages.querySelector('.ai-status-message');
          if (statusMsg) {
            statusMsg.remove();
          }
        }
      }

      // Enhanced send message with better error handling and AI integration
      async function sendMessage() {
        try {
          const message = chatbotInput.value ? chatbotInput.value.trim() : '';
          
          // Validate input
          if (!message || isTyping) return;

          if (message.length > 500) {
            addMessage("Please keep your message under 500 characters for better processing.", "bot");
            return;
          }

          // Check for potentially malicious input (before sanitization)
          if (message.includes('<script') || message.includes('javascript:')) {
            addMessage("I can't process that type of input. Please ask a normal question about Utkarsh.", "bot");
            chatbotInput.value = "";
            return;
          }

          // Add user message (will be sanitized in addMessage function)
          addMessage(message, "user");
          chatbotInput.value = "";
          chatbotSend.disabled = true;
          isTyping = true;
          
          showTypingIndicator();
          
          // Simulate realistic typing delay (longer for AI responses)
          const baseDelay = 1000 + message.length * 20;
          const typingDelay = Math.min(baseDelay, 4000); // Increased max delay for AI processing
          
          setTimeout(async () => {
            try {
              // Check if we'll use AI to adjust typing indicator
              const { shouldUseAI } = await checkAndUseAI(message);
              
              if (shouldUseAI) {
                showTypingIndicator(true); // Show AI processing indicator
              }
              
              const responseData = await analyzeMessage(message);
              hideTypingIndicator();
              
              // Add AI indicator if response came from AI
              if (responseData.isAI) {
                addMessage(responseData.response, "bot", true, true); // Last parameter indicates AI response
              } else {
                addMessage(responseData.response, "bot");
              }
            } catch (error) {
              console.warn("Error generating response:", error);
              hideTypingIndicator();
              addMessage(getRandomResponse(responses.errors), "bot");
            } finally {
              isTyping = false;
              chatbotSend.disabled = false;
              chatbotInput.focus();
            }
          }, typingDelay);
          
        } catch (error) {
          console.warn("Error sending message:", error);
          isTyping = false;
          chatbotSend.disabled = false;
          hideTypingIndicator();
          addMessage("Something went wrong. Please try again.", "bot");
        }
      }

      // Event listeners with error handling
      try {
        chatbotToggle.addEventListener("click", () => {
          try {
            isOpen = !isOpen;
            chatbotContainer.classList.toggle("active", isOpen);
            
            if (isOpen && chatbotMessages.children.length === 1) { // Only typing indicator
              setTimeout(() => {
                addMessage(getRandomResponse(responses.greetings), "bot");
              }, 300);
            }
            
            if (isOpen) {
              chatbotInput.focus();
            }
          } catch (error) {
            console.warn("Error toggling chatbot:", error);
          }
        });

        chatbotClose.addEventListener("click", () => {
          try {
            isOpen = false;
            chatbotContainer.classList.remove("active");
          } catch (error) {
            console.warn("Error closing chatbot:", error);
          }
        });

        chatbotSend.addEventListener("click", sendMessage);

        chatbotInput.addEventListener("keypress", (e) => {
          try {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          } catch (error) {
            console.warn("Error handling keypress:", error);
          }
        });

        // Input validation and character counter
        chatbotInput.addEventListener("input", () => {
          try {
            const value = chatbotInput.value || '';
            const length = value.length;
            
            // Disable send button based on conditions
            chatbotSend.disabled = length === 0 || length > 500 || isTyping;
            
            // Visual feedback for character limit
            if (length > 450) {
              chatbotInput.style.borderColor = length > 500 ? '#ef4444' : '#f59e0b';
            } else {
              chatbotInput.style.borderColor = '';
            }
            
          } catch (error) {
            console.warn("Error validating input:", error);
          }
        });

      } catch (error) {
        console.warn("Error setting up chatbot event listeners:", error);
      }

    } catch (error) {
      console.warn("Failed to initialize chatbot:", error);
    }
  }

  // Counter animations
  function initCounterAnimations() {
    const counters = document.querySelectorAll(".stat-number");
    
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-count"));
          const suffix = counter.getAttribute("data-suffix") || "";
          
          if (target && !counter.classList.contains("animated")) {
            counter.classList.add("animated");
            animateCounter(counter, target, suffix);
          }
        }
      });
    }, observerOptions);

    counters.forEach((counter) => {
      observer.observe(counter);
    });
  }

  function animateCounter(element, target, suffix) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  // Contact form handling
  // Keyboard navigation support
  function initKeyboardNavigation() {
    // Skip to main content link
    document.addEventListener("keydown", function(e) {
      if (e.key === "Tab" && e.shiftKey === false) {
        const skipLink = document.querySelector(".skip-link");
        if (skipLink && document.activeElement === document.body) {
          skipLink.focus();
        }
      }
    });

    // Navigation with arrow keys
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link, index) => {
      link.addEventListener("keydown", function(e) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          const nextIndex = (index + 1) % navLinks.length;
          navLinks[nextIndex].focus();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
          navLinks[prevIndex].focus();
        }
      });
    });
  }

  // Accessibility features
  function initAccessibilityFeatures() {
    // Announce dynamic content changes to screen readers
    function announceToScreenReader(message) {
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent = message;
      
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }

    // Add aria-labels to interactive elements without text
    document.querySelectorAll("button:not([aria-label])").forEach(button => {
      if (!button.textContent.trim()) {
        const icon = button.querySelector("i");
        if (icon) {
          const iconClass = icon.className;
          if (iconClass.includes("fa-moon") || iconClass.includes("fa-sun")) {
            button.setAttribute("aria-label", "Toggle dark/light theme");
          }
        }
      }
    });

    // Enhanced focus management
    document.addEventListener("keydown", function(e) {
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-navigation");
      }
    });

    document.addEventListener("mousedown", function() {
      document.body.classList.remove("keyboard-navigation");
    });
  }

  // Error handling and recovery
  function initErrorHandling() {
    // Global error handler
    window.addEventListener("error", function(e) {
      console.error("JavaScript error:", e.error);
      
      // Attempt to recover from common errors
      if (e.error && e.error.message.includes("particlesJS")) {
        console.log("Particles.js error detected, attempting to reload particles");
        setTimeout(() => {
          initParticles();
        }, 1000);
      }
    });

    // Unhandled promise rejection handler
    window.addEventListener("unhandledrejection", function(e) {
      console.error("Unhandled promise rejection:", e.reason);
      e.preventDefault(); // Prevent the default browser behavior
    });

    // Check for missing critical elements
    const criticalElements = [
      "#themeToggle",
      "#mobileMenuToggle", 
      ".nav-links",
      "#particles-js"
    ];

    criticalElements.forEach(selector => {
      if (!document.querySelector(selector)) {
        console.warn(`Critical element missing: ${selector}`);
      }
    });
  }

  // Performance optimization
  function initPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', function() {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        if (originalScrollHandler) originalScrollHandler();
      }, 16); // ~60fps
    });

    // Preload critical images
    const criticalImages = ['assets/images/profile-pic.png', 'assets/images/aichatbot.png'];
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  // Initialize performance optimizations
  initPerformanceOptimizations();
});

// ===== CLEAN LIGHTBOX IMPLEMENTATION =====

let lightboxState = null;

window.openImageLightbox = function(imageSrc, projectTitle, currentIndex, allImages) {
  console.log('Opening lightbox:', { imageSrc, projectTitle, currentIndex });
  
  // Close any existing lightbox
  closeLightbox();
  
  // Ensure we have valid image data
  const images = Array.isArray(allImages) && allImages.length > 0 ? allImages : [imageSrc];
  const safeIndex = Math.max(0, Math.min(currentIndex || 0, images.length - 1));
  const currentImage = images[safeIndex];
  
  // Create lightbox HTML
  const lightboxHTML = `
    <div class="image-lightbox active">
      <div class="lightbox-overlay"></div>
      <div class="lightbox-content">
        <div class="lightbox-header">
          <h3 class="lightbox-title">${projectTitle} - Image ${safeIndex + 1} of ${images.length}</h3>
          <button class="lightbox-close" aria-label="Close lightbox">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="lightbox-image-container">
          ${images.length > 1 ? '<button class="lightbox-nav lightbox-prev" aria-label="Previous image"><i class="fas fa-chevron-left"></i></button>' : ''}
          <img src="${currentImage}" alt="${projectTitle} screenshot" class="lightbox-image">
          ${images.length > 1 ? '<button class="lightbox-nav lightbox-next" aria-label="Next image"><i class="fas fa-chevron-right"></i></button>' : ''}
        </div>
        ${images.length > 1 ? `
          <div class="lightbox-indicators">
            ${images.map((_, index) => `
              <button class="lightbox-indicator ${index === safeIndex ? 'active' : ''}" data-index="${index}" aria-label="Go to image ${index + 1}"></button>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;
  
  // Add to DOM
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  document.body.style.overflow = 'hidden';
  
  // Store state
  lightboxState = {
    images: images,
    currentIndex: safeIndex,
    projectTitle: projectTitle
  };
  
  // Add event listeners
  setupLightboxEvents();
};

function setupLightboxEvents() {
  const lightbox = document.querySelector('.image-lightbox');
  if (!lightbox) return;
  
  // Close button
  const closeBtn = lightbox.querySelector('.lightbox-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }
  
  // Overlay click to close
  const overlay = lightbox.querySelector('.lightbox-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeLightbox);
  }
  
  // Navigation buttons
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => navigateImage(-1));
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => navigateImage(1));
  }
  
  // Indicator buttons
  const indicators = lightbox.querySelectorAll('.lightbox-indicator');
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToImage(index));
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', handleLightboxKeyboard);
}

window.closeLightbox = function() {
  const lightbox = document.querySelector('.image-lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    setTimeout(() => {
      if (lightbox.parentNode) {
        lightbox.parentNode.removeChild(lightbox);
      }
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleLightboxKeyboard);
      lightboxState = null;
    }, 300);
  }
};

window.navigateImage = function(direction) {
  if (!lightboxState) return;
  
  const { images, currentIndex } = lightboxState;
  let newIndex = currentIndex + direction;
  
  // Handle wrapping
  if (newIndex < 0) newIndex = images.length - 1;
  if (newIndex >= images.length) newIndex = 0;
  
  updateLightboxImage(newIndex);
};

window.goToImage = function(index) {
  if (!lightboxState || index < 0 || index >= lightboxState.images.length) return;
  updateLightboxImage(index);
};

function updateLightboxImage(newIndex) {
  if (!lightboxState) return;
  
  const { images, projectTitle } = lightboxState;
  const lightbox = document.querySelector('.image-lightbox');
  if (!lightbox) return;
  
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const indicators = lightbox.querySelectorAll('.lightbox-indicator');
  
  if (lightboxImage) {
    lightboxImage.style.opacity = '0';
    setTimeout(() => {
      lightboxImage.src = images[newIndex];
      lightboxImage.style.opacity = '1';
    }, 150);
  }
  
  if (lightboxTitle) {
    lightboxTitle.textContent = `${projectTitle} - Image ${newIndex + 1} of ${images.length}`;
  }
  
  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === newIndex);
  });
  
  // Update state
  lightboxState.currentIndex = newIndex;
}

function handleLightboxKeyboard(e) {
  if (!lightboxState) return;
  
  switch(e.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowLeft':
      navigateImage(-1);
      break;
    case 'ArrowRight':
      navigateImage(1);
      break;
  }
}

// Debug functions
// window.testLightbox = function() {
//   console.log('Testing lightbox...');
//   openImageLightbox('assets/images/aichatbot.png', 'Test Project', 0, ['assets/images/aichatbot.png', 'assets/images/aichatbot2.png']);
// };

// window.testShopEase = function() {
//   console.log('Testing ShopEase lightbox...');
//   const shopEaseImages = ["assets/images/shopease1.png","assets/images/shopease2.png","assets/images/shopease3.png","assets/images/shopease4.png"];
//   openImageLightbox(shopEaseImages[0], 'ShopEase', 0, shopEaseImages);
// };

// window.checkImages = function() {
//   const testImage = new Image();
//   testImage.onload = function() {
//     console.log('✅ Image assets/images/shopease1.png loaded successfully');
//   };
//   testImage.onerror = function() {
//     console.error('❌ Failed to load assets/images/shopease1.png');
//   };
//   testImage.src = 'assets/images/shopease1.png';
// };
