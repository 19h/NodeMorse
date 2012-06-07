$$$ = require, hid = require("./hid/hid").hid;

var Morse = {
        Storage: {
                InitCache: [],
                Macros: []
        },
        Devices: {
                ntrfcs: [],
                Stack: [],
                Active: ""
        },
        Configuration: {
                Preference: "1452:781"
        }
};

(function (b) {
        Morse.Init = function (a) {
                if ("function" !== typeof a) {
                        for (i in Morse.Storage.InitCache) Morse.Storage.InitCache[i]();
                        return !0
                }
                return Morse.Storage.InitCache.push(a)
        };
        return void new b
})(function () {
        Morse.Init(function () {
                v = $$$("./drivers/drivers");
                for (i in v.devices) Morse.Devices.ntrfcs[v.devices[i][1].id.vendor + ":" + v.devices[i][1].id.product] = v.devices[i]
        });
        Morse.Init(function () {
                for (i in v = hid.devices())
                        "object" == typeof Morse.Devices.ntrfcs[v[i].vendorId + ":" + v[i].productId]
                                && (x = Morse.Devices.Stack.push(Morse.Devices.ntrfcs[v[i].vendorId + ":" + v[i].productId]));
                if (!Morse.Devices.Stack.length)
                        return console.log("No suitable devices found.");
                for (i in Morse.Devices.Stack) // Preferred devices? Print found ones.
                        console.log("Found: ", Morse.Devices.Stack[i][1].displayname), Morse.Devices.Stack[i][1].id.vendor + ":" + Morse.Devices.Stack[i][1].id.product == Morse.Configuration.Preference && (Morse.Devices.Active = i);
                "" != Morse.Devices.Active && console.log("Initializing preference.. ", Morse.Devices.Stack[Morse.Devices.Active][1].displayname, "(Vendor " + Morse.Devices.Stack[Morse.Devices.Active][1].id.vendor + ", Product " + Morse.Devices.Stack[Morse.Devices.Active][1].id.product + ")");
                "" == Morse.Devices.Active && console.log("Could not locate preferred device, using..", Morse.Devices.Stack[0][1].displayname, "(Vendor " + Morse.Devices.Stack[0][1].id.vendor + ", Product " + Morse.Devices.Stack[0][1].id.product + ")"), (Morse.Devices.Active = 0);
                // end of detection, starting workflow
                hook = new HID.devices(Morse.Devices.Stack[Morse.Devices.Active][1].id.vendor, Morse.Devices.Stack[Morse.Devices.Active][1].id.product);
        })
});
Morse.Init(!1);