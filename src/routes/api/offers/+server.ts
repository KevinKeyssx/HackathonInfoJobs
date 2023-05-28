import { InfojobsService } from '../../../service/infojobs';

export const GET = async ({request}: {request: Request}) => {

    const infoJobs  = new InfojobsService();
    const data      = await infoJobs.getOffersByCategory( request.url );
    const body      = JSON.stringify({ data, status: 200 });

    return new Response( body, { status: 200 });

};