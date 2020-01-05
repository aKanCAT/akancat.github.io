window.onload = function () {
    var app = new PIXI.Application();

    document.body.appendChild(app.view);

    // load spine data
    app.loader
        .add('spineboy', 'assets/spineboy-pro.json')
        .load(onAssetsLoaded);

    app.stage.interactive = true;

    function onAssetsLoaded(loader, res) {
        // create a spine boy
        var spineboy = new PIXI.spine.Spine(res.spineboy.spineData);

        app.stage.addChild(spineboy);

        // set the position
        spineboy.x = app.screen.width / 2;
        spineboy.y = app.screen.height;

        spineboy.scale.set(0.5);

        // set current skin
        spineboy.state.setAnimation(0, 'run', true);
    }
}