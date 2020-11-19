const fs = require('fs');

module.exports = {
    get_config: (req, res) => {
        try {
            let config = JSON.parse(fs.readFileSync('./config/gw_tcp_cfg.txt'));
            return res.status(200).send({
                msg: config
            });
        } catch (error) {
            return res.status(400).send({
                msg: error
            });
        }
    },
    set_cfg_server: (req, res) => {
        let msg = req.body;
        msg["is_server"] = "1";
        try {
            let config = JSON.parse(fs.readFileSync('./config/gw_tcp_cfg.txt'));
            config["server"] = msg;
            fs.writeFileSync('./config/gw_tcp_cfg.txt', JSON.stringify(config), (err) => {
                if (err) return res.status(400).send({
                    msg: err
                });
            });
            return res.status(200).send({
                msg: "Successful setup."
            });
        } catch (error) {
            return res.status(400).send({
                msg: error
            });
        }
    },
    set_cfg_client: (req, res) => {
        let msg = req.body;
        msg["is_client"] = "0";
        try {
            let config = JSON.parse(fs.readFileSync('./config/gw_tcp_cfg.txt'));
            config["client"] = msg;
            fs.writeFileSync('./config/gw_tcp_cfg.txt', JSON.stringify(config), (err) => {
                if (err) return res.status(400).send({
                    msg: err
                });
            });
            return res.status(200).send({
                msg: "Successful setup."
            });
        } catch (error) {
            return res.status(400).send({
                msg: error
            });
        }
    }
}