var _ = function(key) { 
	try {
		return arguments.callee.DICT[key] || key;
	} catch (e) {
		return key; 
	}
}

var AGE = OZ.Class();

AGE.LOCATION_START	= 1;
AGE.LOCATION_END	= 2;
AGE.LOCATION_INDEX	= 4;

AGE.prototype.init = function(file) {
	AGE.current = this;
	this._adventure = null;
	this._location = null;
	this._variables = {};
	this._actions = [];
	this._moves = 0;
	
	this._dom = {
		header: OZ.DOM.elm("h2"),
		location: OZ.DOM.elm("div", {id:"location"}),
		actions: OZ.DOM.elm("div", {id:"actions"}),
		inventory: OZ.DOM.elm("div", {id:"inventory"}),
		stats: OZ.DOM.elm("div", {id:"stats"}),
		ok: OZ.DOM.elm("button", {innerHTML:"OK"})
	}
	
	document.body.innerHTML = "";
	OZ.DOM.append([document.body, this._dom.header, this._dom.inventory, this._dom.location, this._dom.actions]);
	OZ.Event.add(this._dom.actions, "click", this._clickAction.bind(this));
	OZ.Event.add(this._dom.ok, "click", this._clickOK.bind(this));
	
	OZ.Request(file, this._responseAdventure.bind(this));
}

AGE.prototype.graph = function() {
	var str = "digraph G {\n";
	str += "\tgraph[splines=true,overlap=prism,sep=0.3]\n";
	str += "\tnode[width=3,height=1]\n";
	
	for (var id in this._adventure.locations) {
		var location = this._adventure.locations[id];
		str += "\t" + id + " [label=\"" + location.name + "\"";
		if (location.flags & AGE.LOCATION_INDEX) { str += ",penwidth=4"; }
		if (location.flags & AGE.LOCATION_START) { str += ",color=\"blue\""; }
		if (location.flags & AGE.LOCATION_END) { str += ",color=\"red\""; }
		str += "]\n";
	}
	
	str += "\n";
	
	for (var id in this._adventure.locations) {
		var location = this._adventure.locations[id];
		var targets = [];
		for (var aid in location.actions) {
			var action = location.actions[aid];
			if (action.location && action.location != id && targets.indexOf(action.location) == -1) {
				targets.push(action.location);
				str += "\t" + id + " -> " + action.location + "\n";
			}
			
			if (!action.alternatives) { continue; }
			
			for (var i=0;i<action.alternatives.length;i++) {
				var alternative = action.alternatives[i];
				if (alternative.location && alternative.location != id && targets.indexOf(alternative.location)) {
					targets.push(alternative.location);
					str += "\t" + id + " -> " + alternative.location + "\n";
				}
			}
			
		}
	}

	str += "\}";
	
	var ta = OZ.DOM.elm("textarea", {position:"absolute", left:"0px", top:"0px", value:str});
	document.body.appendChild(ta);
}

AGE.prototype.print = function() {
	var html = "";
	html += "<!doctype html><html><head><title>" + this._adventure.name + "</title><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><link rel='stylesheet' type='text/css' href='print.css' /></head><body>\n";
	
	for (var id in this._adventure.locations) {
		html += this._printLocation(id);
	}
	
	html += "</body></html>";
	
	var ta = OZ.DOM.elm("textarea", {position:"absolute", left:"0px", top:"0px", value:html});
	document.body.appendChild(ta);
}

AGE.prototype._printLocation = function(id) {
	var location = this._adventure.locations[id];
	var str = "";
	
	str += "\t<div class='location'>\n";
	str += "\t\t<h2><span class='id'>" + id + ":</span> " + location.name + "</h2>\n";
	if (location.image) {
		str += "\t\t<div class='image'><img src='" + location.image + "' /></div>\n";
	}
	if (location.description) { 
		str += "\t\t<p>" + location.description + "</p>\n";
	}
	str += "\t</div>\n";
	
	if (location.actions) {
		str += this._printActions(id, location.actions);
	}
	return str;
}

AGE.prototype._printActions = function(id, actions) {
	var str = "";
	str += "\t<div class='actions'><table>\n";
	
	var row1 = "\t\t<tr class='action'>\n";
	var row2 = "\t\t<tr class='result'>\n";
	
	for (var i=0;i<actions.length;i++) {
		var action = actions[i];
		row1 += "\t\t\t<td><span class='number'>" + id + (i+1) + ":</span> " + action.description + "</td>\n";
		row2 += "\t\t\t<td><span class='number'>" + id + (i+1) + ":</span> " + (action.result || "") + "</td>\n";
	}
	
	row1 += "\t\t</tr>\n";
	row2 += "\t\t</tr>\n";
	
	str += row1 + row2;
	str += "\t</table></div>\n";
	return str;
}

AGE.prototype._responseAdventure = function(adventure) {
	this._adventure = eval("(" + adventure + ")");
	
	var links = document.getElementsByTagName("link");
	while (links.length) { links[0].parentNode.removeChild(links[0]); }
	
	if (this._adventure.style) {
		var link = OZ.DOM.elm("link", {rel:"stylesheet", type:"text/css", href:this._adventure.style});
		document.getElementsByTagName("head")[0].appendChild(link);
	}
	
	var language = this._adventure.language || "en";
	this._requestLanguage(language);
}

AGE.prototype._requestLanguage = function(language) {
	var f = "age." + language + ".js?r=" + Math.random();
	OZ.Request(f, this._responseLanguage.bind(this));
}

AGE.prototype._responseLanguage = function(data, status) {
	if (status != 200) { 
		this._requestLanguage("en");
	} else {
		eval(data);
		this._start();
	}
}

AGE.prototype._start = function() {
	this._dom.header.innerHTML = this._adventure.name;
	
	this._variables = {};
	this._location = null;
	this._moves = 0;

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
		alert(_("error.nostart"));
		return;
	}
	
	this._showLocation();
	this._updateInventory();
}

AGE.prototype._end = function() {
	var discovered = 0;
	for (var id in this._adventure.locations) {
		if (this._adventure.locations[id].discovered) { discovered++; }
	}
	discovered--;
	
	var h3 = OZ.DOM.elm("h3", {innerHTML:_("stats")});
	var ul = OZ.DOM.elm("ul");
	
	var li = OZ.DOM.elm("li", {innerHTML:_("stats.discovered") + " " + discovered});
	ul.appendChild(li);
	
	var li = OZ.DOM.elm("li", {innerHTML:_("stats.moves") + " " + this._moves});
	ul.appendChild(li);

	OZ.DOM.append(
		[this._dom.stats, h3, ul],
		[document.body, this._dom.stats]
	);
}

/**
 * Display current location
 */
AGE.prototype._showLocation = function() {
	OZ.DOM.clear(this._dom.location);
	this._dom.actions.style.display = "none";
	
	var location = this._adventure.locations[this._location];
	location.discovered = true;
	
	var h3 = OZ.DOM.elm("h3", {innerHTML:location.name});
	this._dom.location.appendChild(h3);
	
	if (location.image) {
		var img = OZ.DOM.elm("img", {src:location.image});
		this._dom.location.appendChild(img);
	}
	
	if (location.description) {
		var p = OZ.DOM.elm("p", {innerHTML:location.description});
		this._dom.location.appendChild(p);
	}
	
	if (location.flags & AGE.LOCATION_END) { 
		this._end();
	} else {
		this._showActions(); 
	}
}

/**
 * Draw individual actions available for current location
 */
AGE.prototype._showActions = function() {
	var actions = this._adventure.locations[this._location].actions;
	OZ.DOM.clear(this._dom.actions);
	
	var h3 = OZ.DOM.elm("h3", {innerHTML:_("actions")});
	var ul = OZ.DOM.elm("ul");
	OZ.DOM.append([this._dom.actions, h3, ul]);
	
	this._actions = [];
	for (var i=0;i<actions.length;i++) {
		var action = actions[i];
		var li = OZ.DOM.elm("li");
		if (this._validateRequirements(action.requires)) {
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
		var h3 = OZ.DOM.elm("h3", {innerHTML:_("index")});
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
	
	var h3 = OZ.DOM.elm("h3", {innerHTML:_("inventory")});
	var ul = OZ.DOM.elm("ul");

	OZ.DOM.append([this._dom.inventory, h3, ul]);

	var count = 0;
	for (var id in this._variables) {
		var v = this._adventure.variables[id];
		if (!v.visible || !this._variables[id]) { continue; }
		count++;

		var li = OZ.DOM.elm("li");
		if (typeof(this._variables[id]) == "boolean") {
			li.innerHTML = v.name;
		} else {
			li.innerHTML = this._variables[id] + "x " + v.name;
		}

		this._dom.inventory.appendChild(li);
	}
	
	if (count) {
		this._dom.inventory.style.display = "";
	} else {
		this._dom.inventory.style.display = "none";
	}
	
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

AGE.prototype._validateRequirements = function(requires) {
	if (!requires) { return true; }
	for (var id in requires) {
		var amount = this._variables[id];
		if (!eval(amount + requires[id])) { return false; }
	}
	return true;
}

/**
 * Execute a given action
 */
AGE.prototype._executeAction = function(action) {
	var result = action;
	
	if (action.alternatives) {
		for (var i=0;i<action.alternatives.length;i++) {
			var alternative = action.alternatives[i];
			if (this._validateRequirements(alternative.requires)) {
				result = alternative;
				break;
			}
		}
	}
	
	if (result.variables) {
		for (var id in result.variables) {
			var x = this._variables[id];
			eval("x" + result.variables[id]);
			this._variables[id] = x;
		}
		
		this._updateInventory();
	}
	
	if (result.location && result.location != this._location) { this._moves++; }
	this._location = (result.location || this._location);

	if (result.result) { 
		var p = OZ.DOM.elm("p", {innerHTML: result.result});
		OZ.DOM.clear(this._dom.actions);
		OZ.DOM.append([this._dom.actions, p, this._dom.ok]);
	} else {
		this._showLocation();
	}
}

AGE.prototype._clickOK = function(e) {
	this._showLocation();
}
