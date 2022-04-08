# Intro

## ✏ Features to add

- Sync notes with local Storage
-

### [Using localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

- localStorage.getItem("key")
- localStorage.setItem("key", value)
- Note: value must be string, so if you have a more complex value like an array or object to save, you'll need to use: JSON.stringfy(value) or JSON.paser(stringifiedValue)

## ✏ Challenges

1.  - Spend 10-20+ minutes reading through the code and trying to understand how it's currently working. Spend as much time as you need to feel confident that you understand the existing code (although you don't need to fully understand everything to move on)

2.  - 1. Every time the `notes` array changes, save it
         in localStorage. You'll need to use JSON.stringify()
         to turn the array into a string to save in localStorage.
    - 2. When the app first loads, initialize the notes state
         with the notes saved in localStorage. You'll need to
         use JSON.parse() to turn the stringified array back
         into a real JS array.
