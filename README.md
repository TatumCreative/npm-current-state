# Current State

A node module that provides a mutable object that stores state. Once the underyling object is mutated through the interface a `changed` event is fired for reactive application design. It unsafely provides the underlying data object using the `get()` command, and re-uses the passed in object. The changed event provides the `current` object.

# Usage

	var CurrentState = require('current-state')
	
	var state = CurrentState({
		character : "Link",
		game : "Ocarina of Time"
	})
	
	var handleChange = function( current ) {
		console.log( "You are playing", current.game )
		console.log( "Your character is:", state.get('character') )
		console.log( "Current state:", state.get() )
	}
	
	state.on('changed', handleChange)
	
	state.set("character", "Zelda")
	state.set({game: "Majora's Mask"})
	
	state.off('changed', handleChange)

# Interface

	state.get()
	state.get("key")
	state.set("key", "value")
	state.set(object)
	state.set("key", "value", true) //Set silently
	state.set(object, true) //Set silently
	state.on('changed', function( current ) { ... })
	state.off('changed', function( current ) { ...})
	state.emitter