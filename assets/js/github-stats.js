// GitHub Stats Fetcher
// Automatically fetches star and fork counts from GitHub API

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

    // Fetch stats for each repository
    repos.forEach(repo => {
        fetchRepoStats(repo.name, repo.elementId);
    });

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
            element.innerHTML = `
                <span class="repo-stars">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 .25a.75.75 0 0 1 .673.418l3.058 6.197 6.839.994a.75.75 0 0 1 .415 1.279l-4.948 4.823 1.168 6.811a.75.75 0 0 1-1.088.791L8 14.347l-6.116 3.216a.75.75 0 0 1-1.088-.79l1.168-6.812-4.948-4.823a.75.75 0 0 1 .415-1.28l6.838-.993L7.327.668A.75.75 0 0 1 8 .25Z"/>
                    </svg>
                    ${stars}
                </span>
                <span class="repo-forks">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
                    </svg>
                    ${forks}
                </span>
            `;
        }
    }
}); 