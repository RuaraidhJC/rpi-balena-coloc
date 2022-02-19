import { Router } from 'express';
import systemdStatus from 'systemd-status';

const router = Router();

router.get('/status', (req, res) => {
    var error = false
    try {
        const status = systemdStatus('raspotify')
    } catch (err) {
        error = true
    }
    res.sendStatus((error) ? 400 : 200)
})

export default router