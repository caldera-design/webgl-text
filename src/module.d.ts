
declare function require(path: string): string;

declare module 'gl-program' {

    export type WebGLTypeName = 'FLOAT';

    export type WebGLType = {
        type: WebGLTypeName;
        size: number;
    };

    export const WebGLTypes: { [key: string]: WebGLType };

    export type UniformParams = {
        type: WebGLType;
    };

    export type AttributeParams = {
        type: WebGLType;
    };

    export type ProgramParams = {
        fragmentShaderSource: string;
        vertexShaderSource: string;
        uniforms: { [key: string]: UniformParams };
        attributes: { [key: string]: AttributeParams };
    };

    export default class Program {
        protected gl: WebGLRenderingContext;

        constructor(gl: WebGLRenderingContext, params: ProgramParams);

        public begin(): void;
        public end(): void;
        public setAttribute(name: string, attributeData: Float32Array | number): void;
        public setUniform(name: string, uniformData: Float32Array | number): void;
    }
}

declare module 'vectorize-text' {
    type VectorizeTextParams = {
        triangles: boolean;
        textBaseline: string;
        textAlign: string;
        size: number;
        lineHeight: number;
        height: number;
        font: string;
    };

    type Triangles = {
        cells: [[number, number, number]];
        positions: [[number, number]];
    };

    function vectorizeText(text: string, params: VectorizeTextParams): Triangles;

    export = vectorizeText;
}

declare module '*.frag' {
  const content: string;
  export = content;
}

declare module '*.vert' {
  const content: string;
  export = content;
}

type Vertex = {
    x: number;
    y: number;
};

type TriangleVertices = [Vertex, Vertex, Vertex];

type Size = {
    width: number;
    height: number;
};
