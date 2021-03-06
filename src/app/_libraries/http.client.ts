import { Injectable } from '@angular/core';
import { Response, RequestOptionsArgs } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpClient {
    apiUrl: string;

    constructor(
        private http: AuthHttp
    ) {
        this.apiUrl = process.env.apiUrl;
    }

    get(url, options?: RequestOptionsArgs) {
        return this.http.get(this.apiUrl + url, options).map((response: Response) => response.json());
    }

    post(url, data?: any, options?: RequestOptionsArgs) {
        return this.http.post(this.apiUrl + url, data, options).map((response: Response) => response.json());
    }
}