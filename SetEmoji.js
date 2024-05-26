const autoReactions = (function() {
    // Pause to stop 
    let timerId = null;
    
    // Arr of emotions
    const availableEmojis = ['💖', '👍', '🎉', '👏', '😂', '😮', '😢', '🤔', '👎'];
    
    // CSS-to open palette
    const reactionButtonSelector = '[role=button][aria-label="Send a reaction"]';
    
    // Create css selector 
    const emojiButtonSelector = function(emoji) {
      return `[role=button][aria-label="${emoji}"]`;
    };
    
    function isValidEmoji(emoji) {
      return availableEmojis.includes(emoji);
    }
    
    // Open Palette
    function openPalette() {
      const button = document.querySelector(reactionButtonSelector);
      if (button) {
        button.click();
        return true;
      }
      return false;
    }
    
    // Check if Palette already open
    function isPaletteOpen() {
      return !!document.querySelector(emojiButtonSelector(availableEmojis[0]));
    }
    
    // Start reacting
    function startReacting(emoji, delay) {
      // check if emoji available 
      if (!isValidEmoji(emoji)) {
        throw new Error(`Invalid emoji. Valid emojis are: ${availableEmojis.join(', ')}`);
      }
      // Check if interval is > 0 
      if (typeof delay !== 'number' || delay <= 0) {
        throw new Error('Delay must be > 0.');
      }
    
      // if Palette is not open, let's open it
      if (!isPaletteOpen()) {
        openPalette();
      }
      // Set Interval
      timerId = setInterval(() => {
        // if panel is closed, stop all reactions
        if (!isPaletteOpen()) {
          stopReacting();
          return;
        }
        // find emoji button and click
        const emojiButton = document.querySelector(emojiButtonSelector(emoji));
        if (emojiButton) {
          emojiButton.click();
        } else {
          stopReacting();
          throw new Error('No emoji button found.');
        }
      }, delay);
    }
    
    // Halt reacting
    function stopReacting() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    }
    
    // Return startReacting & stopReacting
    return {
      startReacting,
      stopReacting
    };
  })();
  
  //autoReactions.startReacting('👍', 1000); // Start liking on meet
  //autoReactions.startReacting('😂', 200); // Start laughing on meet
  // autoReactions.stopReacting(); // Stops reactions
  
