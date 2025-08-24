// components/chatbot/services/metadataExtractingService.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const KEYWORD_CATEGORIES = [
  "personal background",     // About me, hobbies, interests, personality
  "education",              // Schools, degrees, courses, certifications
  "work experience",        // Jobs, internships, professional roles
  "technical skills",       // Programming languages, frameworks, tools
  "projects",              // Personal/professional projects, portfolios
  "achievements",          // Awards, recognitions, accomplishments
  "contact information",   // Email, social media, location
  "interests and hobbies", // Personal interests, activities, passions
  "career goals",          // Aspirations, future plans, objectives
  "testimonials"           // Recommendations, feedback, reviews
];

export class KeywordExtractingService {
  private systemMessage: string = `You are an AI assistant helping to categorize portfolio content. Your job is to:
    1. Read the document content carefully.
    2. Identify up to 5 keywords that best describe what the content is about.
    3. Choose only from these categories: personal background, education, work experience, technical skills, projects, achievements, contact information, interests and hobbies, career goals, testimonials.
    4. Return ONLY the keywords as a comma-separated string.

    Example: "education, technical skills, projects"`;
    
  async generateResponse(documents: string[]): Promise<string[][]> {
    try {
      // Process each document individually
      const allKeywords: string[][] = [];
      
      for (const document of documents) {
        const response = await anthropic.messages.create({
          model: 'claude-3-7-sonnet-20250219',
          max_tokens: 100,
          messages: [{
            role: 'user',
            content: `Extract keywords from this document:\n\n${document}`
          }],
          system: this.systemMessage
        });

        // Extract the text content from response
        const content = response.content[0];
        if (content.type === 'text') {
          try {
            // Handle comma-separated string format
            const keywordString = content.text.trim();
            
            // Split by comma and clean up whitespace
            const keywords = keywordString
              .split(',')
              .map(keyword => keyword.trim())
              .filter(keyword => keyword.length > 0);
            
            allKeywords.push(keywords);
          } catch (parseError) {
            console.log("Failed to parse keywords:", content.text);
            allKeywords.push([]);
          }
        } else {
          allKeywords.push([]);
        }
      }
      
      return allKeywords;
    } catch (error: any) {
      console.log("Error extracting keywords:", error);
      return documents.map(() => []); // Return empty arrays for each document on error
    }
  }
}