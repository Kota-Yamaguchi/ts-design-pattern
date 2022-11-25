
//個人的には実用的だと思う書き方
const main=() => {
    // const service = new QuantumCalculationService();
     //DIするなら以下
     const service = new QuantumCalculationServiceDI(new Notificator());
    service.execute();
}

class QuantumCalculationService {
    execute(): void {
        const publisher: Publisher = new Publisher(new DFTCalculator());
        const observer1: Observer = new Notificator();
        const observer2: Observer = new SuperNotificator();

        publisher.addObserver(observer1);
        publisher.addObserver(observer2);

        publisher.notifyObservers();
        
    }
}
export class QuantumCalculationServiceDI {

    private readonly observer: Observer;
    constructor(observer: Observer){
        this.observer = observer;
    }
    execute(): void {
        const publisher: Publisher = new Publisher(new DFTCalculator());
        publisher.addObserver(this.observer);
        publisher.notifyObservers();
    }
}

export interface Observer {
    handlerEvent(event:Event): void
}

export class Notificator implements Observer {
    handlerEvent(event:Event): void{
        console.log("calculated "+ event.message)
    }
}
export class SuperNotificator implements Observer {
    handlerEvent(event:Event): void{
        console.log("super calculated "+ event.message)
    }
}
export class Publisher {
    observable: Observable;
    constructor(observable: Observable){
        this.observable=observable;
    }
    obserbers: Observer[] = []
    addObserver(observer: Observer): void {
        this.obserbers.push(observer)
    }
    notifyObservers(): void {
        const event = this.observable.execute();
        this.obserbers.map((observer)=>{
            observer.handlerEvent(event);
        })
    }
}

export interface Observable {
    execute():Event
}

export class Event {
    message: string;
    eventType: string;
    constructor(message: string, eventType:string){
        this.message=message;
        this.eventType=eventType;
    }
}
export class DFTCalculator implements Observable{

    execute(): Event {
        let sum =0
        for (let i=0; i<1000000; i++){
            sum+=1
        } 
        return new Event(sum.toString(), "DFTResult")
    }
    
}

main()