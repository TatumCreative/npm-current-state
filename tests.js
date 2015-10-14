var CurrentState = require('./current-state')
var Test = require('tape')

Test("current-state", function(t) {
	
	var data = {
		character : "Link",
		game : "Ocarina of Time"
	}
	var current = CurrentState(data)

	var timesChanged = 0
	
	current.on('changed', function() {
		timesChanged++
	})
	
	t.test("get functionality", function(t) {

		t.plan(2)
		
		t.equal( current.get("character"),  "Link",  "gets by key-pair")
		t.equal( current.get(), data,  "gets underlying data")
	})
	
	t.test("set functionality", function(t) {
		
		t.plan(4)
		
		current.set('character', 'Zelda')
		
		t.equal( timesChanged, 1, "changed emitter fires")
		t.equal( current.get('character'), 'Zelda', "the current state object is changed")

		current.set({game: "Majora's Mask"})
		
		t.equal( timesChanged, 2, "changed emitter fires")
		t.deepEquals(
			current.get(),
			{
				character : "Zelda",
				game : "Majora's Mask"
			},
			"Selectively update by object"
		)
	})

	t.test("silently set functionality", function(t) {
		
		t.plan(4)
		
		current.set('character', 'Goron', true)
		
		t.equal( timesChanged, 2, "changed emitter does not fire")
		t.equal( current.get('character'), 'Goron', "the current state object is changed")

		current.set({game: "A Link to the Past"}, true)
		
		t.equal( timesChanged, 2, "changed emitter does not fire")
		t.deepEquals(
			current.get(),
			{
				character : "Goron",
				game : "A Link to the Past"
			},
			"Selectively update by object"
		)
	})
	
	t.test("emitter", function(t) {
		
		t.plan(3)
		
		t.equal( typeof current.emitter,  "object",  "has an events emitter")
		
		var handleChanged = function( event ) {
			t.equal( event, data, "changed event passes data object" )
		}
		
		current.on('changed', handleChanged)

		current.set("character", "Link")
		
		current.off('changed', handleChanged)
		
		current.set("character", "Link")
		
		t.ok("change event was removed")
	})
	
})