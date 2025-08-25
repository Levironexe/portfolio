import { CloudClient, Collection } from "chromadb";
import { EmbeddingService } from "./embeddingsService";
import Anthropic from '@anthropic-ai/sdk';

export class VectorService {
  private client: CloudClient;
  private collection: Collection | null = null;
  private collectionName = "portfolio"; // Fixed typo
  private isInitialized = false;
  private anthropic: Anthropic;

  constructor() {
    this.client = new CloudClient({
      apiKey: process.env.CHROMADB_API_KEY,
      tenant: "be0e6c28-2867-4e49-ab2a-d44e20844408",
      database: "portfolio",
    });
    
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      this.collection = await this.client.getCollection({
        name: this.collectionName,
        embeddingFunction: undefined
      });

      this.isInitialized = true;
      console.log("✅ Vector service initialized");
    } catch (error) {
      console.error("❌ Failed to initialize vector service:", error);
      throw error;
    }
  }

  async addDocuments(
    documents: string[],
    embeddings: number[][],
    ids: string[],
    keywords: string[][]
  ) {
    if (!this.collection) {
      throw new Error(
        "Vector service not initialized. Call initialize() first."
      );
    }

    try {
      await this.collection.add({
        documents: documents,
        embeddings: embeddings,
        ids: ids,
        metadatas: documents.map((_, i) => ({
          source: `doc_${i}`,
          timestamp: new Date().toISOString(),
          keywords: (keywords[i] || []).join(', '),
        })),
      });

      console.log(`✅ Added ${documents.length} documents with embeddings`);
    } catch (error) {
      console.error("❌ Failed to add documents:", error);
      throw error;
    }
  }

  async searchSimilar(
    queryEmbedding: number[],
    nResults: number = 5,
    originalQuery?: string
  ): Promise<string[]> {
    if (!this.collection) {
      throw new Error(
        "Vector service not initialized. Call initialize() first."
      );
    }

    try {
      // Get all results first, then filter manually since ChromaDB doesn't support substring matching
      const results = await this.collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults: nResults,
        include: ["documents", "distances", "metadatas"],
      });

      let documents = results.documents[0] || [];
      let metadatas = results.metadatas[0] || [];
      
      // Apply keyword filtering if originalQuery provided
      if (originalQuery && documents.length > 0) {
        const keywords = await this.analyzeQuery(originalQuery);
        
        if (keywords.length > 0) {
          console.log(`🔍 Filtering documents by keywords: [${keywords.join(', ')}]`);
          
          // Filter documents by checking if any keyword exists in the metadata keywords string
          const filteredIndices: number[] = [];
          
          metadatas.forEach((metadata: any, index: number) => {
            if (metadata && metadata.keywords) {
              const docKeywords = metadata.keywords.toLowerCase();
              const hasMatch = keywords.some(keyword => 
                docKeywords.includes(keyword.toLowerCase())
              );
              if (hasMatch) {
                filteredIndices.push(index);
              }
            }
          });
          
          // Apply filtering
          if (filteredIndices.length > 0) {
            documents = filteredIndices.slice(0, nResults).map(i => documents[i]);
            console.log(`📋 Found ${filteredIndices.length} documents matching keywords, returning ${documents.length}`);
          } else {
            console.log(`⚠️ No documents matched keywords, falling back to unfiltered results`);
            documents = documents.slice(0, nResults);
          }
        }
      } else {
        documents = documents.slice(0, nResults);
      }
      
      return documents.filter((doc): doc is string => doc !== null);
    } catch (error) {
      console.error("Failed to search documents:", error);
      return [];
    }
  }

  async analyzeQuery(query: string): Promise<string[]> {
    try {
      const systemMessage = `You are an AI assistant helping to categorize portfolio queries. Your job is to:
        1. Read the user's question carefully.
        2. Identify which document categories would be most relevant to answer the question.
        3. Choose only from these categories: personal background, education, work experience, technical skills, projects, achievements, contact information, interests and hobbies, career goals, testimonials.
        4. Return ONLY the relevant categories as a comma-separated string.

        Example: "education, technical skills, projects"`;

      const response = await this.anthropic.messages.create({
        model: 'claude-3-7-sonnet-20250219',
        max_tokens: 100,
        messages: [{
          role: 'user',
          content: `What document categories would be most relevant to answer this question: "${query}"`
        }],
        system: systemMessage
      });

      // Extract the text content from response
      const content = response.content[0];
      if (content.type === 'text') {
        // Split by comma and clean up whitespace
        const keywords = content.text
          .trim()
          .split(',')
          .map(keyword => keyword.trim())
          .filter(keyword => keyword.length > 0);
        
        console.log(`🔍 Query "${query}" → Keywords: [${keywords.join(', ')}]`);
        return keywords;
      }
      
      return [];
    } catch (error: any) {
      console.log("Error analyzing query:", error);
      return []; // Return empty array on error, fallback to unfiltered search
    }
  }

  async deleteAll() {
    if (!this.collection) {
      throw new Error(
        "Vector service not initialized. Call initialize() first."
      );
    }
    try {
      await this.collection.delete({
        where: {}
      });
    } catch (error) {
      console.log("Cannot delete collection. find vectordbService.ts", error);
    }
  }

  async getCollectionInfo() {
    if (!this.collection) {
      throw new Error(
        "Vector service not initialized. Call initialize() first."
      );
    }
    try {
        const count = await this.collection.count();
        return {
            name: this.collectionName,
            documentCount: count
        }
    } catch (error) {
        console.log("Cannot get collection's name and count. find vectordbService.ts", error);
    }
  }
}
