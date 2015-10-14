var EventEmitter = require('events').EventEmitter
var Assign = require('object-assign')

function _setFn( current, emitter ) {

	return function set( a, b, c ) {

		var silent = false
		
		if( typeof a === "string" ) {
			
			var key = a
			var value = b
			silent = c
			
			current[key] = value
			
		} else {
			
			var newState = a
			silent = b
			
			Assign( current, newState )
			
		}
		if( !silent ) {
			emitter.emit( 'changed', current )
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

module.exports = function connectionState( current ) {
	
	var emitter = new EventEmitter()
	emitter.setMaxListeners(0)
	
	return {
		set     : _setFn( current, emitter ),
		get     : _getFn( current ),
		emitter : emitter,
		on      : emitter.on.bind( emitter ),
		off     : emitter.removeListener.bind( emitter )
	}
}