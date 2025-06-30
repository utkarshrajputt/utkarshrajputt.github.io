// Typing Animation Script (add before </body>)
document.addEventListener("DOMContentLoaded", function () {
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

  setTimeout(type, 1000);

  // Initialize particles.js if available
  if (typeof particlesJS !== "undefined") {
    particlesJS.load(
      "particles-js",
      "assets/particles-config.json",
      function () {
        console.log("Particles loaded");
      }
    );
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  // Check for saved theme preference or use system preference
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  html.classList.add(savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = html.classList.contains("dark") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    html.classList.remove(currentTheme);
    html.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    themeToggle.innerHTML =
      theme === "dark"
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
  }

  // Smooth scrolling for navigation links
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

  // Header scroll behavior
  let lastScroll = 0;
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("hidden");
      return;
    }

    if (currentScroll > lastScroll && !header.classList.contains("hidden")) {
      // Scroll down
      header.classList.add("hidden");
    } else if (
      currentScroll < lastScroll &&
      header.classList.contains("hidden")
    ) {
      // Scroll up
      header.classList.remove("hidden");
    }

    lastScroll = currentScroll;
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Special handling for timeline items
        if (entry.target.classList.contains("timeline")) {
          const timelineItems = document.querySelectorAll(".timeline-item");
          timelineItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("visible");
            }, index * 200);
          });
        }
      }
    });
  }, observerOptions);

  // Observe all fade-in-up elements
  document.querySelectorAll(".fade-in-up").forEach((el) => {
    observer.observe(el);
  });

  // Typing effect for hero subtitle
  const subtitles = [
    "Full Stack Developer",
    "AI Enthusiast",
    "Tech Leader",
    "Problem Solver",
  ];
  let subtitleIndex = 0;

  function typeWriter(element, text, speed = 100, callback) {
    let i = 0;
    element.innerHTML = "";
    element.style.opacity = "1";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (callback) {
        setTimeout(callback, 1500);
      }
    }
    type();
  }

  function eraseText(element, speed = 50, callback) {
    let text = element.innerHTML;
    let length = text.length;

    function erase() {
      if (length > 0) {
        element.innerHTML = text.substring(0, length - 1);
        length--;
        setTimeout(erase, speed);
      } else if (callback) {
        callback();
      }
    }
    erase();
  }

  function cycleSubtitles() {
    const subtitle = document.querySelector(".hero .subtitle");
    if (subtitle) {
      eraseText(subtitle, 50, () => {
        subtitleIndex = (subtitleIndex + 1) % subtitles.length;
        typeWriter(subtitle, subtitles[subtitleIndex], 100, cycleSubtitles);
      });
    }
  }

  // Start typing effect after hero animation
  setTimeout(() => {
    const subtitle = document.querySelector(".hero .subtitle");
    if (subtitle) {
      typeWriter(subtitle, subtitles[0], 100, cycleSubtitles);
    }
  }, 1200);

  // Add floating animation to profile image
  const profileImg = document.querySelector(".profile-img");
  if (profileImg) {
    let floating = true;
    setInterval(() => {
      if (floating) {
        profileImg.style.transform = "translateY(-10px)";
      } else {
        profileImg.style.transform = "translateY(0)";
      }
      floating = !floating;
    }, 2000);
  }

  // Project filtering
  // const filterButtons = document.querySelectorAll(".filter-btn");
  // const projectCards = document.querySelectorAll(".project-card");

  // filterButtons.forEach((button) => {
  //   button.addEventListener("click", () => {
  //     // Update active button
  //     filterButtons.forEach((btn) => btn.classList.remove("active"));
  //     button.classList.add("active");

  //     const filter = button.dataset.filter;

  //     // Filter projects
  //     projectCards.forEach((card) => {
  //       if (filter === "all" || card.dataset.category.includes(filter)) {
  //         card.style.display = "block";
  //       } else {
  //         card.style.display = "none";
  //       }
  //     });
  //   });
  // });

  // // Project modals
  // const modal = document.getElementById("projectModal");
  // const modalClose = document.querySelector(".modal-close");
  // const viewProjectButtons = document.querySelectorAll(".view-project");

  // viewProjectButtons.forEach((button) => {
  //   button.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     const projectId = button.dataset.project;
  //     const projectCard = button.closest(".project-card");

  //     // Update modal content based on project
  //     document.getElementById("modalTitle").textContent =
  //       projectCard.querySelector(".project-title").textContent;
  //     document.getElementById("modalDescription").innerHTML = `<p>${
  //       projectCard.querySelector(".project-description").textContent
  //     }</p>
  //                        <p>Additional details about this project would go here, including challenges faced,
  //                        solutions implemented, and results achieved.</p>`;

  //     // Clone tech tags
  //     const techTags = projectCard
  //       .querySelector(".project-tech")
  //       .cloneNode(true);
  //     document.getElementById("modalTech").innerHTML = "";
  //     document.getElementById("modalTech").appendChild(techTags);

  //     // Set links
  //     const links = projectCard.querySelectorAll(
  //       ".project-link:not(.view-project)"
  //     );
  //     document.getElementById("modalLiveLink").href = links[0].href;
  //     document.getElementById("modalGithubLink").href = links[1].href;

  //     // Show modal
  //     modal.classList.add("active");
  //     document.body.style.overflow = "hidden";
  //   });
  // });

  // modalClose.addEventListener("click", () => {
  //   modal.classList.remove("active");
  //   document.body.style.overflow = "auto";
  // });

  // window.addEventListener("click", (e) => {
  //   if (e.target === modal) {
  //     modal.classList.remove("active");
  //     document.body.style.overflow = "auto";
  //   }
  // });

  // Project Modals - Dynamic Content
  document.querySelectorAll(".view-project").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const projectCard = button.closest(".project-card");
      const projectId = button.dataset.project;

      // Get project data
      const title = projectCard.querySelector(".project-title").textContent;
      const subtitle =
        projectCard.querySelector(".project-subtitle").textContent;
      const description = projectCard.querySelector(
        ".project-description"
      ).textContent;
      const techTags = projectCard.querySelector(".project-tech").innerHTML;
      const links = Array.from(
        projectCard.querySelectorAll(".project-link:not(.view-project)")
      ).map((link) => link.outerHTML);

      // Custom content for each project (add your project-specific data here)
      const projectData = {
        1: {
          // AI ChatBot
          images: [
            "assets/images/aichatbot.png",
            "assets/images/aichatbot-2.png",
          ],
          features: `
          <h4><i class="fas fa-bolt"></i> Key Features</h4>
          <ul>
            <li>Document processing with LLMs (Mistral, Phi-2)</li>
            <li>FAISS vector search for context-aware responses</li>
            <li>90%+ accuracy in Q&A testing</li>
          </ul>
        `,
          challenges: `
          <h4><i class="fas fa-exclamation-triangle"></i> Challenges Solved</h4>
          <ul>
            <li>Reduced query latency by 30% with custom caching</li>
            <li>Optimized for limited hardware (GTX 1650)</li>
          </ul>
        `,
          liveDemo: "https://aichatbot-demo.example.com",
          github: "https://github.com/utkarshrajputt/rag-chatbot",
        },
        2: {
          // ShopEase
          images: [
            "assets/images/shopease-1.png",
            "assets/images/shopease-2.png",
          ],
          features: `
          <h4><i class="fas fa-shopping-cart"></i> E-commerce Features</h4>
          <ul>
            <li>Buyer/Seller dashboards</li>
            <li>AI chatbot for real-time support</li>
            <li>Payment gateway integration</li>
          </ul>
        `,
          liveDemo: "https://shopeasestore.pythonanywhere.com/",
          github: "https://github.com/utkarshrajputt/shopease",
        },
        3: {
          images: ["assets/images/neev-1.png", "assets/images/neev-2.png"],
          features: `
    <h4><i class="fas fa-users"></i> User Benefits</h4>
    <ul>
      <li>900+ student users</li>
      <li>Attendance tracking</li>
      <li>PDF/Excel report generation</li>
    </ul>
  `,
          challenges: `
    <h4><i class="fas fa-lightbulb"></i> Solutions Implemented</h4>
    <ul>
      <li>60% faster data retrieval with optimized queries</li>
      <li>Role-based access control</li>
    </ul>
  `,
          liveDemo: "http://202.129.240.162:8081/student/student_login.php",
          github: "https://github.com/utkarshrajputt/semcom_portal",
        },
        4: {
          // BlogSite
          images: [
            "assets/images/blogsite-1.png",
            "assets/images/blogsite-2.png",
          ],
          features: `
    <h4><i class="fas fa-blog"></i> Blogging Platform Features</h4>
    <ul>
      <li>Rich-text post creation and editing</li>
      <li>User & author dashboards</li>
      <li>Commenting, likes, and engagement analytics</li>
    </ul>
  `,
          challenges: `
    <h4><i class="fas fa-tools"></i> Challenges Solved</h4>
    <ul>
      <li>Implemented comment threading and moderation</li>
      <li>Responsive layout with custom pagination logic</li>
    </ul>
  `,
          liveDemo: "http://www.blogo-ut.infinityfreeapp.com/home.php?i=2",
          github: "https://github.com/utkarshrajputt/Blogo",
        },

        5: {
          // LeetCode Streak Bot
          images: [
            "assets/images/leetcode1.png",
            "assets/images/leetcode2.png",
          ],
          features: `
    <h4><i class="fas fa-robot"></i> Automation Highlights</h4>
    <ul>
      <li>Daily LeetCode streak check via GitHub Actions</li>
      <li>Telegram integration for daily motivation or roast 😂</li>
      <li>Uses GraphQL API to fetch submission history</li>
    </ul>
  `,
          challenges: `
    <h4><i class="fas fa-cogs"></i> Engineering Challenges</h4>
    <ul>
      <li>Auth and API limitations bypassed using GitHub Secrets</li>
      <li>Timezone-adjusted cron job to match Indian users</li>
    </ul>
  `,
          liveDemo: "https://t.me/utkarsh_streak_bot",
          github: "https://github.com/utkarshrajputt/leetcode-streak-checker",
        },

        // Add other projects (3, 4, etc.) following the same pattern
      };

      // Populate Modal
      const modal = document.getElementById("dynamicModal");
      modal.querySelector("#modalTitle").textContent = title;

      // Images Section
      const imagesContainer = modal.querySelector("#modalImages");
      imagesContainer.innerHTML = projectData[projectId].images
        .map(
          (img) => `
      <div class="modal-image">
        <img src="${img}" alt="${title} Screenshot">
      </div>
    `
        )
        .join("");

      // Description Section
      modal.querySelector("#modalDescription").innerHTML = `
      <p class="project-subtitle">${subtitle}</p>
      <p>${description}</p>
      ${projectData[projectId].features || ""}
      ${projectData[projectId].challenges || ""}
    `;

      // Tech Tags
      modal.querySelector("#modalTech").innerHTML = techTags;

      // Links
      const liveDemo = projectData[projectId].liveDemo;
      const github = projectData[projectId].github;
      modal.querySelector("#modalLinks").innerHTML = `
        ${
          liveDemo
            ? `<a href="${liveDemo}" class="btn btn-primary" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>`
            : ""
        }
        ${
          github
            ? `<a href="${github}" class="btn btn-secondary" target="_blank"><i class="fab fa-github"></i> GitHub</a>`
            : ""
        }
      `;

      // Show Modal
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close Modal
  document.querySelectorAll(".modal-close").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".modal.active").classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Close when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Chatbot functionality
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotContainer = document.getElementById("chatbotContainer");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatbotMessages = document.getElementById("chatbotMessages");
  const chatbotInput = document.getElementById("chatbotInput");
  const chatbotSend = document.getElementById("chatbotSend");

  chatbotToggle.addEventListener("click", () => {
    chatbotContainer.classList.toggle("active");
  });

  chatbotClose.addEventListener("click", () => {
    chatbotContainer.classList.remove("active");
  });

  function addBotMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message bot-message";
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function addUserMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message user-message";
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function handleUserInput() {
    const userMessage = chatbotInput.value.trim();
    if (userMessage) {
      addUserMessage(userMessage);
      chatbotInput.value = "";
      showTyping();
      setTimeout(() => {
        hideTyping();
        const msg = userMessage.toLowerCase();

        // Greetings
        if (msg.includes("hello") || msg.includes("hi")) {
          addBotMessage("Hello! How can I help you today?");
        }
        // Project-related queries
        else if (msg.includes("project") || msg.includes("work")) {
          addBotMessage(
            `You can view my projects in the Projects section. Here are a few highlights:\n• AI ChatBot An intelligent document-processing chatbot using LLMs and vector search.\n• ShopEase A full-stack e-commerce platform with an AI-based support chatbot.\n• NEEV Portal A student profiling and management system.\nLet me know if you want details about a specific project!`
          );
        }
        // Specific project names
        else if (msg.includes("ai chatbot")) {
          addBotMessage(
            "The AI ChatBot project processes uploaded files and answers questions using advanced AI models. It achieved over 90% accuracy in internal tests. Want to know more?"
          );
        } else if (msg.includes("shopease")) {
          addBotMessage(
            "ShopEase is a robust e-commerce platform with real-time AI chatbot support for users. It connects buyers and sellers seamlessly. Interested in its tech stack?"
          );
        } else if (msg.includes("neev")) {
          addBotMessage(
            "The NEEV Portal is a student profiling system designed to streamline academic and extracurricular tracking. Would you like more details?"
          );
        }
        // Contact
        else if (msg.includes("contact") || msg.includes("email")) {
          addBotMessage(
            "You can reach me via email at utkarshrajput1583@gmail.com or through the contact form in the Contact section."
          );
        }
        // Experience
        else if (msg.includes("experience") || msg.includes("work history")) {
          addBotMessage(
            "I have experience as a Trainee Data Science Engineer at KodeZera and as a Backend Developer Intern at SEMCOM. Check the Experience section for more!"
          );
        }
        // Skills
        else if (msg.includes("skills") || msg.includes("tech stack")) {
          addBotMessage(
            "My core skills include Python, Django, JavaScript, AI/ML, and full-stack web development. I also work with LLMs, vector search, and modern frontend frameworks."
          );
        }
        // Resume
        else if (msg.includes("resume") || msg.includes("cv")) {
          addBotMessage(
            "You can download my latest resume from the Resume section."
          );
        }
        // Blog
        else if (msg.includes("blog") || msg.includes("article")) {
          addBotMessage(
            "Check out my Blog section for articles on Django performance, balancing academics and projects, and more tech topics!"
          );
        }
        // Location
        else if (msg.includes("location") || msg.includes("where are you")) {
          addBotMessage(
            "I'm based in Pune, India. Always open to remote and hybrid opportunities!"
          );
        }
        // Subtle error/fallback
        else {
          addBotMessage(
            "I'm still learning! If I couldn't answer your question, please try rephrasing or reach out via email for more details."
          );
        }
      }, 900);
    }
  }

  function showTyping() {
  const typingDiv = document.createElement("div");
  typingDiv.className = "message bot-typing";
  typingDiv.textContent = "Typing...";
  typingDiv.id = "typing-indicator";
  chatbotMessages.appendChild(typingDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function hideTyping() {
  const typingDiv = document.getElementById("typing-indicator");
  if (typingDiv) typingDiv.remove();
}


  chatbotSend.addEventListener("click", handleUserInput);
  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleUserInput();
    }
  });

  // Initialize particles.js
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }

  // Enhanced Stats Animation
  function animateStats() {
    const statCards = document.querySelectorAll(".stat-card");

    statCards.forEach((card) => {
      const target = parseFloat(card.getAttribute("data-value"));
      const suffix = card.getAttribute("data-suffix") || "";
      const statNumber = card.querySelector(".stat-number");
      const duration = 2000;
      const start = 0;

      let current = start;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          current = target;
        }

        // Handle decimal values
        const displayValue = Number.isInteger(target)
          ? Math.floor(current)
          : current.toFixed(1);

        statNumber.textContent = displayValue + suffix;
      }, 16);
    });
  }

  // Intersection Observer for animation trigger
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          aboutObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  aboutObserver.observe(document.querySelector("#about"));

  // Add dynamic greeting based on time
  function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = "";

    if (hour < 12) greeting = "Good morning! ☀️";
    else if (hour < 17) greeting = "Good afternoon! 🌤️";
    else greeting = "Good evening! 🌙";

    const heroDescription = document.querySelector(".hero .description");
    if (heroDescription) {
      heroDescription.innerHTML = greeting + " " + heroDescription.innerHTML;
    }
  }

  // Initialize greeting
  updateGreeting();
});
