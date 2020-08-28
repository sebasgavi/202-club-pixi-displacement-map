const app = new PIXI.Application({
  width: window.innerWidth, height: window.innerHeight, backgroundColor: 0,
});
document.body.appendChild(app.view);

app.stage.interactive = true;

const container = new PIXI.Container();
app.stage.addChild(container);

/**
 * init source image
 */
const source = PIXI.Sprite.from('./images/gato.jpg');
container.addChild(source);
source.x = 100;
source.y = 100;

var gr = new PIXI.Graphics();
var grSprite = new PIXI.Sprite();
var displacementFilter = new PIXI.filters.DisplacementFilter(grSprite);

var mousePositions = [];


window.addEventListener('mousemove', (e) => {
  mousePositions.push({ x: e.clientX, y: e.clientY });
  mousePositions = mousePositions.slice(-30);

  gr.destroy({ children: true, texture: true, baseTexture: true });

  gr = new PIXI.Graphics();
  gr.beginFill(0xffffff);
  gr.drawRect(0, 0, 940, 940);
  gr.endFill();
  mousePositions.forEach(({ x, y }, i) => {
    const r = i / mousePositions.length;
    gr.beginFill(0xffffff * (1 - r));
    gr.drawCircle(x - 100 , y - 100, 20);
    gr.endFill();
  })

  grSprite.destroy({ children: true, texture: true, baseTexture: true });

  var texture = app.renderer.generateTexture(gr);
  grSprite = new PIXI.Sprite(texture);
  
  grSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
  grSprite.position = source.position;
  app.stage.addChild(grSprite);

  /**
   * create displacement filter
   */
  displacementFilter.destroy();
  displacementFilter = new PIXI.filters.DisplacementFilter(grSprite);
  displacementFilter.padding = 100;
  displacementFilter.scale.x = 100;
  displacementFilter.scale.y = 100;
  source.filters = [ displacementFilter ];

});

app.ticker.add(() => {
  
});