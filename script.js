// Custom JavaScript for TechBlog

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initSmoothScrolling();
    initNewsletterSubscription();
    initLoadMorePosts();
    initCardAnimations();
    initNavbarScrollEffect();
    initTooltips();
    
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(clickedLink) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    clickedLink.classList.add('active');
}

// Newsletter subscription functionality
function initNewsletterSubscription() {
    const subscribeBtn = document.getElementById('subscribeBtn');
    const emailInput = document.getElementById('emailInput');
    
    subscribeBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            // Show loading state
            showLoadingState(subscribeBtn);
            
            // Simulate API call
            setTimeout(() => {
                showSuccessMessage('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
                resetButtonState(subscribeBtn, 'Subscribe');
            }, 1500);
        } else {
            showErrorMessage('Please enter a valid email address.');
            emailInput.focus();
        }
    });
    
    // Allow subscription with Enter key
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            subscribeBtn.click();
        }
    });
}

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Load more posts functionality
function initLoadMorePosts() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let postsLoaded = 6;
    
    loadMoreBtn.addEventListener('click', function() {
        // Show loading state
        showLoadingState(loadMoreBtn);
        
        // Simulate API call to load more posts
        setTimeout(() => {
            loadMorePosts(postsLoaded);
            postsLoaded += 3;
            resetButtonState(loadMoreBtn, 'Load More Posts');
            
            // Hide button after loading 12 posts
            if (postsLoaded >= 12) {
                loadMoreBtn.style.display = 'none';
                showInfoMessage('All posts loaded!');
            }
        }, 2000);
    });
}

// Load more posts function
function loadMorePosts(startIndex) {
    const blogContainer = document.querySelector('#blog-posts .row.g-4');
    const newPosts = generateNewPosts(3, startIndex);
    
    newPosts.forEach(post => {
        blogContainer.appendChild(post);
        
        // Animate new post
        setTimeout(() => {
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Generate new blog posts
function generateNewPosts(count, startIndex) {
    const posts = [];
    const postData = [
        {
            title: 'Advanced React Patterns: Higher-Order Components',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
            author: 'Alex Johnson',
            date: 'February 28, 2024',
            description: 'Deep dive into advanced React patterns including Higher-Order Components, Render Props, and Compound Components.',
            tags: ['React', 'Advanced'],
            category: 'Frontend'
        },
        {
            title: 'Database Optimization: Indexing Strategies',
            image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=200&fit=crop',
            author: 'Maria Garcia',
            date: 'February 25, 2024',
            description: 'Learn effective database indexing strategies to improve query performance and optimize your database operations.',
            tags: ['Database', 'Performance'],
            category: 'Backend'
        },
        {
            title: 'Machine Learning with TensorFlow.js',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
            author: 'Robert Kim',
            date: 'February 22, 2024',
            description: 'Build and deploy machine learning models in the browser using TensorFlow.js. Complete guide with examples.',
            tags: ['ML', 'JavaScript'],
            category: 'AI/ML'
        }
    ];
    
    for (let i = 0; i < count && i < postData.length; i++) {
        const post = postData[i];
        const postElement = createPostElement(post);
        
        // Initial state for animation
        postElement.style.opacity = '0';
        postElement.style.transform = 'translateY(20px)';
        postElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        posts.push(postElement);
    }
    
    return posts;
}

// Create post element
function createPostElement(post) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6';
    
    col.innerHTML = `
        <div class="card h-100 shadow-sm">
            <img src="${post.image}" class="card-img-top" alt="${post.title}">
            <div class="card-body d-flex flex-column">
                <div class="blog-meta mb-2">
                    <i class="bi bi-calendar3"></i> ${post.date}
                    <span class="ms-3"><i class="bi bi-person"></i> ${post.author}</span>
                </div>
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text flex-grow-1">${post.description}</p>
                <div class="mt-auto">
                    ${post.tags.map(tag => `<span class="badge bg-primary me-2">${tag}</span>`).join('')}
                    <span class="badge bg-secondary">${post.category}</span>
                </div>
                <a href="#" class="btn btn-outline-primary mt-3">Read More</a>
            </div>
        </div>
    `;
    
    return col;
}

// Initialize card animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.card');
    
    // Add hover effect enhancement
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize navbar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add background opacity based on scroll
        if (scrollTop > 50) {
            navbar.style.backgroundColor = 'rgba(52, 58, 64, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'rgba(52, 58, 64, 1)';
            navbar.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add smooth transition to navbar
    navbar.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
}

// Initialize tooltips
function initTooltips() {
    // Add tooltips to social icons
    const socialIcons = document.querySelectorAll('.social-icons a');
    
    socialIcons.forEach(icon => {
        const iconClass = icon.querySelector('i').className;
        let tooltipText = '';
        
        if (iconClass.includes('facebook')) tooltipText = 'Follow us on Facebook';
        else if (iconClass.includes('twitter')) tooltipText = 'Follow us on Twitter';
        else if (iconClass.includes('linkedin')) tooltipText = 'Connect on LinkedIn';
        else if (iconClass.includes('github')) tooltipText = 'Check our GitHub';
        else if (iconClass.includes('instagram')) tooltipText = 'Follow on Instagram';
        
        icon.setAttribute('title', tooltipText);
        icon.setAttribute('data-bs-toggle', 'tooltip');
        icon.setAttribute('data-bs-placement', 'top');
    });
    
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Utility Functions

// Show loading state for buttons
function showLoadingState(button) {
    const originalText = button.textContent;
    button.setAttribute('data-original-text', originalText);
    button.innerHTML = '<i class="bi bi-hourglass-split"></i> Loading...';
    button.disabled = true;
    button.classList.add('loading');
}

// Reset button state
function resetButtonState(button, text) {
    button.innerHTML = text || button.getAttribute('data-original-text') || 'Submit';
    button.disabled = false;
    button.classList.remove('loading');
}

// Show success message
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

// Show error message
function showErrorMessage(message) {
    showNotification(message, 'error');
}

// Show info message
function showInfoMessage(message) {
    showNotification(message, 'info');
}

// Generic notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Search functionality (if needed)
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length > 2) {
                searchTimeout = setTimeout(() => {
                    performSearch(query);
                }, 300);
            } else {
                clearSearchResults();
            }
        });
    }
}

// Perform search (placeholder function)
function performSearch(query) {
    // This would typically make an API call
    console.log('Searching for:', query);
    
    // Simulate search results
    const mockResults = [
        { title: 'JavaScript ES6+ Features', url: '#' },
        { title: 'React Hooks Guide', url: '#' },
        { title: 'CSS Grid Layout', url: '#' }
    ].filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase())
    );
    
    displaySearchResults(mockResults);
}

// Display search results
function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p class="text-muted">No results found.</p>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result">
                <a href="${result.url}" class="text-decoration-none">
                    <h6>${result.title}</h6>
                </a>
            </div>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

// Clear search results
function clearSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

// Theme toggle functionality (if needed)
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            // Save preference
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Update button text
            this.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.textContent = '☀️ Light Mode';
        }
    }
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
        
        // You could send this data to analytics
        if (loadTime > 3000) {
            console.warn('Page load time is slow:', loadTime + 'ms');
        }
    });
    
    // Monitor scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Scroll performance monitoring logic
        }, 100);
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // You could send error reports to a logging service
    // logError(e.error);
});

// Accessibility enhancements
function initAccessibilityFeatures() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link position-absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.background = '#000';
    skipLink.style.color = '#fff';
    skipLink.style.padding = '8px';
    skipLink.style.textDecoration = 'none';
    skipLink.style.zIndex = '10000';
    skipLink.textContent = 'Skip to main content';
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const mainContent = document.querySelector('#blog-posts');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
}

// Initialize accessibility features
initAccessibilityFeatures();

// Initialize performance monitoring
initPerformanceMonitoring();