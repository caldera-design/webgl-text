WebGL Text
---------------

Write text onto a WebGL canvas 🔥

Installation
============
Use [npm](https://www.npmjs.com/) to install:
```bash
npm install webgl-text
```

Example
============

The example uses [`webgl-canvas`](https://www.npmjs.com/package/webgl-canvas), but this library can be used with any webgl canvas.

```typescript

import React, { Component } from 'react';
import { autobind } from 'core-decorators';

import WebGLCanvas from 'webgl-canvas';
import WebGLText from 'webgl-text';
import provideDimensions from 'provide-dimensions';

type Dimensions = {
    width: number;
    height: number;
};

type AppProps = {
    children?: undefined;
    dimensions: Dimensions;
};

type AppState = {};

@provideDimensions
@autobind
export default class Page extends Component<AppProps, AppState> {

    public props: AppProps;

    private text: WebGLText;

    private onSceneInitialized(gl: WebGLRenderingContext) {
        this.text = new WebGLText(gl);
        this.text.setText({
            text: 'Hello World!',
            fontFamily: 'sans-serif',
            fontSize: 100
        });
    }

    private onSceneRender(gl: WebGLRenderingContext) {
        this.text.render({
            rotation: 0,
            position: { x: 50, y: 50 },
            center: { x: 100, y: 100 },
            resolution: this.props.dimensions,
            size: { width: 300, height: 100 }
        });
    }

    public render() {
        const { width, height } = this.props.dimensions;
        return (
            <WebGLCanvas dimensions={{ width, height }}
                         onSceneInitialized={this.onSceneInitialized}
                         onSceneRender={this.onSceneRender} />
        );
    }
}
```

Copyright and License
============
Code and documentation copyright 2017 Jon Brennecke. Code released under the MIT license. Docs released under Creative Commons.
