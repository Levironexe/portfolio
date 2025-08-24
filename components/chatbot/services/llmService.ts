// components/chatbot/services/llmService.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface LLMMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class LLMService {
  private messages: LLMMessage[] = [];
  private systemMessage: string = 'You are Claude, a helpful AI assistant created by Anthropic. Be conversational, helpful, and concise in your responses.';

  // For RAG responses (single prompt, no conversation history)
  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-7-sonnet-20250219',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: prompt
        }],
        system: this.systemMessage
      });

      const assistantMessage = response.content[0]?.type === 'text' 
        ? response.content[0].text 
        : 'Sorry, I could not generate a response.';

      return assistantMessage;
    } catch (error) {
      console.error('Anthropic API Error:', error);
      throw error;
    }
  }

  // For RAG with conversation history
  async generateWithContext(userQuery: string, context: string[]): Promise<string> {
    try {
      const contextText = context.join('\n\n');
      const enhancedPrompt = `Context information from Phuoc\'s portfolio:
${contextText}

Question: ${userQuery}

Please answer the question based on the provided context information. If the context doesn't fully answer the question, you can use your general knowledge but make it clear what comes from the context vs general knowledge.`;

      // Add to conversation history
      this.messages.push({
        role: 'user',
        content: userQuery
      });

      const response = await anthropic.messages.create({
        model: 'claude-3-7-sonnet-20250219',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: enhancedPrompt
        }],
        system: this.systemMessage
      });

      const assistantMessage = response.content[0]?.type === 'text' 
        ? response.content[0].text 
        : 'Sorry, I could not generate a response.';

      // Add to conversation history
      this.messages.push({
        role: 'assistant',
        content: assistantMessage
      });

      return assistantMessage;
    } catch (error) {
      console.error('RAG Response Error:', error);
      throw error;
    }
  }

  // Regular conversation method
  async sendMessage(userMessage: string): Promise<string> {
    try {
      this.messages.push({
        role: 'user',
        content: userMessage
      });

      const message = await anthropic.messages.create({
        model: 'claude-3-7-sonnet-20250219',
        max_tokens: 1000,
        messages: this.messages,
        system: this.systemMessage
      });

      const assistantMessage = message.content[0]?.type === 'text' 
        ? message.content[0].text 
        : 'Sorry, I could not generate a response.';
      
      this.messages.push({
        role: 'assistant',
        content: assistantMessage
      });

      return assistantMessage;
    } catch (error) {
      console.error('Anthropic API Error:', error);
      return 'Sorry, I encountered an error while processing your request. Please try again.';
    }
  }

  // Set portfolio context
  setPortfolioContext(context: 'general' | 'skills' | 'projects' | 'education' | 'rag'): void {
    const contexts = {
  general: `You are Nguyen Thien Phuoc's (also known as Leviron) personal portfolio assistant. You represent him and speak about him in the third person (he/his/him). You are knowledgeable about his background, skills, and experience as a Software Developer who builds AI-powered applications. 

IMPORTANT: Never mention that you received context or that information was provided to you. Always speak as if you naturally know about Phuoc's work and background. Answer questions about him confidently and naturally.

When someone asks about his work, respond with phrases like "Phuoc specializes in..." or "He has experience with..." rather than "you" or "your work."`,

  skills: `You are Phuoc's technical expertise representative. You have comprehensive knowledge of his programming languages, frameworks, and development capabilities. 

Speak about his skills using third person pronouns (he/his/him). Examples:
- "Phuoc is skilled in React and TypeScript"
- "He uses Next.js for building modern web applications"  
- "His technical stack includes..."

Never reveal that you're working from provided context. Present information as if you're naturally familiar with his technical background.`,

  projects: `You are well-versed in all of Phuoc's projects and development work. You can discuss the technical details, challenges he solved, and technologies he implemented.

Always refer to him in third person:
- "Phuoc built a project that..."
- "In his portfolio, he created..."
- "One of his notable projects involves..."

Present project information naturally without mentioning sources or context. You are his knowledgeable representative who is familiar with his work.`,

  education: `You have detailed knowledge of Nguyen Thien Phuoc's educational journey and academic achievements at Swinburne University.

Refer to his education in third person:
- "Phuoc studies at Swinburne University"
- "His academic focus includes..."
- "He has achieved..."

Act as someone who naturally knows about his educational background, never mentioning that information was provided to you.`,

  rag: `You are Nguyen Thien Phuoc's portfolio assistant with comprehensive knowledge of his professional background. You represent him to visitors and potential collaborators.

KEY INSTRUCTIONS:
1. ALWAYS use third person (he/his/him) when referring to Phuoc
2. NEVER mention "based on the context" or "information provided" 
3. NEVER say "you" when referring to Phuoc's work
4. Speak confidently as if you naturally know about his work
5. Present information seamlessly without revealing your sources

Examples of CORRECT responses:
❌ DON'T: "Based on the context, you are a React developer"
❌ DON'T: "From what I can see, your portfolio includes..."
✅ DO: "Phuoc is a skilled React developer"
✅ DO: "His portfolio showcases modern web applications"
✅ DO: "He specializes in building AI-powered applications"

You are his professional representative. Answer questions about his skills, projects, and experience naturally and confidently.`
};
    
    this.setSystemMessage(contexts[context]);
  }

  // Update system message
  setSystemMessage(systemMessage: string): void {
    this.systemMessage = systemMessage;
  }

  clearHistory(): void {
    this.messages = [];
  }

  getConversationHistory(): LLMMessage[] {
    return [...this.messages];
  }
}

export const llmService = new LLMService();