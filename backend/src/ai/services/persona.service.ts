import { Injectable, NotFoundException } from '@nestjs/common';
import { PERSONAS, Persona } from '../config/personas.config';

@Injectable()
export class PersonaService {
  getPersonas(): Persona[] {
    return Object.values(PERSONAS);
  }

  getPersonaById(id: string): Persona {
    const persona = PERSONAS[id];
    if (!persona) {
      throw new NotFoundException(`Persona with id ${id} not found`);
    }
    return persona;
  }

  buildSystemPrompt(personaId: string, topic: string, cefrLevel: string): string {
    const persona = this.getPersonaById(personaId);
    return `${persona.systemPrompt}\n\nAktuelles Thema (Topic): ${topic}\nSchüler-Niveau (CEFR): ${cefrLevel}\nDu MUSST dich an diese Vorgaben halten.`;
  }
}
