import { ChatGPTService } from '../../../service/chatgpt';

export const GET = async ({request} : {request : Request}) => {

    const chatGPT   = new ChatGPTService();
    const data      = await chatGPT.createComplition( request.url );
    const response  = data.data.choices[0].text;
    const body      = JSON.stringify({ response, status: 200 });

    return new Response( body, { status: 200 });

};