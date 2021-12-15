import throttle from 'lodash/throttle';
import Player from '@vimeo/player';
const PLAYER_CURRENT_TIME = "videoplayer-current-time"

const player = new Player('vimeo-player',
    {
        id: 19231868,
        width: 640
    });

setPlayerCurrentTime()

player.on('timeupdate', throttle(onPlayerCurrentTime, 1000));

function onPlayerCurrentTime(data) {
    localStorage.setItem(PLAYER_CURRENT_TIME, data.seconds);
    console.log(`localStorage value = ${localStorage.getItem(PLAYER_CURRENT_TIME)}`);
}

function setPlayerCurrentTime() {
    if (!localStorage.getItem(PLAYER_CURRENT_TIME)) {
        return
    }
    player.setCurrentTime(localStorage.getItem(PLAYER_CURRENT_TIME))
}
