import { Persona } from '../config/personas.config';
export declare class PersonaService {
    getPersonas(): Persona[];
    getPersonaById(id: string): Persona;
    buildSystemPrompt(personaId: string, topic: string, cefrLevel: string): string;
}
