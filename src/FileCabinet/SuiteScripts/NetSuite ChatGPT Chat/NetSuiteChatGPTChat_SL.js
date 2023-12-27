/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/https', 'N/error', 'N/log'],

    (https, error, log) => {

        const OPENAI_API_KEY = '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';
        const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
        const SYSTEM_PROMPT = 'You are a NetSuite assistant, skilled in NetSuite concepts with creative flair.'
        const APP_NAME = 'NetSuite Chat GPT SL'

        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            const query = scriptContext.request.parameters.query;
            let responseJSON = {};

            try {
                const response = https.post({
                    url: OPENAI_API_URL,
                    headers: getHeaders(),
                    body: JSON.stringify(buildPrompt(query))
                });

                log.debug({
                    title: APP_NAME,
                    details: 'OpenAI response: ' + response.body
                })

                responseJSON = JSON.parse(response.body);
            } catch (e) {
                throw new error.create({
                    name: 'INVALID_PARAMETER',
                    message: 'Unable to parse response body: ' + e.message,
                    notifyOff: false
                });
            }

            scriptContext.response.write(JSON.stringify(parseOpenAIResponse(responseJSON)));
        }

        const parseOpenAIResponse = (response) => {
            const result = {
                reply: 'Sorry, ChatGPT is currently unavailable. Please try again later.'
            }
            if(!response) return result;

            if(response.hasOwnProperty('choices')) {
                if(response['choices'][0] !== 'undefined') {
                    result.reply = response['choices'][0].message.content;
                    return result;
                }
            }

            log.debug({
                title: APP_NAME,
                details: 'Unable to parse OpenAI response.'
            });

            return result;
        }

        const buildPrompt = (query) => {
            return {
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "system",
                        "content": SYSTEM_PROMPT
                    },
                    {
                        "role": "user",
                        "content": query
                    }
                ]
            }
        }

        const getHeaders = () => {
            return {
                'Authorization': 'Bearer ' + OPENAI_API_KEY,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        return {onRequest}

    });
