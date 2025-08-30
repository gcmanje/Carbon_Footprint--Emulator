// AI Service for Gemini API
class AIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  }

  async getInsights(footprintData) {
    try {
      const prompt = `Given the following carbon footprint data: ${JSON.stringify(footprintData)}. 
      Provide 3 actionable insights to reduce the carbon footprint in a concise format.`;
      
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI insights');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error getting AI insights:', error);
      return 'Unable to generate insights at the moment. Please try again later.';
    }
  }
}

// Initialize with your Gemini API key
const aiService = new AIService('AIzaSyCXk2z7xcENVcWnrDkT7C6_OvDTlKze6CE'); // Replace with your actual API key

export default aiService;
