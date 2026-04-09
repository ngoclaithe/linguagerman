export interface Persona {
    id: string;
    name: string;
    title: string;
    avatar: string;
    cefrTarget: string;
    errorTolerance: 'strict' | 'moderate' | 'relaxed';
    systemPrompt: string;
    topicAffinities: string[];
}
export declare const PERSONAS: Record<string, Persona>;
