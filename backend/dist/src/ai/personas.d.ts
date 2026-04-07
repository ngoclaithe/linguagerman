export interface Persona {
    id: string;
    name: string;
    role: string;
    avatar: string;
    color: string;
    systemPrompt: string;
    greeting: string;
    topics: string[];
}
export declare const PERSONAS: Record<string, Persona>;
export declare function getPersona(id: string): Persona;
