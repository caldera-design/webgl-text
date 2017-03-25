
import Program, { WebGLTypes, ProgramParams } from 'gl-program';

import * as glyphFragmentShader from '../shaders/glyph.frag';
import * as glyphVertexShader from '../shaders/glyph.vert';
import { triangulate, getGlyphVertices } from './Util';

type RenderParams = {
    position: Vertex;
    resolution: Size;
    center: Vertex;
    rotation: number;
};

type SetTextParams = {
    text: string;
    fontFamily: string;
    fontSize: number;
    textAlign: string;
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

export default class WebGLText extends Program {

    private triangles: [TriangleVertices] = <[TriangleVertices]>[];

    constructor(gl: WebGLRenderingContext) {
      super(gl, program);
    }

    public setText({ text, fontFamily, fontSize, textAlign }: SetTextParams) {
        const triangles = triangulate({ text, fontFamily, fontSize, textAlign });
        if (!triangles.length) {
            return;
        }
        this.triangles = triangles;
    }

    public render({ position, rotation, center, resolution }: RenderParams) {
        const { triangles } = this;
        if (!triangles || !triangles.length) {
            return;
        }
        const vertices = getGlyphVertices(triangles, position);
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
