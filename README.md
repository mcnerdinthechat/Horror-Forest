# Horror Forest 🌲👹

A mobile-friendly horror game where you must survive in a dark forest while being hunted by a monster!

## Game Features

- **Dark Forest Setting**: Spawns player in a dark forest with limited visibility
- **Flashlight Mechanics**: Use the flashlight to see what's around you, but it reveals the monster too!
- **Monster Chase**: A monster spawns far away and gradually hunts you down
- **Distance Meter**: Track how far the monster is in real-time
- **Jumpscare Effect**: When caught, experience a jumpscare screen
- **Game Over Screen**: Shows when the monster catches you with a restart button
- **Mobile Friendly**: Touch controls for mobile devices + keyboard controls for desktop
- **Responsive Design**: Works on all screen sizes

## Controls

### Desktop
- **W/Up Arrow** - Move up
- **S/Down Arrow** - Move down
- **A/Left Arrow** - Move left
- **D/Right Arrow** - Move right

### Mobile
- **Touch & Drag** - Move to where you touch the screen
- **Flashlight** - Follows your player automatically

## How to Play

1. You start in the center of a dark forest
2. A monster spawns far away and begins hunting you
3. Use your flashlight (yellow circle) to see the forest and avoid obstacles
4. The distance meter shows how close the monster is
5. Keep running and avoid the monster for as long as possible
6. When "SOMETHING IS NEAR" appears and the screen pulses, the monster is very close!
7. If the monster catches you, a jumpscare appears and the game ends
8. Click "Restart Game" to play again

## Game Mechanics

- **Player Speed**: 5 pixels per frame (controllable)
- **Monster Speed**: 2.5 pixels per frame (chasing)
- **Initial Monster Distance**: 800 pixels away
- **Catch Distance**: Monster catches you at 40 pixels away
- **Flashlight Radius**: 100 pixels (visibility range)

## Files

- `index.html` - Main game HTML structure
- `style.css` - Game styling and responsive design
- `game.js` - Game logic, physics, and rendering

## Installation

Simply open `index.html` in a web browser to play!

```bash
# Clone the repository
git clone https://github.com/mcnerdinthechat/Horror-Forest.git

# Open in browser
open index.html
```

## Customization

You can adjust the game difficulty by editing the `GAME_CONFIG` in `game.js`:

```javascript
const GAME_CONFIG = {
    PLAYER_SPEED: 5,              // How fast you move
    MONSTER_SPEED: 2.5,           // How fast monster chases
    MONSTER_START_DISTANCE: 800,  // How far monster starts
    CATCH_DISTANCE: 40,           // Distance to get caught
    FLASHLIGHT_RADIUS: 100,       // How far you can see
};
```

## Tips

- Keep moving to stay alive
- The monster can't catch you if you can see it first
- Use the distance meter to know when to run faster
- The flashlight illuminates the monster when it's close
- Running in circles might help you escape!

## Future Enhancements

- [ ] Sound effects and background music
- [ ] Multiple difficulty levels
- [ ] High score system
- [ ] Different monsters
- [ ] Survival time counter
- [ ] Obstacles in the forest

## License

MIT

---

Made with ❤️ for spooky game enthusiasts!
