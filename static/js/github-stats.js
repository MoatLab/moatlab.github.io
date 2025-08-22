// GitHub Repository Statistics Fetcher
// Fetches real-time star and fork counts from GitHub API

const repositories = [
    { id: 'melody-stats', repo: 'MoatLab/Melody' },
    { id: 'soaralto-stats', repo: 'MoatLab/SoarAlto' },
    { id: 'femu-stats', repo: 'MoatLab/FEMU' },
    { id: 'pond-stats', repo: 'MoatLab/Pond' },
    { id: 'leapio-stats', repo: 'MoatLab/LeapIO' },
    { id: 'ioda-stats', repo: 'MoatLab/IODA-SOSP21-AE' }
];

async function fetchGitHubStats(owner, repo) {
    try {
        // Use AbortController for timeout control
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
        
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'X-GitHub-Api-Version': '2022-11-28'
            },
            signal: controller.signal,
            cache: 'force-cache' // Use browser cache when available
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return {
            stars: data.stargazers_count,
            forks: data.forks_count
        };
    } catch (error) {
        if (error.name === 'AbortError') {
            console.warn(`Timeout fetching stats for ${owner}/${repo}`);
        } else {
            console.warn(`Failed to fetch stats for ${owner}/${repo}:`, error);
        }
        return null;
    }
}

function updateRepoStats(elementId, stats) {
    const element = document.getElementById(elementId);
    if (!element || !stats) return;
    
    const starsElement = element.querySelector('.repo-stars');
    const forksElement = element.querySelector('.repo-forks');
    
    if (starsElement) {
        // Remove loading span and set actual number
        const loadingSpan = starsElement.querySelector('.loading');
        if (loadingSpan) {
            loadingSpan.remove();
        }
        starsElement.appendChild(document.createTextNode(stats.stars.toString()));
    }
    
    if (forksElement) {
        // Remove loading span and set actual number  
        const loadingSpan = forksElement.querySelector('.loading');
        if (loadingSpan) {
            loadingSpan.remove();
        }
        forksElement.appendChild(document.createTextNode(stats.forks.toString()));
    }
    
    // Show the stats with fade-in animation
    element.classList.add('loaded');
}

// Cache management
const CACHE_KEY = 'moatlab-github-stats';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

function getCachedStats() {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;
        
        const { data, timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_DURATION;
        
        return isExpired ? null : data;
    } catch (error) {
        return null;
    }
}

function setCachedStats(stats) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: stats,
            timestamp: Date.now()
        }));
    } catch (error) {
        console.warn('Failed to cache GitHub stats:', error);
    }
}

async function loadAllGitHubStats() {
    console.log('Loading GitHub repository statistics...');
    
    // Try to load from cache first for instant display
    const cachedStats = getCachedStats();
    if (cachedStats) {
        console.log('Using cached GitHub stats for instant loading');
        Object.entries(cachedStats).forEach(([repo, stats]) => {
            const repoConfig = repositories.find(r => r.repo === repo);
            if (repoConfig && stats) {
                updateRepoStats(repoConfig.id, stats);
            }
        });
        return;
    }
    
    // Fetch all repository stats in parallel for faster loading
    const promises = repositories.map(async ({ id, repo }) => {
        const [owner, repoName] = repo.split('/');
        const stats = await fetchGitHubStats(owner, repoName);
        
        if (stats) {
            updateRepoStats(id, stats);
            console.log(`Updated ${repo}: ${stats.stars} stars, ${stats.forks} forks`);
        }
        
        return { repo, stats };
    });
    
    const results = await Promise.all(promises);
    
    // Cache the results for faster subsequent loads
    const statsToCache = {};
    results.forEach(({ repo, stats }) => {
        if (stats) {
            statsToCache[repo] = stats;
        }
    });
    setCachedStats(statsToCache);
    
    console.log('GitHub stats update completed and cached');
}

// Initialize immediately when script loads
loadAllGitHubStats();