
//よく書籍とかに乗っているかきかた
const main=() => {
    const service = new QuantumCalculationService();
    service.execute();
}

class QuantumCalculationService {
    execute(): void {
        const publisher: Publisher = new DFTCalculator();
        const observer1: Observer = new Notificator();
        const observer2: Observer = new SuperNotificator();

        publisher.addObserver(observer1);
        publisher.addObserver(observer2);

        const result =publisher.execute();
        console.log(result)
    }
}


export interface Observer {
    handlerEvent(): void
}

export class Notificator implements Observer {
    handlerEvent(): void{
        console.log("calculated")
    }
}
export class SuperNotificator implements Observer {
    handlerEvent(): void{
        console.log("super calculated")
    }
}
export abstract class Publisher {
    obserbers: Observer[] = []
    addObserver(observer: Observer): void {
        this.obserbers.push(observer)
    }
    notifyObservers(): void {
        this.obserbers.map((observer)=>{
            observer.handlerEvent();
        })
    }
    abstract execute(): number
}
export class DFTCalculator extends Publisher{

    private result: number =0 
    execute(): number {
        let sum =0
        for (let i=0; i<1000000; i++){
            sum+=1
        }
        this.result = sum;
        this.notifyObservers();
        return this.result;
    }
    
}

main()