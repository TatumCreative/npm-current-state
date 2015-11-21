# Current State

[![build status][travis-image]][travis-url]
[![stability][stability-image]][stability-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

[stability-image]: https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square
[stability-url]: https://nodejs.org/api/documentation.html#documentation_stability_index
[npm-image]: https://img.shields.io/npm/v/current-state.svg?style=flat-square
[npm-url]: https://npmjs.org/package/current-state
[travis-image]: https://img.shields.io/travis/TatumCreative/npm-current-state/master.svg?style=flat-square
[travis-url]: http://travis-ci.org/TatumCreative/npm-current-state
[downloads-image]: http://img.shields.io/npm/dm/current-state.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/current-state

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
