$$$ = require, hid = require("./hid/hid").hid;

var Morse = {
        Storage: {
                InitCache: [],
                Macros: []
        },
        Devices: {
                ntrfcs: [],
                Stack: []
        },
        Configuration: {
                Preference: "1452:781"
        }
};

(function (Init) {
        Morse.Init = function (f) {
                if (typeof f !== "function") return (function () {
                        for (i in Morse.Storage.InitCache)
                        Morse.Storage.InitCache[i]();
                        return !0;
                })();
                else return Morse.Storage.InitCache.push(f);
        };
        return void new Init;
})(function () {
        Morse.Init(function () { // load devices
                v = $$$("./drivers/drivers");
                for (i in v.devices) Morse.Devices.ntrfcs[v.devices[i][1].id.vendor + ":" + v.devices[i][1].id.product] = v.devices[i];
        });
        Morse.Init(function () { // detect devices
                //console.log(Morse.Devices.ntrfcs);
                for (i in v = hid.devices())
                        //if ( typeof Morse["Devices"]["Stack"] )
                        if ( typeof Morse.Devices.ntrfcs[v[i].vendorId + ":" + v[i].productId] == "object")
                                (x = Morse.Devices.Stack.push(Morse.Devices.ntrfcs[v[i].vendorId + ":" + v[i].productId]));
                if(!Morse.Devices.Stack.length) return console.log("No suitable devices found.");
                //console.log(Morse.Devices.Stack);
                for( i in Morse.Devices.Stack ) console.log("Found: ", Morse.Devices.Stack[i][1].displayname);
        });
});

Morse['Init'](!1);
