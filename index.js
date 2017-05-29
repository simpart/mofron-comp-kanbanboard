/**
 * @file   mofron-comp-dropboard-kanban/index.js
 * @author simpart
 */
require('mofron-comp-dropboard');

/**
 * @class mofron.comp.dropboard.Kanban
 * @brief mofron drop-board component for Kanban
 */
mofron.comp.dropboard.Kanban = class extends mofron.comp.DropBoard {
    
    constructor (prm_opt) {
        try {
            super();
            this.name('Kanban');
            this.prmOpt(prm_opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getDragEvent () {
        try {
            let fnc = (tgt, tp, prm) => {
                try {
                    setTimeout(
                        (prm) => {
                            try {
                                prm.reposChild();
                            } catch (e) {
                                console.error(e.stack);
                                throw e;
                            }
                        },
                        100,
                        prm
                    );
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            return new mofron.event.Drag({
                addType : 'dragend',
                handler : new mofron.Param(fnc, this)
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd, disp, idx) {
        try {
            super.addChild(chd, disp, idx);
            let evt     = chd.event();
            let add_flg = false;
            for (let evt_idx in evt) {
                if (evt[evt_idx].getId() === this.getDragEvent().getId()) {
                    add_flg = true;
                    break;
                }
            }
            if (false === add_flg) {
                chd.addEvent(this.getDragEvent());
            }
            this.reposChild();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    reposChild () {
        try {
            let sz = this.size();
            if ((null === sz[0]) || ('number' !== typeof sz[0])) {
                return;
            }
            let chd_wid  = Math.floor(sz[0] * 0.9);
            let chd_left = Math.floor((sz[0] - chd_wid) / 2);
            let chd      = this.child();
            for (let chd_idx in chd) {
                chd[chd_idx].style({
                    width    : chd_wid + 'px'  ,
                    position : 'relative'      ,
                    left     : chd_left + 'px' ,
                    top      : 15 + (chd_idx * 15) + 'px'
                });
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    dropped (cmp) {
        try {
            /* dragend event on this component */
            this.dragLeave();
            let chd = this.child();
            for (let chd_idx in chd) {
                if (chd[chd_idx].target().getId() === cmp.target().getId()) {
                    return;
                }
            }
            this.addChild(cmp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
mofron.comp.dropboard.kanban = {};
module.exports = mofron.comp.dropboard.Kanban;