Pictionary
========

One-day project #1.

Pictionary game using canvas, websockets and Flask.

Estimate maybe 6-10 hours dev time for a minimum playable product.

Challenges will include:

- finding a nice efficient way to serialise the lines
- building state machine for drawing 
- synchronisation barriers such that all players remain in sync
- dealing with player disconnect during game
- handling different canvas sizes! (start with a fixed size for all)
- Picking a name for the damn thing

Overall, though, should be pretty simple. Websockets and canvas are perfect for this, and we have working code from my dodgy 4920 project available, where we solved most of these problems.

##Setting up Python virtualenv

Use `pythonz` and `virtualenv`. There are good instructions [here](https://github.com/calvintam/comp4920/blob/master/README.md). 

##Basic milestones

- Simple drawing on canvas, colour palette, undo button. (est. 2 hours)
- Websockets, first client broadcasts their drawing to the others. (est. 1 hour)
- Taking turns, implement barriers and state machine (est. 2 hours)
- Game logic allowing a round to be played (est. ???)
- ????

If project successful, I would like to briefly profile it and graph the data.
