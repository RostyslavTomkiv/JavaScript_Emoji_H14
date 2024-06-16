const autoReactions = (function() {
    // Pause to stop 
    let timerId = null;
    
    // Arr of emotions
    const availableEmojis = ['💖', '👍', '🎉', '👏', '😂', '😮', '😢', '🤔', '👎'];
    
    // XPath to open palette
    const reactionButtonXPath = '//*[@role="button" and @aria-label="Send a reaction"]';
    
    // Create XPath selector
    const emojiButtonXPath = function(emoji) {
        return `//*[@role="button" and @aria-label="${emoji}"]`;
    };
    
    function isValidEmoji(emoji) {
        return availableEmojis.includes(emoji);
    }
    
    // Open Palette
    function openPalette() {
        const button = document.evaluate(reactionButtonXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (button) {
            button.click();
            return true;
        }
        return false;
    }
    
    // Check if Palette already open
    function isPaletteOpen() {
        return !!document.evaluate(emojiButtonXPath(availableEmojis[0]), document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
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
            const emojiButton = document.evaluate(emojiButtonXPath(emoji), document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
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
