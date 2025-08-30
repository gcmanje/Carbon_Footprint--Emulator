// Import Firebase auth functions
import { auth } from '../Firebase/firebase-config.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js';

// Import AI Service
import aiService from './ai-service.js';

// DOM Elements
const aiInsightsContainer = document.getElementById('ai-insights-container');
const refreshInsightsBtn = document.getElementById('refresh-insights');
const logoutBtn = document.getElementById('logout-btn');

// Mock data - Replace with actual user data from your database
const mockFootprintData = {
  transportation: 1200, // kg CO2
  energy: 850,
  food: 650,
  waste: 320,
  total: 3020
};

// Format insights with proper styling
function formatInsights(insightsText) {
  const insightsList = insightsText.split('\n')
    .filter(line => line.trim().match(/^\d+\./)) // Only keep numbered lines
    .map(line => `<li>${line.trim()}</li>`)
    .join('');
  
  return `
    <div class="insights-card">
      <h3>Your Personalized Recommendations</h3>
      <ul class="insights-list">
        ${insightsList || '<li>No specific insights available. Try refreshing.</li>'}
      </ul>
    </div>
  `;
}

// Fetch AI insights
async function fetchInsights() {
  try {
    aiInsightsContainer.innerHTML = `
      <div class="loading-spinner"></div>
      <p>Analyzing your carbon footprint data...</p>
    `;
    
    const insights = await aiService.getInsights(mockFootprintData);
    aiInsightsContainer.innerHTML = formatInsights(insights);
  } catch (error) {
    console.error('Error fetching insights:', error);
    aiInsightsContainer.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Failed to load insights. Please try again later.</p>
      </div>
    `;
  }
}

// Event Listeners
refreshInsightsBtn.addEventListener('click', fetchInsights);

logoutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
    window.location.href = 'LoginPage.html';
  } catch (error) {
    console.error('Error signing out:', error);
  }
});

// Initialize dashboard
function initDashboard() {
  // Update the total footprint display
  document.getElementById('total-footprint').textContent = 
    `${mockFootprintData.total.toLocaleString()} kg CO₂`;
  
  // Load initial insights
  fetchInsights();
}

// Check auth state and initialize dashboard
const unsubscribe = auth.onAuthStateChanged((user) => {
  if (!user) {
    // User is not logged in, redirect to login page
    window.location.href = 'LoginPage.html';
  } else {
    // User is logged in, initialize the dashboard
    try {
      initDashboard();
    } catch (error) {
      console.error('Error initializing dashboard:', error);
      // Show error to user
      const errorContainer = document.createElement('div');
      errorContainer.className = 'error-message';
      errorContainer.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <p>Error loading dashboard. Please try refreshing the page.</p>
      `;
      document.querySelector('.dashboard-content').prepend(errorContainer);
    }
  }
});

// Clean up auth state listener when the page is unloaded
window.addEventListener('beforeunload', () => {
  unsubscribe();
});
