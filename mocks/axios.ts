import { vi } from 'vitest';
import { pokemonMock } from './pokemon_mock';
const mockCardData = pokemonMock[0];

export default {
  get: vi.fn().mockResolvedValue(mockCardData),
};
