import { IncomingMessage, RequestListener, ServerResponse } from "http";

export interface Context {
  readonly req: IncomingMessage;
  readonly res: ServerResponse;
  reqBody?: any;
  body?: string | object;
  status?: number;
}

export type ContextUpdate<T extends Context> = Partial<Omit<T, "req">>;

export interface ServerFnsOpts {
  dev: boolean;
}

export type Middleware<T extends Context, U extends T> = (
  ctx: T,
) => Promise<ContextUpdate<U> | void | null> | ContextUpdate<U> | void | null;

export interface Use<T extends Context> {
  (): Slim<T>;
  <A extends T>(m1: Middleware<T, A>): Slim<A>;
  <A extends T, B extends A>(m1: Middleware<T, A>, m2: Middleware<A, B>): Slim<
    B
  >;
  <A extends T, B extends A, C extends B>(
    m1: Middleware<T, A>,
    m2: Middleware<A, B>,
    m3: Middleware<B, C>,
  ): Slim<C>;
  <A extends T, B extends A, C extends B, D extends C>(
    m1: Middleware<T, A>,
    m2: Middleware<A, B>,
    m3: Middleware<B, C>,
    m4: Middleware<C, D>,
  ): Slim<D>;
  <A extends T, B extends A, C extends B, D extends C, E extends D>(
    m1: Middleware<T, A>,
    m2: Middleware<A, B>,
    m3: Middleware<B, C>,
    m4: Middleware<C, D>,
    m5: Middleware<D, E>,
  ): Slim<E>;
  <
    A extends T,
    B extends A,
    C extends B,
    D extends C,
    E extends D,
    F extends E
  >(
    m1: Middleware<T, A>,
    m2: Middleware<A, B>,
    m3: Middleware<B, C>,
    m4: Middleware<C, D>,
    m5: Middleware<D, E>,
    m6: Middleware<E, F>,
  ): Slim<F>;
  <
    A extends T,
    B extends A,
    C extends B,
    D extends C,
    E extends D,
    F extends E,
    G extends F
  >(
    m1: Middleware<T, A>,
    m2: Middleware<A, B>,
    m3: Middleware<B, C>,
    m4: Middleware<C, D>,
    m5: Middleware<D, E>,
    m6: Middleware<E, F>,
    m7: Middleware<F, G>,
  ): Slim<G>;
  <
    A extends T,
    B extends A,
    C extends B,
    D extends C,
    E extends D,
    F extends E,
    G extends F,
    H extends G
  >(
    m1: Middleware<T, A>,
    m2: Middleware<A, B>,
    m3: Middleware<B, C>,
    m4: Middleware<C, D>,
    m5: Middleware<D, E>,
    m6: Middleware<E, F>,
    m7: Middleware<F, G>,
    m8: Middleware<G, H>,
  ): Slim<H>;
  <
    A extends T,
    B extends A,
    C extends B,
    D extends C,
    E extends D,
    F extends E,
    G extends F,
    H extends G,
    I extends H
  >(
    m1: Middleware<T, A>,
    m2: Middleware<A, B>,
    m3: Middleware<B, C>,
    m4: Middleware<C, D>,
    m5: Middleware<D, E>,
    m6: Middleware<E, F>,
    m7: Middleware<F, G>,
    m8: Middleware<G, H>,
    m9: Middleware<H, I>,
  ): Slim<I>;
  <
    A extends T,
    B extends A,
    C extends B,
    D extends C,
    E extends D,
    F extends E,
    G extends F,
    H extends G,
    I extends H,
    J extends I
  >(
    m1: Middleware<T, A>,
    m2: Middleware<A, B>,
    m3: Middleware<B, C>,
    m4: Middleware<C, D>,
    m5: Middleware<D, E>,
    m6: Middleware<E, F>,
    m7: Middleware<F, G>,
    m8: Middleware<G, H>,
    m9: Middleware<H, I>,
    m10: Middleware<I, J>,
  ): Slim<J>;
}

export type Slim<T extends Context = Context> = RequestListener & {
  use: Use<T>;
};
