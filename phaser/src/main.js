import Phaser from 'phaser'

import Title from './scenes/Title'

import Game from './scenes/Game'

import GameBackground from './scenes/GameBackground'

import GameOver from './scenes/GameOver'


const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    backgroundColor: '#279c33',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: true
        }
    } 
}

const game = new Phaser.Game(config)

game.scene.add('title', Title)
game.scene.add('game', Game)
game.scene.add('game-background', GameBackground)
game.scene.add('game-over', GameOver)

game.scene.start('title')

//game.scene.start('game')