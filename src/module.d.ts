
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
    export type VectorizeTextParams = {
        triangles: boolean;
        textBaseline: string;
        textAlign: string;
        size: number;
        lineHeight: number;
        height: number;
        font: string;
    };

    export type Triangles = {
        cells: [[number, number, number]];
        positions: [[number, number]];
    };

    export default function vectorizeText(text: string, params: VectorizeTextParams): Triangles;
}

declare module '*.frag' {
  const content: any;
  export default content;
}

declare module '*.vert' {
  const content: any;
  export default content;
}

type Vertex = {
    x: number;
    y: number;
};

type Size = {
    width: number;
    height: number;
};
