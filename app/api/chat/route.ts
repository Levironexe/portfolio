import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client with API key from server environment
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  conversationHistory: ChatMessage[];
  context?: 'general' | 'skills' | 'projects' | 'education';
}

export interface ChatResponse {
  message: string;
  error?: string;
}

// Portfolio context system messages
const getSystemMessage = (context: string = 'general'): string => {
  const contexts = {
    general: 'You are a portfolio assistant for Nguyen Thien Phuoc (Leviron), a Software Developer building AI-powered applications. Answer questions about his background, skills, and experience. Be conversational, helpful, and concise.',
    skills: 'You specialize in answering questions about Nguyen\'s technical skills, programming languages, frameworks, and development expertise. Focus on his proficiency in React, Next.js, TypeScript, Python, AI/ML technologies, and full-stack development.',
    projects: 'You know all about Nguyen\'s projects, including SentinelAI (PCI DSS compliance tool), Carbonio (carbon tracking on blockchain), ArtChainAI (AI art NFT platform), and other innovative applications. Discuss technical details, challenges solved, and technologies used.',
    education: 'You can answer questions about Nguyen\'s educational background at Swinburne University of Technology (Computer Science), his academic achievements, GPA improvements, and previous education at Lac Hong Bilingual School.'
  };
  
  return contexts[context as keyof typeof contexts] || contexts.general;
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ChatRequest = await request.json();
    const { message, conversationHistory, context = 'general' } = body;

    // Validate input
    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message cannot be empty' },
        { status: 400 }
      );
    }

    // Prepare messages for Anthropic API
    const messages: ChatMessage[] = [
      ...conversationHistory,
      {
        role: 'user',
        content: message.trim()
      }
    ];

    // Call Anthropic API
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      temperature: 0.7,
      system: getSystemMessage(context),
      messages: messages
    });

    // Extract response text
    const assistantMessage = response.content[0]?.type === 'text' 
      ? response.content[0].text 
      : 'Sorry, I could not generate a response.';

    return NextResponse.json({
      message: assistantMessage
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Handle specific Anthropic errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'API configuration error' },
          { status: 500 }
        );
      }
      
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Sorry, I encountered an error while processing your request. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}