// Secure frontend chat service - NO API keys exposed
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatServiceResponse {
  message: string;
  error?: string;
}

export type PortfolioContext = 'general' | 'skills' | 'projects' | 'education';

export class ChatService {
  private conversationHistory: ChatMessage[] = [];
  private currentContext: PortfolioContext = 'general';

  /**
   * Send a message to the chat API
   */
  async sendMessage(userMessage: string): Promise<string> {
    if (!userMessage.trim()) {
      throw new Error('Message cannot be empty');
    }

    try {
      // Add user message to history before sending
      const userChatMessage: ChatMessage = {
        role: 'user',
        content: userMessage.trim()
      };

      // Call the secure API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.trim(),
          conversationHistory: this.conversationHistory,
          context: this.currentContext
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data: ChatServiceResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Add both messages to conversation history
      this.conversationHistory.push(userChatMessage);
      this.conversationHistory.push({
        role: 'assistant',
        content: data.message
      });

      return data.message;

    } catch (error) {
      console.error('Chat service error:', error);
      
      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      
      // Handle API errors
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }

  /**
   * Set the portfolio context for more relevant responses
   */
  setContext(context: PortfolioContext): void {
    this.currentContext = context;
  }

  /**
   * Get the current context
   */
  getContext(): PortfolioContext {
    return this.currentContext;
  }

  /**
   * Clear conversation history
   */
  clearHistory(): void {
    this.conversationHistory = [];
  }

  /**
   * Get conversation history (read-only)
   */
  getHistory(): ReadonlyArray<ChatMessage> {
    return [...this.conversationHistory];
  }

  /**
   * Get the last N messages from history
   */
  getRecentHistory(count: number): ReadonlyArray<ChatMessage> {
    return this.conversationHistory.slice(-count);
  }

  /**
   * Check if there's conversation history
   */
  hasHistory(): boolean {
    return this.conversationHistory.length > 0;
  }

  /**
   * Set context with a friendly intro message
   */
  async setContextWithIntro(context: PortfolioContext): Promise<string | null> {
    this.setContext(context);
    
    const introMessages = {
      general: "Hi! I'm here to help you learn about Nguyen's background and experience. What would you like to know?",
      skills: "I can tell you all about Nguyen's technical skills and expertise. What technologies are you interested in?",
      projects: "Let me share details about Nguyen's innovative projects. Which one catches your attention?",
      education: "I'd be happy to discuss Nguyen's educational journey and academic achievements. What would you like to know?"
    };

    // Only return intro if no conversation history
    if (!this.hasHistory()) {
      return introMessages[context];
    }
    
    return null;
  }

  /**
   * Quick context switch with conversation continuation
   */
  async switchContextAndAsk(context: PortfolioContext, question: string): Promise<string> {
    this.setContext(context);
    return this.sendMessage(question);
  }
}

// Export singleton instance
export const chatService = new ChatService();
export default chatService;