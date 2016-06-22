import {Component} from '@angular/core';
import {DataService} from "./data.service";
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'my-app',
    template: `
       <b>Angular 2 Component Using Observables!</b>
	 
	  <h6 style="margin-bottom: 0">VALUES:</h6>
	  <div *ngFor="let value of values">- {{ value }}</div>
	  
	  <h6 style="margin-bottom: 0">ERRORs:</h6>
	  <div>Errors: {{anyErrors}}</div>
	  
	  <h6 style="margin-bottom: 0">FINISHED:</h6>
	  <div>Finished: {{ finished }}</div>
	  
	  <button style="margin-top: 2rem;" (click)="init()">Init</button>
	  
	  <h4>Observables with http</h4>
        <div>
            <label for="title">Title</label>
            <input type="text" id="title" #title>
        </div>
        <div>
            <label for="body">Body</label>
            <input type="text" id="body" #body>
        </div>
        <div>
            <label for="user-id">User ID</label>
            <input type="text" id="user-id" #userId>
        </div>
        <button (click)="onPost(title.value, body.value, userId.value)">Post Data</button>
        <button (click)="onGetPosts()">Get all Posts</button>
        <p>Response: {{response}}</p>
    `,
    providers: [DataService]
})
export class AppComponent {
    response: string;
    private data:Observable<Array<number>>;
    private dataTwo:Observable<Array<number>>;
    private allData:Observable<Array<number>>;
    private values:Array<number> = [];
    private anyErrors:boolean;
    private finished:boolean;

    // In ths small application we want to explain Observables a little bit. 

    // An Observable is an object from the Rxjs library which can represent a stream of data. We don't have to keep
    // asking for the data to see if any new data is available, instead we will be notified when there is an update

    // Think of Observables as newspaper-publishers. If we want information from the publisher then we don't call them
    // to ask if there is any news. We simply subscribe to the newspaper and whenever there is news, the publisher sends
    // us the new paper.

    // IMPORTANT: The Observable stands for the publisher. Not the newspaper. It represents the stream of data not just
    // any instance of data sent.
    init() {
        // Below we create a new Observable called data. It sends out two pieces of data after 1 resp. 2 seconds and
        // completes after 3 seconds.
        this.data = new Observable(observer => {
            setTimeout(() => {
                observer.next(42);
            }, 1000);

            setTimeout(() => {
                observer.next(43);
            }, 2000);

            setTimeout(() => {
                observer.complete();
            }, 3000);
        });

        // Right now the Observable does nothing! There is no subscription. A newspaper without readers is not printed.

        // When we subscribe to the Observable it gives us three methods to work with: onNext, onError and onComplete.
        // onNext is called for every new value that the Observable emits.

        // Uncomment these lines to subscribe and press the init button:
        // let subscription = this.data.subscribe(
        //     value => this.values.push(value),
        //     error => this.anyErrors = true,
        //     () => this.finished = true
        // );

        // It is possible to unsubscribe from the Observable before all the information is received. Other subscribes
        // will still receive the information requested
        // setTimeout(() => subscription.unsubscribe(), 1500);

        // That is basically how the Observable works: representing a stream of data to which we can subscribe
        // and unsubscribe at any time we wish. Go to the data service file to see how we use observables with http

    }

    
    constructor(private _dataService: DataService) {}

    onPost(title: string, body: string, userId: string) {
        const data = {
            title: title,
            body: body,
            userId: userId
        };
        
        this._dataService.postData(data).subscribe(
            data => this.response = JSON.stringify(data),
            error => console.error(error)
        );
    }

    onGetPosts() {
        this._dataService.getData().subscribe(
            data => {
                console.info("Data received by subscription: ");
                console.info(data);
                console.info("This data is of type: " + typeof data);
                this.response = JSON.stringify(data);
            },
            error => console.error(error)
        );
    }
}