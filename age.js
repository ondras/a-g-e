var _ = function(key) { return key; }

var AGE = OZ.Class();

AGE.LOCATION_START	= 1;
AGE.LOCATION_END	= 2;
AGE.LOCATION_INDEX	= 4;

AGE.prototype.init = function(adventure) {
	this._adventure = adventure;
	this._location = null;
	this._variables = {};
	this._actions = [];
	
	this._dom = {
		location: OZ.DOM.elm("div", {id:"location"}),
		actions: OZ.DOM.elm("div", {id:"actions"}),
		inventory: OZ.DOM.elm("ul", {id:"inventory"})
	}
	
	OZ.DOM.append([document.body, this._dom.inventory, this._dom.location, this._dom.actions]);
	OZ.Event.add(this._dom.actions, "click", this._clickAction.bind(this));
}

AGE.prototype.start = function() {
	this._variables = {};
	this._location = null;

	/* init variables */
	for (var id in this._adventure.variables) {
		var v = this._adventure.variables[id];
		this._variables[id] = v.value;
	}
	
	/* find start place, mark all as not discovered */
	for (var id in this._adventure.locations) {
		var l = this._adventure.locations[id];
		l.discovered = false;
		if (l.flags & AGE.LOCATION_START) { this._location = id; }
	}
	
	if (!this._location) {
		alert(_("No starting location available"));
		return;
	}
	
	this._showLocation();
	this._updateInventory();
}

/**
 * Display current location
 */
AGE.prototype._showLocation = function() {
	this._dom.actions.style.display = "none";
	
	var location = this._adventure.locations[this._location];
	location.discovered = true;
	this._dom.location.innerHTML = location.name;
	
	if (!(location.flags & AGE.LOCATION_END)) { this._showActions(); }
}

/**
 * Draw individual actions available for current location
 */
AGE.prototype._showActions = function() {
	var actions = this._adventure.locations[this._location].actions;
	OZ.DOM.clear(this._dom.actions);
	
	var h3 = OZ.DOM.elm("h3", {innerHTML:_("Available actions:")});
	var ul = OZ.DOM.elm("ul");
	OZ.DOM.append([this._dom.actions, h3, ul]);
	
	this._actions = [];
	for (var i=0;i<actions.length;i++) {
		var action = actions[i];
		var li = OZ.DOM.elm("li");
		if (this._validateAction(action)) {
			var a = OZ.DOM.elm("a", {href:"#", innerHTML:action.description});
			li.appendChild(a);
			action.node = a;
		} else {
			li.innerHTML = action.description;
		}
		ul.appendChild(li);
		this._actions.push(action);
	}
	
	/* default, index-based actions */
	var indexActions = [];
	for (var id in this._adventure.locations) {
		var location = this._adventure.locations[id];
		if ((location.flags & AGE.LOCATION_INDEX) && location.discovered && id != this._location) {
			var action = { location: id };
			indexActions.push(action);
		}
	}
	
	if (indexActions.length) {
		var h3 = OZ.DOM.elm("h3", {innerHTML:_("You can always return to:")});
		var ul = OZ.DOM.elm("ul");
		while (indexActions.length) {
			var action = indexActions.shift();
			var li = OZ.DOM.elm("li");
			var name = this._adventure.locations[action.location].name;
			var a = OZ.DOM.elm("a", {href:"#", innerHTML:name});
			action.node = a;
			this._actions.push(action);
			OZ.DOM.append([ul, li], [li, a]);
		}
		OZ.DOM.append([this._dom.actions, h3, ul]);		
	}
	
	if (this._actions.length) { this._dom.actions.style.display = ""; }
}

/**
 * Update inventory contents
 */
AGE.prototype._updateInventory = function() {
	OZ.DOM.clear(this._dom.inventory);

	for (var id in this._variables) {
		var v = this._adventure.variables[id];
		if (!v.visible) { continue; }
		var li = OZ.DOM.elm("li");
		li.innerHTML = v.name + ": " + this._variables[id];
		this._dom.inventory.appendChild(li);
	}
	
	this._dom.inventory.style = (this._dom.inventory.firstChild ? "" : "none");
}

/**
 * User clicked an action link
 */
AGE.prototype._clickAction = function(e) {
	OZ.Event.prevent(e);
	var t = OZ.Event.target(e);
	for (var i=0;i<this._actions.length;i++) {
		var action = this._actions[i];
		if (action.node == t) { this._executeAction(action); }
	}
}

AGE.prototype._validateAction = function(action) {
	if (!action.requires) { return true; }
	for (var id in action.requires) {
		var amount = this._variables[id];
		if (!eval(amount + action.requires[id])) { return false; }
	}
	return true;
}

/**
 * Execute a given action
 */
AGE.prototype._executeAction = function(action) {
	if (action.result) { alert(action.result); }
	
	if (action.modifies) {
		for (var id in action.modifies) {
			if (id == "location") {
				this._location = eval(action.modifies[id]);
			} else {
				var x = this._variables[id];
				eval("x" + action.modifies[id]);
				this._variables[id] = x;
			}
		}
		
		this._updateInventory();
	}
	
	this._location = (action.location || this._location);
	this._showLocation();
}
