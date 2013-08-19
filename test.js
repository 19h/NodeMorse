var HID = hid = require("node-hid");

var devices = new HID.devices(1452, 781);
var hid;
if (!devices.length) {
        console.log("Apple Magic Mouse not found");
} else {
        hid = new HID.HID(devices[0].path);
        //hid.write([03, 01]); //Disable sounds and lights
        hid.read(onRead);
}

i = 0;

function onRead(error, data) {
        var size;
        var id;

        //get 64 bytes
        console.log(++i+":", data);
        //if (data[0] != 0) {
        //        
        //        console.log("\n" + data.map(function (v) {
        //                return ('00' + v.toString(16)).slice(-2)
        //        }).join(','));
        //        
        //        switch (data[0]) {
        //        case 1:
        //                //Orientation change
        //                switch (data[1]) {
        //                case 4:
        //                        console.log("-> mir:ror up");
        //                        break;
        //                case 5:
        //                        console.log("-> mir:ror down");
        //                        break;
        //                }
        //                break;
        //        case 2:
        //                //RFID
        //                switch (data[1]) {
        //                case 1:
        //                        console.log("-> RFID in");
        //                        break;
        //                case 2:
        //                        console.log("-> RFID out");
        //                        break;
        //                }
        //                
        //                size = data[4];
        //                id = (data.splice(0)).splice(5, size);
        //                console.log(id.map(function (v) {
        //                        return ('00' + v.toString(16)).slice(-2)
        //                }).join(','));
        //                break;
        //        }
        //}
        hid.read(onRead);
}
