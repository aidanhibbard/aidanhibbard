---
title: 'Using Event Target for TypeSafe Pub/Sub'
desc: 'Learn how to secretly mount a .npmrc in your docker image to avoid leaking keys.'
publishedAt: 07-15-24
lastEditedAt: 07-15-24
img: 'images/articles/using-event-target-for-pub-sub/index.png'
tags:
  - 'Tutorial'
  - 'Docker'
  - 'Google Cloud Build'
  - 'npm'
---

## [Background]{.block .mb-6 .prose .prose-xl .text-gray-900 .h-full .hover:text-green-300 .transition .duration-50 .no-underline}

::article-paragraph

::

::code-block
```ts
store.listen('stateKey', (event) => {}, options?);
```
::

The user should be able to pick a store key with type inference, listen to a custom event, and additionally be able to pass listener options.

## [Architecture]{.block .mb-6 .prose .prose-xl .text-gray-900 .h-full .hover:text-green-300 .transition .duration-50 .no-underline}

Because Olallie is a state mechanism we'll be implementing a service with this functionality.

1. Service updates a value in the state 
2. Store dispatches a custom event
3. Listeners receive the event

### [How would this work in code?]{.block .mb-6 .prose .prose-xl .text-gray-900 .h-full .hover:text-green-300 .transition .duration-50 .no-underline}

- Defining a single [event target](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) for the store will allow custom events to be dispatched.

- Using a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) in front of the stores state will give access to the [set trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set).

- In the set trap provided by the proxy, the store can dispatch custom events for a given state key value pair.

- The store can expose a single listen method to add an event listener to the target.

### [Defining the Store Event]{.block .mb-6 .prose .prose-xl .text-gray-900 .h-full .hover:text-green-300 .transition .duration-50 .no-underline}

Before diving into functional code, starting with some types to outline usage will be important.

When a keys value is updated in the state, the store should dispatch an event with the current, and old value.

By extending the [Custom Event](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) a custom Store Event interface can be made.

::code-block
```ts
interface StoreEvent<S, K extends keyof S> extends CustomEvent {
  detail: {
    value: S[K];
    oldValue: S[K];
  };
}
```
::

Given what's known from the specification, the type takes the state object `(S)`, and a key of `(S)` to infer the specific value type with.

A custom event stores its information in the [detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) property so the current, and oldValue will be passed through there.

### [Creating the Store types]{.block .mb-6 .prose .prose-xl .text-gray-900 .h-full .hover:text-green-300 .transition .duration-50 .no-underline}

Now that the shape of the event is known, building the stores type definitions should be pretty simple.

#### [Store Options Interface]{.block .mb-6 .prose .prose-xl .text-gray-900 .h-full .hover:text-green-300 .transition .duration-50 .no-underline}

The createStore method will take a single object as a param, and for now only a state key will be added. Here's a simple interface to guide the user in setting up their store.

::code-block
```ts
interface StoreOptions<S extends object> {
  state: S;
}
```
::

#### [Store Type]{.block .mb-6 .prose .prose-xl .text-gray-900 .h-full .hover:text-green-300 .transition .duration-50 .no-underline}

The store type will be a little more complex, the user needs to be able to access the state values from the store itself, while also defining the listen method.

::code-block
```ts
type Store<S extends object> = S & {
    listen<K extends keyof S>(
      key: K,
      callback: (event: StoreEvent<S, K>) => void,
      options?: AddEventListenerOptions | boolean,
    ): { unlisten: () => void };
  }
```
::

The listen method as specified earlier will need a key of the state to listen for changes.

It will take a callback method that's passed the custom StoreEvent holding the values in the event details.

Since listeners use [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) under the hood, event listener options can also be passed if needed.

The listener will provide a direct `unlisten()` method calling [`removeEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) on the event target.

## [Functional code]{.block .mb-6 .prose .prose-xl .text-gray-900 .h-full .hover:text-green-300 .transition .duration-50 .no-underline}

Now that all the type definitions are in place, it will be simple to setup a `createStore` util that follows the specification.

#### [Store method]{.block .mb-6 .prose .prose-xl .text-gray-900 .h-full .hover:text-green-300 .transition .duration-50 .no-underline}

The createStore method will only need to take the state `S` as a type, and the StoreOptions as its params, before returning a Store instance.

::code-block
```ts
function createStore<S extends object>(
  options: StoreOptions<S>,
): Store<S> {};
```
::

#### [Creating state, and event target]{.block .mb-6 .prose .prose-xl .text-gray-900 .h-full .hover:text-green-300 .transition .duration-50 .no-underline}

Now that the store has a state that can be accessed in the options, a new proxy, and event target can be instantiated.

::code-block
```ts
function createStore<S extends object>(
  options: StoreOptions<S>,
): Store<S> {
  const target = new EventTarget();

  const state = new Proxy(options.state, {
    // (param) obj: S
    // (param) prop: string | symbol
    // (param) value: any
    set(obj, prop, value) {
      // Cast the prop as a keyof S
      const stateKey = prop as keyof S;
      // Grab the old value
      const oldValue = obj[stateKey];
      // Set the new value
      obj[stateKey] = value;
      // Dispatch the event
      target.dispatchEvent(
        new CustomEvent(prop as string, {
          detail: {
            value,
            oldValue,
          } as StoreEvent<S, typeof stateKey>['detail'],
        }),
      );
      // Set must return a boolean
      return true;
    },
  });

  // Create the store
  const store = Object.assign(state) as Store<S>;

  return store;
};
```
::

#### [Creating the listen method]{.block .mb-6 .prose .prose-xl .text-gray-900 .h-full .hover:text-green-300 .transition .duration-50 .no-underline}

Following the type definition that was created for the listen method earlier, it's fairly simple to implement but there's a couple caveats.

::code-block
```ts
...
  // Assign state to the store
  const store = Object.assign(state) as Store<S>;

  store.listen = <K extends keyof S>(
    key: K,
    callback: (event: StoreEvent<S, K>) => void,
    options?: AddEventListenerOptions | boolean,
  ) => {
    target.addEventListener(key as string, callback as EventListener, options);
    return {
      unlisten: () => {
        target.removeEventListener(
          key as string,
          callback as EventListener,
          options,
        );
      },
    };
  };

  return store;
...
```
::

Add, and remove event listener methods [expect an `Event` to be passed in callbacks](https://stackoverflow.com/a/47171216). Using `as EventListener` will suffice here.