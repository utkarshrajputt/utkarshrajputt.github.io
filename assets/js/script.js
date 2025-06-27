
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
          const currentTheme = html.classList.contains("dark")
            ? "dark"
            : "light";
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

          if (
            currentScroll > lastScroll &&
            !header.classList.contains("hidden")
          ) {
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
                const timelineItems =
                  document.querySelectorAll(".timeline-item");
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
              typeWriter(
                subtitle,
                subtitles[subtitleIndex],
                100,
                cycleSubtitles
              );
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
        const filterButtons = document.querySelectorAll(".filter-btn");
        const projectCards = document.querySelectorAll(".project-card");

        filterButtons.forEach((button) => {
          button.addEventListener("click", () => {
            // Update active button
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.dataset.filter;

            // Filter projects
            projectCards.forEach((card) => {
              if (filter === "all" || card.dataset.category.includes(filter)) {
                card.style.display = "block";
              } else {
                card.style.display = "none";
              }
            });
          });
        });

        // Project modals
        const modal = document.getElementById("projectModal");
        const modalClose = document.querySelector(".modal-close");
        const viewProjectButtons = document.querySelectorAll(".view-project");

        viewProjectButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
            e.preventDefault();
            const projectId = button.dataset.project;
            const projectCard = button.closest(".project-card");

            // Update modal content based on project
            document.getElementById("modalTitle").textContent =
              projectCard.querySelector(".project-title").textContent;
            document.getElementById("modalDescription").innerHTML = `<p>${
              projectCard.querySelector(".project-description").textContent
            }</p>
                         <p>Additional details about this project would go here, including challenges faced, 
                         solutions implemented, and results achieved.</p>`;

            // Clone tech tags
            const techTags = projectCard
              .querySelector(".project-tech")
              .cloneNode(true);
            document.getElementById("modalTech").innerHTML = "";
            document.getElementById("modalTech").appendChild(techTags);

            // Set links
            const links = projectCard.querySelectorAll(
              ".project-link:not(.view-project)"
            );
            document.getElementById("modalLiveLink").href = links[0].href;
            document.getElementById("modalGithubLink").href = links[1].href;

            // Show modal
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
          });
        });

        modalClose.addEventListener("click", () => {
          modal.classList.remove("active");
          document.body.style.overflow = "auto";
        });

        window.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.classList.remove("active");
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

            // Simple bot responses
            setTimeout(() => {
              if (
                userMessage.toLowerCase().includes("hello") ||
                userMessage.toLowerCase().includes("hi")
              ) {
                addBotMessage("Hello! How can I help you today?");
              } else if (userMessage.toLowerCase().includes("project")) {
                addBotMessage(
                  "You can view my projects in the Projects section. I've worked on AI chatbots, e-commerce platforms, and student management systems."
                );
              } else if (userMessage.toLowerCase().includes("contact")) {
                addBotMessage(
                  "You can reach me via email at utkarshrajput1583@gmail.com or through the contact form in the Contact section."
                );
              } else if (userMessage.toLowerCase().includes("experience")) {
                addBotMessage(
                  "I have experience as a Trainee Data Science Engineer at KodeZera, and previously as a Backend Developer Intern at SEMCOM. Check the Experience section for details."
                );
              } else {
                addBotMessage(
                  "I'm a simple chatbot. For more complex questions, please contact me directly via email."
                );
              }
            }, 500);
          }
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

        // Animate stats when they come into view
        function animateStats() {
          const statNumbers = document.querySelectorAll(".stat-number");
          const statObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const target = entry.target;
                  const finalValue = target.textContent;
                  animateValue(target, 0, parseFloat(finalValue) || 0, 2000);
                  statObserver.unobserve(target);
                }
              });
            },
            { threshold: 0.5 }
          );

          statNumbers.forEach((stat) => statObserver.observe(stat));
        }

        function animateValue(element, start, end, duration) {
          const startTime = performance.now();
          const isDecimal = end.toString().includes(".");

          function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const current = start + (end - start) * progress;
            element.textContent = isDecimal
              ? current.toFixed(1)
              : Math.floor(current);

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              element.textContent =
                end +
                (element.textContent.includes("+") ? "+" : "") +
                (element.textContent.includes("%") ? "%" : "");
            }
          }

          requestAnimationFrame(update);
        }

        // Initialize stats animation
        animateStats();

        // Add dynamic greeting based on time
        function updateGreeting() {
          const hour = new Date().getHours();
          let greeting = "";

          if (hour < 12) greeting = "Good morning! ☀️";
          else if (hour < 17) greeting = "Good afternoon! 🌤️";
          else greeting = "Good evening! 🌙";

          const heroDescription = document.querySelector(".hero .description");
          if (heroDescription) {
            heroDescription.innerHTML =
              greeting + " " + heroDescription.innerHTML;
          }
        }

        // Initialize greeting
        updateGreeting();
      });
