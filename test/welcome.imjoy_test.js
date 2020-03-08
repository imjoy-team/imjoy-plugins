import { expect } from "chai";
require('mocha-sinon')();
import _ from "lodash";

import { imjoyCore } from "https://imjoy.io/imjoy-core.js";

import welcome_imjoy_html from "../repository/welcome.imjoy.html";

var imjoy_api = {
    showStatus(plugin, info) {
        console.log(info);
    },
    showMessage(plugin, info, duration) {
        console.log(info);
    },
    showProgress(plugin, progress) {
        if (progress < 1) progress = progress * 100;
        console.log(progress);
    },
    showDialog(plugin, config) {
        console.log(config);
    }
}

const imjoy = new imjoyCore.ImJoy({
    imjoy_api: imjoy_api,
    show_message_callback: console.log,
    add_window_callback: async (w) => { },
    update_ui_callback: () => { },
    jailed_asset_url: 'https://imjoy.io/static/jailed'
})

describe('#welcome.imjoy', async function () {

    beforeEach(function () {
        this.sinon.stub(console, 'log');
    });

    await imjoy.start();
    const code = _.clone(welcome_imjoy_html);
    const plugin = await imjoy.pm.reloadPlugin({ code: code });

    context('after setup', function () {
        it('should log initialized', async function () {
            expect(plugin.name).to.equal("Welcome");
            expect(console.log.calledOnce).to.be.true;
            expect(console.log.calledWith('initialized')).to.be.true;
        })
    })
})
