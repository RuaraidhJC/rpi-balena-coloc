import { Router } from 'express';
import axios from 'axios';
import config from './config.js';
import helper from './helper.js';

const router = Router();

const getRoomState = async (roomId) => {
    const {data} = await axios.get(helper("/groups/"+ roomId));
    return data.action.on
}

const getRoomScene = async(roomId, sceneName) => {
    const {data} = await axios.get(helper("/scenes"));
    for (let key in data) {
        if (data[key].group.toString() === roomId && sceneName === data[key].name){
            return key
        }
    }
    return false
}

router.get('/rooms/:name/status', async (req, res, next) => {
    const {name} = req.params;
    const roomId = config.roomIds[name]
    const roomState = await getRoomState(roomId)
    res.sendStatus((roomState) ? 200 : 400)
    next()
})

router.get('/rooms/:name/toggle', async (req, res, next) => {
    const {name} = req.params;
    const roomId = config.roomIds[name]
    console.log('lol')
    const {data} = await axios.put(helper("/groups/"+ roomId + "/action"), {"on": !(await getRoomState(roomId))});
    console.log(data)
    res.send('<script> window.close(); </script>');
    next();
});

router.get('/rooms/:roomName/scene', async (req, res, next) => {
    const {roomName} = req.params;
    const {sceneName} = req.query;
    const roomId = config.roomIds[roomName]
    const {data, request} = await axios.put(helper("/groups/"+ roomId + "/action"), {"scene": await getRoomScene(roomId, sceneName)});
    //console.log(await getRoomScene(roomId, sceneName), data)
    res.send('<script> window.close(); </script>');
    next();
});



export default router;
