var CurrentState = require('./current-state')
var Test = require('tape')

Test("current-state", function(t) {
	
	var data = {
		character : "Link",
		game : "Ocarina of Time"
	}
	var state = CurrentState(data)

	var timesChanged = 0
	
	state.onChange(function() {
		timesChanged++
	})
	
	t.test("get functionality", function(t) {

		t.plan(2)
		
		t.equal( state.get("character"),  "Link",  "gets by key-pair")
		t.equal( state.get(), data,  "gets underlying data")
	})
	
	t.test("set functionality", function(t) {
		
		t.plan(4)
		
		state.set('character', 'Zelda')
		
		t.equal( timesChanged, 1, "changed handler runs")
		t.equal( state.get('character'), 'Zelda', "the state state object is changed")

		state.set({game: "Majora's Mask"})
		
		t.equal( timesChanged, 2, "changed handler runs")
		t.deepEquals(
			state.get(),
			{
				character : "Zelda",
				game : "Majora's Mask"
			},
			"Selectively update by object"
		)
	})

	t.test("silently set functionality", function(t) {
		
		t.plan(4)
		
		state.set('character', 'Goron', true)
		
		t.equal( timesChanged, 2, "changed handler does not fire")
		t.equal( state.get('character'), 'Goron', "the state state object is changed")

		state.set({game: "A Link to the Past"}, true)
		
		t.equal( timesChanged, 2, "changed handler does not fire")
		t.deepEquals(
			state.get(),
			{
				character : "Goron",
				game : "A Link to the Past"
			},
			"Selectively update by object"
		)
	})
	
	t.test("onChange", function(t) {
		
		t.plan(2)
		
		var handleChanged = function( current, previous ) {
			t.equal( current, data, "changed event passes data object" )
		}
		
		state.onChange( handleChanged )

		state.set("character", "Link")
		
		state.offChange( handleChanged )
		
		state.set("character", "Link")
		
		t.ok("change event was removed")
	})
	
	t.test("onChange previous/current", function(t) {
		
		t.plan(4)
		
		var prevCharacter
		var currCharacter
		
		var handleChanged = function( current, previous ) {
			
			t.equal( current.character, currCharacter, "current matches" )
			t.equal( previous.character, prevCharacter, "previous matches" )
		}
		
		state.onChange( handleChanged )

		state.set("character", "Link", true)
		
		prevCharacter = "Link"
		currCharacter = "Goron"
		
		state.set("character", "Goron")
		
		prevCharacter = "Goron"
		currCharacter = "Ganon"
		
		state.set("character", "Ganon")
		state.offChange( handleChanged )
	})
	
})