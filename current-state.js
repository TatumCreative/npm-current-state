var Assign = require('object-assign')

function _clone( object ) {
	var clone = {}
	for( key in object ) {
		if( object.hasOwnProperty( key ) ) {
			clone[key] = object[key]
		}
	}
	return clone
}

function _setFn( current, previous, fireChanged ) {

	return function set( a, b, c ) {

		var silent = false
		
		if( typeof a === "string" ) {
			
			var key = a
			var value = b
			silent = c
			
			current[key] = value
			if( !silent ) { fireChanged( current, previous ) }
			previous[key] = value
			
		} else {
			
			var newState = a
			silent = b
			
			Assign( current, newState )
			if( !silent ) { fireChanged( current, previous ) }
			Assign( previous, newState )
		}
		
	}
}

function _getFn( current ) {

	return function get( a ) {
		
		if( typeof a === "string" ) {
			var key = a
			return current[key]
		}
		
		return current
	}
}

function _fireChangedFn( handlers ) {

	return function fireChanged( current, previous ) {
		
		for( var i=0; i < handlers.length; i++ ) {
			handlers[i](current, previous)
		}
	}
}

function _changedFn( handlers ) {
	return function changed( handler ) {
		handlers.push( handler )
	}
}

function _removeChangedFn( handlers ) {
	return function removeChanged( handler ) {
		var index = handlers.indexOf( handler )
		if( index > 0 ) {
			handlers.splice( index, 1 )
		}
	}
}

module.exports = function connectionState( current ) {
	
	var previous = _clone( current )
	var handlers = []
	var fireChanged = _fireChangedFn( handlers )
	
	return {
		set       : _setFn( current, previous, fireChanged ),
		get       : _getFn( current ),
		onChange  : _changedFn( handlers ),
		offChange : _removeChangedFn( handlers ),
	}
}