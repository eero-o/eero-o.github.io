(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    function getreq(cmd) {
        console.log(cmd + " start");
        $.ajax({
            type: "GET",
            url: "http://localhost:4715/" + cmd ,
            success: function(data) {
                console.log(cmd + " success");
            },
            error: function(jqxhr, textStatus, error) { 
                console.log(cmd + " ERROR : ", error);
            }
        }); 
    };

    function getreqenc(cmd, str) { 
        getreq(cmd +"/"+ encodeURIComponent(str));
    };

    ext.move = function(dir) { getreq(dir.substring(0, 1)); };
    ext.tp = function() { getreq("tp"); };
    ext.pen = function(bid, bsub) { getreq("pen/" + bid +"/"+ bsub); };
    ext.say = function(str) { getreqenc("say", str); };
    ext.diff = function() { getreq("diff"); };
    ext.superpower = function(str) { getreqenc("superpower", str); };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            [' ', "move %m.move_dir", "move", "forward"],
            [' ', "turn %m.turn_dir", "move", "left"],
            [' ', "teleport to player", "tp"],
            [' ', "set pen block id:%n block data:%n", "pen", 0, 0],
            [' ', "say %s", "say", "Hello"],
            [' ', "tell difference from player", "diff"],
            [' ', "superpower %s", "superpower", ""],
        ],
        menus: {
            move_dir: ["forward", "backward", "up", "down"],
            turn_dir: ["left", "right"],
        },
    };

    // Register the extension
    ScratchExtensions.register('MC Turtles extension', descriptor, ext);
})({});
