import axios from 'axios';
import type { InfoJobsResponse } from '../models/infojobs';
import { INFOJOBS_KEY, INFOJOBS_URL } from '$env/static/private';

export class InfojobsService {
	private readonly INFOJOBS_URL   = INFOJOBS_URL;
    private readonly INFOJOBS_KEY   = INFOJOBS_KEY;

    #getQueryParams( params: string ) {
        const queryParams = new URLSearchParams(params.split('?')[1]);
        return queryParams;
    }

    getOffers() {
        const url = `${this.INFOJOBS_URL}9/offer`;
        return this.#getService<InfoJobsResponse>( url );
    }

    getOffersByCategory( url: string ) {
        const queryParams   = this.#getQueryParams( url );
        const url_          = `${this.INFOJOBS_URL}7/offer?${queryParams}`;
        return this.#getService<InfoJobsResponse>( url_ );
    }

	async #getService<T>( endPoint: string ) {

        const headers = {
            'Content-Type'  : 'application/json',
            Accept          : 'application/json',
            Authorization   : this.INFOJOBS_KEY,
        };

        const response  = await axios.get<T>(endPoint, { headers });
		return await response.data;
	}
}