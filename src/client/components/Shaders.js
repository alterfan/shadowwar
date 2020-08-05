var Spotlight = new Phaser.Class({
    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
    initialize: function SpotlightPipeline(game) {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: `
                precision mediump float;
                uniform vec2  resolution;
                uniform float tx;
                uniform float ty;
                uniform float r;
                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;
                vec3 makeCircle(vec2 st,vec2 center, vec3 col){
                    float d = distance(st,center);
                    float pct = smoothstep(r,r+0.1,d);
                    return vec3(1.0-pct)*col;
                } 
                void main(void) {
                    vec2 st = gl_FragCoord.xy/resolution.xy;
                    vec4 color = texture2D(uMainSampler, outTexCoord);
                    gl_FragColor = color*vec4(makeCircle(st,vec2(tx,ty),vec3(1.0)),1.0);
                }
            `
        })
    }
});
var Blur = new Phaser.Class({
    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
    initialize:
        //https://github.com/mattdesl/lwjgl-basics/wiki/ShaderLesson5
        function Blur(game) {
            Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
                game: game,
                renderer: game.renderer,
                fragShader: [
                    "precision mediump float;",
                    //"in" attributes from our vertex shader
                    "varying vec4 outColor;",
                    "varying vec2 outTexCoord;",
                    //declare uniforms
                    "uniform sampler2D u_texture;",
                    "uniform float resolution;",
                    "uniform float radius;",
                    "uniform vec2 dir;",
                    "void main() {",
                    //this will be our RGBA sum
                    "vec4 sum = vec4(0.0);",
                    //our original texcoord for this fragment
                    "vec2 tc = outTexCoord;",
                    //the amount to blur, i.e. how far off center to sample from 
                    //1.0 -> blur by one pixel
                    //2.0 -> blur by two pixels, etc.
                    "float blur = radius/resolution;",
                    //the direction of our blur
                    //(1.0, 0.0) -> x-axis blur
                    //(0.0, 1.0) -> y-axis blur
                    "float hstep = dir.x;",
                    "float vstep = dir.y;",
                    //apply blurring, using a 9-tap filter with predefined gaussian weights",
                    "sum += texture2D(u_texture, vec2(tc.x - 4.0*blur*hstep, tc.y - 4.0*blur*vstep)) * 0.0162162162;",
                    "sum += texture2D(u_texture, vec2(tc.x - 3.0*blur*hstep, tc.y - 3.0*blur*vstep)) * 0.0540540541;",
                    "sum += texture2D(u_texture, vec2(tc.x - 2.0*blur*hstep, tc.y - 2.0*blur*vstep)) * 0.1216216216;",
                    "sum += texture2D(u_texture, vec2(tc.x - 1.0*blur*hstep, tc.y - 1.0*blur*vstep)) * 0.1945945946;",
                    "sum += texture2D(u_texture, vec2(tc.x, tc.y)) * 0.2270270270;",
                    "sum += texture2D(u_texture, vec2(tc.x + 1.0*blur*hstep, tc.y + 1.0*blur*vstep)) * 0.1945945946;",
                    "sum += texture2D(u_texture, vec2(tc.x + 2.0*blur*hstep, tc.y + 2.0*blur*vstep)) * 0.1216216216;",
                    "sum += texture2D(u_texture, vec2(tc.x + 3.0*blur*hstep, tc.y + 3.0*blur*vstep)) * 0.0540540541;",
                    "sum += texture2D(u_texture, vec2(tc.x + 4.0*blur*hstep, tc.y + 4.0*blur*vstep)) * 0.0162162162;",
                    //discard alpha for our simple demo,return
                    "gl_FragColor =  vec4(sum.rgb, 1.0);",
                    "}"
                ].join('\n')
            });
        }
});
export {
    Spotlight,
    Blur
}
