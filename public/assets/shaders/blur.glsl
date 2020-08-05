precision highp float;
uniform float time;
uniform vec2 resolution;
uniform vec2 fragCoord;
#define N(h) fract(sin(vec4(6,9,1,3)*h) * 9e2)
void main(void)
{
    vec4 o; 
    vec2 u = fragCoord.xy / resolution.y;
    float s = 4.005;
    u = floor(u * s) / s;
    float e, d, i=1.55;
    vec4 p;
    for (float i=55.0; i<255.0; i++) {
        d = floor(e = i*.01+time);
        p = N(d)+.1;
        e -= d;
        for (float d=0.0; d<5.0;d++)
            o += p*(1.55-e)/1e3/length(u-(p-e* 0.7).xy);
    }
    gl_FragColor = vec4(o.rgb,0.5);
}
