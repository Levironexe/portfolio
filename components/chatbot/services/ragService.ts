// components/chatbot/services/ragService.ts
import { EmbeddingService } from './embeddingsService';
import { VectorService } from './vectordbService';
import { LLMService } from './llmService';
import { KeywordExtractingService } from './keywordExtractingService';

export class RAGService {
  private embeddingService: EmbeddingService;
  private vectorService: VectorService;
  private llmService: LLMService;
    private lastQueryMetadata: { relevantDocsCount: number } | null = null;
    private keywordExtractingService: KeywordExtractingService

  constructor() {
    this.embeddingService = new EmbeddingService();
    this.vectorService = new VectorService();
    this.llmService = new LLMService();
    this.keywordExtractingService = new KeywordExtractingService()
  }

  async initialize() {
    try {
      await this.vectorService.initialize();
      console.log('✅ RAG service initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize RAG service:', error);
      throw error;
    }
  }

  // ONE-TIME SETUP - Load your portfolio content
  async addDocuments(documents: string[]): Promise<void> {
    try {
      console.log(`🔄 Processing ${documents.length} documents...`);
      
      // Create embeddings using OpenAI
      const embeddings = await this.embeddingService.embedDocuments(documents);
      
      // Generate unique IDs for documents
      const ids = documents.map((_, i) => `portfolio_doc_${Date.now()}_${i}`);
      
    // Get keywords for metadata
    const keywords = await this.keywordExtractingService.generateResponse(documents)

      // Store in vector database
      await this.vectorService.addDocuments(documents, embeddings, ids, keywords);
      
      console.log(`✅ Successfully added ${documents.length} documents to RAG system`);
    } catch (error) {
      console.error('❌ Failed to add documents:', error);
      throw error;
    }
  }

  // RUNTIME - Answer user queries with context
  async query(userQuery: string): Promise<string> {
    try {
      console.log(`🔍 Processing query: "${userQuery}"`);
      
      // 1. Convert user question to embedding
      const queryEmbedding = await this.embeddingService.embedQuery(userQuery);
      
      // 2. Find similar documents with keyword filtering
      const relevantDocs = await this.vectorService.searchSimilar(queryEmbedding, 3, userQuery);
      this.lastQueryMetadata = { relevantDocsCount: relevantDocs.length };

      if (relevantDocs.length === 0) {
        console.log('⚠️ No relevant documents found');
        return await this.llmService.generateResponse(userQuery);
      }
      
      // 3. Create enhanced prompt with context
      const context = relevantDocs.join('\n\n');
     const enhancedPrompt = `You are Nguyen Thien Phuoc's (also known as Leviron) portfolio assistant with comprehensive knowledge of his professional background.

PORTFOLIO INFORMATION:
${context}

QUESTION: ${userQuery}

INSTRUCTIONS:
- Always refer to Phuoc in third person (he/his/him)
- Remember: "Leviron" is Phuoc's online alias/handle
- Use both the portfolio information AND your knowledge about software development
- If the portfolio information doesn't fully answer the question, provide helpful general information while staying in character
- Never mention "context" or "provided information"
- Present information naturally as if you know him professionally
- Response must be in Markdown format
- Format like this example:
  **Good:**
  ## Database Storage
  - PostgreSQL
  - Supabase

  **Not like this:**
  ## Database Storage

  - PostgreSQL
  - Supabase

IMPORTANT: Even if specific details aren't in the portfolio information above, you can provide relevant professional insights while staying true to his identity as a React/TypeScript developer building AI applications.

Answer the question naturally and professionally:`;
      console.log(`📋 Found ${relevantDocs.length} relevant documents`);
      
      // 4. Generate response using LLM with context
      const response = await this.llmService.generateResponse(enhancedPrompt);
      
      console.log('✅ Generated RAG response');
      return response;
      
    } catch (error) {
      console.error('❌ RAG query failed:', error);
      // Fallback to regular LLM without context
      return await this.llmService.generateResponse(userQuery);
    }
  }
  async getLastQueryMetadata(): Promise<number> {
    return this.lastQueryMetadata?.relevantDocsCount || 0;
  }

  // UTILITY METHODS

  // Check system health
  async getSystemInfo() {
    try {
      const collectionInfo = await this.vectorService.getCollectionInfo();
      return {
        status: 'healthy',
        documentsCount: collectionInfo?.documentCount || 0,
        collectionName: collectionInfo?.name || 'unknown'
      };
    } catch (error: any) {
      return {
        status: 'error',
        error: error.message
      };
    }
  }

  // Clear all documents (for testing/reset)
  async clearDocuments(): Promise<void> {
    try {
      await this.vectorService.deleteAll();
      console.log('🗑️ Cleared all documents from RAG system');
    } catch (error) {
      console.error('❌ Failed to clear documents:', error);
      throw error;
    }
  }

  // Test the RAG system
  async testRAG(): Promise<boolean> {
    try {
      // Test documents
      const testDocs = [
        "I am a full-stack developer specializing in React and TypeScript",
        "My portfolio includes modern web applications built with Next.js"
      ];
      
      await this.addDocuments(testDocs);
      
      // Test query
      const response = await this.query("What technologies do you specialize in?");
      
      console.log('🧪 RAG Test Result:', response);
      return response.toLowerCase().includes('react') || response.toLowerCase().includes('typescript');
      
    } catch (error) {
      console.error('❌ RAG test failed:', error);
      return false;
    }
  }
}