
import each from 'lodash/each';

import { bindAttributeData,
         setVec2Uniform,
         setFloatUniform,
         createShaderProgram } from './Utils';
import WebGLTypes from './WebGLTypes';

export default class Program {

    constructor(gl, options) {
        this.fragmentShaderSource = options.fragmentShaderSource;
        this.vertexShaderSource = options.vertexShaderSource;
        this.uniforms = options.uniforms;
        this.attributes = options.attributes;
        this.gl = gl;
        this.program = createShaderProgram(gl,
                                           this.vertexShaderSource,
                                           this.fragmentShaderSource);
        this.textures = {};
    }

    getFragmentShaderSource() {
        return this.fragmentShaderSource;
    }

    getVertexShaderSource() {
        return this.vertexShaderSource;
    }

    setUniform(name, value) {
        const uniform = this.uniforms[name];
        switch (uniform.type) {
            case WebGLTypes.Vec2:
                return setVec2Uniform(this.gl, this.program, name, value);
            case WebGLTypes.Float:
                return setFloatUniform(this.gl, this.program, name, value);
            default:
                console.error(`Uniform type ${JSON.stringify(uniform.type)}
                               is unimplemented.`);
        }
    }

    setAttribute(name, value) {
        const attribute = this.attributes[name];
        const { type, size } = attribute.type;
        const attribLocation = this.getAttributeLocation(name);
        return bindAttributeData(this.gl, attribLocation, value, size, this.gl[type]);
    }

    getAttributeLocation(name) {
        return this.gl.getAttribLocation(this.program, name);
    }

    setImageTexture(uniformName, image) {
        const gl = this.gl;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        // NOTE: use the following code for power-of-two textures (optimal case)
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        // gl.generateMipmap(gl.TEXTURE_2D);

        // NOTE: use the following code for non-power-of-two textues (non-optimal case)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.bindTexture(gl.TEXTURE_2D, null);
        this.textures[uniformName] = texture;
    }

    activateTextureUniform(uniformName) {
        const gl = this.gl;
        const texture = this.textures[uniformName];
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(gl.getUniformLocation(this.program, uniformName), 0);
    }

    begin() {
        this.gl.useProgram(this.program);
        each(this.attributes, (object, name) => {
            const attribLocation = this.gl.getAttribLocation(this.program, name);
            this.gl.enableVertexAttribArray(attribLocation);
        });
    }

    end() {
        each(this.attributes, (object, name) => {
            const attribLocation = this.gl.getAttribLocation(this.program, name);
            this.gl.disableVertexAttribArray(attribLocation);
        });
        this.gl.useProgram(null);
    }
}
