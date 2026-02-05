import OpenAI from 'openai';
import { prisma } from '../../lib/prisma.js';

const client = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.KEY,
});

const resumeAnalysisPrompt = ({
    resumeText,
    jdText
}) => `
You are an ATS resume analyzer.

Compare the resume with the job description and return ONLY JSON:

{
  "matchScore": number (0-100),
  "strengths": string,
  "weaknesses": string,
  "suggestions": string
}

Resume:
${resumeText}

Job Description:
${jdText}
`;

const apiResponse = async (prompt) => {
    const apiRes = await client.chat.completions.create({
        model: 'openai/gpt-oss-120b:free',
        messages: [
            {
                role: 'user',
                content: prompt,
            },
        ],
        reasoning: { enabled: true }
    });

    return apiRes.choices[0].message;
}

export const generateAnalysis = async (resume, job) => {
    const prompt = resumeAnalysisPrompt({ resumeText: resume.text, jdText: job.description });
    const response = await apiResponse(prompt,)
    return JSON.parse(response.content)
}
export const getExistAnalysis = async (resumId, JobId) => {
    return await prisma.analysis.findMany({
        where: { resumeId, jobId },
        orderBy: { createdAt: 'desc' },
    })
}

export const createAnalysis = async (userId, resumeId, jobId, aiResult) => {
    return await prisma.analysis.create({
        data: {
            userId,
            resumeId,
            jobId,
            ...aiResult
        }
    })
}

export const getAnalysesByUser = async (userId) => {
    return await prisma.analysis.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    })
}