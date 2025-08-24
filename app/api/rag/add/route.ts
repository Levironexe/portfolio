import { NextRequest, NextResponse } from "next/server";
import { RAGService } from "@/components/chatbot/services/ragService";
export async function POST(request: NextRequest) {
  const { documents } = await request.json();

  try {
    const ragService = new RAGService();
    await ragService.initialize();
    // Store document to Chroma
    await ragService.addDocuments(documents);
    return Response.json({
      success: true,
      message: `Added ${documents.length} documents with OpenAI embeddings`,
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
