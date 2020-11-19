module.exports = (app)=>{
    let Ctrl = require('./api/controller');
    app.route("/get").get(Ctrl.get_config);
    app.route('/set_server').post(Ctrl.set_cfg_server);
    app.route("/set_client").post(Ctrl.set_cfg_client)
}
