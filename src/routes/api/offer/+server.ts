import { InfojobsService } from '../../../service/infojobs';

export const GET = async () => {

    const infoJobs  = new InfojobsService();
    const data      = await infoJobs.getOffers();
    const body      = JSON.stringify({ data, status: 200 });

    return new Response( body, { status: 200 });

};