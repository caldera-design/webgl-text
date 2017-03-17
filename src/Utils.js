
export function setVec2Uniform(gl, program, uniformName, value) {
    const uniformLocation = gl.getUniformLocation(program, uniformName);
    gl.uniform2fv(uniformLocation, value);
}

export function setFloatUniform(gl, program, uniformName, value) {
    const uniformLocation = gl.getUniformLocation(program, uniformName);
    gl.uniform1f(uniformLocation, value);
}

export function clearGlScene(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT);
}

export function bindAttributeData(gl, location, data, size, type = gl.FLOAT, dynamic = true) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW);
    gl.vertexAttribPointer(location, size, type, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

export function createShaderProgram(gl, vertexShaderSource, fragmentShaderSource) {
    const program = gl.createProgram();
    attachShaders(gl, program, vertexShaderSource, fragmentShaderSource);
    gl.linkProgram(program);
    const isLinked = gl.getProgramParameter(program, gl.LINK_STATUS);
    const isContextLost = gl.isContextLost();
    if (!isLinked && !isContextLost) {
        const infoLog = gl.getProgramInfoLog(program);
        console.error(infoLog);
        gl.deleteProgram(program);
        return;
    }
    return program;
}

export function attachShaders(gl, program, vertexShaderSource, fragmentShaderSource) {
    const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
    gl.attachShader(program, fragmentShader);
    gl.attachShader(program, vertexShader);
}

export function createShader(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const didCompile = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    const isContextLost = gl.isContextLost();
    if (!didCompile && !isContextLost) {
        const infoLog = gl.getShaderInfoLog(shader);
        console.error(infoLog);
        gl.deleteShader(shader);
        return;
    }
    return shader;
}
