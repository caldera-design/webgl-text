
import Program, { WebGLTypes, ProgramParams } from 'gl-program';

import glyphFragmentShader from './shaders/glyph.frag';
import glyphVertexShader from './shaders/glyph.vert';
import { triangulate, getGlyphVertices } from './Util';

type RenderParams = {
    text: string;
    fontFamily: string;
    fontSize: number;
    resolution: Size;
    size: Size;
    position: Vertex;
    center: Vertex;
    rotation: number;
};

const program: ProgramParams = {
  fragmentShaderSource: glyphFragmentShader,
  vertexShaderSource: glyphVertexShader,
  uniforms: {
      resolution: {
          type: WebGLTypes.Vec2
      },
      rotation: {
          type: WebGLTypes.Float
      },
      center: {
          type: WebGLTypes.Vec2
      }
  },
  attributes: {
      position: {
          type: WebGLTypes.Vec2
      }
  }
};

export default class WebGLTextProgram extends Program {
    constructor(gl: WebGLRenderingContext) {
      super(gl, program);
    }

    public render({ text, fontFamily, position, rotation, center, fontSize, resolution, size }: RenderParams) {
        const triangles = triangulate({ text, fontFamily, position, fontSize, size, rotation, center });
        if (!triangles.length) {
            return;
        }
        const vertices = getGlyphVertices(triangles);
        if (!vertices || !vertices.length) {
            return;
        }
        const { width, height } = resolution;
        this.begin();
        this.setUniform('resolution', new Float32Array([width, height]));
        this.setUniform('center', new Float32Array([center.x, center.y]));
        this.setUniform('rotation', rotation);
        this.setAttribute('position', vertices);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, vertices.length / 2);
        this.end();
    }
}
