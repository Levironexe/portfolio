import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Set this in your .env
});

export interface LLMMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class LLMService {
  private messages: LLMMessage[] = [];
  private systemMessage: string = 'You are Claude, a helpful AI assistant created by Anthropic. Be conversational, helpful, and concise in your responses.';

  async sendMessage(userMessage: string): Promise<string> {
    try {
      // Add user message to conversation history
      this.messages.push({
        role: 'user',
        content: userMessage
      });

      // Call Anthropic API with proper format
      const message = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        messages: this.messages,
        system: this.systemMessage
      });

      const assistantMessage = message.content[0]?.type === 'text' 
        ? message.content[0].text 
        : 'Sorry, I could not generate a response.';
      
      // Add assistant response to conversation history
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

  // Alternative: Direct fetch implementation
  async sendMessageWithFetch(userMessage: string): Promise<string> {
    try {
      // Add user message to conversation history
      this.messages.push({
        role: 'user',
        content: userMessage
      });

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY || '',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1000,
          messages: this.messages,
          system: this.systemMessage
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.content[0]?.text || 'Sorry, I could not generate a response.';
      
      // Add assistant response to conversation history
      this.messages.push({
        role: 'assistant',
        content: assistantMessage
      });

      return assistantMessage;
    } catch (error) {
      console.error('Claude API Error:', error);
      return 'Sorry, I encountered an error while processing your request.';
    }
  }

  // Alternative: Local Ollama implementation (unchanged)
  async sendMessageToOllama(userMessage: string): Promise<string> {
    try {
      const response = await fetch(`${process.env.OLLAMA_BASE_URL || 'http://localhost:11434'}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama2', // or any model you have installed
          prompt: userMessage,
          stream: false
        })
      });

      const data = await response.json();
      return data.response || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Ollama API Error:', error);
      return 'Sorry, I encountered an error while processing your request.';
    }
  }

  // Update system message (useful for different contexts)
  setSystemMessage(systemMessage: string): void {
    this.systemMessage = systemMessage;
  }

  // Set context for different parts of your portfolio
  setPortfolioContext(context: 'general' | 'skills' | 'projects' | 'education'): void {
    const contexts = {
      general: 'You are a portfolio assistant for Nguyen Thien Phuoc (Leviron), a Software Developer building AI-powered applications. Answer questions about his background, skills, and experience.',
      skills: 'You specialize in answering questions about Nguyen\'s technical skills, programming languages, frameworks, and development expertise.',
      projects: 'You know all about Nguyen\'s projects, including technical details, challenges solved, and technologies used.',
      education: 'You can answer questions about Nguyen\'s educational background at Swinburne and his academic achievements.'
    };
    
    this.setSystemMessage(contexts[context]);
  }

  clearHistory(): void {
    this.messages = []; // Clear all conversation history
  }

  getConversationHistory(): LLMMessage[] {
    return [...this.messages]; // Return copy of messages
  }
}

export const llmService = new LLMService();