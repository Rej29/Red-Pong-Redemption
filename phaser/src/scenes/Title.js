import Phaser from 'phaser'

import { Game } from '../const/SceneKeys'

export default class Title extends Phaser.Scene
{
    
    preload()
    {

    }

    create()
    {
        this.add.text(35,200, 'RED PONG REDEMPTION', {fontSize: 64})

        this.add.text(300, 300, 'Press Space to Start')

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start(Game)

        })

    }
}