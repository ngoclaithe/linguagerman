import { ConfigService } from '@nestjs/config';
export interface GrammarCorrection {
    original: string;
    corrected: string;
    type: string;
    explanation: string;
    severity: 'error' | 'warning' | 'suggestion';
}
export interface GrammarResponse {
    hasError: boolean;
    corrections: GrammarCorrection[];
}
export declare class GrammarService {
    private configService;
    private readonly logger;
    private llmUrl;
    constructor(configService: ConfigService);
    checkGrammar(text: string, cefr: string): Promise<GrammarResponse>;
}
