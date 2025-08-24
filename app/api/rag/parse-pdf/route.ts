// app/api/rag/parse-pdf/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('pdf') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No PDF file provided' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 });
    }

    console.log(`📊 Processing PDF: ${file.name} (${file.size} bytes)`);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log('🔄 Parsing PDF with pdf-parse...');
    // Import and immediately call with buffer to avoid test file interference
    const pdfParse = (await import('pdf-parse')).default;
    const data = await pdfParse(buffer, {
      // Pass empty options to prevent loading test files
      version: 'v1.10.100'
    });
    const fullText = data.text;
    
    console.log(`📝 Extracted ${fullText.length} characters from ${data.numpages} pages`);
    
    // Split into chunks
    const words = fullText.split(/\s+/).filter(word => word.trim().length > 0);
    const chunks: string[] = [];
    const wordsPerChunk = 300;
    
    for (let i = 0; i < words.length; i += wordsPerChunk) {
      const chunk = words.slice(i, i + wordsPerChunk).join(' ');
      if (chunk.trim().length > 50) {
        chunks.push(chunk);
      }
    }
    
    console.log(`✂️ Created ${chunks.length} chunks`);
    
    return NextResponse.json({
      success: true,
      chunks: chunks,
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        totalPages: data.numpages,
        totalCharacters: fullText.length,
        totalWords: words.length,
        totalChunks: chunks.length
      }
    });
    
  } catch (error: any) {
    console.error('❌ PDF processing error:', error);
    
    return NextResponse.json({ 
      success: false,
      error: `Failed to process PDF: ${error.message}` 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'PDF processing API is working', 
    endpoint: '/api/rag/parse-pdf',
    method: 'POST'
  });
  
}