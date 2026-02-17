# 🌐 Understanding Meta Tags in HTML

## 1️⃣ What Are Meta Tags?

**Meta tags** are invisible HTML elements placed inside the `<head>` section of a webpage.

They:

- Describe the webpage to browsers  
- Provide information to search engines  
- Help social media platforms generate previews  
- Do NOT appear visually on the webpage  

They influence how machines interpret and process your site.

----------------------------------------------------------------------

## 🧩 Character Encoding Information

### Your Code

```html
<meta charset="UTF-8" />
```

----------------------------------------------------------------------

## ❓ What Does “Character Encoding” Mean?

Computers do not understand letters directly.

Everything is stored internally as numbers.

That means characters must be mapped to numeric values.

Examples:

```
A   → 65  
B   → 66  
₹   → 8377  
😊  → Unicode value  
```

Character encoding tells the browser:

> "How should these stored numbers be translated into readable text?"

----------------------------------------------------------------------

## 💡 Why UTF-8 Is Important

`UTF-8` is a universal encoding standard.

It supports:

- All world languages  
- Emojis  
- Mathematical symbols  
- Currency symbols  
- Programming characters  

It is the safest and most widely used encoding format.

----------------------------------------------------------------------

## ⚠ What Happens Without This Tag?

If encoding is not defined properly, the browser may misinterpret characters.

Example of broken output:

```
PhishBuster â€” AI Powered
??????
```

This happens because the browser guesses the wrong encoding.

----------------------------------------------------------------------

## 🎯 Conclusion

The following line ensures your webpage text renders correctly everywhere:

```html
<meta charset="UTF-8" />
```

It guarantees proper translation of stored numeric data into readable text across all devices and platforms.
