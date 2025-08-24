// app/api/rag/query/route.ts (FIXED)
import { NextRequest, NextResponse } from "next/server";
import { RAGService } from "@/components/chatbot/services/ragService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received body:', body); // Debug log
    
    const { query } = body;
    
    // Validate input
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: "Query is required and must be a non-empty string" }, 
        { status: 400 }
      );
    }

    console.log(`🔍 Processing query: "${query}"`);

    const ragService = new RAGService();
    await ragService.initialize();
    
    const response = await ragService.query(query.trim());
    const relevantDocsCount = await ragService.getLastQueryMetadata()

    console.log(`✅ Generated RAG response`);

    return NextResponse.json({ 
      success: true,
      response: response,
      query: query.trim(),
        metadata: {
        relevantDocuments: relevantDocsCount,
        timestamp: new Date().toISOString(),
        source: 'RAG'
      }
    });
    
  } catch (error: any) {
    console.error('❌ RAG query error:', error);
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    );
  }
}