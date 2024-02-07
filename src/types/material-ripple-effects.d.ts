declare module 'material-ripple-effects' {
  interface Ripple {
    x: number;
    y: number;
    z: number;
  }

  class Ripple implements Ripple {
    create(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, color: 'dark' | 'light'): void;
  }

  export = Ripple;
}
