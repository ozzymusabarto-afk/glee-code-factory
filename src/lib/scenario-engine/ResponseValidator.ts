import type {
  CompletionRule,
  ExpectedResponse,
  ValidationInput,
  ValidationResult,
} from './types';

const NEAR_MATCH_THRESHOLD = 0.65;

export function normalizeTranscript(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/'/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(value: string): string[] {
  return value ? value.split(' ') : [];
}

function overlapScore(transcript: string, expected: string): number {
  const transcriptTokens = tokens(transcript);
  const expectedTokens = tokens(expected);

  if (!transcriptTokens.length || !expectedTokens.length) return 0;

  const expectedTokenSet = new Set(expectedTokens);
  const transcriptTokenSet = new Set(transcriptTokens);
  const matches = [...transcriptTokenSet].filter((token) => expectedTokenSet.has(token)).length;
  const precision = matches / transcriptTokenSet.size;
  const recall = matches / expectedTokenSet.size;

  return precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);
}

function containsAllTerms(transcript: string, requiredTerms: string[]): boolean {
  const transcriptTokens = new Set(tokens(transcript));
  const normalizedRequiredTerms = requiredTerms.flatMap((term) => tokens(normalizeTranscript(term)));
  return normalizedRequiredTerms.every((term) => transcriptTokens.has(term));
}

function requiredTermsFor(
  response: ExpectedResponse,
  requiredTerms: string[] | undefined,
): string[] {
  if (requiredTerms?.length) return requiredTerms;
  return tokens(response.normalizedText);
}

function matchesExpectedResponse(
  transcript: string,
  response: ExpectedResponse,
  completionRule: CompletionRule,
  requiredTerms?: string[],
): boolean {
  const expected = normalizeTranscript(response.normalizedText || response.responseText);

  if (completionRule === 'all_required_terms' || response.matchType === 'contains_required_terms') {
    return containsAllTerms(transcript, requiredTermsFor(response, requiredTerms));
  }

  return transcript === expected;
}

function shouldAcceptResponse(response: ExpectedResponse, completionRule: CompletionRule): boolean {
  return completionRule !== 'choice_correct' || response.isPrimary;
}

export class ResponseValidator {
  validate(input: ValidationInput): ValidationResult {
    const normalizedTranscript = normalizeTranscript(input.transcript ?? '');

    if (!normalizedTranscript) {
      return {
        result: 'recognition_error',
        score: 0,
        normalizedTranscript,
        reason: 'No transcript was provided.',
      };
    }

    if (!input.expectedResponses.length) {
      return {
        result: 'retry',
        score: 0,
        normalizedTranscript,
        reason: 'No expected responses are configured for this step.',
      };
    }

    const matchingResponse = input.expectedResponses.find((response) =>
      matchesExpectedResponse(
        normalizedTranscript,
        response,
        input.completionRule,
        input.requiredTerms,
      ),
    );

    if (matchingResponse) {
      if (shouldAcceptResponse(matchingResponse, input.completionRule)) {
        return {
          result: 'accepted',
          score: 1,
          normalizedTranscript,
          matchedResponseId: matchingResponse.id,
        };
      }

      return {
        result: 'retry',
        score: 0,
        normalizedTranscript,
        matchedResponseId: matchingResponse.id,
        reason: 'The selected response is not the correct choice.',
      };
    }

    const bestScore = input.expectedResponses.reduce((highest, response) => {
      const expected = normalizeTranscript(response.normalizedText || response.responseText);
      return Math.max(highest, overlapScore(normalizedTranscript, expected));
    }, 0);

    return {
      result: bestScore >= NEAR_MATCH_THRESHOLD ? 'near_match' : 'retry',
      score: bestScore,
      normalizedTranscript,
      reason: bestScore >= NEAR_MATCH_THRESHOLD ? 'The response is close to an expected response.' : 'No expected response matched.',
    };
  }
}
