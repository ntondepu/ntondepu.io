// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.bindEvents();
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    toggleTheme() {
        this.setTheme(this.theme === 'light' ? 'dark' : 'light');
    }

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Navigation Manager
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
        this.setActiveLink();
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
                this.setActiveLink(link);
            });
        });

        // Handle scroll for navbar transparency
        window.addEventListener('scroll', () => this.handleScroll());

        // Update active link on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                this.navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            }
        } else {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                this.navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            }
        }
    }

    setActiveLink(activeLink = null) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }
}

// Project Manager
class ProjectManager {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: "AIInfraLens - ML Observability Platform",
                description: "A comprehensive ML observability platform that transforms black-box inference pipelines into fully transparent and monitorable services. Empowers ML and DevOps teams to visualize entire pipelines from data ingestion to API response, detect bottlenecks in real-time, and monitor model behavior across environments. Features drag-and-drop dashboard, real-time latency graphs and heatmaps, dynamic environment configs, distributed tracing with OpenTelemetry + Prometheus metrics, and enterprise security with JWT/CORS/TLS. Successfully achieved <20ms latency under production loads while maintaining full observability without exposing secrets.",
                tech: ["React.js", "FastAPI", "Python 3.13", "PyTorch", "OpenTelemetry", "Prometheus", "Grafana", "Redis", "PostgreSQL", "Docker", "Kubernetes", "JWT", "CORS", "TLS"],
                image: "assets/aiinfralens.png",
                github: "https://github.com/ntondepu/aiinfralens",
                demo: null,
                category: "ai"
            },
            {
                id: 2,
                title: "Quantum Circuit Visualizer",
                description: "The Quantum Circuit Visualizer is an interactive educational tool that simplifies quantum computing by enabling users to design, simulate, and visualize quantum circuits in real time. It features drag-and-drop circuit design, real-time Bloch sphere animations, and hardware vs. simulator comparisons for hands-on learning. UPCOMING UPDATES: Enhanced UI with more quantum gates (T, CNOT, CZ), advanced optimizations, and industry-leading features including interactive 3D Bloch spheres with WebGL rendering, IBM Quantum hardware integration capabilities, step-by-step circuit animation system, and advanced noise modeling for realistic simulation.",
                tech: ["JavaScript", "React", "Three.js", "Flask", "Qiskit", "WebGL", "IBM Quantum"],
                image: null,
                github: "https://github.com/ntondepu/qiskitVisualizer",
                demo: null,
                category: "quantum"
            },
            {
                id: 3,
                title: "AgentML - AutoML Distributed Platform",
                description: "A comprehensive, enterprise-grade platform that combines Machine Learning automation, distributed systems simulation, and AI-powered chatbot interfaces into a unified system. Features automated ML pipeline with MLflow integration, Raft consensus algorithm implementation for distributed systems simulation, FAISS-powered semantic search chatbot with Slack integration, and comprehensive monitoring with OpenTelemetry, Prometheus, and Grafana. The platform provides end-to-end ML pipeline automation with advanced monitoring, telemetry, and scalable deployment capabilities including RESTful APIs, background task processing, real-time consensus visualization, and voice-controlled operations.",
                tech: ["FastAPI", "MLflow", "FAISS", "OpenTelemetry", "Prometheus", "Grafana", "Docker", "Kubernetes", "Redis", "OpenAI API", "Transformers", "LangChain"],
                image: null,
                github: "https://github.com/ntondepu/AgentML",
                demo: null,
                category: "ai"
            },
            {
                id: 4,
                title: "LearnAware AI - Green Educational AI",
                description: "A revolutionary AI tutoring system that combats the decline in student learning caused by generative AI while drastically reducing environmental impact. Uses Socratic dialogue methodology with fine-tuned T5-small model (60M parameters) achieving 99.99% lower CO2 emissions than GPT-4 equivalent usage. Features include Socratic questioning engine that never provides direct answers initially, behavioral detection system tracking quick-answer habits, real-time CO2 emission tracking, and recall booster for long-term retention. Pilot testing showed 87% higher understanding, 93% better retention after 72 hours, and 100% student preference over passive answer bots. Represents responsible AI that makes students smarter while preserving the planet.",
                tech: ["T5-small", "Streamlit", "Flask", "CodeCarbon", "Transformers", "Socratic AI", "Green Computing"],
                image: null,
                github: "https://github.com/ntondepu/LearnAware",
                demo: null,
                category: "ai"
            },
            {
                id: 5,
                title: "MedAI Navigator (catapult)",
                description: "A secure, AI-driven health assistant that revolutionizes medical document understanding by translating complex medical reports, symptoms, and prescriptions into plain English without jargon or panic. Features privacy-first architecture running entirely client-side, OCR for scanning physical documents, multilingual support with Spanish translation, text-to-speech for accessibility, and intelligent question generation for doctor visits. Empowers patients to understand their health information and ask informed questions during medical consultations.",
                tech: ["JavaScript", "OCR", "NLP", "Text-to-Speech", "PDF Processing", "Client-side AI", "Multilingual Support"],
                image: null,
                github: "https://github.com/ntondepu/catapult",
                demo: null,
                category: "ai"
            },
            {
                id: 6,
                title: "Tree Lafayette Dashboard",
                description: "A comprehensive data visualization platform supporting Tree Lafayette's mission of maintaining a healthy urban tree canopy through data-driven insights. Features real-time analysis of tree survival rates, planting trends, and site-level statistics with interactive charts and maps. Implements modular data pipelines for CSV/XLSX uploads, correlation analysis tools, and automated reporting. Enables environmental researchers and city planners to track urban forestry progress, identify optimal planting locations, and measure the impact of conservation efforts across different neighborhoods and seasons.",
                tech: ["Python", "Streamlit", "Plotly", "Data Visualization", "Pandas", "Geospatial Analysis", "Environmental Data"],
                image: null,
                github: "https://github.com/ntondepu/treeLafayette",
                demo: null,
                category: "web"
            },
            {
                id: 7,
                title: "Social Media Application",
                description: "A full-featured Java-based social media platform with enterprise-level security and real-time communication capabilities. Built with multithreaded server architecture to handle concurrent users, secure authentication using hashed and salted passwords, real-time messaging system, friend management with privacy controls, group chat functionality, and intuitive GUI client interface. Implemented advanced features including message encryption, user status tracking, file sharing capabilities, and robust error handling. Demonstrates proficiency in network programming, concurrent systems design, and secure application development.",
                tech: ["Java", "Multithreading", "GUI", "Database", "Security", "Network Programming", "Encryption", "Real-time Systems"],
                image: null,
                github: null,
                demo: null,
                category: "web"
            }
        ];
        
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        // Small delay to ensure DOM is fully rendered
        setTimeout(() => {
            this.renderProjects();
            this.bindFilterEvents();
        }, 100);
    }

    renderProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) {
            console.error('Projects grid not found');
            return;
        }

        const filteredProjects = this.currentFilter === 'all' 
            ? this.projects 
            : this.projects.filter(project => project.category === this.currentFilter);

        console.log(`Rendering ${filteredProjects.length} projects for filter: ${this.currentFilter}`);

        // Clear existing cards
        projectsGrid.innerHTML = '';
        
        // Add filtered projects
        filteredProjects.forEach(project => {
            const cardElement = document.createElement('div');
            cardElement.innerHTML = this.createProjectCard(project);
            projectsGrid.appendChild(cardElement.firstElementChild);
        });
        
        // Add animation with a slight delay
        requestAnimationFrame(() => {
            document.querySelectorAll('.project-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        });
    }

    createProjectCard(project) {
        const githubButton = project.github 
            ? `<a href="${project.github}" class="btn btn-small btn-secondary" target="_blank">
                 <i class="fab fa-github"></i> GitHub
               </a>`
            : '<span class="btn btn-small btn-disabled">Private Repo</span>';

        const demoButton = project.demo 
            ? `<a href="${project.demo}" class="btn btn-small" target="_blank">
                 <i class="fas fa-external-link-alt"></i> Live Demo
               </a>`
            : '';

        return `
            <div class="project-card" data-category="${project.category}">
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${githubButton}
                        ${demoButton}
                    </div>
                </div>
            </div>
        `;
    }

    bindFilterEvents() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update current filter and render projects
                this.currentFilter = button.getAttribute('data-filter');
                this.renderProjects();
            });
        });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupScrollToTop();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.about-content, .research-item, .timeline-item, .contact-content');
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    setupScrollToTop() {
        // Create scroll to top button
        const scrollButton = document.createElement('button');
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollButton);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        });

        // Scroll to top functionality
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Contact Form Manager
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        try {
            const formData = new FormData(this.form);
            
            // Simulate form submission (replace with actual form handler)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.form.reset();
            
        } catch (error) {
            // Show error message
            this.showMessage('Failed to send message. Please try again or contact me directly.', 'error');
        } finally {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.cssText = `
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 8px;
            font-weight: 500;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            animation: slideIn 0.3s ease-out;
        `;

        this.form.appendChild(messageDiv);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Smooth Scrolling Manager
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        // Handle smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70; // Account for navbar height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Performance Manager
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalAssets();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalAssets() {
        // Preload critical images
        const criticalImages = [
            'assets/profile.jpg',
            'assets/qiskit-demo.png'
        ];

        criticalImages.forEach(imageSrc => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = imageSrc;
            document.head.appendChild(link);
        });
    }
}

// Analytics Manager (Optional)
class AnalyticsManager {
    constructor() {
        this.init();
    }

    init() {
        this.trackPageView();
        this.trackUserInteractions();
    }

    trackPageView() {
        // Track page views (replace with your analytics service)
        console.log('Page view tracked');
    }

    trackUserInteractions() {
        // Track button clicks
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = e.target.textContent.trim();
                console.log(`Button clicked: ${buttonText}`);
            });
        });

        // Track project views
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const projectTitle = card.querySelector('.project-title').textContent;
                console.log(`Project viewed: ${projectTitle}`);
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing portfolio...');
    
    // Initialize all managers
    try {
        new ThemeManager();
        console.log('ThemeManager initialized');
        
        new NavigationManager();
        console.log('NavigationManager initialized');
        
        new ProjectManager();
        console.log('ProjectManager initialized');
        
        new AnimationManager();
        console.log('AnimationManager initialized');
        
        new ContactFormManager();
        console.log('ContactFormManager initialized');
        
        new SmoothScrollManager();
        console.log('SmoothScrollManager initialized');
        
        new PerformanceManager();
        console.log('PerformanceManager initialized');
        
        console.log('Portfolio website initialized successfully!');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
});

// Handle page load performance
window.addEventListener('load', () => {
    // Hide loading screen if present
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
    
    // Trigger any post-load animations
    document.body.classList.add('loaded');
});

// Handle errors gracefully
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // Optionally report to error tracking service
});

// Export classes for testing or external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        NavigationManager,
        ProjectManager,
        AnimationManager,
        ContactFormManager,
        SmoothScrollManager,
        PerformanceManager,
        AnalyticsManager
    };
}
