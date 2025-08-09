// GitHub Stats Fetcher
// Loads stats only when open-source section is clicked

document.addEventListener('DOMContentLoaded', function() {
    // GitHub API endpoint (no authentication required for public repos)
    const GITHUB_API_BASE = 'https://api.github.com/repos';
    
    // Repository configurations
    const repos = [
        { name: 'moatlab/Melody', elementId: 'melody-stats' },
        { name: 'moatlab/SoarAlto', elementId: 'soaralto-stats' },
        { name: 'moatlab/FEMU', elementId: 'femu-stats' },
        { name: 'moatlab/Pond', elementId: 'pond-stats' },
        { name: 'moatlab/LeapIO', elementId: 'leapio-stats' },
        { name: 'moatlab/IODA-SOSP21-AE', elementId: 'ioda-stats' }
    ];

    let statsLoaded = false;

    // Function to load GitHub stats
    function loadGitHubStats() {
        if (statsLoaded) return; // Only load once
        
        console.log('Loading GitHub stats...');
        statsLoaded = true;
        
        // Add loading indicators
        repos.forEach(repo => {
            const element = document.getElementById(repo.elementId);
            if (element) {
                element.style.opacity = '0.6';
            }
        });
        
        // Fetch stats for each repository
        repos.forEach(repo => {
            fetchRepoStats(repo.name, repo.elementId);
        });
    }

    // Listen for clicks on the open-source section
    document.addEventListener('click', function(event) {
        // Check if the click is on or within the open-source section
        const target = event.target;
        const openSourceSection = target.closest('.github-repos') || 
                                target.closest('[href*="opensource"]') ||
                                target.closest('[href*="open-source"]');
        
        if (openSourceSection) {
            // Small delay to ensure the section is fully loaded
            setTimeout(loadGitHubStats, 100);
        }
    });

    // Auto-load stats if we're on the opensource page
    function checkAndLoadStats() {
        if (window.location.pathname.includes('opensource') || 
            window.location.pathname.includes('open-source') ||
            document.querySelector('.github-repos')) {
            console.log('📦 Open source page detected, loading GitHub stats...');
            setTimeout(loadGitHubStats, 50);
        }
    }
    
    // Check immediately
    checkAndLoadStats();
    
    // Also check after a short delay in case DOM isn't fully loaded
    setTimeout(checkAndLoadStats, 500);
    
    // Force refresh stats button (optional - can be called manually)
    window.refreshGitHubStats = function() {
        statsLoaded = false;
        loadGitHubStats();
    };

    async function fetchRepoStats(repoName, elementId) {
        try {
            const response = await fetch(`${GITHUB_API_BASE}/${repoName}`);
            
            if (!response.ok) {
                console.warn(`Failed to fetch stats for ${repoName}: ${response.status}`);
                return;
            }

            const data = await response.json();
            updateStatsDisplay(elementId, data.stargazers_count, data.forks_count);
            
        } catch (error) {
            console.error(`Error fetching stats for ${repoName}:`, error);
        }
    }

    function updateStatsDisplay(elementId, stars, forks) {
        const element = document.getElementById(elementId);
        if (element) {
            // Find the existing star and fork spans
            const starSpan = element.querySelector('.repo-stars');
            const forkSpan = element.querySelector('.repo-forks');
            
            if (starSpan) {
                // Simple approach: find the SVG, then replace everything after it
                const svg = starSpan.querySelector('svg');
                if (svg) {
                    // Remove all text nodes after SVG
                    const children = Array.from(starSpan.childNodes);
                    children.forEach(child => {
                        if (child.nodeType === Node.TEXT_NODE) {
                            child.remove();
                        }
                    });
                    // Add new text with star count
                    starSpan.appendChild(document.createTextNode(` ${stars}`));
                }
            }
            
            if (forkSpan) {
                // Simple approach: find the SVG, then replace everything after it
                const svg = forkSpan.querySelector('svg');
                if (svg) {
                    // Remove all text nodes after SVG
                    const children = Array.from(forkSpan.childNodes);
                    children.forEach(child => {
                        if (child.nodeType === Node.TEXT_NODE) {
                            child.remove();
                        }
                    });
                    // Add new text with fork count
                    forkSpan.appendChild(document.createTextNode(` ${forks}`));
                }
            }
            
            // Add loading indicator removal and success styling
            element.style.opacity = '1';
            element.style.transition = 'opacity 0.3s ease';
            console.log(`✅ Updated ${elementId}: ${stars} stars, ${forks} forks`);
        } else {
            console.error(`❌ Element with ID ${elementId} not found`);
        }
    }
}); 