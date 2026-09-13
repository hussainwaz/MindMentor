// API client for MindMentor backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Send a chat message with conversation history
 * @param {string} message - Current user message
 * @param {Array} history - Previous messages [{role: 'user'|'assistant', content: string}]
 * @param {string} model - AI model to use
 * @returns {Promise<Object>} - Response with AI message
 */
export async function sendChatMessage(message, history = [], model = 'GPT-4') {
    try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                model,
                history: history.map(msg => ({
                    role: msg.role,
                    content: msg.content
                }))
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to get response');
        }

        const data = await response.json();

        // Show notification if fallback model was used
        if (data.fallback_used) {
            console.warn(`Primary model unavailable. Using fallback: ${data.model_used}`);
        }

        return {
            success: true,
            response: data.response,
            model: data.model_used,
            tokens: data.tokens_used,
            fallback_used: data.fallback_used || false,
            // What OpenRouter actually charged, not an estimate from a price
            // table: it rides along on every response.
            usage: data.usage || null
        };
    } catch (error) {
        console.error('Chat API error:', error);
        return {
            success: false,
            error: error.message || 'Failed to connect to AI service'
        };
    }
}

/**
 * Get available AI models.
 * @returns {Promise<{models: Array, default: string}>}
 */
export async function getAvailableModels() {
    try {
        const response = await fetch(`${API_BASE_URL}/models`);

        if (!response.ok) {
            throw new Error('Failed to fetch models');
        }

        const data = await response.json();
        // Order is the backend's, grouped by tier, and it stays that way: the
        // picker draws a heading whenever the tier changes, so reordering to
        // float the default would print the same heading twice.
        return { models: data.models || [], default: data.default };
    } catch (error) {
        console.error('Models API error:', error);
        // Offline fallback. These have to be names the backend actually
        // knows, or every message fails once the API comes back.
        return {
            models: [
                { name: 'Mistral Nemo', description: 'Cheapest paid option, quick', provider: 'Mistral', tier: 'cheap' }
            ],
            default: 'Mistral Nemo'
        };
    }
}

/**
 * Check API health
 * @returns {Promise<boolean>} - True if API is healthy
 */
export async function checkAPIHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        return data.status === 'healthy';
    } catch (error) {
        console.error('Health check failed:', error);
        return false;
    }
}

/**
 * Legacy generate endpoint (backward compatibility)
 * @param {string} prompt - User prompt
 * @param {string} model - AI model
 * @returns {Promise<Object>} - Response
 */
export async function generateResponse(prompt, model = 'GPT-4') {
    try {
        const response = await fetch(`${API_BASE_URL}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, model }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate response');
        }

        return await response.json();
    } catch (error) {
        console.error('Generate API error:', error);
        throw error;
    }
}
