# Current State

A node module that provides a mutable object that stores state. Once the underyling object is mutated through the interface a 'changed' event is fired for reactive application design. It unsafely provides the underlying data object using the get() command, and re-uses the passed in object.

# Usage

	var CurrentState = require('current-state')
	
	var current = CurrentState({
		character : "Link",
		game : "Ocarina of Time"
	})
	
	var handleChange = function() {
		console.log( "You are playing", current.get('game') )
		console.log( "Current state:", current.get() )
	}
	
	current.on('changed', handleChange)
	
	current.set("character", "Zelda")
	current.set({game: "Majora's Mask"})
	
	current.off('changed', handleChange)

# Interface

	current.get()
	current.get("key")
	current.set("key", "value")
	current.set(object)
	current.set("key", "value", true) //Set silently
	current.set(object, true) //Set silently
	current.on('changed', callback)
	current.off('changed', callback)
	current.emitter