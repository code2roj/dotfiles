# Listof Tkinter's most commonly used methods and functions:

## Main Window

`Tk()`

Creates the main application window.

```python
root = Tk() # creates the main window
```

## Start the application window

`mainloop()`

Starts the event loop, making the window responsive. Typically is placed at the end of the code.

```python
root.mainloop() # starts the UI-window
```

## Text Label

`Label()`

Creates a text label widget. It can be used for all elements of the user interface

```python
label = Label(root, text="Hello, Tkinter!")
label.pack()
```

## Button

`Button()`

Creates a clickable button.

```python
button = Button(root, text="Click me", command=lambda: print("Button clicked"))
button.pack()
```

## Short Text Input Entry

`Entry()`

Creates a single-line text entry widget.

```python
entry = Entry(root)
entry.pack()
```

## Long Text Input Entry

`Text()`

Creates a multi-line text entry widget.

```python
text = Text(root)
text.pack()
```

## Sub Frame/Section

`Frame()`

Creates a container widget for organizing other widgets.

```python
frame = Frame(root)
frame.pack()
```

## Place the Section 

`pack()`

Places the widget in the window using the pack layout manager.

```python
widget.pack()
```

## Placement - Grid Layout 

`grid()`

Places the widget in the window using the grid layout manager.

```python
widget.grid(row=0, column=0)
```

## Placement - Exact Position

`place()`

Places the widget at an exact position in the window.

```python
widget.place(x=50, y=50)
```

## Draw Entry

`Canvas()`

Creates a canvas widget for drawing shapes.

```python
canvas = Canvas(root, width=200, height=200)
canvas.pack()
```

## Widget Event Relevance

`bind()`

Associates an event with a widget.

```python
widget.bind("<Button-1>", lambda event: print("Clicked"))
```

## Delay Function Execution


`after()`

Executes a function after a specified time delay.

```python
root.after(2000, lambda: print("2 seconds later"))
```

## Close and Teminate the Tkinter Application

`destroy()`

Closes the window and terminates the Tkinter application.

```python
root.destroy()
```

## Scrollbar

`Scrollbar()`

Creates a scrollbar for other widgets like `Text` or `Canvas`.

```python
scrollbar = Scrollbar(root)
scrollbar.pack(side=RIGHT, fill=Y)
```

## Drop-Down Menu

`Menu()`

Creates a menu bar or drop-down menu.

```python
menu = Menu(root)
root.config(menu=menu)
```

## Dynamic Properties

`config()`

Modifies a widget’s properties dynamically.

```python
label.config(text="New Text")
```

## String Variable

`StringVar()`

Creates a variable for managing the value of widgets like `Entry`.

```python
var = StringVar()
entry = Entry(root, textvariable=var)
```

## Integer Variable

`IntVar()`

Creates a variable for managing integer values of widgets.

```python
var = IntVar()
```

## Message Pop-Up

`messagebox.showinfo()`

Displays an informational message box.

```python
import tkinter.messagebox as mb
mb.showinfo("Info", "This is an info message")
```

## Warning Pop-Up

`messagebox.showwarning()`

Displays a warning message box.

```python
mb.showwarning("Warning", "This is a warning message")
```


## Error Pop-up


`messagebox.showerror()`

Displays an error message box.

```python
mb.showerror("Error", "This is an error message")
```

---
