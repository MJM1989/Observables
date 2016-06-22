import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()

export class DataService {
    constructor(private _http: Http) {}

    // A standard http request will return an Observable which will emit a single {@link Response} when a
    // response is received. The Observable is therefore like a publisher that only publishes one newspaper.

    // But for @angular's http requests this is limited to one.

    // This is how a http request is put up in @Angular: (url, body, headers?). Headers are optional but tell the
    // dataserver what kind of information it is receiving.
    postData(data: any): Observable<any> {
        const body = JSON.stringify(data);
        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this._http.post('https://burning-heat-5095.firebaseio.com/data.json',body,{headers: headers})
            .map(response => response.json());
    }

    // let's look more closely at the use of Observables with http requests.

    // Standard http requests return the entire server's response, including the url
    // to the Observable. Get the posts from the database with the button and look at the response.
    // Obviously, it is not save to send the url to the client, who only needs to know the data, not the source
    // getData(): Observable<any> {
    //     return this._http.get('https://burning-heat-5095.firebaseio.com/data.json');
    // }


    // Just like a newspaper publisher does not reveal its source, we can use the map method on the observable
    // to hide our own source. We therefore only publish the json object in the response. This map method can probably
    // be considered best practice.
    getData(): Observable<any> {
        return this._http.get('https://burning-heat-5095.firebaseio.com/data.json').map(response => response.json());
    }

    // Another way to limit the information we send is to only publish the ._body of the response. Note in the console
    // that we then get a string and not an object.
    // getData(): Observable<any> {
    //     return this._http.get('https://burning-heat-5095.firebaseio.com/data.json').map(response => response._body);
    // }

    // Thus we know how to use the observable object for the http requests. At the app component page we can subscribe
    // to the observable in the same way that we have done in the beginning.

}