# Current State

A node module that provides a mutable object that stores state. Once the underyling object is mutated through the interface a `changed` event is fired for reactive application design. It unsafely provides the underlying data object using the `get()` command, and re-uses the passed in object. The changed event provides the `current` and `previous` object. This module was built in a way to limit memory allocation and garbage collection.

# Usage

	var CurrentState = require('current-state')
	
	var state = CurrentState({
		character : "Link",
		game : "Ocarina of Time"
	})
	
	var handleChange = function( current, previous ) {
		console.log( "You are playing", current.game )
		console.log( "Your character is:", state.get('character') )
		console.log( "Your preivous character was:", previous.character )
		console.log( "Current state:", state.get() )
	}
	
	state.onChange(handleChange)
	
	state.set("character", "Zelda")
	state.set({game: "Majora's Mask"})
	
	state.offChange(handleChange)

# Interface

	state.get()
	state.get("key")
	state.set("key", "value")
	state.set(object)
	state.set("key", "value", true) //Set silently
	state.set(object, true) //Set silently
	state.onChange(function( current, previous ) { ... })
	state.offChange(function( current, previous ) { ... })
