# Runner X

## Game

- Your goal is keep driving and earn points.
- Avoid the obstacles using your arrow keys (Up and Down)

Visit this <a href="https://ohsnapitskenny.github.io/RunnerX/dist/" target="_blank">website</a> to play the game.

## Installation
Do you to download the files and work on it yourself?

Run this code in your terminal: 

`
$ git clone https://github.com/ohsnapitskenny/runnerX
`

### Singleton
This one can be found in `game.ts`
```
class Game {
    private static gameInstance: Game;

    //Get Instance of game or create one (SingleTon)
    public static getInstance() {
        if (!Game.gameInstance) {
            Game.gameInstance = new Game();
        }
        return Game.gameInstance;
    }
}
 
// load game
window.addEventListener("load", function () {
    Game.getInstance();
});
```

### Strategy Pattern
This one can be found in `/behavoir` directory

This is the interface of Behavior
```
interface Behavior {
    player: Player;
    execute(): void;
}
```

There is a driving and crashing behavior. Here is the class Crashed which implements the Behavior interface 
```
///<reference path="behavior.ts"/>

class Crashed implements Behavior {
    
    public player: Player;
     
    constructor(p: Player) {
        this.player = p;
    }

    public execute() {
        ...
    }
}
```

### Observable / Observer Pattern
This one can be found in `/observers` directory
 
You can find two interfaces in this directory. Here are the interfaces Observable & Observer

### Observable interface + Object that implements it
```
interface Observable {
    observers: Array<Observer>;

    subscribe(o: Observer): void;
    unsubscribe(o: Observer): void;
}
```

```
///<reference path="gameobject.ts"/>
///<reference path="../observers/observable.ts"/>
 
class Player extends GameObject implements Observable {
   
    public observers: Array<Obstacle>;
   
    constructor(parent: HTMLElement) {
        super("player", parent, 50, 250, 93, 99);
        this.kart = new Kart(this.div, 100, 250, 93, 99);

        // Initialize Array
        this.observers = new Array();
    }
 
    // Observable methods
    public subscribe(o: Observer): void {
        this.observers.push(o);
    }
 
    public unsubscribe(o: Observer): void {
        let i: number = this.observers.indexOf(o);
        if (i != -1) {
            this.observers.splice(i, 1);
        }
    }
}
```

### Observer interface + Object that implements it
```
interface Observer {
    notify(): void;
}
```

```
///<reference path="gameobject.ts"/>
///<reference path="../observers/observer.ts"/>
 
class Obstacle extends GameObject implements Observer {

    private kart: Kart;

    constructor(parent: HTMLElement, p: Player) {
        // Construct obstacle and add a kart
        super("obstacle", parent, Utils.getRandomInt(1000, 1200), Obstacle.obstacleY, 93, 99);
        this.kart = new Kart(this.div, 10, 0, 93, 99);

    }

    public notify(): void {
        this.div.classList.remove("toad");
        this.div.classList.add("toad_laugh");
        this.setSpeed(0);
    }
}
```

### Game Library (Howler.js)
`howler.js` is an audio library for the modern web. It defaults to Web Audio API and falls back to HTML5 Audio.

```
/// <reference types="howler" />

class Crashed implements Behavior {
 
    private sound: Howl;

    constructor(p: Player) {
        this.player = p;
 
        this.sound = new Howl({
            src:        ['assets/dead.mp3'],
            autoplay:   true,
            loop:       false
        });
}
```


### Others
Besides the three strategy patterns. I've also implemented the following items:
- Encapsulation --> `gameobject.ts`
- Composition --> `game.ts`
- Inheritance --> `player.ts` 
- Classes --> `gameobject.ts`
- Interfaces --> `behavior.ts`
- Abstract --> `gameobject.ts`
- Namespace --> `utils.ts`
- Polymorphism --> `gameobject.ts`
- Enum --> `driving.ts`
 

### UML
![RunnerX UML](https://github.com/ohsnapitskenny/RunnerX/blob/master/RunnerX.jpg)

### Peer review week 7
- Klasse diagram: Vereiste onderdelen zijn behandeld en worden weergegeven in het UML diagram. Verbinding tussen verschillende elementen en onderdelen zijn juist aangegeven.
- Encapsulation: Correct toegepast. Instanties kunnen alleen eigen waarden aanpassen. Gameobject heeft protected waarden die met Getters en Setters opgehaald kunnen worden.
- Singleton: Singleton principe toegepast in de game. De game gebruikt dit principe om te controleren op een instantie van Game.
- Observers: Correct toegepast. De obstacle instanties ‘luisteren’ naar de player instantie.
- Strategy patterns: Gebruikt in behaviours. Dit zijn ‘crashed’ en ‘driving’.
- Interfaces: Behavior is een interface voor de classes ‘crashed’ en ‘driving’. Ook de observer en observable zijn verwerkt als interfaces.
- Static: Static functies zijn toegepast in het ‘utils’ bestand. Die functies zijn gebruikt voor collision detection en om random integers te genereren.
- Namespaces: Utils is verwerkt als namespace. Deze bevat twee export classes; Game en Numbers.
- Enumerations: Enumerations zijn toegepast in de Driving class. Daarin wordt het principe gebruikt voor de key presses van de controls van het spel (Up en Down).
- Library: Howler.js. Deze library wordt gebruikt om geluidsfragmenten af te spelen. Dit wordt gebruikt wanneer de speler ‘crasht’. Er speelt dan een fragmentje af om aan te geven dat de speler gecrasht is.
- Gameloop: Dit wordt aangeroepen in de game file. Hierin wordt door een move functie aangeroepen voor de player class waardoor het spel start. Hier in wordt ook de game status gecheckt (game over: true of false).

Alle vereiste onderdelen zijn verwerkt in het project. Duidelijke code ondersteund door comments die de werking van onderdelen beschrijven. 
Read me file op Github is ook duidelijk uitgewerkt met uitleg over de vereiste principes. 
Netjes gebruikt gemaakt van get en set functies. 
De mappenstructuur is ook erg netjes en duidelijk verwerkt. 
Ik kon even geen punten vinden die ik zou aanpassen. Lekker gewerkt! 
