// Game Configuration
const GAME_CONFIG = {
    PLAYER_SPEED: 5,
    MONSTER_SPEED: 2.5,
    MONSTER_START_DISTANCE: 800,
    CATCH_DISTANCE: 40,
    FLASHLIGHT_RADIUS: 100,
};

// Game State
let gameState = {
    isRunning: true,
    isGameOver: false,
    playerX: 0,
    playerY: 0,
    monsterX: 0,
    monsterY: 0,
    distance: 0,
};

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const flashlight = document.getElementById('flashlight');
const gameOverScreen = document.getElementById('gameOverScreen');
const jumpscareScreen = document.getElementById('jumpscareScreen');
const restartBtn = document.getElementById('restartBtn');
const distanceInfo = document.getElementById('distanceInfo');

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Initialize game
function initGame() {
    gameState.isRunning = true;
    gameState.isGameOver = false;
    gameState.playerX = canvas.width / 2;
    gameState.playerY = canvas.height / 2;
    
    // Spawn monster far away
    const angle = Math.random() * Math.PI * 2;
    gameState.monsterX = gameState.playerX + Math.cos(angle) * GAME_CONFIG.MONSTER_START_DISTANCE;
    gameState.monsterY = gameState.playerY + Math.sin(angle) * GAME_CONFIG.MONSTER_START_DISTANCE;
    
    gameOverScreen.classList.add('hidden');
    jumpscareScreen.classList.add('hidden');
}

// Handle player movement
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Mobile touch controls
let touchStartX = 0;
let touchStartY = 0;
let touchActive = false;

canvas.addEventListener('touchstart', (e) => {
    touchActive = true;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchmove', (e) => {
    if (!touchActive) return;
    
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    
    gameState.playerX = touchX;
    gameState.playerY = touchY;
});

canvas.addEventListener('touchend', () => {
    touchActive = false;
});

// Update game state
function update() {
    if (!gameState.isRunning) return;

    // Update player position with keyboard input
    if (keys['w'] || keys['arrowup']) gameState.playerY -= GAME_CONFIG.PLAYER_SPEED;
    if (keys['s'] || keys['arrowdown']) gameState.playerY += GAME_CONFIG.PLAYER_SPEED;
    if (keys['a'] || keys['arrowleft']) gameState.playerX -= GAME_CONFIG.PLAYER_SPEED;
    if (keys['d'] || keys['arrowright']) gameState.playerX += GAME_CONFIG.PLAYER_SPEED;

    // Keep player in bounds
    gameState.playerX = Math.max(0, Math.min(gameState.playerX, canvas.width));
    gameState.playerY = Math.max(0, Math.min(gameState.playerY, canvas.height));

    // Move monster towards player
    const dx = gameState.playerX - gameState.monsterX;
    const dy = gameState.playerY - gameState.monsterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
        gameState.monsterX += (dx / distance) * GAME_CONFIG.MONSTER_SPEED;
        gameState.monsterY += (dy / distance) * GAME_CONFIG.MONSTER_SPEED;
    }

    // Update distance
    gameState.distance = Math.floor(distance);
    distanceInfo.textContent = `Distance: ${gameState.distance}m`;

    // Check if monster caught player
    if (distance < GAME_CONFIG.CATCH_DISTANCE) {
        triggerGameOver();
    }
}

// Trigger jumpscare and game over
function triggerGameOver() {
    gameState.isRunning = false;
    gameState.isGameOver = true;
    
    // Show jumpscare screen
    jumpscareScreen.classList.remove('hidden');
    
    // Play sound effect (if you want to add audio later)
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj==');
    audio.play().catch(() => {});
    
    setTimeout(() => {
        gameOverScreen.classList.remove('hidden');
    }, 500);
}

// Update flashlight position to follow player
function updateFlashlight() {
    flashlight.style.left = gameState.playerX + 'px';
    flashlight.style.top = gameState.playerY + 'px';
}

// Draw game
function draw() {
    // Clear canvas with dark background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw forest effect (trees/obstacles)
    drawForest();

    // Draw visibility area (flashlight effect)
    drawVisibilityArea();

    // Draw player
    drawPlayer();

    // Draw monster (only if visible in flashlight)
    if (isMonsterVisible()) {
        drawMonster();
    }

    // Draw distance warning
    if (gameState.distance < 200 && gameState.distance > 0) {
        drawWarning();
    }
}

// Draw forest background with trees
function drawForest() {
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw random trees around the forest
    ctx.fillStyle = '#0d3a0d';
    for (let i = 0; i < 100; i++) {
        const seed = i;
        const x = (seed * 137.508) % canvas.width;
        const y = (seed * 177.508) % canvas.height;
        ctx.fillRect(x, y, 15, 15);
    }
}

// Draw visibility/flashlight area
function drawVisibilityArea() {
    // Create radial gradient for flashlight effect
    const gradient = ctx.createRadialGradient(
        gameState.playerX,
        gameState.playerY,
        GAME_CONFIG.FLASHLIGHT_RADIUS * 0.5,
        gameState.playerX,
        gameState.playerY,
        GAME_CONFIG.FLASHLIGHT_RADIUS
    );
    
    gradient.addColorStop(0, 'rgba(255, 200, 100, 0.2)');
    gradient.addColorStop(0.7, 'rgba(255, 200, 100, 0.05)');
    gradient.addColorStop(1, 'rgba(255, 200, 100, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(
        gameState.playerX,
        gameState.playerY,
        GAME_CONFIG.FLASHLIGHT_RADIUS,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// Draw player (flashlight holder)
function drawPlayer() {
    // Player position indicator
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(gameState.playerX, gameState.playerY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Flashlight beam
    ctx.strokeStyle = 'rgba(255, 200, 100, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(gameState.playerX, gameState.playerY, GAME_CONFIG.FLASHLIGHT_RADIUS, 0, Math.PI * 2);
    ctx.stroke();
}

// Draw monster
function drawMonster() {
    // Monster body (red)
    ctx.fillStyle = '#ff3333';
    ctx.beginPath();
    ctx.arc(gameState.monsterX, gameState.monsterY, 20, 0, Math.PI * 2);
    ctx.fill();

    // Monster glow
    ctx.fillStyle = 'rgba(255, 51, 51, 0.3)';
    ctx.beginPath();
    ctx.arc(gameState.monsterX, gameState.monsterY, 35, 0, Math.PI * 2);
    ctx.fill();

    // Monster eyes
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(gameState.monsterX - 8, gameState.monsterY - 5, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(gameState.monsterX + 8, gameState.monsterY - 5, 4, 0, Math.PI * 2);
    ctx.fill();
}

// Check if monster is visible (within flashlight range)
function isMonsterVisible() {
    const dx = gameState.playerX - gameState.monsterX;
    const dy = gameState.playerY - gameState.monsterY;
    const distanceToMonster = Math.sqrt(dx * dx + dy * dy);
    return distanceToMonster < GAME_CONFIG.FLASHLIGHT_RADIUS * 1.5;
}

// Draw warning when monster is close
function drawWarning() {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.6)';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SOMETHING IS NEAR...', canvas.width / 2, 50);

    // Pulse effect
    const pulse = Math.sin(Date.now() / 200) * 0.3 + 0.7;
    ctx.strokeStyle = `rgba(255, 0, 0, ${pulse})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 150, 0, Math.PI * 2);
    ctx.stroke();
}

// Restart button
restartBtn.addEventListener('click', () => {
    initGame();
    gameLoop();
});

// Game loop
function gameLoop() {
    update();
    updateFlashlight();
    draw();
    
    if (gameState.isRunning) {
        requestAnimationFrame(gameLoop);
    }
}

// Start game
initGame();
gameLoop();
