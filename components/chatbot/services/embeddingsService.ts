import OpenAI from "openai";

export class EmbeddingService {
    private client: OpenAI;

    constructor() {
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY // Standard env variable name
        });
    }

    async embedDocuments(texts: string[]): Promise<number[][]> { // Should accept array
        const response = await this.client.embeddings.create({ // Use this.client, not global openai
            model: "text-embedding-3-small",
            input: texts,
            encoding_format: "float",
        });
        
        return response.data.map(item => item.embedding);
    }

    async embedQuery(query: string): Promise<number[]> {
        const response = await this.client.embeddings.create({
            model: "text-embedding-3-small",
            input: query,
            encoding_format: "float",
        });
        
        return response.data[0].embedding;
    }
}