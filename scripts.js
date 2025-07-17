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
        } else {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
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
                description: "A production-grade ML observability platform that transforms opaque inference pipelines into fully transparent, monitorable systems. Built to solve the critical challenge of debugging ML systems in production, where traditional monitoring falls short. The platform features a sophisticated drag-and-drop dashboard for visualizing pipeline stages, real-time performance analytics with sub-20ms latency tracking, intelligent bottleneck detection algorithms, and comprehensive distributed tracing using OpenTelemetry. Advanced features include priority-based configuration management, dynamic environment adaptation without hardcoded values, enterprise-grade security with JWT/CORS/TLS encryption, and seamless integration with Prometheus metrics and Grafana dashboards. Successfully deployed across dev, staging, and production environments with auto-scaling capabilities and zero-downtime updates. The system maintains full observability without exposing sensitive data, implements smart alerting with noise reduction, and provides actionable insights for ML pipeline optimization.",
                tech: ["React.js", "FastAPI", "Python 3.13", "PyTorch", "OpenTelemetry", "Prometheus", "Grafana", "Redis", "PostgreSQL", "Docker", "Kubernetes", "JWT", "CORS", "TLS"],
                image: "assets/aiinfralens.png",
                github: "https://github.com/ntondepu/aiinfralens",
                demo: null,
                category: "ai"
            },
            {
                id: 2,
                title: "Quantum Circuit Visualizer",
                description: "An advanced educational platform that revolutionizes quantum computing learning through immersive 3D visualization and real-time simulation capabilities. Built with cutting-edge WebGL rendering for smooth 3D Bloch sphere animations, the platform provides an intuitive drag-and-drop interface for designing complex quantum circuits with support for essential gates including Hadamard, Pauli-X/Y/Z, CNOT, Controlled-Z, T-gates, and phase gates. Features real-time quantum state visualization with animated Bloch sphere representations, step-by-step circuit execution with detailed state evolution tracking, hardware vs. simulator comparison tools for educational insights, and advanced noise modeling for realistic quantum environment simulation. UPCOMING UPDATES include enhanced UI with additional quantum gates, IBM Quantum hardware integration for real device testing, improved animation systems with customizable playback speeds, and sophisticated noise models that accurately represent NISQ device limitations. The platform bridges the gap between theoretical quantum mechanics and practical quantum programming, making complex concepts accessible through interactive visualization.",
                tech: ["JavaScript", "React", "Three.js", "WebGL", "Flask", "Qiskit", "IBM Quantum", "GLSL Shaders", "WebWorkers"],
                image: null,
                github: "https://github.com/ntondepu/qiskitVisualizer",
                demo: null,
                category: "quantum"
            },
            {
                id: 3,
                title: "AgentML - AutoML Distributed Platform [In Progress]",
                description: "An enterprise-grade platform that unifies Machine Learning automation, distributed systems research, and AI-powered operational interfaces into a cohesive ecosystem. The ML Pipeline component provides comprehensive automation including intelligent data preprocessing with anomaly detection, hyperparameter optimization using Bayesian methods, automated model selection and ensemble techniques, MLflow-powered experiment tracking with advanced model versioning, and production deployment with A/B testing frameworks. The Distributed Systems simulation implements a complete Raft consensus algorithm with dynamic cluster membership, fault injection capabilities for testing network partitions and node failures, real-time consensus state visualization, and performance benchmarking tools. The AI Chatbot interface leverages FAISS vector databases for semantic search, provides natural language control of ML operations, integrates with Slack for enterprise communication, and implements RAG (Retrieval-Augmented Generation) for intelligent query processing. Comprehensive monitoring includes OpenTelemetry distributed tracing, custom Prometheus metrics, Grafana dashboards with automated alerting, and performance analytics for optimization insights.",
                tech: ["FastAPI", "MLflow", "FAISS", "OpenTelemetry", "Prometheus", "Grafana", "Docker", "Kubernetes", "Redis", "OpenAI API", "Transformers", "LangChain", "Bayesian Optimization"],
                image: null,
                github: null,
                demo: null,
                category: "ai"
            },
            {
                id: 4,
                title: "LearnAware AI - Green Educational AI [In Progress]",
                description: "A groundbreaking AI tutoring system that addresses the educational crisis caused by generative AI dependency while pioneering sustainable computing practices. Built on research from MIT, Stanford, and UNESCO showing 28% decreased retention when students use AI shortcuts, LearnAware implements a sophisticated Socratic dialogue engine using a fine-tuned T5-small model (60M parameters) that achieves 99.99% lower CO2 emissions than GPT-4 equivalent usage. The system employs advanced behavioral detection algorithms to identify quick-answer seeking patterns, provides intelligent nudging to encourage deeper thinking, implements spaced repetition with recall boosters for long-term retention, and features real-time carbon emission tracking with CodeCarbon integration. The platform includes motivational frameworks based on educational psychology, personalized learning paths that adapt to individual thinking patterns, multilingual support for global accessibility, and comprehensive analytics tracking learning progress without compromising privacy. Pilot studies with 15 students demonstrated 87% higher conceptual understanding, 93% better retention after 72 hours, and 100% preference over traditional AI tools, proving that responsible AI can enhance rather than replace human learning.",
                tech: ["T5-small", "Streamlit", "Flask", "CodeCarbon", "Transformers", "Socratic AI", "Green Computing", "Educational Psychology", "Spaced Repetition"],
                image: null,
                github: null,
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
        
        // Bind read more events
        this.bindReadMoreEvents();
        
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

        // Truncate description for initial display
        const maxLength = 200;
        const truncatedDescription = project.description.length > maxLength 
            ? project.description.substring(0, maxLength) + '...'
            : project.description;
        
        const needsReadMore = project.description.length > maxLength;
        const readMoreButton = needsReadMore 
            ? `<button class="read-more-btn" data-project-id="${project.id}">Read More</button>`
            : '';

        return `
            <div class="project-card" data-category="${project.category}" data-project-id="${project.id}">
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-description-container">
                        <p class="project-description">
                            <span class="description-text">${truncatedDescription}</span>
                        </p>
                        ${readMoreButton}
                    </div>
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

    bindReadMoreEvents() {
        document.querySelectorAll('.read-more-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const projectId = parseInt(e.target.getAttribute('data-project-id'));
                const project = this.projects.find(p => p.id === projectId);
                const descriptionText = e.target.parentElement.querySelector('.description-text');
                const isExpanded = e.target.textContent === 'Read Less';
                
                if (isExpanded) {
                    // Collapse
                    const maxLength = 200;
                    const truncatedDescription = project.description.length > maxLength 
                        ? project.description.substring(0, maxLength) + '...'
                        : project.description;
                    descriptionText.textContent = truncatedDescription;
                    e.target.textContent = 'Read More';
                } else {
                    // Expand
                    descriptionText.textContent = project.description;
                    e.target.textContent = 'Read Less';
                }
            });
        });
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

// Mobile Experience Manager
class MobileExperienceManager {
    constructor() {
        this.isTouchDevice = this.detectTouchDevice();
        this.init();
    }

    init() {
        if (this.isTouchDevice) {
            document.body.classList.add('touch-device');
        }
        
        this.optimizeForMobile();
        this.handleOrientationChange();
        this.improveTouchInteractions();
    }

    detectTouchDevice() {
        return 'ontouchstart' in window || 
               navigator.maxTouchPoints > 0 || 
               navigator.msMaxTouchPoints > 0;
    }

    optimizeForMobile() {
        // Prevent zoom on double tap for better UX
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        // Optimize scrolling performance
        document.addEventListener('touchstart', () => {}, {passive: true});
        document.addEventListener('touchmove', () => {}, {passive: true});
    }

    handleOrientationChange() {
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                // Trigger reflow to fix iOS viewport issues
                window.scrollTo(0, window.scrollY);
            }, 100);
        });
    }

    improveTouchInteractions() {
        // Add touch feedback for buttons
        document.querySelectorAll('.btn, .nav-link, .filter-btn').forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.opacity = '0.7';
            }, {passive: true});
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.opacity = '';
                }, 150);
            }, {passive: true});
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing portfolio...');
    
    // Initialize all managers
    try {
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
        
        new MobileExperienceManager();
        console.log('MobileExperienceManager initialized');
        
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
        NavigationManager,
        ProjectManager,
        AnimationManager,
        ContactFormManager,
        SmoothScrollManager,
        PerformanceManager,
        AnalyticsManager,
        MobileExperienceManager
    };
}
