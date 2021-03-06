
import { throwError } from 'rxjs';

export class HttpJsonService {

    get baseApi() {
        return 'http://localhost:3789';
    }

    get baseReports() {
        return '/api/reports';
    }

    protected extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    protected handleError(error: any) {
        try {
            error.message = error.json().message;
        } catch (e) {
            console.warn('Unable to convert error response to Json');
        }

        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        return throwError(errMsg);
    }

    protected buildSearchParams(params: {}) {
        let urlParams = new URLSearchParams();
        for (let key in params) {
            urlParams.set(key, params[key]);
        }
        return urlParams;
    }

}