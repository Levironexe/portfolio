'use client';
import { useState, useRef } from 'react';

export default function RAGAdminPage() {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadText = async () => {
    if (!text.trim()) {
      setMessage('❌ Please enter some text');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/rag/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documents: [text] })
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Text added to RAG system!');
        setText('');
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to upload text');
      console.error('Upload error:', error);
    }

    setLoading(false);
  };

  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setMessage('❌ Please select a valid PDF file');
      return;
    }

    setPdfLoading(true);
    setMessage('🔄 Processing PDF...');
    
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      
      const response = await fetch('/api/rag/parse-pdf', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        const uploadResponse = await fetch('/api/rag/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ documents: data.chunks })
        });

        const uploadData = await uploadResponse.json();

        if (uploadData.success) {
          setMessage(`✅ PDF processed and added to RAG system! Added ${data.chunks.length} text chunks.`);
        } else {
          setMessage(`❌ Error adding to RAG: ${uploadData.error}`);
        }
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setMessage(`❌ Error processing PDF: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to process PDF');
      console.error('PDF processing error:', error);
    }
    
    setPdfLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          RAG System Administration
        </h1>
        
        {/* Text Entry */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📝 Add Text</h2>
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text content..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-vertical min-h-[150px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <button
            onClick={uploadText}
            disabled={loading}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add to RAG System'}
          </button>
        </div>

        {/* PDF Upload */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📄 Upload PDF</h2>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            disabled={pdfLoading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
          />
          
          {pdfLoading && <div className="mt-2 text-blue-600">Processing...</div>}
        </div>

        {/* Status Messages */}
        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes('✅') ? 'bg-green-50 text-green-800 border border-green-200' :
            message.includes('❌') ? 'bg-red-50 text-red-800 border border-red-200' :
            'bg-blue-50 text-blue-800 border border-blue-200'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}