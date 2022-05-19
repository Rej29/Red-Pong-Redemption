import Phaser from 'phaser'

import { Title } from '../const/SceneKeys'

export default class GameOver extends Phaser.Scene
{   
    /**
     * 
     * @param {{ leftScore: number, rightScore: number }} data 
     */
    create(data)
    {
        let titleText = 'GAME ENDED'
     if (data.rightScore > data.leftScore)
     {
       //player won
       titleText = 'YOU WIN!'
     }
     
    
     this.add.text(175,100, titleText, {
         fontSize: 80,
         fontStyle: 5
     })

     this.add.text(300, 300, 'Press Space to Continue')

     this.input.keyboard.once('keydown-SPACE', () => {
         this.scene.start(Title)
     })
     
    }
}