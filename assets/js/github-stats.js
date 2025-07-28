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

    // Also listen for navigation to the open-source page
    if (window.location.pathname.includes('opensource') || 
        window.location.pathname.includes('open-source')) {
        // If we're already on the open-source page, load stats after a short delay
        setTimeout(loadGitHubStats, 500);
    }

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
                // Get all child nodes
                const childNodes = Array.from(starSpan.childNodes);
                
                // Find the text node (should be the last one)
                const textNode = childNodes.find(node => node.nodeType === Node.TEXT_NODE);
                
                if (textNode) {
                    // Update only the text content
                    textNode.textContent = ` ${stars}`;
                }
            }
            
            if (forkSpan) {
                // Get all child nodes
                const childNodes = Array.from(forkSpan.childNodes);
                
                // Find the text node (should be the last one)
                const textNode = childNodes.find(node => node.nodeType === Node.TEXT_NODE);
                
                if (textNode) {
                    // Update only the text content
                    textNode.textContent = ` ${forks}`;
                }
            }
        }
    }
}); 