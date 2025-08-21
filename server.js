const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Middleware Express
app.get('/', (req, res) => {
    res.send('Servidor WebSocket con Express está activo');
});


// WebSocket por cliente
wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    // Reiniciar data para este cliente
    let data = {
        total: 0,
        complete: false
    };

    // Enviar mensaje cada 5 segundos
    const pingInterval = setInterval(() => {
        if (data.total < 1000) {
            data.total += 200;
            data.complete = false;
        } else {
            data.complete = true;
            clearInterval(pingInterval); // detener mensajes
        }

        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(data));
            console.log('Enviado al cliente:', data);
        }
    }, 2000);

    // Recibir mensajes del cliente
    ws.on('message', (message) => {
        console.log('Mensaje recibido del cliente:', message);
        // Puedes enviar eco si quieres
        ws.send(JSON.stringify({ type: 'eco', text: `Recibido: ${message}` }));
    });

    // Al cerrar cliente
    // ws.on('close', () => {
    //     console.log('Cliente desconectado');
    //     clearInterval(pingInterval);
    // });
});

// Ruta REST simulada
app.post('/api/lockers/assign', (req, res) => {
    console.log('Llamado a /api/lockers/assign');
    console.log('Headers: ', req.headers);
    console.log('Payload recibido:', req.body);
    setTimeout(() => {
        console.log('response');
        res.json({
            success: true,
            message: "Casillero asignado y abierto exitosamente",
            lockerCode: "F10"
        });
    }, 5000);
    // return res.status(500).json({
    //     success: false,
    //     message: 'Error al asignar el casillero',
    // });
});

// Ruta REST simulada
app.post('/api/lockers/open-session', (req, res) => {
    console.log('Llamado a /api/lockers/open-session');
    console.log('Headers: ', req.headers);
    console.log('Payload recibido:', req.body);
    setTimeout(() => {
        console.log('response');
        res.json({
            success: true,
            message: "Casillero abierto exitosamente",
            lockerCode: "B8"
        });
    }, 3000);
    // return res.status(500).json({
    //     success: false,
    //     message: 'Error al abrir el casillero',
    // });
});

// Ruta REST simulada
app.post('/api/lockers/open-by-code', (req, res) => {
    console.log('Llamado a /api/lockers/open-by-code');
    console.log('Headers: ', req.headers);
    console.log('Payload recibido:', req.body);
    setTimeout(() => {
        console.log('response');
        res.json({
            success: true,
            message: "Casillero abierto exitosamente",
            lockerCode: req.body.lockerCode
        });
    }, 3000);
    // return res.status(500).json({
    //     success: false,
    //     message: 'Error al abrir el casillero',
    // });
});

// Ruta REST simulada
app.post('/api/lockers/set-status', (req, res) => {
    console.log('Llamado a /api/lockers/set-status');
    console.log('Headers: ', req.headers);
    console.log('Payload recibido:', req.body);
    setTimeout(() => {
        console.log('response');
        res.json({
            success: true,
            message: "Estado del casillero cambiado exitosamente",
            lockerCode: req.body.lockerCode
        });
    }, 3000);
    // return res.status(500).json({
    //     success: false,
    //     message: 'Error al abrir el casillero',
    // });
});

// Ruta REST simulada
app.get('/api/lockers/available', (req, res) => {
    console.log('Llamado a /api/lockers/available');
    console.log('Headers: ', req.headers);

    setTimeout(() => {
        const availables = ["A1"];
        console.log('response:', availables);
        res.json(availables); // Devuelve directamente un array
    }, 500); // puedes reducir el tiempo si es solo simulación
});

// Ruta REST simulada
app.get('/api/lockers/get-all-status', (req, res) => {
    console.log('Llamado a /api/lockers/get-all-status');
    console.log('Headers: ', req.headers);

    setTimeout(() => {
        const status =
        {
            general: [
                {
                    status: "ocupado",
                    "total": 12
                },
                {
                    status: "libre",
                    "total": 1
                },
                {
                    status: "reservado",
                    "total": 12
                },
                {
                    status: "deshabilitado",
                    "total": 6
                },
            ],
            modules: [
                {
                    module: "A",
                    lockers: [
                        {
                            lockerCode: "A1",
                            status: "reservado"
                        },
                        {
                            lockerCode: "A2",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A3",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A4",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "A5",
                            status: "reservado"
                        },
                        {
                            lockerCode: "A6",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "A7",
                            status: "deshabilitado"
                        },
                        {
                            lockerCode: "A8",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A9",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A10",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A11",
                            status: "reservado"
                        },
                        {
                            lockerCode: "A12",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A13",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A14",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "A15",
                            status: "reservado"
                        },
                        {
                            lockerCode: "A16",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "A17",
                            status: "deshabilitado"
                        },
                        {
                            lockerCode: "A18",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A19",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A20",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A21",
                            status: "reservado"
                        },
                        {
                            lockerCode: "A22",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A23",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A24",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "A25",
                            status: "reservado"
                        },
                        {
                            lockerCode: "A26",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "A27",
                            status: "deshabilitado"
                        },
                        {
                            lockerCode: "A28",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A29",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A30",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A31",
                            status: "reservado"
                        },
                        {
                            lockerCode: "A32",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A33",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A34",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "A35",
                            status: "reservado"
                        },
                        {
                            lockerCode: "A36",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "A37",
                            status: "deshabilitado"
                        },
                        {
                            lockerCode: "A38",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A39",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A40",
                            status: "Libre"
                        }, {
                            lockerCode: "A41",
                            status: "reservado"
                        },
                        {
                            lockerCode: "A42",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A43",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A44",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "A45",
                            status: "reservado"
                        },
                        {
                            lockerCode: "A46",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "A47",
                            status: "deshabilitado"
                        },
                        {
                            lockerCode: "A48",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A49",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A50",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A51",
                            status: "reservado"
                        },
                        {
                            lockerCode: "A52",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A53",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A54",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "A55",
                            status: "reservado"
                        },
                        {
                            lockerCode: "A56",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "A57",
                            status: "deshabilitado"
                        },
                        {
                            lockerCode: "A58",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A59",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A60",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A61",
                            status: "reservado"
                        },
                        {
                            lockerCode: "A62",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A63",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A64",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "A65",
                            status: "reservado"
                        },
                        {
                            lockerCode: "A66",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "A67",
                            status: "deshabilitado"
                        },
                        {
                            lockerCode: "A68",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A69",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A70",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A71",
                            status: "reservado"
                        },
                        {
                            lockerCode: "A72",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A73",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A74",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "A75",
                            status: "reservado"
                        },
                        {
                            lockerCode: "A76",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "A77",
                            status: "deshabilitado"
                        },
                        {
                            lockerCode: "A78",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A79",
                            status: "Libre"
                        },
                        {
                            lockerCode: "A80",
                            status: "Libre"
                        }
                    ]
                },
                {
                    module: "B",
                    lockers: [
                        {
                            lockerCode: "B1",
                            status: "reservado"
                        },
                        {
                            lockerCode: "B2",
                            status: "Libre"
                        },
                        {
                            lockerCode: "B3",
                            status: "Libre"
                        },
                        {
                            lockerCode: "B4",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "B5",
                            status: "reservado"
                        }
                    ]
                },
                {
                    module: "C",
                    lockers: [
                        {
                            lockerCode: "C1",
                            status: "reservado"
                        },
                        {
                            lockerCode: "C2",
                            status: "Libre"
                        },
                        {
                            lockerCode: "C3",
                            status: "Libre"
                        },
                        {
                            lockerCode: "C4",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "C5",
                            status: "reservado"
                        },
                        {
                            lockerCode: "C6",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "C7",
                            status: "deshabilitado"
                        },
                        {
                            lockerCode: "C8",
                            status: "Libre"
                        },
                        {
                            lockerCode: "C9",
                            status: "Libre"
                        },
                        {
                            lockerCode: "C10",
                            status: "Libre"
                        },
                        {
                            lockerCode: "C11",
                            status: "reservado"
                        },
                        {
                            lockerCode: "C12",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "C13",
                            status: "deshabilitado"
                        },
                        {
                            lockerCode: "C14",
                            status: "Libre"
                        },
                        {
                            lockerCode: "C15",
                            status: "Libre"
                        },
                        {
                            lockerCode: "C16",
                            status: "Libre"
                        }
                    ]
                },
                {
                    module: "D",
                    lockers: [
                        {
                            lockerCode: "D1",
                            status: "reservado"
                        }
                    ]
                },
                {
                    module: "E",
                    lockers: [
                        {
                            lockerCode: "E1",
                            status: "reservado"
                        },
                        {
                            lockerCode: "E2",
                            status: "Libre"
                        },
                        {
                            lockerCode: "E3",
                            status: "Libre"
                        },
                        {
                            lockerCode: "E4",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "E5",
                            status: "reservado"
                        },
                        {
                            lockerCode: "E6",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "E7",
                            status: "deshabilitado"
                        },
                        {
                            lockerCode: "E8",
                            status: "Libre"
                        },
                        {
                            lockerCode: "E9",
                            status: "Libre"
                        },
                        {
                            lockerCode: "E10",
                            status: "Libre"
                        }
                    ]
                },
                {
                    module: "F",
                    lockers: [
                        {
                            lockerCode: "F1",
                            status: "reservado"
                        },
                        {
                            lockerCode: "F2",
                            status: "Libre"
                        },
                        {
                            lockerCode: "F3",
                            status: "Libre"
                        },
                        {
                            lockerCode: "F4",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "F5",
                            status: "reservado"
                        },
                        {
                            lockerCode: "F6",
                            status: "ocupado"
                        },
                        {
                            lockerCode: "F7",
                            status: "deshabilitado"
                        },
                        {
                            lockerCode: "F8",
                            status: "Libre"
                        },
                        {
                            lockerCode: "F9",
                            status: "Libre"
                        },
                        {
                            lockerCode: "F10",
                            status: "Libre"
                        }
                    ]
                }
            ]
        };
        console.log('response:', status);
        res.json(status); // Devuelve directamente un array
    }, 500); // puedes reducir el tiempo si es solo simulación
});

// Ruta REST simulada
app.post('/api/lockers/report', (req, res) => {
    console.log('Llamado a /api/lockers/report');
    console.log('Headers: ', req.headers);

    setTimeout(() => {
        const status =
            [
                {
                    ID: 1,
                    LockerID: "A1",
                    Phone: "3333333333",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:31:15Z",
                    EndTime: "2025-08-15T15:31:15Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 2,
                    LockerID: "A2",
                    Phone: "3333333333",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:31:16Z",
                    EndTime: "2025-08-15T15:31:17Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 3,
                    LockerID: "A3",
                    Phone: "3333333333",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:31:18Z",
                    EndTime: "2025-08-15T15:31:18Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 4,
                    LockerID: "A4",
                    Phone: "3333333333",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:31:19Z",
                    EndTime: "2025-08-15T15:31:20Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 5,
                    LockerID: "A5",
                    Phone: "3333333333",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:31:21Z",
                    EndTime: "2025-08-15T15:31:22Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 6,
                    LockerID: "D5",
                    Phone: "3444444444",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:33:43Z",
                    EndTime: "2025-08-15T15:55:28Z",
                    AmountPaid: 1500,
                    OpenBy: "local"
                },
                {
                    ID: 7,
                    LockerID: "C5",
                    Phone: "3555555555",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:35:10Z",
                    EndTime: "2025-08-15T15:35:10Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 8,
                    LockerID: "B7",
                    Phone: "3555555555",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:35:11Z",
                    EndTime: "2025-08-15T15:35:12Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 9,
                    LockerID: "D6",
                    Phone: "3555555555",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:35:13Z",
                    EndTime: "2025-08-15T15:55:29Z",
                    AmountPaid: 1500,
                    OpenBy: "local"
                },
                {
                    ID: 10,
                    LockerID: "D10",
                    Phone: "3000000000",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:36:09Z",
                    EndTime: "2025-08-15T15:48:11Z",
                    AmountPaid: 1500,
                    OpenBy: "user"
                },
                {
                    ID: 11,
                    LockerID: "B8",
                    Phone: "3333333333",
                    PIN: "3333",
                    Active: false,
                    StartTime: "2025-08-15T15:36:50Z",
                    EndTime: "2025-08-15T15:36:50Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 12,
                    LockerID: "B1",
                    Phone: "3333333333",
                    PIN: "3333",
                    Active: false,
                    StartTime: "2025-08-15T15:36:52Z",
                    EndTime: "2025-08-15T15:36:54Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 13,
                    LockerID: "A6",
                    Phone: "3333333333",
                    PIN: "3333",
                    Active: false,
                    StartTime: "2025-08-15T15:36:55Z",
                    EndTime: "2025-08-15T15:36:55Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 14,
                    LockerID: "B10",
                    Phone: "3333333333",
                    PIN: "3333",
                    Active: false,
                    StartTime: "2025-08-15T15:36:56Z",
                    EndTime: "2025-08-15T15:36:57Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 15,
                    LockerID: "D4",
                    Phone: "3333333333",
                    PIN: "3333",
                    Active: false,
                    StartTime: "2025-08-15T15:36:58Z",
                    EndTime: "2025-08-15T15:55:28Z",
                    AmountPaid: 1500,
                    OpenBy: "local"
                },
                {
                    ID: 16,
                    LockerID: "C6",
                    Phone: "3666666666",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:38:43Z",
                    EndTime: "2025-08-15T15:38:43Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 17,
                    LockerID: "B4",
                    Phone: "3666666666",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:38:44Z",
                    EndTime: "2025-08-15T15:38:45Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 18,
                    LockerID: "A7",
                    Phone: "3666666666",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:38:46Z",
                    EndTime: "2025-08-15T15:38:46Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 19,
                    LockerID: "C3",
                    Phone: "3666666666",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:39:46Z",
                    EndTime: "2025-08-15T15:39:47Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 20,
                    LockerID: "C10",
                    Phone: "3666666666",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:39:48Z",
                    EndTime: "2025-08-15T15:39:48Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 21,
                    LockerID: "B2",
                    Phone: "3666666666",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:39:49Z",
                    EndTime: "2025-08-15T15:39:50Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 22,
                    LockerID: "D9",
                    Phone: "3666666666",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:39:51Z",
                    EndTime: "2025-08-15T15:55:36Z",
                    AmountPaid: 1500,
                    OpenBy: "local"
                },
                {
                    ID: 23,
                    LockerID: "A9",
                    Phone: "3222222222",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:40:29Z",
                    EndTime: "2025-08-15T15:40:30Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 24,
                    LockerID: "B4",
                    Phone: "3222222222",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:40:31Z",
                    EndTime: "2025-08-15T15:40:32Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 25,
                    LockerID: "C2",
                    Phone: "3222222222",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:40:33Z",
                    EndTime: "2025-08-15T15:40:33Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 26,
                    LockerID: "C7",
                    Phone: "3222222222",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:40:34Z",
                    EndTime: "2025-08-15T15:40:35Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 27,
                    LockerID: "D7",
                    Phone: "3222222222",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:40:36Z",
                    EndTime: "2025-08-15T15:55:29Z",
                    AmountPaid: 1500,
                    OpenBy: "local"
                },
                {
                    ID: 28,
                    LockerID: "B3",
                    Phone: "3111111111",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:41:34Z",
                    EndTime: "2025-08-15T15:41:35Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 29,
                    LockerID: "A8",
                    Phone: "3111111111",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:41:36Z",
                    EndTime: "2025-08-15T15:41:36Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 30,
                    LockerID: "B6",
                    Phone: "3111111111",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:41:37Z",
                    EndTime: "2025-08-15T15:41:38Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 31,
                    LockerID: "B9",
                    Phone: "3111111111",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:41:39Z",
                    EndTime: "2025-08-15T15:41:39Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 32,
                    LockerID: "D9",
                    Phone: "3111111111",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:41:40Z",
                    EndTime: "2025-08-15T15:50:49Z",
                    AmountPaid: 1500,
                    OpenBy: "user"
                },
                {
                    ID: 33,
                    LockerID: "C9",
                    Phone: "3888888888",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:44:15Z",
                    EndTime: "2025-08-15T15:44:15Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 34,
                    LockerID: "C1",
                    Phone: "3888888888",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:44:16Z",
                    EndTime: "2025-08-15T15:44:17Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 35,
                    LockerID: "A10",
                    Phone: "3888888888",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:44:18Z",
                    EndTime: "2025-08-15T15:44:18Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 36,
                    LockerID: "B5",
                    Phone: "3888888888",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:44:19Z",
                    EndTime: "2025-08-15T15:44:20Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 37,
                    LockerID: "D8",
                    Phone: "3888888888",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:44:21Z",
                    EndTime: "2025-08-15T15:44:22Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 38,
                    LockerID: "C8",
                    Phone: "3888888888",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:44:48Z",
                    EndTime: "2025-08-15T15:44:49Z",
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 39,
                    LockerID: "D10",
                    Phone: "3888888888",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T15:50:15Z",
                    EndTime: "2025-08-15T15:55:37Z",
                    AmountPaid: 1500,
                    OpenBy: "local"
                },
                {
                    ID: 40,
                    LockerID: "D4",
                    Phone: "3103192771",
                    PIN: "0000",
                    Active: false,
                    StartTime: "2025-08-15T20:16:16Z",
                    EndTime: "2025-08-15T20:16:45Z",
                    AmountPaid: 1500,
                    OpenBy: "user"
                },
                {
                    ID: 41,
                    LockerID: "D8",
                    Phone: "3103192771",
                    PIN: "5555",
                    Active: true,
                    StartTime: "2025-08-15T20:27:55Z",
                    EndTime: null,
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 42,
                    LockerID: "D7",
                    Phone: "3103192772",
                    PIN: "0000",
                    Active: true,
                    StartTime: "2025-08-15T22:18:45Z",
                    EndTime: null,
                    AmountPaid: 1500,
                    OpenBy: ""
                },
                {
                    ID: 43,
                    LockerID: "D5",
                    Phone: "3444444444",
                    PIN: "4444",
                    Active: false,
                    StartTime: "2025-08-15T23:09:15Z",
                    EndTime: "2025-08-15T23:09:31Z",
                    AmountPaid: 1500,
                    OpenBy: "user"
                }
            ];
        console.log('response:', status);
        res.json(status); // Devuelve directamente un array
    }, 500); // puedes reducir el tiempo si es solo simulación
});


// Iniciar servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`WebSocket activo en ws://localhost:${PORT}`);
});
