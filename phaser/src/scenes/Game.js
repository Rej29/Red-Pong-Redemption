import thisStringValue from 'es-abstract/2015/thisStringValue'
import M from 'minimatch'
import Phaser from 'phaser'

import { GameBackground, GameOver} from '../const/SceneKeys'


const GameState = {
    Running: 'running',
    PlayerWon: 'player-won',
    AIWon: 'ai-won'
}

 class Game extends Phaser.Scene
 {
     init()
     {
         this.gameState = GameState.Running
         this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0)

         this.leftScore = 0
         this.rightScore = 0

         this.paused = false
     }

     preload()
     {

     }

     create()
     {
         this.scene.run('game-background')
         this.scene.sendToBack('game-background')

         this.physics.world.setBounds(-100, 0, 1000, 500)
         

         this.ball =this.add.circle(400, 250, 15, 0xa31536, 1)
         this.physics.add.existing(this.ball)
         this.ball.body.setBounce(1,1)
        

         this.ball.body.setCollideWorldBounds(true, 1, 1)

         this.resetBall()


         this.paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1)
         this.physics.add.existing(this.paddleLeft, true)
        
         this.paddleRight = this.add.rectangle(750, 250, 30, 100, 0xffffff, 1)
         this.physics.add.existing(this.paddleRight, true)

         this.physics.add.collider(this.paddleLeft, this.ball)
         this.physics.add.collider(this.paddleRight, this.ball)
         
         const scoreStyle = {
             fontSize:42
         }
         this.leftScoreLabel = this.add.text(500, 20, '0', scoreStyle)
             .setOrigin(0.5, 0.5)

         this.rightScoreLabel = this.add.text(300, 20, '0', scoreStyle)
             .setOrigin(0.5, 0.5)

         this.cursors = this.input.keyboard.createCursorKeys()
     }
     update()
     {

        if (this.paused  || this.gameState !== GameState.Running)
        {
            return
        }
          /** @type {Phaser.Physics.Arcade.Body} */
         const body = this.paddleLeft.body

         if(this.cursors.up.isDown)
         {
             this.paddleLeft.y -= 10
             body.updateFromGameObject()
         }
         else if (this.cursors.down.isDown)
         {
            this.paddleLeft.y += 10
            body.updateFromGameObject()
         }
         
         
         
        //ai

         this.updateAI()

         const x = this.ball.x
         const leftBounds = -30
         const rightBounds = 830

         if(x >= leftBounds && x <= rightBounds)
         {
             return
         }
         
         if(this.ball.x < leftBounds)
         {
             //score left side
            
             this.incrementLeftScore()
         }
         else if (this.ball.x > rightBounds)
         {
             //score right side
             
             this.incrementRightScore()
         }

         const maxScore = 5
         if (this.leftScore >= maxScore)
         {
             //ai won
             this.gameState = GameState.AIWon
         }
         else if (this.rightScore >= maxScore)
         {
             //player won
             this.gameState = GameState.PlayerWon
         }
         if (this.gameState === GameState.Running)
         {
             this.resetBall()
         }
         else
         {
             this.ball.active = false
             this.physics.world.remove(this.ball.body) 

             this.scene.stop(GameBackground)

             // show Game Over
             this.scene.start(GameOver, {
                 rightScore: this.leftScore,
                 rightScore: this.rightScore
             })
         }
     }

     updateAI()
     {
        const diff = this.ball.y - this.paddleRight.y
         
        if (Math.abs(diff) < 10)
        {
            return
        }
       
        const aiSpeed = 1.5
        if (diff < 0)
        {
            //ball is above the platform
            this.paddleRightVelocity.y = -aiSpeed
            if (this.paddleRightVelocity.y < -10)
            {
                this.paddleRightVelocity.y = -10
            }
        }
        else if (diff > 0)
        {
            //ball is below the platform
            this.paddleRightVelocity.y = aiSpeed
            if (this.paddleRightVelocity.y > 10)
            {
                this.paddleRightVelocity.y = 10
            }
        }

        this.paddleRight.y += this.paddleRightVelocity.y
        this.paddleRight.body.updateFromGameObject()

       
     }

     incrementLeftScore()
     {
         this.leftScore += 1
         this.leftScoreLabel.text = this.leftScore

     }

     incrementRightScore()
     {
         this.rightScore += 1
         this.rightScoreLabel.text = this.rightScore
     }

     resetBall()
     {
        this.ball.setPosition(400,250)
        const angle = Phaser.Math.Between(0,360)
        const vec = this.physics.velocityFromAngle(angle, 350)

        this.ball.body.setVelocity(vec.x, vec.y)
     }
 }

 export default Game