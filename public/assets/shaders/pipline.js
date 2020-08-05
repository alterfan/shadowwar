var Pipeline1 = new Phaser.Class({
    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
    initialize: function CustomPipeline1(game) {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: [
                "precision mediump float;",
                "uniform float     time;",
                "uniform vec2      resolution;",
                "uniform sampler2D uMainSampler;",
                "varying vec2 outTexCoord;",
                "#define PI 0.01",
                "void main( void ) {",
                "vec2 p = ( gl_FragCoord.xy / resolution.xy ) - 0.5;",
                "float sx = 0.2*sin( 25.0 * p.y - time * 5.);",
                "float dy = 2.9 / ( 20.0 * abs(p.y - sx));",
                "vec4 pixel = texture2D(uMainSampler, outTexCoord);",
                "gl_FragColor = pixel * vec4( (p.x + 0.5) * dy, 0.5 * dy, dy-1.65, pixel.a );",
                "}"
            ].join('\n')
        });
    }
});
var Pipeline2 = new Phaser.Class({
    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
    initialize: function CustomPipeline2(game) {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: `
            precision mediump float;
            uniform sampler2D uMainSampler;
            uniform float time;
            varying vec2 outTexCoord;
            varying vec4 outTint;
            #define SPEED 10.0
            void main(void)
            {
                float c = cos(time * SPEED);
                float s = sin(time * SPEED);
                mat4 hueRotation = mat4(0.299, 0.587, 0.114, 0.0, 0.299, 0.587, 0.114, 0.0, 0.299, 0.587, 0.114, 0.0, 0.0, 0.0, 0.0, 1.0) + mat4(0.701, -0.587, -0.114, 0.0, -0.299, 0.413, -0.114, 0.0, -0.300, -0.588, 0.886, 0.0, 0.0, 0.0, 0.0, 0.0) * c + mat4(0.168, 0.330, -0.497, 0.0, -0.328, 0.035, 0.292, 0.0, 1.250, -1.050, -0.203, 0.0, 0.0, 0.0, 0.0, 0.0) * s;
                vec4 pixel = texture2D(uMainSampler, outTexCoord);
                gl_FragColor = pixel * hueRotation;
            }   
            `
        });
    }
});
var Vignette = new Phaser.Class({
    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
    initialize: function Vignette(game) {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: `
				precision mediump float;
                uniform vec2  resolution;
                uniform float tx;
                uniform float ty;
                uniform float r;
				uniform float b;
				uniform float bright;
				uniform float bgred;
				uniform float bggreen;
				uniform float bgblue;
				uniform float red;
				uniform float green;
				uniform float blue;
                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;
                vec3 makeCircle(vec2 st,vec2 center, vec3 col){
                    float d = distance(st,center);
                    float pct = smoothstep(r,r+b,d);
                    return vec3(1.0-pct*red,1.0-pct*green, 1.0-pct*blue)*col*bright;
                } 
                void main(void) {
                    vec2 st = vec2(gl_FragCoord.x/resolution.x,gl_FragCoord.y/resolution.y);
                    vec4 color = texture2D(uMainSampler, outTexCoord);
					vec4 beforeColor = color*vec4(makeCircle(st,vec2(tx,ty),vec3(1.0)),1.0);
                    gl_FragColor = vec4 (beforeColor.x*bgred, beforeColor.y*bggreen, beforeColor.z*bgblue, beforeColor.w);
                }
				`
        });
        /*
				regular:
				precision mediump float;
                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;
                void main(void) {
                vec4 color = texture2D(uMainSampler, outTexCoord);
                float gray = dot(color.rgb, vec3(0.5, 1, 1));
				vec3 test = vec3(gray);
				vec3 hi = test.yyx;
                gl_FragColor = vec4(color.x * 1.0, color.y * 1.0, color.z * 1.0, 1);
                }`
				vignette:
				void main(void) {
                    vec2 st = vec2(gl_FragCoord.x/resolution.x,gl_FragCoord.y/resolution.y);
                    vec4 color = texture2D(uMainSampler, outTexCoord);
					vec3 beforeColor = color*vec4(makeCircle(st,vec2(tx,ty),vec3(1.0)),1.0);
                    gl_FragColor = color*vec4(makeCircle(st,vec2(tx,ty),vec3(1.0)),1.0);
                }
	*/
    }
})
export {
    Pipeline1,
    Pipeline2,
    Vignette
}
