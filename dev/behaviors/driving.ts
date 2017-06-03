///<reference path="behavior.ts"/>

class Driving implements Behavior {

    // Constant variables (Keyboard movement)
    private readonly moveUp: string = "ArrowUp";
    private readonly moveDown: string = "ArrowDown";
    private moveSpeedY: number = 0;

    // Classes
    public player: Player;

    constructor(p: Player) {
        this.player = p;

        // Listen to keyboard input
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        // When you release key, It sets moveSpeed to 0
        window.addEventListener("keyup", () => this.onKeyUp());
    }

    public execute() {
        // Temporary variable to calculate Y position
        let position: number;
        position = this.player.getY() + this.getMoveSpeedY();

        // Set first/new Y Position
        this.player.setY(position);

        // Draw position of the player in container
        this.player.draw()
    }

    private onKeyDown(e: KeyboardEvent): void {
        //TODO: Check that car doesn't move out the container.
        // Check which button is pressed.
        if (e.key === this.moveUp && this.player.behavior instanceof Driving) {
            this.setMoveSpeedY(-5);
        } else if (e.key === this.moveDown && this.player.behavior instanceof Driving) {
            this.setMoveSpeedY(5);
        } else {
            // If none of them, exit function
            return;
        }
    }

    private onKeyUp(): void {
        this.setMoveSpeedY(0);
    }

    private crashed() {
        window.removeEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        this.player.behavior = new Crashed(this.player);
    }

    // Getter & Setters
    public getMoveSpeedY(): number {
        return this.moveSpeedY;
    }

    public setMoveSpeedY(s): void {
        this.moveSpeedY = s;
    }
}