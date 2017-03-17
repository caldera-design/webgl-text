A decorator for providing dimensions to React components
---------------

Installation
============
Use [npm](https://www.npmjs.com/) to install:
```bash
npm install provide-dimensions
```

Usage
============

```js
import React, { PropTypes, Component } from 'react';
import provideDimensions from 'provide-dimensions';

@provideDimensions
export default class MyComponent extends Component {

    static propTypes = {
        dimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number
        }).isRequired
    }

    render() {
        const { width, height } = this.props.dimensions;
        return (
            <div style={{ width, height }} />
        );
    }
}
```

Copyright and License
============
Code and documentation copyright 2017 Jon Brennecke. Code released under the MIT license. Docs released under Creative Commons.
