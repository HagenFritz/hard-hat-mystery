# Hard Hat Mystery: A Nancy Drew-Style Adventure Game

A point-and-click mystery adventure game inspired by the classic Nancy Drew PC games by Her Interactive. Set on a construction site where equipment has been mysteriously tampered with, players must investigate, interrogate suspects, solve puzzles, and uncover the truth.

## Game Premise

**Setting:** An active construction site for a new commercial building

**The Mystery:** Someone has been sabotaging heavy equipment—a bobcat with cut brake lines, a man-lift with a damaged hydraulic system, a cement mixer with contaminated fuel. The project is behind schedule, tensions are high, and the site foreman has asked you to quietly investigate before someone gets hurt.

**Characters:**
- **Marcus Chen** - Site Foreman. Stressed about deadlines, hired you to investigate. Knows everyone's business but is holding something back.
- **Dana Kowalski** - Equipment Operator. 15 years experience, recently passed over for promotion. Found near the sabotaged bobcat.

**Gameplay:** First-person exploration through static scene backgrounds with clickable hotspots. Gather clues, examine items, interrogate suspects through branching dialogue, and solve puzzles to progress the investigation.

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React + TypeScript | Game engine, UI, rendering |
| Backend | Python (FastAPI) | API endpoints, auth verification |
| Authentication | Firebase Auth | User login/registration |
| Database | Firestore | User profiles, save game data |
| Asset Storage | GCP Cloud Storage | Images, audio files |
| Voice Generation | ElevenLabs | Character dialogue audio |
| Deployment | Vercel | Frontend hosting + serverless functions |

## Project Structure

```
hard-hat-mystery/
├── frontend/                    # React + TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   ├── game/           # Core game components
│   │   │   │   ├── SceneRenderer.tsx
│   │   │   │   ├── Hotspot.tsx
│   │   │   │   ├── DialogueBox.tsx
│   │   │   │   ├── Inventory.tsx
│   │   │   │   ├── ItemExaminer.tsx
│   │   │   │   └── TransitionEffect.tsx
│   │   │   ├── minigames/      # Self-contained puzzle components
│   │   │   │   ├── MiniGameWrapper.tsx
│   │   │   │   ├── LockPuzzle.tsx
│   │   │   │   ├── SlidingPuzzle.tsx
│   │   │   │   ├── WiringPuzzle.tsx
│   │   │   │   └── SafeCracker.tsx
│   │   │   └── ui/             # Menus and interface
│   │   │       ├── MainMenu.tsx
│   │   │       ├── SaveLoadMenu.tsx
│   │   │       ├── SettingsMenu.tsx
│   │   │       ├── SecondChance.tsx
│   │   │       └── AuthModal.tsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useGameState.ts
│   │   │   ├── useAudio.ts
│   │   │   ├── useDialogue.ts
│   │   │   └── useSaveLoad.ts
│   │   ├── context/            # React context providers
│   │   │   ├── GameContext.tsx
│   │   │   └── AudioContext.tsx
│   │   ├── types/              # TypeScript interfaces
│   │   │   ├── scene.ts
│   │   │   ├── dialogue.ts
│   │   │   ├── inventory.ts
│   │   │   ├── gameState.ts
│   │   │   └── puzzle.ts
│   │   ├── utils/              # Helper functions
│   │   │   ├── assetLoader.ts
│   │   │   └── conditionEvaluator.ts
│   │   └── content/            # Game content (JSON)
│   │       └── chapter1/
│   │           ├── chapter.json
│   │           ├── scenes.json
│   │           ├── characters.json
│   │           ├── items.json
│   │           ├── puzzles.json
│   │           └── dialogues/
│   │               ├── marcus_chen.json
│   │               └── dana_kowalski.json
│   ├── public/
│   │   └── assets/
│   │       ├── scenes/         # Background images
│   │       ├── characters/     # Character portraits
│   │       ├── items/          # Inventory item images
│   │       ├── audio/
│   │       │   ├── music/      # Background music
│   │       │   ├── ambient/    # Environmental sounds
│   │       │   └── voice/      # Character dialogue
│   │       └── ui/             # Interface elements
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                     # Python FastAPI
│   ├── api/
│   │   ├── __init__.py
│   │   ├── main.py             # FastAPI app entry point
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py         # Firebase token verification
│   │   │   ├── saves.py        # Save/load game endpoints
│   │   │   └── assets.py       # GCP signed URL generation
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py         # User data models
│   │   │   └── save_game.py    # Save game data models
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── firebase.py     # Firebase Admin SDK setup
│   │   │   ├── firestore.py    # Firestore CRUD operations
│   │   │   └── storage.py      # GCP Cloud Storage operations
│   │   └── config.py           # Environment configuration
│   └── requirements.txt
│
├── vercel.json                  # Vercel deployment config
├── .env.example                 # Environment variables template
└── README.md                    # This file
```

## Core Systems

### 1. Scene Navigation

The game uses a node-based navigation system where each location is a static background image with interactive hotspots.

**Scene Types:**
- `navigation` - Standard explorable location
- `dialogue` - Conversation with a character
- `puzzle` - Mini-game interaction
- `cutscene` - Non-interactive story moment

**Hotspot Actions:**
- `navigate` - Move to another scene
- `examine` - Display description text
- `pickup` - Add item to inventory
- `talk` - Initiate dialogue
- `puzzle` - Launch mini-game
- `use_item` - Requires specific inventory item

### 2. Dialogue System

Branching conversation trees with support for:
- Multiple response options
- Conditional dialogue (requires item, flag, or prior conversation)
- Dialogue effects (set flags, give items, unlock new topics)
- Character portraits and voice audio playback

### 3. Inventory System

- Items collected from scenes or received through dialogue
- Item examination with detailed descriptions and close-up images
- Items can be required for certain hotspots or dialogue options
- No item combination (simplified for this version)

### 4. Game State

**Tracked State:**
- `currentScene` - Player's current location
- `inventory` - Array of collected item IDs
- `flags` - Key-value pairs for story progress (e.g., `"found_evidence_1": true`)
- `dialogueProgress` - Which conversation nodes have been visited
- `puzzlesCompleted` - Array of completed puzzle IDs
- `timestamp` - Last save time

**Save System:**
- Single continuous save slot per user
- Auto-save on scene transitions
- Manual save available from menu
- Stored in Firestore under user document

### 5. Mini-Games

Four puzzle types, three casual and one high-stakes:

| Puzzle | Type | Description | Fail State |
|--------|------|-------------|------------|
| Lock Puzzle | Casual | Enter combination based on clues found | No fail, unlimited attempts |
| Sliding Puzzle | Casual | Rearrange tiles to form image | No fail, unlimited time |
| Wiring Puzzle | Casual | Connect matching wire endpoints | No fail, unlimited attempts |
| Safe Cracker | High-Stakes | Timed dial combination puzzle | Fail triggers "Second Chance" screen |

**Second Chance System:**
When failing the Safe Cracker puzzle, players see the classic "Second Chance" screen allowing them to retry from just before the puzzle or return to the main menu.

## Content Schema

### scenes.json
```json
{
  "scenes": [
    {
      "id": "site_entrance",
      "name": "Site Entrance",
      "background": "scenes/site_entrance.jpg",
      "ambientAudio": "ambient/construction_distant.mp3",
      "hotspots": [
        {
          "id": "gate",
          "type": "navigate",
          "target": "main_yard",
          "bounds": { "x": 400, "y": 200, "width": 200, "height": 300 },
          "cursor": "arrow",
          "hoverText": "Enter the site"
        },
        {
          "id": "sign",
          "type": "examine",
          "description": "A weathered sign reads 'Hartfield Commercial Development - Phase 2'. Below it, someone has scrawled 'UNSAFE' in red marker.",
          "bounds": { "x": 100, "y": 150, "width": 150, "height": 100 },
          "cursor": "magnify"
        }
      ],
      "connections": ["main_yard"]
    }
  ]
}
```

### characters.json
```json
{
  "characters": [
    {
      "id": "marcus_chen",
      "name": "Marcus Chen",
      "role": "Site Foreman",
      "portrait": "characters/marcus_chen.png",
      "voiceId": "elevenlabs_voice_id_here",
      "description": "A stocky man in his 50s with a hard hat permanently fused to his head. His clipboard is never far from reach."
    }
  ]
}
```

### dialogues/marcus_chen.json
```json
{
  "characterId": "marcus_chen",
  "startNode": "greeting",
  "nodes": {
    "greeting": {
      "speaker": "marcus_chen",
      "text": "You must be the investigator. Look, I need this handled quietly. The crew's already on edge.",
      "voiceFile": "voice/marcus/greeting.mp3",
      "responses": [
        {
          "text": "Tell me about the sabotage.",
          "nextNode": "about_sabotage"
        },
        {
          "text": "Who do you suspect?",
          "nextNode": "suspects",
          "condition": { "flag": "heard_about_sabotage" }
        },
        {
          "text": "I'll look around first.",
          "nextNode": "end"
        }
      ]
    },
    "about_sabotage": {
      "speaker": "marcus_chen",
      "text": "Three incidents in two weeks. Bobcat brakes, man-lift hydraulics, cement mixer fuel. Someone knows exactly what they're doing.",
      "voiceFile": "voice/marcus/about_sabotage.mp3",
      "effects": [
        { "type": "setFlag", "flag": "heard_about_sabotage", "value": true }
      ],
      "responses": [
        {
          "text": "Any witnesses?",
          "nextNode": "witnesses"
        },
        {
          "text": "Who has access to the equipment?",
          "nextNode": "access"
        }
      ]
    }
  }
}
```

### items.json
```json
{
  "items": [
    {
      "id": "cut_brake_line",
      "name": "Severed Brake Line",
      "description": "A rubber hose with a clean cut. This wasn't wear and tear—someone used a sharp blade.",
      "icon": "items/brake_line_icon.png",
      "examineImage": "items/brake_line_detail.png"
    }
  ]
}
```

### puzzles.json
```json
{
  "puzzles": [
    {
      "id": "toolbox_lock",
      "type": "lock",
      "name": "Toolbox Combination Lock",
      "config": {
        "digits": 4,
        "solution": "1987",
        "hint": "The year on Marcus's safety certification"
      },
      "canFail": false,
      "onComplete": {
        "giveItem": "suspicious_note",
        "setFlag": "toolbox_opened"
      }
    },
    {
      "id": "office_safe",
      "type": "safecracker",
      "name": "Office Safe",
      "config": {
        "combination": [32, 16, 48],
        "timeLimit": 60,
        "directions": ["right", "left", "right"]
      },
      "canFail": true,
      "onComplete": {
        "giveItem": "financial_records",
        "setFlag": "safe_cracked"
      }
    }
  ]
}
```

## Scene Map (Chapter 1)

```
                    ┌─────────────────┐
                    │  Site Entrance  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │    Main Yard    │◄────────────────┐
                    └────────┬────────┘                 │
                             │                          │
        ┌────────────────────┼────────────────────┐     │
        │                    │                    │     │
┌───────▼───────┐   ┌────────▼────────┐   ┌──────▼─────┴──┐
│ Equipment Bay │   │  Foreman Office │   │  Storage Area  │
│  (Dana here)  │   │  (Marcus here)  │   │               │
└───────┬───────┘   └────────┬────────┘   └───────┬───────┘
        │                    │                     │
┌───────▼───────┐   ┌────────▼────────┐   ┌───────▼───────┐
│ Bobcat Close  │   │  Office Interior│   │ Behind Storage│
│    (puzzle)   │   │    (puzzle)     │   │    (clue)     │
└───────────────┘   └─────────────────┘   └───────────────┘
```

**10 Scenes:**
1. Site Entrance
2. Main Yard (hub)
3. Equipment Bay
4. Bobcat Close-up
5. Foreman Office Exterior
6. Foreman Office Interior
7. Storage Area
8. Behind Storage
9. Break Room (additional character interaction)
10. Man-lift Platform (accessed via puzzle completion)

## Audio Design

### Music
- `menu_theme.mp3` - Main menu music
- `investigation.mp3` - General exploration (subtle, tense)
- `dialogue.mp3` - Character conversations
- `puzzle.mp3` - Mini-game background
- `discovery.mp3` - Finding important clues (short sting)

### Ambient
- `construction_distant.mp3` - Distant machinery, backup beepers
- `wind.mp3` - Open areas
- `office_hum.mp3` - Interior fluorescent lights, computer fans
- `equipment_bay.mp3` - Echo, dripping, machinery ticking

### Voice
Generated via ElevenLabs with distinct voices per character. Files organized as:
```
voice/
├── marcus/
│   ├── greeting.mp3
│   ├── about_sabotage.mp3
│   └── ...
└── dana/
    ├── greeting.mp3
    └── ...
```

## API Endpoints

### Authentication
- `POST /api/auth/verify` - Verify Firebase ID token

### Save System
- `GET /api/saves` - Get user's save data
- `POST /api/saves` - Create/update save data
- `DELETE /api/saves` - Delete save data (reset game)

### Assets (if using signed URLs for private assets)
- `GET /api/assets/url?path={path}` - Get signed URL for GCP asset

## Environment Variables

```env
# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# GCP Storage
GCP_BUCKET_NAME=your-bucket-name
GCP_PROJECT_ID=your-project-id

# ElevenLabs (for voice generation during development)
ELEVENLABS_API_KEY=your-api-key

# Frontend
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

## Development Phases

### Phase 1: Project Foundation
- [ ] Initialize React + TypeScript frontend
- [ ] Initialize FastAPI backend
- [ ] Configure Vercel deployment
- [ ] Set up Firebase project
- [ ] Set up GCP Cloud Storage bucket

### Phase 2: Core Game Engine
- [ ] Scene renderer component
- [ ] Hotspot detection and interaction
- [ ] Scene transition system
- [ ] Basic game state management
- [ ] Navigation between scenes

### Phase 3: Inventory & Dialogue
- [ ] Inventory UI component
- [ ] Item pickup and storage
- [ ] Item examination modal
- [ ] Dialogue box component
- [ ] Dialogue tree traversal
- [ ] Conditional dialogue support

### Phase 4: Persistence
- [ ] Firebase Auth integration
- [ ] Firestore save/load operations
- [ ] Auto-save on scene change
- [ ] Save/load menu UI

### Phase 5: Mini-Games
- [ ] Mini-game wrapper component
- [ ] Lock puzzle implementation
- [ ] Sliding puzzle implementation
- [ ] Wiring puzzle implementation
- [ ] Safe cracker with timer
- [ ] Second Chance screen

### Phase 6: Audio
- [ ] Audio context provider
- [ ] Background music system
- [ ] Ambient sound per scene
- [ ] Voice playback in dialogue
- [ ] Volume controls

### Phase 7: Content & Polish
- [ ] Generate scene backgrounds (AI)
- [ ] Generate character portraits (AI)
- [ ] Generate item images (AI)
- [ ] Generate voice lines (ElevenLabs)
- [ ] Write all dialogue content
- [ ] Configure all puzzles
- [ ] UI polish and transitions

### Phase 8: Testing & Deployment
- [ ] Playtest full chapter
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Production deployment

## Extending the Game

### Adding a New Chapter

1. Create new folder: `content/chapter2/`
2. Copy JSON structure from chapter1
3. Update `chapter.json` with new metadata
4. Create new scenes, dialogues, items, puzzles
5. Generate new assets
6. Add chapter selection to main menu

### Adding a New Mini-Game

1. Create component in `components/minigames/`
2. Implement standard interface:
   ```typescript
   interface MiniGameProps {
     config: PuzzleConfig;
     onComplete: () => void;
     onFail?: () => void;
   }
   ```
3. Register in `MiniGameWrapper.tsx`
4. Add puzzle type to `puzzles.json` schema

### Adding a New Character

1. Add entry to `characters.json`
2. Create dialogue file in `dialogues/`
3. Generate portrait image
4. Generate voice lines
5. Place character in scene via hotspot

## Asset Generation Notes

### Scene Backgrounds
- Resolution: 1920x1080 recommended
- Style: Semi-realistic, slightly stylized
- Prompt tip: "First person view of [location], construction site, overcast day, mystery game aesthetic, detailed environment"

### Character Portraits
- Resolution: 512x768 recommended
- Style: Consistent across all characters
- Multiple expressions if desired (neutral, suspicious, angry, helpful)

### Item Images
- Icon: 128x128 for inventory
- Detail: 512x512 for examination view
- Transparent background preferred

## License

[Your chosen license]

## Credits

Inspired by the Nancy Drew PC game series by Her Interactive.