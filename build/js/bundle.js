/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "2d44fb710567942138ab";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _objectWithoutPropertiesLoose; });
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ( true &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/invariant/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/invariant/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (true) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/phoenix/priv/static/phoenix.js":
/*!*****************************************************!*\
  !*** ./node_modules/phoenix/priv/static/phoenix.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(window,function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){(function(t){e.exports=t.Phoenix=n(2)}).call(this,n(1))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";function i(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],i=!0,o=!1,r=void 0;try{for(var s,a=e[Symbol.iterator]();!(i=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(o)throw r}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function c(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}n.r(t),n.d(t,"Channel",function(){return g}),n.d(t,"Socket",function(){return b}),n.d(t,"LongPoll",function(){return j}),n.d(t,"Ajax",function(){return R}),n.d(t,"Presence",function(){return T});var u="undefined"!=typeof self?self:window,h={connecting:0,open:1,closing:2,closed:3},l=1e4,f={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},p={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},d=[p.close,p.error,p.join,p.reply,p.leave],v={longpoll:"longpoll",websocket:"websocket"},y=function(e){if("function"==typeof e)return e;return function(){return e}},m=function(){function e(t,n,i,o){s(this,e),this.channel=t,this.event=n,this.payload=i||function(){return{}},this.receivedResp=null,this.timeout=o,this.timeoutTimer=null,this.recHooks=[],this.sent=!1}return c(e,[{key:"resend",value:function(e){this.timeout=e,this.reset(),this.send()}},{key:"send",value:function(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}},{key:"receive",value:function(e,t){return this.hasReceived(e)&&t(this.receivedResp.response),this.recHooks.push({status:e,callback:t}),this}},{key:"reset",value:function(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}},{key:"matchReceive",value:function(e){var t=e.status,n=e.response;e.ref;this.recHooks.filter(function(e){return e.status===t}).forEach(function(e){return e.callback(n)})}},{key:"cancelRefEvent",value:function(){this.refEvent&&this.channel.off(this.refEvent)}},{key:"cancelTimeout",value:function(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}},{key:"startTimeout",value:function(){var e=this;this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,function(t){e.cancelRefEvent(),e.cancelTimeout(),e.receivedResp=t,e.matchReceive(t)}),this.timeoutTimer=setTimeout(function(){e.trigger("timeout",{})},this.timeout)}},{key:"hasReceived",value:function(e){return this.receivedResp&&this.receivedResp.status===e}},{key:"trigger",value:function(e,t){this.channel.trigger(this.refEvent,{status:e,response:t})}}]),e}(),g=function(){function e(t,n,i){var o=this;s(this,e),this.state=f.closed,this.topic=t,this.params=y(n||{}),this.socket=i,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new m(this,p.join,this.params,this.timeout),this.pushBuffer=[],this.rejoinTimer=new C(function(){return o.rejoinUntilConnected()},this.socket.reconnectAfterMs),this.joinPush.receive("ok",function(){o.state=f.joined,o.rejoinTimer.reset(),o.pushBuffer.forEach(function(e){return e.send()}),o.pushBuffer=[]}),this.onClose(function(){o.rejoinTimer.reset(),o.socket.hasLogger()&&o.socket.log("channel","close ".concat(o.topic," ").concat(o.joinRef())),o.state=f.closed,o.socket.remove(o)}),this.onError(function(e){o.isLeaving()||o.isClosed()||(o.socket.hasLogger()&&o.socket.log("channel","error ".concat(o.topic),e),o.state=f.errored,o.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",function(){o.isJoining()&&(o.socket.hasLogger()&&o.socket.log("channel","timeout ".concat(o.topic," (").concat(o.joinRef(),")"),o.joinPush.timeout),new m(o,p.leave,y({}),o.timeout).send(),o.state=f.errored,o.joinPush.reset(),o.rejoinTimer.scheduleTimeout())}),this.on(p.reply,function(e,t){o.trigger(o.replyEventName(t),e)})}return c(e,[{key:"rejoinUntilConnected",value:function(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this.rejoin()}},{key:"join",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.timeout;if(this.joinedOnce)throw"tried to join multiple times. 'join' can only be called a single time per channel instance";return this.joinedOnce=!0,this.rejoin(e),this.joinPush}},{key:"onClose",value:function(e){this.on(p.close,e)}},{key:"onError",value:function(e){return this.on(p.error,function(t){return e(t)})}},{key:"on",value:function(e,t){var n=this.bindingRef++;return this.bindings.push({event:e,ref:n,callback:t}),n}},{key:"off",value:function(e,t){this.bindings=this.bindings.filter(function(n){return!(n.event===e&&(void 0===t||t===n.ref))})}},{key:"canPush",value:function(){return this.socket.isConnected()&&this.isJoined()}},{key:"push",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.timeout;if(!this.joinedOnce)throw"tried to push '".concat(e,"' to '").concat(this.topic,"' before joining. Use channel.join() before pushing events");var i=new m(this,e,function(){return t},n);return this.canPush()?i.send():(i.startTimeout(),this.pushBuffer.push(i)),i}},{key:"leave",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.timeout;this.state=f.leaving;var n=function(){e.socket.hasLogger()&&e.socket.log("channel","leave ".concat(e.topic)),e.trigger(p.close,"leave")},i=new m(this,p.leave,y({}),t);return i.receive("ok",function(){return n()}).receive("timeout",function(){return n()}),i.send(),this.canPush()||i.trigger("ok",{}),i}},{key:"onMessage",value:function(e,t,n){return t}},{key:"isLifecycleEvent",value:function(e){return d.indexOf(e)>=0}},{key:"isMember",value:function(e,t,n,i){return this.topic===e&&(!i||i===this.joinRef()||!this.isLifecycleEvent(t)||(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:e,event:t,payload:n,joinRef:i}),!1))}},{key:"joinRef",value:function(){return this.joinPush.ref}},{key:"sendJoin",value:function(e){this.state=f.joining,this.joinPush.resend(e)}},{key:"rejoin",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.timeout;this.isLeaving()||this.sendJoin(e)}},{key:"trigger",value:function(e,t,n,i){var o=this.onMessage(e,t,n,i);if(t&&!o)throw"channel onMessage callbacks must return the payload, modified or unmodified";for(var r=0;r<this.bindings.length;r++){var s=this.bindings[r];s.event===e&&s.callback(o,n,i||this.joinRef())}}},{key:"replyEventName",value:function(e){return"chan_reply_".concat(e)}},{key:"isClosed",value:function(){return this.state===f.closed}},{key:"isErrored",value:function(){return this.state===f.errored}},{key:"isJoined",value:function(){return this.state===f.joined}},{key:"isJoining",value:function(){return this.state===f.joining}},{key:"isLeaving",value:function(){return this.state===f.leaving}}]),e}(),k={encode:function(e,t){var n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(n))},decode:function(e,t){var n=r(JSON.parse(e),5);return t({join_ref:n[0],ref:n[1],topic:n[2],event:n[3],payload:n[4]})}},b=function(){function e(t){var n=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};s(this,e),this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.timeout=i.timeout||l,this.transport=i.transport||u.WebSocket||j,this.defaultEncoder=k.encode,this.defaultDecoder=k.decode,this.transport!==j?(this.encode=i.encode||this.defaultEncoder,this.decode=i.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder),this.heartbeatIntervalMs=i.heartbeatIntervalMs||3e4,this.reconnectAfterMs=i.reconnectAfterMs||function(e){return[1e3,2e3,5e3,1e4][e-1]||1e4},this.logger=i.logger||null,this.longpollerTimeout=i.longpollerTimeout||2e4,this.params=y(i.params||{}),this.endPoint="".concat(t,"/").concat(v.websocket),this.heartbeatTimer=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new C(function(){n.teardown(function(){return n.connect()})},this.reconnectAfterMs)}return c(e,[{key:"protocol",value:function(){return location.protocol.match(/^https/)?"wss":"ws"}},{key:"endPointURL",value:function(){var e=R.appendParams(R.appendParams(this.endPoint,this.params()),{vsn:"2.0.0"});return"/"!==e.charAt(0)?e:"/"===e.charAt(1)?"".concat(this.protocol(),":").concat(e):"".concat(this.protocol(),"://").concat(location.host).concat(e)}},{key:"disconnect",value:function(e,t,n){this.reconnectTimer.reset(),this.teardown(e,t,n)}},{key:"connect",value:function(e){var t=this;e&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=y(e)),this.conn||(this.conn=new this.transport(this.endPointURL()),this.conn.timeout=this.longpollerTimeout,this.conn.onopen=function(){return t.onConnOpen()},this.conn.onerror=function(e){return t.onConnError(e)},this.conn.onmessage=function(e){return t.onConnMessage(e)},this.conn.onclose=function(e){return t.onConnClose(e)})}},{key:"log",value:function(e,t,n){this.logger(e,t,n)}},{key:"hasLogger",value:function(){return null!==this.logger}},{key:"onOpen",value:function(e){this.stateChangeCallbacks.open.push(e)}},{key:"onClose",value:function(e){this.stateChangeCallbacks.close.push(e)}},{key:"onError",value:function(e){this.stateChangeCallbacks.error.push(e)}},{key:"onMessage",value:function(e){this.stateChangeCallbacks.message.push(e)}},{key:"onConnOpen",value:function(){this.hasLogger()&&this.log("transport","connected to ".concat(this.endPointURL())),this.flushSendBuffer(),this.reconnectTimer.reset(),this.resetHeartbeat(),this.resetChannelTimers(),this.stateChangeCallbacks.open.forEach(function(e){return e()})}},{key:"resetHeartbeat",value:function(){var e=this;this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(function(){return e.sendHeartbeat()},this.heartbeatIntervalMs))}},{key:"teardown",value:function(e,t,n){this.conn&&(this.conn.onclose=function(){},t?this.conn.close(t,n||""):this.conn.close(),this.conn=null),e&&e()}},{key:"onConnClose",value:function(e){this.hasLogger()&&this.log("transport","close",e),this.triggerChanError(),clearInterval(this.heartbeatTimer),e&&1e3!==e.code&&this.reconnectTimer.scheduleTimeout(),this.stateChangeCallbacks.close.forEach(function(t){return t(e)})}},{key:"onConnError",value:function(e){this.hasLogger()&&this.log("transport",e),this.triggerChanError(),this.stateChangeCallbacks.error.forEach(function(t){return t(e)})}},{key:"triggerChanError",value:function(){this.channels.forEach(function(e){return e.trigger(p.error)})}},{key:"connectionState",value:function(){switch(this.conn&&this.conn.readyState){case h.connecting:return"connecting";case h.open:return"open";case h.closing:return"closing";default:return"closed"}}},{key:"isConnected",value:function(){return"open"===this.connectionState()}},{key:"remove",value:function(e){this.channels=this.channels.filter(function(t){return t.joinRef()!==e.joinRef()})}},{key:"channel",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=new g(e,t,this);return this.channels.push(n),n}},{key:"push",value:function(e){var t=this;if(this.hasLogger()){var n=e.topic,i=e.event,o=e.payload,r=e.ref,s=e.join_ref;this.log("push","".concat(n," ").concat(i," (").concat(s,", ").concat(r,")"),o)}this.isConnected()?this.encode(e,function(e){return t.conn.send(e)}):this.sendBuffer.push(function(){return t.encode(e,function(e){return t.conn.send(e)})})}},{key:"makeRef",value:function(){var e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}},{key:"sendHeartbeat",value:function(){if(this.isConnected()){if(this.pendingHeartbeatRef)return this.pendingHeartbeatRef=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection"),void this.conn.close(1e3,"hearbeat timeout");this.pendingHeartbeatRef=this.makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef})}}},{key:"flushSendBuffer",value:function(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(function(e){return e()}),this.sendBuffer=[])}},{key:"onConnMessage",value:function(e){var t=this;this.decode(e.data,function(e){var n=e.topic,i=e.event,o=e.payload,r=e.ref,s=e.join_ref;r&&r===t.pendingHeartbeatRef&&(t.pendingHeartbeatRef=null),t.hasLogger()&&t.log("receive","".concat(o.status||""," ").concat(n," ").concat(i," ").concat(r&&"("+r+")"||""),o);for(var a=0;a<t.channels.length;a++){var c=t.channels[a];c.isMember(n,i,o,s)&&c.trigger(i,o,r,s)}for(var u=0;u<t.stateChangeCallbacks.message.length;u++)t.stateChangeCallbacks.message[u](e)})}},{key:"resetChannelTimers",value:function(){this.channels.forEach(function(e){e.rejoinTimer.restart()})}}]),e}(),j=function(){function e(t){s(this,e),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(t),this.readyState=h.connecting,this.poll()}return c(e,[{key:"normalizeEndpoint",value:function(e){return e.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+v.websocket),"$1/"+v.longpoll)}},{key:"endpointURL",value:function(){return R.appendParams(this.pollEndpoint,{token:this.token})}},{key:"closeAndRetry",value:function(){this.close(),this.readyState=h.connecting}},{key:"ontimeout",value:function(){this.onerror("timeout"),this.closeAndRetry()}},{key:"poll",value:function(){var e=this;this.readyState!==h.open&&this.readyState!==h.connecting||R.request("GET",this.endpointURL(),"application/json",null,this.timeout,this.ontimeout.bind(this),function(t){if(t){var n=t.status,i=t.token,o=t.messages;e.token=i}else n=0;switch(n){case 200:o.forEach(function(t){return e.onmessage({data:t})}),e.poll();break;case 204:e.poll();break;case 410:e.readyState=h.open,e.onopen(),e.poll();break;case 0:case 500:e.onerror(),e.closeAndRetry();break;default:throw"unhandled poll status ".concat(n)}})}},{key:"send",value:function(e){var t=this;R.request("POST",this.endpointURL(),"application/json",e,this.timeout,this.onerror.bind(this,"timeout"),function(e){e&&200===e.status||(t.onerror(e&&e.status),t.closeAndRetry())})}},{key:"close",value:function(e,t){this.readyState=h.closed,this.onclose()}}]),e}(),R=function(){function e(){s(this,e)}return c(e,null,[{key:"request",value:function(e,t,n,i,o,r,s){if(u.XDomainRequest){var a=new XDomainRequest;this.xdomainRequest(a,e,t,i,o,r,s)}else{var c=u.XMLHttpRequest?new u.XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");this.xhrRequest(c,e,t,n,i,o,r,s)}}},{key:"xdomainRequest",value:function(e,t,n,i,o,r,s){var a=this;e.timeout=o,e.open(t,n),e.onload=function(){var t=a.parseJSON(e.responseText);s&&s(t)},r&&(e.ontimeout=r),e.onprogress=function(){},e.send(i)}},{key:"xhrRequest",value:function(e,t,n,i,o,r,s,a){var c=this;e.open(t,n,!0),e.timeout=r,e.setRequestHeader("Content-Type",i),e.onerror=function(){a&&a(null)},e.onreadystatechange=function(){if(e.readyState===c.states.complete&&a){var t=c.parseJSON(e.responseText);a(t)}},s&&(e.ontimeout=s),e.send(o)}},{key:"parseJSON",value:function(e){if(!e||""===e)return null;try{return JSON.parse(e)}catch(t){return console&&console.log("failed to parse JSON response",e),null}}},{key:"serialize",value:function(e,t){var n=[];for(var i in e)if(e.hasOwnProperty(i)){var r=t?"".concat(t,"[").concat(i,"]"):i,s=e[i];"object"===o(s)?n.push(this.serialize(s,r)):n.push(encodeURIComponent(r)+"="+encodeURIComponent(s))}return n.join("&")}},{key:"appendParams",value:function(e,t){if(0===Object.keys(t).length)return e;var n=e.match(/\?/)?"&":"?";return"".concat(e).concat(n).concat(this.serialize(t))}}]),e}();R.states={complete:4};var T=function(){function e(t){var n=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};s(this,e);var o=i.events||{state:"presence_state",diff:"presence_diff"};this.state={},this.pendingDiffs=[],this.channel=t,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(o.state,function(t){var i=n.caller,o=i.onJoin,r=i.onLeave,s=i.onSync;n.joinRef=n.channel.joinRef(),n.state=e.syncState(n.state,t,o,r),n.pendingDiffs.forEach(function(t){n.state=e.syncDiff(n.state,t,o,r)}),n.pendingDiffs=[],s()}),this.channel.on(o.diff,function(t){var i=n.caller,o=i.onJoin,r=i.onLeave,s=i.onSync;n.inPendingSyncState()?n.pendingDiffs.push(t):(n.state=e.syncDiff(n.state,t,o,r),s())})}return c(e,[{key:"onJoin",value:function(e){this.caller.onJoin=e}},{key:"onLeave",value:function(e){this.caller.onLeave=e}},{key:"onSync",value:function(e){this.caller.onSync=e}},{key:"list",value:function(t){return e.list(this.state,t)}},{key:"inPendingSyncState",value:function(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}}],[{key:"syncState",value:function(e,t,n,i){var o=this,r=this.clone(e),s={},a={};return this.map(r,function(e,n){t[e]||(a[e]=n)}),this.map(t,function(e,t){var n=r[e];if(n){var i=t.metas.map(function(e){return e.phx_ref}),c=n.metas.map(function(e){return e.phx_ref}),u=t.metas.filter(function(e){return c.indexOf(e.phx_ref)<0}),h=n.metas.filter(function(e){return i.indexOf(e.phx_ref)<0});u.length>0&&(s[e]=t,s[e].metas=u),h.length>0&&(a[e]=o.clone(n),a[e].metas=h)}else s[e]=t}),this.syncDiff(r,{joins:s,leaves:a},n,i)}},{key:"syncDiff",value:function(e,t,n,o){var r=t.joins,s=t.leaves,a=this.clone(e);return n||(n=function(){}),o||(o=function(){}),this.map(r,function(e,t){var o=a[e];if(a[e]=t,o){var r,s=a[e].metas.map(function(e){return e.phx_ref}),c=o.metas.filter(function(e){return s.indexOf(e.phx_ref)<0});(r=a[e].metas).unshift.apply(r,i(c))}n(e,o,t)}),this.map(s,function(e,t){var n=a[e];if(n){var i=t.metas.map(function(e){return e.phx_ref});n.metas=n.metas.filter(function(e){return i.indexOf(e.phx_ref)<0}),o(e,n,t),0===n.metas.length&&delete a[e]}}),a}},{key:"list",value:function(e,t){return t||(t=function(e,t){return t}),this.map(e,function(e,n){return t(e,n)})}},{key:"map",value:function(e,t){return Object.getOwnPropertyNames(e).map(function(n){return t(n,e[n])})}},{key:"clone",value:function(e){return JSON.parse(JSON.stringify(e))}}]),e}(),C=function(){function e(t,n){s(this,e),this.callback=t,this.timerCalc=n,this.timer=null,this.tries=0}return c(e,[{key:"reset",value:function(){this.tries=0,this.clearTimer()}},{key:"restart",value:function(){var e=null!==this.timer;this.reset(),e&&this.scheduleTimeout()}},{key:"scheduleTimeout",value:function(){var e=this;this.clearTimer(),this.timer=setTimeout(function(){e.tries=e.tries+1,e.callback()},this.timerCalc(this.tries+1))}},{key:"clearTimer",value:function(){clearTimeout(this.timer),this.timer=null}}]),e}()}])});

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          )

        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
       true ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(isValidElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/redux-devtools-extension/index.js":
/*!********************************************************!*\
  !*** ./node_modules/redux-devtools-extension/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var compose = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js").compose;

exports.__esModule = true;
exports.composeWithDevTools = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    function() {
      if (arguments.length === 0) return undefined;
      if (typeof arguments[0] === 'object') return compose;
      return compose.apply(null, arguments);
    }
);

exports.devToolsEnhancer = (
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ?
    window.__REDUX_DEVTOOLS_EXTENSION__ :
    function() { return function(noop) { return noop; } }
);


/***/ }),

/***/ "./node_modules/redux-logger/dist/redux-logger.js":
/*!********************************************************!*\
  !*** ./node_modules/redux-logger/dist/redux-logger.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {!function(e,t){ true?t(exports):undefined}(this,function(e){"use strict";function t(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function r(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0})}function n(e,t,r){n.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:r,enumerable:!0})}function o(e,t){o.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function i(e,t){i.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function a(e,t,r){a.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:r,enumerable:!0})}function f(e,t,r){var n=e.slice((r||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,n),e}function u(e){var t="undefined"==typeof e?"undefined":N(e);return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function l(e,t,r,c,s,d,p){s=s||[],p=p||[];var g=s.slice(0);if("undefined"!=typeof d){if(c){if("function"==typeof c&&c(g,d))return;if("object"===("undefined"==typeof c?"undefined":N(c))){if(c.prefilter&&c.prefilter(g,d))return;if(c.normalize){var h=c.normalize(g,d,e,t);h&&(e=h[0],t=h[1])}}}g.push(d)}"regexp"===u(e)&&"regexp"===u(t)&&(e=e.toString(),t=t.toString());var y="undefined"==typeof e?"undefined":N(e),v="undefined"==typeof t?"undefined":N(t),b="undefined"!==y||p&&p[p.length-1].lhs&&p[p.length-1].lhs.hasOwnProperty(d),m="undefined"!==v||p&&p[p.length-1].rhs&&p[p.length-1].rhs.hasOwnProperty(d);if(!b&&m)r(new o(g,t));else if(!m&&b)r(new i(g,e));else if(u(e)!==u(t))r(new n(g,e,t));else if("date"===u(e)&&e-t!==0)r(new n(g,e,t));else if("object"===y&&null!==e&&null!==t)if(p.filter(function(t){return t.lhs===e}).length)e!==t&&r(new n(g,e,t));else{if(p.push({lhs:e,rhs:t}),Array.isArray(e)){var w;e.length;for(w=0;w<e.length;w++)w>=t.length?r(new a(g,w,new i(void 0,e[w]))):l(e[w],t[w],r,c,g,w,p);for(;w<t.length;)r(new a(g,w,new o(void 0,t[w++])))}else{var x=Object.keys(e),S=Object.keys(t);x.forEach(function(n,o){var i=S.indexOf(n);i>=0?(l(e[n],t[n],r,c,g,n,p),S=f(S,i)):l(e[n],void 0,r,c,g,n,p)}),S.forEach(function(e){l(void 0,t[e],r,c,g,e,p)})}p.length=p.length-1}else e!==t&&("number"===y&&isNaN(e)&&isNaN(t)||r(new n(g,e,t)))}function c(e,t,r,n){return n=n||[],l(e,t,function(e){e&&n.push(e)},r),n.length?n:void 0}function s(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":s(o[r.path[n]],r.index,r.item);break;case"D":delete o[r.path[n]];break;case"E":case"N":o[r.path[n]]=r.rhs}}else switch(r.kind){case"A":s(e[t],r.index,r.item);break;case"D":e=f(e,t);break;case"E":case"N":e[t]=r.rhs}return e}function d(e,t,r){if(e&&t&&r&&r.kind){for(var n=e,o=-1,i=r.path?r.path.length-1:0;++o<i;)"undefined"==typeof n[r.path[o]]&&(n[r.path[o]]="number"==typeof r.path[o]?[]:{}),n=n[r.path[o]];switch(r.kind){case"A":s(r.path?n[r.path[o]]:n,r.index,r.item);break;case"D":delete n[r.path[o]];break;case"E":case"N":n[r.path[o]]=r.rhs}}}function p(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":p(o[r.path[n]],r.index,r.item);break;case"D":o[r.path[n]]=r.lhs;break;case"E":o[r.path[n]]=r.lhs;break;case"N":delete o[r.path[n]]}}else switch(r.kind){case"A":p(e[t],r.index,r.item);break;case"D":e[t]=r.lhs;break;case"E":e[t]=r.lhs;break;case"N":e=f(e,t)}return e}function g(e,t,r){if(e&&t&&r&&r.kind){var n,o,i=e;for(o=r.path.length-1,n=0;n<o;n++)"undefined"==typeof i[r.path[n]]&&(i[r.path[n]]={}),i=i[r.path[n]];switch(r.kind){case"A":p(i[r.path[n]],r.index,r.item);break;case"D":i[r.path[n]]=r.lhs;break;case"E":i[r.path[n]]=r.lhs;break;case"N":delete i[r.path[n]]}}}function h(e,t,r){if(e&&t){var n=function(n){r&&!r(e,t,n)||d(e,t,n)};l(e,t,n)}}function y(e){return"color: "+F[e].color+"; font-weight: bold"}function v(e){var t=e.kind,r=e.path,n=e.lhs,o=e.rhs,i=e.index,a=e.item;switch(t){case"E":return[r.join("."),n,"→",o];case"N":return[r.join("."),o];case"D":return[r.join(".")];case"A":return[r.join(".")+"["+i+"]",a];default:return[]}}function b(e,t,r,n){var o=c(e,t);try{n?r.groupCollapsed("diff"):r.group("diff")}catch(e){r.log("diff")}o?o.forEach(function(e){var t=e.kind,n=v(e);r.log.apply(r,["%c "+F[t].text,y(t)].concat(P(n)))}):r.log("—— no diff ——");try{r.groupEnd()}catch(e){r.log("—— diff end —— ")}}function m(e,t,r,n){switch("undefined"==typeof e?"undefined":N(e)){case"object":return"function"==typeof e[n]?e[n].apply(e,P(r)):e[n];case"function":return e(t);default:return e}}function w(e){var t=e.timestamp,r=e.duration;return function(e,n,o){var i=["action"];return i.push("%c"+String(e.type)),t&&i.push("%c@ "+n),r&&i.push("%c(in "+o.toFixed(2)+" ms)"),i.join(" ")}}function x(e,t){var r=t.logger,n=t.actionTransformer,o=t.titleFormatter,i=void 0===o?w(t):o,a=t.collapsed,f=t.colors,u=t.level,l=t.diff,c="undefined"==typeof t.titleFormatter;e.forEach(function(o,s){var d=o.started,p=o.startedTime,g=o.action,h=o.prevState,y=o.error,v=o.took,w=o.nextState,x=e[s+1];x&&(w=x.prevState,v=x.started-d);var S=n(g),k="function"==typeof a?a(function(){return w},g,o):a,j=D(p),E=f.title?"color: "+f.title(S)+";":"",A=["color: gray; font-weight: lighter;"];A.push(E),t.timestamp&&A.push("color: gray; font-weight: lighter;"),t.duration&&A.push("color: gray; font-weight: lighter;");var O=i(S,j,v);try{k?f.title&&c?r.groupCollapsed.apply(r,["%c "+O].concat(A)):r.groupCollapsed(O):f.title&&c?r.group.apply(r,["%c "+O].concat(A)):r.group(O)}catch(e){r.log(O)}var N=m(u,S,[h],"prevState"),P=m(u,S,[S],"action"),C=m(u,S,[y,h],"error"),F=m(u,S,[w],"nextState");if(N)if(f.prevState){var L="color: "+f.prevState(h)+"; font-weight: bold";r[N]("%c prev state",L,h)}else r[N]("prev state",h);if(P)if(f.action){var T="color: "+f.action(S)+"; font-weight: bold";r[P]("%c action    ",T,S)}else r[P]("action    ",S);if(y&&C)if(f.error){var M="color: "+f.error(y,h)+"; font-weight: bold;";r[C]("%c error     ",M,y)}else r[C]("error     ",y);if(F)if(f.nextState){var _="color: "+f.nextState(w)+"; font-weight: bold";r[F]("%c next state",_,w)}else r[F]("next state",w);l&&b(h,w,r,k);try{r.groupEnd()}catch(e){r.log("—— log end ——")}})}function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},L,e),r=t.logger,n=t.stateTransformer,o=t.errorTransformer,i=t.predicate,a=t.logErrors,f=t.diffPredicate;if("undefined"==typeof r)return function(){return function(e){return function(t){return e(t)}}};if(e.getState&&e.dispatch)return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"),function(){return function(e){return function(t){return e(t)}}};var u=[];return function(e){var r=e.getState;return function(e){return function(l){if("function"==typeof i&&!i(r,l))return e(l);var c={};u.push(c),c.started=O.now(),c.startedTime=new Date,c.prevState=n(r()),c.action=l;var s=void 0;if(a)try{s=e(l)}catch(e){c.error=o(e)}else s=e(l);c.took=O.now()-c.started,c.nextState=n(r());var d=t.diff&&"function"==typeof f?f(r,l):t.diff;if(x(u,Object.assign({},t,{diff:d})),u.length=0,c.error)throw c.error;return s}}}}var k,j,E=function(e,t){return new Array(t+1).join(e)},A=function(e,t){return E("0",t-e.toString().length)+e},D=function(e){return A(e.getHours(),2)+":"+A(e.getMinutes(),2)+":"+A(e.getSeconds(),2)+"."+A(e.getMilliseconds(),3)},O="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance:Date,N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)},C=[];k="object"===("undefined"==typeof global?"undefined":N(global))&&global?global:"undefined"!=typeof window?window:{},j=k.DeepDiff,j&&C.push(function(){"undefined"!=typeof j&&k.DeepDiff===c&&(k.DeepDiff=j,j=void 0)}),t(n,r),t(o,r),t(i,r),t(a,r),Object.defineProperties(c,{diff:{value:c,enumerable:!0},observableDiff:{value:l,enumerable:!0},applyDiff:{value:h,enumerable:!0},applyChange:{value:d,enumerable:!0},revertChange:{value:g,enumerable:!0},isConflict:{value:function(){return"undefined"!=typeof j},enumerable:!0},noConflict:{value:function(){return C&&(C.forEach(function(e){e()}),C=null),c},enumerable:!0}});var F={E:{color:"#2196F3",text:"CHANGED:"},N:{color:"#4CAF50",text:"ADDED:"},D:{color:"#F44336",text:"DELETED:"},A:{color:"#2196F3",text:"ARRAY:"}},L={level:"log",logger:console,logErrors:!0,collapsed:void 0,predicate:void 0,duration:!1,timestamp:!0,stateTransformer:function(e){return e},actionTransformer:function(e){return e},errorTransformer:function(e){return e},colors:{title:function(){return"inherit"},prevState:function(){return"#9E9E9E"},action:function(){return"#03A9F4"},nextState:function(){return"#4CAF50"},error:function(){return"#F20404"}},diff:!1,diffPredicate:void 0,transformer:void 0},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.dispatch,r=e.getState;return"function"==typeof t||"function"==typeof r?S()({dispatch:t,getState:r}):void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n")};e.defaults=L,e.createLogger=S,e.logger=T,e.default=T,Object.defineProperty(e,"__esModule",{value:!0})});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/redux-thunk/es/index.js":
/*!**********************************************!*\
  !*** ./node_modules/redux-thunk/es/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

/* harmony default export */ __webpack_exports__["default"] = (thunk);

/***/ }),

/***/ "./node_modules/redux/es/redux.js":
/*!****************************************!*\
  !*** ./node_modules/redux/es/redux.js ***!
  \****************************************/
/*! exports provided: createStore, combineReducers, bindActionCreators, applyMiddleware, compose, __DO_NOT_USE__ActionTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return createStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return combineReducers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return bindActionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return applyMiddleware; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return compose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__DO_NOT_USE__ActionTypes", function() { return ActionTypes; });
/* harmony import */ var symbol_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! symbol-observable */ "./node_modules/symbol-observable/es/index.js");


/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[symbol_observable__WEBPACK_IMPORTED_MODULE_0__["default"]] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[symbol_observable__WEBPACK_IMPORTED_MODULE_0__["default"]] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (true) {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers);
  var unexpectedKeyCache;

  if (true) {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (true) {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error("Dispatching while constructing your middleware is not allowed. " + "Other middleware would not be applied to this dispatch.");
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if ( true && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}




/***/ }),

/***/ "./node_modules/scheduler/cjs/scheduler-tracing.development.js":
/*!*********************************************************************!*\
  !*** ./node_modules/scheduler/cjs/scheduler-tracing.development.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v0.12.0
 * scheduler-tracing.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:


// In some cases, StrictMode should also double-render lifecycles.
// This can be confusing for tests though,
// And it can be bad for performance in production.
// This feature flag can be used to control the behavior:


// To preserve the "Pause on caught exceptions" behavior of the debugger, we
// replay the begin phase of a failed component inside invokeGuardedCallback.


// Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:


// Gather advanced timing metrics for Profiler subtrees.


// Trace which interactions trigger each commit.
var enableSchedulerTracing = true;

// Only used in www builds.
 // TODO: true? Here it might just be false.

// Only used in www builds.


// Only used in www builds.


// React Fire: prevent the value and checked attributes from syncing
// with their related DOM properties


// These APIs will no longer be "unstable" in the upcoming 16.7 release,
// Control this behavior with a flag to support 16.6 minor releases in the meanwhile.

var DEFAULT_THREAD_ID = 0;

// Counters used to generate unique IDs.
var interactionIDCounter = 0;
var threadIDCounter = 0;

// Set of currently traced interactions.
// Interactions "stack"–
// Meaning that newly traced interactions are appended to the previously active set.
// When an interaction goes out of scope, the previous set (if any) is restored.
exports.__interactionsRef = null;

// Listener(s) to notify when interactions begin and end.
exports.__subscriberRef = null;

if (enableSchedulerTracing) {
  exports.__interactionsRef = {
    current: new Set()
  };
  exports.__subscriberRef = {
    current: null
  };
}

function unstable_clear(callback) {
  if (!enableSchedulerTracing) {
    return callback();
  }

  var prevInteractions = exports.__interactionsRef.current;
  exports.__interactionsRef.current = new Set();

  try {
    return callback();
  } finally {
    exports.__interactionsRef.current = prevInteractions;
  }
}

function unstable_getCurrent() {
  if (!enableSchedulerTracing) {
    return null;
  } else {
    return exports.__interactionsRef.current;
  }
}

function unstable_getThreadID() {
  return ++threadIDCounter;
}

function unstable_trace(name, timestamp, callback) {
  var threadID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_THREAD_ID;

  if (!enableSchedulerTracing) {
    return callback();
  }

  var interaction = {
    __count: 1,
    id: interactionIDCounter++,
    name: name,
    timestamp: timestamp
  };

  var prevInteractions = exports.__interactionsRef.current;

  // Traced interactions should stack/accumulate.
  // To do that, clone the current interactions.
  // The previous set will be restored upon completion.
  var interactions = new Set(prevInteractions);
  interactions.add(interaction);
  exports.__interactionsRef.current = interactions;

  var subscriber = exports.__subscriberRef.current;
  var returnValue = void 0;

  try {
    if (subscriber !== null) {
      subscriber.onInteractionTraced(interaction);
    }
  } finally {
    try {
      if (subscriber !== null) {
        subscriber.onWorkStarted(interactions, threadID);
      }
    } finally {
      try {
        returnValue = callback();
      } finally {
        exports.__interactionsRef.current = prevInteractions;

        try {
          if (subscriber !== null) {
            subscriber.onWorkStopped(interactions, threadID);
          }
        } finally {
          interaction.__count--;

          // If no async work was scheduled for this interaction,
          // Notify subscribers that it's completed.
          if (subscriber !== null && interaction.__count === 0) {
            subscriber.onInteractionScheduledWorkCompleted(interaction);
          }
        }
      }
    }
  }

  return returnValue;
}

function unstable_wrap(callback) {
  var threadID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_THREAD_ID;

  if (!enableSchedulerTracing) {
    return callback;
  }

  var wrappedInteractions = exports.__interactionsRef.current;

  var subscriber = exports.__subscriberRef.current;
  if (subscriber !== null) {
    subscriber.onWorkScheduled(wrappedInteractions, threadID);
  }

  // Update the pending async work count for the current interactions.
  // Update after calling subscribers in case of error.
  wrappedInteractions.forEach(function (interaction) {
    interaction.__count++;
  });

  var hasRun = false;

  function wrapped() {
    var prevInteractions = exports.__interactionsRef.current;
    exports.__interactionsRef.current = wrappedInteractions;

    subscriber = exports.__subscriberRef.current;

    try {
      var returnValue = void 0;

      try {
        if (subscriber !== null) {
          subscriber.onWorkStarted(wrappedInteractions, threadID);
        }
      } finally {
        try {
          returnValue = callback.apply(undefined, arguments);
        } finally {
          exports.__interactionsRef.current = prevInteractions;

          if (subscriber !== null) {
            subscriber.onWorkStopped(wrappedInteractions, threadID);
          }
        }
      }

      return returnValue;
    } finally {
      if (!hasRun) {
        // We only expect a wrapped function to be executed once,
        // But in the event that it's executed more than once–
        // Only decrement the outstanding interaction counts once.
        hasRun = true;

        // Update pending async counts for all wrapped interactions.
        // If this was the last scheduled async work for any of them,
        // Mark them as completed.
        wrappedInteractions.forEach(function (interaction) {
          interaction.__count--;

          if (subscriber !== null && interaction.__count === 0) {
            subscriber.onInteractionScheduledWorkCompleted(interaction);
          }
        });
      }
    }
  }

  wrapped.cancel = function cancel() {
    subscriber = exports.__subscriberRef.current;

    try {
      if (subscriber !== null) {
        subscriber.onWorkCanceled(wrappedInteractions, threadID);
      }
    } finally {
      // Update pending async counts for all wrapped interactions.
      // If this was the last scheduled async work for any of them,
      // Mark them as completed.
      wrappedInteractions.forEach(function (interaction) {
        interaction.__count--;

        if (subscriber && interaction.__count === 0) {
          subscriber.onInteractionScheduledWorkCompleted(interaction);
        }
      });
    }
  };

  return wrapped;
}

var subscribers = null;
if (enableSchedulerTracing) {
  subscribers = new Set();
}

function unstable_subscribe(subscriber) {
  if (enableSchedulerTracing) {
    subscribers.add(subscriber);

    if (subscribers.size === 1) {
      exports.__subscriberRef.current = {
        onInteractionScheduledWorkCompleted: onInteractionScheduledWorkCompleted,
        onInteractionTraced: onInteractionTraced,
        onWorkCanceled: onWorkCanceled,
        onWorkScheduled: onWorkScheduled,
        onWorkStarted: onWorkStarted,
        onWorkStopped: onWorkStopped
      };
    }
  }
}

function unstable_unsubscribe(subscriber) {
  if (enableSchedulerTracing) {
    subscribers.delete(subscriber);

    if (subscribers.size === 0) {
      exports.__subscriberRef.current = null;
    }
  }
}

function onInteractionTraced(interaction) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onInteractionTraced(interaction);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

function onInteractionScheduledWorkCompleted(interaction) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onInteractionScheduledWorkCompleted(interaction);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

function onWorkScheduled(interactions, threadID) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onWorkScheduled(interactions, threadID);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

function onWorkStarted(interactions, threadID) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onWorkStarted(interactions, threadID);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

function onWorkStopped(interactions, threadID) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onWorkStopped(interactions, threadID);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

function onWorkCanceled(interactions, threadID) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onWorkCanceled(interactions, threadID);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

exports.unstable_clear = unstable_clear;
exports.unstable_getCurrent = unstable_getCurrent;
exports.unstable_getThreadID = unstable_getThreadID;
exports.unstable_trace = unstable_trace;
exports.unstable_wrap = unstable_wrap;
exports.unstable_subscribe = unstable_subscribe;
exports.unstable_unsubscribe = unstable_unsubscribe;
  })();
}


/***/ }),

/***/ "./node_modules/scheduler/cjs/scheduler.development.js":
/*!*************************************************************!*\
  !*** ./node_modules/scheduler/cjs/scheduler.development.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** @license React v0.12.0
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:


// In some cases, StrictMode should also double-render lifecycles.
// This can be confusing for tests though,
// And it can be bad for performance in production.
// This feature flag can be used to control the behavior:


// To preserve the "Pause on caught exceptions" behavior of the debugger, we
// replay the begin phase of a failed component inside invokeGuardedCallback.


// Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:


// Gather advanced timing metrics for Profiler subtrees.


// Trace which interactions trigger each commit.


// Only used in www builds.
 // TODO: true? Here it might just be false.

// Only used in www builds.
var enableSchedulerDebugging = true;

// Only used in www builds.


// React Fire: prevent the value and checked attributes from syncing
// with their related DOM properties


// These APIs will no longer be "unstable" in the upcoming 16.7 release,
// Control this behavior with a flag to support 16.6 minor releases in the meanwhile.

/* eslint-disable no-var */

// TODO: Use symbols?
var ImmediatePriority = 1;
var UserBlockingPriority = 2;
var NormalPriority = 3;
var LowPriority = 4;
var IdlePriority = 5;

// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
var maxSigned31BitInt = 1073741823;

// Times out immediately
var IMMEDIATE_PRIORITY_TIMEOUT = -1;
// Eventually times out
var USER_BLOCKING_PRIORITY = 250;
var NORMAL_PRIORITY_TIMEOUT = 5000;
var LOW_PRIORITY_TIMEOUT = 10000;
// Never times out
var IDLE_PRIORITY = maxSigned31BitInt;

// Callbacks are stored as a circular, doubly linked list.
var firstCallbackNode = null;

var currentDidTimeout = false;
// Pausing the scheduler is useful for debugging.
var isSchedulerPaused = false;

var currentPriorityLevel = NormalPriority;
var currentEventStartTime = -1;
var currentExpirationTime = -1;

// This is set when a callback is being executed, to prevent re-entrancy.
var isExecutingCallback = false;

var isHostCallbackScheduled = false;

var hasNativePerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';

function ensureHostCallbackIsScheduled() {
  if (isExecutingCallback) {
    // Don't schedule work yet; wait until the next time we yield.
    return;
  }
  // Schedule the host callback using the earliest expiration in the list.
  var expirationTime = firstCallbackNode.expirationTime;
  if (!isHostCallbackScheduled) {
    isHostCallbackScheduled = true;
  } else {
    // Cancel the existing host callback.
    cancelHostCallback();
  }
  requestHostCallback(flushWork, expirationTime);
}

function flushFirstCallback() {
  var flushedNode = firstCallbackNode;

  // Remove the node from the list before calling the callback. That way the
  // list is in a consistent state even if the callback throws.
  var next = firstCallbackNode.next;
  if (firstCallbackNode === next) {
    // This is the last callback in the list.
    firstCallbackNode = null;
    next = null;
  } else {
    var lastCallbackNode = firstCallbackNode.previous;
    firstCallbackNode = lastCallbackNode.next = next;
    next.previous = lastCallbackNode;
  }

  flushedNode.next = flushedNode.previous = null;

  // Now it's safe to call the callback.
  var callback = flushedNode.callback;
  var expirationTime = flushedNode.expirationTime;
  var priorityLevel = flushedNode.priorityLevel;
  var previousPriorityLevel = currentPriorityLevel;
  var previousExpirationTime = currentExpirationTime;
  currentPriorityLevel = priorityLevel;
  currentExpirationTime = expirationTime;
  var continuationCallback;
  try {
    continuationCallback = callback();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
    currentExpirationTime = previousExpirationTime;
  }

  // A callback may return a continuation. The continuation should be scheduled
  // with the same priority and expiration as the just-finished callback.
  if (typeof continuationCallback === 'function') {
    var continuationNode = {
      callback: continuationCallback,
      priorityLevel: priorityLevel,
      expirationTime: expirationTime,
      next: null,
      previous: null
    };

    // Insert the new callback into the list, sorted by its expiration. This is
    // almost the same as the code in `scheduleCallback`, except the callback
    // is inserted into the list *before* callbacks of equal expiration instead
    // of after.
    if (firstCallbackNode === null) {
      // This is the first callback in the list.
      firstCallbackNode = continuationNode.next = continuationNode.previous = continuationNode;
    } else {
      var nextAfterContinuation = null;
      var node = firstCallbackNode;
      do {
        if (node.expirationTime >= expirationTime) {
          // This callback expires at or after the continuation. We will insert
          // the continuation *before* this callback.
          nextAfterContinuation = node;
          break;
        }
        node = node.next;
      } while (node !== firstCallbackNode);

      if (nextAfterContinuation === null) {
        // No equal or lower priority callback was found, which means the new
        // callback is the lowest priority callback in the list.
        nextAfterContinuation = firstCallbackNode;
      } else if (nextAfterContinuation === firstCallbackNode) {
        // The new callback is the highest priority callback in the list.
        firstCallbackNode = continuationNode;
        ensureHostCallbackIsScheduled();
      }

      var previous = nextAfterContinuation.previous;
      previous.next = nextAfterContinuation.previous = continuationNode;
      continuationNode.next = nextAfterContinuation;
      continuationNode.previous = previous;
    }
  }
}

function flushImmediateWork() {
  if (
  // Confirm we've exited the outer most event handler
  currentEventStartTime === -1 && firstCallbackNode !== null && firstCallbackNode.priorityLevel === ImmediatePriority) {
    isExecutingCallback = true;
    try {
      do {
        flushFirstCallback();
      } while (
      // Keep flushing until there are no more immediate callbacks
      firstCallbackNode !== null && firstCallbackNode.priorityLevel === ImmediatePriority);
    } finally {
      isExecutingCallback = false;
      if (firstCallbackNode !== null) {
        // There's still work remaining. Request another callback.
        ensureHostCallbackIsScheduled();
      } else {
        isHostCallbackScheduled = false;
      }
    }
  }
}

function flushWork(didTimeout) {
  // Exit right away if we're currently paused

  if (enableSchedulerDebugging && isSchedulerPaused) {
    return;
  }

  isExecutingCallback = true;
  var previousDidTimeout = currentDidTimeout;
  currentDidTimeout = didTimeout;
  try {
    if (didTimeout) {
      // Flush all the expired callbacks without yielding.
      while (firstCallbackNode !== null && !(enableSchedulerDebugging && isSchedulerPaused)) {
        // TODO Wrap i nfeature flag
        // Read the current time. Flush all the callbacks that expire at or
        // earlier than that time. Then read the current time again and repeat.
        // This optimizes for as few performance.now calls as possible.
        var currentTime = exports.unstable_now();
        if (firstCallbackNode.expirationTime <= currentTime) {
          do {
            flushFirstCallback();
          } while (firstCallbackNode !== null && firstCallbackNode.expirationTime <= currentTime && !(enableSchedulerDebugging && isSchedulerPaused));
          continue;
        }
        break;
      }
    } else {
      // Keep flushing callbacks until we run out of time in the frame.
      if (firstCallbackNode !== null) {
        do {
          if (enableSchedulerDebugging && isSchedulerPaused) {
            break;
          }
          flushFirstCallback();
        } while (firstCallbackNode !== null && !shouldYieldToHost());
      }
    }
  } finally {
    isExecutingCallback = false;
    currentDidTimeout = previousDidTimeout;
    if (firstCallbackNode !== null) {
      // There's still work remaining. Request another callback.
      ensureHostCallbackIsScheduled();
    } else {
      isHostCallbackScheduled = false;
    }
    // Before exiting, flush all the immediate work that was scheduled.
    flushImmediateWork();
  }
}

function unstable_runWithPriority(priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
    case LowPriority:
    case IdlePriority:
      break;
    default:
      priorityLevel = NormalPriority;
  }

  var previousPriorityLevel = currentPriorityLevel;
  var previousEventStartTime = currentEventStartTime;
  currentPriorityLevel = priorityLevel;
  currentEventStartTime = exports.unstable_now();

  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
    currentEventStartTime = previousEventStartTime;

    // Before exiting, flush all the immediate work that was scheduled.
    flushImmediateWork();
  }
}

function unstable_wrapCallback(callback) {
  var parentPriorityLevel = currentPriorityLevel;
  return function () {
    // This is a fork of runWithPriority, inlined for performance.
    var previousPriorityLevel = currentPriorityLevel;
    var previousEventStartTime = currentEventStartTime;
    currentPriorityLevel = parentPriorityLevel;
    currentEventStartTime = exports.unstable_now();

    try {
      return callback.apply(this, arguments);
    } finally {
      currentPriorityLevel = previousPriorityLevel;
      currentEventStartTime = previousEventStartTime;
      flushImmediateWork();
    }
  };
}

function unstable_scheduleCallback(callback, deprecated_options) {
  var startTime = currentEventStartTime !== -1 ? currentEventStartTime : exports.unstable_now();

  var expirationTime;
  if (typeof deprecated_options === 'object' && deprecated_options !== null && typeof deprecated_options.timeout === 'number') {
    // FIXME: Remove this branch once we lift expiration times out of React.
    expirationTime = startTime + deprecated_options.timeout;
  } else {
    switch (currentPriorityLevel) {
      case ImmediatePriority:
        expirationTime = startTime + IMMEDIATE_PRIORITY_TIMEOUT;
        break;
      case UserBlockingPriority:
        expirationTime = startTime + USER_BLOCKING_PRIORITY;
        break;
      case IdlePriority:
        expirationTime = startTime + IDLE_PRIORITY;
        break;
      case LowPriority:
        expirationTime = startTime + LOW_PRIORITY_TIMEOUT;
        break;
      case NormalPriority:
      default:
        expirationTime = startTime + NORMAL_PRIORITY_TIMEOUT;
    }
  }

  var newNode = {
    callback: callback,
    priorityLevel: currentPriorityLevel,
    expirationTime: expirationTime,
    next: null,
    previous: null
  };

  // Insert the new callback into the list, ordered first by expiration, then
  // by insertion. So the new callback is inserted any other callback with
  // equal expiration.
  if (firstCallbackNode === null) {
    // This is the first callback in the list.
    firstCallbackNode = newNode.next = newNode.previous = newNode;
    ensureHostCallbackIsScheduled();
  } else {
    var next = null;
    var node = firstCallbackNode;
    do {
      if (node.expirationTime > expirationTime) {
        // The new callback expires before this one.
        next = node;
        break;
      }
      node = node.next;
    } while (node !== firstCallbackNode);

    if (next === null) {
      // No callback with a later expiration was found, which means the new
      // callback has the latest expiration in the list.
      next = firstCallbackNode;
    } else if (next === firstCallbackNode) {
      // The new callback has the earliest expiration in the entire list.
      firstCallbackNode = newNode;
      ensureHostCallbackIsScheduled();
    }

    var previous = next.previous;
    previous.next = next.previous = newNode;
    newNode.next = next;
    newNode.previous = previous;
  }

  return newNode;
}

function unstable_pauseExecution() {
  isSchedulerPaused = true;
}

function unstable_continueExecution() {
  isSchedulerPaused = false;
  if (firstCallbackNode !== null) {
    ensureHostCallbackIsScheduled();
  }
}

function unstable_getFirstCallbackNode() {
  return firstCallbackNode;
}

function unstable_cancelCallback(callbackNode) {
  var next = callbackNode.next;
  if (next === null) {
    // Already cancelled.
    return;
  }

  if (next === callbackNode) {
    // This is the only scheduled callback. Clear the list.
    firstCallbackNode = null;
  } else {
    // Remove the callback from its position in the list.
    if (callbackNode === firstCallbackNode) {
      firstCallbackNode = next;
    }
    var previous = callbackNode.previous;
    previous.next = next;
    next.previous = previous;
  }

  callbackNode.next = callbackNode.previous = null;
}

function unstable_getCurrentPriorityLevel() {
  return currentPriorityLevel;
}

function unstable_shouldYield() {
  return !currentDidTimeout && (firstCallbackNode !== null && firstCallbackNode.expirationTime < currentExpirationTime || shouldYieldToHost());
}

// The remaining code is essentially a polyfill for requestIdleCallback. It
// works by scheduling a requestAnimationFrame, storing the time for the start
// of the frame, then scheduling a postMessage which gets scheduled after paint.
// Within the postMessage handler do as much work as possible until time + frame
// rate. By separating the idle call into a separate event tick we ensure that
// layout, paint and other browser work is counted against the available time.
// The frame rate is dynamically adjusted.

// We capture a local reference to any global, in case it gets polyfilled after
// this module is initially evaluated. We want to be using a
// consistent implementation.
var localDate = Date;

// This initialization code may run even on server environments if a component
// just imports ReactDOM (e.g. for findDOMNode). Some environments might not
// have setTimeout or clearTimeout. However, we always expect them to be defined
// on the client. https://github.com/facebook/react/pull/13088
var localSetTimeout = typeof setTimeout === 'function' ? setTimeout : undefined;
var localClearTimeout = typeof clearTimeout === 'function' ? clearTimeout : undefined;

// We don't expect either of these to necessarily be defined, but we will error
// later if they are missing on the client.
var localRequestAnimationFrame = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : undefined;
var localCancelAnimationFrame = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : undefined;

// requestAnimationFrame does not run when the tab is in the background. If
// we're backgrounded we prefer for that work to happen so that the page
// continues to load in the background. So we also schedule a 'setTimeout' as
// a fallback.
// TODO: Need a better heuristic for backgrounded work.
var ANIMATION_FRAME_TIMEOUT = 100;
var rAFID;
var rAFTimeoutID;
var requestAnimationFrameWithTimeout = function (callback) {
  // schedule rAF and also a setTimeout
  rAFID = localRequestAnimationFrame(function (timestamp) {
    // cancel the setTimeout
    localClearTimeout(rAFTimeoutID);
    callback(timestamp);
  });
  rAFTimeoutID = localSetTimeout(function () {
    // cancel the requestAnimationFrame
    localCancelAnimationFrame(rAFID);
    callback(exports.unstable_now());
  }, ANIMATION_FRAME_TIMEOUT);
};

if (hasNativePerformanceNow) {
  var Performance = performance;
  exports.unstable_now = function () {
    return Performance.now();
  };
} else {
  exports.unstable_now = function () {
    return localDate.now();
  };
}

var requestHostCallback;
var cancelHostCallback;
var shouldYieldToHost;

var globalValue = null;
if (typeof window !== 'undefined') {
  globalValue = window;
} else if (typeof global !== 'undefined') {
  globalValue = global;
}

if (globalValue && globalValue._schedMock) {
  // Dynamic injection, only for testing purposes.
  var globalImpl = globalValue._schedMock;
  requestHostCallback = globalImpl[0];
  cancelHostCallback = globalImpl[1];
  shouldYieldToHost = globalImpl[2];
  exports.unstable_now = globalImpl[3];
} else if (
// If Scheduler runs in a non-DOM environment, it falls back to a naive
// implementation using setTimeout.
typeof window === 'undefined' ||
// Check if MessageChannel is supported, too.
typeof MessageChannel !== 'function') {
  // If this accidentally gets imported in a non-browser environment, e.g. JavaScriptCore,
  // fallback to a naive implementation.
  var _callback = null;
  var _flushCallback = function (didTimeout) {
    if (_callback !== null) {
      try {
        _callback(didTimeout);
      } finally {
        _callback = null;
      }
    }
  };
  requestHostCallback = function (cb, ms) {
    if (_callback !== null) {
      // Protect against re-entrancy.
      setTimeout(requestHostCallback, 0, cb);
    } else {
      _callback = cb;
      setTimeout(_flushCallback, 0, false);
    }
  };
  cancelHostCallback = function () {
    _callback = null;
  };
  shouldYieldToHost = function () {
    return false;
  };
} else {
  if (typeof console !== 'undefined') {
    // TODO: Remove fb.me link
    if (typeof localRequestAnimationFrame !== 'function') {
      console.error("This browser doesn't support requestAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
    }
    if (typeof localCancelAnimationFrame !== 'function') {
      console.error("This browser doesn't support cancelAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
    }
  }

  var scheduledHostCallback = null;
  var isMessageEventScheduled = false;
  var timeoutTime = -1;

  var isAnimationFrameScheduled = false;

  var isFlushingHostCallback = false;

  var frameDeadline = 0;
  // We start out assuming that we run at 30fps but then the heuristic tracking
  // will adjust this value to a faster fps if we get more frequent animation
  // frames.
  var previousFrameTime = 33;
  var activeFrameTime = 33;

  shouldYieldToHost = function () {
    return frameDeadline <= exports.unstable_now();
  };

  // We use the postMessage trick to defer idle work until after the repaint.
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = function (event) {
    isMessageEventScheduled = false;

    var prevScheduledCallback = scheduledHostCallback;
    var prevTimeoutTime = timeoutTime;
    scheduledHostCallback = null;
    timeoutTime = -1;

    var currentTime = exports.unstable_now();

    var didTimeout = false;
    if (frameDeadline - currentTime <= 0) {
      // There's no time left in this idle period. Check if the callback has
      // a timeout and whether it's been exceeded.
      if (prevTimeoutTime !== -1 && prevTimeoutTime <= currentTime) {
        // Exceeded the timeout. Invoke the callback even though there's no
        // time left.
        didTimeout = true;
      } else {
        // No timeout.
        if (!isAnimationFrameScheduled) {
          // Schedule another animation callback so we retry later.
          isAnimationFrameScheduled = true;
          requestAnimationFrameWithTimeout(animationTick);
        }
        // Exit without invoking the callback.
        scheduledHostCallback = prevScheduledCallback;
        timeoutTime = prevTimeoutTime;
        return;
      }
    }

    if (prevScheduledCallback !== null) {
      isFlushingHostCallback = true;
      try {
        prevScheduledCallback(didTimeout);
      } finally {
        isFlushingHostCallback = false;
      }
    }
  };

  var animationTick = function (rafTime) {
    if (scheduledHostCallback !== null) {
      // Eagerly schedule the next animation callback at the beginning of the
      // frame. If the scheduler queue is not empty at the end of the frame, it
      // will continue flushing inside that callback. If the queue *is* empty,
      // then it will exit immediately. Posting the callback at the start of the
      // frame ensures it's fired within the earliest possible frame. If we
      // waited until the end of the frame to post the callback, we risk the
      // browser skipping a frame and not firing the callback until the frame
      // after that.
      requestAnimationFrameWithTimeout(animationTick);
    } else {
      // No pending work. Exit.
      isAnimationFrameScheduled = false;
      return;
    }

    var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
    if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
      if (nextFrameTime < 8) {
        // Defensive coding. We don't support higher frame rates than 120hz.
        // If the calculated frame time gets lower than 8, it is probably a bug.
        nextFrameTime = 8;
      }
      // If one frame goes long, then the next one can be short to catch up.
      // If two frames are short in a row, then that's an indication that we
      // actually have a higher frame rate than what we're currently optimizing.
      // We adjust our heuristic dynamically accordingly. For example, if we're
      // running on 120hz display or 90hz VR display.
      // Take the max of the two in case one of them was an anomaly due to
      // missed frame deadlines.
      activeFrameTime = nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
    } else {
      previousFrameTime = nextFrameTime;
    }
    frameDeadline = rafTime + activeFrameTime;
    if (!isMessageEventScheduled) {
      isMessageEventScheduled = true;
      port.postMessage(undefined);
    }
  };

  requestHostCallback = function (callback, absoluteTimeout) {
    scheduledHostCallback = callback;
    timeoutTime = absoluteTimeout;
    if (isFlushingHostCallback || absoluteTimeout < 0) {
      // Don't wait for the next frame. Continue working ASAP, in a new event.
      port.postMessage(undefined);
    } else if (!isAnimationFrameScheduled) {
      // If rAF didn't already schedule one, we need to schedule a frame.
      // TODO: If this rAF doesn't materialize because the browser throttles, we
      // might want to still have setTimeout trigger rIC as a backup to ensure
      // that we keep performing work.
      isAnimationFrameScheduled = true;
      requestAnimationFrameWithTimeout(animationTick);
    }
  };

  cancelHostCallback = function () {
    scheduledHostCallback = null;
    isMessageEventScheduled = false;
    timeoutTime = -1;
  };
}

exports.unstable_ImmediatePriority = ImmediatePriority;
exports.unstable_UserBlockingPriority = UserBlockingPriority;
exports.unstable_NormalPriority = NormalPriority;
exports.unstable_IdlePriority = IdlePriority;
exports.unstable_LowPriority = LowPriority;
exports.unstable_runWithPriority = unstable_runWithPriority;
exports.unstable_scheduleCallback = unstable_scheduleCallback;
exports.unstable_cancelCallback = unstable_cancelCallback;
exports.unstable_wrapCallback = unstable_wrapCallback;
exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
exports.unstable_shouldYield = unstable_shouldYield;
exports.unstable_continueExecution = unstable_continueExecution;
exports.unstable_pauseExecution = unstable_pauseExecution;
exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
  })();
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/scheduler/index.js":
/*!*****************************************!*\
  !*** ./node_modules/scheduler/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/scheduler.development.js */ "./node_modules/scheduler/cjs/scheduler.development.js");
}


/***/ }),

/***/ "./node_modules/scheduler/tracing.js":
/*!*******************************************!*\
  !*** ./node_modules/scheduler/tracing.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/scheduler-tracing.development.js */ "./node_modules/scheduler/cjs/scheduler-tracing.development.js");
}


/***/ }),

/***/ "./node_modules/symbol-observable/es/index.js":
/*!****************************************************!*\
  !*** ./node_modules/symbol-observable/es/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ponyfill.js */ "./node_modules/symbol-observable/es/ponyfill.js");
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {}

var result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__["default"])(root);
/* harmony default export */ __webpack_exports__["default"] = (result);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/symbol-observable/es/ponyfill.js":
/*!*******************************************************!*\
  !*** ./node_modules/symbol-observable/es/ponyfill.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return symbolObservablePonyfill; });
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/actions/action_types.js":
/*!*************************************!*\
  !*** ./src/actions/action_types.js ***!
  \*************************************/
/*! exports provided: APP_BOOTUP, SIGNIN_USER_REQUEST, SIGNIN_USER_SUCCESS, SIGNIN_USER_ERROR, CLEAR_SIGNIN_ERROR, SIGNUP_USER_REQUEST, SIGNUP_USER_SUCCESS, SIGNUP_USER_ERROR, CLEAR_SIGNUP_ERROR, SIGNOUT_USER_SUCCESS, REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_ERROR, AUTHENTICATE_FROM_TOKEN, DISPATCH_PRESENCE_STATE, DISPATCH_PRESENCE_DIFF, OPEN_SOCKET, CLOSE_SOCKET, SOCKET_CONNECTED, SOCKET_DISCONNECTED, SOCKET_ERROR, SOCKET_CLOSED, JOIN_CHANNEL, LEAVE_CHANNEL, CHANNEL_CONNECTED, CHANNEL_DISCONNECTED, CHANNEL_ERROR, CHANNEL_CLOSED, SEND_COMMAND, CONNECT_CHANNEL_ERROR, REQUESTS_RECEIVED, REQUEST_CREATED, REQUEST_CANCELLED, REQUEST_ACCEPTED, REQUEST_CREATED_ERROR, REQUEST_CANCELLED_ERROR, REQUEST_ACCEPTED_ERROR, GAMES_RECEIVED, GAME_ADDED, GAME_REMOVED, GAME_FORCE_QUIT, JOIN_GAME, UPDATE_GAME_INFO, UPDATE_GAME_STATE, PLAY_MOVE_ERROR, PASS_ERROR, RESIGN_ERROR, MESSAGE_CREATED, MESSAGES_RECEIVED, MESSAGE_CREATED_ERROR, MESSAGES_RECEIVED_ERROR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_BOOTUP", function() { return APP_BOOTUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIGNIN_USER_REQUEST", function() { return SIGNIN_USER_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIGNIN_USER_SUCCESS", function() { return SIGNIN_USER_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIGNIN_USER_ERROR", function() { return SIGNIN_USER_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLEAR_SIGNIN_ERROR", function() { return CLEAR_SIGNIN_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIGNUP_USER_REQUEST", function() { return SIGNUP_USER_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIGNUP_USER_SUCCESS", function() { return SIGNUP_USER_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIGNUP_USER_ERROR", function() { return SIGNUP_USER_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLEAR_SIGNUP_ERROR", function() { return CLEAR_SIGNUP_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIGNOUT_USER_SUCCESS", function() { return SIGNOUT_USER_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REFRESH_TOKEN_REQUEST", function() { return REFRESH_TOKEN_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REFRESH_TOKEN_SUCCESS", function() { return REFRESH_TOKEN_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REFRESH_TOKEN_ERROR", function() { return REFRESH_TOKEN_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTHENTICATE_FROM_TOKEN", function() { return AUTHENTICATE_FROM_TOKEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISPATCH_PRESENCE_STATE", function() { return DISPATCH_PRESENCE_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISPATCH_PRESENCE_DIFF", function() { return DISPATCH_PRESENCE_DIFF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPEN_SOCKET", function() { return OPEN_SOCKET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLOSE_SOCKET", function() { return CLOSE_SOCKET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SOCKET_CONNECTED", function() { return SOCKET_CONNECTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SOCKET_DISCONNECTED", function() { return SOCKET_DISCONNECTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SOCKET_ERROR", function() { return SOCKET_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SOCKET_CLOSED", function() { return SOCKET_CLOSED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JOIN_CHANNEL", function() { return JOIN_CHANNEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEAVE_CHANNEL", function() { return LEAVE_CHANNEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANNEL_CONNECTED", function() { return CHANNEL_CONNECTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANNEL_DISCONNECTED", function() { return CHANNEL_DISCONNECTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANNEL_ERROR", function() { return CHANNEL_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANNEL_CLOSED", function() { return CHANNEL_CLOSED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEND_COMMAND", function() { return SEND_COMMAND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONNECT_CHANNEL_ERROR", function() { return CONNECT_CHANNEL_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUESTS_RECEIVED", function() { return REQUESTS_RECEIVED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_CREATED", function() { return REQUEST_CREATED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_CANCELLED", function() { return REQUEST_CANCELLED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_ACCEPTED", function() { return REQUEST_ACCEPTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_CREATED_ERROR", function() { return REQUEST_CREATED_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_CANCELLED_ERROR", function() { return REQUEST_CANCELLED_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_ACCEPTED_ERROR", function() { return REQUEST_ACCEPTED_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAMES_RECEIVED", function() { return GAMES_RECEIVED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAME_ADDED", function() { return GAME_ADDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAME_REMOVED", function() { return GAME_REMOVED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAME_FORCE_QUIT", function() { return GAME_FORCE_QUIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JOIN_GAME", function() { return JOIN_GAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_GAME_INFO", function() { return UPDATE_GAME_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_GAME_STATE", function() { return UPDATE_GAME_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLAY_MOVE_ERROR", function() { return PLAY_MOVE_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PASS_ERROR", function() { return PASS_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESIGN_ERROR", function() { return RESIGN_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MESSAGE_CREATED", function() { return MESSAGE_CREATED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MESSAGES_RECEIVED", function() { return MESSAGES_RECEIVED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MESSAGE_CREATED_ERROR", function() { return MESSAGE_CREATED_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MESSAGES_RECEIVED_ERROR", function() { return MESSAGES_RECEIVED_ERROR; });
/* eslint-disable no-multi-spaces */
// Application
var APP_BOOTUP = 'APP_BOOTUP'; // Authentication

var SIGNIN_USER_REQUEST = 'SIGNIN_USER_REQUEST';
var SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
var SIGNIN_USER_ERROR = 'SIGNIN_USER_ERROR';
var CLEAR_SIGNIN_ERROR = 'CLEAR_SIGNIN_ERROR';
var SIGNUP_USER_REQUEST = 'SIGNUP_USER_REQUEST';
var SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
var SIGNUP_USER_ERROR = 'SIGNUP_USER_ERROR';
var CLEAR_SIGNUP_ERROR = 'CLEAR_SIGNUP_ERROR';
var SIGNOUT_USER_SUCCESS = 'SIGNOUT_USER_SUCCESS';
var REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
var REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
var REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR';
var AUTHENTICATE_FROM_TOKEN = 'AUTHENTICATE_FROM_TOKEN'; // Presence

var DISPATCH_PRESENCE_STATE = 'DISPATCH_PRESENCE_STATE';
var DISPATCH_PRESENCE_DIFF = 'DISPATCH_PRESENCE_DIFF'; // Socket

var OPEN_SOCKET = 'OPEN_SOCKET';
var CLOSE_SOCKET = 'CLOSE_SOCKET';
var SOCKET_CONNECTED = 'SOCKET_CONNECTED';
var SOCKET_DISCONNECTED = 'SOCKET_DISCONNECTED';
var SOCKET_ERROR = 'SOCKET_ERROR';
var SOCKET_CLOSED = 'SOCKET_CLOSED'; // Channels

var JOIN_CHANNEL = 'JOIN_CHANNEL';
var LEAVE_CHANNEL = 'LEAVE_CHANNEL';
var CHANNEL_CONNECTED = 'CHANNEL_CONNECTED';
var CHANNEL_DISCONNECTED = 'CHANNEL_DISCONNECTED';
var CHANNEL_ERROR = 'CHANNEL_ERROR';
var CHANNEL_CLOSED = 'CHANNEL_CLOSED';
var SEND_COMMAND = 'SEND_COMMAND';
var CONNECT_CHANNEL_ERROR = 'CONNECT_CHANNEL_ERROR'; // Requests

var REQUESTS_RECEIVED = 'REQUESTS_RECEIVED';
var REQUEST_CREATED = 'REQUEST_CREATED';
var REQUEST_CANCELLED = 'REQUEST_CANCELLED';
var REQUEST_ACCEPTED = 'REQUEST_ACCEPTED';
var REQUEST_CREATED_ERROR = 'REQUEST_CREATED_ERROR';
var REQUEST_CANCELLED_ERROR = 'REQUEST_CANCELLED_ERROR';
var REQUEST_ACCEPTED_ERROR = 'REQUEST_ACCEPTED_ERROR'; // Games & GameInfo

var GAMES_RECEIVED = 'GAMES_RECEIVED';
var GAME_ADDED = 'GAME_ADDED';
var GAME_REMOVED = 'GAME_REMOVED';
var GAME_FORCE_QUIT = 'GAME_FORCE_QUIT';
var JOIN_GAME = 'JOIN_GAME';
var UPDATE_GAME_INFO = 'UPDATE_GAME_INFO'; // GameState

var UPDATE_GAME_STATE = 'UPDATE_GAME_STATE';
var PLAY_MOVE_ERROR = 'PLAY_MOVE_ERROR';
var PASS_ERROR = 'PASS_ERROR';
var RESIGN_ERROR = 'RESIGN_ERROR'; //  Chat

var MESSAGE_CREATED = 'MESSAGE_CREATED';
var MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
var MESSAGE_CREATED_ERROR = 'MESSAGE_CREATED_ERROR';
var MESSAGES_RECEIVED_ERROR = 'MESSAGES_RECEIVED_ERROR';
/* eslint-enable no-multi-spaces */

/***/ }),

/***/ "./src/actions/application_actions.js":
/*!********************************************!*\
  !*** ./src/actions/application_actions.js ***!
  \********************************************/
/*! exports provided: appBootup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appBootup", function() { return appBootup; });
/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action_types */ "./src/actions/action_types.js");
 // eslint-disable-next-line import/prefer-default-export

var appBootup = function appBootup(bootupTime) {
  return {
    type: _action_types__WEBPACK_IMPORTED_MODULE_0__["APP_BOOTUP"],
    payload: bootupTime
  };
};

/***/ }),

/***/ "./src/actions/authentication_actions.js":
/*!***********************************************!*\
  !*** ./src/actions/authentication_actions.js ***!
  \***********************************************/
/*! exports provided: clearSigninError, clearSignupError, signinUser, signupUser, signoutUser, authenticateFromToken, refreshToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearSigninError", function() { return clearSigninError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearSignupError", function() { return clearSignupError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signinUser", function() { return signinUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signupUser", function() { return signupUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signoutUser", function() { return signoutUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authenticateFromToken", function() { return authenticateFromToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refreshToken", function() { return refreshToken; });
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/api */ "./src/services/api.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/auth_service */ "./src/services/auth_service.js");
/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action_types */ "./src/actions/action_types.js");



var clearSigninError = function clearSigninError() {
  return {
    type: _action_types__WEBPACK_IMPORTED_MODULE_2__["CLEAR_SIGNIN_ERROR"]
  };
};
var clearSignupError = function clearSignupError() {
  return {
    type: _action_types__WEBPACK_IMPORTED_MODULE_2__["CLEAR_SIGNUP_ERROR"]
  };
}; // Extracts server error

var errorPayload = function errorPayload(error) {
  return error.response && error.response.data ? JSON.stringify(error.response.data) : error.toString();
}; // join dispatch after successful login or refresh


var joinDispatch = function joinDispatch(dispatch, userId) {
  dispatch({
    type: _action_types__WEBPACK_IMPORTED_MODULE_2__["OPEN_SOCKET"]
  });
  dispatch({
    type: _action_types__WEBPACK_IMPORTED_MODULE_2__["JOIN_CHANNEL"],
    topic: 'system'
  });
  dispatch({
    type: _action_types__WEBPACK_IMPORTED_MODULE_2__["JOIN_CHANNEL"],
    topic: "user:".concat(userId)
  });
}; // leave dispatch after successful logout


var leaveDispatch = function leaveDispatch(dispatch, userId) {
  dispatch({
    type: _action_types__WEBPACK_IMPORTED_MODULE_2__["LEAVE_CHANNEL"],
    topic: "user:".concat(userId)
  });
  dispatch({
    type: _action_types__WEBPACK_IMPORTED_MODULE_2__["LEAVE_CHANNEL"],
    topic: 'system'
  });
  dispatch({
    type: _action_types__WEBPACK_IMPORTED_MODULE_2__["CLOSE_SOCKET"]
  });
}; // THUNK


var signinUser = function signinUser(_ref) {
  var name = _ref.name,
      password = _ref.password;
  return function (dispatch) {
    dispatch({
      type: _action_types__WEBPACK_IMPORTED_MODULE_2__["SIGNIN_USER_REQUEST"],
      payload: {
        name: name,
        password: password
      }
    }); // Submit name/password to the server

    _services_api__WEBPACK_IMPORTED_MODULE_0__["default"].signin({
      name: name,
      password: password
    }).then(function (response) {
      // - Save JWT token
      var _response$data = response.data,
          token = _response$data.token,
          user = _response$data.user;
      _services_auth_service__WEBPACK_IMPORTED_MODULE_1__["default"].saveToken(token); // dispatch({ type: types.OPEN_SOCKET });
      // dispatch({ type: types.JOIN_CHANNEL, topic: 'system' });
      // dispatch({ type: types.JOIN_CHANNEL, topic: `user:${user.id}` });

      joinDispatch(dispatch, user.id);
      dispatch({
        type: _action_types__WEBPACK_IMPORTED_MODULE_2__["SIGNIN_USER_SUCCESS"],
        payload: response.data
      });
    }).catch(function (error) {
      return dispatch({
        type: _action_types__WEBPACK_IMPORTED_MODULE_2__["SIGNIN_USER_ERROR"],
        payload: errorPayload(error)
      });
    });
  };
}; // THUNK

var signupUser = function signupUser(_ref2) {
  var name = _ref2.name,
      email = _ref2.email,
      password = _ref2.password;
  return function (dispatch) {
    dispatch({
      type: _action_types__WEBPACK_IMPORTED_MODULE_2__["SIGNUP_USER_REQUEST"],
      payload: {
        name: name,
        email: email,
        password: password
      }
    }); // Submit name/password to the server

    _services_api__WEBPACK_IMPORTED_MODULE_0__["default"].signup({
      name: name,
      email: email,
      password: password
    }).then(function (response) {
      // - Save JWT token
      var _response$data2 = response.data,
          token = _response$data2.token,
          user = _response$data2.user;
      _services_auth_service__WEBPACK_IMPORTED_MODULE_1__["default"].saveToken(token); // dispatch({ type: types.OPEN_SOCKET });
      // dispatch({ type: types.JOIN_CHANNEL, topic: 'system' });
      // dispatch({ type: types.JOIN_CHANNEL, topic: `user:${user.id}` });

      joinDispatch(dispatch, user.id);
      dispatch({
        type: _action_types__WEBPACK_IMPORTED_MODULE_2__["SIGNUP_USER_SUCCESS"],
        payload: response.data
      });
    }).catch(function (error) {
      return dispatch({
        type: _action_types__WEBPACK_IMPORTED_MODULE_2__["SIGNUP_USER_ERROR"],
        payload: errorPayload(error)
      });
    });
  };
}; // THUNK

var signoutUser = function signoutUser(userId) {
  return function (dispatch) {
    _services_api__WEBPACK_IMPORTED_MODULE_0__["default"].signout().then(function (response) {
      _services_auth_service__WEBPACK_IMPORTED_MODULE_1__["default"].removeToken(); // dispatch({ type: types.LEAVE_CHANNEL, topic: `user:${userId}` });
      // dispatch({ type: types.LEAVE_CHANNEL, topic: 'system' });
      // dispatch({ type: types.CLOSE_SOCKET });

      leaveDispatch(dispatch, userId);
      dispatch({
        type: _action_types__WEBPACK_IMPORTED_MODULE_2__["SIGNOUT_USER_SUCCESS"],
        payload: response.data
      });
    }).catch(function (error) {
      return (// eslint-disable-next-line no-console
        console.log(error)
      );
    });
  };
}; // This action is used to sync is_activated on refresh.
// Otherwise, hoc authentication might redirect you to sign in!

var authenticateFromToken = function authenticateFromToken() {
  return {
    type: _action_types__WEBPACK_IMPORTED_MODULE_2__["AUTHENTICATE_FROM_TOKEN"],
    payload: null
  };
}; // THUNK

var refreshToken = function refreshToken() {
  return function (dispatch) {
    dispatch({
      type: _action_types__WEBPACK_IMPORTED_MODULE_2__["REFRESH_TOKEN_REQUEST"]
    });
    _services_api__WEBPACK_IMPORTED_MODULE_0__["default"].refreshToken().then(function (response) {
      // - Save JWT token
      var _response$data3 = response.data,
          token = _response$data3.token,
          user = _response$data3.user;
      _services_auth_service__WEBPACK_IMPORTED_MODULE_1__["default"].saveToken(token); // dispatch({ type: types.OPEN_SOCKET });
      // dispatch({ type: types.JOIN_CHANNEL, topic: 'system' });
      // dispatch({ type: types.JOIN_CHANNEL, topic: `user:${user.id}` });

      joinDispatch(dispatch, user.id);
      dispatch({
        type: _action_types__WEBPACK_IMPORTED_MODULE_2__["REFRESH_TOKEN_SUCCESS"],
        payload: response.data
      });
    }).catch(function (error) {
      return dispatch({
        type: _action_types__WEBPACK_IMPORTED_MODULE_2__["REFRESH_TOKEN_ERROR"],
        payload: errorPayload(error)
      });
    });
  };
};

/***/ }),

/***/ "./src/actions/channel_actions.js":
/*!****************************************!*\
  !*** ./src/actions/channel_actions.js ***!
  \****************************************/
/*! exports provided: joinChannel, leaveChannel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "joinChannel", function() { return joinChannel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "leaveChannel", function() { return leaveChannel; });
/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action_types */ "./src/actions/action_types.js");

/* eslint-disable no-multi-spaces */

var joinChannel = function joinChannel(topic) {
  return {
    type: _action_types__WEBPACK_IMPORTED_MODULE_0__["JOIN_CHANNEL"],
    topic: topic
  };
};
var leaveChannel = function leaveChannel(topic) {
  return {
    type: _action_types__WEBPACK_IMPORTED_MODULE_0__["LEAVE_CHANNEL"],
    topic: topic
  };
};
/* eslint-enable no-multi-spaces */

/***/ }),

/***/ "./src/app.css":
/*!*********************!*\
  !*** ./src/app.css ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/alert_box.js":
/*!*************************************!*\
  !*** ./src/components/alert_box.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);


/*
  eslint-disable jsx-a11y/anchor-is-valid,
    jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions
*/

var AlertBox = function AlertBox(_ref) {
  var mode = _ref.mode,
      message = _ref.message,
      onClose = _ref.onClose;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    role: "alert",
    className: "alert alert-".concat(mode)
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    onClick: onClose,
    className: "close"
  }, "\xD7"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, message));
};
/* 
  eslint-enable jsx-a11y/anchor-is-valid,
    jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions
*/


AlertBox.defaultProps = {
  mode: 'info'
};
AlertBox.propTypes = {
  mode: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  message: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (AlertBox);

/***/ }),

/***/ "./src/components/button.js":
/*!**********************************!*\
  !*** ./src/components/button.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var Button = function Button(_ref) {
  var children = _ref.children,
      onClick = _ref.onClick,
      otherProps = _objectWithoutProperties(_ref, ["children", "onClick"]);

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", _extends({
    onClick: onClick,
    className: "button"
  }, otherProps), children);
};

Button.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]).isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Button);

/***/ }),

/***/ "./src/components/form.js":
/*!********************************!*\
  !*** ./src/components/form.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input */ "./src/components/input.js");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./button */ "./src/components/button.js");
/* harmony import */ var _utils_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/validation */ "./src/utils/validation.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var defaultProps = {
  initialState: {},
  buttonLabel: 'Submit',
  disabled: false
};
var propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  schema: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialState: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  //
  buttonLabel: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};

var Form =
/*#__PURE__*/
function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputs", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_loadStateFromProps", function (obj) {
      var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this)),
          schema = _assertThisInitialize.schema;

      var initialState = Object.assign({}, schema);

      if (obj) {
        Object.keys(obj).filter(function (key) {
          return obj[key];
        }).forEach(function (key) {
          initialState[key].value = obj[key];
          initialState[key].valid = Object(_utils_validation__WEBPACK_IMPORTED_MODULE_4__["default"])(obj[key], schema[key].validationRules);
          initialState[key].touched = true;
        });
      }

      return initialState;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderField", function (key) {
      var _assertThisInitialize2 = _assertThisInitialized(_assertThisInitialized(_this)),
          schema = _assertThisInitialize2.schema,
          fieldNames = _assertThisInitialize2.fieldNames;

      var _this$state$key = _this.state[key],
          value = _this$state$key.value,
          valid = _this$state$key.valid,
          touched = _this$state$key.touched;
      var _schema$key = schema[key],
          elementType = _schema$key.elementType,
          elementConfig = _schema$key.elementConfig;
      var lastKey = fieldNames[fieldNames.length - 1];
      var nextKey = fieldNames[fieldNames.indexOf(key) + 1]; // Equivalent to onSubmitEditing of React Native

      var _onKeyPress = key !== lastKey ? // Focus on next node if not last
      function (e) {
        return e.key === 'Enter' && _this._focusTextInput(_this.inputs[nextKey]);
      } : // Trigger submit if last and valid
      function (e) {
        return e.key === 'Enter' && _this._validate() && _this._handleClick(e);
      };

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_input__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
        key: key,
        inputType: elementType,
        reffunc: function reffunc(c) {
          return _this.inputs[key] = c;
        } // eslint-disable-line no-return-assign
        ,
        value: value || '',
        valid: valid,
        touched: touched,
        onChange: function onChange(e) {
          return _this._handleOnChange(e, key);
        },
        onKeyPress: function onKeyPress(e) {
          return _onKeyPress(e);
        }
      }, elementConfig));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_focusTextInput", function (node) {
      try {
        node.focus();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log("Couldn't focus on next text input: ".concat(e.message));
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleOnChange", function (e, key) {
      var value = e.target.value;

      _this.setState(function (prevState) {
        return _objectSpread({}, prevState, _defineProperty({}, key, _objectSpread({}, prevState[key], {
          value: value || '',
          valid: Object(_utils_validation__WEBPACK_IMPORTED_MODULE_4__["default"])(value, prevState[key].validationRules),
          touched: true
        })));
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_validate", function () {
      return _this.fieldNames.map(function (key) {
        return _this.state[key].valid;
      }).every(function (v) {
        return v;
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_loadData", function () {
      return _this.fieldNames.reduce(function (acc, key) {
        acc[key] = _this.state[key].value;
        return acc;
      }, {});
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleClick", function (e) {
      e.preventDefault();

      _this.props.onClick(_this._loadData());
    });

    var _schema = props.schema,
        _initialState = props.initialState;
    _this.schema = _schema;
    _this.fieldNames = Object.keys(_schema);
    _this.state = _this._loadStateFromProps(_initialState);
    return _this;
  }

  _createClass(Form, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          disabled = _this$props.disabled,
          buttonLabel = _this$props.buttonLabel;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", null, this.fieldNames.map(function (key) {
        return _this2._renderField(key);
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
        disabled: disabled || !this._validate(),
        onClick: this._handleClick
      }, buttonLabel));
    }
  }]);

  return Form;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

_defineProperty(Form, "defaultProps", defaultProps);

_defineProperty(Form, "propTypes", propTypes);

/* harmony default export */ __webpack_exports__["default"] = (Form);

/***/ }),

/***/ "./src/components/input.js":
/*!*********************************!*\
  !*** ./src/components/input.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var Input = function Input(_ref) {
  var inputType = _ref.inputType,
      label = _ref.label,
      reffunc = _ref.reffunc,
      valid = _ref.valid,
      touched = _ref.touched,
      noWrapper = _ref.noWrapper,
      otherProps = _objectWithoutProperties(_ref, ["inputType", "label", "reffunc", "valid", "touched", "noWrapper"]);

  var inputElement;
  var inputClasses = ['input-element'];

  if (!valid && touched) {
    inputClasses.push('error');
  }

  switch (inputType) {
    case 'select':
      {
        // Extract options property
        var options = otherProps.options,
            selectProps = _objectWithoutProperties(otherProps, ["options"]);

        inputElement = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", _extends({
          className: inputClasses.join(' '),
          ref: reffunc
        }, selectProps), options.map(function (option) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
            key: option.value,
            value: option.value,
            selected: option.selected
          }, option.displayValue);
        }));
        break;
      }

    case 'textarea':
      {
        inputElement = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", _extends({
          className: inputClasses.join(' '),
          ref: reffunc
        }, otherProps));
        break;
      }

    case 'input':
    default:
      {
        inputElement = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", _extends({
          className: inputClasses.join(' '),
          ref: reffunc
        }, otherProps));
      }
  }

  if (noWrapper) {
    return inputElement;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "input"
  }, label && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "label"
  }, label) // eslint-disable-line jsx-a11y/label-has-for
  , inputElement);
};

Input.defaultProps = {
  reffunc: function reffunc() {
    return null;
  },
  valid: false,
  touched: false,
  noWrapper: false
};
Input.propTypes = {
  inputType: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  // eslint-disable-next-line react/require-default-props
  reffunc: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  valid: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  touched: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  noWrapper: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};
/* harmony default export */ __webpack_exports__["default"] = (Input);

/***/ }),

/***/ "./src/components/loading_dots.js":
/*!****************************************!*\
  !*** ./src/components/loading_dots.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var propTypes = {
  interval: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  dots: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number
};

var LoadingDots =
/*#__PURE__*/
function (_Component) {
  _inherits(LoadingDots, _Component);

  function LoadingDots() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LoadingDots);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LoadingDots)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      frame: 1
    });

    return _this;
  }

  _createClass(LoadingDots, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.interval = setInterval(function () {
        return _this2.setState({
          frame: _this2.state.frame + 1
        });
      }, this.props.interval);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: "render",
    value: function render() {
      var dots = this.state.frame % (this.props.dots + 1);
      var text = '.'.repeat(dots);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, text);
    }
  }]);

  return LoadingDots;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

_defineProperty(LoadingDots, "propTypes", propTypes);

_defineProperty(LoadingDots, "defaultProps", {
  interval: 300,
  dots: 3
});

/* harmony default export */ __webpack_exports__["default"] = (LoadingDots);

/***/ }),

/***/ "./src/components/presences/presence_item.js":
/*!***************************************************!*\
  !*** ./src/components/presences/presence_item.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_formatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/formatter */ "./src/utils/formatter.js");



var PresenceItem = function PresenceItem(_ref) {
  var presence = _ref.presence;

  if (!presence) {
    return;
  } // Allowed fields : username, phx_ref, online_at, id, count


  var username = presence.username,
      online_at = presence.online_at,
      count = presence.count;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Object(_utils_formatter__WEBPACK_IMPORTED_MODULE_1__["formatTimestamp"])(online_at), "\xA0"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "(", count, ")\xA0"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, username));
};

/* harmony default export */ __webpack_exports__["default"] = (PresenceItem);

/***/ }),

/***/ "./src/components/presences/presence_list.js":
/*!***************************************************!*\
  !*** ./src/components/presences/presence_list.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _presence_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presence_item */ "./src/components/presences/presence_item.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var PresenceList =
/*#__PURE__*/
function (_Component) {
  _inherits(PresenceList, _Component);

  function PresenceList() {
    _classCallCheck(this, PresenceList);

    return _possibleConstructorReturn(this, _getPrototypeOf(PresenceList).apply(this, arguments));
  }

  _createClass(PresenceList, [{
    key: "render",
    value: function render() {
      var presences = this.props.presences;

      if (!presences) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "empty");
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, presences.map(function (presence) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_presence_item__WEBPACK_IMPORTED_MODULE_1__["default"], {
          key: presence.phx_ref,
          presence: presence
        });
      }));
    }
  }]);

  return PresenceList;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (PresenceList);

/***/ }),

/***/ "./src/components/properties.js":
/*!**************************************!*\
  !*** ./src/components/properties.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var Properties = function Properties(_ref) {
  var object = _ref.object,
      recursive = _ref.recursive,
      exclude = _ref.exclude;
  var collector = []; // format property by typeof

  var formatValue = function formatValue(value) {
    switch (_typeof(value)) {
      case "boolean":
        return value ? "true" : "false";
        break;

      case "object":
        return recursive ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Properties, {
          object: value
        }) : JSON.stringify(value);

      default:
        return value;
    }
  }; // Push dt, dd into an array before render
  // to aggregate components witouht a main root


  Object.keys(object).forEach(function (key) {
    if (!exclude.includes(key)) {
      collector.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", {
        key: key
      }, key));
      collector.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", {
        key: "".concat(key, "-").concat(object[key])
      }, formatValue(object[key])));
    }
  });
  var className = recursive ? '' : 'dl-horizontal';
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dl", {
    className: className
  }, collector);
};

Properties.defaultProps = {
  recursive: false,
  exclude: []
};
Properties.propTypes = {
  object: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  recursive: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  exclude: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array
};
/* harmony default export */ __webpack_exports__["default"] = (Properties);

/***/ }),

/***/ "./src/components/signin_form.js":
/*!***************************************!*\
  !*** ./src/components/signin_form.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _alert_box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./alert_box */ "./src/components/alert_box.js");
/* harmony import */ var _schemas_signin_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../schemas/signin_schema */ "./src/schemas/signin_schema.js");
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form */ "./src/components/form.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var defaultProps = {
  errorMessage: null
};
var propTypes = {
  signinUser: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  clearSigninError: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  errorMessage: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};

var SigninForm =
/*#__PURE__*/
function (_Component) {
  _inherits(SigninForm, _Component);

  function SigninForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SigninForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SigninForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleClick", function (payload) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(payload));

      _this.props.signinUser(payload);
    });

    return _this;
  }

  _createClass(SigninForm, [{
    key: "render",
    value: function render() {
      // eslint-disable-next-line no-shadow
      var _this$props = this.props,
          errorMessage = _this$props.errorMessage,
          clearSigninError = _this$props.clearSigninError;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Sign In"), errorMessage && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_alert_box__WEBPACK_IMPORTED_MODULE_2__["default"], {
        mode: "danger",
        message: errorMessage,
        onClose: clearSigninError
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_form__WEBPACK_IMPORTED_MODULE_4__["default"], {
        schema: _schemas_signin_schema__WEBPACK_IMPORTED_MODULE_3__["default"],
        onClick: this._handleClick,
        buttonLabel: "Sign In"
      }));
    }
  }]);

  return SigninForm;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

_defineProperty(SigninForm, "defaultProps", defaultProps);

_defineProperty(SigninForm, "propTypes", propTypes);

/* harmony default export */ __webpack_exports__["default"] = (SigninForm);

/***/ }),

/***/ "./src/components/signup_form.js":
/*!***************************************!*\
  !*** ./src/components/signup_form.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _alert_box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./alert_box */ "./src/components/alert_box.js");
/* harmony import */ var _schemas_signup_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../schemas/signup_schema */ "./src/schemas/signup_schema.js");
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form */ "./src/components/form.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var defaultProps = {
  errorMessage: null
};
var propTypes = {
  signupUser: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  clearSignupError: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  errorMessage: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};

var SignupForm =
/*#__PURE__*/
function (_Component) {
  _inherits(SignupForm, _Component);

  function SignupForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SignupForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SignupForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleClick", function (payload) {
      _this.props.signupUser(payload);
    });

    return _this;
  }

  _createClass(SignupForm, [{
    key: "render",
    value: function render() {
      // eslint-disable-next-line no-shadow
      var _this$props = this.props,
          errorMessage = _this$props.errorMessage,
          clearSignupError = _this$props.clearSignupError;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Sign Up"), errorMessage && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_alert_box__WEBPACK_IMPORTED_MODULE_2__["default"], {
        mode: "danger",
        message: errorMessage,
        onClose: clearSignupError
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_form__WEBPACK_IMPORTED_MODULE_4__["default"], {
        schema: _schemas_signup_schema__WEBPACK_IMPORTED_MODULE_3__["default"],
        onClick: this._handleClick,
        buttonLabel: "Sign Up"
      }));
    }
  }]);

  return SignupForm;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

_defineProperty(SignupForm, "defaultProps", defaultProps);

_defineProperty(SignupForm, "propTypes", propTypes);

/* harmony default export */ __webpack_exports__["default"] = (SignupForm);

/***/ }),

/***/ "./src/config/config.js":
/*!******************************!*\
  !*** ./src/config/config.js ***!
  \******************************/
/*! exports provided: ROOT_URL, ROOT_SOCKET */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROOT_URL", function() { return ROOT_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROOT_SOCKET", function() { return ROOT_SOCKET; });
// Configure application endpoint
// DEVELOPMENT
var ROOT_URL = 'http://localhost:4000/api/v1'; // PRODUCTION
// export const ROOT_URL = 'http://ks300952.kimsufi.com/api/v1';
// DEVELOPMENT

var ROOT_SOCKET = 'ws://localhost:4000'; // PRODUCTION
// export const ROOT_SOCKET = 'ws://ks300952.kimsufi.com';

/***/ }),

/***/ "./src/configure_store.js":
/*!********************************!*\
  !*** ./src/configure_store.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-devtools-extension */ "./node_modules/redux-devtools-extension/index.js");
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reducers */ "./src/reducers/index.js");
/* harmony import */ var _middlewares_socket_middleware__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./middlewares/socket_middleware */ "./src/middlewares/socket_middleware.js");







var __DEV__ = "development" !== 'production';

var configureStore = function configureStore() {
  var middlewares = [redux_thunk__WEBPACK_IMPORTED_MODULE_1__["default"], _middlewares_socket_middleware__WEBPACK_IMPORTED_MODULE_5__["default"]];

  if (__DEV__) {
    middlewares.push(Object(redux_logger__WEBPACK_IMPORTED_MODULE_2__["createLogger"])({
      collapsed: true,
      diff: true
    }));
  }

  var store = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(_reducers__WEBPACK_IMPORTED_MODULE_4__["default"], __DEV__ ? Object(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_3__["composeWithDevTools"])(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"].apply(void 0, middlewares)) : redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"].apply(void 0, middlewares));
  return store;
};

/* harmony default export */ __webpack_exports__["default"] = (configureStore);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.css */ "./src/app.css");
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_app_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/auth_service */ "./src/services/auth_service.js");
/* harmony import */ var _actions_authentication_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./actions/authentication_actions */ "./src/actions/authentication_actions.js");
/* harmony import */ var _configure_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./configure_store */ "./src/configure_store.js");
/* harmony import */ var _views_app_view_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./views/app_view.js */ "./src/views/app_view.js");








var store = Object(_configure_store__WEBPACK_IMPORTED_MODULE_6__["default"])(); // RELOAD STATE FROM TOKEN

if (_services_auth_service__WEBPACK_IMPORTED_MODULE_4__["default"].isLoggedIn()) {
  // This will sync authenticated flag on reload
  // to avoid authentication_hoc to change path before
  // trying to refresh token!
  store.dispatch(Object(_actions_authentication_actions__WEBPACK_IMPORTED_MODULE_5__["authenticateFromToken"])()); // Async reload of current user by refreshing token

  Object(_actions_authentication_actions__WEBPACK_IMPORTED_MODULE_5__["refreshToken"])()(store.dispatch);
} // END RELOAD STATE FROM TOKEN
// eslint-disable-next-line no-undef


var app = document.getElementById('app');
Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], {
  store: store
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_views_app_view_js__WEBPACK_IMPORTED_MODULE_7__["default"], null)), app);

/***/ }),

/***/ "./src/middlewares/set_game_channel.js":
/*!*********************************************!*\
  !*** ./src/middlewares/set_game_channel.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var phoenix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phoenix */ "./node_modules/phoenix/priv/static/phoenix.js");
/* harmony import */ var phoenix__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phoenix__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/action_types */ "./src/actions/action_types.js");
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var presences = {};

var setGameChannel = function setGameChannel(dispatch, socket, topic) {
  var channel = socket.channel(topic, {}); // const presence = new Presence(channel);

  var listBy = function listBy(id, _ref) {
    var _ref$metas = _toArray(_ref.metas),
        first = _ref$metas[0],
        rest = _ref$metas.slice(1);

    return Object.assign({}, first, {
      id: id,
      count: rest.length + 1
    });
  };

  var render = function render(presences) {
    return phoenix__WEBPACK_IMPORTED_MODULE_0__["Presence"].list(presences, listBy);
  }; // // Presences
  // presenceOnSync(() => {
  //   const presences = presence.list(listBy);
  //   return dispatch({
  //     type: types.DISPATCH_PRESENCE_STATE,
  //     payload: { topic, presences },
  //   });
  // });
  // Presences


  channel.on('presence_state', function (payload) {
    presences = phoenix__WEBPACK_IMPORTED_MODULE_0__["Presence"].syncState(presences, payload);
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["DISPATCH_PRESENCE_STATE"],
      payload: {
        topic: topic,
        presences: render(presences)
      }
    });
  });
  channel.on('presence_diff', function (payload) {
    presences = phoenix__WEBPACK_IMPORTED_MODULE_0__["Presence"].syncDiff(presences, payload);
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["DISPATCH_PRESENCE_DIFF"],
      payload: {
        topic: topic,
        presences: render(presences)
      }
    });
  }); // Game

  channel.on('update_game_state', function (payload) {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["UPDATE_GAME_STATE"],
      payload: payload
    });
  });
  channel.on('update_game_info', function (payload) {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["UPDATE_GAME_INFO"],
      payload: payload
    });
  });
  channel.on('game_force_quit', function (payload) {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["GAME_FORCE_QUIT"],
      payload: payload
    });
  }); // Chat room

  channel.on('messages_received', function (payload) {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["MESSAGES_RECEIVED"],
      payload: payload
    });
  });
  channel.on('message_created', function (payload) {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["MESSAGE_CREATED"],
      payload: payload
    });
  }); // Join

  if (channel.state !== 'joined') {
    channel.join().receive('ok', function () {
      return dispatch({
        type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["CHANNEL_CONNECTED"],
        payload: {
          topic: topic
        }
      });
    }).receive('error', function (payload) {
      return dispatch({
        type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["CONNECT_CHANNEL_ERROR"],
        payload: {
          topic: topic,
          error: payload
        }
      });
    }).receive('timeout', function () {
      return (// eslint-disable-next-line no-console
        console.log('Networking issue. Still waiting...')
      );
    });
  }

  channel.onError(function () {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["CHANNEL_ERROR"],
      payload: {
        topic: topic,
        error: 'there was an error!'
      }
    });
  });
  channel.onClose(function () {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["CHANNEL_CLOSED"],
      payload: {
        topic: topic,
        error: 'the channel has gone away gracefully'
      }
    });
  });
  return channel;
};

/* harmony default export */ __webpack_exports__["default"] = (setGameChannel);

/***/ }),

/***/ "./src/middlewares/set_lobby_channel.js":
/*!**********************************************!*\
  !*** ./src/middlewares/set_lobby_channel.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var phoenix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phoenix */ "./node_modules/phoenix/priv/static/phoenix.js");
/* harmony import */ var phoenix__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phoenix__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/action_types */ "./src/actions/action_types.js");
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var presences = {};

var setLobbyChannel = function setLobbyChannel(dispatch, socket) {
  var topic = 'lobby';
  var channel = socket.channel(topic, {}); // const presence = new Presence(channel);

  var listBy = function listBy(id, _ref) {
    var _ref$metas = _toArray(_ref.metas),
        first = _ref$metas[0],
        rest = _ref$metas.slice(1);

    return Object.assign({}, first, {
      id: id,
      count: rest.length + 1
    });
  };

  var render = function render(presences) {
    return phoenix__WEBPACK_IMPORTED_MODULE_0__["Presence"].list(presences, listBy);
  }; // // Presences
  // presenceOnSync(() => {
  //   const presences = presence.list(listBy);
  //   return dispatch({
  //     type: types.DISPATCH_PRESENCE_STATE,
  //     payload: { topic, presences },
  //   });
  // });
  // Presences


  channel.on('presence_state', function (payload) {
    presences = phoenix__WEBPACK_IMPORTED_MODULE_0__["Presence"].syncState(presences, payload);
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["DISPATCH_PRESENCE_STATE"],
      payload: {
        topic: topic,
        presences: render(presences)
      }
    });
  });
  channel.on('presence_diff', function (payload) {
    presences = phoenix__WEBPACK_IMPORTED_MODULE_0__["Presence"].syncDiff(presences, payload);
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["DISPATCH_PRESENCE_DIFF"],
      payload: {
        topic: topic,
        presences: render(presences)
      }
    });
  }); // Request

  channel.on('requests_received', function (payload) {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["REQUESTS_RECEIVED"],
      payload: payload
    });
  });
  channel.on('request_created', function (payload) {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["REQUEST_CREATED"],
      payload: payload
    });
  });
  channel.on('request_created_error', function (payload) {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["REQUEST_CREATED_ERROR"],
      payload: payload
    });
  });
  channel.on('request_cancelled', function (payload) {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["REQUEST_CANCELLED"],
      payload: payload
    });
  });
  channel.on('request_cancelled_error', function (payload) {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["REQUEST_CANCELLED_ERROR"],
      payload: payload
    });
  });
  channel.on('request_accepted', function (payload) {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["REQUEST_ACCEPTED"],
      payload: payload
    });
  });
  channel.on('request_accepted_error', function (payload) {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["REQUEST_ACCEPTED_ERROR"],
      payload: payload
    });
  });
  channel.on('games_received', function (payload) {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["GAMES_RECEIVED"],
      payload: payload
    });
  });
  channel.on('game_added', function (payload) {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["GAME_ADDED"],
      payload: payload
    });
  });
  channel.on('game_removed', function (payload) {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["GAME_REMOVED"],
      payload: payload
    });
  }); // Join

  if (channel.state !== 'joined') {
    channel.join().receive('ok', function () {
      return dispatch({
        type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["CHANNEL_CONNECTED"],
        payload: {
          topic: topic
        }
      });
    }).receive('error', function (payload) {
      return dispatch({
        type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["CONNECT_CHANNEL_ERROR"],
        payload: {
          topic: topic,
          error: payload
        }
      });
    }).receive('timeout', function () {
      return (// eslint-disable-next-line no-console
        console.log('Networking issue. Still waiting...')
      );
    });
  }

  channel.onError(function () {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["CHANNEL_ERROR"],
      payload: {
        topic: topic,
        error: 'there was an error!'
      }
    });
  });
  channel.onClose(function () {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_1__["CHANNEL_CLOSED"],
      payload: {
        topic: topic,
        error: 'the channel has gone away gracefully'
      }
    });
  });
  return channel;
};

/* harmony default export */ __webpack_exports__["default"] = (setLobbyChannel);

/***/ }),

/***/ "./src/middlewares/set_socket.js":
/*!***************************************!*\
  !*** ./src/middlewares/set_socket.js ***!
  \***************************************/
/*! exports provided: setSocket, closeSocket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSocket", function() { return setSocket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeSocket", function() { return closeSocket; });
/* harmony import */ var phoenix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phoenix */ "./node_modules/phoenix/priv/static/phoenix.js");
/* harmony import */ var phoenix__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phoenix__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/auth_service */ "./src/services/auth_service.js");
/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/action_types */ "./src/actions/action_types.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config/config */ "./src/config/config.js");




var socket;

var socketOptions = function socketOptions(token) {
  return {
    params: {
      token: token
    },
    logger: function logger(kind, msg, data) {
      return (// eslint-disable-next-line no-console
        console.log("".concat(kind, ": ").concat(msg), data)
      );
    }
  };
};

var setSocket = function setSocket(dispatch) {
  if (socket) {
    return socket;
  }

  var token = _services_auth_service__WEBPACK_IMPORTED_MODULE_1__["default"].loadToken();
  socket = new phoenix__WEBPACK_IMPORTED_MODULE_0__["Socket"]("".concat(_config_config__WEBPACK_IMPORTED_MODULE_3__["ROOT_SOCKET"], "/socket"), socketOptions(token));
  socket.connect();
  socket.onError(function () {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_2__["SOCKET_ERROR"],
      payload: null
    });
  });
  socket.onClose(function () {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_2__["SOCKET_CLOSED"],
      payload: null
    });
  });
  dispatch({
    type: _actions_action_types__WEBPACK_IMPORTED_MODULE_2__["SOCKET_CONNECTED"],
    payload: null
  });
  return socket;
};
var closeSocket = function closeSocket(dispatch) {
  if (socket) {
    try {
      socket.disconnect();
      socket = null;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }

    dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_2__["SOCKET_DISCONNECTED"],
      payload: null
    });
  }

  return socket;
};

/***/ }),

/***/ "./src/middlewares/set_system_channel.js":
/*!***********************************************!*\
  !*** ./src/middlewares/set_system_channel.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/action_types */ "./src/actions/action_types.js");


var setSystemChannel = function setSystemChannel(dispatch, socket) {
  var topic = 'system';
  var channel = socket.channel(topic, {}); // Control and Lag estimation

  channel.on('ping', function (payload) {
    channel.push('pong', payload);
  }); // Join

  if (channel.state !== 'joined') {
    channel.join().receive('ok', function () {
      return dispatch({
        type: _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_CONNECTED"],
        payload: {
          topic: topic
        }
      });
    }).receive('error', function (payload) {
      return dispatch({
        type: _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CONNECT_CHANNEL_ERROR"],
        payload: {
          topic: topic,
          error: payload
        }
      });
    }).receive('timeout', function () {
      return (// eslint-disable-next-line no-console
        console.log('Networking issue. Still waiting...')
      );
    });
  }

  channel.onError(function () {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_ERROR"],
      payload: {
        topic: topic,
        error: 'there was an error!'
      }
    });
  });
  channel.onClose(function () {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_CLOSED"],
      payload: {
        topic: topic,
        error: 'the channel has gone away gracefully'
      }
    });
  });
  return channel;
};

/* harmony default export */ __webpack_exports__["default"] = (setSystemChannel);

/***/ }),

/***/ "./src/middlewares/set_user_channel.js":
/*!*********************************************!*\
  !*** ./src/middlewares/set_user_channel.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/action_types */ "./src/actions/action_types.js");


var setUserChannel = function setUserChannel(dispatch, socket, topic) {
  var channel = socket.channel(topic, {});
  channel.on('join_game', function (payload) {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["JOIN_GAME"],
      payload: payload
    });
  }); // Join

  if (channel.state !== 'joined') {
    channel.join().receive('ok', function () {
      return dispatch({
        type: _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_CONNECTED"],
        payload: {
          topic: topic
        }
      });
    }).receive('error', function (payload) {
      return dispatch({
        type: _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CONNECT_CHANNEL_ERROR"],
        payload: {
          topic: topic,
          error: payload
        }
      });
    }).receive('timeout', function () {
      return (// eslint-disable-next-line no-console
        console.log('Networking issue. Still waiting...')
      );
    });
  }

  channel.onError(function () {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_ERROR"],
      payload: {
        topic: topic,
        error: 'there was an error!'
      }
    });
  });
  channel.onClose(function () {
    return dispatch({
      type: _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_CLOSED"],
      payload: {
        topic: topic,
        error: 'the channel has gone away gracefully'
      }
    });
  });
  return channel;
};

/* harmony default export */ __webpack_exports__["default"] = (setUserChannel);

/***/ }),

/***/ "./src/middlewares/socket_middleware.js":
/*!**********************************************!*\
  !*** ./src/middlewares/socket_middleware.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/action_types */ "./src/actions/action_types.js");
/* harmony import */ var _set_socket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./set_socket */ "./src/middlewares/set_socket.js");
/* harmony import */ var _set_system_channel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set_system_channel */ "./src/middlewares/set_system_channel.js");
/* harmony import */ var _set_lobby_channel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./set_lobby_channel */ "./src/middlewares/set_lobby_channel.js");
/* harmony import */ var _set_user_channel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./set_user_channel */ "./src/middlewares/set_user_channel.js");
/* harmony import */ var _set_game_channel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./set_game_channel */ "./src/middlewares/set_game_channel.js");






var socket;
var channel;
var channels = {};

var socketMiddleware = function socketMiddleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        // SOCKET
        case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["OPEN_SOCKET"]:
          {
            socket = Object(_set_socket__WEBPACK_IMPORTED_MODULE_1__["setSocket"])(store.dispatch);
            return next(action);
          }

        case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CLOSE_SOCKET"]:
          {
            if (socket) {
              socket = Object(_set_socket__WEBPACK_IMPORTED_MODULE_1__["closeSocket"])(store.dispatch);
            }

            return next(action);
          }
        // CHANNELS

        case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["JOIN_CHANNEL"]:
          {
            socket = Object(_set_socket__WEBPACK_IMPORTED_MODULE_1__["setSocket"])(store.dispatch);
            var topicPrefix = action.topic.split(':')[0];

            switch (topicPrefix) {
              case 'system':
                channels[action.topic] = Object(_set_system_channel__WEBPACK_IMPORTED_MODULE_2__["default"])(store.dispatch, socket);
                break;

              case 'lobby':
                channels[action.topic] = Object(_set_lobby_channel__WEBPACK_IMPORTED_MODULE_3__["default"])(store.dispatch, socket);
                break;

              case 'user':
                channels[action.topic] = Object(_set_user_channel__WEBPACK_IMPORTED_MODULE_4__["default"])(store.dispatch, socket, action.topic);
                break;

              case 'game':
                channels[action.topic] = Object(_set_game_channel__WEBPACK_IMPORTED_MODULE_5__["default"])(store.dispatch, socket, action.topic);
                break;

              default:
                // eslint-disable-next-line no-console
                console.log("Unknown topic : ".concat(action.topic));
            }

            return next(action);
          }

        case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["LEAVE_CHANNEL"]:
          {
            channel = channels[action.topic];

            if (channel) {
              if (channel.state === 'joined') {
                try {
                  channel.leave();
                } catch (err) {
                  // eslint-disable-next-line no-console
                  console.log(err);
                }
              }

              channel = null;
            }

            store.dispatch({
              type: _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_DISCONNECTED"],
              payload: {
                topic: action.topic
              }
            });
            return next(action);
          }

        case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SEND_COMMAND"]:
          {
            var message = "SEND COMMAND -> Topic : ".concat(action.topic, ", ") + "Command : ".concat(action.command, ", Payload : ").concat(action.payload); // eslint-disable-next-line no-console

            console.log(message);
            channel = channels[action.topic];

            if (!!channel) {
              channel.push(action.command, action.payload);
            }

            return next(action);
          }
        // DEFAULT

        default:
          return next(action);
      }
    };
  };
};

/* harmony default export */ __webpack_exports__["default"] = (socketMiddleware);

/***/ }),

/***/ "./src/reducers/application/bootup_time_reducer.js":
/*!*********************************************************!*\
  !*** ./src/reducers/application/bootup_time_reducer.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/action_types */ "./src/actions/action_types.js");
/* harmony import */ var _initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../initial_state */ "./src/reducers/initial_state.js");



var bootupTime = function bootupTime() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initial_state__WEBPACK_IMPORTED_MODULE_1__["default"].application.bootupTime;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["APP_BOOTUP"]:
      return action.payload;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (bootupTime);

/***/ }),

/***/ "./src/reducers/application/is_fetching_reducer.js":
/*!*********************************************************!*\
  !*** ./src/reducers/application/is_fetching_reducer.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _initial_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../initial_state */ "./src/reducers/initial_state.js");


var isFetching = function isFetching() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initial_state__WEBPACK_IMPORTED_MODULE_0__["default"].application.isFetching;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type.match(/_REQUEST$/)) {
    return true;
  } else if (action.type.match(/_SUCCESS$/) || action.type.match(/_ERROR$/)) {
    return false;
  }

  return state;
};

/* harmony default export */ __webpack_exports__["default"] = (isFetching);

/***/ }),

/***/ "./src/reducers/application/socket_status_reducer.js":
/*!***********************************************************!*\
  !*** ./src/reducers/application/socket_status_reducer.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/action_types */ "./src/actions/action_types.js");
/* harmony import */ var _initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../initial_state */ "./src/reducers/initial_state.js");


var initialStatus = _initial_state__WEBPACK_IMPORTED_MODULE_1__["default"].application.socketStatus;

var socketStatus = function socketStatus() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialStatus;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    // When a socket close and reconnect
    // set socket status also when channels recoonect
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_CONNECTED"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SOCKET_CONNECTED"]:
      return 'connected';

    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SOCKET_DISCONNECTED"]:
      return 'disconnected';

    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SOCKET_ERROR"]:
      return 'error';

    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SOCKET_CLOSED"]:
      return 'closed';

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (socketStatus);

/***/ }),

/***/ "./src/reducers/application_reducer.js":
/*!*********************************************!*\
  !*** ./src/reducers/application_reducer.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _application_bootup_time_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./application/bootup_time_reducer */ "./src/reducers/application/bootup_time_reducer.js");
/* harmony import */ var _application_is_fetching_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./application/is_fetching_reducer */ "./src/reducers/application/is_fetching_reducer.js");
/* harmony import */ var _application_socket_status_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./application/socket_status_reducer */ "./src/reducers/application/socket_status_reducer.js");




var application = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  bootupTime: _application_bootup_time_reducer__WEBPACK_IMPORTED_MODULE_1__["default"],
  isFetching: _application_is_fetching_reducer__WEBPACK_IMPORTED_MODULE_2__["default"],
  socketStatus: _application_socket_status_reducer__WEBPACK_IMPORTED_MODULE_3__["default"]
});
/* harmony default export */ __webpack_exports__["default"] = (application);

/***/ }),

/***/ "./src/reducers/authentication/current_user_reducer.js":
/*!*************************************************************!*\
  !*** ./src/reducers/authentication/current_user_reducer.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/action_types */ "./src/actions/action_types.js");
/* harmony import */ var _initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../initial_state */ "./src/reducers/initial_state.js");


var initialUser = _initial_state__WEBPACK_IMPORTED_MODULE_1__["default"].authentication.currentUser;

var currentUser = function currentUser() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialUser;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNUP_USER_SUCCESS"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNIN_USER_SUCCESS"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["REFRESH_TOKEN_SUCCESS"]:
      return action.payload.user;

    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNOUT_USER_SUCCESS"]:
      return initialUser;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (currentUser);

/***/ }),

/***/ "./src/reducers/authentication/is_authenticated_reducer.js":
/*!*****************************************************************!*\
  !*** ./src/reducers/authentication/is_authenticated_reducer.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/action_types */ "./src/actions/action_types.js");
/* harmony import */ var _initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../initial_state */ "./src/reducers/initial_state.js");


var initialIsAuthenticated = _initial_state__WEBPACK_IMPORTED_MODULE_1__["default"].authentication.isAuthenticated;

var isAuthenticated = function isAuthenticated() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialIsAuthenticated;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["AUTHENTICATE_FROM_TOKEN"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["REFRESH_TOKEN_SUCCESS"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNIN_USER_SUCCESS"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNUP_USER_SUCCESS"]:
      return true;

    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNOUT_USER_SUCCESS"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["REFRESH_TOKEN_ERROR"]:
      return false;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (isAuthenticated);

/***/ }),

/***/ "./src/reducers/authentication/signin_error_reducer.js":
/*!*************************************************************!*\
  !*** ./src/reducers/authentication/signin_error_reducer.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/action_types */ "./src/actions/action_types.js");
/* harmony import */ var _initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../initial_state */ "./src/reducers/initial_state.js");


var initialError = _initial_state__WEBPACK_IMPORTED_MODULE_1__["default"].authentication.signinError;

var signinError = function signinError() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialError;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CLEAR_SIGNIN_ERROR"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNIN_USER_SUCCESS"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNUP_USER_SUCCESS"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["REFRESH_TOKEN_SUCCESS"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNOUT_USER_SUCCESS"]:
      return null;

    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNIN_USER_ERROR"]:
      return action.payload;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (signinError);

/***/ }),

/***/ "./src/reducers/authentication/signup_error_reducer.js":
/*!*************************************************************!*\
  !*** ./src/reducers/authentication/signup_error_reducer.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/action_types */ "./src/actions/action_types.js");
/* harmony import */ var _initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../initial_state */ "./src/reducers/initial_state.js");


var initialError = _initial_state__WEBPACK_IMPORTED_MODULE_1__["default"].authentication.signupError;

var SignupError = function SignupError() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialError;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CLEAR_SIGNUP_ERROR"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNIN_USER_SUCCESS"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNUP_USER_SUCCESS"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["REFRESH_TOKEN_SUCCESS"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNOUT_USER_SUCCESS"]:
      return null;

    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNUP_USER_ERROR"]:
      return action.payload;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (SignupError);

/***/ }),

/***/ "./src/reducers/authentication/token_reducer.js":
/*!******************************************************!*\
  !*** ./src/reducers/authentication/token_reducer.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/action_types */ "./src/actions/action_types.js");
/* harmony import */ var _initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../initial_state */ "./src/reducers/initial_state.js");


var initialToken = _initial_state__WEBPACK_IMPORTED_MODULE_1__["default"].authentication.token;

var token = function token() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialToken;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNIN_USER_SUCCESS"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNUP_USER_SUCCESS"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["REFRESH_TOKEN_SUCCESS"]:
      return action.payload.token;

    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["SIGNOUT_USER_SUCCESS"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["REFRESH_TOKEN_ERROR"]:
      return initialToken;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (token);

/***/ }),

/***/ "./src/reducers/authentication_reducer.js":
/*!************************************************!*\
  !*** ./src/reducers/authentication_reducer.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _authentication_current_user_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authentication/current_user_reducer */ "./src/reducers/authentication/current_user_reducer.js");
/* harmony import */ var _authentication_is_authenticated_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./authentication/is_authenticated_reducer */ "./src/reducers/authentication/is_authenticated_reducer.js");
/* harmony import */ var _authentication_token_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./authentication/token_reducer */ "./src/reducers/authentication/token_reducer.js");
/* harmony import */ var _authentication_signin_error_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./authentication/signin_error_reducer */ "./src/reducers/authentication/signin_error_reducer.js");
/* harmony import */ var _authentication_signup_error_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./authentication/signup_error_reducer */ "./src/reducers/authentication/signup_error_reducer.js");






var authentication = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  currentUser: _authentication_current_user_reducer__WEBPACK_IMPORTED_MODULE_1__["default"],
  isAuthenticated: _authentication_is_authenticated_reducer__WEBPACK_IMPORTED_MODULE_2__["default"],
  token: _authentication_token_reducer__WEBPACK_IMPORTED_MODULE_3__["default"],
  signinError: _authentication_signin_error_reducer__WEBPACK_IMPORTED_MODULE_4__["default"],
  signupError: _authentication_signup_error_reducer__WEBPACK_IMPORTED_MODULE_5__["default"]
});
/* harmony default export */ __webpack_exports__["default"] = (authentication);

/***/ }),

/***/ "./src/reducers/channels/connection_errors_reducer.js":
/*!************************************************************!*\
  !*** ./src/reducers/channels/connection_errors_reducer.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/action_types */ "./src/actions/action_types.js");
/* harmony import */ var _initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../initial_state */ "./src/reducers/initial_state.js");


var initialErrors = _initial_state__WEBPACK_IMPORTED_MODULE_1__["default"].channels.connectionErrors;

var connectionErrors = function connectionErrors() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialErrors;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var copy = {};

  switch (action.type) {
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_ERROR"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CONNECT_CHANNEL_ERROR"]:
      copy = Object.assign({}, state);
      copy[action.payload.topic] = action.payload.error;
      return copy;

    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_CONNECTED"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_DISCONNECTED"]:
      copy = Object.assign({}, state);
      delete copy[action.payload.topic];
      return copy;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (connectionErrors);

/***/ }),

/***/ "./src/reducers/channels/connections_reducer.js":
/*!******************************************************!*\
  !*** ./src/reducers/channels/connections_reducer.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/action_types */ "./src/actions/action_types.js");
/* harmony import */ var _initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../initial_state */ "./src/reducers/initial_state.js");


var initialConnections = _initial_state__WEBPACK_IMPORTED_MODULE_1__["default"].channels.connections;

var connections = function connections() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialConnections;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var copy = {};

  switch (action.type) {
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_CONNECTED"]:
      copy = Object.assign({}, state);
      copy[action.payload.topic] = true;
      return copy;

    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_CLOSED"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CONNECT_CHANNEL_ERROR"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_DISCONNECTED"]:
      copy = Object.assign({}, state);
      delete copy[action.payload.topic];
      return copy;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (connections);

/***/ }),

/***/ "./src/reducers/channels_reducer.js":
/*!******************************************!*\
  !*** ./src/reducers/channels_reducer.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _channels_connections_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./channels/connections_reducer */ "./src/reducers/channels/connections_reducer.js");
/* harmony import */ var _channels_connection_errors_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./channels/connection_errors_reducer */ "./src/reducers/channels/connection_errors_reducer.js");



var channels = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  connections: _channels_connections_reducer__WEBPACK_IMPORTED_MODULE_1__["default"],
  connectionErrors: _channels_connection_errors_reducer__WEBPACK_IMPORTED_MODULE_2__["default"]
});
/* harmony default export */ __webpack_exports__["default"] = (channels);

/***/ }),

/***/ "./src/reducers/index.js":
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _application_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./application_reducer */ "./src/reducers/application_reducer.js");
/* harmony import */ var _authentication_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./authentication_reducer */ "./src/reducers/authentication_reducer.js");
/* harmony import */ var _channels_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./channels_reducer */ "./src/reducers/channels_reducer.js");
/* harmony import */ var _presences_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./presences_reducer */ "./src/reducers/presences_reducer.js");





var reduxApp = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  application: _application_reducer__WEBPACK_IMPORTED_MODULE_1__["default"],
  authentication: _authentication_reducer__WEBPACK_IMPORTED_MODULE_2__["default"],
  channels: _channels_reducer__WEBPACK_IMPORTED_MODULE_3__["default"],
  presences: _presences_reducer__WEBPACK_IMPORTED_MODULE_4__["default"]
});
/* harmony default export */ __webpack_exports__["default"] = (reduxApp);

/***/ }),

/***/ "./src/reducers/initial_state.js":
/*!***************************************!*\
  !*** ./src/reducers/initial_state.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// This file contains default application state
var initialState = {
  application: {
    bootupTime: null,
    isFetching: false,
    socketStatus: 'disconnected'
  },
  authentication: {
    isAuthenticated: false,
    currentUser: null,
    token: null,
    signinError: null,
    signupError: null
  },
  channels: {
    connections: {},
    connectionErrors: {}
  },
  presences: {}
};
/* harmony default export */ __webpack_exports__["default"] = (initialState);

/***/ }),

/***/ "./src/reducers/presences_reducer.js":
/*!*******************************************!*\
  !*** ./src/reducers/presences_reducer.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/action_types */ "./src/actions/action_types.js");
/* harmony import */ var _initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initial_state */ "./src/reducers/initial_state.js");



var presences = function presences() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initial_state__WEBPACK_IMPORTED_MODULE_1__["default"].presences;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var copy = {};

  switch (action.type) {
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["DISPATCH_PRESENCE_STATE"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["DISPATCH_PRESENCE_DIFF"]:
      // Presences object is of form {topic: topic, presences: presences}
      copy = Object.assign({}, state);
      copy[action.payload.topic] = action.payload.presences;
      return copy;

    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_CLOSED"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CONNECT_CHANNEL_ERROR"]:
    case _actions_action_types__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_DISCONNECTED"]:
      copy = Object.assign({}, state);
      delete copy[action.payload.topic];
      return copy;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (presences);

/***/ }),

/***/ "./src/schemas/signin_schema.js":
/*!**************************************!*\
  !*** ./src/schemas/signin_schema.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var schema = {
  name: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Name'
    },
    value: null,
    valid: false,
    validationRules: {
      notEmpty: true
    },
    touched: false
  },
  password: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Password'
    },
    value: null,
    valid: false,
    validationRules: {
      minLength: 6
    },
    touched: false
  }
};
/* harmony default export */ __webpack_exports__["default"] = (schema);

/***/ }),

/***/ "./src/schemas/signup_schema.js":
/*!**************************************!*\
  !*** ./src/schemas/signup_schema.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var schema = {
  name: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Name'
    },
    value: null,
    valid: false,
    validationRules: {
      notEmpty: true
    },
    touched: false
  },
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Email'
    },
    value: null,
    valid: false,
    validationRules: {
      isEmail: true
    },
    touched: false
  },
  password: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Password'
    },
    value: null,
    valid: false,
    validationRules: {
      minLength: 6
    },
    touched: false
  }
};
/* harmony default export */ __webpack_exports__["default"] = (schema);

/***/ }),

/***/ "./src/services/api.js":
/*!*****************************!*\
  !*** ./src/services/api.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/auth_service */ "./src/services/auth_service.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/config */ "./src/config/config.js");




var authHeaders = function authHeaders() {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: "Bearer ".concat(_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["default"].loadToken())
    },
    credentials: 'same-origin'
  };
};

var Api = {
  signin: function signin(params) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(_config_config__WEBPACK_IMPORTED_MODULE_2__["ROOT_URL"], "/authentication"), {
      session: params
    });
  },
  signup: function signup(params) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("".concat(_config_config__WEBPACK_IMPORTED_MODULE_2__["ROOT_URL"], "/registrations"), {
      user: params
    });
  },
  refreshToken: function refreshToken(token) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.patch("".concat(_config_config__WEBPACK_IMPORTED_MODULE_2__["ROOT_URL"], "/authentication/refresh"), {
      session: {
        token: token
      }
    }, authHeaders());
  },
  signout: function signout() {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete("".concat(_config_config__WEBPACK_IMPORTED_MODULE_2__["ROOT_URL"], "/authentication"), authHeaders());
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Api);

/***/ }),

/***/ "./src/services/auth_service.js":
/*!**************************************!*\
  !*** ./src/services/auth_service.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// It is not possible to decode Phoenix.Token on the client side!
// https://elixirforum.com/t/how-to-decode-phoenix-token-client-side/9680
var AuthService = function AuthService() {
  var _this = this;

  _classCallCheck(this, AuthService);

  _defineProperty(this, "loadToken", function () {
    return localStorage.getItem('react@phoenixAuthToken');
  });

  _defineProperty(this, "saveToken", function (token) {
    return localStorage.setItem('react@phoenixAuthToken', token);
  });

  _defineProperty(this, "removeToken", function () {
    return localStorage.removeItem('react@phoenixAuthToken');
  });

  _defineProperty(this, "refreshToken", function () {
    return _this.saveToken(_this.loadToken());
  });

  _defineProperty(this, "isLoggedIn", function () {
    return !!_this.loadToken();
  });
};

/* harmony default export */ __webpack_exports__["default"] = (new AuthService());

/***/ }),

/***/ "./src/utils/formatter.js":
/*!********************************!*\
  !*** ./src/utils/formatter.js ***!
  \********************************/
/*! exports provided: formatTimestamp, truncate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatTimestamp", function() { return formatTimestamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "truncate", function() { return truncate; });
var MAX_TRUNCATE = 30;
var formatTimestamp = function formatTimestamp(timestamp) {
  var date = new Date(timestamp);
  var dateString = date.toLocaleTimeString();
  return dateString.split(':').slice(0, 2).join(':');
};
var truncate = function truncate(text) {
  if (!text) return;
  if (text.length <= MAX_TRUNCATE) return text;
  return "".concat(text.substring(0, MAX_TRUNCATE - 4), " ...");
};

/***/ }),

/***/ "./src/utils/validation.js":
/*!*********************************!*\
  !*** ./src/utils/validation.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// https://www.w3resource.com/javascript/form/phone-no-validation.php
var phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

var phoneNumberValidator = function phoneNumberValidator(val) {
  return phoneNumberRegex.test(val);
}; // eslint-disable-next-line no-useless-escape


var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var emailValidator = function emailValidator(val) {
  return emailRegex.test(val);
};

var minLengthValidator = function minLengthValidator(val, minLength) {
  return val.length >= minLength;
};

var maxLengthValidator = function maxLengthValidator(val, maxLength) {
  return val.length <= maxLength;
};

var isLengthValidator = function isLengthValidator(val, valLength) {
  return val.length === valLength;
};

var notEmptyValidator = function notEmptyValidator(val) {
  return val.trim() !== '';
};
/* eslint-disable no-restricted-syntax */


var validation = function validation(val, rules) {
  var isValid = true; // error The body of a for-in should be wrapped in an if statement
  // to filter unwanted properties from the prototype

  for (var rule in rules) {
    if ({}.hasOwnProperty.call(rules, rule)) {
      switch (rule) {
        case 'isPhoneNumber':
          isValid = isValid && phoneNumberValidator(val);
          break;

        case 'isEmail':
          isValid = isValid && emailValidator(val);
          break;

        case 'minLength':
          isValid = isValid && minLengthValidator(val, rules[rule]);
          break;

        case 'maxLength':
          isValid = isValid && maxLengthValidator(val, rules[rule]);
          break;

        case 'isLength':
          isValid = isValid && isLengthValidator(val, rules[rule]);
          break;

        case 'notEmpty':
          isValid = isValid && notEmptyValidator(val);
          break;

        default:
          isValid = true;
      }
    }
  }

  return isValid;
};
/* eslint-enable no-restricted-syntax */


/* harmony default export */ __webpack_exports__["default"] = (validation);

/***/ }),

/***/ "./src/views/app_view.js":
/*!*******************************!*\
  !*** ./src/views/app_view.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_application_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions/application_actions */ "./src/actions/application_actions.js");
/* harmony import */ var _actions_authentication_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions/authentication_actions */ "./src/actions/authentication_actions.js");
/* harmony import */ var _actions_channel_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../actions/channel_actions */ "./src/actions/channel_actions.js");
/* harmony import */ var _utils_formatter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/formatter */ "./src/utils/formatter.js");
/* harmony import */ var _components_loading_dots__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/loading_dots */ "./src/components/loading_dots.js");
/* harmony import */ var _components_properties__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/properties */ "./src/components/properties.js");
/* harmony import */ var _components_signin_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/signin_form */ "./src/components/signin_form.js");
/* harmony import */ var _components_signup_form__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/signup_form */ "./src/components/signup_form.js");
/* harmony import */ var _components_presences_presence_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/presences/presence_list */ "./src/components/presences/presence_list.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














var propTypes = {
  appBootup: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  signinUser: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  clearSigninError: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  signupUser: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  clearSignupError: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  signoutUser: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  joinChannel: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  leaveChannel: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  //
  application: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  authentication: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  channels: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  presences: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(App)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      signMode: 'Sign In'
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_toggleSignMode", function () {
      var signMode = _this.state.signMode;
      var newSignMode = signMode === 'Sign In' ? 'Sign Up' : 'Sign In';

      _this.setState({
        signMode: newSignMode
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_signoutUser", function () {
      var _this$props = _this.props,
          authentication = _this$props.authentication,
          signoutUser = _this$props.signoutUser;
      var currentUser = authentication.currentUser;
      signoutUser(currentUser.id);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_isChannelConnected", function (topic) {
      var channels = _this.props.channels;
      var connections = channels.connections;
      return connections.hasOwnProperty(topic);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderPresences", function () {
      var presences = _this.props.presences;
      var presenceKeys = Object.keys(presences);

      if (!presences || presenceKeys.length < 1) {
        return;
      }

      ;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Presences"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, presenceKeys.map(function (key) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: "presences:".concat(key)
        }, key, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_presences_presence_list__WEBPACK_IMPORTED_MODULE_12__["default"], {
          presences: presences[key]
        }));
      })));
    });

    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Application is starting...
      this.props.appBootup(Date.now());
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          application = _this$props2.application,
          authentication = _this$props2.authentication,
          channels = _this$props2.channels,
          signinError = _this$props2.signinError,
          signupError = _this$props2.signupError,
          signinUser = _this$props2.signinUser,
          clearSigninError = _this$props2.clearSigninError,
          signupUser = _this$props2.signupUser,
          clearSignupError = _this$props2.clearSignupError,
          joinChannel = _this$props2.joinChannel,
          leaveChannel = _this$props2.leaveChannel;
      var isFetching = application.isFetching;
      var isAuthenticated = authentication.isAuthenticated;
      var signMode = this.state.signMode; // Sanitize properties for display

      var displayApplication = Object.assign({}, application, {
        bootupTime: Object(_utils_formatter__WEBPACK_IMPORTED_MODULE_7__["formatTimestamp"])(application.bootupTime)
      });
      var displayProperties = Object.assign({}, authentication, {
        token: Object(_utils_formatter__WEBPACK_IMPORTED_MODULE_7__["truncate"])(authentication.token)
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Phoenix Client w/ React"), isFetching && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_loading_dots__WEBPACK_IMPORTED_MODULE_8__["default"], {
        interval: 100,
        dots: 20
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-wrapper"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "flex-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "large panel"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "flex-container column"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Application"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_properties__WEBPACK_IMPORTED_MODULE_9__["default"], {
        object: displayApplication
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Authentication"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_properties__WEBPACK_IMPORTED_MODULE_9__["default"], {
        object: displayProperties
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Channels"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_properties__WEBPACK_IMPORTED_MODULE_9__["default"], {
        object: channels.connections
      })), this._renderPresences())), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel"
      }, !isAuthenticated && signMode === 'Sign In' && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_signin_form__WEBPACK_IMPORTED_MODULE_10__["default"], {
        signinUser: signinUser,
        clearSigninError: clearSigninError,
        errorMessage: signinError
      }), !isAuthenticated && signMode === 'Sign Up' && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_signup_form__WEBPACK_IMPORTED_MODULE_11__["default"], {
        signupUser: signupUser,
        clearSignupError: clearSignupError,
        errorMessage: signupError
      }), !isAuthenticated && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "button",
        onClick: this._toggleSignMode
      }, "Toggle sign mode"), isAuthenticated && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "button",
        onClick: this._signoutUser
      }, "Sign out"), isAuthenticated && (this._isChannelConnected('lobby') ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "button",
        onClick: leaveChannel.bind(null, 'lobby')
      }, "Leave Lobby") : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "button",
        onClick: joinChannel.bind(null, 'lobby')
      }, "Join Lobby"))))));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

_defineProperty(App, "propTypes", propTypes);

;

var mapStateToProps = function mapStateToProps(_ref) {
  var application = _ref.application,
      authentication = _ref.authentication,
      channels = _ref.channels,
      presences = _ref.presences;
  return {
    application: application,
    authentication: authentication,
    channels: channels,
    presences: presences
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])({
    appBootup: _actions_application_actions__WEBPACK_IMPORTED_MODULE_4__["appBootup"],
    signinUser: _actions_authentication_actions__WEBPACK_IMPORTED_MODULE_5__["signinUser"],
    clearSigninError: _actions_authentication_actions__WEBPACK_IMPORTED_MODULE_5__["clearSigninError"],
    signupUser: _actions_authentication_actions__WEBPACK_IMPORTED_MODULE_5__["signupUser"],
    clearSignupError: _actions_authentication_actions__WEBPACK_IMPORTED_MODULE_5__["clearSignupError"],
    signoutUser: _actions_authentication_actions__WEBPACK_IMPORTED_MODULE_5__["signoutUser"],
    joinChannel: _actions_channel_actions__WEBPACK_IMPORTED_MODULE_6__["joinChannel"],
    leaveChannel: _actions_channel_actions__WEBPACK_IMPORTED_MODULE_6__["leaveChannel"]
  }, dispatch);
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(App));

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZhcmlhbnQvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9waG9lbml4L3ByaXYvc3RhdGljL3Bob2VuaXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4LWRldnRvb2xzLWV4dGVuc2lvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVkdXgtbG9nZ2VyL2Rpc3QvcmVkdXgtbG9nZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvcmVkdXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NjaGVkdWxlci9janMvc2NoZWR1bGVyLXRyYWNpbmcuZGV2ZWxvcG1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NjaGVkdWxlci9janMvc2NoZWR1bGVyLmRldmVsb3BtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zY2hlZHVsZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NjaGVkdWxlci90cmFjaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvcG9ueWZpbGwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvYWN0aW9uX3R5cGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9hY3Rpb25zL2FwcGxpY2F0aW9uX2FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvYXV0aGVudGljYXRpb25fYWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy9jaGFubmVsX2FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5jc3M/YWFhNyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hbGVydF9ib3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbG9hZGluZ19kb3RzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ByZXNlbmNlcy9wcmVzZW5jZV9pdGVtLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3ByZXNlbmNlcy9wcmVzZW5jZV9saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3Byb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2lnbmluX2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2lnbnVwX2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZ3VyZV9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pZGRsZXdhcmVzL3NldF9nYW1lX2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pZGRsZXdhcmVzL3NldF9sb2JieV9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9taWRkbGV3YXJlcy9zZXRfc29ja2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9taWRkbGV3YXJlcy9zZXRfc3lzdGVtX2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pZGRsZXdhcmVzL3NldF91c2VyX2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pZGRsZXdhcmVzL3NvY2tldF9taWRkbGV3YXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1Y2Vycy9hcHBsaWNhdGlvbi9ib290dXBfdGltZV9yZWR1Y2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1Y2Vycy9hcHBsaWNhdGlvbi9pc19mZXRjaGluZ19yZWR1Y2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1Y2Vycy9hcHBsaWNhdGlvbi9zb2NrZXRfc3RhdHVzX3JlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHVjZXJzL2FwcGxpY2F0aW9uX3JlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHVjZXJzL2F1dGhlbnRpY2F0aW9uL2N1cnJlbnRfdXNlcl9yZWR1Y2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1Y2Vycy9hdXRoZW50aWNhdGlvbi9pc19hdXRoZW50aWNhdGVkX3JlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHVjZXJzL2F1dGhlbnRpY2F0aW9uL3NpZ25pbl9lcnJvcl9yZWR1Y2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1Y2Vycy9hdXRoZW50aWNhdGlvbi9zaWdudXBfZXJyb3JfcmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdWNlcnMvYXV0aGVudGljYXRpb24vdG9rZW5fcmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdWNlcnMvYXV0aGVudGljYXRpb25fcmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdWNlcnMvY2hhbm5lbHMvY29ubmVjdGlvbl9lcnJvcnNfcmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdWNlcnMvY2hhbm5lbHMvY29ubmVjdGlvbnNfcmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdWNlcnMvY2hhbm5lbHNfcmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHVjZXJzL2luaXRpYWxfc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHVjZXJzL3ByZXNlbmNlc19yZWR1Y2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWFzL3NpZ25pbl9zY2hlbWEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYXMvc2lnbnVwX3NjaGVtYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9hdXRoX3NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2Zvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvYXBwX3ZpZXcuanMiXSwibmFtZXMiOlsiQVBQX0JPT1RVUCIsIlNJR05JTl9VU0VSX1JFUVVFU1QiLCJTSUdOSU5fVVNFUl9TVUNDRVNTIiwiU0lHTklOX1VTRVJfRVJST1IiLCJDTEVBUl9TSUdOSU5fRVJST1IiLCJTSUdOVVBfVVNFUl9SRVFVRVNUIiwiU0lHTlVQX1VTRVJfU1VDQ0VTUyIsIlNJR05VUF9VU0VSX0VSUk9SIiwiQ0xFQVJfU0lHTlVQX0VSUk9SIiwiU0lHTk9VVF9VU0VSX1NVQ0NFU1MiLCJSRUZSRVNIX1RPS0VOX1JFUVVFU1QiLCJSRUZSRVNIX1RPS0VOX1NVQ0NFU1MiLCJSRUZSRVNIX1RPS0VOX0VSUk9SIiwiQVVUSEVOVElDQVRFX0ZST01fVE9LRU4iLCJESVNQQVRDSF9QUkVTRU5DRV9TVEFURSIsIkRJU1BBVENIX1BSRVNFTkNFX0RJRkYiLCJPUEVOX1NPQ0tFVCIsIkNMT1NFX1NPQ0tFVCIsIlNPQ0tFVF9DT05ORUNURUQiLCJTT0NLRVRfRElTQ09OTkVDVEVEIiwiU09DS0VUX0VSUk9SIiwiU09DS0VUX0NMT1NFRCIsIkpPSU5fQ0hBTk5FTCIsIkxFQVZFX0NIQU5ORUwiLCJDSEFOTkVMX0NPTk5FQ1RFRCIsIkNIQU5ORUxfRElTQ09OTkVDVEVEIiwiQ0hBTk5FTF9FUlJPUiIsIkNIQU5ORUxfQ0xPU0VEIiwiU0VORF9DT01NQU5EIiwiQ09OTkVDVF9DSEFOTkVMX0VSUk9SIiwiUkVRVUVTVFNfUkVDRUlWRUQiLCJSRVFVRVNUX0NSRUFURUQiLCJSRVFVRVNUX0NBTkNFTExFRCIsIlJFUVVFU1RfQUNDRVBURUQiLCJSRVFVRVNUX0NSRUFURURfRVJST1IiLCJSRVFVRVNUX0NBTkNFTExFRF9FUlJPUiIsIlJFUVVFU1RfQUNDRVBURURfRVJST1IiLCJHQU1FU19SRUNFSVZFRCIsIkdBTUVfQURERUQiLCJHQU1FX1JFTU9WRUQiLCJHQU1FX0ZPUkNFX1FVSVQiLCJKT0lOX0dBTUUiLCJVUERBVEVfR0FNRV9JTkZPIiwiVVBEQVRFX0dBTUVfU1RBVEUiLCJQTEFZX01PVkVfRVJST1IiLCJQQVNTX0VSUk9SIiwiUkVTSUdOX0VSUk9SIiwiTUVTU0FHRV9DUkVBVEVEIiwiTUVTU0FHRVNfUkVDRUlWRUQiLCJNRVNTQUdFX0NSRUFURURfRVJST1IiLCJNRVNTQUdFU19SRUNFSVZFRF9FUlJPUiIsImFwcEJvb3R1cCIsImJvb3R1cFRpbWUiLCJ0eXBlIiwidHlwZXMiLCJwYXlsb2FkIiwiY2xlYXJTaWduaW5FcnJvciIsImNsZWFyU2lnbnVwRXJyb3IiLCJlcnJvclBheWxvYWQiLCJlcnJvciIsInJlc3BvbnNlIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0b1N0cmluZyIsImpvaW5EaXNwYXRjaCIsImRpc3BhdGNoIiwidXNlcklkIiwidG9waWMiLCJsZWF2ZURpc3BhdGNoIiwic2lnbmluVXNlciIsIm5hbWUiLCJwYXNzd29yZCIsIkFwaSIsInNpZ25pbiIsInRoZW4iLCJ0b2tlbiIsInVzZXIiLCJBdXRoU2VydmljZSIsInNhdmVUb2tlbiIsImlkIiwiY2F0Y2giLCJzaWdudXBVc2VyIiwiZW1haWwiLCJzaWdudXAiLCJzaWdub3V0VXNlciIsInNpZ25vdXQiLCJyZW1vdmVUb2tlbiIsImNvbnNvbGUiLCJsb2ciLCJhdXRoZW50aWNhdGVGcm9tVG9rZW4iLCJyZWZyZXNoVG9rZW4iLCJqb2luQ2hhbm5lbCIsImxlYXZlQ2hhbm5lbCIsIkFsZXJ0Qm94IiwibW9kZSIsIm1lc3NhZ2UiLCJvbkNsb3NlIiwiZGVmYXVsdFByb3BzIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJCdXR0b24iLCJjaGlsZHJlbiIsIm9uQ2xpY2siLCJvdGhlclByb3BzIiwib25lT2ZUeXBlIiwib2JqZWN0IiwiaW5pdGlhbFN0YXRlIiwiYnV0dG9uTGFiZWwiLCJkaXNhYmxlZCIsInNjaGVtYSIsImJvb2wiLCJGb3JtIiwicHJvcHMiLCJvYmoiLCJPYmplY3QiLCJhc3NpZ24iLCJrZXlzIiwiZmlsdGVyIiwia2V5IiwiZm9yRWFjaCIsInZhbHVlIiwidmFsaWQiLCJ2YWxpZGF0ZSIsInZhbGlkYXRpb25SdWxlcyIsInRvdWNoZWQiLCJmaWVsZE5hbWVzIiwic3RhdGUiLCJlbGVtZW50VHlwZSIsImVsZW1lbnRDb25maWciLCJsYXN0S2V5IiwibGVuZ3RoIiwibmV4dEtleSIsImluZGV4T2YiLCJvbktleVByZXNzIiwiZSIsIl9mb2N1c1RleHRJbnB1dCIsImlucHV0cyIsIl92YWxpZGF0ZSIsIl9oYW5kbGVDbGljayIsImMiLCJfaGFuZGxlT25DaGFuZ2UiLCJub2RlIiwiZm9jdXMiLCJ0YXJnZXQiLCJzZXRTdGF0ZSIsInByZXZTdGF0ZSIsIm1hcCIsImV2ZXJ5IiwidiIsInJlZHVjZSIsImFjYyIsInByZXZlbnREZWZhdWx0IiwiX2xvYWREYXRhIiwiX2xvYWRTdGF0ZUZyb21Qcm9wcyIsIl9yZW5kZXJGaWVsZCIsIkNvbXBvbmVudCIsIklucHV0IiwiaW5wdXRUeXBlIiwibGFiZWwiLCJyZWZmdW5jIiwibm9XcmFwcGVyIiwiaW5wdXRFbGVtZW50IiwiaW5wdXRDbGFzc2VzIiwicHVzaCIsIm9wdGlvbnMiLCJzZWxlY3RQcm9wcyIsImpvaW4iLCJvcHRpb24iLCJzZWxlY3RlZCIsImRpc3BsYXlWYWx1ZSIsImludGVydmFsIiwibnVtYmVyIiwiZG90cyIsIkxvYWRpbmdEb3RzIiwiZnJhbWUiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJ0ZXh0IiwicmVwZWF0IiwiUHJlc2VuY2VJdGVtIiwicHJlc2VuY2UiLCJ1c2VybmFtZSIsIm9ubGluZV9hdCIsImNvdW50IiwiZm9ybWF0VGltZXN0YW1wIiwiUHJlc2VuY2VMaXN0IiwicHJlc2VuY2VzIiwicGh4X3JlZiIsIlByb3BlcnRpZXMiLCJyZWN1cnNpdmUiLCJleGNsdWRlIiwiY29sbGVjdG9yIiwiZm9ybWF0VmFsdWUiLCJpbmNsdWRlcyIsImNsYXNzTmFtZSIsImFycmF5IiwiZXJyb3JNZXNzYWdlIiwiU2lnbmluRm9ybSIsIlNpZ251cEZvcm0iLCJST09UX1VSTCIsIlJPT1RfU09DS0VUIiwiX19ERVZfXyIsInByb2Nlc3MiLCJjb25maWd1cmVTdG9yZSIsIm1pZGRsZXdhcmVzIiwicmVkdXhUaHVuayIsInNvY2tldE1pZGRsZXdhcmUiLCJjcmVhdGVMb2dnZXIiLCJjb2xsYXBzZWQiLCJkaWZmIiwic3RvcmUiLCJjcmVhdGVTdG9yZSIsInJlZHV4QXBwIiwiY29tcG9zZVdpdGhEZXZUb29scyIsImFwcGx5TWlkZGxld2FyZSIsImlzTG9nZ2VkSW4iLCJhcHAiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyIiwic2V0R2FtZUNoYW5uZWwiLCJzb2NrZXQiLCJjaGFubmVsIiwibGlzdEJ5IiwibWV0YXMiLCJmaXJzdCIsInJlc3QiLCJQcmVzZW5jZSIsImxpc3QiLCJvbiIsInN5bmNTdGF0ZSIsInN5bmNEaWZmIiwicmVjZWl2ZSIsIm9uRXJyb3IiLCJzZXRMb2JieUNoYW5uZWwiLCJzb2NrZXRPcHRpb25zIiwicGFyYW1zIiwibG9nZ2VyIiwia2luZCIsIm1zZyIsInNldFNvY2tldCIsImxvYWRUb2tlbiIsIlNvY2tldCIsImNvbm5lY3QiLCJjbG9zZVNvY2tldCIsImRpc2Nvbm5lY3QiLCJlcnIiLCJzZXRTeXN0ZW1DaGFubmVsIiwic2V0VXNlckNoYW5uZWwiLCJjaGFubmVscyIsIm5leHQiLCJhY3Rpb24iLCJ0b3BpY1ByZWZpeCIsInNwbGl0IiwibGVhdmUiLCJjb21tYW5kIiwiYXBwbGljYXRpb24iLCJpc0ZldGNoaW5nIiwibWF0Y2giLCJpbml0aWFsU3RhdHVzIiwic29ja2V0U3RhdHVzIiwiY29tYmluZVJlZHVjZXJzIiwiaW5pdGlhbFVzZXIiLCJhdXRoZW50aWNhdGlvbiIsImN1cnJlbnRVc2VyIiwiaW5pdGlhbElzQXV0aGVudGljYXRlZCIsImlzQXV0aGVudGljYXRlZCIsImluaXRpYWxFcnJvciIsInNpZ25pbkVycm9yIiwic2lnbnVwRXJyb3IiLCJTaWdudXBFcnJvciIsImluaXRpYWxUb2tlbiIsImluaXRpYWxFcnJvcnMiLCJjb25uZWN0aW9uRXJyb3JzIiwiY29weSIsImluaXRpYWxDb25uZWN0aW9ucyIsImNvbm5lY3Rpb25zIiwicGxhY2Vob2xkZXIiLCJub3RFbXB0eSIsIm1pbkxlbmd0aCIsImlzRW1haWwiLCJhdXRoSGVhZGVycyIsImhlYWRlcnMiLCJBY2NlcHQiLCJBdXRob3JpemF0aW9uIiwiY3JlZGVudGlhbHMiLCJheGlvcyIsInBvc3QiLCJzZXNzaW9uIiwicGF0Y2giLCJkZWxldGUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJNQVhfVFJVTkNBVEUiLCJ0aW1lc3RhbXAiLCJkYXRlIiwiRGF0ZSIsImRhdGVTdHJpbmciLCJ0b0xvY2FsZVRpbWVTdHJpbmciLCJzbGljZSIsInRydW5jYXRlIiwic3Vic3RyaW5nIiwicGhvbmVOdW1iZXJSZWdleCIsInBob25lTnVtYmVyVmFsaWRhdG9yIiwidmFsIiwidGVzdCIsImVtYWlsUmVnZXgiLCJlbWFpbFZhbGlkYXRvciIsIm1pbkxlbmd0aFZhbGlkYXRvciIsIm1heExlbmd0aFZhbGlkYXRvciIsIm1heExlbmd0aCIsImlzTGVuZ3RoVmFsaWRhdG9yIiwidmFsTGVuZ3RoIiwibm90RW1wdHlWYWxpZGF0b3IiLCJ0cmltIiwidmFsaWRhdGlvbiIsInJ1bGVzIiwiaXNWYWxpZCIsInJ1bGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJBcHAiLCJzaWduTW9kZSIsIm5ld1NpZ25Nb2RlIiwicHJlc2VuY2VLZXlzIiwibm93IiwiZGlzcGxheUFwcGxpY2F0aW9uIiwiZGlzcGxheVByb3BlcnRpZXMiLCJfcmVuZGVyUHJlc2VuY2VzIiwiX3RvZ2dsZVNpZ25Nb2RlIiwiX3NpZ25vdXRVc2VyIiwiX2lzQ2hhbm5lbENvbm5lY3RlZCIsImJpbmQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJiaW5kQWN0aW9uQ3JlYXRvcnMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBLDBCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUFrQiw4QkFBOEI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxaUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLElBQXFDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBLGtEQUFrRDs7O0FBR2xEOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUdBOzs7QUFHQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQ3RhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOzs7O0FBSWIsSUFBSSxJQUFxQztBQUN6QztBQUNBOztBQUVBLDhDQUE4QyxjQUFjOztBQUU1RDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBLGtEQUFrRDs7O0FBR2xEOzs7QUFHQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7O0FDOXJCYTs7QUFFYixJQUFJLEtBQXFDLEVBQUUsRUFFMUM7QUFDRCxtQkFBbUIsbUJBQU8sQ0FBQyw2RkFBZ0M7QUFDM0Q7Ozs7Ozs7Ozs7Ozs7QUNOYTs7QUFFYixJQUFJLEtBQXFDLEVBQUUsRUFFMUM7QUFDRCxtQkFBbUIsbUJBQU8sQ0FBQyw2R0FBd0M7QUFDbkU7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUFBO0FBQUE7QUFDcUM7O0FBRXJDOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDLFVBQVUsSUFBNkI7QUFDeEM7QUFDQSxDQUFDLE1BQU0sRUFFTjs7QUFFRCxhQUFhLDREQUFRO0FBQ04scUVBQU0sRUFBQzs7Ozs7Ozs7Ozs7Ozs7QUNsQnRCO0FBQUE7QUFBZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ08sSUFBTUEsVUFBVSxHQUFHLFlBQW5CLEMsQ0FFUDs7QUFDTyxJQUFNQyxtQkFBbUIsR0FBRyxxQkFBNUI7QUFDQSxJQUFNQyxtQkFBbUIsR0FBRyxxQkFBNUI7QUFDQSxJQUFNQyxpQkFBaUIsR0FBSyxtQkFBNUI7QUFFQSxJQUFNQyxrQkFBa0IsR0FBSSxvQkFBNUI7QUFFQSxJQUFNQyxtQkFBbUIsR0FBRyxxQkFBNUI7QUFDQSxJQUFNQyxtQkFBbUIsR0FBRyxxQkFBNUI7QUFDQSxJQUFNQyxpQkFBaUIsR0FBSyxtQkFBNUI7QUFFQSxJQUFNQyxrQkFBa0IsR0FBSSxvQkFBNUI7QUFFQSxJQUFNQyxvQkFBb0IsR0FBRyxzQkFBN0I7QUFFQSxJQUFNQyxxQkFBcUIsR0FBRyx1QkFBOUI7QUFDQSxJQUFNQyxxQkFBcUIsR0FBRyx1QkFBOUI7QUFDQSxJQUFNQyxtQkFBbUIsR0FBSyxxQkFBOUI7QUFFQSxJQUFNQyx1QkFBdUIsR0FBRyx5QkFBaEMsQyxDQUVQOztBQUNPLElBQU1DLHVCQUF1QixHQUFHLHlCQUFoQztBQUNBLElBQU1DLHNCQUFzQixHQUFJLHdCQUFoQyxDLENBRVA7O0FBQ08sSUFBTUMsV0FBVyxHQUFXLGFBQTVCO0FBQ0EsSUFBTUMsWUFBWSxHQUFVLGNBQTVCO0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQU0sa0JBQTVCO0FBQ0EsSUFBTUMsbUJBQW1CLEdBQUcscUJBQTVCO0FBQ0EsSUFBTUMsWUFBWSxHQUFVLGNBQTVCO0FBQ0EsSUFBTUMsYUFBYSxHQUFTLGVBQTVCLEMsQ0FFUDs7QUFDTyxJQUFNQyxZQUFZLEdBQVksY0FBOUI7QUFDQSxJQUFNQyxhQUFhLEdBQVcsZUFBOUI7QUFDQSxJQUFNQyxpQkFBaUIsR0FBTyxtQkFBOUI7QUFDQSxJQUFNQyxvQkFBb0IsR0FBSSxzQkFBOUI7QUFDQSxJQUFNQyxhQUFhLEdBQVcsZUFBOUI7QUFDQSxJQUFNQyxjQUFjLEdBQVUsZ0JBQTlCO0FBQ0EsSUFBTUMsWUFBWSxHQUFZLGNBQTlCO0FBQ0EsSUFBTUMscUJBQXFCLEdBQUcsdUJBQTlCLEMsQ0FFUDs7QUFDTyxJQUFNQyxpQkFBaUIsR0FBRyxtQkFBMUI7QUFDQSxJQUFNQyxlQUFlLEdBQUssaUJBQTFCO0FBQ0EsSUFBTUMsaUJBQWlCLEdBQUcsbUJBQTFCO0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUksa0JBQTFCO0FBRUEsSUFBTUMscUJBQXFCLEdBQUssdUJBQWhDO0FBQ0EsSUFBTUMsdUJBQXVCLEdBQUcseUJBQWhDO0FBQ0EsSUFBTUMsc0JBQXNCLEdBQUksd0JBQWhDLEMsQ0FFUDs7QUFDTyxJQUFNQyxjQUFjLEdBQUssZ0JBQXpCO0FBQ0EsSUFBTUMsVUFBVSxHQUFTLFlBQXpCO0FBQ0EsSUFBTUMsWUFBWSxHQUFPLGNBQXpCO0FBQ0EsSUFBTUMsZUFBZSxHQUFJLGlCQUF6QjtBQUNBLElBQU1DLFNBQVMsR0FBVSxXQUF6QjtBQUNBLElBQU1DLGdCQUFnQixHQUFHLGtCQUF6QixDLENBRVA7O0FBQ08sSUFBTUMsaUJBQWlCLEdBQUcsbUJBQTFCO0FBQ0EsSUFBTUMsZUFBZSxHQUFLLGlCQUExQjtBQUNBLElBQU1DLFVBQVUsR0FBVSxZQUExQjtBQUNBLElBQU1DLFlBQVksR0FBUSxjQUExQixDLENBRVA7O0FBQ08sSUFBTUMsZUFBZSxHQUFXLGlCQUFoQztBQUNBLElBQU1DLGlCQUFpQixHQUFTLG1CQUFoQztBQUNBLElBQU1DLHFCQUFxQixHQUFLLHVCQUFoQztBQUNBLElBQU1DLHVCQUF1QixHQUFHLHlCQUFoQztBQUVQLG1DOzs7Ozs7Ozs7Ozs7QUM5RUE7QUFBQTtBQUFBO0NBRUE7O0FBQ08sSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQUMsVUFBVTtBQUFBLFNBQ2pDO0FBQUVDLFFBQUksRUFBRUMsd0RBQVI7QUFBMEJDLFdBQU8sRUFBRUg7QUFBbkMsR0FEaUM7QUFBQSxDQUE1QixDOzs7Ozs7Ozs7Ozs7QUNIUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRU8sSUFBTUksZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQjtBQUFBLFNBQU87QUFDckNILFFBQUksRUFBRUMsZ0VBQXdCbEQ7QUFETyxHQUFQO0FBQUEsQ0FBekI7QUFJQSxJQUFNcUQsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQjtBQUFBLFNBQU87QUFDckNKLFFBQUksRUFBRUMsZ0VBQXdCOUM7QUFETyxHQUFQO0FBQUEsQ0FBekIsQyxDQUlQOztBQUNBLElBQU1rRCxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFBQyxLQUFLO0FBQUEsU0FDeEJBLEtBQUssQ0FBQ0MsUUFBTixJQUFrQkQsS0FBSyxDQUFDQyxRQUFOLENBQWVDLElBQWpDLEdBQ0VDLElBQUksQ0FBQ0MsU0FBTCxDQUFlSixLQUFLLENBQUNDLFFBQU4sQ0FBZUMsSUFBOUIsQ0FERixHQUVFRixLQUFLLENBQUNLLFFBQU4sRUFIc0I7QUFBQSxDQUExQixDLENBTUE7OztBQUNBLElBQU1DLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUNDLFFBQUQsRUFBV0MsTUFBWCxFQUFzQjtBQUN6Q0QsVUFBUSxDQUFDO0FBQUViLFFBQUksRUFBRUMseURBQWlCdEM7QUFBekIsR0FBRCxDQUFSO0FBQ0FrRCxVQUFRLENBQUM7QUFBRWIsUUFBSSxFQUFFQywwREFBUjtBQUE0QmMsU0FBSyxFQUFFO0FBQW5DLEdBQUQsQ0FBUjtBQUNBRixVQUFRLENBQUM7QUFBRWIsUUFBSSxFQUFFQywwREFBUjtBQUE0QmMsU0FBSyxpQkFBVUQsTUFBVjtBQUFqQyxHQUFELENBQVI7QUFDRCxDQUpELEMsQ0FNQTs7O0FBQ0EsSUFBTUUsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDSCxRQUFELEVBQVdDLE1BQVgsRUFBc0I7QUFDMUNELFVBQVEsQ0FBQztBQUFFYixRQUFJLEVBQUVDLDJEQUFSO0FBQTZCYyxTQUFLLGlCQUFVRCxNQUFWO0FBQWxDLEdBQUQsQ0FBUjtBQUNBRCxVQUFRLENBQUM7QUFBRWIsUUFBSSxFQUFFQywyREFBUjtBQUE2QmMsU0FBSyxFQUFFO0FBQXBDLEdBQUQsQ0FBUjtBQUNBRixVQUFRLENBQUM7QUFBRWIsUUFBSSxFQUFFQywwREFBa0JyQztBQUExQixHQUFELENBQVI7QUFDRCxDQUpELEMsQ0FNQTs7O0FBQ08sSUFBTXFELFVBQVUsR0FBRyxTQUFiQSxVQUFhO0FBQUEsTUFBR0MsSUFBSCxRQUFHQSxJQUFIO0FBQUEsTUFBU0MsUUFBVCxRQUFTQSxRQUFUO0FBQUEsU0FBd0IsVUFBQ04sUUFBRCxFQUFjO0FBQzlEQSxZQUFRLENBQUM7QUFBRWIsVUFBSSxFQUFFQyxpRUFBUjtBQUFtQ0MsYUFBTyxFQUFFO0FBQUVnQixZQUFJLEVBQUpBLElBQUY7QUFBUUMsZ0JBQVEsRUFBUkE7QUFBUjtBQUE1QyxLQUFELENBQVIsQ0FEOEQsQ0FHOUQ7O0FBQ0FDLHlEQUFHLENBQUNDLE1BQUosQ0FBVztBQUFFSCxVQUFJLEVBQUpBLElBQUY7QUFBUUMsY0FBUSxFQUFSQTtBQUFSLEtBQVgsRUFDR0csSUFESCxDQUNRLFVBQUNmLFFBQUQsRUFBYztBQUNsQjtBQURrQiwyQkFFTUEsUUFBUSxDQUFDQyxJQUZmO0FBQUEsVUFFVmUsS0FGVSxrQkFFVkEsS0FGVTtBQUFBLFVBRUhDLElBRkcsa0JBRUhBLElBRkc7QUFHbEJDLG9FQUFXLENBQUNDLFNBQVosQ0FBc0JILEtBQXRCLEVBSGtCLENBS2xCO0FBQ0E7QUFDQTs7QUFDQVgsa0JBQVksQ0FBQ0MsUUFBRCxFQUFXVyxJQUFJLENBQUNHLEVBQWhCLENBQVo7QUFFQWQsY0FBUSxDQUFDO0FBQUViLFlBQUksRUFBRUMsaUVBQVI7QUFBbUNDLGVBQU8sRUFBRUssUUFBUSxDQUFDQztBQUFyRCxPQUFELENBQVI7QUFDRCxLQVpILEVBYUdvQixLQWJILENBYVMsVUFBQXRCLEtBQUs7QUFBQSxhQUNWTyxRQUFRLENBQUM7QUFDUGIsWUFBSSxFQUFFQywrREFEQztBQUN3QkMsZUFBTyxFQUFFRyxZQUFZLENBQUNDLEtBQUQ7QUFEN0MsT0FBRCxDQURFO0FBQUEsS0FiZDtBQWlCRCxHQXJCeUI7QUFBQSxDQUFuQixDLENBdUJQOztBQUNPLElBQU11QixVQUFVLEdBQUcsU0FBYkEsVUFBYTtBQUFBLE1BQUdYLElBQUgsU0FBR0EsSUFBSDtBQUFBLE1BQVNZLEtBQVQsU0FBU0EsS0FBVDtBQUFBLE1BQWdCWCxRQUFoQixTQUFnQkEsUUFBaEI7QUFBQSxTQUErQixVQUFDTixRQUFELEVBQWM7QUFDckVBLFlBQVEsQ0FBQztBQUNQYixVQUFJLEVBQUVDLGlFQURDO0FBQzBCQyxhQUFPLEVBQUU7QUFBRWdCLFlBQUksRUFBSkEsSUFBRjtBQUFRWSxhQUFLLEVBQUxBLEtBQVI7QUFBZVgsZ0JBQVEsRUFBUkE7QUFBZjtBQURuQyxLQUFELENBQVIsQ0FEcUUsQ0FLckU7O0FBQ0FDLHlEQUFHLENBQUNXLE1BQUosQ0FBVztBQUFFYixVQUFJLEVBQUpBLElBQUY7QUFBUVksV0FBSyxFQUFMQSxLQUFSO0FBQWVYLGNBQVEsRUFBUkE7QUFBZixLQUFYLEVBQ0dHLElBREgsQ0FDUSxVQUFDZixRQUFELEVBQWM7QUFDbEI7QUFEa0IsNEJBRU1BLFFBQVEsQ0FBQ0MsSUFGZjtBQUFBLFVBRVZlLEtBRlUsbUJBRVZBLEtBRlU7QUFBQSxVQUVIQyxJQUZHLG1CQUVIQSxJQUZHO0FBR2xCQyxvRUFBVyxDQUFDQyxTQUFaLENBQXNCSCxLQUF0QixFQUhrQixDQUtsQjtBQUNBO0FBQ0E7O0FBQ0FYLGtCQUFZLENBQUNDLFFBQUQsRUFBV1csSUFBSSxDQUFDRyxFQUFoQixDQUFaO0FBRUFkLGNBQVEsQ0FBQztBQUFFYixZQUFJLEVBQUVDLGlFQUFSO0FBQW1DQyxlQUFPLEVBQUVLLFFBQVEsQ0FBQ0M7QUFBckQsT0FBRCxDQUFSO0FBQ0QsS0FaSCxFQWFHb0IsS0FiSCxDQWFTLFVBQUF0QixLQUFLO0FBQUEsYUFDVk8sUUFBUSxDQUFDO0FBQ1BiLFlBQUksRUFBRUMsK0RBREM7QUFDd0JDLGVBQU8sRUFBRUcsWUFBWSxDQUFDQyxLQUFEO0FBRDdDLE9BQUQsQ0FERTtBQUFBLEtBYmQ7QUFpQkQsR0F2QnlCO0FBQUEsQ0FBbkIsQyxDQXlCUDs7QUFDTyxJQUFNMEIsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ2xCLE1BQUQ7QUFBQSxTQUFZLFVBQUNELFFBQUQsRUFBYztBQUNuRE8seURBQUcsQ0FBQ2EsT0FBSixHQUNHWCxJQURILENBQ1EsVUFBQ2YsUUFBRCxFQUFjO0FBQ2xCa0Isb0VBQVcsQ0FBQ1MsV0FBWixHQURrQixDQUdsQjtBQUNBO0FBQ0E7O0FBQ0FsQixtQkFBYSxDQUFDSCxRQUFELEVBQVdDLE1BQVgsQ0FBYjtBQUVBRCxjQUFRLENBQUM7QUFBRWIsWUFBSSxFQUFFQyxrRUFBUjtBQUFvQ0MsZUFBTyxFQUFFSyxRQUFRLENBQUNDO0FBQXRELE9BQUQsQ0FBUjtBQUNELEtBVkgsRUFXR29CLEtBWEgsQ0FXUyxVQUFBdEIsS0FBSztBQUFBLGFBQ1o7QUFDRTZCLGVBQU8sQ0FBQ0MsR0FBUixDQUFZOUIsS0FBWjtBQUZVO0FBQUEsS0FYZDtBQWNELEdBZjBCO0FBQUEsQ0FBcEIsQyxDQWlCUDtBQUNBOztBQUNPLElBQU0rQixxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCO0FBQUEsU0FBTztBQUMxQ3JDLFFBQUksRUFBRUMscUVBRG9DO0FBRTFDQyxXQUFPLEVBQUU7QUFGaUMsR0FBUDtBQUFBLENBQTlCLEMsQ0FLUDs7QUFDTyxJQUFNb0MsWUFBWSxHQUFHLFNBQWZBLFlBQWU7QUFBQSxTQUFNLFVBQUN6QixRQUFELEVBQWM7QUFDOUNBLFlBQVEsQ0FBQztBQUFFYixVQUFJLEVBQUVDLG1FQUEyQjVDO0FBQW5DLEtBQUQsQ0FBUjtBQUVBK0QseURBQUcsQ0FBQ2tCLFlBQUosR0FDR2hCLElBREgsQ0FDUSxVQUFDZixRQUFELEVBQWM7QUFDbEI7QUFEa0IsNEJBRU1BLFFBQVEsQ0FBQ0MsSUFGZjtBQUFBLFVBRVZlLEtBRlUsbUJBRVZBLEtBRlU7QUFBQSxVQUVIQyxJQUZHLG1CQUVIQSxJQUZHO0FBR2xCQyxvRUFBVyxDQUFDQyxTQUFaLENBQXNCSCxLQUF0QixFQUhrQixDQUtsQjtBQUNBO0FBQ0E7O0FBQ0FYLGtCQUFZLENBQUNDLFFBQUQsRUFBV1csSUFBSSxDQUFDRyxFQUFoQixDQUFaO0FBRUFkLGNBQVEsQ0FBQztBQUNQYixZQUFJLEVBQUVDLG1FQURDO0FBQzRCQyxlQUFPLEVBQUVLLFFBQVEsQ0FBQ0M7QUFEOUMsT0FBRCxDQUFSO0FBR0QsS0FkSCxFQWVHb0IsS0FmSCxDQWVTLFVBQUF0QixLQUFLO0FBQUEsYUFDVk8sUUFBUSxDQUFDO0FBQ1BiLFlBQUksRUFBRUMsaUVBREM7QUFDMEJDLGVBQU8sRUFBRUcsWUFBWSxDQUFDQyxLQUFEO0FBRC9DLE9BQUQsQ0FERTtBQUFBLEtBZmQ7QUFtQkQsR0F0QjJCO0FBQUEsQ0FBckIsQzs7Ozs7Ozs7Ozs7O0FDN0dQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTs7QUFDTyxJQUFNaUMsV0FBVyxHQUFJLFNBQWZBLFdBQWUsQ0FBQXhCLEtBQUs7QUFBQSxTQUFLO0FBQUVmLFFBQUksRUFBRUMsMERBQVI7QUFBNEJjLFNBQUssRUFBTEE7QUFBNUIsR0FBTDtBQUFBLENBQTFCO0FBQ0EsSUFBTXlCLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUF6QixLQUFLO0FBQUEsU0FBSztBQUFFZixRQUFJLEVBQUVDLDJEQUFSO0FBQTZCYyxTQUFLLEVBQUxBO0FBQTdCLEdBQUw7QUFBQSxDQUExQjtBQUNQLG1DOzs7Ozs7Ozs7OztBQ0xBLHVDOzs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBOzs7Ozs7QUFNQSxJQUFNMEIsUUFBUSxHQUFHLFNBQVhBLFFBQVc7QUFBQSxNQUFHQyxJQUFILFFBQUdBLElBQUg7QUFBQSxNQUFTQyxPQUFULFFBQVNBLE9BQVQ7QUFBQSxNQUFrQkMsT0FBbEIsUUFBa0JBLE9BQWxCO0FBQUEsU0FDZjtBQUFLLFFBQUksRUFBQyxPQUFWO0FBQWtCLGFBQVMsd0JBQWlCRixJQUFqQjtBQUEzQixLQUNFO0FBQUcsV0FBTyxFQUFFRSxPQUFaO0FBQXFCLGFBQVMsRUFBQztBQUEvQixZQURGLEVBRUUsMkVBQVNELE9BQVQsQ0FGRixDQURlO0FBQUEsQ0FBakI7QUFPQTs7Ozs7OztBQU1BRixRQUFRLENBQUNJLFlBQVQsR0FBd0I7QUFDdEJILE1BQUksRUFBRTtBQURnQixDQUF4QjtBQUlBRCxRQUFRLENBQUNLLFNBQVQsR0FBcUI7QUFDbkJKLE1BQUksRUFBRUssaURBQVMsQ0FBQ0MsTUFERztBQUVuQkwsU0FBTyxFQUFFSSxpREFBUyxDQUFDQyxNQUFWLENBQWlCQyxVQUZQO0FBR25CTCxTQUFPLEVBQUVHLGlEQUFTLENBQUNHLElBQVYsQ0FBZUQ7QUFITCxDQUFyQjtBQU1lUix1RUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDQTtBQUNBOztBQUVBLElBQU1VLE1BQU0sR0FBRyxTQUFUQSxNQUFTO0FBQUEsTUFBR0MsUUFBSCxRQUFHQSxRQUFIO0FBQUEsTUFBYUMsT0FBYixRQUFhQSxPQUFiO0FBQUEsTUFBeUJDLFVBQXpCOztBQUFBLFNBQ2I7QUFDRSxXQUFPLEVBQUVELE9BRFg7QUFFRSxhQUFTLEVBQUM7QUFGWixLQUdNQyxVQUhOLEdBS0dGLFFBTEgsQ0FEYTtBQUFBLENBQWY7O0FBVUFELE1BQU0sQ0FBQ0wsU0FBUCxHQUFtQjtBQUNqQk0sVUFBUSxFQUFFTCxpREFBUyxDQUFDUSxTQUFWLENBQW9CLENBQzVCUixpREFBUyxDQUFDQyxNQURrQixFQUU1QkQsaURBQVMsQ0FBQ1MsTUFGa0IsQ0FBcEIsRUFHUFAsVUFKYztBQUtqQkksU0FBTyxFQUFFTixpREFBUyxDQUFDRyxJQUFWLENBQWVEO0FBTFAsQ0FBbkI7QUFRZUUscUVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBLElBQU1OLFlBQVksR0FBRztBQUNuQlksY0FBWSxFQUFFLEVBREs7QUFFbkJDLGFBQVcsRUFBRSxRQUZNO0FBR25CQyxVQUFRLEVBQUU7QUFIUyxDQUFyQjtBQU1BLElBQU1iLFNBQVMsR0FBRztBQUNoQjtBQUNBYyxRQUFNLEVBQUViLGlEQUFTLENBQUNTLE1BQVYsQ0FBaUJQLFVBRlQ7QUFHaEJJLFNBQU8sRUFBRU4saURBQVMsQ0FBQ0csSUFBVixDQUFlRCxVQUhSO0FBSWhCO0FBQ0FRLGNBQVksRUFBRVYsaURBQVMsQ0FBQ1MsTUFMUjtBQU1oQjtBQUNBRSxhQUFXLEVBQUVYLGlEQUFTLENBQUNDLE1BUFA7QUFRaEJXLFVBQVEsRUFBRVosaURBQVMsQ0FBQ2M7QUFSSixDQUFsQjs7SUFXTUMsSTs7Ozs7QUFJSixnQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQiw4RUFBTUEsS0FBTjs7QUFEaUIscUZBVVYsRUFWVTs7QUFBQSxrR0FhRyxVQUFDQyxHQUFELEVBQVM7QUFBQTtBQUFBLFVBQ3JCSixNQURxQix5QkFDckJBLE1BRHFCOztBQUU3QixVQUFNSCxZQUFZLEdBQUdRLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JOLE1BQWxCLENBQXJCOztBQUVBLFVBQUlJLEdBQUosRUFBUztBQUNQQyxjQUFNLENBQUNFLElBQVAsQ0FBWUgsR0FBWixFQUNHSSxNQURILENBQ1UsVUFBQUMsR0FBRztBQUFBLGlCQUFJTCxHQUFHLENBQUNLLEdBQUQsQ0FBUDtBQUFBLFNBRGIsRUFFR0MsT0FGSCxDQUVXLFVBQUNELEdBQUQsRUFBUztBQUNoQlosc0JBQVksQ0FBQ1ksR0FBRCxDQUFaLENBQWtCRSxLQUFsQixHQUEwQlAsR0FBRyxDQUFDSyxHQUFELENBQTdCO0FBQ0FaLHNCQUFZLENBQUNZLEdBQUQsQ0FBWixDQUFrQkcsS0FBbEIsR0FBMEJDLGlFQUFRLENBQ2hDVCxHQUFHLENBQUNLLEdBQUQsQ0FENkIsRUFFaENULE1BQU0sQ0FBQ1MsR0FBRCxDQUFOLENBQVlLLGVBRm9CLENBQWxDO0FBSUFqQixzQkFBWSxDQUFDWSxHQUFELENBQVosQ0FBa0JNLE9BQWxCLEdBQTRCLElBQTVCO0FBQ0QsU0FUSDtBQVVEOztBQUVELGFBQU9sQixZQUFQO0FBQ0QsS0EvQmtCOztBQUFBLDJGQWlDSixVQUFDWSxHQUFELEVBQVM7QUFBQTtBQUFBLFVBQ2RULE1BRGMsMEJBQ2RBLE1BRGM7QUFBQSxVQUNOZ0IsVUFETSwwQkFDTkEsVUFETTs7QUFBQSw0QkFFWSxNQUFLQyxLQUFMLENBQVdSLEdBQVgsQ0FGWjtBQUFBLFVBRWRFLEtBRmMsbUJBRWRBLEtBRmM7QUFBQSxVQUVQQyxLQUZPLG1CQUVQQSxLQUZPO0FBQUEsVUFFQUcsT0FGQSxtQkFFQUEsT0FGQTtBQUFBLHdCQUdpQmYsTUFBTSxDQUFDUyxHQUFELENBSHZCO0FBQUEsVUFHZFMsV0FIYyxlQUdkQSxXQUhjO0FBQUEsVUFHREMsYUFIQyxlQUdEQSxhQUhDO0FBS3RCLFVBQU1DLE9BQU8sR0FBR0osVUFBVSxDQUFDQSxVQUFVLENBQUNLLE1BQVgsR0FBb0IsQ0FBckIsQ0FBMUI7QUFDQSxVQUFNQyxPQUFPLEdBQUdOLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDTyxPQUFYLENBQW1CZCxHQUFuQixJQUEwQixDQUEzQixDQUExQixDQU5zQixDQU90Qjs7QUFDQSxVQUFNZSxXQUFVLEdBQUlmLEdBQUcsS0FBS1csT0FBVCxHQUNqQjtBQUNBLGdCQUFBSyxDQUFDO0FBQUEsZUFBSUEsQ0FBQyxDQUFDaEIsR0FBRixLQUFVLE9BQVYsSUFBcUIsTUFBS2lCLGVBQUwsQ0FBcUIsTUFBS0MsTUFBTCxDQUFZTCxPQUFaLENBQXJCLENBQXpCO0FBQUEsT0FGZ0IsR0FHakI7QUFDQSxnQkFBQUcsQ0FBQztBQUFBLGVBQUlBLENBQUMsQ0FBQ2hCLEdBQUYsS0FBVSxPQUFWLElBQXFCLE1BQUttQixTQUFMLEVBQXJCLElBQXlDLE1BQUtDLFlBQUwsQ0FBa0JKLENBQWxCLENBQTdDO0FBQUEsT0FKSDs7QUFNQSxhQUNFLDJEQUFDLDhDQUFEO0FBQ0UsV0FBRyxFQUFFaEIsR0FEUDtBQUVFLGlCQUFTLEVBQUVTLFdBRmI7QUFHRSxlQUFPLEVBQUUsaUJBQUFZLENBQUM7QUFBQSxpQkFBSSxNQUFLSCxNQUFMLENBQVlsQixHQUFaLElBQW1CcUIsQ0FBdkI7QUFBQSxTQUhaLENBR3NDO0FBSHRDO0FBSUUsYUFBSyxFQUFFbkIsS0FBSyxJQUFJLEVBSmxCO0FBS0UsYUFBSyxFQUFFQyxLQUxUO0FBTUUsZUFBTyxFQUFFRyxPQU5YO0FBT0UsZ0JBQVEsRUFBRSxrQkFBQVUsQ0FBQztBQUFBLGlCQUFJLE1BQUtNLGVBQUwsQ0FBcUJOLENBQXJCLEVBQXdCaEIsR0FBeEIsQ0FBSjtBQUFBLFNBUGI7QUFRRSxrQkFBVSxFQUFFLG9CQUFBZ0IsQ0FBQztBQUFBLGlCQUFJRCxXQUFVLENBQUNDLENBQUQsQ0FBZDtBQUFBO0FBUmYsU0FTTU4sYUFUTixFQURGO0FBYUQsS0E1RGtCOztBQUFBLDhGQStERCxVQUFDYSxJQUFELEVBQVU7QUFDMUIsVUFBSTtBQUNGQSxZQUFJLENBQUNDLEtBQUw7QUFDRCxPQUZELENBRUUsT0FBT1IsQ0FBUCxFQUFVO0FBQ1Y7QUFDQWxELGVBQU8sQ0FBQ0MsR0FBUiw4Q0FBa0RpRCxDQUFDLENBQUMxQyxPQUFwRDtBQUNEO0FBQ0YsS0F0RWtCOztBQUFBLDhGQXdFRCxVQUFDMEMsQ0FBRCxFQUFJaEIsR0FBSixFQUFZO0FBQUEsVUFDcEJFLEtBRG9CLEdBQ1ZjLENBQUMsQ0FBQ1MsTUFEUSxDQUNwQnZCLEtBRG9COztBQUU1QixZQUFLd0IsUUFBTCxDQUFjLFVBQUFDLFNBQVM7QUFBQSxpQ0FDbEJBLFNBRGtCLHNCQUVwQjNCLEdBRm9CLG9CQUdoQjJCLFNBQVMsQ0FBQzNCLEdBQUQsQ0FITztBQUluQkUsZUFBSyxFQUFFQSxLQUFLLElBQUksRUFKRztBQUtuQkMsZUFBSyxFQUFFQyxpRUFBUSxDQUNiRixLQURhLEVBRWJ5QixTQUFTLENBQUMzQixHQUFELENBQVQsQ0FBZUssZUFGRixDQUxJO0FBU25CQyxpQkFBTyxFQUFFO0FBVFU7QUFBQSxPQUF2QjtBQVlELEtBdEZrQjs7QUFBQSx3RkF3RlA7QUFBQSxhQUFNLE1BQUtDLFVBQUwsQ0FBZ0JxQixHQUFoQixDQUFvQixVQUFBNUIsR0FBRztBQUFBLGVBQUksTUFBS1EsS0FBTCxDQUFXUixHQUFYLEVBQWdCRyxLQUFwQjtBQUFBLE9BQXZCLEVBQ2YwQixLQURlLENBQ1QsVUFBQUMsQ0FBQztBQUFBLGVBQUlBLENBQUo7QUFBQSxPQURRLENBQU47QUFBQSxLQXhGTzs7QUFBQSx3RkE0RlA7QUFBQSxhQUNWLE1BQUt2QixVQUFMLENBQWdCd0IsTUFBaEIsQ0FBdUIsVUFBQ0MsR0FBRCxFQUFNaEMsR0FBTixFQUFjO0FBQ25DZ0MsV0FBRyxDQUFDaEMsR0FBRCxDQUFILEdBQVcsTUFBS1EsS0FBTCxDQUFXUixHQUFYLEVBQWdCRSxLQUEzQjtBQUNBLGVBQU84QixHQUFQO0FBQ0QsT0FIRCxFQUdHLEVBSEgsQ0FEVTtBQUFBLEtBNUZPOztBQUFBLDJGQW1HSixVQUFDaEIsQ0FBRCxFQUFPO0FBQ3BCQSxPQUFDLENBQUNpQixjQUFGOztBQUNBLFlBQUt2QyxLQUFMLENBQVdWLE9BQVgsQ0FBbUIsTUFBS2tELFNBQUwsRUFBbkI7QUFDRCxLQXRHa0I7O0FBQUEsUUFFVDNDLE9BRlMsR0FFZ0JHLEtBRmhCLENBRVRILE1BRlM7QUFBQSxRQUVESCxhQUZDLEdBRWdCTSxLQUZoQixDQUVETixZQUZDO0FBSWpCLFVBQUtHLE1BQUwsR0FBY0EsT0FBZDtBQUNBLFVBQUtnQixVQUFMLEdBQWtCWCxNQUFNLENBQUNFLElBQVAsQ0FBWVAsT0FBWixDQUFsQjtBQUVBLFVBQUtpQixLQUFMLEdBQWEsTUFBSzJCLG1CQUFMLENBQXlCL0MsYUFBekIsQ0FBYjtBQVBpQjtBQVFsQjs7Ozs2QkFnR1E7QUFBQTs7QUFBQSx3QkFDMkIsS0FBS00sS0FEaEM7QUFBQSxVQUNDSixRQURELGVBQ0NBLFFBREQ7QUFBQSxVQUNXRCxXQURYLGVBQ1dBLFdBRFg7QUFHUCxhQUNFLHlFQUVJLEtBQUtrQixVQUFMLENBQWdCcUIsR0FBaEIsQ0FBb0IsVUFBQTVCLEdBQUc7QUFBQSxlQUFJLE1BQUksQ0FBQ29DLFlBQUwsQ0FBa0JwQyxHQUFsQixDQUFKO0FBQUEsT0FBdkIsQ0FGSixFQUlFLDJEQUFDLCtDQUFEO0FBQ0UsZ0JBQVEsRUFBRVYsUUFBUSxJQUFJLENBQUMsS0FBSzZCLFNBQUwsRUFEekI7QUFFRSxlQUFPLEVBQUUsS0FBS0M7QUFGaEIsU0FJRy9CLFdBSkgsQ0FKRixDQURGO0FBYUQ7Ozs7RUE1SGdCZ0QsK0M7O2dCQUFiNUMsSSxrQkFDa0JqQixZOztnQkFEbEJpQixJLGVBRWVoQixTOztBQTZITmdCLG1FQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkpBO0FBQ0E7O0FBRUEsSUFBTTZDLEtBQUssR0FBRyxTQUFSQSxLQUFRLE9BRVI7QUFBQSxNQURKQyxTQUNJLFFBREpBLFNBQ0k7QUFBQSxNQURPQyxLQUNQLFFBRE9BLEtBQ1A7QUFBQSxNQURjQyxPQUNkLFFBRGNBLE9BQ2Q7QUFBQSxNQUR1QnRDLEtBQ3ZCLFFBRHVCQSxLQUN2QjtBQUFBLE1BRDhCRyxPQUM5QixRQUQ4QkEsT0FDOUI7QUFBQSxNQUR1Q29DLFNBQ3ZDLFFBRHVDQSxTQUN2QztBQUFBLE1BRHFEekQsVUFDckQ7O0FBQ0osTUFBSTBELFlBQUo7QUFDQSxNQUFNQyxZQUFZLEdBQUcsQ0FBQyxlQUFELENBQXJCOztBQUVBLE1BQUksQ0FBQ3pDLEtBQUQsSUFBVUcsT0FBZCxFQUF1QjtBQUNyQnNDLGdCQUFZLENBQUNDLElBQWIsQ0FBa0IsT0FBbEI7QUFDRDs7QUFFRCxVQUFRTixTQUFSO0FBQ0UsU0FBSyxRQUFMO0FBQWU7QUFDYjtBQURhLFlBRUxPLE9BRkssR0FFdUI3RCxVQUZ2QixDQUVMNkQsT0FGSztBQUFBLFlBRU9DLFdBRlAsNEJBRXVCOUQsVUFGdkI7O0FBR2IwRCxvQkFBWSxHQUNWO0FBQ0UsbUJBQVMsRUFBRUMsWUFBWSxDQUFDSSxJQUFiLENBQWtCLEdBQWxCLENBRGI7QUFFRSxhQUFHLEVBQUVQO0FBRlAsV0FHTU0sV0FITixHQU1JRCxPQUFPLENBQUNsQixHQUFSLENBQVksVUFBQXFCLE1BQU07QUFBQSxpQkFDaEI7QUFDRSxlQUFHLEVBQUVBLE1BQU0sQ0FBQy9DLEtBRGQ7QUFFRSxpQkFBSyxFQUFFK0MsTUFBTSxDQUFDL0MsS0FGaEI7QUFHRSxvQkFBUSxFQUFFK0MsTUFBTSxDQUFDQztBQUhuQixhQUtHRCxNQUFNLENBQUNFLFlBTFYsQ0FEZ0I7QUFBQSxTQUFsQixDQU5KLENBREY7QUFtQkE7QUFDRDs7QUFDRCxTQUFLLFVBQUw7QUFBaUI7QUFDZlIsb0JBQVksR0FBSTtBQUNkLG1CQUFTLEVBQUVDLFlBQVksQ0FBQ0ksSUFBYixDQUFrQixHQUFsQixDQURHO0FBRWQsYUFBRyxFQUFFUDtBQUZTLFdBR1Z4RCxVQUhVLEVBQWhCO0FBS0E7QUFDRDs7QUFDRCxTQUFLLE9BQUw7QUFDQTtBQUFTO0FBQ1AwRCxvQkFBWSxHQUFJO0FBQ2QsbUJBQVMsRUFBRUMsWUFBWSxDQUFDSSxJQUFiLENBQWtCLEdBQWxCLENBREc7QUFFZCxhQUFHLEVBQUVQO0FBRlMsV0FHVnhELFVBSFUsRUFBaEI7QUFLRDtBQXhDSDs7QUEyQ0EsTUFBSXlELFNBQUosRUFBZTtBQUNiLFdBQU9DLFlBQVA7QUFDRDs7QUFFRCxTQUNFO0FBQUssYUFBUyxFQUFDO0FBQWYsS0FFSUgsS0FBSyxJQUNMO0FBQU8sYUFBUyxFQUFDO0FBQWpCLEtBQTBCQSxLQUExQixDQUhKLENBRzZDO0FBSDdDLElBS0dHLFlBTEgsQ0FERjtBQVNELENBbEVEOztBQW9FQUwsS0FBSyxDQUFDOUQsWUFBTixHQUFxQjtBQUNuQmlFLFNBQU8sRUFBRTtBQUFBLFdBQU0sSUFBTjtBQUFBLEdBRFU7QUFFbkJ0QyxPQUFLLEVBQUUsS0FGWTtBQUduQkcsU0FBTyxFQUFFLEtBSFU7QUFJbkJvQyxXQUFTLEVBQUU7QUFKUSxDQUFyQjtBQU9BSixLQUFLLENBQUM3RCxTQUFOLEdBQWtCO0FBQ2hCOEQsV0FBUyxFQUFFN0QsaURBQVMsQ0FBQ0MsTUFBVixDQUFpQkMsVUFEWjtBQUVoQjtBQUNBNEQsT0FBSyxFQUFFOUQsaURBQVMsQ0FBQ0MsTUFIRDtBQUloQjtBQUNBOEQsU0FBTyxFQUFFL0QsaURBQVMsQ0FBQ0csSUFMSDtBQU1oQnNCLE9BQUssRUFBRXpCLGlEQUFTLENBQUNjLElBTkQ7QUFPaEJjLFNBQU8sRUFBRTVCLGlEQUFTLENBQUNjLElBUEg7QUFRaEJrRCxXQUFTLEVBQUVoRSxpREFBUyxDQUFDYztBQVJMLENBQWxCO0FBV2U4QyxvRUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekZBO0FBQ0E7QUFFQSxJQUFNN0QsU0FBUyxHQUFHO0FBQ2hCMkUsVUFBUSxFQUFFMUUsaURBQVMsQ0FBQzJFLE1BREo7QUFFaEJDLE1BQUksRUFBRTVFLGlEQUFTLENBQUMyRTtBQUZBLENBQWxCOztJQUtNRSxXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7b0ZBSUk7QUFBRUMsV0FBSyxFQUFFO0FBQVQsSzs7Ozs7Ozt3Q0FFWTtBQUFBOztBQUNsQixXQUFLSixRQUFMLEdBQWdCSyxXQUFXLENBQ3pCO0FBQUEsZUFBTSxNQUFJLENBQUMvQixRQUFMLENBQWM7QUFBRThCLGVBQUssRUFBRSxNQUFJLENBQUNoRCxLQUFMLENBQVdnRCxLQUFYLEdBQW1CO0FBQTVCLFNBQWQsQ0FBTjtBQUFBLE9BRHlCLEVBRXpCLEtBQUs5RCxLQUFMLENBQVcwRCxRQUZjLENBQTNCO0FBSUQ7OzsyQ0FFc0I7QUFDckJNLG1CQUFhLENBQUMsS0FBS04sUUFBTixDQUFiO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQU1FLElBQUksR0FBRyxLQUFLOUMsS0FBTCxDQUFXZ0QsS0FBWCxJQUFvQixLQUFLOUQsS0FBTCxDQUFXNEQsSUFBWCxHQUFrQixDQUF0QyxDQUFiO0FBQ0EsVUFBTUssSUFBSSxHQUFHLElBQUlDLE1BQUosQ0FBV04sSUFBWCxDQUFiO0FBRUEsYUFBTyx5RUFBT0ssSUFBUCxDQUFQO0FBQ0Q7Ozs7RUF0QnVCdEIsK0M7O2dCQUFwQmtCLFcsZUFDZTlFLFM7O2dCQURmOEUsVyxrQkFFa0I7QUFBRUgsVUFBUSxFQUFFLEdBQVo7QUFBaUJFLE1BQUksRUFBRTtBQUF2QixDOztBQXVCVEMsMEVBQWYsRTs7Ozs7Ozs7Ozs7O0FDakNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTs7QUFFQSxJQUFNTSxZQUFZLEdBQUcsU0FBZkEsWUFBZSxPQUFrQjtBQUFBLE1BQWZDLFFBQWUsUUFBZkEsUUFBZTs7QUFDckMsTUFBSSxDQUFDQSxRQUFMLEVBQWU7QUFBRTtBQUFTLEdBRFcsQ0FHckM7OztBQUhxQyxNQUk3QkMsUUFKNkIsR0FJRUQsUUFKRixDQUk3QkMsUUFKNkI7QUFBQSxNQUluQkMsU0FKbUIsR0FJRUYsUUFKRixDQUluQkUsU0FKbUI7QUFBQSxNQUlSQyxLQUpRLEdBSUVILFFBSkYsQ0FJUkcsS0FKUTtBQU1yQyxTQUNFLHVFQUNFLHlFQUFPQyx3RUFBZSxDQUFDRixTQUFELENBQXRCLFNBREYsRUFFRSw4RUFBUUMsS0FBUixVQUZGLEVBR0UseUVBQU9GLFFBQVAsQ0FIRixDQURGO0FBT0QsQ0FiRDs7QUFlZUYsMkVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUVBOztJQUVNTSxZOzs7Ozs7Ozs7Ozs7OzZCQUNLO0FBQUEsVUFDQ0MsU0FERCxHQUNlLEtBQUsxRSxLQURwQixDQUNDMEUsU0FERDs7QUFHUCxVQUFJLENBQUNBLFNBQUwsRUFBZ0I7QUFBRSxlQUFPLDhFQUFQO0FBQXNCOztBQUN4QyxhQUNFLHVFQUVJQSxTQUFTLENBQUN4QyxHQUFWLENBQWMsVUFBQWtDLFFBQVE7QUFBQSxlQUNwQiwyREFBQyxzREFBRDtBQUFjLGFBQUcsRUFBRUEsUUFBUSxDQUFDTyxPQUE1QjtBQUFxQyxrQkFBUSxFQUFFUDtBQUEvQyxVQURvQjtBQUFBLE9BQXRCLENBRkosQ0FERjtBQVFEOzs7O0VBYndCekIsK0M7O0FBZ0JaOEIsMkVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBOztBQUVBLElBQU1HLFVBQVUsR0FBRyxTQUFiQSxVQUFhLE9BQWtDO0FBQUEsTUFBaENuRixNQUFnQyxRQUFoQ0EsTUFBZ0M7QUFBQSxNQUF4Qm9GLFNBQXdCLFFBQXhCQSxTQUF3QjtBQUFBLE1BQWJDLE9BQWEsUUFBYkEsT0FBYTtBQUNuRCxNQUFJQyxTQUFTLEdBQUcsRUFBaEIsQ0FEbUQsQ0FHbkQ7O0FBQ0EsTUFBTUMsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQXhFLEtBQUssRUFBSTtBQUMzQixvQkFBZUEsS0FBZjtBQUNFLFdBQUssU0FBTDtBQUNFLGVBQU9BLEtBQUssR0FBRyxNQUFILEdBQVksT0FBeEI7QUFDQTs7QUFDRixXQUFLLFFBQUw7QUFDRSxlQUFRcUUsU0FBRCxHQUNMLDJEQUFDLFVBQUQ7QUFBWSxnQkFBTSxFQUFFckU7QUFBcEIsVUFESyxHQUVMOUQsSUFBSSxDQUFDQyxTQUFMLENBQWU2RCxLQUFmLENBRkY7O0FBR0Y7QUFDRSxlQUFPQSxLQUFQO0FBVEo7QUFXRCxHQVpELENBSm1ELENBa0JuRDtBQUNBOzs7QUFDQU4sUUFBTSxDQUFDRSxJQUFQLENBQVlYLE1BQVosRUFDR2MsT0FESCxDQUVJLFVBQUNELEdBQUQsRUFBUztBQUNQLFFBQUksQ0FBQ3dFLE9BQU8sQ0FBQ0csUUFBUixDQUFpQjNFLEdBQWpCLENBQUwsRUFBNEI7QUFDMUJ5RSxlQUFTLENBQUM1QixJQUFWLENBQWU7QUFBSSxXQUFHLEVBQUU3QztBQUFULFNBQWVBLEdBQWYsQ0FBZjtBQUNBeUUsZUFBUyxDQUFDNUIsSUFBVixDQUNFO0FBQUksV0FBRyxZQUFLN0MsR0FBTCxjQUFZYixNQUFNLENBQUNhLEdBQUQsQ0FBbEI7QUFBUCxTQUFtQzBFLFdBQVcsQ0FBQ3ZGLE1BQU0sQ0FBQ2EsR0FBRCxDQUFQLENBQTlDLENBREY7QUFHRDtBQUNGLEdBVEw7QUFZQSxNQUFNNEUsU0FBUyxHQUFHTCxTQUFTLEdBQ3pCLEVBRHlCLEdBRXpCLGVBRkY7QUFJQSxTQUNFO0FBQUksYUFBUyxFQUFFSztBQUFmLEtBQ0dILFNBREgsQ0FERjtBQUtELENBekNEOztBQTJDQUgsVUFBVSxDQUFDOUYsWUFBWCxHQUEwQjtBQUN4QitGLFdBQVMsRUFBRSxLQURhO0FBRXhCQyxTQUFPLEVBQUU7QUFGZSxDQUExQjtBQU1BRixVQUFVLENBQUM3RixTQUFYLEdBQXVCO0FBQ3JCVSxRQUFNLEVBQUVULGlEQUFTLENBQUNTLE1BQVYsQ0FBaUJQLFVBREo7QUFFckIyRixXQUFTLEVBQUU3RixpREFBUyxDQUFDYyxJQUZBO0FBR3JCZ0YsU0FBTyxFQUFFOUYsaURBQVMsQ0FBQ21HO0FBSEUsQ0FBdkI7QUFNZVAseUVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFEQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUEsSUFBTTlGLFlBQVksR0FBRztBQUNuQnNHLGNBQVksRUFBRTtBQURLLENBQXJCO0FBSUEsSUFBTXJHLFNBQVMsR0FBRztBQUNoQjdCLFlBQVUsRUFBRThCLGlEQUFTLENBQUNHLElBQVYsQ0FBZUQsVUFEWDtBQUVoQjlDLGtCQUFnQixFQUFFNEMsaURBQVMsQ0FBQ0csSUFBVixDQUFlRCxVQUZqQjtBQUdoQmtHLGNBQVksRUFBRXBHLGlEQUFTLENBQUNDO0FBSFIsQ0FBbEI7O0lBTU1vRyxVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MkZBSVcsVUFBQ2xKLE9BQUQsRUFBYTtBQUMxQjtBQUNBaUMsYUFBTyxDQUFDQyxHQUFSLENBQVkzQixJQUFJLENBQUNDLFNBQUwsQ0FBZVIsT0FBZixDQUFaOztBQUVBLFlBQUs2RCxLQUFMLENBQVc5QyxVQUFYLENBQXNCZixPQUF0QjtBQUNELEs7Ozs7Ozs7NkJBRVE7QUFDUDtBQURPLHdCQUVvQyxLQUFLNkQsS0FGekM7QUFBQSxVQUVDb0YsWUFGRCxlQUVDQSxZQUZEO0FBQUEsVUFFZWhKLGdCQUZmLGVBRWVBLGdCQUZmO0FBSVAsYUFDRSx3RUFDRSxpRkFERixFQUdJZ0osWUFBWSxJQUNaLDJEQUFDLGtEQUFEO0FBQ0UsWUFBSSxFQUFDLFFBRFA7QUFFRSxlQUFPLEVBQUVBLFlBRlg7QUFHRSxlQUFPLEVBQUVoSjtBQUhYLFFBSkosRUFVRSwyREFBQyw2Q0FBRDtBQUNFLGNBQU0sRUFBRXlELDhEQURWO0FBRUUsZUFBTyxFQUFFLEtBQUs2QixZQUZoQjtBQUdFLG1CQUFXLEVBQUM7QUFIZCxRQVZGLENBREY7QUFrQkQ7Ozs7RUFqQ3NCaUIsK0M7O2dCQUFuQjBDLFUsa0JBQ2tCdkcsWTs7Z0JBRGxCdUcsVSxlQUVldEcsUzs7QUFrQ05zRyx5RUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckRBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQSxJQUFNdkcsWUFBWSxHQUFHO0FBQ25Cc0csY0FBWSxFQUFFO0FBREssQ0FBckI7QUFJQSxJQUFNckcsU0FBUyxHQUFHO0FBQ2hCakIsWUFBVSxFQUFFa0IsaURBQVMsQ0FBQ0csSUFBVixDQUFlRCxVQURYO0FBRWhCN0Msa0JBQWdCLEVBQUUyQyxpREFBUyxDQUFDRyxJQUFWLENBQWVELFVBRmpCO0FBR2hCa0csY0FBWSxFQUFFcEcsaURBQVMsQ0FBQ0M7QUFIUixDQUFsQjs7SUFNTXFHLFU7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyRkFJVyxVQUFDbkosT0FBRCxFQUFhO0FBQzFCLFlBQUs2RCxLQUFMLENBQVdsQyxVQUFYLENBQXNCM0IsT0FBdEI7QUFDRCxLOzs7Ozs7OzZCQUVRO0FBQ1A7QUFETyx3QkFFb0MsS0FBSzZELEtBRnpDO0FBQUEsVUFFQ29GLFlBRkQsZUFFQ0EsWUFGRDtBQUFBLFVBRWUvSSxnQkFGZixlQUVlQSxnQkFGZjtBQUlQLGFBQ0Usd0VBQ0UsaUZBREYsRUFHSStJLFlBQVksSUFDWiwyREFBQyxrREFBRDtBQUNFLFlBQUksRUFBQyxRQURQO0FBRUUsZUFBTyxFQUFFQSxZQUZYO0FBR0UsZUFBTyxFQUFFL0k7QUFIWCxRQUpKLEVBVUUsMkRBQUMsNkNBQUQ7QUFDRSxjQUFNLEVBQUV3RCw4REFEVjtBQUVFLGVBQU8sRUFBRSxLQUFLNkIsWUFGaEI7QUFHRSxtQkFBVyxFQUFDO0FBSGQsUUFWRixDQURGO0FBa0JEOzs7O0VBOUJzQmlCLCtDOztnQkFBbkIyQyxVLGtCQUNrQnhHLFk7O2dCQURsQndHLFUsZUFFZXZHLFM7O0FBK0JOdUcseUVBQWYsRTs7Ozs7Ozs7Ozs7O0FDbERBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDTyxJQUFNQyxRQUFRLEdBQUcsOEJBQWpCLEMsQ0FFUDtBQUNBO0FBR0E7O0FBQ08sSUFBTUMsV0FBVyxHQUFHLHFCQUFwQixDLENBRVA7QUFDQSwwRDs7Ozs7Ozs7Ozs7O0FDYkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQUVBLElBQU1DLE9BQU8sR0FBR0MsYUFBQSxLQUF5QixZQUF6Qzs7QUFFQSxJQUFNQyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLEdBQU07QUFDM0IsTUFBTUMsV0FBVyxHQUFHLENBQ2xCQyxtREFEa0IsRUFFbEJDLHNFQUZrQixDQUFwQjs7QUFLQSxNQUFJTCxPQUFKLEVBQWE7QUFDWEcsZUFBVyxDQUFDekMsSUFBWixDQUFpQjRDLGlFQUFZLENBQUM7QUFBQ0MsZUFBUyxFQUFFLElBQVo7QUFBa0JDLFVBQUksRUFBRTtBQUF4QixLQUFELENBQTdCO0FBQ0Q7O0FBRUQsTUFBTUMsS0FBSyxHQUFHQyx5REFBVyxDQUN2QkMsaURBRHVCLEVBRXZCWCxPQUFPLEdBQ0hZLG9GQUFtQixDQUFDQyxxREFBZSxNQUFmLFNBQW1CVixXQUFuQixDQUFELENBRGhCLEdBRUhVLHFEQUFlLE1BQWYsU0FBbUJWLFdBQW5CLENBSm1CLENBQXpCO0FBT0EsU0FBT00sS0FBUDtBQUNELENBbEJEOztBQW9CZVAsNkVBQWYsRTs7Ozs7Ozs7Ozs7O0FDOUJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFFQSxJQUFNTyxLQUFLLEdBQUdQLGdFQUFjLEVBQTVCLEMsQ0FFQTs7QUFDQSxJQUFJakksOERBQVcsQ0FBQzZJLFVBQVosRUFBSixFQUE4QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQUwsT0FBSyxDQUFDcEosUUFBTixDQUFld0IsNkZBQXFCLEVBQXBDLEVBSjRCLENBTTVCOztBQUNBQyxzRkFBWSxHQUFHMkgsS0FBSyxDQUFDcEosUUFBVCxDQUFaO0FBQ0QsQyxDQUNEO0FBRUE7OztBQUNBLElBQU0wSixHQUFHLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixLQUF4QixDQUFaO0FBQ0FDLHdEQUFNLENBQ0osMkRBQUMsb0RBQUQ7QUFBVSxPQUFLLEVBQUVUO0FBQWpCLEdBQ0UsMkRBQUMsMERBQUQsT0FERixDQURJLEVBSUpNLEdBSkksQ0FBTixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFFQTtBQUVBLElBQUk5QixTQUFTLEdBQUcsRUFBaEI7O0FBRUEsSUFBTWtDLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQzlKLFFBQUQsRUFBVytKLE1BQVgsRUFBbUI3SixLQUFuQixFQUE2QjtBQUNsRCxNQUFNOEosT0FBTyxHQUFHRCxNQUFNLENBQUNDLE9BQVAsQ0FBZTlKLEtBQWYsRUFBc0IsRUFBdEIsQ0FBaEIsQ0FEa0QsQ0FHbEQ7O0FBRUEsTUFBTStKLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUNuSixFQUFEO0FBQUEsbUNBQU9vSixLQUFQO0FBQUEsUUFBZUMsS0FBZjtBQUFBLFFBQXlCQyxJQUF6Qjs7QUFBQSxXQUNiaEgsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQjhHLEtBQWxCLEVBQXlCO0FBQUVySixRQUFFLEVBQUZBLEVBQUY7QUFBTTJHLFdBQUssRUFBRTJDLElBQUksQ0FBQ2hHLE1BQUwsR0FBYztBQUEzQixLQUF6QixDQURhO0FBQUEsR0FBZjs7QUFHQSxNQUFNeUYsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQWpDLFNBQVM7QUFBQSxXQUFLeUMsZ0RBQVEsQ0FBQ0MsSUFBVCxDQUFjMUMsU0FBZCxFQUF5QnFDLE1BQXpCLENBQUw7QUFBQSxHQUF4QixDQVJrRCxDQVVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUNBRCxTQUFPLENBQUNPLEVBQVIsQ0FBVyxnQkFBWCxFQUE2QixVQUFDbEwsT0FBRCxFQUFhO0FBQ3hDdUksYUFBUyxHQUFHeUMsZ0RBQVEsQ0FBQ0csU0FBVCxDQUFtQjVDLFNBQW5CLEVBQThCdkksT0FBOUIsQ0FBWjtBQUNBLFdBQU9XLFFBQVEsQ0FBQztBQUNkYixVQUFJLEVBQUVDLDZFQURRO0FBRWRDLGFBQU8sRUFBRTtBQUFFYSxhQUFLLEVBQUxBLEtBQUY7QUFBUzBILGlCQUFTLEVBQUVpQyxNQUFNLENBQUNqQyxTQUFEO0FBQTFCO0FBRkssS0FBRCxDQUFmO0FBSUQsR0FORDtBQVFBb0MsU0FBTyxDQUFDTyxFQUFSLENBQVcsZUFBWCxFQUE0QixVQUFDbEwsT0FBRCxFQUFhO0FBQ3ZDdUksYUFBUyxHQUFHeUMsZ0RBQVEsQ0FBQ0ksUUFBVCxDQUFrQjdDLFNBQWxCLEVBQTZCdkksT0FBN0IsQ0FBWjtBQUNBLFdBQU9XLFFBQVEsQ0FBQztBQUNkYixVQUFJLEVBQUVDLDRFQURRO0FBRWRDLGFBQU8sRUFBRTtBQUFFYSxhQUFLLEVBQUxBLEtBQUY7QUFBUzBILGlCQUFTLEVBQUVpQyxNQUFNLENBQUNqQyxTQUFEO0FBQTFCO0FBRkssS0FBRCxDQUFmO0FBSUQsR0FORCxFQTVCa0QsQ0FvQ2xEOztBQUNBb0MsU0FBTyxDQUFDTyxFQUFSLENBQVcsbUJBQVgsRUFBZ0MsVUFBQWxMLE9BQU87QUFBQSxXQUNyQ1csUUFBUSxDQUFDO0FBQUViLFVBQUksRUFBRUMsdUVBQVI7QUFBaUNDLGFBQU8sRUFBUEE7QUFBakMsS0FBRCxDQUQ2QjtBQUFBLEdBQXZDO0FBR0EySyxTQUFPLENBQUNPLEVBQVIsQ0FBVyxrQkFBWCxFQUErQixVQUFBbEwsT0FBTztBQUFBLFdBQ3BDVyxRQUFRLENBQUM7QUFBRWIsVUFBSSxFQUFFQyxzRUFBUjtBQUFnQ0MsYUFBTyxFQUFQQTtBQUFoQyxLQUFELENBRDRCO0FBQUEsR0FBdEM7QUFHQTJLLFNBQU8sQ0FBQ08sRUFBUixDQUFXLGlCQUFYLEVBQThCLFVBQUFsTCxPQUFPO0FBQUEsV0FDbkNXLFFBQVEsQ0FBQztBQUFFYixVQUFJLEVBQUVDLHFFQUFSO0FBQStCQyxhQUFPLEVBQVBBO0FBQS9CLEtBQUQsQ0FEMkI7QUFBQSxHQUFyQyxFQTNDa0QsQ0E4Q2xEOztBQUNBMkssU0FBTyxDQUFDTyxFQUFSLENBQVcsbUJBQVgsRUFBZ0MsVUFBQWxMLE9BQU87QUFBQSxXQUNyQ1csUUFBUSxDQUFDO0FBQUNiLFVBQUksRUFBRUMsdUVBQVA7QUFBZ0NDLGFBQU8sRUFBUEE7QUFBaEMsS0FBRCxDQUQ2QjtBQUFBLEdBQXZDO0FBSUEySyxTQUFPLENBQUNPLEVBQVIsQ0FBVyxpQkFBWCxFQUE4QixVQUFBbEwsT0FBTztBQUFBLFdBQ25DVyxRQUFRLENBQUM7QUFBQ2IsVUFBSSxFQUFFQyxxRUFBUDtBQUE4QkMsYUFBTyxFQUFQQTtBQUE5QixLQUFELENBRDJCO0FBQUEsR0FBckMsRUFuRGtELENBdURsRDs7QUFDQSxNQUFJMkssT0FBTyxDQUFDaEcsS0FBUixLQUFrQixRQUF0QixFQUFnQztBQUM5QmdHLFdBQU8sQ0FBQ3hELElBQVIsR0FDR2tFLE9BREgsQ0FDVyxJQURYLEVBQ2lCO0FBQUEsYUFDYjFLLFFBQVEsQ0FBQztBQUFFYixZQUFJLEVBQUVDLHVFQUFSO0FBQWlDQyxlQUFPLEVBQUU7QUFBRWEsZUFBSyxFQUFMQTtBQUFGO0FBQTFDLE9BQUQsQ0FESztBQUFBLEtBRGpCLEVBR0d3SyxPQUhILENBR1csT0FIWCxFQUdvQixVQUFBckwsT0FBTztBQUFBLGFBQ3ZCVyxRQUFRLENBQUM7QUFBRWIsWUFBSSxFQUFFQywyRUFBUjtBQUFxQ0MsZUFBTyxFQUFFO0FBQUVhLGVBQUssRUFBTEEsS0FBRjtBQUFTVCxlQUFLLEVBQUVKO0FBQWhCO0FBQTlDLE9BQUQsQ0FEZTtBQUFBLEtBSDNCLEVBS0dxTCxPQUxILENBS1csU0FMWCxFQUtzQjtBQUFBLGFBQ2xCO0FBQ0FwSixlQUFPLENBQUNDLEdBQVIsQ0FBWSxvQ0FBWjtBQUZrQjtBQUFBLEtBTHRCO0FBUUQ7O0FBRUR5SSxTQUFPLENBQUNXLE9BQVIsQ0FBZ0I7QUFBQSxXQUNkM0ssUUFBUSxDQUFDO0FBQ1BiLFVBQUksRUFBRUMsbUVBREM7QUFFUEMsYUFBTyxFQUFFO0FBQUVhLGFBQUssRUFBTEEsS0FBRjtBQUFTVCxhQUFLLEVBQUU7QUFBaEI7QUFGRixLQUFELENBRE07QUFBQSxHQUFoQjtBQU1BdUssU0FBTyxDQUFDakksT0FBUixDQUFnQjtBQUFBLFdBQ2QvQixRQUFRLENBQUM7QUFDUGIsVUFBSSxFQUFFQyxvRUFEQztBQUVQQyxhQUFPLEVBQUU7QUFBRWEsYUFBSyxFQUFMQSxLQUFGO0FBQVNULGFBQUssRUFBRTtBQUFoQjtBQUZGLEtBQUQsQ0FETTtBQUFBLEdBQWhCO0FBT0EsU0FBT3VLLE9BQVA7QUFDRCxDQWpGRDs7QUFtRmVGLDZFQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pGQTtBQUVBO0FBRUEsSUFBSWxDLFNBQVMsR0FBRyxFQUFoQjs7QUFFQSxJQUFNZ0QsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFDNUssUUFBRCxFQUFXK0osTUFBWCxFQUFzQjtBQUM1QyxNQUFNN0osS0FBSyxHQUFHLE9BQWQ7QUFDQSxNQUFNOEosT0FBTyxHQUFHRCxNQUFNLENBQUNDLE9BQVAsQ0FBZTlKLEtBQWYsRUFBc0IsRUFBdEIsQ0FBaEIsQ0FGNEMsQ0FJNUM7O0FBRUEsTUFBTStKLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUNuSixFQUFEO0FBQUEsbUNBQU9vSixLQUFQO0FBQUEsUUFBZUMsS0FBZjtBQUFBLFFBQXlCQyxJQUF6Qjs7QUFBQSxXQUNiaEgsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQjhHLEtBQWxCLEVBQXlCO0FBQUVySixRQUFFLEVBQUZBLEVBQUY7QUFBTTJHLFdBQUssRUFBRTJDLElBQUksQ0FBQ2hHLE1BQUwsR0FBYztBQUEzQixLQUF6QixDQURhO0FBQUEsR0FBZjs7QUFHQSxNQUFNeUYsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQWpDLFNBQVM7QUFBQSxXQUFLeUMsZ0RBQVEsQ0FBQ0MsSUFBVCxDQUFjMUMsU0FBZCxFQUF5QnFDLE1BQXpCLENBQUw7QUFBQSxHQUF4QixDQVQ0QyxDQVc1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUNBRCxTQUFPLENBQUNPLEVBQVIsQ0FBVyxnQkFBWCxFQUE2QixVQUFDbEwsT0FBRCxFQUFhO0FBQ3hDdUksYUFBUyxHQUFHeUMsZ0RBQVEsQ0FBQ0csU0FBVCxDQUFtQjVDLFNBQW5CLEVBQThCdkksT0FBOUIsQ0FBWjtBQUNBLFdBQU9XLFFBQVEsQ0FBQztBQUNkYixVQUFJLEVBQUVDLDZFQURRO0FBRWRDLGFBQU8sRUFBRTtBQUFFYSxhQUFLLEVBQUxBLEtBQUY7QUFBUzBILGlCQUFTLEVBQUVpQyxNQUFNLENBQUNqQyxTQUFEO0FBQTFCO0FBRkssS0FBRCxDQUFmO0FBSUQsR0FORDtBQVFBb0MsU0FBTyxDQUFDTyxFQUFSLENBQVcsZUFBWCxFQUE0QixVQUFDbEwsT0FBRCxFQUFhO0FBQ3ZDdUksYUFBUyxHQUFHeUMsZ0RBQVEsQ0FBQ0ksUUFBVCxDQUFrQjdDLFNBQWxCLEVBQTZCdkksT0FBN0IsQ0FBWjtBQUNBLFdBQU9XLFFBQVEsQ0FBQztBQUNkYixVQUFJLEVBQUVDLDRFQURRO0FBRWRDLGFBQU8sRUFBRTtBQUFFYSxhQUFLLEVBQUxBLEtBQUY7QUFBUzBILGlCQUFTLEVBQUVpQyxNQUFNLENBQUNqQyxTQUFEO0FBQTFCO0FBRkssS0FBRCxDQUFmO0FBSUQsR0FORCxFQTdCNEMsQ0FxQzVDOztBQUNBb0MsU0FBTyxDQUFDTyxFQUFSLENBQVcsbUJBQVgsRUFBZ0MsVUFBQWxMLE9BQU87QUFBQSxXQUNyQ1csUUFBUSxDQUFDO0FBQUViLFVBQUksRUFBRUMsdUVBQVI7QUFBaUNDLGFBQU8sRUFBUEE7QUFBakMsS0FBRCxDQUQ2QjtBQUFBLEdBQXZDO0FBR0EySyxTQUFPLENBQUNPLEVBQVIsQ0FBVyxpQkFBWCxFQUE4QixVQUFBbEwsT0FBTztBQUFBLFdBQ25DVyxRQUFRLENBQUM7QUFBRWIsVUFBSSxFQUFFQyxxRUFBUjtBQUErQkMsYUFBTyxFQUFQQTtBQUEvQixLQUFELENBRDJCO0FBQUEsR0FBckM7QUFHQTJLLFNBQU8sQ0FBQ08sRUFBUixDQUFXLHVCQUFYLEVBQW9DLFVBQUFsTCxPQUFPO0FBQUEsV0FDekNXLFFBQVEsQ0FBQztBQUFFYixVQUFJLEVBQUVDLDJFQUFSO0FBQXFDQyxhQUFPLEVBQVBBO0FBQXJDLEtBQUQsQ0FEaUM7QUFBQSxHQUEzQztBQUdBMkssU0FBTyxDQUFDTyxFQUFSLENBQVcsbUJBQVgsRUFBZ0MsVUFBQWxMLE9BQU87QUFBQSxXQUNyQ1csUUFBUSxDQUFDO0FBQUViLFVBQUksRUFBRUMsdUVBQVI7QUFBaUNDLGFBQU8sRUFBUEE7QUFBakMsS0FBRCxDQUQ2QjtBQUFBLEdBQXZDO0FBR0EySyxTQUFPLENBQUNPLEVBQVIsQ0FBVyx5QkFBWCxFQUFzQyxVQUFBbEwsT0FBTztBQUFBLFdBQzNDVyxRQUFRLENBQUM7QUFBRWIsVUFBSSxFQUFFQyw2RUFBUjtBQUF1Q0MsYUFBTyxFQUFQQTtBQUF2QyxLQUFELENBRG1DO0FBQUEsR0FBN0M7QUFHQTJLLFNBQU8sQ0FBQ08sRUFBUixDQUFXLGtCQUFYLEVBQStCLFVBQUFsTCxPQUFPO0FBQUEsV0FDcENXLFFBQVEsQ0FBQztBQUFFYixVQUFJLEVBQUVDLHNFQUFSO0FBQWdDQyxhQUFPLEVBQVBBO0FBQWhDLEtBQUQsQ0FENEI7QUFBQSxHQUF0QztBQUdBMkssU0FBTyxDQUFDTyxFQUFSLENBQVcsd0JBQVgsRUFBcUMsVUFBQWxMLE9BQU87QUFBQSxXQUMxQ1csUUFBUSxDQUFDO0FBQUViLFVBQUksRUFBRUMsNEVBQVI7QUFBc0NDLGFBQU8sRUFBUEE7QUFBdEMsS0FBRCxDQURrQztBQUFBLEdBQTVDO0FBR0EySyxTQUFPLENBQUNPLEVBQVIsQ0FBVyxnQkFBWCxFQUE2QixVQUFBbEwsT0FBTztBQUFBLFdBQ2xDVyxRQUFRLENBQUM7QUFBRWIsVUFBSSxFQUFFQyxvRUFBUjtBQUE4QkMsYUFBTyxFQUFQQTtBQUE5QixLQUFELENBRDBCO0FBQUEsR0FBcEM7QUFHQTJLLFNBQU8sQ0FBQ08sRUFBUixDQUFXLFlBQVgsRUFBeUIsVUFBQWxMLE9BQU87QUFBQSxXQUM5QlcsUUFBUSxDQUFDO0FBQUViLFVBQUksRUFBRUMsZ0VBQVI7QUFBMEJDLGFBQU8sRUFBUEE7QUFBMUIsS0FBRCxDQURzQjtBQUFBLEdBQWhDO0FBR0EySyxTQUFPLENBQUNPLEVBQVIsQ0FBVyxjQUFYLEVBQTJCLFVBQUFsTCxPQUFPO0FBQUEsV0FDaENXLFFBQVEsQ0FBQztBQUFFYixVQUFJLEVBQUVDLGtFQUFSO0FBQTRCQyxhQUFPLEVBQVBBO0FBQTVCLEtBQUQsQ0FEd0I7QUFBQSxHQUFsQyxFQWpFNEMsQ0FvRTVDOztBQUNBLE1BQUkySyxPQUFPLENBQUNoRyxLQUFSLEtBQWtCLFFBQXRCLEVBQWdDO0FBQzlCZ0csV0FBTyxDQUFDeEQsSUFBUixHQUNHa0UsT0FESCxDQUNXLElBRFgsRUFDaUI7QUFBQSxhQUNiMUssUUFBUSxDQUFDO0FBQUViLFlBQUksRUFBRUMsdUVBQVI7QUFBaUNDLGVBQU8sRUFBRTtBQUFFYSxlQUFLLEVBQUxBO0FBQUY7QUFBMUMsT0FBRCxDQURLO0FBQUEsS0FEakIsRUFHR3dLLE9BSEgsQ0FHVyxPQUhYLEVBR29CLFVBQUFyTCxPQUFPO0FBQUEsYUFDdkJXLFFBQVEsQ0FBQztBQUFFYixZQUFJLEVBQUVDLDJFQUFSO0FBQXFDQyxlQUFPLEVBQUU7QUFBRWEsZUFBSyxFQUFMQSxLQUFGO0FBQVNULGVBQUssRUFBRUo7QUFBaEI7QUFBOUMsT0FBRCxDQURlO0FBQUEsS0FIM0IsRUFLR3FMLE9BTEgsQ0FLVyxTQUxYLEVBS3NCO0FBQUEsYUFDbEI7QUFDQXBKLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLG9DQUFaO0FBRmtCO0FBQUEsS0FMdEI7QUFRRDs7QUFFRHlJLFNBQU8sQ0FBQ1csT0FBUixDQUFnQjtBQUFBLFdBQ2QzSyxRQUFRLENBQUM7QUFDUGIsVUFBSSxFQUFFQyxtRUFEQztBQUVQQyxhQUFPLEVBQUU7QUFBRWEsYUFBSyxFQUFMQSxLQUFGO0FBQVNULGFBQUssRUFBRTtBQUFoQjtBQUZGLEtBQUQsQ0FETTtBQUFBLEdBQWhCO0FBTUF1SyxTQUFPLENBQUNqSSxPQUFSLENBQWdCO0FBQUEsV0FDZC9CLFFBQVEsQ0FBQztBQUNQYixVQUFJLEVBQUVDLG9FQURDO0FBRVBDLGFBQU8sRUFBRTtBQUFFYSxhQUFLLEVBQUxBLEtBQUY7QUFBU1QsYUFBSyxFQUFFO0FBQWhCO0FBRkYsS0FBRCxDQURNO0FBQUEsR0FBaEI7QUFPQSxTQUFPdUssT0FBUDtBQUNELENBOUZEOztBQWdHZVksOEVBQWYsRTs7Ozs7Ozs7Ozs7O0FDdEdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUVBLElBQUliLE1BQUo7O0FBRUEsSUFBTWMsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFBbkssS0FBSztBQUFBLFNBQUs7QUFDOUJvSyxVQUFNLEVBQUU7QUFBRXBLLFdBQUssRUFBTEE7QUFBRixLQURzQjtBQUU5QnFLLFVBQU0sRUFBRSxnQkFBQ0MsSUFBRCxFQUFPQyxHQUFQLEVBQVl0TCxJQUFaO0FBQUEsYUFDTjtBQUNBMkIsZUFBTyxDQUFDQyxHQUFSLFdBQWV5SixJQUFmLGVBQXdCQyxHQUF4QixHQUErQnRMLElBQS9CO0FBRk07QUFBQTtBQUZzQixHQUFMO0FBQUEsQ0FBM0I7O0FBUU8sSUFBTXVMLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNsTCxRQUFELEVBQWM7QUFDckMsTUFBSStKLE1BQUosRUFBWTtBQUFFLFdBQU9BLE1BQVA7QUFBZ0I7O0FBRTlCLE1BQU1ySixLQUFLLEdBQUdFLDhEQUFXLENBQUN1SyxTQUFaLEVBQWQ7QUFFQXBCLFFBQU0sR0FBRyxJQUFJcUIsOENBQUosV0FBYzFDLDBEQUFkLGNBQW9DbUMsYUFBYSxDQUFDbkssS0FBRCxDQUFqRCxDQUFUO0FBRUFxSixRQUFNLENBQUNzQixPQUFQO0FBQ0F0QixRQUFNLENBQUNZLE9BQVAsQ0FBZTtBQUFBLFdBQU0zSyxRQUFRLENBQUM7QUFBRWIsVUFBSSxFQUFFQyxrRUFBUjtBQUE0QkMsYUFBTyxFQUFFO0FBQXJDLEtBQUQsQ0FBZDtBQUFBLEdBQWY7QUFDQTBLLFFBQU0sQ0FBQ2hJLE9BQVAsQ0FBZTtBQUFBLFdBQU0vQixRQUFRLENBQUM7QUFBRWIsVUFBSSxFQUFFQyxtRUFBUjtBQUE2QkMsYUFBTyxFQUFFO0FBQXRDLEtBQUQsQ0FBZDtBQUFBLEdBQWY7QUFFQVcsVUFBUSxDQUFDO0FBQUViLFFBQUksRUFBRUMsc0VBQVI7QUFBZ0NDLFdBQU8sRUFBRTtBQUF6QyxHQUFELENBQVI7QUFFQSxTQUFPMEssTUFBUDtBQUNELENBZE07QUFnQkEsSUFBTXVCLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUN0TCxRQUFELEVBQWM7QUFDdkMsTUFBSStKLE1BQUosRUFBWTtBQUNWLFFBQUk7QUFDRkEsWUFBTSxDQUFDd0IsVUFBUDtBQUNBeEIsWUFBTSxHQUFHLElBQVQ7QUFDRCxLQUhELENBR0UsT0FBT3lCLEdBQVAsRUFBWTtBQUNaO0FBQ0FsSyxhQUFPLENBQUNDLEdBQVIsQ0FBWWlLLEdBQVo7QUFDRDs7QUFFRHhMLFlBQVEsQ0FBQztBQUFFYixVQUFJLEVBQUVDLHlFQUFSO0FBQW1DQyxhQUFPLEVBQUU7QUFBNUMsS0FBRCxDQUFSO0FBQ0Q7O0FBQ0QsU0FBTzBLLE1BQVA7QUFDRCxDQWJNLEM7Ozs7Ozs7Ozs7OztBQ2hDUDtBQUFBO0FBQUE7O0FBRUEsSUFBTTBCLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ3pMLFFBQUQsRUFBVytKLE1BQVgsRUFBc0I7QUFDN0MsTUFBTTdKLEtBQUssR0FBRyxRQUFkO0FBQ0EsTUFBTThKLE9BQU8sR0FBR0QsTUFBTSxDQUFDQyxPQUFQLENBQWU5SixLQUFmLEVBQXNCLEVBQXRCLENBQWhCLENBRjZDLENBSTdDOztBQUNBOEosU0FBTyxDQUFDTyxFQUFSLENBQVcsTUFBWCxFQUFtQixVQUFDbEwsT0FBRCxFQUFhO0FBQUUySyxXQUFPLENBQUMzRCxJQUFSLENBQWEsTUFBYixFQUFxQmhILE9BQXJCO0FBQWdDLEdBQWxFLEVBTDZDLENBTzdDOztBQUNBLE1BQUkySyxPQUFPLENBQUNoRyxLQUFSLEtBQWtCLFFBQXRCLEVBQWdDO0FBQzlCZ0csV0FBTyxDQUFDeEQsSUFBUixHQUNHa0UsT0FESCxDQUNXLElBRFgsRUFDaUI7QUFBQSxhQUNiMUssUUFBUSxDQUFDO0FBQUViLFlBQUksRUFBRUMsdUVBQVI7QUFBaUNDLGVBQU8sRUFBRTtBQUFFYSxlQUFLLEVBQUxBO0FBQUY7QUFBMUMsT0FBRCxDQURLO0FBQUEsS0FEakIsRUFHR3dLLE9BSEgsQ0FHVyxPQUhYLEVBR29CLFVBQUFyTCxPQUFPO0FBQUEsYUFDdkJXLFFBQVEsQ0FBQztBQUFFYixZQUFJLEVBQUVDLDJFQUFSO0FBQXFDQyxlQUFPLEVBQUU7QUFBRWEsZUFBSyxFQUFMQSxLQUFGO0FBQVNULGVBQUssRUFBRUo7QUFBaEI7QUFBOUMsT0FBRCxDQURlO0FBQUEsS0FIM0IsRUFLR3FMLE9BTEgsQ0FLVyxTQUxYLEVBS3NCO0FBQUEsYUFDbEI7QUFDQXBKLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLG9DQUFaO0FBRmtCO0FBQUEsS0FMdEI7QUFRRDs7QUFFRHlJLFNBQU8sQ0FBQ1csT0FBUixDQUFnQjtBQUFBLFdBQ2QzSyxRQUFRLENBQUM7QUFDUGIsVUFBSSxFQUFFQyxtRUFEQztBQUVQQyxhQUFPLEVBQUU7QUFBRWEsYUFBSyxFQUFMQSxLQUFGO0FBQVNULGFBQUssRUFBRTtBQUFoQjtBQUZGLEtBQUQsQ0FETTtBQUFBLEdBQWhCO0FBTUF1SyxTQUFPLENBQUNqSSxPQUFSLENBQWdCO0FBQUEsV0FDZC9CLFFBQVEsQ0FBQztBQUNQYixVQUFJLEVBQUVDLG9FQURDO0FBRVBDLGFBQU8sRUFBRTtBQUFFYSxhQUFLLEVBQUxBLEtBQUY7QUFBU1QsYUFBSyxFQUFFO0FBQWhCO0FBRkYsS0FBRCxDQURNO0FBQUEsR0FBaEI7QUFPQSxTQUFPdUssT0FBUDtBQUNELENBakNEOztBQW1DZXlCLCtFQUFmLEU7Ozs7Ozs7Ozs7OztBQ3JDQTtBQUFBO0FBQUE7O0FBRUEsSUFBTUMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDMUwsUUFBRCxFQUFXK0osTUFBWCxFQUFtQjdKLEtBQW5CLEVBQTZCO0FBQ2xELE1BQU04SixPQUFPLEdBQUdELE1BQU0sQ0FBQ0MsT0FBUCxDQUFlOUosS0FBZixFQUFzQixFQUF0QixDQUFoQjtBQUVBOEosU0FBTyxDQUFDTyxFQUFSLENBQVcsV0FBWCxFQUF3QixVQUFBbEwsT0FBTztBQUFBLFdBQzdCVyxRQUFRLENBQUM7QUFBRWIsVUFBSSxFQUFFQywrREFBUjtBQUF5QkMsYUFBTyxFQUFQQTtBQUF6QixLQUFELENBRHFCO0FBQUEsR0FBL0IsRUFIa0QsQ0FNbEQ7O0FBQ0EsTUFBSTJLLE9BQU8sQ0FBQ2hHLEtBQVIsS0FBa0IsUUFBdEIsRUFBZ0M7QUFDOUJnRyxXQUFPLENBQUN4RCxJQUFSLEdBQ0drRSxPQURILENBQ1csSUFEWCxFQUNpQjtBQUFBLGFBQ2IxSyxRQUFRLENBQUM7QUFBRWIsWUFBSSxFQUFFQyx1RUFBUjtBQUFpQ0MsZUFBTyxFQUFFO0FBQUVhLGVBQUssRUFBTEE7QUFBRjtBQUExQyxPQUFELENBREs7QUFBQSxLQURqQixFQUdHd0ssT0FISCxDQUdXLE9BSFgsRUFHb0IsVUFBQXJMLE9BQU87QUFBQSxhQUN2QlcsUUFBUSxDQUFDO0FBQUViLFlBQUksRUFBRUMsMkVBQVI7QUFBcUNDLGVBQU8sRUFBRTtBQUFFYSxlQUFLLEVBQUxBLEtBQUY7QUFBU1QsZUFBSyxFQUFFSjtBQUFoQjtBQUE5QyxPQUFELENBRGU7QUFBQSxLQUgzQixFQUtHcUwsT0FMSCxDQUtXLFNBTFgsRUFLc0I7QUFBQSxhQUNsQjtBQUNBcEosZUFBTyxDQUFDQyxHQUFSLENBQVksb0NBQVo7QUFGa0I7QUFBQSxLQUx0QjtBQVFEOztBQUVEeUksU0FBTyxDQUFDVyxPQUFSLENBQWdCO0FBQUEsV0FDZDNLLFFBQVEsQ0FBQztBQUNQYixVQUFJLEVBQUVDLG1FQURDO0FBRVBDLGFBQU8sRUFBRTtBQUFFYSxhQUFLLEVBQUxBLEtBQUY7QUFBU1QsYUFBSyxFQUFFO0FBQWhCO0FBRkYsS0FBRCxDQURNO0FBQUEsR0FBaEI7QUFNQXVLLFNBQU8sQ0FBQ2pJLE9BQVIsQ0FBZ0I7QUFBQSxXQUNkL0IsUUFBUSxDQUFDO0FBQ1BiLFVBQUksRUFBRUMsb0VBREM7QUFFUEMsYUFBTyxFQUFFO0FBQUVhLGFBQUssRUFBTEEsS0FBRjtBQUFTVCxhQUFLLEVBQUU7QUFBaEI7QUFGRixLQUFELENBRE07QUFBQSxHQUFoQjtBQU9BLFNBQU91SyxPQUFQO0FBQ0QsQ0FoQ0Q7O0FBa0NlMEIsNkVBQWYsRTs7Ozs7Ozs7Ozs7O0FDcENBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSTNCLE1BQUo7QUFDQSxJQUFJQyxPQUFKO0FBQ0EsSUFBTTJCLFFBQVEsR0FBRyxFQUFqQjs7QUFFQSxJQUFNM0MsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixDQUFBSSxLQUFLO0FBQUEsU0FBSSxVQUFBd0MsSUFBSTtBQUFBLFdBQUksVUFBQ0MsTUFBRCxFQUFZO0FBQ3BELGNBQVFBLE1BQU0sQ0FBQzFNLElBQWY7QUFDRTtBQUNBLGFBQUtDLGlFQUFMO0FBQXdCO0FBQ3RCMkssa0JBQU0sR0FBR21CLDZEQUFTLENBQUM5QixLQUFLLENBQUNwSixRQUFQLENBQWxCO0FBQ0EsbUJBQU80TCxJQUFJLENBQUNDLE1BQUQsQ0FBWDtBQUNEOztBQUVELGFBQUt6TSxrRUFBTDtBQUF5QjtBQUN2QixnQkFBSTJLLE1BQUosRUFBWTtBQUFFQSxvQkFBTSxHQUFHdUIsK0RBQVcsQ0FBQ2xDLEtBQUssQ0FBQ3BKLFFBQVAsQ0FBcEI7QUFBdUM7O0FBQ3JELG1CQUFPNEwsSUFBSSxDQUFDQyxNQUFELENBQVg7QUFDRDtBQUVEOztBQUNBLGFBQUt6TSxrRUFBTDtBQUF5QjtBQUN2QjJLLGtCQUFNLEdBQUdtQiw2REFBUyxDQUFDOUIsS0FBSyxDQUFDcEosUUFBUCxDQUFsQjtBQUNBLGdCQUFNOEwsV0FBVyxHQUFHRCxNQUFNLENBQUMzTCxLQUFQLENBQWE2TCxLQUFiLENBQW1CLEdBQW5CLEVBQXdCLENBQXhCLENBQXBCOztBQUVBLG9CQUFRRCxXQUFSO0FBQ0UsbUJBQUssUUFBTDtBQUNFSCx3QkFBUSxDQUFDRSxNQUFNLENBQUMzTCxLQUFSLENBQVIsR0FDRXVMLG1FQUFnQixDQUFDckMsS0FBSyxDQUFDcEosUUFBUCxFQUFpQitKLE1BQWpCLENBRGxCO0FBRUE7O0FBQ0YsbUJBQUssT0FBTDtBQUNFNEIsd0JBQVEsQ0FBQ0UsTUFBTSxDQUFDM0wsS0FBUixDQUFSLEdBQ0UwSyxrRUFBZSxDQUFDeEIsS0FBSyxDQUFDcEosUUFBUCxFQUFpQitKLE1BQWpCLENBRGpCO0FBRUE7O0FBQ0YsbUJBQUssTUFBTDtBQUNFNEIsd0JBQVEsQ0FBQ0UsTUFBTSxDQUFDM0wsS0FBUixDQUFSLEdBQ0V3TCxpRUFBYyxDQUFDdEMsS0FBSyxDQUFDcEosUUFBUCxFQUFpQitKLE1BQWpCLEVBQXlCOEIsTUFBTSxDQUFDM0wsS0FBaEMsQ0FEaEI7QUFFQTs7QUFDRixtQkFBSyxNQUFMO0FBQ0V5TCx3QkFBUSxDQUFDRSxNQUFNLENBQUMzTCxLQUFSLENBQVIsR0FDRTRKLGlFQUFjLENBQUNWLEtBQUssQ0FBQ3BKLFFBQVAsRUFBaUIrSixNQUFqQixFQUF5QjhCLE1BQU0sQ0FBQzNMLEtBQWhDLENBRGhCO0FBRUE7O0FBQ0Y7QUFDRTtBQUNBb0IsdUJBQU8sQ0FBQ0MsR0FBUiwyQkFBK0JzSyxNQUFNLENBQUMzTCxLQUF0QztBQW5CSjs7QUFxQkEsbUJBQU8wTCxJQUFJLENBQUNDLE1BQUQsQ0FBWDtBQUNEOztBQUVELGFBQUt6TSxtRUFBTDtBQUEwQjtBQUN4QjRLLG1CQUFPLEdBQUcyQixRQUFRLENBQUNFLE1BQU0sQ0FBQzNMLEtBQVIsQ0FBbEI7O0FBQ0EsZ0JBQUk4SixPQUFKLEVBQWE7QUFDWCxrQkFBSUEsT0FBTyxDQUFDaEcsS0FBUixLQUFrQixRQUF0QixFQUFnQztBQUM5QixvQkFBSTtBQUNGZ0cseUJBQU8sQ0FBQ2dDLEtBQVI7QUFDRCxpQkFGRCxDQUVFLE9BQU9SLEdBQVAsRUFBWTtBQUNaO0FBQ0FsSyx5QkFBTyxDQUFDQyxHQUFSLENBQVlpSyxHQUFaO0FBQ0Q7QUFDRjs7QUFDRHhCLHFCQUFPLEdBQUcsSUFBVjtBQUNEOztBQUNEWixpQkFBSyxDQUFDcEosUUFBTixDQUFlO0FBQ2JiLGtCQUFJLEVBQUVDLDBFQURPO0FBRWJDLHFCQUFPLEVBQUU7QUFBRWEscUJBQUssRUFBRTJMLE1BQU0sQ0FBQzNMO0FBQWhCO0FBRkksYUFBZjtBQUlBLG1CQUFPMEwsSUFBSSxDQUFDQyxNQUFELENBQVg7QUFDRDs7QUFFRCxhQUFLek0sa0VBQUw7QUFBeUI7QUFDdkIsZ0JBQU0wQyxPQUFPLEdBQUcsa0NBQTJCK0osTUFBTSxDQUFDM0wsS0FBbEMsOEJBQ0MyTCxNQUFNLENBQUNJLE9BRFIseUJBQzhCSixNQUFNLENBQUN4TSxPQURyQyxDQUFoQixDQUR1QixDQUd2Qjs7QUFDQWlDLG1CQUFPLENBQUNDLEdBQVIsQ0FBWU8sT0FBWjtBQUVBa0ksbUJBQU8sR0FBRzJCLFFBQVEsQ0FBQ0UsTUFBTSxDQUFDM0wsS0FBUixDQUFsQjs7QUFDQSxnQkFBSSxDQUFDLENBQUM4SixPQUFOLEVBQWU7QUFDYkEscUJBQU8sQ0FBQzNELElBQVIsQ0FBYXdGLE1BQU0sQ0FBQ0ksT0FBcEIsRUFBNkJKLE1BQU0sQ0FBQ3hNLE9BQXBDO0FBQ0Q7O0FBQ0QsbUJBQU91TSxJQUFJLENBQUNDLE1BQUQsQ0FBWDtBQUNEO0FBRUQ7O0FBQ0E7QUFDRSxpQkFBT0QsSUFBSSxDQUFDQyxNQUFELENBQVg7QUE1RUo7QUE4RUQsS0EvRXFDO0FBQUEsR0FBUjtBQUFBLENBQTlCOztBQWlGZTdDLCtFQUFmLEU7Ozs7Ozs7Ozs7OztBQzlGQTtBQUFBO0FBQUE7QUFBQTtBQUVBOztBQUVBLElBQU05SixVQUFVLEdBQUcsU0FBYkEsVUFBYSxHQUF5RDtBQUFBLE1BQXhEOEUsS0FBd0QsdUVBQWhEcEIsc0RBQVksQ0FBQ3NKLFdBQWIsQ0FBeUJoTixVQUF1QjtBQUFBLE1BQVgyTSxNQUFXOztBQUMxRSxVQUFRQSxNQUFNLENBQUMxTSxJQUFmO0FBQ0UsU0FBS0MsZ0VBQUw7QUFDRSxhQUFPeU0sTUFBTSxDQUFDeE0sT0FBZDs7QUFDRjtBQUNFLGFBQU8yRSxLQUFQO0FBSko7QUFNRCxDQVBEOztBQVNlOUUseUVBQWYsRTs7Ozs7Ozs7Ozs7O0FDYkE7QUFBQTtBQUFBOztBQUVBLElBQU1pTixVQUFVLEdBQUcsU0FBYkEsVUFBYSxHQUF5RDtBQUFBLE1BQXhEbkksS0FBd0QsdUVBQWhEcEIsc0RBQVksQ0FBQ3NKLFdBQWIsQ0FBeUJDLFVBQXVCO0FBQUEsTUFBWE4sTUFBVzs7QUFDMUUsTUFBSUEsTUFBTSxDQUFDMU0sSUFBUCxDQUFZaU4sS0FBWixDQUFrQixXQUFsQixDQUFKLEVBQW9DO0FBQ2xDLFdBQU8sSUFBUDtBQUNELEdBRkQsTUFFTyxJQUFJUCxNQUFNLENBQUMxTSxJQUFQLENBQVlpTixLQUFaLENBQWtCLFdBQWxCLEtBQWtDUCxNQUFNLENBQUMxTSxJQUFQLENBQVlpTixLQUFaLENBQWtCLFNBQWxCLENBQXRDLEVBQW9FO0FBQ3pFLFdBQU8sS0FBUDtBQUNEOztBQUNELFNBQU9wSSxLQUFQO0FBQ0QsQ0FQRDs7QUFTZW1JLHlFQUFmLEU7Ozs7Ozs7Ozs7OztBQ1hBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQSxJQUFNRSxhQUFhLEdBQUd6SixzREFBWSxDQUFDc0osV0FBYixDQUF5QkksWUFBL0M7O0FBRUEsSUFBTUEsWUFBWSxHQUFHLFNBQWZBLFlBQWUsR0FBbUM7QUFBQSxNQUFsQ3RJLEtBQWtDLHVFQUExQnFJLGFBQTBCO0FBQUEsTUFBWFIsTUFBVzs7QUFDdEQsVUFBUUEsTUFBTSxDQUFDMU0sSUFBZjtBQUNFO0FBQ0E7QUFDQSxTQUFLQyx1RUFBTDtBQUNBLFNBQUtBLHNFQUFMO0FBQ0UsYUFBTyxXQUFQOztBQUNGLFNBQUtBLHlFQUFMO0FBQ0UsYUFBTyxjQUFQOztBQUNGLFNBQUtBLGtFQUFMO0FBQ0UsYUFBTyxPQUFQOztBQUNGLFNBQUtBLG1FQUFMO0FBQ0UsYUFBTyxRQUFQOztBQUNGO0FBQ0UsYUFBTzRFLEtBQVA7QUFiSjtBQWVELENBaEJEOztBQWtCZXNJLDJFQUFmLEU7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNSixXQUFXLEdBQUdLLDZEQUFlLENBQUM7QUFDbENyTixZQUFVLEVBQVZBLHdFQURrQztBQUVsQ2lOLFlBQVUsRUFBVkEsd0VBRmtDO0FBR2xDRyxjQUFZLEVBQVpBLDBFQUFZQTtBQUhzQixDQUFELENBQW5DO0FBTWVKLDBFQUFmLEU7Ozs7Ozs7Ozs7OztBQ1hBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFFQSxJQUFNTSxXQUFXLEdBQUc1SixzREFBWSxDQUFDNkosY0FBYixDQUE0QkMsV0FBaEQ7O0FBRUEsSUFBTUEsV0FBVyxHQUFHLFNBQWRBLFdBQWMsR0FBaUM7QUFBQSxNQUFoQzFJLEtBQWdDLHVFQUF4QndJLFdBQXdCO0FBQUEsTUFBWFgsTUFBVzs7QUFDbkQsVUFBUUEsTUFBTSxDQUFDMU0sSUFBZjtBQUNFLFNBQUtDLHlFQUFMO0FBQ0EsU0FBS0EseUVBQUw7QUFDQSxTQUFLQSwyRUFBTDtBQUNFLGFBQU95TSxNQUFNLENBQUN4TSxPQUFQLENBQWVzQixJQUF0Qjs7QUFFRixTQUFLdkIsMEVBQUw7QUFDRSxhQUFPb04sV0FBUDs7QUFFRjtBQUNFLGFBQU94SSxLQUFQO0FBVko7QUFZRCxDQWJEOztBQWVlMEksMEVBQWYsRTs7Ozs7Ozs7Ozs7O0FDckJBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFFQSxJQUFNQyxzQkFBc0IsR0FBRy9KLHNEQUFZLENBQUM2SixjQUFiLENBQTRCRyxlQUEzRDs7QUFFQSxJQUFNQSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLEdBQTRDO0FBQUEsTUFBM0M1SSxLQUEyQyx1RUFBbkMySSxzQkFBbUM7QUFBQSxNQUFYZCxNQUFXOztBQUNsRSxVQUFRQSxNQUFNLENBQUMxTSxJQUFmO0FBQ0UsU0FBS0MsNkVBQUw7QUFDQSxTQUFLQSwyRUFBTDtBQUNBLFNBQUtBLHlFQUFMO0FBQ0EsU0FBS0EseUVBQUw7QUFDRSxhQUFPLElBQVA7O0FBRUYsU0FBS0EsMEVBQUw7QUFDQSxTQUFLQSx5RUFBTDtBQUNFLGFBQU8sS0FBUDs7QUFFRjtBQUNFLGFBQU80RSxLQUFQO0FBWko7QUFjRCxDQWZEOztBQWlCZTRJLDhFQUFmLEU7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBRUEsSUFBTUMsWUFBWSxHQUFHakssc0RBQVksQ0FBQzZKLGNBQWIsQ0FBNEJLLFdBQWpEOztBQUVBLElBQU1BLFdBQVcsR0FBRyxTQUFkQSxXQUFjLEdBQWtDO0FBQUEsTUFBakM5SSxLQUFpQyx1RUFBekI2SSxZQUF5QjtBQUFBLE1BQVhoQixNQUFXOztBQUNwRCxVQUFRQSxNQUFNLENBQUMxTSxJQUFmO0FBQ0UsU0FBS0Msd0VBQUw7QUFDQSxTQUFLQSx5RUFBTDtBQUNBLFNBQUtBLHlFQUFMO0FBQ0EsU0FBS0EsMkVBQUw7QUFDQSxTQUFLQSwwRUFBTDtBQUNFLGFBQU8sSUFBUDs7QUFFRixTQUFLQSx1RUFBTDtBQUNFLGFBQU95TSxNQUFNLENBQUN4TSxPQUFkOztBQUVGO0FBQ0UsYUFBTzJFLEtBQVA7QUFaSjtBQWNELENBZkQ7O0FBaUJlOEksMEVBQWYsRTs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFFQSxJQUFNRCxZQUFZLEdBQUdqSyxzREFBWSxDQUFDNkosY0FBYixDQUE0Qk0sV0FBakQ7O0FBRUEsSUFBTUMsV0FBVyxHQUFHLFNBQWRBLFdBQWMsR0FBa0M7QUFBQSxNQUFqQ2hKLEtBQWlDLHVFQUF6QjZJLFlBQXlCO0FBQUEsTUFBWGhCLE1BQVc7O0FBQ3BELFVBQVFBLE1BQU0sQ0FBQzFNLElBQWY7QUFDRSxTQUFLQyx3RUFBTDtBQUNBLFNBQUtBLHlFQUFMO0FBQ0EsU0FBS0EseUVBQUw7QUFDQSxTQUFLQSwyRUFBTDtBQUNBLFNBQUtBLDBFQUFMO0FBQ0UsYUFBTyxJQUFQOztBQUVGLFNBQUtBLHVFQUFMO0FBQ0UsYUFBT3lNLE1BQU0sQ0FBQ3hNLE9BQWQ7O0FBRUY7QUFDRSxhQUFPMkUsS0FBUDtBQVpKO0FBY0QsQ0FmRDs7QUFpQmVnSiwwRUFBZixFOzs7Ozs7Ozs7Ozs7QUN2QkE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUVBLElBQU1DLFlBQVksR0FBR3JLLHNEQUFZLENBQUM2SixjQUFiLENBQTRCL0wsS0FBakQ7O0FBRUEsSUFBTUEsS0FBSyxHQUFHLFNBQVJBLEtBQVEsR0FBa0M7QUFBQSxNQUFqQ3NELEtBQWlDLHVFQUF6QmlKLFlBQXlCO0FBQUEsTUFBWHBCLE1BQVc7O0FBQzlDLFVBQVFBLE1BQU0sQ0FBQzFNLElBQWY7QUFDRSxTQUFLQyx5RUFBTDtBQUNBLFNBQUtBLHlFQUFMO0FBQ0EsU0FBS0EsMkVBQUw7QUFDRSxhQUFPeU0sTUFBTSxDQUFDeE0sT0FBUCxDQUFlcUIsS0FBdEI7O0FBRUYsU0FBS3RCLDBFQUFMO0FBQ0EsU0FBS0EseUVBQUw7QUFDRSxhQUFPNk4sWUFBUDs7QUFFRjtBQUNFLGFBQU9qSixLQUFQO0FBWEo7QUFhRCxDQWREOztBQWdCZXRELG9FQUFmLEU7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU0rTCxjQUFjLEdBQUdGLDZEQUFlLENBQUM7QUFDckNHLGFBQVcsRUFBWEEsNEVBRHFDO0FBRXJDRSxpQkFBZSxFQUFmQSxnRkFGcUM7QUFHckNsTSxPQUFLLEVBQUxBLHFFQUhxQztBQUlyQ29NLGFBQVcsRUFBWEEsNEVBSnFDO0FBS3JDQyxhQUFXLEVBQVhBLDRFQUFXQTtBQUwwQixDQUFELENBQXRDO0FBUWVOLDZFQUFmLEU7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFFQSxJQUFNUyxhQUFhLEdBQUd0SyxzREFBWSxDQUFDK0ksUUFBYixDQUFzQndCLGdCQUE1Qzs7QUFDQSxJQUFNQSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLEdBQW1DO0FBQUEsTUFBbENuSixLQUFrQyx1RUFBMUJrSixhQUEwQjtBQUFBLE1BQVhyQixNQUFXO0FBQzFELE1BQUl1QixJQUFJLEdBQUcsRUFBWDs7QUFDQSxVQUFRdkIsTUFBTSxDQUFDMU0sSUFBZjtBQUNFLFNBQUtDLG1FQUFMO0FBQ0EsU0FBS0EsMkVBQUw7QUFDRWdPLFVBQUksR0FBR2hLLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JXLEtBQWxCLENBQVA7QUFDQW9KLFVBQUksQ0FBQ3ZCLE1BQU0sQ0FBQ3hNLE9BQVAsQ0FBZWEsS0FBaEIsQ0FBSixHQUE2QjJMLE1BQU0sQ0FBQ3hNLE9BQVAsQ0FBZUksS0FBNUM7QUFDQSxhQUFPMk4sSUFBUDs7QUFFRixTQUFLaE8sdUVBQUw7QUFDQSxTQUFLQSwwRUFBTDtBQUNFZ08sVUFBSSxHQUFHaEssTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQlcsS0FBbEIsQ0FBUDtBQUNBLGFBQU9vSixJQUFJLENBQUN2QixNQUFNLENBQUN4TSxPQUFQLENBQWVhLEtBQWhCLENBQVg7QUFDQSxhQUFPa04sSUFBUDs7QUFFRjtBQUNFLGFBQU9wSixLQUFQO0FBZEo7QUFnQkQsQ0FsQkQ7O0FBb0JlbUosK0VBQWYsRTs7Ozs7Ozs7Ozs7O0FDekJBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQSxJQUFNRSxrQkFBa0IsR0FBR3pLLHNEQUFZLENBQUMrSSxRQUFiLENBQXNCMkIsV0FBakQ7O0FBQ0EsSUFBTUEsV0FBVyxHQUFHLFNBQWRBLFdBQWMsR0FBd0M7QUFBQSxNQUF2Q3RKLEtBQXVDLHVFQUEvQnFKLGtCQUErQjtBQUFBLE1BQVh4QixNQUFXO0FBQzFELE1BQUl1QixJQUFJLEdBQUcsRUFBWDs7QUFDQSxVQUFRdkIsTUFBTSxDQUFDMU0sSUFBZjtBQUNFLFNBQUtDLHVFQUFMO0FBQ0VnTyxVQUFJLEdBQUdoSyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCVyxLQUFsQixDQUFQO0FBQ0FvSixVQUFJLENBQUN2QixNQUFNLENBQUN4TSxPQUFQLENBQWVhLEtBQWhCLENBQUosR0FBNkIsSUFBN0I7QUFDQSxhQUFPa04sSUFBUDs7QUFFRixTQUFLaE8sb0VBQUw7QUFDQSxTQUFLQSwyRUFBTDtBQUNBLFNBQUtBLDBFQUFMO0FBQ0VnTyxVQUFJLEdBQUdoSyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCVyxLQUFsQixDQUFQO0FBQ0EsYUFBT29KLElBQUksQ0FBQ3ZCLE1BQU0sQ0FBQ3hNLE9BQVAsQ0FBZWEsS0FBaEIsQ0FBWDtBQUNBLGFBQU9rTixJQUFQOztBQUVGO0FBQ0UsYUFBT3BKLEtBQVA7QUFkSjtBQWdCRCxDQWxCRDs7QUFvQmVzSiwwRUFBZixFOzs7Ozs7Ozs7Ozs7QUN4QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFFQSxJQUFNM0IsUUFBUSxHQUFHWSw2REFBZSxDQUFDO0FBQy9CZSxhQUFXLEVBQVhBLHFFQUQrQjtBQUUvQkgsa0JBQWdCLEVBQWhCQSwyRUFBZ0JBO0FBRmUsQ0FBRCxDQUFoQztBQUtleEIsdUVBQWYsRTs7Ozs7Ozs7Ozs7O0FDVkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1yQyxRQUFRLEdBQUdpRCw2REFBZSxDQUFDO0FBQy9CTCxhQUFXLEVBQVhBLDREQUQrQjtBQUUvQk8sZ0JBQWMsRUFBZEEsK0RBRitCO0FBRy9CZCxVQUFRLEVBQVJBLHlEQUgrQjtBQUkvQi9ELFdBQVMsRUFBVEEsMERBQVNBO0FBSnNCLENBQUQsQ0FBaEM7QUFPZTBCLHVFQUFmLEU7Ozs7Ozs7Ozs7OztBQ2RBO0FBQUE7QUFFQSxJQUFNMUcsWUFBWSxHQUFHO0FBQ25Cc0osYUFBVyxFQUFFO0FBQ1hoTixjQUFVLEVBQUUsSUFERDtBQUVYaU4sY0FBVSxFQUFFLEtBRkQ7QUFHWEcsZ0JBQVksRUFBRTtBQUhILEdBRE07QUFNbkJHLGdCQUFjLEVBQUU7QUFDZEcsbUJBQWUsRUFBRSxLQURIO0FBRWRGLGVBQVcsRUFBRSxJQUZDO0FBR2RoTSxTQUFLLEVBQUUsSUFITztBQUlkb00sZUFBVyxFQUFFLElBSkM7QUFLZEMsZUFBVyxFQUFFO0FBTEMsR0FORztBQWFuQnBCLFVBQVEsRUFBRTtBQUNSMkIsZUFBVyxFQUFFLEVBREw7QUFFUkgsb0JBQWdCLEVBQUU7QUFGVixHQWJTO0FBaUJuQnZGLFdBQVMsRUFBRTtBQWpCUSxDQUFyQjtBQW9CZWhGLDJFQUFmLEU7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUFBO0FBQUE7QUFBQTtBQUVBOztBQUVBLElBQU1nRixTQUFTLEdBQUcsU0FBWkEsU0FBWSxHQUE0QztBQUFBLE1BQTNDNUQsS0FBMkMsdUVBQW5DcEIsc0RBQVksQ0FBQ2dGLFNBQXNCO0FBQUEsTUFBWGlFLE1BQVc7QUFDNUQsTUFBSXVCLElBQUksR0FBRyxFQUFYOztBQUNBLFVBQVF2QixNQUFNLENBQUMxTSxJQUFmO0FBQ0UsU0FBS0MsNkVBQUw7QUFDQSxTQUFLQSw0RUFBTDtBQUNFO0FBQ0FnTyxVQUFJLEdBQUdoSyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCVyxLQUFsQixDQUFQO0FBQ0FvSixVQUFJLENBQUN2QixNQUFNLENBQUN4TSxPQUFQLENBQWVhLEtBQWhCLENBQUosR0FBNkIyTCxNQUFNLENBQUN4TSxPQUFQLENBQWV1SSxTQUE1QztBQUNBLGFBQU93RixJQUFQOztBQUVGLFNBQUtoTyxvRUFBTDtBQUNBLFNBQUtBLDJFQUFMO0FBQ0EsU0FBS0EsMEVBQUw7QUFDRWdPLFVBQUksR0FBR2hLLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JXLEtBQWxCLENBQVA7QUFDQSxhQUFPb0osSUFBSSxDQUFDdkIsTUFBTSxDQUFDeE0sT0FBUCxDQUFlYSxLQUFoQixDQUFYO0FBQ0EsYUFBT2tOLElBQVA7O0FBRUY7QUFDRSxhQUFPcEosS0FBUDtBQWhCSjtBQWtCRCxDQXBCRDs7QUFzQmU0RCx3RUFBZixFOzs7Ozs7Ozs7Ozs7QUMxQkE7QUFBQSxJQUFNN0UsTUFBTSxHQUFHO0FBQ2IxQyxNQUFJLEVBQUU7QUFDSjRELGVBQVcsRUFBRSxPQURUO0FBRUpDLGlCQUFhLEVBQUU7QUFDYi9FLFVBQUksRUFBRSxNQURPO0FBRWJvTyxpQkFBVyxFQUFFO0FBRkEsS0FGWDtBQU1KN0osU0FBSyxFQUFFLElBTkg7QUFPSkMsU0FBSyxFQUFFLEtBUEg7QUFRSkUsbUJBQWUsRUFBRTtBQUNmMkosY0FBUSxFQUFFO0FBREssS0FSYjtBQVdKMUosV0FBTyxFQUFFO0FBWEwsR0FETztBQWNieEQsVUFBUSxFQUFFO0FBQ1IyRCxlQUFXLEVBQUUsT0FETDtBQUVSQyxpQkFBYSxFQUFFO0FBQ2IvRSxVQUFJLEVBQUUsVUFETztBQUVib08saUJBQVcsRUFBRTtBQUZBLEtBRlA7QUFNUjdKLFNBQUssRUFBRSxJQU5DO0FBT1JDLFNBQUssRUFBRSxLQVBDO0FBUVJFLG1CQUFlLEVBQUU7QUFDZjRKLGVBQVMsRUFBRTtBQURJLEtBUlQ7QUFXUjNKLFdBQU8sRUFBRTtBQVhEO0FBZEcsQ0FBZjtBQTZCZWYscUVBQWYsRTs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQUEsSUFBTUEsTUFBTSxHQUFHO0FBQ2IxQyxNQUFJLEVBQUU7QUFDSjRELGVBQVcsRUFBRSxPQURUO0FBRUpDLGlCQUFhLEVBQUU7QUFDYi9FLFVBQUksRUFBRSxNQURPO0FBRWJvTyxpQkFBVyxFQUFFO0FBRkEsS0FGWDtBQU1KN0osU0FBSyxFQUFFLElBTkg7QUFPSkMsU0FBSyxFQUFFLEtBUEg7QUFRSkUsbUJBQWUsRUFBRTtBQUNmMkosY0FBUSxFQUFFO0FBREssS0FSYjtBQVdKMUosV0FBTyxFQUFFO0FBWEwsR0FETztBQWNiN0MsT0FBSyxFQUFFO0FBQ0xnRCxlQUFXLEVBQUUsT0FEUjtBQUVMQyxpQkFBYSxFQUFFO0FBQ2IvRSxVQUFJLEVBQUUsT0FETztBQUVib08saUJBQVcsRUFBRTtBQUZBLEtBRlY7QUFNTDdKLFNBQUssRUFBRSxJQU5GO0FBT0xDLFNBQUssRUFBRSxLQVBGO0FBUUxFLG1CQUFlLEVBQUU7QUFDZjZKLGFBQU8sRUFBRTtBQURNLEtBUlo7QUFXTDVKLFdBQU8sRUFBRTtBQVhKLEdBZE07QUEyQmJ4RCxVQUFRLEVBQUU7QUFDUjJELGVBQVcsRUFBRSxPQURMO0FBRVJDLGlCQUFhLEVBQUU7QUFDYi9FLFVBQUksRUFBRSxVQURPO0FBRWJvTyxpQkFBVyxFQUFFO0FBRkEsS0FGUDtBQU1SN0osU0FBSyxFQUFFLElBTkM7QUFPUkMsU0FBSyxFQUFFLEtBUEM7QUFRUkUsbUJBQWUsRUFBRTtBQUNmNEosZUFBUyxFQUFFO0FBREksS0FSVDtBQVdSM0osV0FBTyxFQUFFO0FBWEQ7QUEzQkcsQ0FBZjtBQTBDZWYscUVBQWYsRTs7Ozs7Ozs7Ozs7O0FDMUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7O0FBRUEsSUFBTTRLLFdBQVcsR0FBRyxTQUFkQSxXQUFjO0FBQUEsU0FBTztBQUN6QkMsV0FBTyxFQUFFO0FBQ1BDLFlBQU0sRUFBRSxrQkFERDtBQUVQLHNCQUFnQixrQkFGVDtBQUdQQyxtQkFBYSxtQkFBWWxOLDhEQUFXLENBQUN1SyxTQUFaLEVBQVo7QUFITixLQURnQjtBQU16QjRDLGVBQVcsRUFBRTtBQU5ZLEdBQVA7QUFBQSxDQUFwQjs7QUFTQSxJQUFNeE4sR0FBRyxHQUFHO0FBQ1ZDLFFBQU0sRUFBRSxnQkFBQXNLLE1BQU07QUFBQSxXQUFJa0QsNENBQUssQ0FBQ0MsSUFBTixXQUFjeEYsdURBQWQsc0JBQXlDO0FBQUV5RixhQUFPLEVBQUVwRDtBQUFYLEtBQXpDLENBQUo7QUFBQSxHQURKO0FBRVY1SixRQUFNLEVBQUUsZ0JBQUE0SixNQUFNO0FBQUEsV0FBSWtELDRDQUFLLENBQUNDLElBQU4sV0FBY3hGLHVEQUFkLHFCQUF3QztBQUFFOUgsVUFBSSxFQUFFbUs7QUFBUixLQUF4QyxDQUFKO0FBQUEsR0FGSjtBQUdWckosY0FBWSxFQUFFLHNCQUFBZixLQUFLO0FBQUEsV0FDakJzTiw0Q0FBSyxDQUFDRyxLQUFOLFdBQ0sxRix1REFETCw4QkFFRTtBQUFFeUYsYUFBTyxFQUFFO0FBQUV4TixhQUFLLEVBQUxBO0FBQUY7QUFBWCxLQUZGLEVBR0VpTixXQUFXLEVBSGIsQ0FEaUI7QUFBQSxHQUhUO0FBVVZ2TSxTQUFPLEVBQUU7QUFBQSxXQUFNNE0sNENBQUssQ0FBQ0ksTUFBTixXQUFnQjNGLHVEQUFoQixzQkFBMkNrRixXQUFXLEVBQXRELENBQU47QUFBQTtBQVZDLENBQVo7QUFhZXBOLGtFQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JBO0FBQ0E7SUFFTUssVzs7Ozs7cUNBQ1E7QUFBQSxXQUFNeU4sWUFBWSxDQUFDQyxPQUFiLENBQXFCLHdCQUFyQixDQUFOO0FBQUEsRzs7cUNBQ0EsVUFBQTVOLEtBQUs7QUFBQSxXQUFJMk4sWUFBWSxDQUFDRSxPQUFiLENBQXFCLHdCQUFyQixFQUErQzdOLEtBQS9DLENBQUo7QUFBQSxHOzt1Q0FDSDtBQUFBLFdBQU0yTixZQUFZLENBQUNHLFVBQWIsQ0FBd0Isd0JBQXhCLENBQU47QUFBQSxHOzt3Q0FDQztBQUFBLFdBQU0sS0FBSSxDQUFDM04sU0FBTCxDQUFlLEtBQUksQ0FBQ3NLLFNBQUwsRUFBZixDQUFOO0FBQUEsRzs7c0NBQ0Y7QUFBQSxXQUFNLENBQUMsQ0FBQyxLQUFJLENBQUNBLFNBQUwsRUFBUjtBQUFBLEc7OztBQUdBLG1FQUFJdkssV0FBSixFQUFmLEU7Ozs7Ozs7Ozs7OztBQ1hBO0FBQUE7QUFBQTtBQUFBLElBQU02TixZQUFZLEdBQUcsRUFBckI7QUFFTyxJQUFNL0csZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFDZ0gsU0FBRCxFQUFlO0FBQzVDLE1BQU1DLElBQUksR0FBRyxJQUFJQyxJQUFKLENBQVNGLFNBQVQsQ0FBYjtBQUNBLE1BQU1HLFVBQVUsR0FBR0YsSUFBSSxDQUFDRyxrQkFBTCxFQUFuQjtBQUNBLFNBQU9ELFVBQVUsQ0FBQzlDLEtBQVgsQ0FBaUIsR0FBakIsRUFBc0JnRCxLQUF0QixDQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQ3ZJLElBQWxDLENBQXVDLEdBQXZDLENBQVA7QUFDRCxDQUpNO0FBTUEsSUFBTXdJLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUM3SCxJQUFELEVBQVU7QUFDaEMsTUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDWCxNQUFJQSxJQUFJLENBQUMvQyxNQUFMLElBQWVxSyxZQUFuQixFQUFpQyxPQUFPdEgsSUFBUDtBQUNqQyxtQkFBVUEsSUFBSSxDQUFDOEgsU0FBTCxDQUFlLENBQWYsRUFBa0JSLFlBQVksR0FBRyxDQUFqQyxDQUFWO0FBQ0QsQ0FKTSxDOzs7Ozs7Ozs7Ozs7QUNSUDtBQUFBO0FBQ0EsSUFBTVMsZ0JBQWdCLEdBQUcsb0RBQXpCOztBQUNBLElBQU1DLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBdUIsQ0FBQUMsR0FBRztBQUFBLFNBQUlGLGdCQUFnQixDQUFDRyxJQUFqQixDQUFzQkQsR0FBdEIsQ0FBSjtBQUFBLENBQWhDLEMsQ0FDQTs7O0FBQ0EsSUFBTUUsVUFBVSxHQUFHLDJKQUFuQjs7QUFDQSxJQUFNQyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUFILEdBQUc7QUFBQSxTQUFJRSxVQUFVLENBQUNELElBQVgsQ0FBZ0JELEdBQWhCLENBQUo7QUFBQSxDQUExQjs7QUFDQSxJQUFNSSxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLENBQUNKLEdBQUQsRUFBTTNCLFNBQU47QUFBQSxTQUFvQjJCLEdBQUcsQ0FBQ2hMLE1BQUosSUFBY3FKLFNBQWxDO0FBQUEsQ0FBM0I7O0FBQ0EsSUFBTWdDLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsQ0FBQ0wsR0FBRCxFQUFNTSxTQUFOO0FBQUEsU0FBb0JOLEdBQUcsQ0FBQ2hMLE1BQUosSUFBY3NMLFNBQWxDO0FBQUEsQ0FBM0I7O0FBQ0EsSUFBTUMsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFDUCxHQUFELEVBQU1RLFNBQU47QUFBQSxTQUFvQlIsR0FBRyxDQUFDaEwsTUFBSixLQUFld0wsU0FBbkM7QUFBQSxDQUExQjs7QUFDQSxJQUFNQyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUFULEdBQUc7QUFBQSxTQUFJQSxHQUFHLENBQUNVLElBQUosT0FBZSxFQUFuQjtBQUFBLENBQTdCO0FBRUE7OztBQUNBLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNYLEdBQUQsRUFBTVksS0FBTixFQUFnQjtBQUNqQyxNQUFJQyxPQUFPLEdBQUcsSUFBZCxDQURpQyxDQUVqQztBQUNBOztBQUNBLE9BQUssSUFBTUMsSUFBWCxJQUFtQkYsS0FBbkIsRUFBMEI7QUFDeEIsUUFBSSxHQUFHRyxjQUFILENBQWtCQyxJQUFsQixDQUF1QkosS0FBdkIsRUFBOEJFLElBQTlCLENBQUosRUFBeUM7QUFDdkMsY0FBUUEsSUFBUjtBQUNFLGFBQUssZUFBTDtBQUNFRCxpQkFBTyxHQUFHQSxPQUFPLElBQUlkLG9CQUFvQixDQUFDQyxHQUFELENBQXpDO0FBQ0E7O0FBQ0YsYUFBSyxTQUFMO0FBQ0VhLGlCQUFPLEdBQUdBLE9BQU8sSUFBSVYsY0FBYyxDQUFDSCxHQUFELENBQW5DO0FBQ0E7O0FBQ0YsYUFBSyxXQUFMO0FBQ0VhLGlCQUFPLEdBQUdBLE9BQU8sSUFBSVQsa0JBQWtCLENBQUNKLEdBQUQsRUFBTVksS0FBSyxDQUFDRSxJQUFELENBQVgsQ0FBdkM7QUFDQTs7QUFDRixhQUFLLFdBQUw7QUFDRUQsaUJBQU8sR0FBR0EsT0FBTyxJQUFJUixrQkFBa0IsQ0FBQ0wsR0FBRCxFQUFNWSxLQUFLLENBQUNFLElBQUQsQ0FBWCxDQUF2QztBQUNBOztBQUNGLGFBQUssVUFBTDtBQUNFRCxpQkFBTyxHQUFHQSxPQUFPLElBQUlOLGlCQUFpQixDQUFDUCxHQUFELEVBQU1ZLEtBQUssQ0FBQ0UsSUFBRCxDQUFYLENBQXRDO0FBQ0E7O0FBQ0YsYUFBSyxVQUFMO0FBQ0VELGlCQUFPLEdBQUdBLE9BQU8sSUFBSUosaUJBQWlCLENBQUNULEdBQUQsQ0FBdEM7QUFDQTs7QUFDRjtBQUNFYSxpQkFBTyxHQUFHLElBQVY7QUFwQko7QUFzQkQ7QUFDRjs7QUFFRCxTQUFPQSxPQUFQO0FBQ0QsQ0FoQ0Q7QUFpQ0E7OztBQUVlRix5RUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBT0E7QUFJQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNOU4sU0FBUyxHQUFHO0FBQ2hCaEQsV0FBUyxFQUFFaUQsaURBQVMsQ0FBQ0csSUFBVixDQUFlRCxVQURWO0FBRWhCaEMsWUFBVSxFQUFFOEIsaURBQVMsQ0FBQ0csSUFBVixDQUFlRCxVQUZYO0FBR2hCOUMsa0JBQWdCLEVBQUU0QyxpREFBUyxDQUFDRyxJQUFWLENBQWVELFVBSGpCO0FBSWhCcEIsWUFBVSxFQUFFa0IsaURBQVMsQ0FBQ0csSUFBVixDQUFlRCxVQUpYO0FBS2hCN0Msa0JBQWdCLEVBQUUyQyxpREFBUyxDQUFDRyxJQUFWLENBQWVELFVBTGpCO0FBTWhCakIsYUFBVyxFQUFFZSxpREFBUyxDQUFDRyxJQUFWLENBQWVELFVBTlo7QUFPaEJWLGFBQVcsRUFBRVEsaURBQVMsQ0FBQ0csSUFBVixDQUFlRCxVQVBaO0FBUWhCVCxjQUFZLEVBQUVPLGlEQUFTLENBQUNHLElBQVYsQ0FBZUQsVUFSYjtBQVNoQjtBQUNBOEosYUFBVyxFQUFFaEssaURBQVMsQ0FBQ1MsTUFBVixDQUFpQlAsVUFWZDtBQVdoQnFLLGdCQUFjLEVBQUV2SyxpREFBUyxDQUFDUyxNQUFWLENBQWlCUCxVQVhqQjtBQVloQnVKLFVBQVEsRUFBRXpKLGlEQUFTLENBQUNTLE1BQVYsQ0FBaUJQLFVBWlg7QUFhaEJ3RixXQUFTLEVBQUUxRixpREFBUyxDQUFDUyxNQUFWLENBQWlCUDtBQWJaLENBQWxCOztJQWdCTWlPLEc7Ozs7Ozs7Ozs7Ozs7Ozs7OztvRkFHSTtBQUNOQyxjQUFRLEVBQUU7QUFESixLOzs4RkFTVSxZQUFNO0FBQUEsVUFDZEEsUUFEYyxHQUNELE1BQUt0TSxLQURKLENBQ2RzTSxRQURjO0FBRXRCLFVBQU1DLFdBQVcsR0FBR0QsUUFBUSxLQUFLLFNBQWIsR0FBeUIsU0FBekIsR0FBcUMsU0FBekQ7O0FBQ0EsWUFBS3BMLFFBQUwsQ0FBYztBQUFDb0wsZ0JBQVEsRUFBRUM7QUFBWCxPQUFkO0FBQ0QsSzs7MkZBRWMsWUFBTTtBQUFBLHdCQUNxQixNQUFLck4sS0FEMUI7QUFBQSxVQUNYdUosY0FEVyxlQUNYQSxjQURXO0FBQUEsVUFDS3RMLFdBREwsZUFDS0EsV0FETDtBQUFBLFVBRVh1TCxXQUZXLEdBRUtELGNBRkwsQ0FFWEMsV0FGVztBQUduQnZMLGlCQUFXLENBQUN1TCxXQUFXLENBQUM1TCxFQUFiLENBQVg7QUFDRCxLOztrR0FFcUIsVUFBQ1osS0FBRCxFQUFXO0FBQUEsVUFDdkJ5TCxRQUR1QixHQUNWLE1BQUt6SSxLQURLLENBQ3ZCeUksUUFEdUI7QUFBQSxVQUV2QjJCLFdBRnVCLEdBRVAzQixRQUZPLENBRXZCMkIsV0FGdUI7QUFHL0IsYUFBT0EsV0FBVyxDQUFDNkMsY0FBWixDQUEyQmpRLEtBQTNCLENBQVA7QUFDRCxLOzsrRkFFa0IsWUFBTTtBQUFBLFVBQ2YwSCxTQURlLEdBQ0QsTUFBSzFFLEtBREosQ0FDZjBFLFNBRGU7QUFFdkIsVUFBTTRJLFlBQVksR0FBR3BOLE1BQU0sQ0FBQ0UsSUFBUCxDQUFZc0UsU0FBWixDQUFyQjs7QUFDQSxVQUFJLENBQUNBLFNBQUQsSUFBYzRJLFlBQVksQ0FBQ3BNLE1BQWIsR0FBc0IsQ0FBeEMsRUFBMkM7QUFBRTtBQUFTOztBQUFBO0FBQ3RELGFBQ0Usd0VBQ0UsbUZBREYsRUFFRSx1RUFDR29NLFlBQVksQ0FBQ3BMLEdBQWIsQ0FBaUIsVUFBQTVCLEdBQUc7QUFBQSxlQUNuQjtBQUFJLGFBQUcsc0JBQWVBLEdBQWY7QUFBUCxXQUNHQSxHQURILEVBRUUsMkRBQUMsNEVBQUQ7QUFBYyxtQkFBUyxFQUFFb0UsU0FBUyxDQUFDcEUsR0FBRDtBQUFsQyxVQUZGLENBRG1CO0FBQUEsT0FBcEIsQ0FESCxDQUZGLENBREY7QUFhRCxLOzs7Ozs7O3dDQXhDbUI7QUFDbEI7QUFDQSxXQUFLTixLQUFMLENBQVdqRSxTQUFYLENBQXFCMlAsSUFBSSxDQUFDNkIsR0FBTCxFQUFyQjtBQUNEOzs7NkJBdUNRO0FBQUEseUJBY0gsS0FBS3ZOLEtBZEY7QUFBQSxVQUVMZ0osV0FGSyxnQkFFTEEsV0FGSztBQUFBLFVBR0xPLGNBSEssZ0JBR0xBLGNBSEs7QUFBQSxVQUlMZCxRQUpLLGdCQUlMQSxRQUpLO0FBQUEsVUFLTG1CLFdBTEssZ0JBS0xBLFdBTEs7QUFBQSxVQU1MQyxXQU5LLGdCQU1MQSxXQU5LO0FBQUEsVUFRTDNNLFVBUkssZ0JBUUxBLFVBUks7QUFBQSxVQVNMZCxnQkFUSyxnQkFTTEEsZ0JBVEs7QUFBQSxVQVVMMEIsVUFWSyxnQkFVTEEsVUFWSztBQUFBLFVBV0x6QixnQkFYSyxnQkFXTEEsZ0JBWEs7QUFBQSxVQVlMbUMsV0FaSyxnQkFZTEEsV0FaSztBQUFBLFVBYUxDLFlBYkssZ0JBYUxBLFlBYks7QUFBQSxVQWVDd0ssVUFmRCxHQWVnQkQsV0FmaEIsQ0FlQ0MsVUFmRDtBQUFBLFVBZ0JDUyxlQWhCRCxHQWdCcUJILGNBaEJyQixDQWdCQ0csZUFoQkQ7QUFBQSxVQWtCQzBELFFBbEJELEdBa0JjLEtBQUt0TSxLQWxCbkIsQ0FrQkNzTSxRQWxCRCxFQW9CUDs7QUFDQSxVQUFNSSxrQkFBa0IsR0FBR3ROLE1BQU0sQ0FBQ0MsTUFBUCxDQUN6QixFQUR5QixFQUNyQjZJLFdBRHFCLEVBRXpCO0FBQUNoTixrQkFBVSxFQUFFd0ksd0VBQWUsQ0FBQ3dFLFdBQVcsQ0FBQ2hOLFVBQWI7QUFBNUIsT0FGeUIsQ0FBM0I7QUFJQSxVQUFNeVIsaUJBQWlCLEdBQUd2TixNQUFNLENBQUNDLE1BQVAsQ0FDeEIsRUFEd0IsRUFDcEJvSixjQURvQixFQUV4QjtBQUFDL0wsYUFBSyxFQUFFc08saUVBQVEsQ0FBQ3ZDLGNBQWMsQ0FBQy9MLEtBQWhCO0FBQWhCLE9BRndCLENBQTFCO0FBS0EsYUFDRSx5RUFDRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNFLGlHQURGLEVBRUl5TCxVQUFVLElBQUksMkRBQUMsZ0VBQUQ7QUFBYSxnQkFBUSxFQUFFLEdBQXZCO0FBQTRCLFlBQUksRUFBRTtBQUFsQyxRQUZsQixDQURGLEVBS0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FDRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNFO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FDRSx3RUFDRSxxRkFERixFQUVFLDJEQUFDLDhEQUFEO0FBQVksY0FBTSxFQUFFdUU7QUFBcEIsUUFGRixDQURGLEVBS0Usd0VBQ0Usd0ZBREYsRUFFRSwyREFBQyw4REFBRDtBQUFZLGNBQU0sRUFBRUM7QUFBcEIsUUFGRixDQUxGLEVBU0Usd0VBQ0Usa0ZBREYsRUFFRSwyREFBQyw4REFBRDtBQUFZLGNBQU0sRUFBRWhGLFFBQVEsQ0FBQzJCO0FBQTdCLFFBRkYsQ0FURixFQWFJLEtBQUtzRCxnQkFBTCxFQWJKLENBREYsQ0FERixFQWtCRTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUVJLENBQUVoRSxlQUFGLElBQXFCMEQsUUFBUSxLQUFLLFNBQWxDLElBQ0EsMkRBQUMsZ0VBQUQ7QUFDRSxrQkFBVSxFQUFFbFEsVUFEZDtBQUVFLHdCQUFnQixFQUFFZCxnQkFGcEI7QUFHRSxvQkFBWSxFQUFFd047QUFIaEIsUUFISixFQVVJLENBQUVGLGVBQUYsSUFBcUIwRCxRQUFRLEtBQUssU0FBbEMsSUFDQSwyREFBQyxnRUFBRDtBQUNFLGtCQUFVLEVBQUV0UCxVQURkO0FBRUUsd0JBQWdCLEVBQUV6QixnQkFGcEI7QUFHRSxvQkFBWSxFQUFFd047QUFIaEIsUUFYSixFQWtCSSxDQUFFSCxlQUFGLElBQ0E7QUFBUSxpQkFBUyxFQUFDLFFBQWxCO0FBQTJCLGVBQU8sRUFBRSxLQUFLaUU7QUFBekMsNEJBbkJKLEVBd0JJakUsZUFBZSxJQUNmO0FBQVEsaUJBQVMsRUFBQyxRQUFsQjtBQUEyQixlQUFPLEVBQUUsS0FBS2tFO0FBQXpDLG9CQXpCSixFQThCSWxFLGVBQWUsS0FDYixLQUFLbUUsbUJBQUwsQ0FBeUIsT0FBekIsSUFDRTtBQUNFLGlCQUFTLEVBQUMsUUFEWjtBQUVFLGVBQU8sRUFBRXBQLFlBQVksQ0FBQ3FQLElBQWIsQ0FBa0IsSUFBbEIsRUFBd0IsT0FBeEI7QUFGWCx1QkFERixHQU9FO0FBQ0UsaUJBQVMsRUFBQyxRQURaO0FBRUUsZUFBTyxFQUFFdFAsV0FBVyxDQUFDc1AsSUFBWixDQUFpQixJQUFqQixFQUF1QixPQUF2QjtBQUZYLHNCQVJXLENBOUJuQixDQWxCRixDQURGLENBTEYsQ0FERjtBQTRFRDs7OztFQTNKZW5MLCtDOztnQkFBWndLLEcsZUFDZXBPLFM7O0FBMkpwQjs7QUFFRCxJQUFNZ1AsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQjtBQUFBLE1BQ3RCL0UsV0FEc0IsUUFDdEJBLFdBRHNCO0FBQUEsTUFFdEJPLGNBRnNCLFFBRXRCQSxjQUZzQjtBQUFBLE1BR3RCZCxRQUhzQixRQUd0QkEsUUFIc0I7QUFBQSxNQUl0Qi9ELFNBSnNCLFFBSXRCQSxTQUpzQjtBQUFBLFNBS2pCO0FBQ0xzRSxlQUFXLEVBQVhBLFdBREs7QUFFTE8sa0JBQWMsRUFBZEEsY0FGSztBQUdMZCxZQUFRLEVBQVJBLFFBSEs7QUFJTC9ELGFBQVMsRUFBVEE7QUFKSyxHQUxpQjtBQUFBLENBQXhCOztBQVlBLElBQU1zSixrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLENBQUFsUixRQUFRO0FBQUEsU0FDakNtUixnRUFBa0IsQ0FBQztBQUNqQmxTLGFBQVMsRUFBVEEsc0VBRGlCO0FBRWpCbUIsY0FBVSxFQUFWQSwwRUFGaUI7QUFHakJkLG9CQUFnQixFQUFoQkEsZ0ZBSGlCO0FBSWpCMEIsY0FBVSxFQUFWQSwwRUFKaUI7QUFLakJ6QixvQkFBZ0IsRUFBaEJBLGdGQUxpQjtBQU1qQjRCLGVBQVcsRUFBWEEsMkVBTmlCO0FBT2pCTyxlQUFXLEVBQVhBLG9FQVBpQjtBQVFqQkMsZ0JBQVksRUFBWkEscUVBQVlBO0FBUkssR0FBRCxFQVNmM0IsUUFUZSxDQURlO0FBQUEsQ0FBbkM7O0FBYWVxTCwwSEFBTyxDQUFDNEYsZUFBRCxFQUFrQkMsa0JBQWxCLENBQVAsQ0FBNkNiLEdBQTdDLENBQWYsRSIsImZpbGUiOiJqcy9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCIyZDQ0ZmI3MTA1Njc5NDIxMzhhYlwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJidW5kbGVcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9zcmMvaW5kZXguanNcIixcInZlbmRvclwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7XG4gIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG52YXIgYnRvYSA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYnRvYSAmJiB3aW5kb3cuYnRvYS5iaW5kKHdpbmRvdykpIHx8IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idG9hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIGxvYWRFdmVudCA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICAgIHZhciB4RG9tYWluID0gZmFsc2U7XG5cbiAgICAvLyBGb3IgSUUgOC85IENPUlMgc3VwcG9ydFxuICAgIC8vIE9ubHkgc3VwcG9ydHMgUE9TVCBhbmQgR0VUIGNhbGxzIGFuZCBkb2Vzbid0IHJldHVybnMgdGhlIHJlc3BvbnNlIGhlYWRlcnMuXG4gICAgLy8gRE9OJ1QgZG8gdGhpcyBmb3IgdGVzdGluZyBiL2MgWE1MSHR0cFJlcXVlc3QgaXMgbW9ja2VkLCBub3QgWERvbWFpblJlcXVlc3QuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ICYmICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgICAgIWlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkge1xuICAgICAgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgIGxvYWRFdmVudCA9ICdvbmxvYWQnO1xuICAgICAgeERvbWFpbiA9IHRydWU7XG4gICAgICByZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcygpIHt9O1xuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge307XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdFtsb2FkRXZlbnRdID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0ICYmICF4RG9tYWluKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAvLyBJRSBzZW5kcyAxMjIzIGluc3RlYWQgb2YgMjA0IChodHRwczovL2dpdGh1Yi5jb20vYXhpb3MvYXhpb3MvaXNzdWVzLzIwMSlcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/ICdObyBDb250ZW50JyA6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xuXG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UodXRpbHMubWVyZ2UoZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLy4uL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gdXRpbHMubWVyZ2Uoe1xuICAgICAgdXJsOiBhcmd1bWVudHNbMF1cbiAgICB9LCBhcmd1bWVudHNbMV0pO1xuICB9XG5cbiAgY29uZmlnID0gdXRpbHMubWVyZ2UoZGVmYXVsdHMsIHttZXRob2Q6ICdnZXQnfSwgdGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuICBpZiAoY29uZmlnLmJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwoY29uZmlnLnVybCkpIHtcbiAgICBjb25maWcudXJsID0gY29tYmluZVVSTHMoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICB9XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICAvLyBOb3RlOiBzdGF0dXMgaXMgbm90IGV4cG9zZWQgYnkgWERvbWFpblJlcXVlc3RcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIGJ0b2EgcG9seWZpbGwgZm9yIElFPDEwIGNvdXJ0ZXN5IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGNoYW1iZXJzL0Jhc2U2NC5qc1xuXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuXG5mdW5jdGlvbiBFKCkge1xuICB0aGlzLm1lc3NhZ2UgPSAnU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyJztcbn1cbkUucHJvdG90eXBlID0gbmV3IEVycm9yO1xuRS5wcm90b3R5cGUuY29kZSA9IDU7XG5FLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cbmZ1bmN0aW9uIGJ0b2EoaW5wdXQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhpbnB1dCk7XG4gIHZhciBvdXRwdXQgPSAnJztcbiAgZm9yIChcbiAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlclxuICAgIHZhciBibG9jaywgY2hhckNvZGUsIGlkeCA9IDAsIG1hcCA9IGNoYXJzO1xuICAgIC8vIGlmIHRoZSBuZXh0IHN0ciBpbmRleCBkb2VzIG5vdCBleGlzdDpcbiAgICAvLyAgIGNoYW5nZSB0aGUgbWFwcGluZyB0YWJsZSB0byBcIj1cIlxuICAgIC8vICAgY2hlY2sgaWYgZCBoYXMgbm8gZnJhY3Rpb25hbCBkaWdpdHNcbiAgICBzdHIuY2hhckF0KGlkeCB8IDApIHx8IChtYXAgPSAnPScsIGlkeCAlIDEpO1xuICAgIC8vIFwiOCAtIGlkeCAlIDEgKiA4XCIgZ2VuZXJhdGVzIHRoZSBzZXF1ZW5jZSAyLCA0LCA2LCA4XG4gICAgb3V0cHV0ICs9IG1hcC5jaGFyQXQoNjMgJiBibG9jayA+PiA4IC0gaWR4ICUgMSAqIDgpXG4gICkge1xuICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaWR4ICs9IDMgLyA0KTtcbiAgICBpZiAoY2hhckNvZGUgPiAweEZGKSB7XG4gICAgICB0aHJvdyBuZXcgRSgpO1xuICAgIH1cbiAgICBibG9jayA9IGJsb2NrIDw8IDggfCBjaGFyQ29kZTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ0b2E7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICB9LFxuXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuIiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG4vLyBUaGUgX2lzQnVmZmVyIGNoZWNrIGlzIGZvciBTYWZhcmkgNS03IHN1cHBvcnQsIGJlY2F1c2UgaXQncyBtaXNzaW5nXG4vLyBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yLiBSZW1vdmUgdGhpcyBldmVudHVhbGx5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIChpc0J1ZmZlcihvYmopIHx8IGlzU2xvd0J1ZmZlcihvYmopIHx8ICEhb2JqLl9pc0J1ZmZlcilcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKG9iaikge1xuICByZXR1cm4gISFvYmouY29uc3RydWN0b3IgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuXG4vLyBGb3IgTm9kZSB2MC4xMCBzdXBwb3J0LiBSZW1vdmUgdGhpcyBldmVudHVhbGx5LlxuZnVuY3Rpb24gaXNTbG93QnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmoucmVhZEZsb2F0TEUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5zbGljZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpc0J1ZmZlcihvYmouc2xpY2UoMCwgMCkpXG59XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdCk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cy5QaG9lbml4PXQoKTplLlBob2VuaXg9dCgpfSh3aW5kb3csZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7dmFyIHQ9e307ZnVuY3Rpb24gbihpKXtpZih0W2ldKXJldHVybiB0W2ldLmV4cG9ydHM7dmFyIG89dFtpXT17aTppLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbaV0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsbiksby5sPSEwLG8uZXhwb3J0c31yZXR1cm4gbi5tPWUsbi5jPXQsbi5kPWZ1bmN0aW9uKGUsdCxpKXtuLm8oZSx0KXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6aX0pfSxuLnI9ZnVuY3Rpb24oZSl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLnRvU3RyaW5nVGFnJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOlwiTW9kdWxlXCJ9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX0sbi50PWZ1bmN0aW9uKGUsdCl7aWYoMSZ0JiYoZT1uKGUpKSw4JnQpcmV0dXJuIGU7aWYoNCZ0JiZcIm9iamVjdFwiPT10eXBlb2YgZSYmZSYmZS5fX2VzTW9kdWxlKXJldHVybiBlO3ZhciBpPU9iamVjdC5jcmVhdGUobnVsbCk7aWYobi5yKGkpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpLFwiZGVmYXVsdFwiLHtlbnVtZXJhYmxlOiEwLHZhbHVlOmV9KSwyJnQmJlwic3RyaW5nXCIhPXR5cGVvZiBlKWZvcih2YXIgbyBpbiBlKW4uZChpLG8sZnVuY3Rpb24odCl7cmV0dXJuIGVbdF19LmJpbmQobnVsbCxvKSk7cmV0dXJuIGl9LG4ubj1mdW5jdGlvbihlKXt2YXIgdD1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gbi5kKHQsXCJhXCIsdCksdH0sbi5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSxuLnA9XCJcIixuKG4ucz0wKX0oW2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24odCl7ZS5leHBvcnRzPXQuUGhvZW5peD1uKDIpfSkuY2FsbCh0aGlzLG4oMSkpfSxmdW5jdGlvbihlLHQpe3ZhciBuO249ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30oKTt0cnl7bj1ufHxGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCl8fCgwLGV2YWwpKFwidGhpc1wiKX1jYXRjaChlKXtcIm9iamVjdFwiPT10eXBlb2Ygd2luZG93JiYobj13aW5kb3cpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gaShlKXtyZXR1cm4gZnVuY3Rpb24oZSl7aWYoQXJyYXkuaXNBcnJheShlKSl7Zm9yKHZhciB0PTAsbj1uZXcgQXJyYXkoZS5sZW5ndGgpO3Q8ZS5sZW5ndGg7dCsrKW5bdF09ZVt0XTtyZXR1cm4gbn19KGUpfHxmdW5jdGlvbihlKXtpZihTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGUpfHxcIltvYmplY3QgQXJndW1lbnRzXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpKXJldHVybiBBcnJheS5mcm9tKGUpfShlKXx8ZnVuY3Rpb24oKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIil9KCl9ZnVuY3Rpb24gbyhlKXtyZXR1cm4obz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oZSl7cmV0dXJuIHR5cGVvZiBlfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBlfSkoZSl9ZnVuY3Rpb24gcihlLHQpe3JldHVybiBmdW5jdGlvbihlKXtpZihBcnJheS5pc0FycmF5KGUpKXJldHVybiBlfShlKXx8ZnVuY3Rpb24oZSx0KXt2YXIgbj1bXSxpPSEwLG89ITEscj12b2lkIDA7dHJ5e2Zvcih2YXIgcyxhPWVbU3ltYm9sLml0ZXJhdG9yXSgpOyEoaT0ocz1hLm5leHQoKSkuZG9uZSkmJihuLnB1c2gocy52YWx1ZSksIXR8fG4ubGVuZ3RoIT09dCk7aT0hMCk7fWNhdGNoKGUpe289ITAscj1lfWZpbmFsbHl7dHJ5e2l8fG51bGw9PWEucmV0dXJufHxhLnJldHVybigpfWZpbmFsbHl7aWYobyl0aHJvdyByfX1yZXR1cm4gbn0oZSx0KXx8ZnVuY3Rpb24oKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKX0oKX1mdW5jdGlvbiBzKGUsdCl7aWYoIShlIGluc3RhbmNlb2YgdCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX1mdW5jdGlvbiBhKGUsdCl7Zm9yKHZhciBuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciBpPXRbbl07aS5lbnVtZXJhYmxlPWkuZW51bWVyYWJsZXx8ITEsaS5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gaSYmKGkud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLGkua2V5LGkpfX1mdW5jdGlvbiBjKGUsdCxuKXtyZXR1cm4gdCYmYShlLnByb3RvdHlwZSx0KSxuJiZhKGUsbiksZX1uLnIodCksbi5kKHQsXCJDaGFubmVsXCIsZnVuY3Rpb24oKXtyZXR1cm4gZ30pLG4uZCh0LFwiU29ja2V0XCIsZnVuY3Rpb24oKXtyZXR1cm4gYn0pLG4uZCh0LFwiTG9uZ1BvbGxcIixmdW5jdGlvbigpe3JldHVybiBqfSksbi5kKHQsXCJBamF4XCIsZnVuY3Rpb24oKXtyZXR1cm4gUn0pLG4uZCh0LFwiUHJlc2VuY2VcIixmdW5jdGlvbigpe3JldHVybiBUfSk7dmFyIHU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjp3aW5kb3csaD17Y29ubmVjdGluZzowLG9wZW46MSxjbG9zaW5nOjIsY2xvc2VkOjN9LGw9MWU0LGY9e2Nsb3NlZDpcImNsb3NlZFwiLGVycm9yZWQ6XCJlcnJvcmVkXCIsam9pbmVkOlwiam9pbmVkXCIsam9pbmluZzpcImpvaW5pbmdcIixsZWF2aW5nOlwibGVhdmluZ1wifSxwPXtjbG9zZTpcInBoeF9jbG9zZVwiLGVycm9yOlwicGh4X2Vycm9yXCIsam9pbjpcInBoeF9qb2luXCIscmVwbHk6XCJwaHhfcmVwbHlcIixsZWF2ZTpcInBoeF9sZWF2ZVwifSxkPVtwLmNsb3NlLHAuZXJyb3IscC5qb2luLHAucmVwbHkscC5sZWF2ZV0sdj17bG9uZ3BvbGw6XCJsb25ncG9sbFwiLHdlYnNvY2tldDpcIndlYnNvY2tldFwifSx5PWZ1bmN0aW9uKGUpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGUpcmV0dXJuIGU7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGV9fSxtPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4saSxvKXtzKHRoaXMsZSksdGhpcy5jaGFubmVsPXQsdGhpcy5ldmVudD1uLHRoaXMucGF5bG9hZD1pfHxmdW5jdGlvbigpe3JldHVybnt9fSx0aGlzLnJlY2VpdmVkUmVzcD1udWxsLHRoaXMudGltZW91dD1vLHRoaXMudGltZW91dFRpbWVyPW51bGwsdGhpcy5yZWNIb29rcz1bXSx0aGlzLnNlbnQ9ITF9cmV0dXJuIGMoZSxbe2tleTpcInJlc2VuZFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMudGltZW91dD1lLHRoaXMucmVzZXQoKSx0aGlzLnNlbmQoKX19LHtrZXk6XCJzZW5kXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLmhhc1JlY2VpdmVkKFwidGltZW91dFwiKXx8KHRoaXMuc3RhcnRUaW1lb3V0KCksdGhpcy5zZW50PSEwLHRoaXMuY2hhbm5lbC5zb2NrZXQucHVzaCh7dG9waWM6dGhpcy5jaGFubmVsLnRvcGljLGV2ZW50OnRoaXMuZXZlbnQscGF5bG9hZDp0aGlzLnBheWxvYWQoKSxyZWY6dGhpcy5yZWYsam9pbl9yZWY6dGhpcy5jaGFubmVsLmpvaW5SZWYoKX0pKX19LHtrZXk6XCJyZWNlaXZlXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5oYXNSZWNlaXZlZChlKSYmdCh0aGlzLnJlY2VpdmVkUmVzcC5yZXNwb25zZSksdGhpcy5yZWNIb29rcy5wdXNoKHtzdGF0dXM6ZSxjYWxsYmFjazp0fSksdGhpc319LHtrZXk6XCJyZXNldFwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5jYW5jZWxSZWZFdmVudCgpLHRoaXMucmVmPW51bGwsdGhpcy5yZWZFdmVudD1udWxsLHRoaXMucmVjZWl2ZWRSZXNwPW51bGwsdGhpcy5zZW50PSExfX0se2tleTpcIm1hdGNoUmVjZWl2ZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PWUuc3RhdHVzLG49ZS5yZXNwb25zZTtlLnJlZjt0aGlzLnJlY0hvb2tzLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gZS5zdGF0dXM9PT10fSkuZm9yRWFjaChmdW5jdGlvbihlKXtyZXR1cm4gZS5jYWxsYmFjayhuKX0pfX0se2tleTpcImNhbmNlbFJlZkV2ZW50XCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLnJlZkV2ZW50JiZ0aGlzLmNoYW5uZWwub2ZmKHRoaXMucmVmRXZlbnQpfX0se2tleTpcImNhbmNlbFRpbWVvdXRcIix2YWx1ZTpmdW5jdGlvbigpe2NsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRUaW1lciksdGhpcy50aW1lb3V0VGltZXI9bnVsbH19LHtrZXk6XCJzdGFydFRpbWVvdXRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXM7dGhpcy50aW1lb3V0VGltZXImJnRoaXMuY2FuY2VsVGltZW91dCgpLHRoaXMucmVmPXRoaXMuY2hhbm5lbC5zb2NrZXQubWFrZVJlZigpLHRoaXMucmVmRXZlbnQ9dGhpcy5jaGFubmVsLnJlcGx5RXZlbnROYW1lKHRoaXMucmVmKSx0aGlzLmNoYW5uZWwub24odGhpcy5yZWZFdmVudCxmdW5jdGlvbih0KXtlLmNhbmNlbFJlZkV2ZW50KCksZS5jYW5jZWxUaW1lb3V0KCksZS5yZWNlaXZlZFJlc3A9dCxlLm1hdGNoUmVjZWl2ZSh0KX0pLHRoaXMudGltZW91dFRpbWVyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtlLnRyaWdnZXIoXCJ0aW1lb3V0XCIse30pfSx0aGlzLnRpbWVvdXQpfX0se2tleTpcImhhc1JlY2VpdmVkXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVjZWl2ZWRSZXNwJiZ0aGlzLnJlY2VpdmVkUmVzcC5zdGF0dXM9PT1lfX0se2tleTpcInRyaWdnZXJcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3RoaXMuY2hhbm5lbC50cmlnZ2VyKHRoaXMucmVmRXZlbnQse3N0YXR1czplLHJlc3BvbnNlOnR9KX19XSksZX0oKSxnPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4saSl7dmFyIG89dGhpcztzKHRoaXMsZSksdGhpcy5zdGF0ZT1mLmNsb3NlZCx0aGlzLnRvcGljPXQsdGhpcy5wYXJhbXM9eShufHx7fSksdGhpcy5zb2NrZXQ9aSx0aGlzLmJpbmRpbmdzPVtdLHRoaXMuYmluZGluZ1JlZj0wLHRoaXMudGltZW91dD10aGlzLnNvY2tldC50aW1lb3V0LHRoaXMuam9pbmVkT25jZT0hMSx0aGlzLmpvaW5QdXNoPW5ldyBtKHRoaXMscC5qb2luLHRoaXMucGFyYW1zLHRoaXMudGltZW91dCksdGhpcy5wdXNoQnVmZmVyPVtdLHRoaXMucmVqb2luVGltZXI9bmV3IEMoZnVuY3Rpb24oKXtyZXR1cm4gby5yZWpvaW5VbnRpbENvbm5lY3RlZCgpfSx0aGlzLnNvY2tldC5yZWNvbm5lY3RBZnRlck1zKSx0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJva1wiLGZ1bmN0aW9uKCl7by5zdGF0ZT1mLmpvaW5lZCxvLnJlam9pblRpbWVyLnJlc2V0KCksby5wdXNoQnVmZmVyLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGUuc2VuZCgpfSksby5wdXNoQnVmZmVyPVtdfSksdGhpcy5vbkNsb3NlKGZ1bmN0aW9uKCl7by5yZWpvaW5UaW1lci5yZXNldCgpLG8uc29ja2V0Lmhhc0xvZ2dlcigpJiZvLnNvY2tldC5sb2coXCJjaGFubmVsXCIsXCJjbG9zZSBcIi5jb25jYXQoby50b3BpYyxcIiBcIikuY29uY2F0KG8uam9pblJlZigpKSksby5zdGF0ZT1mLmNsb3NlZCxvLnNvY2tldC5yZW1vdmUobyl9KSx0aGlzLm9uRXJyb3IoZnVuY3Rpb24oZSl7by5pc0xlYXZpbmcoKXx8by5pc0Nsb3NlZCgpfHwoby5zb2NrZXQuaGFzTG9nZ2VyKCkmJm8uc29ja2V0LmxvZyhcImNoYW5uZWxcIixcImVycm9yIFwiLmNvbmNhdChvLnRvcGljKSxlKSxvLnN0YXRlPWYuZXJyb3JlZCxvLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpKX0pLHRoaXMuam9pblB1c2gucmVjZWl2ZShcInRpbWVvdXRcIixmdW5jdGlvbigpe28uaXNKb2luaW5nKCkmJihvLnNvY2tldC5oYXNMb2dnZXIoKSYmby5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLFwidGltZW91dCBcIi5jb25jYXQoby50b3BpYyxcIiAoXCIpLmNvbmNhdChvLmpvaW5SZWYoKSxcIilcIiksby5qb2luUHVzaC50aW1lb3V0KSxuZXcgbShvLHAubGVhdmUseSh7fSksby50aW1lb3V0KS5zZW5kKCksby5zdGF0ZT1mLmVycm9yZWQsby5qb2luUHVzaC5yZXNldCgpLG8ucmVqb2luVGltZXIuc2NoZWR1bGVUaW1lb3V0KCkpfSksdGhpcy5vbihwLnJlcGx5LGZ1bmN0aW9uKGUsdCl7by50cmlnZ2VyKG8ucmVwbHlFdmVudE5hbWUodCksZSl9KX1yZXR1cm4gYyhlLFt7a2V5OlwicmVqb2luVW50aWxDb25uZWN0ZWRcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMucmVqb2luVGltZXIuc2NoZWR1bGVUaW1lb3V0KCksdGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSYmdGhpcy5yZWpvaW4oKX19LHtrZXk6XCJqb2luXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06dGhpcy50aW1lb3V0O2lmKHRoaXMuam9pbmVkT25jZSl0aHJvd1widHJpZWQgdG8gam9pbiBtdWx0aXBsZSB0aW1lcy4gJ2pvaW4nIGNhbiBvbmx5IGJlIGNhbGxlZCBhIHNpbmdsZSB0aW1lIHBlciBjaGFubmVsIGluc3RhbmNlXCI7cmV0dXJuIHRoaXMuam9pbmVkT25jZT0hMCx0aGlzLnJlam9pbihlKSx0aGlzLmpvaW5QdXNofX0se2tleTpcIm9uQ2xvc2VcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLm9uKHAuY2xvc2UsZSl9fSx7a2V5Olwib25FcnJvclwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLm9uKHAuZXJyb3IsZnVuY3Rpb24odCl7cmV0dXJuIGUodCl9KX19LHtrZXk6XCJvblwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpcy5iaW5kaW5nUmVmKys7cmV0dXJuIHRoaXMuYmluZGluZ3MucHVzaCh7ZXZlbnQ6ZSxyZWY6bixjYWxsYmFjazp0fSksbn19LHtrZXk6XCJvZmZcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3RoaXMuYmluZGluZ3M9dGhpcy5iaW5kaW5ncy5maWx0ZXIoZnVuY3Rpb24obil7cmV0dXJuIShuLmV2ZW50PT09ZSYmKHZvaWQgMD09PXR8fHQ9PT1uLnJlZikpfSl9fSx7a2V5OlwiY2FuUHVzaFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkmJnRoaXMuaXNKb2luZWQoKX19LHtrZXk6XCJwdXNoXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06dGhpcy50aW1lb3V0O2lmKCF0aGlzLmpvaW5lZE9uY2UpdGhyb3dcInRyaWVkIHRvIHB1c2ggJ1wiLmNvbmNhdChlLFwiJyB0byAnXCIpLmNvbmNhdCh0aGlzLnRvcGljLFwiJyBiZWZvcmUgam9pbmluZy4gVXNlIGNoYW5uZWwuam9pbigpIGJlZm9yZSBwdXNoaW5nIGV2ZW50c1wiKTt2YXIgaT1uZXcgbSh0aGlzLGUsZnVuY3Rpb24oKXtyZXR1cm4gdH0sbik7cmV0dXJuIHRoaXMuY2FuUHVzaCgpP2kuc2VuZCgpOihpLnN0YXJ0VGltZW91dCgpLHRoaXMucHVzaEJ1ZmZlci5wdXNoKGkpKSxpfX0se2tleTpcImxlYXZlXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnRoaXMudGltZW91dDt0aGlzLnN0YXRlPWYubGVhdmluZzt2YXIgbj1mdW5jdGlvbigpe2Uuc29ja2V0Lmhhc0xvZ2dlcigpJiZlLnNvY2tldC5sb2coXCJjaGFubmVsXCIsXCJsZWF2ZSBcIi5jb25jYXQoZS50b3BpYykpLGUudHJpZ2dlcihwLmNsb3NlLFwibGVhdmVcIil9LGk9bmV3IG0odGhpcyxwLmxlYXZlLHkoe30pLHQpO3JldHVybiBpLnJlY2VpdmUoXCJva1wiLGZ1bmN0aW9uKCl7cmV0dXJuIG4oKX0pLnJlY2VpdmUoXCJ0aW1lb3V0XCIsZnVuY3Rpb24oKXtyZXR1cm4gbigpfSksaS5zZW5kKCksdGhpcy5jYW5QdXNoKCl8fGkudHJpZ2dlcihcIm9rXCIse30pLGl9fSx7a2V5Olwib25NZXNzYWdlXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4pe3JldHVybiB0fX0se2tleTpcImlzTGlmZWN5Y2xlRXZlbnRcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gZC5pbmRleE9mKGUpPj0wfX0se2tleTpcImlzTWVtYmVyXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4saSl7cmV0dXJuIHRoaXMudG9waWM9PT1lJiYoIWl8fGk9PT10aGlzLmpvaW5SZWYoKXx8IXRoaXMuaXNMaWZlY3ljbGVFdmVudCh0KXx8KHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpJiZ0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsXCJkcm9wcGluZyBvdXRkYXRlZCBtZXNzYWdlXCIse3RvcGljOmUsZXZlbnQ6dCxwYXlsb2FkOm4sam9pblJlZjppfSksITEpKX19LHtrZXk6XCJqb2luUmVmXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5qb2luUHVzaC5yZWZ9fSx7a2V5Olwic2VuZEpvaW5cIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLnN0YXRlPWYuam9pbmluZyx0aGlzLmpvaW5QdXNoLnJlc2VuZChlKX19LHtrZXk6XCJyZWpvaW5cIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp0aGlzLnRpbWVvdXQ7dGhpcy5pc0xlYXZpbmcoKXx8dGhpcy5zZW5kSm9pbihlKX19LHtrZXk6XCJ0cmlnZ2VyXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4saSl7dmFyIG89dGhpcy5vbk1lc3NhZ2UoZSx0LG4saSk7aWYodCYmIW8pdGhyb3dcImNoYW5uZWwgb25NZXNzYWdlIGNhbGxiYWNrcyBtdXN0IHJldHVybiB0aGUgcGF5bG9hZCwgbW9kaWZpZWQgb3IgdW5tb2RpZmllZFwiO2Zvcih2YXIgcj0wO3I8dGhpcy5iaW5kaW5ncy5sZW5ndGg7cisrKXt2YXIgcz10aGlzLmJpbmRpbmdzW3JdO3MuZXZlbnQ9PT1lJiZzLmNhbGxiYWNrKG8sbixpfHx0aGlzLmpvaW5SZWYoKSl9fX0se2tleTpcInJlcGx5RXZlbnROYW1lXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuXCJjaGFuX3JlcGx5X1wiLmNvbmNhdChlKX19LHtrZXk6XCJpc0Nsb3NlZFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc3RhdGU9PT1mLmNsb3NlZH19LHtrZXk6XCJpc0Vycm9yZWRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLnN0YXRlPT09Zi5lcnJvcmVkfX0se2tleTpcImlzSm9pbmVkXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zdGF0ZT09PWYuam9pbmVkfX0se2tleTpcImlzSm9pbmluZ1wiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc3RhdGU9PT1mLmpvaW5pbmd9fSx7a2V5OlwiaXNMZWF2aW5nXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zdGF0ZT09PWYubGVhdmluZ319XSksZX0oKSxrPXtlbmNvZGU6ZnVuY3Rpb24oZSx0KXt2YXIgbj1bZS5qb2luX3JlZixlLnJlZixlLnRvcGljLGUuZXZlbnQsZS5wYXlsb2FkXTtyZXR1cm4gdChKU09OLnN0cmluZ2lmeShuKSl9LGRlY29kZTpmdW5jdGlvbihlLHQpe3ZhciBuPXIoSlNPTi5wYXJzZShlKSw1KTtyZXR1cm4gdCh7am9pbl9yZWY6blswXSxyZWY6blsxXSx0b3BpYzpuWzJdLGV2ZW50Om5bM10scGF5bG9hZDpuWzRdfSl9fSxiPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0KXt2YXIgbj10aGlzLGk9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnt9O3ModGhpcyxlKSx0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzPXtvcGVuOltdLGNsb3NlOltdLGVycm9yOltdLG1lc3NhZ2U6W119LHRoaXMuY2hhbm5lbHM9W10sdGhpcy5zZW5kQnVmZmVyPVtdLHRoaXMucmVmPTAsdGhpcy50aW1lb3V0PWkudGltZW91dHx8bCx0aGlzLnRyYW5zcG9ydD1pLnRyYW5zcG9ydHx8dS5XZWJTb2NrZXR8fGosdGhpcy5kZWZhdWx0RW5jb2Rlcj1rLmVuY29kZSx0aGlzLmRlZmF1bHREZWNvZGVyPWsuZGVjb2RlLHRoaXMudHJhbnNwb3J0IT09aj8odGhpcy5lbmNvZGU9aS5lbmNvZGV8fHRoaXMuZGVmYXVsdEVuY29kZXIsdGhpcy5kZWNvZGU9aS5kZWNvZGV8fHRoaXMuZGVmYXVsdERlY29kZXIpOih0aGlzLmVuY29kZT10aGlzLmRlZmF1bHRFbmNvZGVyLHRoaXMuZGVjb2RlPXRoaXMuZGVmYXVsdERlY29kZXIpLHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcz1pLmhlYXJ0YmVhdEludGVydmFsTXN8fDNlNCx0aGlzLnJlY29ubmVjdEFmdGVyTXM9aS5yZWNvbm5lY3RBZnRlck1zfHxmdW5jdGlvbihlKXtyZXR1cm5bMWUzLDJlMyw1ZTMsMWU0XVtlLTFdfHwxZTR9LHRoaXMubG9nZ2VyPWkubG9nZ2VyfHxudWxsLHRoaXMubG9uZ3BvbGxlclRpbWVvdXQ9aS5sb25ncG9sbGVyVGltZW91dHx8MmU0LHRoaXMucGFyYW1zPXkoaS5wYXJhbXN8fHt9KSx0aGlzLmVuZFBvaW50PVwiXCIuY29uY2F0KHQsXCIvXCIpLmNvbmNhdCh2LndlYnNvY2tldCksdGhpcy5oZWFydGJlYXRUaW1lcj1udWxsLHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZj1udWxsLHRoaXMucmVjb25uZWN0VGltZXI9bmV3IEMoZnVuY3Rpb24oKXtuLnRlYXJkb3duKGZ1bmN0aW9uKCl7cmV0dXJuIG4uY29ubmVjdCgpfSl9LHRoaXMucmVjb25uZWN0QWZ0ZXJNcyl9cmV0dXJuIGMoZSxbe2tleTpcInByb3RvY29sXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gbG9jYXRpb24ucHJvdG9jb2wubWF0Y2goL15odHRwcy8pP1wid3NzXCI6XCJ3c1wifX0se2tleTpcImVuZFBvaW50VVJMXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1SLmFwcGVuZFBhcmFtcyhSLmFwcGVuZFBhcmFtcyh0aGlzLmVuZFBvaW50LHRoaXMucGFyYW1zKCkpLHt2c246XCIyLjAuMFwifSk7cmV0dXJuXCIvXCIhPT1lLmNoYXJBdCgwKT9lOlwiL1wiPT09ZS5jaGFyQXQoMSk/XCJcIi5jb25jYXQodGhpcy5wcm90b2NvbCgpLFwiOlwiKS5jb25jYXQoZSk6XCJcIi5jb25jYXQodGhpcy5wcm90b2NvbCgpLFwiOi8vXCIpLmNvbmNhdChsb2NhdGlvbi5ob3N0KS5jb25jYXQoZSl9fSx7a2V5OlwiZGlzY29ubmVjdFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXt0aGlzLnJlY29ubmVjdFRpbWVyLnJlc2V0KCksdGhpcy50ZWFyZG93bihlLHQsbil9fSx7a2V5OlwiY29ubmVjdFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7ZSYmKGNvbnNvbGUmJmNvbnNvbGUubG9nKFwicGFzc2luZyBwYXJhbXMgdG8gY29ubmVjdCBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkIHBhc3MgOnBhcmFtcyB0byB0aGUgU29ja2V0IGNvbnN0cnVjdG9yXCIpLHRoaXMucGFyYW1zPXkoZSkpLHRoaXMuY29ubnx8KHRoaXMuY29ubj1uZXcgdGhpcy50cmFuc3BvcnQodGhpcy5lbmRQb2ludFVSTCgpKSx0aGlzLmNvbm4udGltZW91dD10aGlzLmxvbmdwb2xsZXJUaW1lb3V0LHRoaXMuY29ubi5vbm9wZW49ZnVuY3Rpb24oKXtyZXR1cm4gdC5vbkNvbm5PcGVuKCl9LHRoaXMuY29ubi5vbmVycm9yPWZ1bmN0aW9uKGUpe3JldHVybiB0Lm9uQ29ubkVycm9yKGUpfSx0aGlzLmNvbm4ub25tZXNzYWdlPWZ1bmN0aW9uKGUpe3JldHVybiB0Lm9uQ29ubk1lc3NhZ2UoZSl9LHRoaXMuY29ubi5vbmNsb3NlPWZ1bmN0aW9uKGUpe3JldHVybiB0Lm9uQ29ubkNsb3NlKGUpfSl9fSx7a2V5OlwibG9nXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4pe3RoaXMubG9nZ2VyKGUsdCxuKX19LHtrZXk6XCJoYXNMb2dnZXJcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBudWxsIT09dGhpcy5sb2dnZXJ9fSx7a2V5Olwib25PcGVuXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5vcGVuLnB1c2goZSl9fSx7a2V5Olwib25DbG9zZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuY2xvc2UucHVzaChlKX19LHtrZXk6XCJvbkVycm9yXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5lcnJvci5wdXNoKGUpfX0se2tleTpcIm9uTWVzc2FnZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZS5wdXNoKGUpfX0se2tleTpcIm9uQ29ubk9wZW5cIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuaGFzTG9nZ2VyKCkmJnRoaXMubG9nKFwidHJhbnNwb3J0XCIsXCJjb25uZWN0ZWQgdG8gXCIuY29uY2F0KHRoaXMuZW5kUG9pbnRVUkwoKSkpLHRoaXMuZmx1c2hTZW5kQnVmZmVyKCksdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpLHRoaXMucmVzZXRIZWFydGJlYXQoKSx0aGlzLnJlc2V0Q2hhbm5lbFRpbWVycygpLHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mub3Blbi5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBlKCl9KX19LHtrZXk6XCJyZXNldEhlYXJ0YmVhdFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpczt0aGlzLmNvbm4uc2tpcEhlYXJ0YmVhdHx8KHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZj1udWxsLGNsZWFySW50ZXJ2YWwodGhpcy5oZWFydGJlYXRUaW1lciksdGhpcy5oZWFydGJlYXRUaW1lcj1zZXRJbnRlcnZhbChmdW5jdGlvbigpe3JldHVybiBlLnNlbmRIZWFydGJlYXQoKX0sdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zKSl9fSx7a2V5OlwidGVhcmRvd25cIix2YWx1ZTpmdW5jdGlvbihlLHQsbil7dGhpcy5jb25uJiYodGhpcy5jb25uLm9uY2xvc2U9ZnVuY3Rpb24oKXt9LHQ/dGhpcy5jb25uLmNsb3NlKHQsbnx8XCJcIik6dGhpcy5jb25uLmNsb3NlKCksdGhpcy5jb25uPW51bGwpLGUmJmUoKX19LHtrZXk6XCJvbkNvbm5DbG9zZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuaGFzTG9nZ2VyKCkmJnRoaXMubG9nKFwidHJhbnNwb3J0XCIsXCJjbG9zZVwiLGUpLHRoaXMudHJpZ2dlckNoYW5FcnJvcigpLGNsZWFySW50ZXJ2YWwodGhpcy5oZWFydGJlYXRUaW1lciksZSYmMWUzIT09ZS5jb2RlJiZ0aGlzLnJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpLHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuY2xvc2UuZm9yRWFjaChmdW5jdGlvbih0KXtyZXR1cm4gdChlKX0pfX0se2tleTpcIm9uQ29ubkVycm9yXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5oYXNMb2dnZXIoKSYmdGhpcy5sb2coXCJ0cmFuc3BvcnRcIixlKSx0aGlzLnRyaWdnZXJDaGFuRXJyb3IoKSx0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLmVycm9yLmZvckVhY2goZnVuY3Rpb24odCl7cmV0dXJuIHQoZSl9KX19LHtrZXk6XCJ0cmlnZ2VyQ2hhbkVycm9yXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLmNoYW5uZWxzLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGUudHJpZ2dlcihwLmVycm9yKX0pfX0se2tleTpcImNvbm5lY3Rpb25TdGF0ZVwiLHZhbHVlOmZ1bmN0aW9uKCl7c3dpdGNoKHRoaXMuY29ubiYmdGhpcy5jb25uLnJlYWR5U3RhdGUpe2Nhc2UgaC5jb25uZWN0aW5nOnJldHVyblwiY29ubmVjdGluZ1wiO2Nhc2UgaC5vcGVuOnJldHVyblwib3BlblwiO2Nhc2UgaC5jbG9zaW5nOnJldHVyblwiY2xvc2luZ1wiO2RlZmF1bHQ6cmV0dXJuXCJjbG9zZWRcIn19fSx7a2V5OlwiaXNDb25uZWN0ZWRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVyblwib3BlblwiPT09dGhpcy5jb25uZWN0aW9uU3RhdGUoKX19LHtrZXk6XCJyZW1vdmVcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmNoYW5uZWxzPXRoaXMuY2hhbm5lbHMuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiB0LmpvaW5SZWYoKSE9PWUuam9pblJlZigpfSl9fSx7a2V5OlwiY2hhbm5lbFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxuPW5ldyBnKGUsdCx0aGlzKTtyZXR1cm4gdGhpcy5jaGFubmVscy5wdXNoKG4pLG59fSx7a2V5OlwicHVzaFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7aWYodGhpcy5oYXNMb2dnZXIoKSl7dmFyIG49ZS50b3BpYyxpPWUuZXZlbnQsbz1lLnBheWxvYWQscj1lLnJlZixzPWUuam9pbl9yZWY7dGhpcy5sb2coXCJwdXNoXCIsXCJcIi5jb25jYXQobixcIiBcIikuY29uY2F0KGksXCIgKFwiKS5jb25jYXQocyxcIiwgXCIpLmNvbmNhdChyLFwiKVwiKSxvKX10aGlzLmlzQ29ubmVjdGVkKCk/dGhpcy5lbmNvZGUoZSxmdW5jdGlvbihlKXtyZXR1cm4gdC5jb25uLnNlbmQoZSl9KTp0aGlzLnNlbmRCdWZmZXIucHVzaChmdW5jdGlvbigpe3JldHVybiB0LmVuY29kZShlLGZ1bmN0aW9uKGUpe3JldHVybiB0LmNvbm4uc2VuZChlKX0pfSl9fSx7a2V5OlwibWFrZVJlZlwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5yZWYrMTtyZXR1cm4gZT09PXRoaXMucmVmP3RoaXMucmVmPTA6dGhpcy5yZWY9ZSx0aGlzLnJlZi50b1N0cmluZygpfX0se2tleTpcInNlbmRIZWFydGJlYXRcIix2YWx1ZTpmdW5jdGlvbigpe2lmKHRoaXMuaXNDb25uZWN0ZWQoKSl7aWYodGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmKXJldHVybiB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWY9bnVsbCx0aGlzLmhhc0xvZ2dlcigpJiZ0aGlzLmxvZyhcInRyYW5zcG9ydFwiLFwiaGVhcnRiZWF0IHRpbWVvdXQuIEF0dGVtcHRpbmcgdG8gcmUtZXN0YWJsaXNoIGNvbm5lY3Rpb25cIiksdm9pZCB0aGlzLmNvbm4uY2xvc2UoMWUzLFwiaGVhcmJlYXQgdGltZW91dFwiKTt0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWY9dGhpcy5tYWtlUmVmKCksdGhpcy5wdXNoKHt0b3BpYzpcInBob2VuaXhcIixldmVudDpcImhlYXJ0YmVhdFwiLHBheWxvYWQ6e30scmVmOnRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZn0pfX19LHtrZXk6XCJmbHVzaFNlbmRCdWZmZXJcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuaXNDb25uZWN0ZWQoKSYmdGhpcy5zZW5kQnVmZmVyLmxlbmd0aD4wJiYodGhpcy5zZW5kQnVmZmVyLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGUoKX0pLHRoaXMuc2VuZEJ1ZmZlcj1bXSl9fSx7a2V5Olwib25Db25uTWVzc2FnZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7dGhpcy5kZWNvZGUoZS5kYXRhLGZ1bmN0aW9uKGUpe3ZhciBuPWUudG9waWMsaT1lLmV2ZW50LG89ZS5wYXlsb2FkLHI9ZS5yZWYscz1lLmpvaW5fcmVmO3ImJnI9PT10LnBlbmRpbmdIZWFydGJlYXRSZWYmJih0LnBlbmRpbmdIZWFydGJlYXRSZWY9bnVsbCksdC5oYXNMb2dnZXIoKSYmdC5sb2coXCJyZWNlaXZlXCIsXCJcIi5jb25jYXQoby5zdGF0dXN8fFwiXCIsXCIgXCIpLmNvbmNhdChuLFwiIFwiKS5jb25jYXQoaSxcIiBcIikuY29uY2F0KHImJlwiKFwiK3IrXCIpXCJ8fFwiXCIpLG8pO2Zvcih2YXIgYT0wO2E8dC5jaGFubmVscy5sZW5ndGg7YSsrKXt2YXIgYz10LmNoYW5uZWxzW2FdO2MuaXNNZW1iZXIobixpLG8scykmJmMudHJpZ2dlcihpLG8scixzKX1mb3IodmFyIHU9MDt1PHQuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZS5sZW5ndGg7dSsrKXQuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZVt1XShlKX0pfX0se2tleTpcInJlc2V0Q2hhbm5lbFRpbWVyc1wiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5jaGFubmVscy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UucmVqb2luVGltZXIucmVzdGFydCgpfSl9fV0pLGV9KCksaj1mdW5jdGlvbigpe2Z1bmN0aW9uIGUodCl7cyh0aGlzLGUpLHRoaXMuZW5kUG9pbnQ9bnVsbCx0aGlzLnRva2VuPW51bGwsdGhpcy5za2lwSGVhcnRiZWF0PSEwLHRoaXMub25vcGVuPWZ1bmN0aW9uKCl7fSx0aGlzLm9uZXJyb3I9ZnVuY3Rpb24oKXt9LHRoaXMub25tZXNzYWdlPWZ1bmN0aW9uKCl7fSx0aGlzLm9uY2xvc2U9ZnVuY3Rpb24oKXt9LHRoaXMucG9sbEVuZHBvaW50PXRoaXMubm9ybWFsaXplRW5kcG9pbnQodCksdGhpcy5yZWFkeVN0YXRlPWguY29ubmVjdGluZyx0aGlzLnBvbGwoKX1yZXR1cm4gYyhlLFt7a2V5Olwibm9ybWFsaXplRW5kcG9pbnRcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gZS5yZXBsYWNlKFwid3M6Ly9cIixcImh0dHA6Ly9cIikucmVwbGFjZShcIndzczovL1wiLFwiaHR0cHM6Ly9cIikucmVwbGFjZShuZXcgUmVnRXhwKFwiKC4qKS9cIit2LndlYnNvY2tldCksXCIkMS9cIit2Lmxvbmdwb2xsKX19LHtrZXk6XCJlbmRwb2ludFVSTFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIFIuYXBwZW5kUGFyYW1zKHRoaXMucG9sbEVuZHBvaW50LHt0b2tlbjp0aGlzLnRva2VufSl9fSx7a2V5OlwiY2xvc2VBbmRSZXRyeVwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5jbG9zZSgpLHRoaXMucmVhZHlTdGF0ZT1oLmNvbm5lY3Rpbmd9fSx7a2V5Olwib250aW1lb3V0XCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLm9uZXJyb3IoXCJ0aW1lb3V0XCIpLHRoaXMuY2xvc2VBbmRSZXRyeSgpfX0se2tleTpcInBvbGxcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXM7dGhpcy5yZWFkeVN0YXRlIT09aC5vcGVuJiZ0aGlzLnJlYWR5U3RhdGUhPT1oLmNvbm5lY3Rpbmd8fFIucmVxdWVzdChcIkdFVFwiLHRoaXMuZW5kcG9pbnRVUkwoKSxcImFwcGxpY2F0aW9uL2pzb25cIixudWxsLHRoaXMudGltZW91dCx0aGlzLm9udGltZW91dC5iaW5kKHRoaXMpLGZ1bmN0aW9uKHQpe2lmKHQpe3ZhciBuPXQuc3RhdHVzLGk9dC50b2tlbixvPXQubWVzc2FnZXM7ZS50b2tlbj1pfWVsc2Ugbj0wO3N3aXRjaChuKXtjYXNlIDIwMDpvLmZvckVhY2goZnVuY3Rpb24odCl7cmV0dXJuIGUub25tZXNzYWdlKHtkYXRhOnR9KX0pLGUucG9sbCgpO2JyZWFrO2Nhc2UgMjA0OmUucG9sbCgpO2JyZWFrO2Nhc2UgNDEwOmUucmVhZHlTdGF0ZT1oLm9wZW4sZS5vbm9wZW4oKSxlLnBvbGwoKTticmVhaztjYXNlIDA6Y2FzZSA1MDA6ZS5vbmVycm9yKCksZS5jbG9zZUFuZFJldHJ5KCk7YnJlYWs7ZGVmYXVsdDp0aHJvd1widW5oYW5kbGVkIHBvbGwgc3RhdHVzIFwiLmNvbmNhdChuKX19KX19LHtrZXk6XCJzZW5kXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcztSLnJlcXVlc3QoXCJQT1NUXCIsdGhpcy5lbmRwb2ludFVSTCgpLFwiYXBwbGljYXRpb24vanNvblwiLGUsdGhpcy50aW1lb3V0LHRoaXMub25lcnJvci5iaW5kKHRoaXMsXCJ0aW1lb3V0XCIpLGZ1bmN0aW9uKGUpe2UmJjIwMD09PWUuc3RhdHVzfHwodC5vbmVycm9yKGUmJmUuc3RhdHVzKSx0LmNsb3NlQW5kUmV0cnkoKSl9KX19LHtrZXk6XCJjbG9zZVwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dGhpcy5yZWFkeVN0YXRlPWguY2xvc2VkLHRoaXMub25jbG9zZSgpfX1dKSxlfSgpLFI9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKCl7cyh0aGlzLGUpfXJldHVybiBjKGUsbnVsbCxbe2tleTpcInJlcXVlc3RcIix2YWx1ZTpmdW5jdGlvbihlLHQsbixpLG8scixzKXtpZih1LlhEb21haW5SZXF1ZXN0KXt2YXIgYT1uZXcgWERvbWFpblJlcXVlc3Q7dGhpcy54ZG9tYWluUmVxdWVzdChhLGUsdCxpLG8scixzKX1lbHNle3ZhciBjPXUuWE1MSHR0cFJlcXVlc3Q/bmV3IHUuWE1MSHR0cFJlcXVlc3Q6bmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTt0aGlzLnhoclJlcXVlc3QoYyxlLHQsbixpLG8scixzKX19fSx7a2V5OlwieGRvbWFpblJlcXVlc3RcIix2YWx1ZTpmdW5jdGlvbihlLHQsbixpLG8scixzKXt2YXIgYT10aGlzO2UudGltZW91dD1vLGUub3Blbih0LG4pLGUub25sb2FkPWZ1bmN0aW9uKCl7dmFyIHQ9YS5wYXJzZUpTT04oZS5yZXNwb25zZVRleHQpO3MmJnModCl9LHImJihlLm9udGltZW91dD1yKSxlLm9ucHJvZ3Jlc3M9ZnVuY3Rpb24oKXt9LGUuc2VuZChpKX19LHtrZXk6XCJ4aHJSZXF1ZXN0XCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4saSxvLHIscyxhKXt2YXIgYz10aGlzO2Uub3Blbih0LG4sITApLGUudGltZW91dD1yLGUuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLGkpLGUub25lcnJvcj1mdW5jdGlvbigpe2EmJmEobnVsbCl9LGUub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7aWYoZS5yZWFkeVN0YXRlPT09Yy5zdGF0ZXMuY29tcGxldGUmJmEpe3ZhciB0PWMucGFyc2VKU09OKGUucmVzcG9uc2VUZXh0KTthKHQpfX0scyYmKGUub250aW1lb3V0PXMpLGUuc2VuZChvKX19LHtrZXk6XCJwYXJzZUpTT05cIix2YWx1ZTpmdW5jdGlvbihlKXtpZighZXx8XCJcIj09PWUpcmV0dXJuIG51bGw7dHJ5e3JldHVybiBKU09OLnBhcnNlKGUpfWNhdGNoKHQpe3JldHVybiBjb25zb2xlJiZjb25zb2xlLmxvZyhcImZhaWxlZCB0byBwYXJzZSBKU09OIHJlc3BvbnNlXCIsZSksbnVsbH19fSx7a2V5Olwic2VyaWFsaXplXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgbj1bXTtmb3IodmFyIGkgaW4gZSlpZihlLmhhc093blByb3BlcnR5KGkpKXt2YXIgcj10P1wiXCIuY29uY2F0KHQsXCJbXCIpLmNvbmNhdChpLFwiXVwiKTppLHM9ZVtpXTtcIm9iamVjdFwiPT09byhzKT9uLnB1c2godGhpcy5zZXJpYWxpemUocyxyKSk6bi5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChyKStcIj1cIitlbmNvZGVVUklDb21wb25lbnQocykpfXJldHVybiBuLmpvaW4oXCImXCIpfX0se2tleTpcImFwcGVuZFBhcmFtc1wiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7aWYoMD09PU9iamVjdC5rZXlzKHQpLmxlbmd0aClyZXR1cm4gZTt2YXIgbj1lLm1hdGNoKC9cXD8vKT9cIiZcIjpcIj9cIjtyZXR1cm5cIlwiLmNvbmNhdChlKS5jb25jYXQobikuY29uY2F0KHRoaXMuc2VyaWFsaXplKHQpKX19XSksZX0oKTtSLnN0YXRlcz17Y29tcGxldGU6NH07dmFyIFQ9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQpe3ZhciBuPXRoaXMsaT1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06e307cyh0aGlzLGUpO3ZhciBvPWkuZXZlbnRzfHx7c3RhdGU6XCJwcmVzZW5jZV9zdGF0ZVwiLGRpZmY6XCJwcmVzZW5jZV9kaWZmXCJ9O3RoaXMuc3RhdGU9e30sdGhpcy5wZW5kaW5nRGlmZnM9W10sdGhpcy5jaGFubmVsPXQsdGhpcy5qb2luUmVmPW51bGwsdGhpcy5jYWxsZXI9e29uSm9pbjpmdW5jdGlvbigpe30sb25MZWF2ZTpmdW5jdGlvbigpe30sb25TeW5jOmZ1bmN0aW9uKCl7fX0sdGhpcy5jaGFubmVsLm9uKG8uc3RhdGUsZnVuY3Rpb24odCl7dmFyIGk9bi5jYWxsZXIsbz1pLm9uSm9pbixyPWkub25MZWF2ZSxzPWkub25TeW5jO24uam9pblJlZj1uLmNoYW5uZWwuam9pblJlZigpLG4uc3RhdGU9ZS5zeW5jU3RhdGUobi5zdGF0ZSx0LG8sciksbi5wZW5kaW5nRGlmZnMuZm9yRWFjaChmdW5jdGlvbih0KXtuLnN0YXRlPWUuc3luY0RpZmYobi5zdGF0ZSx0LG8scil9KSxuLnBlbmRpbmdEaWZmcz1bXSxzKCl9KSx0aGlzLmNoYW5uZWwub24oby5kaWZmLGZ1bmN0aW9uKHQpe3ZhciBpPW4uY2FsbGVyLG89aS5vbkpvaW4scj1pLm9uTGVhdmUscz1pLm9uU3luYztuLmluUGVuZGluZ1N5bmNTdGF0ZSgpP24ucGVuZGluZ0RpZmZzLnB1c2godCk6KG4uc3RhdGU9ZS5zeW5jRGlmZihuLnN0YXRlLHQsbyxyKSxzKCkpfSl9cmV0dXJuIGMoZSxbe2tleTpcIm9uSm9pblwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuY2FsbGVyLm9uSm9pbj1lfX0se2tleTpcIm9uTGVhdmVcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmNhbGxlci5vbkxlYXZlPWV9fSx7a2V5Olwib25TeW5jXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5jYWxsZXIub25TeW5jPWV9fSx7a2V5OlwibGlzdFwiLHZhbHVlOmZ1bmN0aW9uKHQpe3JldHVybiBlLmxpc3QodGhpcy5zdGF0ZSx0KX19LHtrZXk6XCJpblBlbmRpbmdTeW5jU3RhdGVcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiF0aGlzLmpvaW5SZWZ8fHRoaXMuam9pblJlZiE9PXRoaXMuY2hhbm5lbC5qb2luUmVmKCl9fV0sW3trZXk6XCJzeW5jU3RhdGVcIix2YWx1ZTpmdW5jdGlvbihlLHQsbixpKXt2YXIgbz10aGlzLHI9dGhpcy5jbG9uZShlKSxzPXt9LGE9e307cmV0dXJuIHRoaXMubWFwKHIsZnVuY3Rpb24oZSxuKXt0W2VdfHwoYVtlXT1uKX0pLHRoaXMubWFwKHQsZnVuY3Rpb24oZSx0KXt2YXIgbj1yW2VdO2lmKG4pe3ZhciBpPXQubWV0YXMubWFwKGZ1bmN0aW9uKGUpe3JldHVybiBlLnBoeF9yZWZ9KSxjPW4ubWV0YXMubWFwKGZ1bmN0aW9uKGUpe3JldHVybiBlLnBoeF9yZWZ9KSx1PXQubWV0YXMuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBjLmluZGV4T2YoZS5waHhfcmVmKTwwfSksaD1uLm1ldGFzLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gaS5pbmRleE9mKGUucGh4X3JlZik8MH0pO3UubGVuZ3RoPjAmJihzW2VdPXQsc1tlXS5tZXRhcz11KSxoLmxlbmd0aD4wJiYoYVtlXT1vLmNsb25lKG4pLGFbZV0ubWV0YXM9aCl9ZWxzZSBzW2VdPXR9KSx0aGlzLnN5bmNEaWZmKHIse2pvaW5zOnMsbGVhdmVzOmF9LG4saSl9fSx7a2V5Olwic3luY0RpZmZcIix2YWx1ZTpmdW5jdGlvbihlLHQsbixvKXt2YXIgcj10LmpvaW5zLHM9dC5sZWF2ZXMsYT10aGlzLmNsb25lKGUpO3JldHVybiBufHwobj1mdW5jdGlvbigpe30pLG98fChvPWZ1bmN0aW9uKCl7fSksdGhpcy5tYXAocixmdW5jdGlvbihlLHQpe3ZhciBvPWFbZV07aWYoYVtlXT10LG8pe3ZhciByLHM9YVtlXS5tZXRhcy5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIGUucGh4X3JlZn0pLGM9by5tZXRhcy5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIHMuaW5kZXhPZihlLnBoeF9yZWYpPDB9KTsocj1hW2VdLm1ldGFzKS51bnNoaWZ0LmFwcGx5KHIsaShjKSl9bihlLG8sdCl9KSx0aGlzLm1hcChzLGZ1bmN0aW9uKGUsdCl7dmFyIG49YVtlXTtpZihuKXt2YXIgaT10Lm1ldGFzLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gZS5waHhfcmVmfSk7bi5tZXRhcz1uLm1ldGFzLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gaS5pbmRleE9mKGUucGh4X3JlZik8MH0pLG8oZSxuLHQpLDA9PT1uLm1ldGFzLmxlbmd0aCYmZGVsZXRlIGFbZV19fSksYX19LHtrZXk6XCJsaXN0XCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdHx8KHQ9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdH0pLHRoaXMubWFwKGUsZnVuY3Rpb24oZSxuKXtyZXR1cm4gdChlLG4pfSl9fSx7a2V5OlwibWFwXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZSkubWFwKGZ1bmN0aW9uKG4pe3JldHVybiB0KG4sZVtuXSl9KX19LHtrZXk6XCJjbG9uZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGUpKX19XSksZX0oKSxDPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4pe3ModGhpcyxlKSx0aGlzLmNhbGxiYWNrPXQsdGhpcy50aW1lckNhbGM9bix0aGlzLnRpbWVyPW51bGwsdGhpcy50cmllcz0wfXJldHVybiBjKGUsW3trZXk6XCJyZXNldFwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy50cmllcz0wLHRoaXMuY2xlYXJUaW1lcigpfX0se2tleTpcInJlc3RhcnRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPW51bGwhPT10aGlzLnRpbWVyO3RoaXMucmVzZXQoKSxlJiZ0aGlzLnNjaGVkdWxlVGltZW91dCgpfX0se2tleTpcInNjaGVkdWxlVGltZW91dFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpczt0aGlzLmNsZWFyVGltZXIoKSx0aGlzLnRpbWVyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtlLnRyaWVzPWUudHJpZXMrMSxlLmNhbGxiYWNrKCl9LHRoaXMudGltZXJDYWxjKHRoaXMudHJpZXMrMSkpfX0se2tleTpcImNsZWFyVGltZXJcIix2YWx1ZTpmdW5jdGlvbigpe2NsZWFyVGltZW91dCh0aGlzLnRpbWVyKSx0aGlzLnRpbWVyPW51bGx9fV0pLGV9KCl9XSl9KTsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG5cbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBnZXRTdGFjayBSZXR1cm5zIHRoZSBjb21wb25lbnQgc3RhY2suXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGdldFN0YWNrKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKHR5cGVTcGVjcy5oYXNPd25Qcm9wZXJ0eSh0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGlmICh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBlcnIgPSBFcnJvcihcbiAgICAgICAgICAgICAgKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiAnICsgbG9jYXRpb24gKyAnIHR5cGUgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyAnICtcbiAgICAgICAgICAgICAgJ2l0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAnICsgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICsgJ2AuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yICYmICEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAnICtcbiAgICAgICAgICAgIGxvY2F0aW9uICsgJyBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJyArIHR5cGVvZiBlcnJvciArICcuICcgK1xuICAgICAgICAgICAgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArXG4gICAgICAgICAgICAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLidcbiAgICAgICAgICApXG5cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ZhaWxlZCAnICsgbG9jYXRpb24gKyAnIHR5cGU6ICcgKyBlcnJvci5tZXNzYWdlICsgKHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1Byb3BUeXBlcztcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9jaGVja1Byb3BUeXBlcycpO1xuXG52YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwoKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgKi9cbiAgdmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICB2YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICAgKlxuICAgKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAgICpcbiAgICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAgICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAgICogICAgICAgLi4uXG4gICAqICAgICB9XG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICAgKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gICAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gICAqXG4gICAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAgICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAgICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAgICpcbiAgICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICAgKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICAgKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gICAqICAgICB9LFxuICAgKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAgICogICB9KTtcbiAgICpcbiAgICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICAgKlxuICAgKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAgICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gICAqXG4gICAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAgICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICAgKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICAgKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICAgKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gICAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgKiAgICAgICAgICApO1xuICAgKiAgICAgICAgfVxuICAgKiAgICAgIH1cbiAgICogICAgfSxcbiAgICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gICAqICB9KTtcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIHZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gICAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICAgIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gICAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyLFxuICAgIGV4YWN0OiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyLFxuICB9O1xuXG4gIC8qKlxuICAgKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICAgKi9cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuICBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuICAvKipcbiAgICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICAgKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyLCB3ZSBkb24ndCB1c2UgcmVhbFxuICAgKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gICAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAgICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH1cbiAgLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuICBQcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuXG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgICBpZiAodGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAgICAgICAgIC8vIE5ldyBiZWhhdmlvciBvbmx5IGZvciB1c2VycyBvZiBgcHJvcC10eXBlc2AgcGFja2FnZVxuICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gT2xkIGJlaGF2aW9yIGZvciBwZW9wbGUgdXNpbmcgUmVhY3QuUHJvcFR5cGVzXG4gICAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gJiZcbiAgICAgICAgICAgIC8vIEF2b2lkIHNwYW1taW5nIHRoZSBjb25zb2xlIGJlY2F1c2UgdGhleSBhcmUgb2Z0ZW4gbm90IGFjdGlvbmFibGUgZXhjZXB0IGZvciBsaWIgYXV0aG9yc1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPCAzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBwcm9wIG9uIGAnICsgY29tcG9uZW50TmFtZSAgKyAnYC4gVGhpcyBpcyBkZXByZWNhdGVkICcgK1xuICAgICAgICAgICAgICAnYW5kIHdpbGwgdGhyb3cgaW4gdGhlIHN0YW5kYWxvbmUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgICAnWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byBhIHRoaXJkLXBhcnR5IFByb3BUeXBlcyAnICtcbiAgICAgICAgICAgICAgJ2xpYnJhcnkuIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctZG9udC1jYWxsLXByb3B0eXBlcyAnICsgJ2ZvciBkZXRhaWxzLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcyk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgcHJvcFZhbHVlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgIGlmIChwcm9wVmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJyArIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSArICcgYXQgaW5kZXggJyArIGkgKyAnLidcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBhbGwga2V5cyBpbiBjYXNlIHNvbWUgYXJlIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGZyb21cbiAgICAgIC8vIHByb3BzLlxuICAgICAgdmFyIGFsbEtleXMgPSBhc3NpZ24oe30sIHByb3BzW3Byb3BOYW1lXSwgc2hhcGVUeXBlcyk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYWxsS2V5cykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIFN5bWJvbC5mb3IgJiZcbiAgICBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykpIHx8XG4gICAgMHhlYWM3O1xuXG4gIHZhciBpc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgb2JqZWN0ICE9PSBudWxsICYmXG4gICAgICBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgY29tcG9zZSA9IHJlcXVpcmUoJ3JlZHV4JykuY29tcG9zZTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuY29tcG9zZVdpdGhEZXZUb29scyA9IChcbiAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyA/XG4gICAgd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyA6XG4gICAgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0JykgcmV0dXJuIGNvbXBvc2U7XG4gICAgICByZXR1cm4gY29tcG9zZS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cbik7XG5cbmV4cG9ydHMuZGV2VG9vbHNFbmhhbmNlciA9IChcbiAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX18gP1xuICAgIHdpbmRvdy5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9fIDpcbiAgICBmdW5jdGlvbigpIHsgcmV0dXJuIGZ1bmN0aW9uKG5vb3ApIHsgcmV0dXJuIG5vb3A7IH0gfVxuKTtcbiIsIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP3QoZXhwb3J0cyk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXCJleHBvcnRzXCJdLHQpOnQoZS5yZWR1eExvZ2dlcj1lLnJlZHV4TG9nZ2VyfHx7fSl9KHRoaXMsZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdChlLHQpe2Uuc3VwZXJfPXQsZS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZSh0LnByb3RvdHlwZSx7Y29uc3RydWN0b3I6e3ZhbHVlOmUsZW51bWVyYWJsZTohMSx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9fSl9ZnVuY3Rpb24gcihlLHQpe09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwia2luZFwiLHt2YWx1ZTplLGVudW1lcmFibGU6ITB9KSx0JiZ0Lmxlbmd0aCYmT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJwYXRoXCIse3ZhbHVlOnQsZW51bWVyYWJsZTohMH0pfWZ1bmN0aW9uIG4oZSx0LHIpe24uc3VwZXJfLmNhbGwodGhpcyxcIkVcIixlKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcImxoc1wiLHt2YWx1ZTp0LGVudW1lcmFibGU6ITB9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcInJoc1wiLHt2YWx1ZTpyLGVudW1lcmFibGU6ITB9KX1mdW5jdGlvbiBvKGUsdCl7by5zdXBlcl8uY2FsbCh0aGlzLFwiTlwiLGUpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwicmhzXCIse3ZhbHVlOnQsZW51bWVyYWJsZTohMH0pfWZ1bmN0aW9uIGkoZSx0KXtpLnN1cGVyXy5jYWxsKHRoaXMsXCJEXCIsZSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJsaHNcIix7dmFsdWU6dCxlbnVtZXJhYmxlOiEwfSl9ZnVuY3Rpb24gYShlLHQscil7YS5zdXBlcl8uY2FsbCh0aGlzLFwiQVwiLGUpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwiaW5kZXhcIix7dmFsdWU6dCxlbnVtZXJhYmxlOiEwfSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJpdGVtXCIse3ZhbHVlOnIsZW51bWVyYWJsZTohMH0pfWZ1bmN0aW9uIGYoZSx0LHIpe3ZhciBuPWUuc2xpY2UoKHJ8fHQpKzF8fGUubGVuZ3RoKTtyZXR1cm4gZS5sZW5ndGg9dDwwP2UubGVuZ3RoK3Q6dCxlLnB1c2guYXBwbHkoZSxuKSxlfWZ1bmN0aW9uIHUoZSl7dmFyIHQ9XCJ1bmRlZmluZWRcIj09dHlwZW9mIGU/XCJ1bmRlZmluZWRcIjpOKGUpO3JldHVyblwib2JqZWN0XCIhPT10P3Q6ZT09PU1hdGg/XCJtYXRoXCI6bnVsbD09PWU/XCJudWxsXCI6QXJyYXkuaXNBcnJheShlKT9cImFycmF5XCI6XCJbb2JqZWN0IERhdGVdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSk/XCJkYXRlXCI6XCJmdW5jdGlvblwiPT10eXBlb2YgZS50b1N0cmluZyYmL15cXC8uKlxcLy8udGVzdChlLnRvU3RyaW5nKCkpP1wicmVnZXhwXCI6XCJvYmplY3RcIn1mdW5jdGlvbiBsKGUsdCxyLGMscyxkLHApe3M9c3x8W10scD1wfHxbXTt2YXIgZz1zLnNsaWNlKDApO2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBkKXtpZihjKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBjJiZjKGcsZCkpcmV0dXJuO2lmKFwib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIGM/XCJ1bmRlZmluZWRcIjpOKGMpKSl7aWYoYy5wcmVmaWx0ZXImJmMucHJlZmlsdGVyKGcsZCkpcmV0dXJuO2lmKGMubm9ybWFsaXplKXt2YXIgaD1jLm5vcm1hbGl6ZShnLGQsZSx0KTtoJiYoZT1oWzBdLHQ9aFsxXSl9fX1nLnB1c2goZCl9XCJyZWdleHBcIj09PXUoZSkmJlwicmVnZXhwXCI9PT11KHQpJiYoZT1lLnRvU3RyaW5nKCksdD10LnRvU3RyaW5nKCkpO3ZhciB5PVwidW5kZWZpbmVkXCI9PXR5cGVvZiBlP1widW5kZWZpbmVkXCI6TihlKSx2PVwidW5kZWZpbmVkXCI9PXR5cGVvZiB0P1widW5kZWZpbmVkXCI6Tih0KSxiPVwidW5kZWZpbmVkXCIhPT15fHxwJiZwW3AubGVuZ3RoLTFdLmxocyYmcFtwLmxlbmd0aC0xXS5saHMuaGFzT3duUHJvcGVydHkoZCksbT1cInVuZGVmaW5lZFwiIT09dnx8cCYmcFtwLmxlbmd0aC0xXS5yaHMmJnBbcC5sZW5ndGgtMV0ucmhzLmhhc093blByb3BlcnR5KGQpO2lmKCFiJiZtKXIobmV3IG8oZyx0KSk7ZWxzZSBpZighbSYmYilyKG5ldyBpKGcsZSkpO2Vsc2UgaWYodShlKSE9PXUodCkpcihuZXcgbihnLGUsdCkpO2Vsc2UgaWYoXCJkYXRlXCI9PT11KGUpJiZlLXQhPT0wKXIobmV3IG4oZyxlLHQpKTtlbHNlIGlmKFwib2JqZWN0XCI9PT15JiZudWxsIT09ZSYmbnVsbCE9PXQpaWYocC5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIHQubGhzPT09ZX0pLmxlbmd0aCllIT09dCYmcihuZXcgbihnLGUsdCkpO2Vsc2V7aWYocC5wdXNoKHtsaHM6ZSxyaHM6dH0pLEFycmF5LmlzQXJyYXkoZSkpe3ZhciB3O2UubGVuZ3RoO2Zvcih3PTA7dzxlLmxlbmd0aDt3Kyspdz49dC5sZW5ndGg/cihuZXcgYShnLHcsbmV3IGkodm9pZCAwLGVbd10pKSk6bChlW3ddLHRbd10scixjLGcsdyxwKTtmb3IoO3c8dC5sZW5ndGg7KXIobmV3IGEoZyx3LG5ldyBvKHZvaWQgMCx0W3crK10pKSl9ZWxzZXt2YXIgeD1PYmplY3Qua2V5cyhlKSxTPU9iamVjdC5rZXlzKHQpO3guZm9yRWFjaChmdW5jdGlvbihuLG8pe3ZhciBpPVMuaW5kZXhPZihuKTtpPj0wPyhsKGVbbl0sdFtuXSxyLGMsZyxuLHApLFM9ZihTLGkpKTpsKGVbbl0sdm9pZCAwLHIsYyxnLG4scCl9KSxTLmZvckVhY2goZnVuY3Rpb24oZSl7bCh2b2lkIDAsdFtlXSxyLGMsZyxlLHApfSl9cC5sZW5ndGg9cC5sZW5ndGgtMX1lbHNlIGUhPT10JiYoXCJudW1iZXJcIj09PXkmJmlzTmFOKGUpJiZpc05hTih0KXx8cihuZXcgbihnLGUsdCkpKX1mdW5jdGlvbiBjKGUsdCxyLG4pe3JldHVybiBuPW58fFtdLGwoZSx0LGZ1bmN0aW9uKGUpe2UmJm4ucHVzaChlKX0sciksbi5sZW5ndGg/bjp2b2lkIDB9ZnVuY3Rpb24gcyhlLHQscil7aWYoci5wYXRoJiZyLnBhdGgubGVuZ3RoKXt2YXIgbixvPWVbdF0saT1yLnBhdGgubGVuZ3RoLTE7Zm9yKG49MDtuPGk7bisrKW89b1tyLnBhdGhbbl1dO3N3aXRjaChyLmtpbmQpe2Nhc2VcIkFcIjpzKG9bci5wYXRoW25dXSxyLmluZGV4LHIuaXRlbSk7YnJlYWs7Y2FzZVwiRFwiOmRlbGV0ZSBvW3IucGF0aFtuXV07YnJlYWs7Y2FzZVwiRVwiOmNhc2VcIk5cIjpvW3IucGF0aFtuXV09ci5yaHN9fWVsc2Ugc3dpdGNoKHIua2luZCl7Y2FzZVwiQVwiOnMoZVt0XSxyLmluZGV4LHIuaXRlbSk7YnJlYWs7Y2FzZVwiRFwiOmU9ZihlLHQpO2JyZWFrO2Nhc2VcIkVcIjpjYXNlXCJOXCI6ZVt0XT1yLnJoc31yZXR1cm4gZX1mdW5jdGlvbiBkKGUsdCxyKXtpZihlJiZ0JiZyJiZyLmtpbmQpe2Zvcih2YXIgbj1lLG89LTEsaT1yLnBhdGg/ci5wYXRoLmxlbmd0aC0xOjA7KytvPGk7KVwidW5kZWZpbmVkXCI9PXR5cGVvZiBuW3IucGF0aFtvXV0mJihuW3IucGF0aFtvXV09XCJudW1iZXJcIj09dHlwZW9mIHIucGF0aFtvXT9bXTp7fSksbj1uW3IucGF0aFtvXV07c3dpdGNoKHIua2luZCl7Y2FzZVwiQVwiOnMoci5wYXRoP25bci5wYXRoW29dXTpuLHIuaW5kZXgsci5pdGVtKTticmVhaztjYXNlXCJEXCI6ZGVsZXRlIG5bci5wYXRoW29dXTticmVhaztjYXNlXCJFXCI6Y2FzZVwiTlwiOm5bci5wYXRoW29dXT1yLnJoc319fWZ1bmN0aW9uIHAoZSx0LHIpe2lmKHIucGF0aCYmci5wYXRoLmxlbmd0aCl7dmFyIG4sbz1lW3RdLGk9ci5wYXRoLmxlbmd0aC0xO2ZvcihuPTA7bjxpO24rKylvPW9bci5wYXRoW25dXTtzd2l0Y2goci5raW5kKXtjYXNlXCJBXCI6cChvW3IucGF0aFtuXV0sci5pbmRleCxyLml0ZW0pO2JyZWFrO2Nhc2VcIkRcIjpvW3IucGF0aFtuXV09ci5saHM7YnJlYWs7Y2FzZVwiRVwiOm9bci5wYXRoW25dXT1yLmxoczticmVhaztjYXNlXCJOXCI6ZGVsZXRlIG9bci5wYXRoW25dXX19ZWxzZSBzd2l0Y2goci5raW5kKXtjYXNlXCJBXCI6cChlW3RdLHIuaW5kZXgsci5pdGVtKTticmVhaztjYXNlXCJEXCI6ZVt0XT1yLmxoczticmVhaztjYXNlXCJFXCI6ZVt0XT1yLmxoczticmVhaztjYXNlXCJOXCI6ZT1mKGUsdCl9cmV0dXJuIGV9ZnVuY3Rpb24gZyhlLHQscil7aWYoZSYmdCYmciYmci5raW5kKXt2YXIgbixvLGk9ZTtmb3Iobz1yLnBhdGgubGVuZ3RoLTEsbj0wO248bztuKyspXCJ1bmRlZmluZWRcIj09dHlwZW9mIGlbci5wYXRoW25dXSYmKGlbci5wYXRoW25dXT17fSksaT1pW3IucGF0aFtuXV07c3dpdGNoKHIua2luZCl7Y2FzZVwiQVwiOnAoaVtyLnBhdGhbbl1dLHIuaW5kZXgsci5pdGVtKTticmVhaztjYXNlXCJEXCI6aVtyLnBhdGhbbl1dPXIubGhzO2JyZWFrO2Nhc2VcIkVcIjppW3IucGF0aFtuXV09ci5saHM7YnJlYWs7Y2FzZVwiTlwiOmRlbGV0ZSBpW3IucGF0aFtuXV19fX1mdW5jdGlvbiBoKGUsdCxyKXtpZihlJiZ0KXt2YXIgbj1mdW5jdGlvbihuKXtyJiYhcihlLHQsbil8fGQoZSx0LG4pfTtsKGUsdCxuKX19ZnVuY3Rpb24geShlKXtyZXR1cm5cImNvbG9yOiBcIitGW2VdLmNvbG9yK1wiOyBmb250LXdlaWdodDogYm9sZFwifWZ1bmN0aW9uIHYoZSl7dmFyIHQ9ZS5raW5kLHI9ZS5wYXRoLG49ZS5saHMsbz1lLnJocyxpPWUuaW5kZXgsYT1lLml0ZW07c3dpdGNoKHQpe2Nhc2VcIkVcIjpyZXR1cm5bci5qb2luKFwiLlwiKSxuLFwi4oaSXCIsb107Y2FzZVwiTlwiOnJldHVybltyLmpvaW4oXCIuXCIpLG9dO2Nhc2VcIkRcIjpyZXR1cm5bci5qb2luKFwiLlwiKV07Y2FzZVwiQVwiOnJldHVybltyLmpvaW4oXCIuXCIpK1wiW1wiK2krXCJdXCIsYV07ZGVmYXVsdDpyZXR1cm5bXX19ZnVuY3Rpb24gYihlLHQscixuKXt2YXIgbz1jKGUsdCk7dHJ5e24/ci5ncm91cENvbGxhcHNlZChcImRpZmZcIik6ci5ncm91cChcImRpZmZcIil9Y2F0Y2goZSl7ci5sb2coXCJkaWZmXCIpfW8/by5mb3JFYWNoKGZ1bmN0aW9uKGUpe3ZhciB0PWUua2luZCxuPXYoZSk7ci5sb2cuYXBwbHkocixbXCIlYyBcIitGW3RdLnRleHQseSh0KV0uY29uY2F0KFAobikpKX0pOnIubG9nKFwi4oCU4oCUIG5vIGRpZmYg4oCU4oCUXCIpO3RyeXtyLmdyb3VwRW5kKCl9Y2F0Y2goZSl7ci5sb2coXCLigJTigJQgZGlmZiBlbmQg4oCU4oCUIFwiKX19ZnVuY3Rpb24gbShlLHQscixuKXtzd2l0Y2goXCJ1bmRlZmluZWRcIj09dHlwZW9mIGU/XCJ1bmRlZmluZWRcIjpOKGUpKXtjYXNlXCJvYmplY3RcIjpyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlW25dP2Vbbl0uYXBwbHkoZSxQKHIpKTplW25dO2Nhc2VcImZ1bmN0aW9uXCI6cmV0dXJuIGUodCk7ZGVmYXVsdDpyZXR1cm4gZX19ZnVuY3Rpb24gdyhlKXt2YXIgdD1lLnRpbWVzdGFtcCxyPWUuZHVyYXRpb247cmV0dXJuIGZ1bmN0aW9uKGUsbixvKXt2YXIgaT1bXCJhY3Rpb25cIl07cmV0dXJuIGkucHVzaChcIiVjXCIrU3RyaW5nKGUudHlwZSkpLHQmJmkucHVzaChcIiVjQCBcIituKSxyJiZpLnB1c2goXCIlYyhpbiBcIitvLnRvRml4ZWQoMikrXCIgbXMpXCIpLGkuam9pbihcIiBcIil9fWZ1bmN0aW9uIHgoZSx0KXt2YXIgcj10LmxvZ2dlcixuPXQuYWN0aW9uVHJhbnNmb3JtZXIsbz10LnRpdGxlRm9ybWF0dGVyLGk9dm9pZCAwPT09bz93KHQpOm8sYT10LmNvbGxhcHNlZCxmPXQuY29sb3JzLHU9dC5sZXZlbCxsPXQuZGlmZixjPVwidW5kZWZpbmVkXCI9PXR5cGVvZiB0LnRpdGxlRm9ybWF0dGVyO2UuZm9yRWFjaChmdW5jdGlvbihvLHMpe3ZhciBkPW8uc3RhcnRlZCxwPW8uc3RhcnRlZFRpbWUsZz1vLmFjdGlvbixoPW8ucHJldlN0YXRlLHk9by5lcnJvcix2PW8udG9vayx3PW8ubmV4dFN0YXRlLHg9ZVtzKzFdO3gmJih3PXgucHJldlN0YXRlLHY9eC5zdGFydGVkLWQpO3ZhciBTPW4oZyksaz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBhP2EoZnVuY3Rpb24oKXtyZXR1cm4gd30sZyxvKTphLGo9RChwKSxFPWYudGl0bGU/XCJjb2xvcjogXCIrZi50aXRsZShTKStcIjtcIjpcIlwiLEE9W1wiY29sb3I6IGdyYXk7IGZvbnQtd2VpZ2h0OiBsaWdodGVyO1wiXTtBLnB1c2goRSksdC50aW1lc3RhbXAmJkEucHVzaChcImNvbG9yOiBncmF5OyBmb250LXdlaWdodDogbGlnaHRlcjtcIiksdC5kdXJhdGlvbiYmQS5wdXNoKFwiY29sb3I6IGdyYXk7IGZvbnQtd2VpZ2h0OiBsaWdodGVyO1wiKTt2YXIgTz1pKFMsaix2KTt0cnl7az9mLnRpdGxlJiZjP3IuZ3JvdXBDb2xsYXBzZWQuYXBwbHkocixbXCIlYyBcIitPXS5jb25jYXQoQSkpOnIuZ3JvdXBDb2xsYXBzZWQoTyk6Zi50aXRsZSYmYz9yLmdyb3VwLmFwcGx5KHIsW1wiJWMgXCIrT10uY29uY2F0KEEpKTpyLmdyb3VwKE8pfWNhdGNoKGUpe3IubG9nKE8pfXZhciBOPW0odSxTLFtoXSxcInByZXZTdGF0ZVwiKSxQPW0odSxTLFtTXSxcImFjdGlvblwiKSxDPW0odSxTLFt5LGhdLFwiZXJyb3JcIiksRj1tKHUsUyxbd10sXCJuZXh0U3RhdGVcIik7aWYoTilpZihmLnByZXZTdGF0ZSl7dmFyIEw9XCJjb2xvcjogXCIrZi5wcmV2U3RhdGUoaCkrXCI7IGZvbnQtd2VpZ2h0OiBib2xkXCI7cltOXShcIiVjIHByZXYgc3RhdGVcIixMLGgpfWVsc2UgcltOXShcInByZXYgc3RhdGVcIixoKTtpZihQKWlmKGYuYWN0aW9uKXt2YXIgVD1cImNvbG9yOiBcIitmLmFjdGlvbihTKStcIjsgZm9udC13ZWlnaHQ6IGJvbGRcIjtyW1BdKFwiJWMgYWN0aW9uICAgIFwiLFQsUyl9ZWxzZSByW1BdKFwiYWN0aW9uICAgIFwiLFMpO2lmKHkmJkMpaWYoZi5lcnJvcil7dmFyIE09XCJjb2xvcjogXCIrZi5lcnJvcih5LGgpK1wiOyBmb250LXdlaWdodDogYm9sZDtcIjtyW0NdKFwiJWMgZXJyb3IgICAgIFwiLE0seSl9ZWxzZSByW0NdKFwiZXJyb3IgICAgIFwiLHkpO2lmKEYpaWYoZi5uZXh0U3RhdGUpe3ZhciBfPVwiY29sb3I6IFwiK2YubmV4dFN0YXRlKHcpK1wiOyBmb250LXdlaWdodDogYm9sZFwiO3JbRl0oXCIlYyBuZXh0IHN0YXRlXCIsXyx3KX1lbHNlIHJbRl0oXCJuZXh0IHN0YXRlXCIsdyk7bCYmYihoLHcscixrKTt0cnl7ci5ncm91cEVuZCgpfWNhdGNoKGUpe3IubG9nKFwi4oCU4oCUIGxvZyBlbmQg4oCU4oCUXCIpfX0pfWZ1bmN0aW9uIFMoKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e30sdD1PYmplY3QuYXNzaWduKHt9LEwsZSkscj10LmxvZ2dlcixuPXQuc3RhdGVUcmFuc2Zvcm1lcixvPXQuZXJyb3JUcmFuc2Zvcm1lcixpPXQucHJlZGljYXRlLGE9dC5sb2dFcnJvcnMsZj10LmRpZmZQcmVkaWNhdGU7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIHIpcmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gZSh0KX19fTtpZihlLmdldFN0YXRlJiZlLmRpc3BhdGNoKXJldHVybiBjb25zb2xlLmVycm9yKFwiW3JlZHV4LWxvZ2dlcl0gcmVkdXgtbG9nZ2VyIG5vdCBpbnN0YWxsZWQuIE1ha2Ugc3VyZSB0byBwYXNzIGxvZ2dlciBpbnN0YW5jZSBhcyBtaWRkbGV3YXJlOlxcbi8vIExvZ2dlciB3aXRoIGRlZmF1bHQgb3B0aW9uc1xcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3JlZHV4LWxvZ2dlcidcXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxcbiAgcmVkdWNlcixcXG4gIGFwcGx5TWlkZGxld2FyZShsb2dnZXIpXFxuKVxcbi8vIE9yIHlvdSBjYW4gY3JlYXRlIHlvdXIgb3duIGxvZ2dlciB3aXRoIGN1c3RvbSBvcHRpb25zIGh0dHA6Ly9iaXQubHkvcmVkdXgtbG9nZ2VyLW9wdGlvbnNcXG5pbXBvcnQgY3JlYXRlTG9nZ2VyIGZyb20gJ3JlZHV4LWxvZ2dlcidcXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoe1xcbiAgLy8gLi4ub3B0aW9uc1xcbn0pO1xcbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoXFxuICByZWR1Y2VyLFxcbiAgYXBwbHlNaWRkbGV3YXJlKGxvZ2dlcilcXG4pXFxuXCIpLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gZSh0KX19fTt2YXIgdT1bXTtyZXR1cm4gZnVuY3Rpb24oZSl7dmFyIHI9ZS5nZXRTdGF0ZTtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKGwpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGkmJiFpKHIsbCkpcmV0dXJuIGUobCk7dmFyIGM9e307dS5wdXNoKGMpLGMuc3RhcnRlZD1PLm5vdygpLGMuc3RhcnRlZFRpbWU9bmV3IERhdGUsYy5wcmV2U3RhdGU9bihyKCkpLGMuYWN0aW9uPWw7dmFyIHM9dm9pZCAwO2lmKGEpdHJ5e3M9ZShsKX1jYXRjaChlKXtjLmVycm9yPW8oZSl9ZWxzZSBzPWUobCk7Yy50b29rPU8ubm93KCktYy5zdGFydGVkLGMubmV4dFN0YXRlPW4ocigpKTt2YXIgZD10LmRpZmYmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGY/ZihyLGwpOnQuZGlmZjtpZih4KHUsT2JqZWN0LmFzc2lnbih7fSx0LHtkaWZmOmR9KSksdS5sZW5ndGg9MCxjLmVycm9yKXRocm93IGMuZXJyb3I7cmV0dXJuIHN9fX19dmFyIGssaixFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIG5ldyBBcnJheSh0KzEpLmpvaW4oZSl9LEE9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gRShcIjBcIix0LWUudG9TdHJpbmcoKS5sZW5ndGgpK2V9LEQ9ZnVuY3Rpb24oZSl7cmV0dXJuIEEoZS5nZXRIb3VycygpLDIpK1wiOlwiK0EoZS5nZXRNaW51dGVzKCksMikrXCI6XCIrQShlLmdldFNlY29uZHMoKSwyKStcIi5cIitBKGUuZ2V0TWlsbGlzZWNvbmRzKCksMyl9LE89XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHBlcmZvcm1hbmNlJiZudWxsIT09cGVyZm9ybWFuY2UmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHBlcmZvcm1hbmNlLm5vdz9wZXJmb3JtYW5jZTpEYXRlLE49XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX0sUD1mdW5jdGlvbihlKXtpZihBcnJheS5pc0FycmF5KGUpKXtmb3IodmFyIHQ9MCxyPUFycmF5KGUubGVuZ3RoKTt0PGUubGVuZ3RoO3QrKylyW3RdPWVbdF07cmV0dXJuIHJ9cmV0dXJuIEFycmF5LmZyb20oZSl9LEM9W107az1cIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBnbG9iYWw/XCJ1bmRlZmluZWRcIjpOKGdsb2JhbCkpJiZnbG9iYWw/Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGo9ay5EZWVwRGlmZixqJiZDLnB1c2goZnVuY3Rpb24oKXtcInVuZGVmaW5lZFwiIT10eXBlb2YgaiYmay5EZWVwRGlmZj09PWMmJihrLkRlZXBEaWZmPWosaj12b2lkIDApfSksdChuLHIpLHQobyxyKSx0KGksciksdChhLHIpLE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGMse2RpZmY6e3ZhbHVlOmMsZW51bWVyYWJsZTohMH0sb2JzZXJ2YWJsZURpZmY6e3ZhbHVlOmwsZW51bWVyYWJsZTohMH0sYXBwbHlEaWZmOnt2YWx1ZTpoLGVudW1lcmFibGU6ITB9LGFwcGx5Q2hhbmdlOnt2YWx1ZTpkLGVudW1lcmFibGU6ITB9LHJldmVydENoYW5nZTp7dmFsdWU6ZyxlbnVtZXJhYmxlOiEwfSxpc0NvbmZsaWN0Ont2YWx1ZTpmdW5jdGlvbigpe3JldHVyblwidW5kZWZpbmVkXCIhPXR5cGVvZiBqfSxlbnVtZXJhYmxlOiEwfSxub0NvbmZsaWN0Ont2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBDJiYoQy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UoKX0pLEM9bnVsbCksY30sZW51bWVyYWJsZTohMH19KTt2YXIgRj17RTp7Y29sb3I6XCIjMjE5NkYzXCIsdGV4dDpcIkNIQU5HRUQ6XCJ9LE46e2NvbG9yOlwiIzRDQUY1MFwiLHRleHQ6XCJBRERFRDpcIn0sRDp7Y29sb3I6XCIjRjQ0MzM2XCIsdGV4dDpcIkRFTEVURUQ6XCJ9LEE6e2NvbG9yOlwiIzIxOTZGM1wiLHRleHQ6XCJBUlJBWTpcIn19LEw9e2xldmVsOlwibG9nXCIsbG9nZ2VyOmNvbnNvbGUsbG9nRXJyb3JzOiEwLGNvbGxhcHNlZDp2b2lkIDAscHJlZGljYXRlOnZvaWQgMCxkdXJhdGlvbjohMSx0aW1lc3RhbXA6ITAsc3RhdGVUcmFuc2Zvcm1lcjpmdW5jdGlvbihlKXtyZXR1cm4gZX0sYWN0aW9uVHJhbnNmb3JtZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGV9LGVycm9yVHJhbnNmb3JtZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGV9LGNvbG9yczp7dGl0bGU6ZnVuY3Rpb24oKXtyZXR1cm5cImluaGVyaXRcIn0scHJldlN0YXRlOmZ1bmN0aW9uKCl7cmV0dXJuXCIjOUU5RTlFXCJ9LGFjdGlvbjpmdW5jdGlvbigpe3JldHVyblwiIzAzQTlGNFwifSxuZXh0U3RhdGU6ZnVuY3Rpb24oKXtyZXR1cm5cIiM0Q0FGNTBcIn0sZXJyb3I6ZnVuY3Rpb24oKXtyZXR1cm5cIiNGMjA0MDRcIn19LGRpZmY6ITEsZGlmZlByZWRpY2F0ZTp2b2lkIDAsdHJhbnNmb3JtZXI6dm9pZCAwfSxUPWZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9LHQ9ZS5kaXNwYXRjaCxyPWUuZ2V0U3RhdGU7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdHx8XCJmdW5jdGlvblwiPT10eXBlb2Ygcj9TKCkoe2Rpc3BhdGNoOnQsZ2V0U3RhdGU6cn0pOnZvaWQgY29uc29sZS5lcnJvcihcIlxcbltyZWR1eC1sb2dnZXIgdjNdIEJSRUFLSU5HIENIQU5HRVxcbltyZWR1eC1sb2dnZXIgdjNdIFNpbmNlIDMuMC4wIHJlZHV4LWxvZ2dlciBleHBvcnRzIGJ5IGRlZmF1bHQgbG9nZ2VyIHdpdGggZGVmYXVsdCBzZXR0aW5ncy5cXG5bcmVkdXgtbG9nZ2VyIHYzXSBDaGFuZ2VcXG5bcmVkdXgtbG9nZ2VyIHYzXSBpbXBvcnQgY3JlYXRlTG9nZ2VyIGZyb20gJ3JlZHV4LWxvZ2dlcidcXG5bcmVkdXgtbG9nZ2VyIHYzXSB0b1xcbltyZWR1eC1sb2dnZXIgdjNdIGltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJ3JlZHV4LWxvZ2dlcidcXG5cIil9O2UuZGVmYXVsdHM9TCxlLmNyZWF0ZUxvZ2dlcj1TLGUubG9nZ2VyPVQsZS5kZWZhdWx0PVQsT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSl9KTtcbiIsImZ1bmN0aW9uIGNyZWF0ZVRodW5rTWlkZGxld2FyZShleHRyYUFyZ3VtZW50KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBkaXNwYXRjaCA9IF9yZWYuZGlzcGF0Y2gsXG4gICAgICAgIGdldFN0YXRlID0gX3JlZi5nZXRTdGF0ZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIGFjdGlvbihkaXNwYXRjaCwgZ2V0U3RhdGUsIGV4dHJhQXJndW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgIH07XG4gICAgfTtcbiAgfTtcbn1cblxudmFyIHRodW5rID0gY3JlYXRlVGh1bmtNaWRkbGV3YXJlKCk7XG50aHVuay53aXRoRXh0cmFBcmd1bWVudCA9IGNyZWF0ZVRodW5rTWlkZGxld2FyZTtcblxuZXhwb3J0IGRlZmF1bHQgdGh1bms7IiwiaW1wb3J0ICQkb2JzZXJ2YWJsZSBmcm9tICdzeW1ib2wtb2JzZXJ2YWJsZSc7XG5cbi8qKlxuICogVGhlc2UgYXJlIHByaXZhdGUgYWN0aW9uIHR5cGVzIHJlc2VydmVkIGJ5IFJlZHV4LlxuICogRm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHlvdSBtdXN0IHJldHVybiB0aGUgY3VycmVudCBzdGF0ZS5cbiAqIElmIHRoZSBjdXJyZW50IHN0YXRlIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLlxuICogRG8gbm90IHJlZmVyZW5jZSB0aGVzZSBhY3Rpb24gdHlwZXMgZGlyZWN0bHkgaW4geW91ciBjb2RlLlxuICovXG52YXIgcmFuZG9tU3RyaW5nID0gZnVuY3Rpb24gcmFuZG9tU3RyaW5nKCkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLnNwbGl0KCcnKS5qb2luKCcuJyk7XG59O1xuXG52YXIgQWN0aW9uVHlwZXMgPSB7XG4gIElOSVQ6IFwiQEByZWR1eC9JTklUXCIgKyByYW5kb21TdHJpbmcoKSxcbiAgUkVQTEFDRTogXCJAQHJlZHV4L1JFUExBQ0VcIiArIHJhbmRvbVN0cmluZygpLFxuICBQUk9CRV9VTktOT1dOX0FDVElPTjogZnVuY3Rpb24gUFJPQkVfVU5LTk9XTl9BQ1RJT04oKSB7XG4gICAgcmV0dXJuIFwiQEByZWR1eC9QUk9CRV9VTktOT1dOX0FDVElPTlwiICsgcmFuZG9tU3RyaW5nKCk7XG4gIH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHthbnl9IG9iaiBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgYXJndW1lbnQgYXBwZWFycyB0byBiZSBhIHBsYWluIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICB2YXIgcHJvdG8gPSBvYmo7XG5cbiAgd2hpbGUgKE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90bykgIT09IG51bGwpIHtcbiAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBSZWR1eCBzdG9yZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSB0cmVlLlxuICogVGhlIG9ubHkgd2F5IHRvIGNoYW5nZSB0aGUgZGF0YSBpbiB0aGUgc3RvcmUgaXMgdG8gY2FsbCBgZGlzcGF0Y2goKWAgb24gaXQuXG4gKlxuICogVGhlcmUgc2hvdWxkIG9ubHkgYmUgYSBzaW5nbGUgc3RvcmUgaW4geW91ciBhcHAuIFRvIHNwZWNpZnkgaG93IGRpZmZlcmVudFxuICogcGFydHMgb2YgdGhlIHN0YXRlIHRyZWUgcmVzcG9uZCB0byBhY3Rpb25zLCB5b3UgbWF5IGNvbWJpbmUgc2V2ZXJhbCByZWR1Y2Vyc1xuICogaW50byBhIHNpbmdsZSByZWR1Y2VyIGZ1bmN0aW9uIGJ5IHVzaW5nIGBjb21iaW5lUmVkdWNlcnNgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlZHVjZXIgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5leHQgc3RhdGUgdHJlZSwgZ2l2ZW5cbiAqIHRoZSBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBhY3Rpb24gdG8gaGFuZGxlLlxuICpcbiAqIEBwYXJhbSB7YW55fSBbcHJlbG9hZGVkU3RhdGVdIFRoZSBpbml0aWFsIHN0YXRlLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICogdG8gaHlkcmF0ZSB0aGUgc3RhdGUgZnJvbSB0aGUgc2VydmVyIGluIHVuaXZlcnNhbCBhcHBzLCBvciB0byByZXN0b3JlIGFcbiAqIHByZXZpb3VzbHkgc2VyaWFsaXplZCB1c2VyIHNlc3Npb24uXG4gKiBJZiB5b3UgdXNlIGBjb21iaW5lUmVkdWNlcnNgIHRvIHByb2R1Y2UgdGhlIHJvb3QgcmVkdWNlciBmdW5jdGlvbiwgdGhpcyBtdXN0IGJlXG4gKiBhbiBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzaGFwZSBhcyBgY29tYmluZVJlZHVjZXJzYCBrZXlzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtlbmhhbmNlcl0gVGhlIHN0b3JlIGVuaGFuY2VyLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICogdG8gZW5oYW5jZSB0aGUgc3RvcmUgd2l0aCB0aGlyZC1wYXJ0eSBjYXBhYmlsaXRpZXMgc3VjaCBhcyBtaWRkbGV3YXJlLFxuICogdGltZSB0cmF2ZWwsIHBlcnNpc3RlbmNlLCBldGMuIFRoZSBvbmx5IHN0b3JlIGVuaGFuY2VyIHRoYXQgc2hpcHMgd2l0aCBSZWR1eFxuICogaXMgYGFwcGx5TWlkZGxld2FyZSgpYC5cbiAqXG4gKiBAcmV0dXJucyB7U3RvcmV9IEEgUmVkdXggc3RvcmUgdGhhdCBsZXRzIHlvdSByZWFkIHRoZSBzdGF0ZSwgZGlzcGF0Y2ggYWN0aW9uc1xuICogYW5kIHN1YnNjcmliZSB0byBjaGFuZ2VzLlxuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuICB2YXIgX3JlZjI7XG5cbiAgaWYgKHR5cGVvZiBwcmVsb2FkZWRTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZW5oYW5jZXIgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVuaGFuY2VyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBhcmd1bWVudHNbM10gPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0l0IGxvb2tzIGxpa2UgeW91IGFyZSBwYXNzaW5nIHNldmVyYWwgc3RvcmUgZW5oYW5jZXJzIHRvICcgKyAnY3JlYXRlU3RvcmUoKS4gVGhpcyBpcyBub3Qgc3VwcG9ydGVkLiBJbnN0ZWFkLCBjb21wb3NlIHRoZW0gJyArICd0b2dldGhlciB0byBhIHNpbmdsZSBmdW5jdGlvbicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBwcmVsb2FkZWRTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZW5oYW5jZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZW5oYW5jZXIgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgICBwcmVsb2FkZWRTdGF0ZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgZW5oYW5jZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZW5oYW5jZXIoY3JlYXRlU3RvcmUpKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgcmVkdWNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIHJlZHVjZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciBjdXJyZW50UmVkdWNlciA9IHJlZHVjZXI7XG4gIHZhciBjdXJyZW50U3RhdGUgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgdmFyIGN1cnJlbnRMaXN0ZW5lcnMgPSBbXTtcbiAgdmFyIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzO1xuICB2YXIgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKG5leHRMaXN0ZW5lcnMgPT09IGN1cnJlbnRMaXN0ZW5lcnMpIHtcbiAgICAgIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgc3RhdGUgdHJlZSBtYW5hZ2VkIGJ5IHRoZSBzdG9yZS5cbiAgICpcbiAgICogQHJldHVybnMge2FueX0gVGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtYXkgbm90IGNhbGwgc3RvcmUuZ2V0U3RhdGUoKSB3aGlsZSB0aGUgcmVkdWNlciBpcyBleGVjdXRpbmcuICcgKyAnVGhlIHJlZHVjZXIgaGFzIGFscmVhZHkgcmVjZWl2ZWQgdGhlIHN0YXRlIGFzIGFuIGFyZ3VtZW50LiAnICsgJ1Bhc3MgaXQgZG93biBmcm9tIHRoZSB0b3AgcmVkdWNlciBpbnN0ZWFkIG9mIHJlYWRpbmcgaXQgZnJvbSB0aGUgc3RvcmUuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgfVxuICAvKipcbiAgICogQWRkcyBhIGNoYW5nZSBsaXN0ZW5lci4gSXQgd2lsbCBiZSBjYWxsZWQgYW55IHRpbWUgYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQsXG4gICAqIGFuZCBzb21lIHBhcnQgb2YgdGhlIHN0YXRlIHRyZWUgbWF5IHBvdGVudGlhbGx5IGhhdmUgY2hhbmdlZC4gWW91IG1heSB0aGVuXG4gICAqIGNhbGwgYGdldFN0YXRlKClgIHRvIHJlYWQgdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBpbnNpZGUgdGhlIGNhbGxiYWNrLlxuICAgKlxuICAgKiBZb3UgbWF5IGNhbGwgYGRpc3BhdGNoKClgIGZyb20gYSBjaGFuZ2UgbGlzdGVuZXIsIHdpdGggdGhlIGZvbGxvd2luZ1xuICAgKiBjYXZlYXRzOlxuICAgKlxuICAgKiAxLiBUaGUgc3Vic2NyaXB0aW9ucyBhcmUgc25hcHNob3R0ZWQganVzdCBiZWZvcmUgZXZlcnkgYGRpc3BhdGNoKClgIGNhbGwuXG4gICAqIElmIHlvdSBzdWJzY3JpYmUgb3IgdW5zdWJzY3JpYmUgd2hpbGUgdGhlIGxpc3RlbmVycyBhcmUgYmVpbmcgaW52b2tlZCwgdGhpc1xuICAgKiB3aWxsIG5vdCBoYXZlIGFueSBlZmZlY3Qgb24gdGhlIGBkaXNwYXRjaCgpYCB0aGF0IGlzIGN1cnJlbnRseSBpbiBwcm9ncmVzcy5cbiAgICogSG93ZXZlciwgdGhlIG5leHQgYGRpc3BhdGNoKClgIGNhbGwsIHdoZXRoZXIgbmVzdGVkIG9yIG5vdCwgd2lsbCB1c2UgYSBtb3JlXG4gICAqIHJlY2VudCBzbmFwc2hvdCBvZiB0aGUgc3Vic2NyaXB0aW9uIGxpc3QuXG4gICAqXG4gICAqIDIuIFRoZSBsaXN0ZW5lciBzaG91bGQgbm90IGV4cGVjdCB0byBzZWUgYWxsIHN0YXRlIGNoYW5nZXMsIGFzIHRoZSBzdGF0ZVxuICAgKiBtaWdodCBoYXZlIGJlZW4gdXBkYXRlZCBtdWx0aXBsZSB0aW1lcyBkdXJpbmcgYSBuZXN0ZWQgYGRpc3BhdGNoKClgIGJlZm9yZVxuICAgKiB0aGUgbGlzdGVuZXIgaXMgY2FsbGVkLiBJdCBpcywgaG93ZXZlciwgZ3VhcmFudGVlZCB0aGF0IGFsbCBzdWJzY3JpYmVyc1xuICAgKiByZWdpc3RlcmVkIGJlZm9yZSB0aGUgYGRpc3BhdGNoKClgIHN0YXJ0ZWQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgbGF0ZXN0XG4gICAqIHN0YXRlIGJ5IHRoZSB0aW1lIGl0IGV4aXRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBBIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgb24gZXZlcnkgZGlzcGF0Y2guXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0byByZW1vdmUgdGhpcyBjaGFuZ2UgbGlzdGVuZXIuXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgbGlzdGVuZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbWF5IG5vdCBjYWxsIHN0b3JlLnN1YnNjcmliZSgpIHdoaWxlIHRoZSByZWR1Y2VyIGlzIGV4ZWN1dGluZy4gJyArICdJZiB5b3Ugd291bGQgbGlrZSB0byBiZSBub3RpZmllZCBhZnRlciB0aGUgc3RvcmUgaGFzIGJlZW4gdXBkYXRlZCwgc3Vic2NyaWJlIGZyb20gYSAnICsgJ2NvbXBvbmVudCBhbmQgaW52b2tlIHN0b3JlLmdldFN0YXRlKCkgaW4gdGhlIGNhbGxiYWNrIHRvIGFjY2VzcyB0aGUgbGF0ZXN0IHN0YXRlLiAnICsgJ1NlZSBodHRwczovL3JlZHV4LmpzLm9yZy9hcGktcmVmZXJlbmNlL3N0b3JlI3N1YnNjcmliZShsaXN0ZW5lcikgZm9yIG1vcmUgZGV0YWlscy4nKTtcbiAgICB9XG5cbiAgICB2YXIgaXNTdWJzY3JpYmVkID0gdHJ1ZTtcbiAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgbmV4dExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICBpZiAoIWlzU3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG1heSBub3QgdW5zdWJzY3JpYmUgZnJvbSBhIHN0b3JlIGxpc3RlbmVyIHdoaWxlIHRoZSByZWR1Y2VyIGlzIGV4ZWN1dGluZy4gJyArICdTZWUgaHR0cHM6Ly9yZWR1eC5qcy5vcmcvYXBpLXJlZmVyZW5jZS9zdG9yZSNzdWJzY3JpYmUobGlzdGVuZXIpIGZvciBtb3JlIGRldGFpbHMuJyk7XG4gICAgICB9XG5cbiAgICAgIGlzU3Vic2NyaWJlZCA9IGZhbHNlO1xuICAgICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgICAgdmFyIGluZGV4ID0gbmV4dExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgIG5leHRMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbi4gSXQgaXMgdGhlIG9ubHkgd2F5IHRvIHRyaWdnZXIgYSBzdGF0ZSBjaGFuZ2UuXG4gICAqXG4gICAqIFRoZSBgcmVkdWNlcmAgZnVuY3Rpb24sIHVzZWQgdG8gY3JlYXRlIHRoZSBzdG9yZSwgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGVcbiAgICogY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgZ2l2ZW4gYGFjdGlvbmAuIEl0cyByZXR1cm4gdmFsdWUgd2lsbFxuICAgKiBiZSBjb25zaWRlcmVkIHRoZSAqKm5leHQqKiBzdGF0ZSBvZiB0aGUgdHJlZSwgYW5kIHRoZSBjaGFuZ2UgbGlzdGVuZXJzXG4gICAqIHdpbGwgYmUgbm90aWZpZWQuXG4gICAqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9ubHkgc3VwcG9ydHMgcGxhaW4gb2JqZWN0IGFjdGlvbnMuIElmIHlvdSB3YW50IHRvXG4gICAqIGRpc3BhdGNoIGEgUHJvbWlzZSwgYW4gT2JzZXJ2YWJsZSwgYSB0aHVuaywgb3Igc29tZXRoaW5nIGVsc2UsIHlvdSBuZWVkIHRvXG4gICAqIHdyYXAgeW91ciBzdG9yZSBjcmVhdGluZyBmdW5jdGlvbiBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIG1pZGRsZXdhcmUuIEZvclxuICAgKiBleGFtcGxlLCBzZWUgdGhlIGRvY3VtZW50YXRpb24gZm9yIHRoZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UuIEV2ZW4gdGhlXG4gICAqIG1pZGRsZXdhcmUgd2lsbCBldmVudHVhbGx5IGRpc3BhdGNoIHBsYWluIG9iamVjdCBhY3Rpb25zIHVzaW5nIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIEEgcGxhaW4gb2JqZWN0IHJlcHJlc2VudGluZyDigJx3aGF0IGNoYW5nZWTigJ0uIEl0IGlzXG4gICAqIGEgZ29vZCBpZGVhIHRvIGtlZXAgYWN0aW9ucyBzZXJpYWxpemFibGUgc28geW91IGNhbiByZWNvcmQgYW5kIHJlcGxheSB1c2VyXG4gICAqIHNlc3Npb25zLCBvciB1c2UgdGhlIHRpbWUgdHJhdmVsbGluZyBgcmVkdXgtZGV2dG9vbHNgLiBBbiBhY3Rpb24gbXVzdCBoYXZlXG4gICAqIGEgYHR5cGVgIHByb3BlcnR5IHdoaWNoIG1heSBub3QgYmUgYHVuZGVmaW5lZGAuIEl0IGlzIGEgZ29vZCBpZGVhIHRvIHVzZVxuICAgKiBzdHJpbmcgY29uc3RhbnRzIGZvciBhY3Rpb24gdHlwZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEZvciBjb252ZW5pZW5jZSwgdGhlIHNhbWUgYWN0aW9uIG9iamVjdCB5b3UgZGlzcGF0Y2hlZC5cbiAgICpcbiAgICogTm90ZSB0aGF0LCBpZiB5b3UgdXNlIGEgY3VzdG9tIG1pZGRsZXdhcmUsIGl0IG1heSB3cmFwIGBkaXNwYXRjaCgpYCB0b1xuICAgKiByZXR1cm4gc29tZXRoaW5nIGVsc2UgKGZvciBleGFtcGxlLCBhIFByb21pc2UgeW91IGNhbiBhd2FpdCkuXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KGFjdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtdXN0IGJlIHBsYWluIG9iamVjdHMuICcgKyAnVXNlIGN1c3RvbSBtaWRkbGV3YXJlIGZvciBhc3luYyBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYWN0aW9uLnR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbWF5IG5vdCBoYXZlIGFuIHVuZGVmaW5lZCBcInR5cGVcIiBwcm9wZXJ0eS4gJyArICdIYXZlIHlvdSBtaXNzcGVsbGVkIGEgY29uc3RhbnQ/Jyk7XG4gICAgfVxuXG4gICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlcnMgbWF5IG5vdCBkaXNwYXRjaCBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IGN1cnJlbnRSZWR1Y2VyKGN1cnJlbnRTdGF0ZSwgYWN0aW9uKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBsaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzID0gbmV4dExpc3RlbmVycztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICBsaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb247XG4gIH1cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHRoZSByZWR1Y2VyIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBzdG9yZSB0byBjYWxjdWxhdGUgdGhlIHN0YXRlLlxuICAgKlxuICAgKiBZb3UgbWlnaHQgbmVlZCB0aGlzIGlmIHlvdXIgYXBwIGltcGxlbWVudHMgY29kZSBzcGxpdHRpbmcgYW5kIHlvdSB3YW50IHRvXG4gICAqIGxvYWQgc29tZSBvZiB0aGUgcmVkdWNlcnMgZHluYW1pY2FsbHkuIFlvdSBtaWdodCBhbHNvIG5lZWQgdGhpcyBpZiB5b3VcbiAgICogaW1wbGVtZW50IGEgaG90IHJlbG9hZGluZyBtZWNoYW5pc20gZm9yIFJlZHV4LlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXh0UmVkdWNlciBUaGUgcmVkdWNlciBmb3IgdGhlIHN0b3JlIHRvIHVzZSBpbnN0ZWFkLlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG5cblxuICBmdW5jdGlvbiByZXBsYWNlUmVkdWNlcihuZXh0UmVkdWNlcikge1xuICAgIGlmICh0eXBlb2YgbmV4dFJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIG5leHRSZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgY3VycmVudFJlZHVjZXIgPSBuZXh0UmVkdWNlcjtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBBY3Rpb25UeXBlcy5SRVBMQUNFXG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIEludGVyb3BlcmFiaWxpdHkgcG9pbnQgZm9yIG9ic2VydmFibGUvcmVhY3RpdmUgbGlicmFyaWVzLlxuICAgKiBAcmV0dXJucyB7b2JzZXJ2YWJsZX0gQSBtaW5pbWFsIG9ic2VydmFibGUgb2Ygc3RhdGUgY2hhbmdlcy5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgb2JzZXJ2YWJsZSBwcm9wb3NhbDpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JzZXJ2YWJsZVxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIG9ic2VydmFibGUoKSB7XG4gICAgdmFyIF9yZWY7XG5cbiAgICB2YXIgb3V0ZXJTdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgcmV0dXJuIF9yZWYgPSB7XG4gICAgICAvKipcbiAgICAgICAqIFRoZSBtaW5pbWFsIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uIG1ldGhvZC5cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYnNlcnZlciBBbnkgb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgYXMgYW4gb2JzZXJ2ZXIuXG4gICAgICAgKiBUaGUgb2JzZXJ2ZXIgb2JqZWN0IHNob3VsZCBoYXZlIGEgYG5leHRgIG1ldGhvZC5cbiAgICAgICAqIEByZXR1cm5zIHtzdWJzY3JpcHRpb259IEFuIG9iamVjdCB3aXRoIGFuIGB1bnN1YnNjcmliZWAgbWV0aG9kIHRoYXQgY2FuXG4gICAgICAgKiBiZSB1c2VkIHRvIHVuc3Vic2NyaWJlIHRoZSBvYnNlcnZhYmxlIGZyb20gdGhlIHN0b3JlLCBhbmQgcHJldmVudCBmdXJ0aGVyXG4gICAgICAgKiBlbWlzc2lvbiBvZiB2YWx1ZXMgZnJvbSB0aGUgb2JzZXJ2YWJsZS5cbiAgICAgICAqL1xuICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbiBzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYnNlcnZlciAhPT0gJ29iamVjdCcgfHwgb2JzZXJ2ZXIgPT09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCB0aGUgb2JzZXJ2ZXIgdG8gYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb2JzZXJ2ZVN0YXRlKCkge1xuICAgICAgICAgIGlmIChvYnNlcnZlci5uZXh0KSB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGdldFN0YXRlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9ic2VydmVTdGF0ZSgpO1xuICAgICAgICB2YXIgdW5zdWJzY3JpYmUgPSBvdXRlclN1YnNjcmliZShvYnNlcnZlU3RhdGUpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHVuc3Vic2NyaWJlOiB1bnN1YnNjcmliZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sIF9yZWZbJCRvYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIF9yZWY7XG4gIH0gLy8gV2hlbiBhIHN0b3JlIGlzIGNyZWF0ZWQsIGFuIFwiSU5JVFwiIGFjdGlvbiBpcyBkaXNwYXRjaGVkIHNvIHRoYXQgZXZlcnlcbiAgLy8gcmVkdWNlciByZXR1cm5zIHRoZWlyIGluaXRpYWwgc3RhdGUuIFRoaXMgZWZmZWN0aXZlbHkgcG9wdWxhdGVzXG4gIC8vIHRoZSBpbml0aWFsIHN0YXRlIHRyZWUuXG5cblxuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuSU5JVFxuICB9KTtcbiAgcmV0dXJuIF9yZWYyID0ge1xuICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICBzdWJzY3JpYmU6IHN1YnNjcmliZSxcbiAgICBnZXRTdGF0ZTogZ2V0U3RhdGUsXG4gICAgcmVwbGFjZVJlZHVjZXI6IHJlcGxhY2VSZWR1Y2VyXG4gIH0sIF9yZWYyWyQkb2JzZXJ2YWJsZV0gPSBvYnNlcnZhYmxlLCBfcmVmMjtcbn1cblxuLyoqXG4gKiBQcmludHMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuXG5cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IGlmIHlvdSBlbmFibGVcbiAgICAvLyBcImJyZWFrIG9uIGFsbCBleGNlcHRpb25zXCIgaW4geW91ciBjb25zb2xlLFxuICAgIC8vIGl0IHdvdWxkIHBhdXNlIHRoZSBleGVjdXRpb24gYXQgdGhpcyBsaW5lLlxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfSBjYXRjaCAoZSkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lbXB0eVxuXG59XG5cbmZ1bmN0aW9uIGdldFVuZGVmaW5lZFN0YXRlRXJyb3JNZXNzYWdlKGtleSwgYWN0aW9uKSB7XG4gIHZhciBhY3Rpb25UeXBlID0gYWN0aW9uICYmIGFjdGlvbi50eXBlO1xuICB2YXIgYWN0aW9uRGVzY3JpcHRpb24gPSBhY3Rpb25UeXBlICYmIFwiYWN0aW9uIFxcXCJcIiArIFN0cmluZyhhY3Rpb25UeXBlKSArIFwiXFxcIlwiIHx8ICdhbiBhY3Rpb24nO1xuICByZXR1cm4gXCJHaXZlbiBcIiArIGFjdGlvbkRlc2NyaXB0aW9uICsgXCIsIHJlZHVjZXIgXFxcIlwiICsga2V5ICsgXCJcXFwiIHJldHVybmVkIHVuZGVmaW5lZC4gXCIgKyBcIlRvIGlnbm9yZSBhbiBhY3Rpb24sIHlvdSBtdXN0IGV4cGxpY2l0bHkgcmV0dXJuIHRoZSBwcmV2aW91cyBzdGF0ZS4gXCIgKyBcIklmIHlvdSB3YW50IHRoaXMgcmVkdWNlciB0byBob2xkIG5vIHZhbHVlLCB5b3UgY2FuIHJldHVybiBudWxsIGluc3RlYWQgb2YgdW5kZWZpbmVkLlwiO1xufVxuXG5mdW5jdGlvbiBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKGlucHV0U3RhdGUsIHJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSkge1xuICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG4gIHZhciBhcmd1bWVudE5hbWUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09IEFjdGlvblR5cGVzLklOSVQgPyAncHJlbG9hZGVkU3RhdGUgYXJndW1lbnQgcGFzc2VkIHRvIGNyZWF0ZVN0b3JlJyA6ICdwcmV2aW91cyBzdGF0ZSByZWNlaXZlZCBieSB0aGUgcmVkdWNlcic7XG5cbiAgaWYgKHJlZHVjZXJLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAnU3RvcmUgZG9lcyBub3QgaGF2ZSBhIHZhbGlkIHJlZHVjZXIuIE1ha2Ugc3VyZSB0aGUgYXJndW1lbnQgcGFzc2VkICcgKyAndG8gY29tYmluZVJlZHVjZXJzIGlzIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIHJlZHVjZXJzLic7XG4gIH1cblxuICBpZiAoIWlzUGxhaW5PYmplY3QoaW5wdXRTdGF0ZSkpIHtcbiAgICByZXR1cm4gXCJUaGUgXCIgKyBhcmd1bWVudE5hbWUgKyBcIiBoYXMgdW5leHBlY3RlZCB0eXBlIG9mIFxcXCJcIiArIHt9LnRvU3RyaW5nLmNhbGwoaW5wdXRTdGF0ZSkubWF0Y2goL1xccyhbYS16fEEtWl0rKS8pWzFdICsgXCJcXFwiLiBFeHBlY3RlZCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIFwiICsgKFwia2V5czogXFxcIlwiICsgcmVkdWNlcktleXMuam9pbignXCIsIFwiJykgKyBcIlxcXCJcIik7XG4gIH1cblxuICB2YXIgdW5leHBlY3RlZEtleXMgPSBPYmplY3Qua2V5cyhpbnB1dFN0YXRlKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiAhcmVkdWNlcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhdW5leHBlY3RlZEtleUNhY2hlW2tleV07XG4gIH0pO1xuICB1bmV4cGVjdGVkS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB1bmV4cGVjdGVkS2V5Q2FjaGVba2V5XSA9IHRydWU7XG4gIH0pO1xuICBpZiAoYWN0aW9uICYmIGFjdGlvbi50eXBlID09PSBBY3Rpb25UeXBlcy5SRVBMQUNFKSByZXR1cm47XG5cbiAgaWYgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gXCJVbmV4cGVjdGVkIFwiICsgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDEgPyAna2V5cycgOiAna2V5JykgKyBcIiBcIiArIChcIlxcXCJcIiArIHVuZXhwZWN0ZWRLZXlzLmpvaW4oJ1wiLCBcIicpICsgXCJcXFwiIGZvdW5kIGluIFwiICsgYXJndW1lbnROYW1lICsgXCIuIFwiKSArIFwiRXhwZWN0ZWQgdG8gZmluZCBvbmUgb2YgdGhlIGtub3duIHJlZHVjZXIga2V5cyBpbnN0ZWFkOiBcIiArIChcIlxcXCJcIiArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgXCJcXFwiLiBVbmV4cGVjdGVkIGtleXMgd2lsbCBiZSBpZ25vcmVkLlwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRSZWR1Y2VyU2hhcGUocmVkdWNlcnMpIHtcbiAgT2JqZWN0LmtleXMocmVkdWNlcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciByZWR1Y2VyID0gcmVkdWNlcnNba2V5XTtcbiAgICB2YXIgaW5pdGlhbFN0YXRlID0gcmVkdWNlcih1bmRlZmluZWQsIHtcbiAgICAgIHR5cGU6IEFjdGlvblR5cGVzLklOSVRcbiAgICB9KTtcblxuICAgIGlmICh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVkdWNlciBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgcmV0dXJuZWQgdW5kZWZpbmVkIGR1cmluZyBpbml0aWFsaXphdGlvbi4gXCIgKyBcIklmIHRoZSBzdGF0ZSBwYXNzZWQgdG8gdGhlIHJlZHVjZXIgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCBcIiArIFwiZXhwbGljaXRseSByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSBcIiArIFwibm90IGJlIHVuZGVmaW5lZC4gSWYgeW91IGRvbid0IHdhbnQgdG8gc2V0IGEgdmFsdWUgZm9yIHRoaXMgcmVkdWNlciwgXCIgKyBcInlvdSBjYW4gdXNlIG51bGwgaW5zdGVhZCBvZiB1bmRlZmluZWQuXCIpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVkdWNlcih1bmRlZmluZWQsIHtcbiAgICAgIHR5cGU6IEFjdGlvblR5cGVzLlBST0JFX1VOS05PV05fQUNUSU9OKClcbiAgICB9KSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlZHVjZXIgXFxcIlwiICsga2V5ICsgXCJcXFwiIHJldHVybmVkIHVuZGVmaW5lZCB3aGVuIHByb2JlZCB3aXRoIGEgcmFuZG9tIHR5cGUuIFwiICsgKFwiRG9uJ3QgdHJ5IHRvIGhhbmRsZSBcIiArIEFjdGlvblR5cGVzLklOSVQgKyBcIiBvciBvdGhlciBhY3Rpb25zIGluIFxcXCJyZWR1eC8qXFxcIiBcIikgKyBcIm5hbWVzcGFjZS4gVGhleSBhcmUgY29uc2lkZXJlZCBwcml2YXRlLiBJbnN0ZWFkLCB5b3UgbXVzdCByZXR1cm4gdGhlIFwiICsgXCJjdXJyZW50IHN0YXRlIGZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB1bmxlc3MgaXQgaXMgdW5kZWZpbmVkLCBcIiArIFwiaW4gd2hpY2ggY2FzZSB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUsIHJlZ2FyZGxlc3Mgb2YgdGhlIFwiICsgXCJhY3Rpb24gdHlwZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5IG5vdCBiZSB1bmRlZmluZWQsIGJ1dCBjYW4gYmUgbnVsbC5cIik7XG4gICAgfVxuICB9KTtcbn1cbi8qKlxuICogVHVybnMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgZGlmZmVyZW50IHJlZHVjZXIgZnVuY3Rpb25zLCBpbnRvIGEgc2luZ2xlXG4gKiByZWR1Y2VyIGZ1bmN0aW9uLiBJdCB3aWxsIGNhbGwgZXZlcnkgY2hpbGQgcmVkdWNlciwgYW5kIGdhdGhlciB0aGVpciByZXN1bHRzXG4gKiBpbnRvIGEgc2luZ2xlIHN0YXRlIG9iamVjdCwgd2hvc2Uga2V5cyBjb3JyZXNwb25kIHRvIHRoZSBrZXlzIG9mIHRoZSBwYXNzZWRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWR1Y2VycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGNvcnJlc3BvbmQgdG8gZGlmZmVyZW50XG4gKiByZWR1Y2VyIGZ1bmN0aW9ucyB0aGF0IG5lZWQgdG8gYmUgY29tYmluZWQgaW50byBvbmUuIE9uZSBoYW5keSB3YXkgdG8gb2J0YWluXG4gKiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhcyByZWR1Y2Vyc2Agc3ludGF4LiBUaGUgcmVkdWNlcnMgbWF5IG5ldmVyIHJldHVyblxuICogdW5kZWZpbmVkIGZvciBhbnkgYWN0aW9uLiBJbnN0ZWFkLCB0aGV5IHNob3VsZCByZXR1cm4gdGhlaXIgaW5pdGlhbCBzdGF0ZVxuICogaWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGVtIHdhcyB1bmRlZmluZWQsIGFuZCB0aGUgY3VycmVudCBzdGF0ZSBmb3IgYW55XG4gKiB1bnJlY29nbml6ZWQgYWN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSByZWR1Y2VyIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBldmVyeSByZWR1Y2VyIGluc2lkZSB0aGVcbiAqIHBhc3NlZCBvYmplY3QsIGFuZCBidWlsZHMgYSBzdGF0ZSBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzaGFwZS5cbiAqL1xuXG5cbmZ1bmN0aW9uIGNvbWJpbmVSZWR1Y2VycyhyZWR1Y2Vycykge1xuICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG4gIHZhciBmaW5hbFJlZHVjZXJzID0ge307XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWR1Y2VyS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSByZWR1Y2VyS2V5c1tpXTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAodHlwZW9mIHJlZHVjZXJzW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHdhcm5pbmcoXCJObyByZWR1Y2VyIHByb3ZpZGVkIGZvciBrZXkgXFxcIlwiICsga2V5ICsgXCJcXFwiXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZmluYWxSZWR1Y2Vyc1trZXldID0gcmVkdWNlcnNba2V5XTtcbiAgICB9XG4gIH1cblxuICB2YXIgZmluYWxSZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKGZpbmFsUmVkdWNlcnMpO1xuICB2YXIgdW5leHBlY3RlZEtleUNhY2hlO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdW5leHBlY3RlZEtleUNhY2hlID0ge307XG4gIH1cblxuICB2YXIgc2hhcGVBc3NlcnRpb25FcnJvcjtcblxuICB0cnkge1xuICAgIGFzc2VydFJlZHVjZXJTaGFwZShmaW5hbFJlZHVjZXJzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHNoYXBlQXNzZXJ0aW9uRXJyb3IgPSBlO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbWJpbmF0aW9uKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBpZiAoc3RhdGUgPT09IHZvaWQgMCkge1xuICAgICAgc3RhdGUgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAoc2hhcGVBc3NlcnRpb25FcnJvcikge1xuICAgICAgdGhyb3cgc2hhcGVBc3NlcnRpb25FcnJvcjtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIHdhcm5pbmdNZXNzYWdlID0gZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZShzdGF0ZSwgZmluYWxSZWR1Y2VycywgYWN0aW9uLCB1bmV4cGVjdGVkS2V5Q2FjaGUpO1xuXG4gICAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgICAgd2FybmluZyh3YXJuaW5nTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGhhc0NoYW5nZWQgPSBmYWxzZTtcbiAgICB2YXIgbmV4dFN0YXRlID0ge307XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgZmluYWxSZWR1Y2VyS2V5cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfa2V5ID0gZmluYWxSZWR1Y2VyS2V5c1tfaV07XG4gICAgICB2YXIgcmVkdWNlciA9IGZpbmFsUmVkdWNlcnNbX2tleV07XG4gICAgICB2YXIgcHJldmlvdXNTdGF0ZUZvcktleSA9IHN0YXRlW19rZXldO1xuICAgICAgdmFyIG5leHRTdGF0ZUZvcktleSA9IHJlZHVjZXIocHJldmlvdXNTdGF0ZUZvcktleSwgYWN0aW9uKTtcblxuICAgICAgaWYgKHR5cGVvZiBuZXh0U3RhdGVGb3JLZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShfa2V5LCBhY3Rpb24pO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgIH1cblxuICAgICAgbmV4dFN0YXRlW19rZXldID0gbmV4dFN0YXRlRm9yS2V5O1xuICAgICAgaGFzQ2hhbmdlZCA9IGhhc0NoYW5nZWQgfHwgbmV4dFN0YXRlRm9yS2V5ICE9PSBwcmV2aW91c1N0YXRlRm9yS2V5O1xuICAgIH1cblxuICAgIHJldHVybiBoYXNDaGFuZ2VkID8gbmV4dFN0YXRlIDogc3RhdGU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoKGFjdGlvbkNyZWF0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH07XG59XG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvbiBjcmVhdG9ycywgaW50byBhbiBvYmplY3Qgd2l0aCB0aGVcbiAqIHNhbWUga2V5cywgYnV0IHdpdGggZXZlcnkgZnVuY3Rpb24gd3JhcHBlZCBpbnRvIGEgYGRpc3BhdGNoYCBjYWxsIHNvIHRoZXlcbiAqIG1heSBiZSBpbnZva2VkIGRpcmVjdGx5LiBUaGlzIGlzIGp1c3QgYSBjb252ZW5pZW5jZSBtZXRob2QsIGFzIHlvdSBjYW4gY2FsbFxuICogYHN0b3JlLmRpc3BhdGNoKE15QWN0aW9uQ3JlYXRvcnMuZG9Tb21ldGhpbmcoKSlgIHlvdXJzZWxmIGp1c3QgZmluZS5cbiAqXG4gKiBGb3IgY29udmVuaWVuY2UsIHlvdSBjYW4gYWxzbyBwYXNzIGEgc2luZ2xlIGZ1bmN0aW9uIGFzIHRoZSBmaXJzdCBhcmd1bWVudCxcbiAqIGFuZCBnZXQgYSBmdW5jdGlvbiBpbiByZXR1cm4uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R9IGFjdGlvbkNyZWF0b3JzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvblxuICogY3JlYXRvciBmdW5jdGlvbnMuIE9uZSBoYW5keSB3YXkgdG8gb2J0YWluIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzYFxuICogc3ludGF4LiBZb3UgbWF5IGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBkaXNwYXRjaCBUaGUgYGRpc3BhdGNoYCBmdW5jdGlvbiBhdmFpbGFibGUgb24geW91ciBSZWR1eFxuICogc3RvcmUuXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufE9iamVjdH0gVGhlIG9iamVjdCBtaW1pY2tpbmcgdGhlIG9yaWdpbmFsIG9iamVjdCwgYnV0IHdpdGhcbiAqIGV2ZXJ5IGFjdGlvbiBjcmVhdG9yIHdyYXBwZWQgaW50byB0aGUgYGRpc3BhdGNoYCBjYWxsLiBJZiB5b3UgcGFzc2VkIGFcbiAqIGZ1bmN0aW9uIGFzIGBhY3Rpb25DcmVhdG9yc2AsIHRoZSByZXR1cm4gdmFsdWUgd2lsbCBhbHNvIGJlIGEgc2luZ2xlXG4gKiBmdW5jdGlvbi5cbiAqL1xuXG5cbmZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyAhPT0gJ29iamVjdCcgfHwgYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJiaW5kQWN0aW9uQ3JlYXRvcnMgZXhwZWN0ZWQgYW4gb2JqZWN0IG9yIGEgZnVuY3Rpb24sIGluc3RlYWQgcmVjZWl2ZWQgXCIgKyAoYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgYWN0aW9uQ3JlYXRvcnMpICsgXCIuIFwiICsgXCJEaWQgeW91IHdyaXRlIFxcXCJpbXBvcnQgQWN0aW9uQ3JlYXRvcnMgZnJvbVxcXCIgaW5zdGVhZCBvZiBcXFwiaW1wb3J0ICogYXMgQWN0aW9uQ3JlYXRvcnMgZnJvbVxcXCI/XCIpO1xuICB9XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhY3Rpb25DcmVhdG9ycyk7XG4gIHZhciBib3VuZEFjdGlvbkNyZWF0b3JzID0ge307XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgdmFyIGFjdGlvbkNyZWF0b3IgPSBhY3Rpb25DcmVhdG9yc1trZXldO1xuXG4gICAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBib3VuZEFjdGlvbkNyZWF0b3JzW2tleV0gPSBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9yLCBkaXNwYXRjaCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJvdW5kQWN0aW9uQ3JlYXRvcnM7XG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG4vKipcbiAqIENvbXBvc2VzIHNpbmdsZS1hcmd1bWVudCBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LiBUaGUgcmlnaHRtb3N0XG4gKiBmdW5jdGlvbiBjYW4gdGFrZSBtdWx0aXBsZSBhcmd1bWVudHMgYXMgaXQgcHJvdmlkZXMgdGhlIHNpZ25hdHVyZSBmb3JcbiAqIHRoZSByZXN1bHRpbmcgY29tcG9zaXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmNzIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvYnRhaW5lZCBieSBjb21wb3NpbmcgdGhlIGFyZ3VtZW50IGZ1bmN0aW9uc1xuICogZnJvbSByaWdodCB0byBsZWZ0LiBGb3IgZXhhbXBsZSwgY29tcG9zZShmLCBnLCBoKSBpcyBpZGVudGljYWwgdG8gZG9pbmdcbiAqICguLi5hcmdzKSA9PiBmKGcoaCguLi5hcmdzKSkpLlxuICovXG5mdW5jdGlvbiBjb21wb3NlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgZnVuY3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgZnVuY3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgIHJldHVybiBhcmc7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZnVuY3NbMF07XG4gIH1cblxuICByZXR1cm4gZnVuY3MucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhKGIuYXBwbHkodm9pZCAwLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RvcmUgZW5oYW5jZXIgdGhhdCBhcHBsaWVzIG1pZGRsZXdhcmUgdG8gdGhlIGRpc3BhdGNoIG1ldGhvZFxuICogb2YgdGhlIFJlZHV4IHN0b3JlLiBUaGlzIGlzIGhhbmR5IGZvciBhIHZhcmlldHkgb2YgdGFza3MsIHN1Y2ggYXMgZXhwcmVzc2luZ1xuICogYXN5bmNocm9ub3VzIGFjdGlvbnMgaW4gYSBjb25jaXNlIG1hbm5lciwgb3IgbG9nZ2luZyBldmVyeSBhY3Rpb24gcGF5bG9hZC5cbiAqXG4gKiBTZWUgYHJlZHV4LXRodW5rYCBwYWNrYWdlIGFzIGFuIGV4YW1wbGUgb2YgdGhlIFJlZHV4IG1pZGRsZXdhcmUuXG4gKlxuICogQmVjYXVzZSBtaWRkbGV3YXJlIGlzIHBvdGVudGlhbGx5IGFzeW5jaHJvbm91cywgdGhpcyBzaG91bGQgYmUgdGhlIGZpcnN0XG4gKiBzdG9yZSBlbmhhbmNlciBpbiB0aGUgY29tcG9zaXRpb24gY2hhaW4uXG4gKlxuICogTm90ZSB0aGF0IGVhY2ggbWlkZGxld2FyZSB3aWxsIGJlIGdpdmVuIHRoZSBgZGlzcGF0Y2hgIGFuZCBgZ2V0U3RhdGVgIGZ1bmN0aW9uc1xuICogYXMgbmFtZWQgYXJndW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IG1pZGRsZXdhcmVzIFRoZSBtaWRkbGV3YXJlIGNoYWluIHRvIGJlIGFwcGxpZWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgc3RvcmUgZW5oYW5jZXIgYXBwbHlpbmcgdGhlIG1pZGRsZXdhcmUuXG4gKi9cblxuZnVuY3Rpb24gYXBwbHlNaWRkbGV3YXJlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbWlkZGxld2FyZXMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgbWlkZGxld2FyZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGNyZWF0ZVN0b3JlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzdG9yZSA9IGNyZWF0ZVN0b3JlLmFwcGx5KHZvaWQgMCwgYXJndW1lbnRzKTtcblxuICAgICAgdmFyIF9kaXNwYXRjaCA9IGZ1bmN0aW9uIGRpc3BhdGNoKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEaXNwYXRjaGluZyB3aGlsZSBjb25zdHJ1Y3RpbmcgeW91ciBtaWRkbGV3YXJlIGlzIG5vdCBhbGxvd2VkLiBcIiArIFwiT3RoZXIgbWlkZGxld2FyZSB3b3VsZCBub3QgYmUgYXBwbGllZCB0byB0aGlzIGRpc3BhdGNoLlwiKTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBtaWRkbGV3YXJlQVBJID0ge1xuICAgICAgICBnZXRTdGF0ZTogc3RvcmUuZ2V0U3RhdGUsXG4gICAgICAgIGRpc3BhdGNoOiBmdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgICAgICAgICByZXR1cm4gX2Rpc3BhdGNoLmFwcGx5KHZvaWQgMCwgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHZhciBjaGFpbiA9IG1pZGRsZXdhcmVzLm1hcChmdW5jdGlvbiAobWlkZGxld2FyZSkge1xuICAgICAgICByZXR1cm4gbWlkZGxld2FyZShtaWRkbGV3YXJlQVBJKTtcbiAgICAgIH0pO1xuICAgICAgX2Rpc3BhdGNoID0gY29tcG9zZS5hcHBseSh2b2lkIDAsIGNoYWluKShzdG9yZS5kaXNwYXRjaCk7XG4gICAgICByZXR1cm4gX29iamVjdFNwcmVhZCh7fSwgc3RvcmUsIHtcbiAgICAgICAgZGlzcGF0Y2g6IF9kaXNwYXRjaFxuICAgICAgfSk7XG4gICAgfTtcbiAgfTtcbn1cblxuLypcbiAqIFRoaXMgaXMgYSBkdW1teSBmdW5jdGlvbiB0byBjaGVjayBpZiB0aGUgZnVuY3Rpb24gbmFtZSBoYXMgYmVlbiBhbHRlcmVkIGJ5IG1pbmlmaWNhdGlvbi5cbiAqIElmIHRoZSBmdW5jdGlvbiBoYXMgYmVlbiBtaW5pZmllZCBhbmQgTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJywgd2FybiB0aGUgdXNlci5cbiAqL1xuXG5mdW5jdGlvbiBpc0NydXNoZWQoKSB7fVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgaXNDcnVzaGVkLm5hbWUgPT09ICdzdHJpbmcnICYmIGlzQ3J1c2hlZC5uYW1lICE9PSAnaXNDcnVzaGVkJykge1xuICB3YXJuaW5nKCdZb3UgYXJlIGN1cnJlbnRseSB1c2luZyBtaW5pZmllZCBjb2RlIG91dHNpZGUgb2YgTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiLiAnICsgJ1RoaXMgbWVhbnMgdGhhdCB5b3UgYXJlIHJ1bm5pbmcgYSBzbG93ZXIgZGV2ZWxvcG1lbnQgYnVpbGQgb2YgUmVkdXguICcgKyAnWW91IGNhbiB1c2UgbG9vc2UtZW52aWZ5IChodHRwczovL2dpdGh1Yi5jb20vemVydG9zaC9sb29zZS1lbnZpZnkpIGZvciBicm93c2VyaWZ5ICcgKyAnb3Igc2V0dGluZyBtb2RlIHRvIHByb2R1Y3Rpb24gaW4gd2VicGFjayAoaHR0cHM6Ly93ZWJwYWNrLmpzLm9yZy9jb25jZXB0cy9tb2RlLykgJyArICd0byBlbnN1cmUgeW91IGhhdmUgdGhlIGNvcnJlY3QgY29kZSBmb3IgeW91ciBwcm9kdWN0aW9uIGJ1aWxkLicpO1xufVxuXG5leHBvcnQgeyBjcmVhdGVTdG9yZSwgY29tYmluZVJlZHVjZXJzLCBiaW5kQWN0aW9uQ3JlYXRvcnMsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSwgQWN0aW9uVHlwZXMgYXMgX19ET19OT1RfVVNFX19BY3Rpb25UeXBlcyB9O1xuIiwiLyoqIEBsaWNlbnNlIFJlYWN0IHYwLjEyLjBcbiAqIHNjaGVkdWxlci10cmFjaW5nLmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbi8vIEhlbHBzIGlkZW50aWZ5IHNpZGUgZWZmZWN0cyBpbiBiZWdpbi1waGFzZSBsaWZlY3ljbGUgaG9va3MgYW5kIHNldFN0YXRlIHJlZHVjZXJzOlxuXG5cbi8vIEluIHNvbWUgY2FzZXMsIFN0cmljdE1vZGUgc2hvdWxkIGFsc28gZG91YmxlLXJlbmRlciBsaWZlY3ljbGVzLlxuLy8gVGhpcyBjYW4gYmUgY29uZnVzaW5nIGZvciB0ZXN0cyB0aG91Z2gsXG4vLyBBbmQgaXQgY2FuIGJlIGJhZCBmb3IgcGVyZm9ybWFuY2UgaW4gcHJvZHVjdGlvbi5cbi8vIFRoaXMgZmVhdHVyZSBmbGFnIGNhbiBiZSB1c2VkIHRvIGNvbnRyb2wgdGhlIGJlaGF2aW9yOlxuXG5cbi8vIFRvIHByZXNlcnZlIHRoZSBcIlBhdXNlIG9uIGNhdWdodCBleGNlcHRpb25zXCIgYmVoYXZpb3Igb2YgdGhlIGRlYnVnZ2VyLCB3ZVxuLy8gcmVwbGF5IHRoZSBiZWdpbiBwaGFzZSBvZiBhIGZhaWxlZCBjb21wb25lbnQgaW5zaWRlIGludm9rZUd1YXJkZWRDYWxsYmFjay5cblxuXG4vLyBXYXJuIGFib3V0IGRlcHJlY2F0ZWQsIGFzeW5jLXVuc2FmZSBsaWZlY3ljbGVzOyByZWxhdGVzIHRvIFJGQyAjNjpcblxuXG4vLyBHYXRoZXIgYWR2YW5jZWQgdGltaW5nIG1ldHJpY3MgZm9yIFByb2ZpbGVyIHN1YnRyZWVzLlxuXG5cbi8vIFRyYWNlIHdoaWNoIGludGVyYWN0aW9ucyB0cmlnZ2VyIGVhY2ggY29tbWl0LlxudmFyIGVuYWJsZVNjaGVkdWxlclRyYWNpbmcgPSB0cnVlO1xuXG4vLyBPbmx5IHVzZWQgaW4gd3d3IGJ1aWxkcy5cbiAvLyBUT0RPOiB0cnVlPyBIZXJlIGl0IG1pZ2h0IGp1c3QgYmUgZmFsc2UuXG5cbi8vIE9ubHkgdXNlZCBpbiB3d3cgYnVpbGRzLlxuXG5cbi8vIE9ubHkgdXNlZCBpbiB3d3cgYnVpbGRzLlxuXG5cbi8vIFJlYWN0IEZpcmU6IHByZXZlbnQgdGhlIHZhbHVlIGFuZCBjaGVja2VkIGF0dHJpYnV0ZXMgZnJvbSBzeW5jaW5nXG4vLyB3aXRoIHRoZWlyIHJlbGF0ZWQgRE9NIHByb3BlcnRpZXNcblxuXG4vLyBUaGVzZSBBUElzIHdpbGwgbm8gbG9uZ2VyIGJlIFwidW5zdGFibGVcIiBpbiB0aGUgdXBjb21pbmcgMTYuNyByZWxlYXNlLFxuLy8gQ29udHJvbCB0aGlzIGJlaGF2aW9yIHdpdGggYSBmbGFnIHRvIHN1cHBvcnQgMTYuNiBtaW5vciByZWxlYXNlcyBpbiB0aGUgbWVhbndoaWxlLlxuXG52YXIgREVGQVVMVF9USFJFQURfSUQgPSAwO1xuXG4vLyBDb3VudGVycyB1c2VkIHRvIGdlbmVyYXRlIHVuaXF1ZSBJRHMuXG52YXIgaW50ZXJhY3Rpb25JRENvdW50ZXIgPSAwO1xudmFyIHRocmVhZElEQ291bnRlciA9IDA7XG5cbi8vIFNldCBvZiBjdXJyZW50bHkgdHJhY2VkIGludGVyYWN0aW9ucy5cbi8vIEludGVyYWN0aW9ucyBcInN0YWNrXCLigJNcbi8vIE1lYW5pbmcgdGhhdCBuZXdseSB0cmFjZWQgaW50ZXJhY3Rpb25zIGFyZSBhcHBlbmRlZCB0byB0aGUgcHJldmlvdXNseSBhY3RpdmUgc2V0LlxuLy8gV2hlbiBhbiBpbnRlcmFjdGlvbiBnb2VzIG91dCBvZiBzY29wZSwgdGhlIHByZXZpb3VzIHNldCAoaWYgYW55KSBpcyByZXN0b3JlZC5cbmV4cG9ydHMuX19pbnRlcmFjdGlvbnNSZWYgPSBudWxsO1xuXG4vLyBMaXN0ZW5lcihzKSB0byBub3RpZnkgd2hlbiBpbnRlcmFjdGlvbnMgYmVnaW4gYW5kIGVuZC5cbmV4cG9ydHMuX19zdWJzY3JpYmVyUmVmID0gbnVsbDtcblxuaWYgKGVuYWJsZVNjaGVkdWxlclRyYWNpbmcpIHtcbiAgZXhwb3J0cy5fX2ludGVyYWN0aW9uc1JlZiA9IHtcbiAgICBjdXJyZW50OiBuZXcgU2V0KClcbiAgfTtcbiAgZXhwb3J0cy5fX3N1YnNjcmliZXJSZWYgPSB7XG4gICAgY3VycmVudDogbnVsbFxuICB9O1xufVxuXG5mdW5jdGlvbiB1bnN0YWJsZV9jbGVhcihjYWxsYmFjaykge1xuICBpZiAoIWVuYWJsZVNjaGVkdWxlclRyYWNpbmcpIHtcbiAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgfVxuXG4gIHZhciBwcmV2SW50ZXJhY3Rpb25zID0gZXhwb3J0cy5fX2ludGVyYWN0aW9uc1JlZi5jdXJyZW50O1xuICBleHBvcnRzLl9faW50ZXJhY3Rpb25zUmVmLmN1cnJlbnQgPSBuZXcgU2V0KCk7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBleHBvcnRzLl9faW50ZXJhY3Rpb25zUmVmLmN1cnJlbnQgPSBwcmV2SW50ZXJhY3Rpb25zO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVuc3RhYmxlX2dldEN1cnJlbnQoKSB7XG4gIGlmICghZW5hYmxlU2NoZWR1bGVyVHJhY2luZykge1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBleHBvcnRzLl9faW50ZXJhY3Rpb25zUmVmLmN1cnJlbnQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gdW5zdGFibGVfZ2V0VGhyZWFkSUQoKSB7XG4gIHJldHVybiArK3RocmVhZElEQ291bnRlcjtcbn1cblxuZnVuY3Rpb24gdW5zdGFibGVfdHJhY2UobmFtZSwgdGltZXN0YW1wLCBjYWxsYmFjaykge1xuICB2YXIgdGhyZWFkSUQgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IERFRkFVTFRfVEhSRUFEX0lEO1xuXG4gIGlmICghZW5hYmxlU2NoZWR1bGVyVHJhY2luZykge1xuICAgIHJldHVybiBjYWxsYmFjaygpO1xuICB9XG5cbiAgdmFyIGludGVyYWN0aW9uID0ge1xuICAgIF9fY291bnQ6IDEsXG4gICAgaWQ6IGludGVyYWN0aW9uSURDb3VudGVyKyssXG4gICAgbmFtZTogbmFtZSxcbiAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcFxuICB9O1xuXG4gIHZhciBwcmV2SW50ZXJhY3Rpb25zID0gZXhwb3J0cy5fX2ludGVyYWN0aW9uc1JlZi5jdXJyZW50O1xuXG4gIC8vIFRyYWNlZCBpbnRlcmFjdGlvbnMgc2hvdWxkIHN0YWNrL2FjY3VtdWxhdGUuXG4gIC8vIFRvIGRvIHRoYXQsIGNsb25lIHRoZSBjdXJyZW50IGludGVyYWN0aW9ucy5cbiAgLy8gVGhlIHByZXZpb3VzIHNldCB3aWxsIGJlIHJlc3RvcmVkIHVwb24gY29tcGxldGlvbi5cbiAgdmFyIGludGVyYWN0aW9ucyA9IG5ldyBTZXQocHJldkludGVyYWN0aW9ucyk7XG4gIGludGVyYWN0aW9ucy5hZGQoaW50ZXJhY3Rpb24pO1xuICBleHBvcnRzLl9faW50ZXJhY3Rpb25zUmVmLmN1cnJlbnQgPSBpbnRlcmFjdGlvbnM7XG5cbiAgdmFyIHN1YnNjcmliZXIgPSBleHBvcnRzLl9fc3Vic2NyaWJlclJlZi5jdXJyZW50O1xuICB2YXIgcmV0dXJuVmFsdWUgPSB2b2lkIDA7XG5cbiAgdHJ5IHtcbiAgICBpZiAoc3Vic2NyaWJlciAhPT0gbnVsbCkge1xuICAgICAgc3Vic2NyaWJlci5vbkludGVyYWN0aW9uVHJhY2VkKGludGVyYWN0aW9uKTtcbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChzdWJzY3JpYmVyICE9PSBudWxsKSB7XG4gICAgICAgIHN1YnNjcmliZXIub25Xb3JrU3RhcnRlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuVmFsdWUgPSBjYWxsYmFjaygpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZXhwb3J0cy5fX2ludGVyYWN0aW9uc1JlZi5jdXJyZW50ID0gcHJldkludGVyYWN0aW9ucztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChzdWJzY3JpYmVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm9uV29ya1N0b3BwZWQoaW50ZXJhY3Rpb25zLCB0aHJlYWRJRCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGludGVyYWN0aW9uLl9fY291bnQtLTtcblxuICAgICAgICAgIC8vIElmIG5vIGFzeW5jIHdvcmsgd2FzIHNjaGVkdWxlZCBmb3IgdGhpcyBpbnRlcmFjdGlvbixcbiAgICAgICAgICAvLyBOb3RpZnkgc3Vic2NyaWJlcnMgdGhhdCBpdCdzIGNvbXBsZXRlZC5cbiAgICAgICAgICBpZiAoc3Vic2NyaWJlciAhPT0gbnVsbCAmJiBpbnRlcmFjdGlvbi5fX2NvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm9uSW50ZXJhY3Rpb25TY2hlZHVsZWRXb3JrQ29tcGxldGVkKGludGVyYWN0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0dXJuVmFsdWU7XG59XG5cbmZ1bmN0aW9uIHVuc3RhYmxlX3dyYXAoY2FsbGJhY2spIHtcbiAgdmFyIHRocmVhZElEID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBERUZBVUxUX1RIUkVBRF9JRDtcblxuICBpZiAoIWVuYWJsZVNjaGVkdWxlclRyYWNpbmcpIHtcbiAgICByZXR1cm4gY2FsbGJhY2s7XG4gIH1cblxuICB2YXIgd3JhcHBlZEludGVyYWN0aW9ucyA9IGV4cG9ydHMuX19pbnRlcmFjdGlvbnNSZWYuY3VycmVudDtcblxuICB2YXIgc3Vic2NyaWJlciA9IGV4cG9ydHMuX19zdWJzY3JpYmVyUmVmLmN1cnJlbnQ7XG4gIGlmIChzdWJzY3JpYmVyICE9PSBudWxsKSB7XG4gICAgc3Vic2NyaWJlci5vbldvcmtTY2hlZHVsZWQod3JhcHBlZEludGVyYWN0aW9ucywgdGhyZWFkSUQpO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSBwZW5kaW5nIGFzeW5jIHdvcmsgY291bnQgZm9yIHRoZSBjdXJyZW50IGludGVyYWN0aW9ucy5cbiAgLy8gVXBkYXRlIGFmdGVyIGNhbGxpbmcgc3Vic2NyaWJlcnMgaW4gY2FzZSBvZiBlcnJvci5cbiAgd3JhcHBlZEludGVyYWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChpbnRlcmFjdGlvbikge1xuICAgIGludGVyYWN0aW9uLl9fY291bnQrKztcbiAgfSk7XG5cbiAgdmFyIGhhc1J1biA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIHdyYXBwZWQoKSB7XG4gICAgdmFyIHByZXZJbnRlcmFjdGlvbnMgPSBleHBvcnRzLl9faW50ZXJhY3Rpb25zUmVmLmN1cnJlbnQ7XG4gICAgZXhwb3J0cy5fX2ludGVyYWN0aW9uc1JlZi5jdXJyZW50ID0gd3JhcHBlZEludGVyYWN0aW9ucztcblxuICAgIHN1YnNjcmliZXIgPSBleHBvcnRzLl9fc3Vic2NyaWJlclJlZi5jdXJyZW50O1xuXG4gICAgdHJ5IHtcbiAgICAgIHZhciByZXR1cm5WYWx1ZSA9IHZvaWQgMDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHN1YnNjcmliZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBzdWJzY3JpYmVyLm9uV29ya1N0YXJ0ZWQod3JhcHBlZEludGVyYWN0aW9ucywgdGhyZWFkSUQpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVyblZhbHVlID0gY2FsbGJhY2suYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGV4cG9ydHMuX19pbnRlcmFjdGlvbnNSZWYuY3VycmVudCA9IHByZXZJbnRlcmFjdGlvbnM7XG5cbiAgICAgICAgICBpZiAoc3Vic2NyaWJlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5vbldvcmtTdG9wcGVkKHdyYXBwZWRJbnRlcmFjdGlvbnMsIHRocmVhZElEKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoIWhhc1J1bikge1xuICAgICAgICAvLyBXZSBvbmx5IGV4cGVjdCBhIHdyYXBwZWQgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgb25jZSxcbiAgICAgICAgLy8gQnV0IGluIHRoZSBldmVudCB0aGF0IGl0J3MgZXhlY3V0ZWQgbW9yZSB0aGFuIG9uY2XigJNcbiAgICAgICAgLy8gT25seSBkZWNyZW1lbnQgdGhlIG91dHN0YW5kaW5nIGludGVyYWN0aW9uIGNvdW50cyBvbmNlLlxuICAgICAgICBoYXNSdW4gPSB0cnVlO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBwZW5kaW5nIGFzeW5jIGNvdW50cyBmb3IgYWxsIHdyYXBwZWQgaW50ZXJhY3Rpb25zLlxuICAgICAgICAvLyBJZiB0aGlzIHdhcyB0aGUgbGFzdCBzY2hlZHVsZWQgYXN5bmMgd29yayBmb3IgYW55IG9mIHRoZW0sXG4gICAgICAgIC8vIE1hcmsgdGhlbSBhcyBjb21wbGV0ZWQuXG4gICAgICAgIHdyYXBwZWRJbnRlcmFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgICAgICAgICBpbnRlcmFjdGlvbi5fX2NvdW50LS07XG5cbiAgICAgICAgICBpZiAoc3Vic2NyaWJlciAhPT0gbnVsbCAmJiBpbnRlcmFjdGlvbi5fX2NvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm9uSW50ZXJhY3Rpb25TY2hlZHVsZWRXb3JrQ29tcGxldGVkKGludGVyYWN0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHdyYXBwZWQuY2FuY2VsID0gZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIHN1YnNjcmliZXIgPSBleHBvcnRzLl9fc3Vic2NyaWJlclJlZi5jdXJyZW50O1xuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChzdWJzY3JpYmVyICE9PSBudWxsKSB7XG4gICAgICAgIHN1YnNjcmliZXIub25Xb3JrQ2FuY2VsZWQod3JhcHBlZEludGVyYWN0aW9ucywgdGhyZWFkSUQpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICAvLyBVcGRhdGUgcGVuZGluZyBhc3luYyBjb3VudHMgZm9yIGFsbCB3cmFwcGVkIGludGVyYWN0aW9ucy5cbiAgICAgIC8vIElmIHRoaXMgd2FzIHRoZSBsYXN0IHNjaGVkdWxlZCBhc3luYyB3b3JrIGZvciBhbnkgb2YgdGhlbSxcbiAgICAgIC8vIE1hcmsgdGhlbSBhcyBjb21wbGV0ZWQuXG4gICAgICB3cmFwcGVkSW50ZXJhY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gICAgICAgIGludGVyYWN0aW9uLl9fY291bnQtLTtcblxuICAgICAgICBpZiAoc3Vic2NyaWJlciAmJiBpbnRlcmFjdGlvbi5fX2NvdW50ID09PSAwKSB7XG4gICAgICAgICAgc3Vic2NyaWJlci5vbkludGVyYWN0aW9uU2NoZWR1bGVkV29ya0NvbXBsZXRlZChpbnRlcmFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gd3JhcHBlZDtcbn1cblxudmFyIHN1YnNjcmliZXJzID0gbnVsbDtcbmlmIChlbmFibGVTY2hlZHVsZXJUcmFjaW5nKSB7XG4gIHN1YnNjcmliZXJzID0gbmV3IFNldCgpO1xufVxuXG5mdW5jdGlvbiB1bnN0YWJsZV9zdWJzY3JpYmUoc3Vic2NyaWJlcikge1xuICBpZiAoZW5hYmxlU2NoZWR1bGVyVHJhY2luZykge1xuICAgIHN1YnNjcmliZXJzLmFkZChzdWJzY3JpYmVyKTtcblxuICAgIGlmIChzdWJzY3JpYmVycy5zaXplID09PSAxKSB7XG4gICAgICBleHBvcnRzLl9fc3Vic2NyaWJlclJlZi5jdXJyZW50ID0ge1xuICAgICAgICBvbkludGVyYWN0aW9uU2NoZWR1bGVkV29ya0NvbXBsZXRlZDogb25JbnRlcmFjdGlvblNjaGVkdWxlZFdvcmtDb21wbGV0ZWQsXG4gICAgICAgIG9uSW50ZXJhY3Rpb25UcmFjZWQ6IG9uSW50ZXJhY3Rpb25UcmFjZWQsXG4gICAgICAgIG9uV29ya0NhbmNlbGVkOiBvbldvcmtDYW5jZWxlZCxcbiAgICAgICAgb25Xb3JrU2NoZWR1bGVkOiBvbldvcmtTY2hlZHVsZWQsXG4gICAgICAgIG9uV29ya1N0YXJ0ZWQ6IG9uV29ya1N0YXJ0ZWQsXG4gICAgICAgIG9uV29ya1N0b3BwZWQ6IG9uV29ya1N0b3BwZWRcbiAgICAgIH07XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHVuc3RhYmxlX3Vuc3Vic2NyaWJlKHN1YnNjcmliZXIpIHtcbiAgaWYgKGVuYWJsZVNjaGVkdWxlclRyYWNpbmcpIHtcbiAgICBzdWJzY3JpYmVycy5kZWxldGUoc3Vic2NyaWJlcik7XG5cbiAgICBpZiAoc3Vic2NyaWJlcnMuc2l6ZSA9PT0gMCkge1xuICAgICAgZXhwb3J0cy5fX3N1YnNjcmliZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG9uSW50ZXJhY3Rpb25UcmFjZWQoaW50ZXJhY3Rpb24pIHtcbiAgdmFyIGRpZENhdGNoRXJyb3IgPSBmYWxzZTtcbiAgdmFyIGNhdWdodEVycm9yID0gbnVsbDtcblxuICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIHN1YnNjcmliZXIub25JbnRlcmFjdGlvblRyYWNlZChpbnRlcmFjdGlvbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmICghZGlkQ2F0Y2hFcnJvcikge1xuICAgICAgICBkaWRDYXRjaEVycm9yID0gdHJ1ZTtcbiAgICAgICAgY2F1Z2h0RXJyb3IgPSBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGlmIChkaWRDYXRjaEVycm9yKSB7XG4gICAgdGhyb3cgY2F1Z2h0RXJyb3I7XG4gIH1cbn1cblxuZnVuY3Rpb24gb25JbnRlcmFjdGlvblNjaGVkdWxlZFdvcmtDb21wbGV0ZWQoaW50ZXJhY3Rpb24pIHtcbiAgdmFyIGRpZENhdGNoRXJyb3IgPSBmYWxzZTtcbiAgdmFyIGNhdWdodEVycm9yID0gbnVsbDtcblxuICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIHN1YnNjcmliZXIub25JbnRlcmFjdGlvblNjaGVkdWxlZFdvcmtDb21wbGV0ZWQoaW50ZXJhY3Rpb24pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoIWRpZENhdGNoRXJyb3IpIHtcbiAgICAgICAgZGlkQ2F0Y2hFcnJvciA9IHRydWU7XG4gICAgICAgIGNhdWdodEVycm9yID0gZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBpZiAoZGlkQ2F0Y2hFcnJvcikge1xuICAgIHRocm93IGNhdWdodEVycm9yO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uV29ya1NjaGVkdWxlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKSB7XG4gIHZhciBkaWRDYXRjaEVycm9yID0gZmFsc2U7XG4gIHZhciBjYXVnaHRFcnJvciA9IG51bGw7XG5cbiAgc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgIHRyeSB7XG4gICAgICBzdWJzY3JpYmVyLm9uV29ya1NjaGVkdWxlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKCFkaWRDYXRjaEVycm9yKSB7XG4gICAgICAgIGRpZENhdGNoRXJyb3IgPSB0cnVlO1xuICAgICAgICBjYXVnaHRFcnJvciA9IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKGRpZENhdGNoRXJyb3IpIHtcbiAgICB0aHJvdyBjYXVnaHRFcnJvcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbldvcmtTdGFydGVkKGludGVyYWN0aW9ucywgdGhyZWFkSUQpIHtcbiAgdmFyIGRpZENhdGNoRXJyb3IgPSBmYWxzZTtcbiAgdmFyIGNhdWdodEVycm9yID0gbnVsbDtcblxuICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIHN1YnNjcmliZXIub25Xb3JrU3RhcnRlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKCFkaWRDYXRjaEVycm9yKSB7XG4gICAgICAgIGRpZENhdGNoRXJyb3IgPSB0cnVlO1xuICAgICAgICBjYXVnaHRFcnJvciA9IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKGRpZENhdGNoRXJyb3IpIHtcbiAgICB0aHJvdyBjYXVnaHRFcnJvcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbldvcmtTdG9wcGVkKGludGVyYWN0aW9ucywgdGhyZWFkSUQpIHtcbiAgdmFyIGRpZENhdGNoRXJyb3IgPSBmYWxzZTtcbiAgdmFyIGNhdWdodEVycm9yID0gbnVsbDtcblxuICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIHN1YnNjcmliZXIub25Xb3JrU3RvcHBlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKCFkaWRDYXRjaEVycm9yKSB7XG4gICAgICAgIGRpZENhdGNoRXJyb3IgPSB0cnVlO1xuICAgICAgICBjYXVnaHRFcnJvciA9IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKGRpZENhdGNoRXJyb3IpIHtcbiAgICB0aHJvdyBjYXVnaHRFcnJvcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbldvcmtDYW5jZWxlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKSB7XG4gIHZhciBkaWRDYXRjaEVycm9yID0gZmFsc2U7XG4gIHZhciBjYXVnaHRFcnJvciA9IG51bGw7XG5cbiAgc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgIHRyeSB7XG4gICAgICBzdWJzY3JpYmVyLm9uV29ya0NhbmNlbGVkKGludGVyYWN0aW9ucywgdGhyZWFkSUQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoIWRpZENhdGNoRXJyb3IpIHtcbiAgICAgICAgZGlkQ2F0Y2hFcnJvciA9IHRydWU7XG4gICAgICAgIGNhdWdodEVycm9yID0gZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBpZiAoZGlkQ2F0Y2hFcnJvcikge1xuICAgIHRocm93IGNhdWdodEVycm9yO1xuICB9XG59XG5cbmV4cG9ydHMudW5zdGFibGVfY2xlYXIgPSB1bnN0YWJsZV9jbGVhcjtcbmV4cG9ydHMudW5zdGFibGVfZ2V0Q3VycmVudCA9IHVuc3RhYmxlX2dldEN1cnJlbnQ7XG5leHBvcnRzLnVuc3RhYmxlX2dldFRocmVhZElEID0gdW5zdGFibGVfZ2V0VGhyZWFkSUQ7XG5leHBvcnRzLnVuc3RhYmxlX3RyYWNlID0gdW5zdGFibGVfdHJhY2U7XG5leHBvcnRzLnVuc3RhYmxlX3dyYXAgPSB1bnN0YWJsZV93cmFwO1xuZXhwb3J0cy51bnN0YWJsZV9zdWJzY3JpYmUgPSB1bnN0YWJsZV9zdWJzY3JpYmU7XG5leHBvcnRzLnVuc3RhYmxlX3Vuc3Vic2NyaWJlID0gdW5zdGFibGVfdW5zdWJzY3JpYmU7XG4gIH0pKCk7XG59XG4iLCIvKiogQGxpY2Vuc2UgUmVhY3QgdjAuMTIuMFxuICogc2NoZWR1bGVyLmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbi8vIEhlbHBzIGlkZW50aWZ5IHNpZGUgZWZmZWN0cyBpbiBiZWdpbi1waGFzZSBsaWZlY3ljbGUgaG9va3MgYW5kIHNldFN0YXRlIHJlZHVjZXJzOlxuXG5cbi8vIEluIHNvbWUgY2FzZXMsIFN0cmljdE1vZGUgc2hvdWxkIGFsc28gZG91YmxlLXJlbmRlciBsaWZlY3ljbGVzLlxuLy8gVGhpcyBjYW4gYmUgY29uZnVzaW5nIGZvciB0ZXN0cyB0aG91Z2gsXG4vLyBBbmQgaXQgY2FuIGJlIGJhZCBmb3IgcGVyZm9ybWFuY2UgaW4gcHJvZHVjdGlvbi5cbi8vIFRoaXMgZmVhdHVyZSBmbGFnIGNhbiBiZSB1c2VkIHRvIGNvbnRyb2wgdGhlIGJlaGF2aW9yOlxuXG5cbi8vIFRvIHByZXNlcnZlIHRoZSBcIlBhdXNlIG9uIGNhdWdodCBleGNlcHRpb25zXCIgYmVoYXZpb3Igb2YgdGhlIGRlYnVnZ2VyLCB3ZVxuLy8gcmVwbGF5IHRoZSBiZWdpbiBwaGFzZSBvZiBhIGZhaWxlZCBjb21wb25lbnQgaW5zaWRlIGludm9rZUd1YXJkZWRDYWxsYmFjay5cblxuXG4vLyBXYXJuIGFib3V0IGRlcHJlY2F0ZWQsIGFzeW5jLXVuc2FmZSBsaWZlY3ljbGVzOyByZWxhdGVzIHRvIFJGQyAjNjpcblxuXG4vLyBHYXRoZXIgYWR2YW5jZWQgdGltaW5nIG1ldHJpY3MgZm9yIFByb2ZpbGVyIHN1YnRyZWVzLlxuXG5cbi8vIFRyYWNlIHdoaWNoIGludGVyYWN0aW9ucyB0cmlnZ2VyIGVhY2ggY29tbWl0LlxuXG5cbi8vIE9ubHkgdXNlZCBpbiB3d3cgYnVpbGRzLlxuIC8vIFRPRE86IHRydWU/IEhlcmUgaXQgbWlnaHQganVzdCBiZSBmYWxzZS5cblxuLy8gT25seSB1c2VkIGluIHd3dyBidWlsZHMuXG52YXIgZW5hYmxlU2NoZWR1bGVyRGVidWdnaW5nID0gdHJ1ZTtcblxuLy8gT25seSB1c2VkIGluIHd3dyBidWlsZHMuXG5cblxuLy8gUmVhY3QgRmlyZTogcHJldmVudCB0aGUgdmFsdWUgYW5kIGNoZWNrZWQgYXR0cmlidXRlcyBmcm9tIHN5bmNpbmdcbi8vIHdpdGggdGhlaXIgcmVsYXRlZCBET00gcHJvcGVydGllc1xuXG5cbi8vIFRoZXNlIEFQSXMgd2lsbCBubyBsb25nZXIgYmUgXCJ1bnN0YWJsZVwiIGluIHRoZSB1cGNvbWluZyAxNi43IHJlbGVhc2UsXG4vLyBDb250cm9sIHRoaXMgYmVoYXZpb3Igd2l0aCBhIGZsYWcgdG8gc3VwcG9ydCAxNi42IG1pbm9yIHJlbGVhc2VzIGluIHRoZSBtZWFud2hpbGUuXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXZhciAqL1xuXG4vLyBUT0RPOiBVc2Ugc3ltYm9scz9cbnZhciBJbW1lZGlhdGVQcmlvcml0eSA9IDE7XG52YXIgVXNlckJsb2NraW5nUHJpb3JpdHkgPSAyO1xudmFyIE5vcm1hbFByaW9yaXR5ID0gMztcbnZhciBMb3dQcmlvcml0eSA9IDQ7XG52YXIgSWRsZVByaW9yaXR5ID0gNTtcblxuLy8gTWF4IDMxIGJpdCBpbnRlZ2VyLiBUaGUgbWF4IGludGVnZXIgc2l6ZSBpbiBWOCBmb3IgMzItYml0IHN5c3RlbXMuXG4vLyBNYXRoLnBvdygyLCAzMCkgLSAxXG4vLyAwYjExMTExMTExMTExMTExMTExMTExMTExMTExMTExMVxudmFyIG1heFNpZ25lZDMxQml0SW50ID0gMTA3Mzc0MTgyMztcblxuLy8gVGltZXMgb3V0IGltbWVkaWF0ZWx5XG52YXIgSU1NRURJQVRFX1BSSU9SSVRZX1RJTUVPVVQgPSAtMTtcbi8vIEV2ZW50dWFsbHkgdGltZXMgb3V0XG52YXIgVVNFUl9CTE9DS0lOR19QUklPUklUWSA9IDI1MDtcbnZhciBOT1JNQUxfUFJJT1JJVFlfVElNRU9VVCA9IDUwMDA7XG52YXIgTE9XX1BSSU9SSVRZX1RJTUVPVVQgPSAxMDAwMDtcbi8vIE5ldmVyIHRpbWVzIG91dFxudmFyIElETEVfUFJJT1JJVFkgPSBtYXhTaWduZWQzMUJpdEludDtcblxuLy8gQ2FsbGJhY2tzIGFyZSBzdG9yZWQgYXMgYSBjaXJjdWxhciwgZG91Ymx5IGxpbmtlZCBsaXN0LlxudmFyIGZpcnN0Q2FsbGJhY2tOb2RlID0gbnVsbDtcblxudmFyIGN1cnJlbnREaWRUaW1lb3V0ID0gZmFsc2U7XG4vLyBQYXVzaW5nIHRoZSBzY2hlZHVsZXIgaXMgdXNlZnVsIGZvciBkZWJ1Z2dpbmcuXG52YXIgaXNTY2hlZHVsZXJQYXVzZWQgPSBmYWxzZTtcblxudmFyIGN1cnJlbnRQcmlvcml0eUxldmVsID0gTm9ybWFsUHJpb3JpdHk7XG52YXIgY3VycmVudEV2ZW50U3RhcnRUaW1lID0gLTE7XG52YXIgY3VycmVudEV4cGlyYXRpb25UaW1lID0gLTE7XG5cbi8vIFRoaXMgaXMgc2V0IHdoZW4gYSBjYWxsYmFjayBpcyBiZWluZyBleGVjdXRlZCwgdG8gcHJldmVudCByZS1lbnRyYW5jeS5cbnZhciBpc0V4ZWN1dGluZ0NhbGxiYWNrID0gZmFsc2U7XG5cbnZhciBpc0hvc3RDYWxsYmFja1NjaGVkdWxlZCA9IGZhbHNlO1xuXG52YXIgaGFzTmF0aXZlUGVyZm9ybWFuY2VOb3cgPSB0eXBlb2YgcGVyZm9ybWFuY2UgPT09ICdvYmplY3QnICYmIHR5cGVvZiBwZXJmb3JtYW5jZS5ub3cgPT09ICdmdW5jdGlvbic7XG5cbmZ1bmN0aW9uIGVuc3VyZUhvc3RDYWxsYmFja0lzU2NoZWR1bGVkKCkge1xuICBpZiAoaXNFeGVjdXRpbmdDYWxsYmFjaykge1xuICAgIC8vIERvbid0IHNjaGVkdWxlIHdvcmsgeWV0OyB3YWl0IHVudGlsIHRoZSBuZXh0IHRpbWUgd2UgeWllbGQuXG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIFNjaGVkdWxlIHRoZSBob3N0IGNhbGxiYWNrIHVzaW5nIHRoZSBlYXJsaWVzdCBleHBpcmF0aW9uIGluIHRoZSBsaXN0LlxuICB2YXIgZXhwaXJhdGlvblRpbWUgPSBmaXJzdENhbGxiYWNrTm9kZS5leHBpcmF0aW9uVGltZTtcbiAgaWYgKCFpc0hvc3RDYWxsYmFja1NjaGVkdWxlZCkge1xuICAgIGlzSG9zdENhbGxiYWNrU2NoZWR1bGVkID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICAvLyBDYW5jZWwgdGhlIGV4aXN0aW5nIGhvc3QgY2FsbGJhY2suXG4gICAgY2FuY2VsSG9zdENhbGxiYWNrKCk7XG4gIH1cbiAgcmVxdWVzdEhvc3RDYWxsYmFjayhmbHVzaFdvcmssIGV4cGlyYXRpb25UaW1lKTtcbn1cblxuZnVuY3Rpb24gZmx1c2hGaXJzdENhbGxiYWNrKCkge1xuICB2YXIgZmx1c2hlZE5vZGUgPSBmaXJzdENhbGxiYWNrTm9kZTtcblxuICAvLyBSZW1vdmUgdGhlIG5vZGUgZnJvbSB0aGUgbGlzdCBiZWZvcmUgY2FsbGluZyB0aGUgY2FsbGJhY2suIFRoYXQgd2F5IHRoZVxuICAvLyBsaXN0IGlzIGluIGEgY29uc2lzdGVudCBzdGF0ZSBldmVuIGlmIHRoZSBjYWxsYmFjayB0aHJvd3MuXG4gIHZhciBuZXh0ID0gZmlyc3RDYWxsYmFja05vZGUubmV4dDtcbiAgaWYgKGZpcnN0Q2FsbGJhY2tOb2RlID09PSBuZXh0KSB7XG4gICAgLy8gVGhpcyBpcyB0aGUgbGFzdCBjYWxsYmFjayBpbiB0aGUgbGlzdC5cbiAgICBmaXJzdENhbGxiYWNrTm9kZSA9IG51bGw7XG4gICAgbmV4dCA9IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxhc3RDYWxsYmFja05vZGUgPSBmaXJzdENhbGxiYWNrTm9kZS5wcmV2aW91cztcbiAgICBmaXJzdENhbGxiYWNrTm9kZSA9IGxhc3RDYWxsYmFja05vZGUubmV4dCA9IG5leHQ7XG4gICAgbmV4dC5wcmV2aW91cyA9IGxhc3RDYWxsYmFja05vZGU7XG4gIH1cblxuICBmbHVzaGVkTm9kZS5uZXh0ID0gZmx1c2hlZE5vZGUucHJldmlvdXMgPSBudWxsO1xuXG4gIC8vIE5vdyBpdCdzIHNhZmUgdG8gY2FsbCB0aGUgY2FsbGJhY2suXG4gIHZhciBjYWxsYmFjayA9IGZsdXNoZWROb2RlLmNhbGxiYWNrO1xuICB2YXIgZXhwaXJhdGlvblRpbWUgPSBmbHVzaGVkTm9kZS5leHBpcmF0aW9uVGltZTtcbiAgdmFyIHByaW9yaXR5TGV2ZWwgPSBmbHVzaGVkTm9kZS5wcmlvcml0eUxldmVsO1xuICB2YXIgcHJldmlvdXNQcmlvcml0eUxldmVsID0gY3VycmVudFByaW9yaXR5TGV2ZWw7XG4gIHZhciBwcmV2aW91c0V4cGlyYXRpb25UaW1lID0gY3VycmVudEV4cGlyYXRpb25UaW1lO1xuICBjdXJyZW50UHJpb3JpdHlMZXZlbCA9IHByaW9yaXR5TGV2ZWw7XG4gIGN1cnJlbnRFeHBpcmF0aW9uVGltZSA9IGV4cGlyYXRpb25UaW1lO1xuICB2YXIgY29udGludWF0aW9uQ2FsbGJhY2s7XG4gIHRyeSB7XG4gICAgY29udGludWF0aW9uQ2FsbGJhY2sgPSBjYWxsYmFjaygpO1xuICB9IGZpbmFsbHkge1xuICAgIGN1cnJlbnRQcmlvcml0eUxldmVsID0gcHJldmlvdXNQcmlvcml0eUxldmVsO1xuICAgIGN1cnJlbnRFeHBpcmF0aW9uVGltZSA9IHByZXZpb3VzRXhwaXJhdGlvblRpbWU7XG4gIH1cblxuICAvLyBBIGNhbGxiYWNrIG1heSByZXR1cm4gYSBjb250aW51YXRpb24uIFRoZSBjb250aW51YXRpb24gc2hvdWxkIGJlIHNjaGVkdWxlZFxuICAvLyB3aXRoIHRoZSBzYW1lIHByaW9yaXR5IGFuZCBleHBpcmF0aW9uIGFzIHRoZSBqdXN0LWZpbmlzaGVkIGNhbGxiYWNrLlxuICBpZiAodHlwZW9mIGNvbnRpbnVhdGlvbkNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIGNvbnRpbnVhdGlvbk5vZGUgPSB7XG4gICAgICBjYWxsYmFjazogY29udGludWF0aW9uQ2FsbGJhY2ssXG4gICAgICBwcmlvcml0eUxldmVsOiBwcmlvcml0eUxldmVsLFxuICAgICAgZXhwaXJhdGlvblRpbWU6IGV4cGlyYXRpb25UaW1lLFxuICAgICAgbmV4dDogbnVsbCxcbiAgICAgIHByZXZpb3VzOiBudWxsXG4gICAgfTtcblxuICAgIC8vIEluc2VydCB0aGUgbmV3IGNhbGxiYWNrIGludG8gdGhlIGxpc3QsIHNvcnRlZCBieSBpdHMgZXhwaXJhdGlvbi4gVGhpcyBpc1xuICAgIC8vIGFsbW9zdCB0aGUgc2FtZSBhcyB0aGUgY29kZSBpbiBgc2NoZWR1bGVDYWxsYmFja2AsIGV4Y2VwdCB0aGUgY2FsbGJhY2tcbiAgICAvLyBpcyBpbnNlcnRlZCBpbnRvIHRoZSBsaXN0ICpiZWZvcmUqIGNhbGxiYWNrcyBvZiBlcXVhbCBleHBpcmF0aW9uIGluc3RlYWRcbiAgICAvLyBvZiBhZnRlci5cbiAgICBpZiAoZmlyc3RDYWxsYmFja05vZGUgPT09IG51bGwpIHtcbiAgICAgIC8vIFRoaXMgaXMgdGhlIGZpcnN0IGNhbGxiYWNrIGluIHRoZSBsaXN0LlxuICAgICAgZmlyc3RDYWxsYmFja05vZGUgPSBjb250aW51YXRpb25Ob2RlLm5leHQgPSBjb250aW51YXRpb25Ob2RlLnByZXZpb3VzID0gY29udGludWF0aW9uTm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG5leHRBZnRlckNvbnRpbnVhdGlvbiA9IG51bGw7XG4gICAgICB2YXIgbm9kZSA9IGZpcnN0Q2FsbGJhY2tOb2RlO1xuICAgICAgZG8ge1xuICAgICAgICBpZiAobm9kZS5leHBpcmF0aW9uVGltZSA+PSBleHBpcmF0aW9uVGltZSkge1xuICAgICAgICAgIC8vIFRoaXMgY2FsbGJhY2sgZXhwaXJlcyBhdCBvciBhZnRlciB0aGUgY29udGludWF0aW9uLiBXZSB3aWxsIGluc2VydFxuICAgICAgICAgIC8vIHRoZSBjb250aW51YXRpb24gKmJlZm9yZSogdGhpcyBjYWxsYmFjay5cbiAgICAgICAgICBuZXh0QWZ0ZXJDb250aW51YXRpb24gPSBub2RlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICB9IHdoaWxlIChub2RlICE9PSBmaXJzdENhbGxiYWNrTm9kZSk7XG5cbiAgICAgIGlmIChuZXh0QWZ0ZXJDb250aW51YXRpb24gPT09IG51bGwpIHtcbiAgICAgICAgLy8gTm8gZXF1YWwgb3IgbG93ZXIgcHJpb3JpdHkgY2FsbGJhY2sgd2FzIGZvdW5kLCB3aGljaCBtZWFucyB0aGUgbmV3XG4gICAgICAgIC8vIGNhbGxiYWNrIGlzIHRoZSBsb3dlc3QgcHJpb3JpdHkgY2FsbGJhY2sgaW4gdGhlIGxpc3QuXG4gICAgICAgIG5leHRBZnRlckNvbnRpbnVhdGlvbiA9IGZpcnN0Q2FsbGJhY2tOb2RlO1xuICAgICAgfSBlbHNlIGlmIChuZXh0QWZ0ZXJDb250aW51YXRpb24gPT09IGZpcnN0Q2FsbGJhY2tOb2RlKSB7XG4gICAgICAgIC8vIFRoZSBuZXcgY2FsbGJhY2sgaXMgdGhlIGhpZ2hlc3QgcHJpb3JpdHkgY2FsbGJhY2sgaW4gdGhlIGxpc3QuXG4gICAgICAgIGZpcnN0Q2FsbGJhY2tOb2RlID0gY29udGludWF0aW9uTm9kZTtcbiAgICAgICAgZW5zdXJlSG9zdENhbGxiYWNrSXNTY2hlZHVsZWQoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHByZXZpb3VzID0gbmV4dEFmdGVyQ29udGludWF0aW9uLnByZXZpb3VzO1xuICAgICAgcHJldmlvdXMubmV4dCA9IG5leHRBZnRlckNvbnRpbnVhdGlvbi5wcmV2aW91cyA9IGNvbnRpbnVhdGlvbk5vZGU7XG4gICAgICBjb250aW51YXRpb25Ob2RlLm5leHQgPSBuZXh0QWZ0ZXJDb250aW51YXRpb247XG4gICAgICBjb250aW51YXRpb25Ob2RlLnByZXZpb3VzID0gcHJldmlvdXM7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZsdXNoSW1tZWRpYXRlV29yaygpIHtcbiAgaWYgKFxuICAvLyBDb25maXJtIHdlJ3ZlIGV4aXRlZCB0aGUgb3V0ZXIgbW9zdCBldmVudCBoYW5kbGVyXG4gIGN1cnJlbnRFdmVudFN0YXJ0VGltZSA9PT0gLTEgJiYgZmlyc3RDYWxsYmFja05vZGUgIT09IG51bGwgJiYgZmlyc3RDYWxsYmFja05vZGUucHJpb3JpdHlMZXZlbCA9PT0gSW1tZWRpYXRlUHJpb3JpdHkpIHtcbiAgICBpc0V4ZWN1dGluZ0NhbGxiYWNrID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgZG8ge1xuICAgICAgICBmbHVzaEZpcnN0Q2FsbGJhY2soKTtcbiAgICAgIH0gd2hpbGUgKFxuICAgICAgLy8gS2VlcCBmbHVzaGluZyB1bnRpbCB0aGVyZSBhcmUgbm8gbW9yZSBpbW1lZGlhdGUgY2FsbGJhY2tzXG4gICAgICBmaXJzdENhbGxiYWNrTm9kZSAhPT0gbnVsbCAmJiBmaXJzdENhbGxiYWNrTm9kZS5wcmlvcml0eUxldmVsID09PSBJbW1lZGlhdGVQcmlvcml0eSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlzRXhlY3V0aW5nQ2FsbGJhY2sgPSBmYWxzZTtcbiAgICAgIGlmIChmaXJzdENhbGxiYWNrTm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAvLyBUaGVyZSdzIHN0aWxsIHdvcmsgcmVtYWluaW5nLiBSZXF1ZXN0IGFub3RoZXIgY2FsbGJhY2suXG4gICAgICAgIGVuc3VyZUhvc3RDYWxsYmFja0lzU2NoZWR1bGVkKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc0hvc3RDYWxsYmFja1NjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmbHVzaFdvcmsoZGlkVGltZW91dCkge1xuICAvLyBFeGl0IHJpZ2h0IGF3YXkgaWYgd2UncmUgY3VycmVudGx5IHBhdXNlZFxuXG4gIGlmIChlbmFibGVTY2hlZHVsZXJEZWJ1Z2dpbmcgJiYgaXNTY2hlZHVsZXJQYXVzZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpc0V4ZWN1dGluZ0NhbGxiYWNrID0gdHJ1ZTtcbiAgdmFyIHByZXZpb3VzRGlkVGltZW91dCA9IGN1cnJlbnREaWRUaW1lb3V0O1xuICBjdXJyZW50RGlkVGltZW91dCA9IGRpZFRpbWVvdXQ7XG4gIHRyeSB7XG4gICAgaWYgKGRpZFRpbWVvdXQpIHtcbiAgICAgIC8vIEZsdXNoIGFsbCB0aGUgZXhwaXJlZCBjYWxsYmFja3Mgd2l0aG91dCB5aWVsZGluZy5cbiAgICAgIHdoaWxlIChmaXJzdENhbGxiYWNrTm9kZSAhPT0gbnVsbCAmJiAhKGVuYWJsZVNjaGVkdWxlckRlYnVnZ2luZyAmJiBpc1NjaGVkdWxlclBhdXNlZCkpIHtcbiAgICAgICAgLy8gVE9ETyBXcmFwIGkgbmZlYXR1cmUgZmxhZ1xuICAgICAgICAvLyBSZWFkIHRoZSBjdXJyZW50IHRpbWUuIEZsdXNoIGFsbCB0aGUgY2FsbGJhY2tzIHRoYXQgZXhwaXJlIGF0IG9yXG4gICAgICAgIC8vIGVhcmxpZXIgdGhhbiB0aGF0IHRpbWUuIFRoZW4gcmVhZCB0aGUgY3VycmVudCB0aW1lIGFnYWluIGFuZCByZXBlYXQuXG4gICAgICAgIC8vIFRoaXMgb3B0aW1pemVzIGZvciBhcyBmZXcgcGVyZm9ybWFuY2Uubm93IGNhbGxzIGFzIHBvc3NpYmxlLlxuICAgICAgICB2YXIgY3VycmVudFRpbWUgPSBleHBvcnRzLnVuc3RhYmxlX25vdygpO1xuICAgICAgICBpZiAoZmlyc3RDYWxsYmFja05vZGUuZXhwaXJhdGlvblRpbWUgPD0gY3VycmVudFRpbWUpIHtcbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBmbHVzaEZpcnN0Q2FsbGJhY2soKTtcbiAgICAgICAgICB9IHdoaWxlIChmaXJzdENhbGxiYWNrTm9kZSAhPT0gbnVsbCAmJiBmaXJzdENhbGxiYWNrTm9kZS5leHBpcmF0aW9uVGltZSA8PSBjdXJyZW50VGltZSAmJiAhKGVuYWJsZVNjaGVkdWxlckRlYnVnZ2luZyAmJiBpc1NjaGVkdWxlclBhdXNlZCkpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBLZWVwIGZsdXNoaW5nIGNhbGxiYWNrcyB1bnRpbCB3ZSBydW4gb3V0IG9mIHRpbWUgaW4gdGhlIGZyYW1lLlxuICAgICAgaWYgKGZpcnN0Q2FsbGJhY2tOb2RlICE9PSBudWxsKSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICBpZiAoZW5hYmxlU2NoZWR1bGVyRGVidWdnaW5nICYmIGlzU2NoZWR1bGVyUGF1c2VkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgZmx1c2hGaXJzdENhbGxiYWNrKCk7XG4gICAgICAgIH0gd2hpbGUgKGZpcnN0Q2FsbGJhY2tOb2RlICE9PSBudWxsICYmICFzaG91bGRZaWVsZFRvSG9zdCgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgaXNFeGVjdXRpbmdDYWxsYmFjayA9IGZhbHNlO1xuICAgIGN1cnJlbnREaWRUaW1lb3V0ID0gcHJldmlvdXNEaWRUaW1lb3V0O1xuICAgIGlmIChmaXJzdENhbGxiYWNrTm9kZSAhPT0gbnVsbCkge1xuICAgICAgLy8gVGhlcmUncyBzdGlsbCB3b3JrIHJlbWFpbmluZy4gUmVxdWVzdCBhbm90aGVyIGNhbGxiYWNrLlxuICAgICAgZW5zdXJlSG9zdENhbGxiYWNrSXNTY2hlZHVsZWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXNIb3N0Q2FsbGJhY2tTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gQmVmb3JlIGV4aXRpbmcsIGZsdXNoIGFsbCB0aGUgaW1tZWRpYXRlIHdvcmsgdGhhdCB3YXMgc2NoZWR1bGVkLlxuICAgIGZsdXNoSW1tZWRpYXRlV29yaygpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVuc3RhYmxlX3J1bldpdGhQcmlvcml0eShwcmlvcml0eUxldmVsLCBldmVudEhhbmRsZXIpIHtcbiAgc3dpdGNoIChwcmlvcml0eUxldmVsKSB7XG4gICAgY2FzZSBJbW1lZGlhdGVQcmlvcml0eTpcbiAgICBjYXNlIFVzZXJCbG9ja2luZ1ByaW9yaXR5OlxuICAgIGNhc2UgTm9ybWFsUHJpb3JpdHk6XG4gICAgY2FzZSBMb3dQcmlvcml0eTpcbiAgICBjYXNlIElkbGVQcmlvcml0eTpcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBwcmlvcml0eUxldmVsID0gTm9ybWFsUHJpb3JpdHk7XG4gIH1cblxuICB2YXIgcHJldmlvdXNQcmlvcml0eUxldmVsID0gY3VycmVudFByaW9yaXR5TGV2ZWw7XG4gIHZhciBwcmV2aW91c0V2ZW50U3RhcnRUaW1lID0gY3VycmVudEV2ZW50U3RhcnRUaW1lO1xuICBjdXJyZW50UHJpb3JpdHlMZXZlbCA9IHByaW9yaXR5TGV2ZWw7XG4gIGN1cnJlbnRFdmVudFN0YXJ0VGltZSA9IGV4cG9ydHMudW5zdGFibGVfbm93KCk7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyKCk7XG4gIH0gZmluYWxseSB7XG4gICAgY3VycmVudFByaW9yaXR5TGV2ZWwgPSBwcmV2aW91c1ByaW9yaXR5TGV2ZWw7XG4gICAgY3VycmVudEV2ZW50U3RhcnRUaW1lID0gcHJldmlvdXNFdmVudFN0YXJ0VGltZTtcblxuICAgIC8vIEJlZm9yZSBleGl0aW5nLCBmbHVzaCBhbGwgdGhlIGltbWVkaWF0ZSB3b3JrIHRoYXQgd2FzIHNjaGVkdWxlZC5cbiAgICBmbHVzaEltbWVkaWF0ZVdvcmsoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1bnN0YWJsZV93cmFwQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgdmFyIHBhcmVudFByaW9yaXR5TGV2ZWwgPSBjdXJyZW50UHJpb3JpdHlMZXZlbDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBUaGlzIGlzIGEgZm9yayBvZiBydW5XaXRoUHJpb3JpdHksIGlubGluZWQgZm9yIHBlcmZvcm1hbmNlLlxuICAgIHZhciBwcmV2aW91c1ByaW9yaXR5TGV2ZWwgPSBjdXJyZW50UHJpb3JpdHlMZXZlbDtcbiAgICB2YXIgcHJldmlvdXNFdmVudFN0YXJ0VGltZSA9IGN1cnJlbnRFdmVudFN0YXJ0VGltZTtcbiAgICBjdXJyZW50UHJpb3JpdHlMZXZlbCA9IHBhcmVudFByaW9yaXR5TGV2ZWw7XG4gICAgY3VycmVudEV2ZW50U3RhcnRUaW1lID0gZXhwb3J0cy51bnN0YWJsZV9ub3coKTtcblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY3VycmVudFByaW9yaXR5TGV2ZWwgPSBwcmV2aW91c1ByaW9yaXR5TGV2ZWw7XG4gICAgICBjdXJyZW50RXZlbnRTdGFydFRpbWUgPSBwcmV2aW91c0V2ZW50U3RhcnRUaW1lO1xuICAgICAgZmx1c2hJbW1lZGlhdGVXb3JrKCk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiB1bnN0YWJsZV9zY2hlZHVsZUNhbGxiYWNrKGNhbGxiYWNrLCBkZXByZWNhdGVkX29wdGlvbnMpIHtcbiAgdmFyIHN0YXJ0VGltZSA9IGN1cnJlbnRFdmVudFN0YXJ0VGltZSAhPT0gLTEgPyBjdXJyZW50RXZlbnRTdGFydFRpbWUgOiBleHBvcnRzLnVuc3RhYmxlX25vdygpO1xuXG4gIHZhciBleHBpcmF0aW9uVGltZTtcbiAgaWYgKHR5cGVvZiBkZXByZWNhdGVkX29wdGlvbnMgPT09ICdvYmplY3QnICYmIGRlcHJlY2F0ZWRfb3B0aW9ucyAhPT0gbnVsbCAmJiB0eXBlb2YgZGVwcmVjYXRlZF9vcHRpb25zLnRpbWVvdXQgPT09ICdudW1iZXInKSB7XG4gICAgLy8gRklYTUU6IFJlbW92ZSB0aGlzIGJyYW5jaCBvbmNlIHdlIGxpZnQgZXhwaXJhdGlvbiB0aW1lcyBvdXQgb2YgUmVhY3QuXG4gICAgZXhwaXJhdGlvblRpbWUgPSBzdGFydFRpbWUgKyBkZXByZWNhdGVkX29wdGlvbnMudGltZW91dDtcbiAgfSBlbHNlIHtcbiAgICBzd2l0Y2ggKGN1cnJlbnRQcmlvcml0eUxldmVsKSB7XG4gICAgICBjYXNlIEltbWVkaWF0ZVByaW9yaXR5OlxuICAgICAgICBleHBpcmF0aW9uVGltZSA9IHN0YXJ0VGltZSArIElNTUVESUFURV9QUklPUklUWV9USU1FT1VUO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVXNlckJsb2NraW5nUHJpb3JpdHk6XG4gICAgICAgIGV4cGlyYXRpb25UaW1lID0gc3RhcnRUaW1lICsgVVNFUl9CTE9DS0lOR19QUklPUklUWTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIElkbGVQcmlvcml0eTpcbiAgICAgICAgZXhwaXJhdGlvblRpbWUgPSBzdGFydFRpbWUgKyBJRExFX1BSSU9SSVRZO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG93UHJpb3JpdHk6XG4gICAgICAgIGV4cGlyYXRpb25UaW1lID0gc3RhcnRUaW1lICsgTE9XX1BSSU9SSVRZX1RJTUVPVVQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBOb3JtYWxQcmlvcml0eTpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGV4cGlyYXRpb25UaW1lID0gc3RhcnRUaW1lICsgTk9STUFMX1BSSU9SSVRZX1RJTUVPVVQ7XG4gICAgfVxuICB9XG5cbiAgdmFyIG5ld05vZGUgPSB7XG4gICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgIHByaW9yaXR5TGV2ZWw6IGN1cnJlbnRQcmlvcml0eUxldmVsLFxuICAgIGV4cGlyYXRpb25UaW1lOiBleHBpcmF0aW9uVGltZSxcbiAgICBuZXh0OiBudWxsLFxuICAgIHByZXZpb3VzOiBudWxsXG4gIH07XG5cbiAgLy8gSW5zZXJ0IHRoZSBuZXcgY2FsbGJhY2sgaW50byB0aGUgbGlzdCwgb3JkZXJlZCBmaXJzdCBieSBleHBpcmF0aW9uLCB0aGVuXG4gIC8vIGJ5IGluc2VydGlvbi4gU28gdGhlIG5ldyBjYWxsYmFjayBpcyBpbnNlcnRlZCBhbnkgb3RoZXIgY2FsbGJhY2sgd2l0aFxuICAvLyBlcXVhbCBleHBpcmF0aW9uLlxuICBpZiAoZmlyc3RDYWxsYmFja05vZGUgPT09IG51bGwpIHtcbiAgICAvLyBUaGlzIGlzIHRoZSBmaXJzdCBjYWxsYmFjayBpbiB0aGUgbGlzdC5cbiAgICBmaXJzdENhbGxiYWNrTm9kZSA9IG5ld05vZGUubmV4dCA9IG5ld05vZGUucHJldmlvdXMgPSBuZXdOb2RlO1xuICAgIGVuc3VyZUhvc3RDYWxsYmFja0lzU2NoZWR1bGVkKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG5leHQgPSBudWxsO1xuICAgIHZhciBub2RlID0gZmlyc3RDYWxsYmFja05vZGU7XG4gICAgZG8ge1xuICAgICAgaWYgKG5vZGUuZXhwaXJhdGlvblRpbWUgPiBleHBpcmF0aW9uVGltZSkge1xuICAgICAgICAvLyBUaGUgbmV3IGNhbGxiYWNrIGV4cGlyZXMgYmVmb3JlIHRoaXMgb25lLlxuICAgICAgICBuZXh0ID0gbm9kZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgIH0gd2hpbGUgKG5vZGUgIT09IGZpcnN0Q2FsbGJhY2tOb2RlKTtcblxuICAgIGlmIChuZXh0ID09PSBudWxsKSB7XG4gICAgICAvLyBObyBjYWxsYmFjayB3aXRoIGEgbGF0ZXIgZXhwaXJhdGlvbiB3YXMgZm91bmQsIHdoaWNoIG1lYW5zIHRoZSBuZXdcbiAgICAgIC8vIGNhbGxiYWNrIGhhcyB0aGUgbGF0ZXN0IGV4cGlyYXRpb24gaW4gdGhlIGxpc3QuXG4gICAgICBuZXh0ID0gZmlyc3RDYWxsYmFja05vZGU7XG4gICAgfSBlbHNlIGlmIChuZXh0ID09PSBmaXJzdENhbGxiYWNrTm9kZSkge1xuICAgICAgLy8gVGhlIG5ldyBjYWxsYmFjayBoYXMgdGhlIGVhcmxpZXN0IGV4cGlyYXRpb24gaW4gdGhlIGVudGlyZSBsaXN0LlxuICAgICAgZmlyc3RDYWxsYmFja05vZGUgPSBuZXdOb2RlO1xuICAgICAgZW5zdXJlSG9zdENhbGxiYWNrSXNTY2hlZHVsZWQoKTtcbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXMgPSBuZXh0LnByZXZpb3VzO1xuICAgIHByZXZpb3VzLm5leHQgPSBuZXh0LnByZXZpb3VzID0gbmV3Tm9kZTtcbiAgICBuZXdOb2RlLm5leHQgPSBuZXh0O1xuICAgIG5ld05vZGUucHJldmlvdXMgPSBwcmV2aW91cztcbiAgfVxuXG4gIHJldHVybiBuZXdOb2RlO1xufVxuXG5mdW5jdGlvbiB1bnN0YWJsZV9wYXVzZUV4ZWN1dGlvbigpIHtcbiAgaXNTY2hlZHVsZXJQYXVzZWQgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiB1bnN0YWJsZV9jb250aW51ZUV4ZWN1dGlvbigpIHtcbiAgaXNTY2hlZHVsZXJQYXVzZWQgPSBmYWxzZTtcbiAgaWYgKGZpcnN0Q2FsbGJhY2tOb2RlICE9PSBudWxsKSB7XG4gICAgZW5zdXJlSG9zdENhbGxiYWNrSXNTY2hlZHVsZWQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1bnN0YWJsZV9nZXRGaXJzdENhbGxiYWNrTm9kZSgpIHtcbiAgcmV0dXJuIGZpcnN0Q2FsbGJhY2tOb2RlO1xufVxuXG5mdW5jdGlvbiB1bnN0YWJsZV9jYW5jZWxDYWxsYmFjayhjYWxsYmFja05vZGUpIHtcbiAgdmFyIG5leHQgPSBjYWxsYmFja05vZGUubmV4dDtcbiAgaWYgKG5leHQgPT09IG51bGwpIHtcbiAgICAvLyBBbHJlYWR5IGNhbmNlbGxlZC5cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAobmV4dCA9PT0gY2FsbGJhY2tOb2RlKSB7XG4gICAgLy8gVGhpcyBpcyB0aGUgb25seSBzY2hlZHVsZWQgY2FsbGJhY2suIENsZWFyIHRoZSBsaXN0LlxuICAgIGZpcnN0Q2FsbGJhY2tOb2RlID0gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICAvLyBSZW1vdmUgdGhlIGNhbGxiYWNrIGZyb20gaXRzIHBvc2l0aW9uIGluIHRoZSBsaXN0LlxuICAgIGlmIChjYWxsYmFja05vZGUgPT09IGZpcnN0Q2FsbGJhY2tOb2RlKSB7XG4gICAgICBmaXJzdENhbGxiYWNrTm9kZSA9IG5leHQ7XG4gICAgfVxuICAgIHZhciBwcmV2aW91cyA9IGNhbGxiYWNrTm9kZS5wcmV2aW91cztcbiAgICBwcmV2aW91cy5uZXh0ID0gbmV4dDtcbiAgICBuZXh0LnByZXZpb3VzID0gcHJldmlvdXM7XG4gIH1cblxuICBjYWxsYmFja05vZGUubmV4dCA9IGNhbGxiYWNrTm9kZS5wcmV2aW91cyA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIHVuc3RhYmxlX2dldEN1cnJlbnRQcmlvcml0eUxldmVsKCkge1xuICByZXR1cm4gY3VycmVudFByaW9yaXR5TGV2ZWw7XG59XG5cbmZ1bmN0aW9uIHVuc3RhYmxlX3Nob3VsZFlpZWxkKCkge1xuICByZXR1cm4gIWN1cnJlbnREaWRUaW1lb3V0ICYmIChmaXJzdENhbGxiYWNrTm9kZSAhPT0gbnVsbCAmJiBmaXJzdENhbGxiYWNrTm9kZS5leHBpcmF0aW9uVGltZSA8IGN1cnJlbnRFeHBpcmF0aW9uVGltZSB8fCBzaG91bGRZaWVsZFRvSG9zdCgpKTtcbn1cblxuLy8gVGhlIHJlbWFpbmluZyBjb2RlIGlzIGVzc2VudGlhbGx5IGEgcG9seWZpbGwgZm9yIHJlcXVlc3RJZGxlQ2FsbGJhY2suIEl0XG4vLyB3b3JrcyBieSBzY2hlZHVsaW5nIGEgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLCBzdG9yaW5nIHRoZSB0aW1lIGZvciB0aGUgc3RhcnRcbi8vIG9mIHRoZSBmcmFtZSwgdGhlbiBzY2hlZHVsaW5nIGEgcG9zdE1lc3NhZ2Ugd2hpY2ggZ2V0cyBzY2hlZHVsZWQgYWZ0ZXIgcGFpbnQuXG4vLyBXaXRoaW4gdGhlIHBvc3RNZXNzYWdlIGhhbmRsZXIgZG8gYXMgbXVjaCB3b3JrIGFzIHBvc3NpYmxlIHVudGlsIHRpbWUgKyBmcmFtZVxuLy8gcmF0ZS4gQnkgc2VwYXJhdGluZyB0aGUgaWRsZSBjYWxsIGludG8gYSBzZXBhcmF0ZSBldmVudCB0aWNrIHdlIGVuc3VyZSB0aGF0XG4vLyBsYXlvdXQsIHBhaW50IGFuZCBvdGhlciBicm93c2VyIHdvcmsgaXMgY291bnRlZCBhZ2FpbnN0IHRoZSBhdmFpbGFibGUgdGltZS5cbi8vIFRoZSBmcmFtZSByYXRlIGlzIGR5bmFtaWNhbGx5IGFkanVzdGVkLlxuXG4vLyBXZSBjYXB0dXJlIGEgbG9jYWwgcmVmZXJlbmNlIHRvIGFueSBnbG9iYWwsIGluIGNhc2UgaXQgZ2V0cyBwb2x5ZmlsbGVkIGFmdGVyXG4vLyB0aGlzIG1vZHVsZSBpcyBpbml0aWFsbHkgZXZhbHVhdGVkLiBXZSB3YW50IHRvIGJlIHVzaW5nIGFcbi8vIGNvbnNpc3RlbnQgaW1wbGVtZW50YXRpb24uXG52YXIgbG9jYWxEYXRlID0gRGF0ZTtcblxuLy8gVGhpcyBpbml0aWFsaXphdGlvbiBjb2RlIG1heSBydW4gZXZlbiBvbiBzZXJ2ZXIgZW52aXJvbm1lbnRzIGlmIGEgY29tcG9uZW50XG4vLyBqdXN0IGltcG9ydHMgUmVhY3RET00gKGUuZy4gZm9yIGZpbmRET01Ob2RlKS4gU29tZSBlbnZpcm9ubWVudHMgbWlnaHQgbm90XG4vLyBoYXZlIHNldFRpbWVvdXQgb3IgY2xlYXJUaW1lb3V0LiBIb3dldmVyLCB3ZSBhbHdheXMgZXhwZWN0IHRoZW0gdG8gYmUgZGVmaW5lZFxuLy8gb24gdGhlIGNsaWVudC4gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L3B1bGwvMTMwODhcbnZhciBsb2NhbFNldFRpbWVvdXQgPSB0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJyA/IHNldFRpbWVvdXQgOiB1bmRlZmluZWQ7XG52YXIgbG9jYWxDbGVhclRpbWVvdXQgPSB0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nID8gY2xlYXJUaW1lb3V0IDogdW5kZWZpbmVkO1xuXG4vLyBXZSBkb24ndCBleHBlY3QgZWl0aGVyIG9mIHRoZXNlIHRvIG5lY2Vzc2FyaWx5IGJlIGRlZmluZWQsIGJ1dCB3ZSB3aWxsIGVycm9yXG4vLyBsYXRlciBpZiB0aGV5IGFyZSBtaXNzaW5nIG9uIHRoZSBjbGllbnQuXG52YXIgbG9jYWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSAnZnVuY3Rpb24nID8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIDogdW5kZWZpbmVkO1xudmFyIGxvY2FsQ2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB0eXBlb2YgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPT09ICdmdW5jdGlvbicgPyBjYW5jZWxBbmltYXRpb25GcmFtZSA6IHVuZGVmaW5lZDtcblxuLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGRvZXMgbm90IHJ1biB3aGVuIHRoZSB0YWIgaXMgaW4gdGhlIGJhY2tncm91bmQuIElmXG4vLyB3ZSdyZSBiYWNrZ3JvdW5kZWQgd2UgcHJlZmVyIGZvciB0aGF0IHdvcmsgdG8gaGFwcGVuIHNvIHRoYXQgdGhlIHBhZ2Vcbi8vIGNvbnRpbnVlcyB0byBsb2FkIGluIHRoZSBiYWNrZ3JvdW5kLiBTbyB3ZSBhbHNvIHNjaGVkdWxlIGEgJ3NldFRpbWVvdXQnIGFzXG4vLyBhIGZhbGxiYWNrLlxuLy8gVE9ETzogTmVlZCBhIGJldHRlciBoZXVyaXN0aWMgZm9yIGJhY2tncm91bmRlZCB3b3JrLlxudmFyIEFOSU1BVElPTl9GUkFNRV9USU1FT1VUID0gMTAwO1xudmFyIHJBRklEO1xudmFyIHJBRlRpbWVvdXRJRDtcbnZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVXaXRoVGltZW91dCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAvLyBzY2hlZHVsZSByQUYgYW5kIGFsc28gYSBzZXRUaW1lb3V0XG4gIHJBRklEID0gbG9jYWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKHRpbWVzdGFtcCkge1xuICAgIC8vIGNhbmNlbCB0aGUgc2V0VGltZW91dFxuICAgIGxvY2FsQ2xlYXJUaW1lb3V0KHJBRlRpbWVvdXRJRCk7XG4gICAgY2FsbGJhY2sodGltZXN0YW1wKTtcbiAgfSk7XG4gIHJBRlRpbWVvdXRJRCA9IGxvY2FsU2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgLy8gY2FuY2VsIHRoZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICBsb2NhbENhbmNlbEFuaW1hdGlvbkZyYW1lKHJBRklEKTtcbiAgICBjYWxsYmFjayhleHBvcnRzLnVuc3RhYmxlX25vdygpKTtcbiAgfSwgQU5JTUFUSU9OX0ZSQU1FX1RJTUVPVVQpO1xufTtcblxuaWYgKGhhc05hdGl2ZVBlcmZvcm1hbmNlTm93KSB7XG4gIHZhciBQZXJmb3JtYW5jZSA9IHBlcmZvcm1hbmNlO1xuICBleHBvcnRzLnVuc3RhYmxlX25vdyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gUGVyZm9ybWFuY2Uubm93KCk7XG4gIH07XG59IGVsc2Uge1xuICBleHBvcnRzLnVuc3RhYmxlX25vdyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbG9jYWxEYXRlLm5vdygpO1xuICB9O1xufVxuXG52YXIgcmVxdWVzdEhvc3RDYWxsYmFjaztcbnZhciBjYW5jZWxIb3N0Q2FsbGJhY2s7XG52YXIgc2hvdWxkWWllbGRUb0hvc3Q7XG5cbnZhciBnbG9iYWxWYWx1ZSA9IG51bGw7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgZ2xvYmFsVmFsdWUgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIGdsb2JhbFZhbHVlID0gZ2xvYmFsO1xufVxuXG5pZiAoZ2xvYmFsVmFsdWUgJiYgZ2xvYmFsVmFsdWUuX3NjaGVkTW9jaykge1xuICAvLyBEeW5hbWljIGluamVjdGlvbiwgb25seSBmb3IgdGVzdGluZyBwdXJwb3Nlcy5cbiAgdmFyIGdsb2JhbEltcGwgPSBnbG9iYWxWYWx1ZS5fc2NoZWRNb2NrO1xuICByZXF1ZXN0SG9zdENhbGxiYWNrID0gZ2xvYmFsSW1wbFswXTtcbiAgY2FuY2VsSG9zdENhbGxiYWNrID0gZ2xvYmFsSW1wbFsxXTtcbiAgc2hvdWxkWWllbGRUb0hvc3QgPSBnbG9iYWxJbXBsWzJdO1xuICBleHBvcnRzLnVuc3RhYmxlX25vdyA9IGdsb2JhbEltcGxbM107XG59IGVsc2UgaWYgKFxuLy8gSWYgU2NoZWR1bGVyIHJ1bnMgaW4gYSBub24tRE9NIGVudmlyb25tZW50LCBpdCBmYWxscyBiYWNrIHRvIGEgbmFpdmVcbi8vIGltcGxlbWVudGF0aW9uIHVzaW5nIHNldFRpbWVvdXQuXG50eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fFxuLy8gQ2hlY2sgaWYgTWVzc2FnZUNoYW5uZWwgaXMgc3VwcG9ydGVkLCB0b28uXG50eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICdmdW5jdGlvbicpIHtcbiAgLy8gSWYgdGhpcyBhY2NpZGVudGFsbHkgZ2V0cyBpbXBvcnRlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LCBlLmcuIEphdmFTY3JpcHRDb3JlLFxuICAvLyBmYWxsYmFjayB0byBhIG5haXZlIGltcGxlbWVudGF0aW9uLlxuICB2YXIgX2NhbGxiYWNrID0gbnVsbDtcbiAgdmFyIF9mbHVzaENhbGxiYWNrID0gZnVuY3Rpb24gKGRpZFRpbWVvdXQpIHtcbiAgICBpZiAoX2NhbGxiYWNrICE9PSBudWxsKSB7XG4gICAgICB0cnkge1xuICAgICAgICBfY2FsbGJhY2soZGlkVGltZW91dCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBfY2FsbGJhY2sgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgcmVxdWVzdEhvc3RDYWxsYmFjayA9IGZ1bmN0aW9uIChjYiwgbXMpIHtcbiAgICBpZiAoX2NhbGxiYWNrICE9PSBudWxsKSB7XG4gICAgICAvLyBQcm90ZWN0IGFnYWluc3QgcmUtZW50cmFuY3kuXG4gICAgICBzZXRUaW1lb3V0KHJlcXVlc3RIb3N0Q2FsbGJhY2ssIDAsIGNiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX2NhbGxiYWNrID0gY2I7XG4gICAgICBzZXRUaW1lb3V0KF9mbHVzaENhbGxiYWNrLCAwLCBmYWxzZSk7XG4gICAgfVxuICB9O1xuICBjYW5jZWxIb3N0Q2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgX2NhbGxiYWNrID0gbnVsbDtcbiAgfTtcbiAgc2hvdWxkWWllbGRUb0hvc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xufSBlbHNlIHtcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIFRPRE86IFJlbW92ZSBmYi5tZSBsaW5rXG4gICAgaWYgKHR5cGVvZiBsb2NhbFJlcXVlc3RBbmltYXRpb25GcmFtZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS5lcnJvcihcIlRoaXMgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLiBcIiArICdNYWtlIHN1cmUgdGhhdCB5b3UgbG9hZCBhICcgKyAncG9seWZpbGwgaW4gb2xkZXIgYnJvd3NlcnMuIGh0dHBzOi8vZmIubWUvcmVhY3QtcG9seWZpbGxzJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbG9jYWxDYW5jZWxBbmltYXRpb25GcmFtZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS5lcnJvcihcIlRoaXMgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgY2FuY2VsQW5pbWF0aW9uRnJhbWUuIFwiICsgJ01ha2Ugc3VyZSB0aGF0IHlvdSBsb2FkIGEgJyArICdwb2x5ZmlsbCBpbiBvbGRlciBicm93c2Vycy4gaHR0cHM6Ly9mYi5tZS9yZWFjdC1wb2x5ZmlsbHMnKTtcbiAgICB9XG4gIH1cblxuICB2YXIgc2NoZWR1bGVkSG9zdENhbGxiYWNrID0gbnVsbDtcbiAgdmFyIGlzTWVzc2FnZUV2ZW50U2NoZWR1bGVkID0gZmFsc2U7XG4gIHZhciB0aW1lb3V0VGltZSA9IC0xO1xuXG4gIHZhciBpc0FuaW1hdGlvbkZyYW1lU2NoZWR1bGVkID0gZmFsc2U7XG5cbiAgdmFyIGlzRmx1c2hpbmdIb3N0Q2FsbGJhY2sgPSBmYWxzZTtcblxuICB2YXIgZnJhbWVEZWFkbGluZSA9IDA7XG4gIC8vIFdlIHN0YXJ0IG91dCBhc3N1bWluZyB0aGF0IHdlIHJ1biBhdCAzMGZwcyBidXQgdGhlbiB0aGUgaGV1cmlzdGljIHRyYWNraW5nXG4gIC8vIHdpbGwgYWRqdXN0IHRoaXMgdmFsdWUgdG8gYSBmYXN0ZXIgZnBzIGlmIHdlIGdldCBtb3JlIGZyZXF1ZW50IGFuaW1hdGlvblxuICAvLyBmcmFtZXMuXG4gIHZhciBwcmV2aW91c0ZyYW1lVGltZSA9IDMzO1xuICB2YXIgYWN0aXZlRnJhbWVUaW1lID0gMzM7XG5cbiAgc2hvdWxkWWllbGRUb0hvc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZyYW1lRGVhZGxpbmUgPD0gZXhwb3J0cy51bnN0YWJsZV9ub3coKTtcbiAgfTtcblxuICAvLyBXZSB1c2UgdGhlIHBvc3RNZXNzYWdlIHRyaWNrIHRvIGRlZmVyIGlkbGUgd29yayB1bnRpbCBhZnRlciB0aGUgcmVwYWludC5cbiAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgdmFyIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlzTWVzc2FnZUV2ZW50U2NoZWR1bGVkID0gZmFsc2U7XG5cbiAgICB2YXIgcHJldlNjaGVkdWxlZENhbGxiYWNrID0gc2NoZWR1bGVkSG9zdENhbGxiYWNrO1xuICAgIHZhciBwcmV2VGltZW91dFRpbWUgPSB0aW1lb3V0VGltZTtcbiAgICBzY2hlZHVsZWRIb3N0Q2FsbGJhY2sgPSBudWxsO1xuICAgIHRpbWVvdXRUaW1lID0gLTE7XG5cbiAgICB2YXIgY3VycmVudFRpbWUgPSBleHBvcnRzLnVuc3RhYmxlX25vdygpO1xuXG4gICAgdmFyIGRpZFRpbWVvdXQgPSBmYWxzZTtcbiAgICBpZiAoZnJhbWVEZWFkbGluZSAtIGN1cnJlbnRUaW1lIDw9IDApIHtcbiAgICAgIC8vIFRoZXJlJ3Mgbm8gdGltZSBsZWZ0IGluIHRoaXMgaWRsZSBwZXJpb2QuIENoZWNrIGlmIHRoZSBjYWxsYmFjayBoYXNcbiAgICAgIC8vIGEgdGltZW91dCBhbmQgd2hldGhlciBpdCdzIGJlZW4gZXhjZWVkZWQuXG4gICAgICBpZiAocHJldlRpbWVvdXRUaW1lICE9PSAtMSAmJiBwcmV2VGltZW91dFRpbWUgPD0gY3VycmVudFRpbWUpIHtcbiAgICAgICAgLy8gRXhjZWVkZWQgdGhlIHRpbWVvdXQuIEludm9rZSB0aGUgY2FsbGJhY2sgZXZlbiB0aG91Z2ggdGhlcmUncyBub1xuICAgICAgICAvLyB0aW1lIGxlZnQuXG4gICAgICAgIGRpZFRpbWVvdXQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTm8gdGltZW91dC5cbiAgICAgICAgaWYgKCFpc0FuaW1hdGlvbkZyYW1lU2NoZWR1bGVkKSB7XG4gICAgICAgICAgLy8gU2NoZWR1bGUgYW5vdGhlciBhbmltYXRpb24gY2FsbGJhY2sgc28gd2UgcmV0cnkgbGF0ZXIuXG4gICAgICAgICAgaXNBbmltYXRpb25GcmFtZVNjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lV2l0aFRpbWVvdXQoYW5pbWF0aW9uVGljayk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRXhpdCB3aXRob3V0IGludm9raW5nIHRoZSBjYWxsYmFjay5cbiAgICAgICAgc2NoZWR1bGVkSG9zdENhbGxiYWNrID0gcHJldlNjaGVkdWxlZENhbGxiYWNrO1xuICAgICAgICB0aW1lb3V0VGltZSA9IHByZXZUaW1lb3V0VGltZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcmV2U2NoZWR1bGVkQ2FsbGJhY2sgIT09IG51bGwpIHtcbiAgICAgIGlzRmx1c2hpbmdIb3N0Q2FsbGJhY2sgPSB0cnVlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcHJldlNjaGVkdWxlZENhbGxiYWNrKGRpZFRpbWVvdXQpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaXNGbHVzaGluZ0hvc3RDYWxsYmFjayA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgYW5pbWF0aW9uVGljayA9IGZ1bmN0aW9uIChyYWZUaW1lKSB7XG4gICAgaWYgKHNjaGVkdWxlZEhvc3RDYWxsYmFjayAhPT0gbnVsbCkge1xuICAgICAgLy8gRWFnZXJseSBzY2hlZHVsZSB0aGUgbmV4dCBhbmltYXRpb24gY2FsbGJhY2sgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGVcbiAgICAgIC8vIGZyYW1lLiBJZiB0aGUgc2NoZWR1bGVyIHF1ZXVlIGlzIG5vdCBlbXB0eSBhdCB0aGUgZW5kIG9mIHRoZSBmcmFtZSwgaXRcbiAgICAgIC8vIHdpbGwgY29udGludWUgZmx1c2hpbmcgaW5zaWRlIHRoYXQgY2FsbGJhY2suIElmIHRoZSBxdWV1ZSAqaXMqIGVtcHR5LFxuICAgICAgLy8gdGhlbiBpdCB3aWxsIGV4aXQgaW1tZWRpYXRlbHkuIFBvc3RpbmcgdGhlIGNhbGxiYWNrIGF0IHRoZSBzdGFydCBvZiB0aGVcbiAgICAgIC8vIGZyYW1lIGVuc3VyZXMgaXQncyBmaXJlZCB3aXRoaW4gdGhlIGVhcmxpZXN0IHBvc3NpYmxlIGZyYW1lLiBJZiB3ZVxuICAgICAgLy8gd2FpdGVkIHVudGlsIHRoZSBlbmQgb2YgdGhlIGZyYW1lIHRvIHBvc3QgdGhlIGNhbGxiYWNrLCB3ZSByaXNrIHRoZVxuICAgICAgLy8gYnJvd3NlciBza2lwcGluZyBhIGZyYW1lIGFuZCBub3QgZmlyaW5nIHRoZSBjYWxsYmFjayB1bnRpbCB0aGUgZnJhbWVcbiAgICAgIC8vIGFmdGVyIHRoYXQuXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVXaXRoVGltZW91dChhbmltYXRpb25UaWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm8gcGVuZGluZyB3b3JrLiBFeGl0LlxuICAgICAgaXNBbmltYXRpb25GcmFtZVNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0RnJhbWVUaW1lID0gcmFmVGltZSAtIGZyYW1lRGVhZGxpbmUgKyBhY3RpdmVGcmFtZVRpbWU7XG4gICAgaWYgKG5leHRGcmFtZVRpbWUgPCBhY3RpdmVGcmFtZVRpbWUgJiYgcHJldmlvdXNGcmFtZVRpbWUgPCBhY3RpdmVGcmFtZVRpbWUpIHtcbiAgICAgIGlmIChuZXh0RnJhbWVUaW1lIDwgOCkge1xuICAgICAgICAvLyBEZWZlbnNpdmUgY29kaW5nLiBXZSBkb24ndCBzdXBwb3J0IGhpZ2hlciBmcmFtZSByYXRlcyB0aGFuIDEyMGh6LlxuICAgICAgICAvLyBJZiB0aGUgY2FsY3VsYXRlZCBmcmFtZSB0aW1lIGdldHMgbG93ZXIgdGhhbiA4LCBpdCBpcyBwcm9iYWJseSBhIGJ1Zy5cbiAgICAgICAgbmV4dEZyYW1lVGltZSA9IDg7XG4gICAgICB9XG4gICAgICAvLyBJZiBvbmUgZnJhbWUgZ29lcyBsb25nLCB0aGVuIHRoZSBuZXh0IG9uZSBjYW4gYmUgc2hvcnQgdG8gY2F0Y2ggdXAuXG4gICAgICAvLyBJZiB0d28gZnJhbWVzIGFyZSBzaG9ydCBpbiBhIHJvdywgdGhlbiB0aGF0J3MgYW4gaW5kaWNhdGlvbiB0aGF0IHdlXG4gICAgICAvLyBhY3R1YWxseSBoYXZlIGEgaGlnaGVyIGZyYW1lIHJhdGUgdGhhbiB3aGF0IHdlJ3JlIGN1cnJlbnRseSBvcHRpbWl6aW5nLlxuICAgICAgLy8gV2UgYWRqdXN0IG91ciBoZXVyaXN0aWMgZHluYW1pY2FsbHkgYWNjb3JkaW5nbHkuIEZvciBleGFtcGxlLCBpZiB3ZSdyZVxuICAgICAgLy8gcnVubmluZyBvbiAxMjBoeiBkaXNwbGF5IG9yIDkwaHogVlIgZGlzcGxheS5cbiAgICAgIC8vIFRha2UgdGhlIG1heCBvZiB0aGUgdHdvIGluIGNhc2Ugb25lIG9mIHRoZW0gd2FzIGFuIGFub21hbHkgZHVlIHRvXG4gICAgICAvLyBtaXNzZWQgZnJhbWUgZGVhZGxpbmVzLlxuICAgICAgYWN0aXZlRnJhbWVUaW1lID0gbmV4dEZyYW1lVGltZSA8IHByZXZpb3VzRnJhbWVUaW1lID8gcHJldmlvdXNGcmFtZVRpbWUgOiBuZXh0RnJhbWVUaW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmV2aW91c0ZyYW1lVGltZSA9IG5leHRGcmFtZVRpbWU7XG4gICAgfVxuICAgIGZyYW1lRGVhZGxpbmUgPSByYWZUaW1lICsgYWN0aXZlRnJhbWVUaW1lO1xuICAgIGlmICghaXNNZXNzYWdlRXZlbnRTY2hlZHVsZWQpIHtcbiAgICAgIGlzTWVzc2FnZUV2ZW50U2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgIHBvcnQucG9zdE1lc3NhZ2UodW5kZWZpbmVkKTtcbiAgICB9XG4gIH07XG5cbiAgcmVxdWVzdEhvc3RDYWxsYmFjayA9IGZ1bmN0aW9uIChjYWxsYmFjaywgYWJzb2x1dGVUaW1lb3V0KSB7XG4gICAgc2NoZWR1bGVkSG9zdENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgdGltZW91dFRpbWUgPSBhYnNvbHV0ZVRpbWVvdXQ7XG4gICAgaWYgKGlzRmx1c2hpbmdIb3N0Q2FsbGJhY2sgfHwgYWJzb2x1dGVUaW1lb3V0IDwgMCkge1xuICAgICAgLy8gRG9uJ3Qgd2FpdCBmb3IgdGhlIG5leHQgZnJhbWUuIENvbnRpbnVlIHdvcmtpbmcgQVNBUCwgaW4gYSBuZXcgZXZlbnQuXG4gICAgICBwb3J0LnBvc3RNZXNzYWdlKHVuZGVmaW5lZCk7XG4gICAgfSBlbHNlIGlmICghaXNBbmltYXRpb25GcmFtZVNjaGVkdWxlZCkge1xuICAgICAgLy8gSWYgckFGIGRpZG4ndCBhbHJlYWR5IHNjaGVkdWxlIG9uZSwgd2UgbmVlZCB0byBzY2hlZHVsZSBhIGZyYW1lLlxuICAgICAgLy8gVE9ETzogSWYgdGhpcyByQUYgZG9lc24ndCBtYXRlcmlhbGl6ZSBiZWNhdXNlIHRoZSBicm93c2VyIHRocm90dGxlcywgd2VcbiAgICAgIC8vIG1pZ2h0IHdhbnQgdG8gc3RpbGwgaGF2ZSBzZXRUaW1lb3V0IHRyaWdnZXIgcklDIGFzIGEgYmFja3VwIHRvIGVuc3VyZVxuICAgICAgLy8gdGhhdCB3ZSBrZWVwIHBlcmZvcm1pbmcgd29yay5cbiAgICAgIGlzQW5pbWF0aW9uRnJhbWVTY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lV2l0aFRpbWVvdXQoYW5pbWF0aW9uVGljayk7XG4gICAgfVxuICB9O1xuXG4gIGNhbmNlbEhvc3RDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICBzY2hlZHVsZWRIb3N0Q2FsbGJhY2sgPSBudWxsO1xuICAgIGlzTWVzc2FnZUV2ZW50U2NoZWR1bGVkID0gZmFsc2U7XG4gICAgdGltZW91dFRpbWUgPSAtMTtcbiAgfTtcbn1cblxuZXhwb3J0cy51bnN0YWJsZV9JbW1lZGlhdGVQcmlvcml0eSA9IEltbWVkaWF0ZVByaW9yaXR5O1xuZXhwb3J0cy51bnN0YWJsZV9Vc2VyQmxvY2tpbmdQcmlvcml0eSA9IFVzZXJCbG9ja2luZ1ByaW9yaXR5O1xuZXhwb3J0cy51bnN0YWJsZV9Ob3JtYWxQcmlvcml0eSA9IE5vcm1hbFByaW9yaXR5O1xuZXhwb3J0cy51bnN0YWJsZV9JZGxlUHJpb3JpdHkgPSBJZGxlUHJpb3JpdHk7XG5leHBvcnRzLnVuc3RhYmxlX0xvd1ByaW9yaXR5ID0gTG93UHJpb3JpdHk7XG5leHBvcnRzLnVuc3RhYmxlX3J1bldpdGhQcmlvcml0eSA9IHVuc3RhYmxlX3J1bldpdGhQcmlvcml0eTtcbmV4cG9ydHMudW5zdGFibGVfc2NoZWR1bGVDYWxsYmFjayA9IHVuc3RhYmxlX3NjaGVkdWxlQ2FsbGJhY2s7XG5leHBvcnRzLnVuc3RhYmxlX2NhbmNlbENhbGxiYWNrID0gdW5zdGFibGVfY2FuY2VsQ2FsbGJhY2s7XG5leHBvcnRzLnVuc3RhYmxlX3dyYXBDYWxsYmFjayA9IHVuc3RhYmxlX3dyYXBDYWxsYmFjaztcbmV4cG9ydHMudW5zdGFibGVfZ2V0Q3VycmVudFByaW9yaXR5TGV2ZWwgPSB1bnN0YWJsZV9nZXRDdXJyZW50UHJpb3JpdHlMZXZlbDtcbmV4cG9ydHMudW5zdGFibGVfc2hvdWxkWWllbGQgPSB1bnN0YWJsZV9zaG91bGRZaWVsZDtcbmV4cG9ydHMudW5zdGFibGVfY29udGludWVFeGVjdXRpb24gPSB1bnN0YWJsZV9jb250aW51ZUV4ZWN1dGlvbjtcbmV4cG9ydHMudW5zdGFibGVfcGF1c2VFeGVjdXRpb24gPSB1bnN0YWJsZV9wYXVzZUV4ZWN1dGlvbjtcbmV4cG9ydHMudW5zdGFibGVfZ2V0Rmlyc3RDYWxsYmFja05vZGUgPSB1bnN0YWJsZV9nZXRGaXJzdENhbGxiYWNrTm9kZTtcbiAgfSkoKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9zY2hlZHVsZXIucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvc2NoZWR1bGVyLmRldmVsb3BtZW50LmpzJyk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvc2NoZWR1bGVyLXRyYWNpbmcucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvc2NoZWR1bGVyLXRyYWNpbmcuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbmltcG9ydCBwb255ZmlsbCBmcm9tICcuL3BvbnlmaWxsLmpzJztcblxudmFyIHJvb3Q7XG5cbmlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBtb2R1bGU7XG59IGVsc2Uge1xuICByb290ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbn1cblxudmFyIHJlc3VsdCA9IHBvbnlmaWxsKHJvb3QpO1xuZXhwb3J0IGRlZmF1bHQgcmVzdWx0O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsKHJvb3QpIHtcblx0dmFyIHJlc3VsdDtcblx0dmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5cdGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKFN5bWJvbC5vYnNlcnZhYmxlKSB7XG5cdFx0XHRyZXN1bHQgPSBTeW1ib2wub2JzZXJ2YWJsZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG5cdFx0XHRTeW1ib2wub2JzZXJ2YWJsZSA9IHJlc3VsdDtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gJ0BAb2JzZXJ2YWJsZSc7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWxNb2R1bGUpIHtcblx0aWYgKCFvcmlnaW5hbE1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHR2YXIgbW9kdWxlID0gT2JqZWN0LmNyZWF0ZShvcmlnaW5hbE1vZHVsZSk7XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiZXhwb3J0c1wiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlXG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1tdWx0aS1zcGFjZXMgKi9cblxuLy8gQXBwbGljYXRpb25cbmV4cG9ydCBjb25zdCBBUFBfQk9PVFVQID0gJ0FQUF9CT09UVVAnO1xuXG4vLyBBdXRoZW50aWNhdGlvblxuZXhwb3J0IGNvbnN0IFNJR05JTl9VU0VSX1JFUVVFU1QgPSAnU0lHTklOX1VTRVJfUkVRVUVTVCc7XG5leHBvcnQgY29uc3QgU0lHTklOX1VTRVJfU1VDQ0VTUyA9ICdTSUdOSU5fVVNFUl9TVUNDRVNTJztcbmV4cG9ydCBjb25zdCBTSUdOSU5fVVNFUl9FUlJPUiAgID0gJ1NJR05JTl9VU0VSX0VSUk9SJztcblxuZXhwb3J0IGNvbnN0IENMRUFSX1NJR05JTl9FUlJPUiAgPSAnQ0xFQVJfU0lHTklOX0VSUk9SJztcblxuZXhwb3J0IGNvbnN0IFNJR05VUF9VU0VSX1JFUVVFU1QgPSAnU0lHTlVQX1VTRVJfUkVRVUVTVCc7XG5leHBvcnQgY29uc3QgU0lHTlVQX1VTRVJfU1VDQ0VTUyA9ICdTSUdOVVBfVVNFUl9TVUNDRVNTJztcbmV4cG9ydCBjb25zdCBTSUdOVVBfVVNFUl9FUlJPUiAgID0gJ1NJR05VUF9VU0VSX0VSUk9SJztcblxuZXhwb3J0IGNvbnN0IENMRUFSX1NJR05VUF9FUlJPUiAgPSAnQ0xFQVJfU0lHTlVQX0VSUk9SJztcblxuZXhwb3J0IGNvbnN0IFNJR05PVVRfVVNFUl9TVUNDRVNTID0gJ1NJR05PVVRfVVNFUl9TVUNDRVNTJztcblxuZXhwb3J0IGNvbnN0IFJFRlJFU0hfVE9LRU5fUkVRVUVTVCA9ICdSRUZSRVNIX1RPS0VOX1JFUVVFU1QnO1xuZXhwb3J0IGNvbnN0IFJFRlJFU0hfVE9LRU5fU1VDQ0VTUyA9ICdSRUZSRVNIX1RPS0VOX1NVQ0NFU1MnO1xuZXhwb3J0IGNvbnN0IFJFRlJFU0hfVE9LRU5fRVJST1IgICA9ICdSRUZSRVNIX1RPS0VOX0VSUk9SJztcblxuZXhwb3J0IGNvbnN0IEFVVEhFTlRJQ0FURV9GUk9NX1RPS0VOID0gJ0FVVEhFTlRJQ0FURV9GUk9NX1RPS0VOJztcblxuLy8gUHJlc2VuY2VcbmV4cG9ydCBjb25zdCBESVNQQVRDSF9QUkVTRU5DRV9TVEFURSA9ICdESVNQQVRDSF9QUkVTRU5DRV9TVEFURSc7XG5leHBvcnQgY29uc3QgRElTUEFUQ0hfUFJFU0VOQ0VfRElGRiAgPSAnRElTUEFUQ0hfUFJFU0VOQ0VfRElGRic7XG5cbi8vIFNvY2tldFxuZXhwb3J0IGNvbnN0IE9QRU5fU09DS0VUICAgICAgICAgPSAnT1BFTl9TT0NLRVQnO1xuZXhwb3J0IGNvbnN0IENMT1NFX1NPQ0tFVCAgICAgICAgPSAnQ0xPU0VfU09DS0VUJztcbmV4cG9ydCBjb25zdCBTT0NLRVRfQ09OTkVDVEVEICAgID0gJ1NPQ0tFVF9DT05ORUNURUQnO1xuZXhwb3J0IGNvbnN0IFNPQ0tFVF9ESVNDT05ORUNURUQgPSAnU09DS0VUX0RJU0NPTk5FQ1RFRCc7XG5leHBvcnQgY29uc3QgU09DS0VUX0VSUk9SICAgICAgICA9ICdTT0NLRVRfRVJST1InO1xuZXhwb3J0IGNvbnN0IFNPQ0tFVF9DTE9TRUQgICAgICAgPSAnU09DS0VUX0NMT1NFRCc7XG5cbi8vIENoYW5uZWxzXG5leHBvcnQgY29uc3QgSk9JTl9DSEFOTkVMICAgICAgICAgID0gJ0pPSU5fQ0hBTk5FTCc7XG5leHBvcnQgY29uc3QgTEVBVkVfQ0hBTk5FTCAgICAgICAgID0gJ0xFQVZFX0NIQU5ORUwnO1xuZXhwb3J0IGNvbnN0IENIQU5ORUxfQ09OTkVDVEVEICAgICA9ICdDSEFOTkVMX0NPTk5FQ1RFRCc7XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9ESVNDT05ORUNURUQgID0gJ0NIQU5ORUxfRElTQ09OTkVDVEVEJztcbmV4cG9ydCBjb25zdCBDSEFOTkVMX0VSUk9SICAgICAgICAgPSAnQ0hBTk5FTF9FUlJPUic7XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9DTE9TRUQgICAgICAgID0gJ0NIQU5ORUxfQ0xPU0VEJztcbmV4cG9ydCBjb25zdCBTRU5EX0NPTU1BTkQgICAgICAgICAgPSAnU0VORF9DT01NQU5EJztcbmV4cG9ydCBjb25zdCBDT05ORUNUX0NIQU5ORUxfRVJST1IgPSAnQ09OTkVDVF9DSEFOTkVMX0VSUk9SJztcblxuLy8gUmVxdWVzdHNcbmV4cG9ydCBjb25zdCBSRVFVRVNUU19SRUNFSVZFRCA9ICdSRVFVRVNUU19SRUNFSVZFRCc7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9DUkVBVEVEICAgPSAnUkVRVUVTVF9DUkVBVEVEJztcbmV4cG9ydCBjb25zdCBSRVFVRVNUX0NBTkNFTExFRCA9ICdSRVFVRVNUX0NBTkNFTExFRCc7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9BQ0NFUFRFRCAgPSAnUkVRVUVTVF9BQ0NFUFRFRCc7XG5cbmV4cG9ydCBjb25zdCBSRVFVRVNUX0NSRUFURURfRVJST1IgICA9ICdSRVFVRVNUX0NSRUFURURfRVJST1InO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RfQ0FOQ0VMTEVEX0VSUk9SID0gJ1JFUVVFU1RfQ0FOQ0VMTEVEX0VSUk9SJztcbmV4cG9ydCBjb25zdCBSRVFVRVNUX0FDQ0VQVEVEX0VSUk9SICA9ICdSRVFVRVNUX0FDQ0VQVEVEX0VSUk9SJztcblxuLy8gR2FtZXMgJiBHYW1lSW5mb1xuZXhwb3J0IGNvbnN0IEdBTUVTX1JFQ0VJVkVEICAgPSAnR0FNRVNfUkVDRUlWRUQnO1xuZXhwb3J0IGNvbnN0IEdBTUVfQURERUQgICAgICAgPSAnR0FNRV9BRERFRCc7XG5leHBvcnQgY29uc3QgR0FNRV9SRU1PVkVEICAgICA9ICdHQU1FX1JFTU9WRUQnO1xuZXhwb3J0IGNvbnN0IEdBTUVfRk9SQ0VfUVVJVCAgPSAnR0FNRV9GT1JDRV9RVUlUJztcbmV4cG9ydCBjb25zdCBKT0lOX0dBTUUgICAgICAgID0gJ0pPSU5fR0FNRSc7XG5leHBvcnQgY29uc3QgVVBEQVRFX0dBTUVfSU5GTyA9ICdVUERBVEVfR0FNRV9JTkZPJztcblxuLy8gR2FtZVN0YXRlXG5leHBvcnQgY29uc3QgVVBEQVRFX0dBTUVfU1RBVEUgPSAnVVBEQVRFX0dBTUVfU1RBVEUnO1xuZXhwb3J0IGNvbnN0IFBMQVlfTU9WRV9FUlJPUiAgID0gJ1BMQVlfTU9WRV9FUlJPUic7XG5leHBvcnQgY29uc3QgUEFTU19FUlJPUiAgICAgICAgPSAnUEFTU19FUlJPUic7XG5leHBvcnQgY29uc3QgUkVTSUdOX0VSUk9SICAgICAgPSAnUkVTSUdOX0VSUk9SJztcblxuLy8gIENoYXRcbmV4cG9ydCBjb25zdCBNRVNTQUdFX0NSRUFURUQgICAgICAgICA9ICdNRVNTQUdFX0NSRUFURUQnO1xuZXhwb3J0IGNvbnN0IE1FU1NBR0VTX1JFQ0VJVkVEICAgICAgID0gJ01FU1NBR0VTX1JFQ0VJVkVEJztcbmV4cG9ydCBjb25zdCBNRVNTQUdFX0NSRUFURURfRVJST1IgICA9ICdNRVNTQUdFX0NSRUFURURfRVJST1InO1xuZXhwb3J0IGNvbnN0IE1FU1NBR0VTX1JFQ0VJVkVEX0VSUk9SID0gJ01FU1NBR0VTX1JFQ0VJVkVEX0VSUk9SJztcblxuLyogZXNsaW50LWVuYWJsZSBuby1tdWx0aS1zcGFjZXMgKi8iLCJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL2FjdGlvbl90eXBlcyc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0XG5leHBvcnQgY29uc3QgYXBwQm9vdHVwID0gYm9vdHVwVGltZSA9PiAoXG4gIHsgdHlwZTogdHlwZXMuQVBQX0JPT1RVUCwgcGF5bG9hZDogYm9vdHVwVGltZSB9XG4pO1xuIiwiaW1wb3J0IEFwaSBmcm9tICcuLi9zZXJ2aWNlcy9hcGknO1xuaW1wb3J0IEF1dGhTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL2F1dGhfc2VydmljZSc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL2FjdGlvbl90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBjbGVhclNpZ25pbkVycm9yID0gKCkgPT4gKHtcbiAgdHlwZTogdHlwZXMuQ0xFQVJfU0lHTklOX0VSUk9SLFxufSk7XG5cbmV4cG9ydCBjb25zdCBjbGVhclNpZ251cEVycm9yID0gKCkgPT4gKHtcbiAgdHlwZTogdHlwZXMuQ0xFQVJfU0lHTlVQX0VSUk9SLFxufSk7XG5cbi8vIEV4dHJhY3RzIHNlcnZlciBlcnJvclxuY29uc3QgZXJyb3JQYXlsb2FkID0gZXJyb3IgPT4gKFxuICBlcnJvci5yZXNwb25zZSAmJiBlcnJvci5yZXNwb25zZS5kYXRhID9cbiAgICBKU09OLnN0cmluZ2lmeShlcnJvci5yZXNwb25zZS5kYXRhKSA6XG4gICAgZXJyb3IudG9TdHJpbmcoKVxuKTtcblxuLy8gam9pbiBkaXNwYXRjaCBhZnRlciBzdWNjZXNzZnVsIGxvZ2luIG9yIHJlZnJlc2hcbmNvbnN0IGpvaW5EaXNwYXRjaCA9IChkaXNwYXRjaCwgdXNlcklkKSA9PiB7XG4gIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuT1BFTl9TT0NLRVQgfSk7XG4gIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuSk9JTl9DSEFOTkVMLCB0b3BpYzogJ3N5c3RlbScgfSk7XG4gIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuSk9JTl9DSEFOTkVMLCB0b3BpYzogYHVzZXI6JHt1c2VySWR9YCB9KTtcbn07XG5cbi8vIGxlYXZlIGRpc3BhdGNoIGFmdGVyIHN1Y2Nlc3NmdWwgbG9nb3V0XG5jb25zdCBsZWF2ZURpc3BhdGNoID0gKGRpc3BhdGNoLCB1c2VySWQpID0+IHtcbiAgZGlzcGF0Y2goeyB0eXBlOiB0eXBlcy5MRUFWRV9DSEFOTkVMLCB0b3BpYzogYHVzZXI6JHt1c2VySWR9YCB9KTtcbiAgZGlzcGF0Y2goeyB0eXBlOiB0eXBlcy5MRUFWRV9DSEFOTkVMLCB0b3BpYzogJ3N5c3RlbScgfSk7XG4gIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuQ0xPU0VfU09DS0VUIH0pO1xufTtcblxuLy8gVEhVTktcbmV4cG9ydCBjb25zdCBzaWduaW5Vc2VyID0gKHsgbmFtZSwgcGFzc3dvcmQgfSkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuU0lHTklOX1VTRVJfUkVRVUVTVCwgcGF5bG9hZDogeyBuYW1lLCBwYXNzd29yZCB9IH0pO1xuXG4gIC8vIFN1Ym1pdCBuYW1lL3Bhc3N3b3JkIHRvIHRoZSBzZXJ2ZXJcbiAgQXBpLnNpZ25pbih7IG5hbWUsIHBhc3N3b3JkIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAvLyAtIFNhdmUgSldUIHRva2VuXG4gICAgICBjb25zdCB7IHRva2VuLCB1c2VyIH0gPSByZXNwb25zZS5kYXRhO1xuICAgICAgQXV0aFNlcnZpY2Uuc2F2ZVRva2VuKHRva2VuKTtcblxuICAgICAgLy8gZGlzcGF0Y2goeyB0eXBlOiB0eXBlcy5PUEVOX1NPQ0tFVCB9KTtcbiAgICAgIC8vIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuSk9JTl9DSEFOTkVMLCB0b3BpYzogJ3N5c3RlbScgfSk7XG4gICAgICAvLyBkaXNwYXRjaCh7IHR5cGU6IHR5cGVzLkpPSU5fQ0hBTk5FTCwgdG9waWM6IGB1c2VyOiR7dXNlci5pZH1gIH0pO1xuICAgICAgam9pbkRpc3BhdGNoKGRpc3BhdGNoLCB1c2VyLmlkKTtcbiAgICAgIFxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiB0eXBlcy5TSUdOSU5fVVNFUl9TVUNDRVNTLCBwYXlsb2FkOiByZXNwb25zZS5kYXRhIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IHR5cGVzLlNJR05JTl9VU0VSX0VSUk9SLCBwYXlsb2FkOiBlcnJvclBheWxvYWQoZXJyb3IpLFxuICAgICAgfSkpO1xufTtcblxuLy8gVEhVTktcbmV4cG9ydCBjb25zdCBzaWdudXBVc2VyID0gKHsgbmFtZSwgZW1haWwsIHBhc3N3b3JkIH0pID0+IChkaXNwYXRjaCkgPT4ge1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogdHlwZXMuU0lHTlVQX1VTRVJfUkVRVUVTVCwgcGF5bG9hZDogeyBuYW1lLCBlbWFpbCwgcGFzc3dvcmQgfSxcbiAgfSk7XG5cbiAgLy8gU3VibWl0IG5hbWUvcGFzc3dvcmQgdG8gdGhlIHNlcnZlclxuICBBcGkuc2lnbnVwKHsgbmFtZSwgZW1haWwsIHBhc3N3b3JkIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAvLyAtIFNhdmUgSldUIHRva2VuXG4gICAgICBjb25zdCB7IHRva2VuLCB1c2VyIH0gPSByZXNwb25zZS5kYXRhO1xuICAgICAgQXV0aFNlcnZpY2Uuc2F2ZVRva2VuKHRva2VuKTtcblxuICAgICAgLy8gZGlzcGF0Y2goeyB0eXBlOiB0eXBlcy5PUEVOX1NPQ0tFVCB9KTtcbiAgICAgIC8vIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuSk9JTl9DSEFOTkVMLCB0b3BpYzogJ3N5c3RlbScgfSk7XG4gICAgICAvLyBkaXNwYXRjaCh7IHR5cGU6IHR5cGVzLkpPSU5fQ0hBTk5FTCwgdG9waWM6IGB1c2VyOiR7dXNlci5pZH1gIH0pO1xuICAgICAgam9pbkRpc3BhdGNoKGRpc3BhdGNoLCB1c2VyLmlkKTtcbiAgICAgIFxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiB0eXBlcy5TSUdOVVBfVVNFUl9TVUNDRVNTLCBwYXlsb2FkOiByZXNwb25zZS5kYXRhIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IHR5cGVzLlNJR05VUF9VU0VSX0VSUk9SLCBwYXlsb2FkOiBlcnJvclBheWxvYWQoZXJyb3IpLFxuICAgICAgfSkpO1xufTtcblxuLy8gVEhVTktcbmV4cG9ydCBjb25zdCBzaWdub3V0VXNlciA9ICh1c2VySWQpID0+IChkaXNwYXRjaCkgPT4ge1xuICBBcGkuc2lnbm91dCgpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBBdXRoU2VydmljZS5yZW1vdmVUb2tlbigpO1xuXG4gICAgICAvLyBkaXNwYXRjaCh7IHR5cGU6IHR5cGVzLkxFQVZFX0NIQU5ORUwsIHRvcGljOiBgdXNlcjoke3VzZXJJZH1gIH0pO1xuICAgICAgLy8gZGlzcGF0Y2goeyB0eXBlOiB0eXBlcy5MRUFWRV9DSEFOTkVMLCB0b3BpYzogJ3N5c3RlbScgfSk7XG4gICAgICAvLyBkaXNwYXRjaCh7IHR5cGU6IHR5cGVzLkNMT1NFX1NPQ0tFVCB9KTtcbiAgICAgIGxlYXZlRGlzcGF0Y2goZGlzcGF0Y2gsIHVzZXJJZCk7XG4gICAgICBcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuU0lHTk9VVF9VU0VSX1NVQ0NFU1MsIHBheWxvYWQ6IHJlc3BvbnNlLmRhdGEgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2coZXJyb3IpKTtcbn07XG5cbi8vIFRoaXMgYWN0aW9uIGlzIHVzZWQgdG8gc3luYyBpc19hY3RpdmF0ZWQgb24gcmVmcmVzaC5cbi8vIE90aGVyd2lzZSwgaG9jIGF1dGhlbnRpY2F0aW9uIG1pZ2h0IHJlZGlyZWN0IHlvdSB0byBzaWduIGluIVxuZXhwb3J0IGNvbnN0IGF1dGhlbnRpY2F0ZUZyb21Ub2tlbiA9ICgpID0+ICh7XG4gIHR5cGU6IHR5cGVzLkFVVEhFTlRJQ0FURV9GUk9NX1RPS0VOLFxuICBwYXlsb2FkOiBudWxsLFxufSk7XG5cbi8vIFRIVU5LXG5leHBvcnQgY29uc3QgcmVmcmVzaFRva2VuID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuUkVGUkVTSF9UT0tFTl9SRVFVRVNUIH0pO1xuXG4gIEFwaS5yZWZyZXNoVG9rZW4oKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgLy8gLSBTYXZlIEpXVCB0b2tlblxuICAgICAgY29uc3QgeyB0b2tlbiwgdXNlciB9ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIEF1dGhTZXJ2aWNlLnNhdmVUb2tlbih0b2tlbik7XG5cbiAgICAgIC8vIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuT1BFTl9TT0NLRVQgfSk7XG4gICAgICAvLyBkaXNwYXRjaCh7IHR5cGU6IHR5cGVzLkpPSU5fQ0hBTk5FTCwgdG9waWM6ICdzeXN0ZW0nIH0pO1xuICAgICAgLy8gZGlzcGF0Y2goeyB0eXBlOiB0eXBlcy5KT0lOX0NIQU5ORUwsIHRvcGljOiBgdXNlcjoke3VzZXIuaWR9YCB9KTtcbiAgICAgIGpvaW5EaXNwYXRjaChkaXNwYXRjaCwgdXNlci5pZCk7XG4gICAgICBcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogdHlwZXMuUkVGUkVTSF9UT0tFTl9TVUNDRVNTLCBwYXlsb2FkOiByZXNwb25zZS5kYXRhLFxuICAgICAgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT5cbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogdHlwZXMuUkVGUkVTSF9UT0tFTl9FUlJPUiwgcGF5bG9hZDogZXJyb3JQYXlsb2FkKGVycm9yKSxcbiAgICAgIH0pKTtcbn07XG4iLCJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL2FjdGlvbl90eXBlcyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLW11bHRpLXNwYWNlcyAqL1xuZXhwb3J0IGNvbnN0IGpvaW5DaGFubmVsICA9IHRvcGljID0+ICh7IHR5cGU6IHR5cGVzLkpPSU5fQ0hBTk5FTCwgdG9waWMgfSk7XG5leHBvcnQgY29uc3QgbGVhdmVDaGFubmVsID0gdG9waWMgPT4gKHsgdHlwZTogdHlwZXMuTEVBVkVfQ0hBTk5FTCwgdG9waWMgfSk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLW11bHRpLXNwYWNlcyAqLyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG4vKlxuICBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9hbmNob3ItaXMtdmFsaWQsXG4gICAganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyxcbiAgICBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnNcbiovXG5cbmNvbnN0IEFsZXJ0Qm94ID0gKHsgbW9kZSwgbWVzc2FnZSwgb25DbG9zZSB9KSA9PiAoXG4gIDxkaXYgcm9sZT1cImFsZXJ0XCIgY2xhc3NOYW1lPXtgYWxlcnQgYWxlcnQtJHttb2RlfWB9PlxuICAgIDxhIG9uQ2xpY2s9e29uQ2xvc2V9IGNsYXNzTmFtZT1cImNsb3NlXCI+JnRpbWVzOzwvYT5cbiAgICA8c3Ryb25nPnttZXNzYWdlfTwvc3Ryb25nPlxuICA8L2Rpdj5cbik7XG5cbi8qIFxuICBlc2xpbnQtZW5hYmxlIGpzeC1hMTF5L2FuY2hvci1pcy12YWxpZCxcbiAgICBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzLFxuICAgIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9uc1xuKi9cblxuQWxlcnRCb3guZGVmYXVsdFByb3BzID0ge1xuICBtb2RlOiAnaW5mbycsXG59O1xuXG5BbGVydEJveC5wcm9wVHlwZXMgPSB7XG4gIG1vZGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFsZXJ0Qm94O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1dHRvbiA9ICh7IGNoaWxkcmVuLCBvbkNsaWNrLCAuLi5vdGhlclByb3BzIH0pID0+IChcbiAgPGJ1dHRvblxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgY2xhc3NOYW1lPVwiYnV0dG9uXCJcbiAgICB7Li4ub3RoZXJQcm9wc31cbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9idXR0b24+XG4pO1xuXG5CdXR0b24ucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICBQcm9wVHlwZXMub2JqZWN0LFxuICBdKS5pc1JlcXVpcmVkLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uOyIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9pbnB1dCc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vYnV0dG9uJztcbmltcG9ydCB2YWxpZGF0ZSBmcm9tICcuLi91dGlscy92YWxpZGF0aW9uJztcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICBpbml0aWFsU3RhdGU6IHt9LFxuICBidXR0b25MYWJlbDogJ1N1Ym1pdCcsXG4gIGRpc2FibGVkOiBmYWxzZSxcbn07XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzXG4gIHNjaGVtYTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QvZm9yYmlkLXByb3AtdHlwZXNcbiAgaW5pdGlhbFN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAvL1xuICBidXR0b25MYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxufTtcblxuY2xhc3MgRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgeyBzY2hlbWEsIGluaXRpYWxTdGF0ZSB9ID0gcHJvcHM7XG5cbiAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYTtcbiAgICB0aGlzLmZpZWxkTmFtZXMgPSBPYmplY3Qua2V5cyhzY2hlbWEpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuX2xvYWRTdGF0ZUZyb21Qcm9wcyhpbml0aWFsU3RhdGUpO1xuICB9XG5cbiAgaW5wdXRzID0ge31cblxuICAvLyBMb2FkIHN0YXRlIGZyb20gbm9uIGVtcHR5IHByb3BzXG4gIF9sb2FkU3RhdGVGcm9tUHJvcHMgPSAob2JqKSA9PiB7XG4gICAgY29uc3QgeyBzY2hlbWEgfSA9IHRoaXM7XG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgc2NoZW1hKTtcblxuICAgIGlmIChvYmopIHtcbiAgICAgIE9iamVjdC5rZXlzKG9iailcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gb2JqW2tleV0pXG4gICAgICAgIC5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICBpbml0aWFsU3RhdGVba2V5XS52YWx1ZSA9IG9ialtrZXldO1xuICAgICAgICAgIGluaXRpYWxTdGF0ZVtrZXldLnZhbGlkID0gdmFsaWRhdGUoXG4gICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgIHNjaGVtYVtrZXldLnZhbGlkYXRpb25SdWxlcyxcbiAgICAgICAgICApO1xuICAgICAgICAgIGluaXRpYWxTdGF0ZVtrZXldLnRvdWNoZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5pdGlhbFN0YXRlO1xuICB9XG5cbiAgX3JlbmRlckZpZWxkID0gKGtleSkgPT4ge1xuICAgIGNvbnN0IHsgc2NoZW1hLCBmaWVsZE5hbWVzIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgdmFsdWUsIHZhbGlkLCB0b3VjaGVkIH0gPSB0aGlzLnN0YXRlW2tleV07XG4gICAgY29uc3QgeyBlbGVtZW50VHlwZSwgZWxlbWVudENvbmZpZyB9ID0gc2NoZW1hW2tleV07XG5cbiAgICBjb25zdCBsYXN0S2V5ID0gZmllbGROYW1lc1tmaWVsZE5hbWVzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IG5leHRLZXkgPSBmaWVsZE5hbWVzW2ZpZWxkTmFtZXMuaW5kZXhPZihrZXkpICsgMV07XG4gICAgLy8gRXF1aXZhbGVudCB0byBvblN1Ym1pdEVkaXRpbmcgb2YgUmVhY3QgTmF0aXZlXG4gICAgY29uc3Qgb25LZXlQcmVzcyA9IChrZXkgIT09IGxhc3RLZXkpID9cbiAgICAgIC8vIEZvY3VzIG9uIG5leHQgbm9kZSBpZiBub3QgbGFzdFxuICAgICAgZSA9PiBlLmtleSA9PT0gJ0VudGVyJyAmJiB0aGlzLl9mb2N1c1RleHRJbnB1dCh0aGlzLmlucHV0c1tuZXh0S2V5XSkgOlxuICAgICAgLy8gVHJpZ2dlciBzdWJtaXQgaWYgbGFzdCBhbmQgdmFsaWRcbiAgICAgIGUgPT4gZS5rZXkgPT09ICdFbnRlcicgJiYgdGhpcy5fdmFsaWRhdGUoKSAmJiB0aGlzLl9oYW5kbGVDbGljayhlKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8SW5wdXRcbiAgICAgICAga2V5PXtrZXl9XG4gICAgICAgIGlucHV0VHlwZT17ZWxlbWVudFR5cGV9XG4gICAgICAgIHJlZmZ1bmM9e2MgPT4gdGhpcy5pbnB1dHNba2V5XSA9IGN9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmV0dXJuLWFzc2lnblxuICAgICAgICB2YWx1ZT17dmFsdWUgfHwgJyd9XG4gICAgICAgIHZhbGlkPXt2YWxpZH1cbiAgICAgICAgdG91Y2hlZD17dG91Y2hlZH1cbiAgICAgICAgb25DaGFuZ2U9e2UgPT4gdGhpcy5faGFuZGxlT25DaGFuZ2UoZSwga2V5KX1cbiAgICAgICAgb25LZXlQcmVzcz17ZSA9PiBvbktleVByZXNzKGUpfVxuICAgICAgICB7Li4uZWxlbWVudENvbmZpZ31cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIC8vIEZvY3VzIG9uIHRoZSBub2RlXG4gIF9mb2N1c1RleHRJbnB1dCA9IChub2RlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIG5vZGUuZm9jdXMoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2coYENvdWxkbid0IGZvY3VzIG9uIG5leHQgdGV4dCBpbnB1dDogJHtlLm1lc3NhZ2V9YCk7XG4gICAgfVxuICB9O1xuXG4gIF9oYW5kbGVPbkNoYW5nZSA9IChlLCBrZXkpID0+IHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSBlLnRhcmdldDtcbiAgICB0aGlzLnNldFN0YXRlKHByZXZTdGF0ZSA9PiAoe1xuICAgICAgLi4ucHJldlN0YXRlLFxuICAgICAgW2tleV06IHtcbiAgICAgICAgLi4ucHJldlN0YXRlW2tleV0sXG4gICAgICAgIHZhbHVlOiB2YWx1ZSB8fCAnJyxcbiAgICAgICAgdmFsaWQ6IHZhbGlkYXRlKFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIHByZXZTdGF0ZVtrZXldLnZhbGlkYXRpb25SdWxlcyxcbiAgICAgICAgKSxcbiAgICAgICAgdG91Y2hlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSkpO1xuICB9XG5cbiAgX3ZhbGlkYXRlID0gKCkgPT4gdGhpcy5maWVsZE5hbWVzLm1hcChrZXkgPT4gdGhpcy5zdGF0ZVtrZXldLnZhbGlkKVxuICAgIC5ldmVyeSh2ID0+IHYpO1xuXG4gIC8vIFJldHVybnMgYW4gb2JqZWN0IHdpdGgga2V5cywgdmFsdWVzXG4gIF9sb2FkRGF0YSA9ICgpID0+IChcbiAgICB0aGlzLmZpZWxkTmFtZXMucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgYWNjW2tleV0gPSB0aGlzLnN0YXRlW2tleV0udmFsdWU7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KVxuICApO1xuXG4gIF9oYW5kbGVDbGljayA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMucHJvcHMub25DbGljayh0aGlzLl9sb2FkRGF0YSgpKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGRpc2FibGVkLCBidXR0b25MYWJlbCB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8Zm9ybT5cbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuZmllbGROYW1lcy5tYXAoa2V5ID0+IHRoaXMuX3JlbmRlckZpZWxkKGtleSkpXG4gICAgICAgIH1cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZCB8fCAhdGhpcy5fdmFsaWRhdGUoKX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9oYW5kbGVDbGlja31cbiAgICAgICAgPlxuICAgICAgICAgIHtidXR0b25MYWJlbH1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGb3JtO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IElucHV0ID0gKHtcbiAgaW5wdXRUeXBlLCBsYWJlbCwgcmVmZnVuYywgdmFsaWQsIHRvdWNoZWQsIG5vV3JhcHBlciwgLi4ub3RoZXJQcm9wc1xufSkgPT4ge1xuICBsZXQgaW5wdXRFbGVtZW50O1xuICBjb25zdCBpbnB1dENsYXNzZXMgPSBbJ2lucHV0LWVsZW1lbnQnXTtcblxuICBpZiAoIXZhbGlkICYmIHRvdWNoZWQpIHtcbiAgICBpbnB1dENsYXNzZXMucHVzaCgnZXJyb3InKTtcbiAgfVxuXG4gIHN3aXRjaCAoaW5wdXRUeXBlKSB7XG4gICAgY2FzZSAnc2VsZWN0Jzoge1xuICAgICAgLy8gRXh0cmFjdCBvcHRpb25zIHByb3BlcnR5XG4gICAgICBjb25zdCB7IG9wdGlvbnMsIC4uLnNlbGVjdFByb3BzIH0gPSBvdGhlclByb3BzO1xuICAgICAgaW5wdXRFbGVtZW50ID0gKFxuICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgY2xhc3NOYW1lPXtpbnB1dENsYXNzZXMuam9pbignICcpfVxuICAgICAgICAgIHJlZj17cmVmZnVuY31cbiAgICAgICAgICB7Li4uc2VsZWN0UHJvcHN9XG4gICAgICAgID5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBvcHRpb25zLm1hcChvcHRpb24gPT4gKFxuICAgICAgICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgICAgICAga2V5PXtvcHRpb24udmFsdWV9XG4gICAgICAgICAgICAgICAgdmFsdWU9e29wdGlvbi52YWx1ZX1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17b3B0aW9uLnNlbGVjdGVkfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge29wdGlvbi5kaXNwbGF5VmFsdWV9XG4gICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgKSlcbiAgICAgICAgICB9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlICd0ZXh0YXJlYSc6IHtcbiAgICAgIGlucHV0RWxlbWVudCA9ICg8dGV4dGFyZWFcbiAgICAgICAgY2xhc3NOYW1lPXtpbnB1dENsYXNzZXMuam9pbignICcpfVxuICAgICAgICByZWY9e3JlZmZ1bmN9XG4gICAgICAgIHsuLi5vdGhlclByb3BzfVxuICAgICAgLz4pO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgJ2lucHV0JzpcbiAgICBkZWZhdWx0OiB7XG4gICAgICBpbnB1dEVsZW1lbnQgPSAoPGlucHV0XG4gICAgICAgIGNsYXNzTmFtZT17aW5wdXRDbGFzc2VzLmpvaW4oJyAnKX1cbiAgICAgICAgcmVmPXtyZWZmdW5jfVxuICAgICAgICB7Li4ub3RoZXJQcm9wc31cbiAgICAgIC8+KTtcbiAgICB9XG4gIH1cblxuICBpZiAobm9XcmFwcGVyKSB7XG4gICAgcmV0dXJuIGlucHV0RWxlbWVudDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dFwiPlxuICAgICAge1xuICAgICAgICBsYWJlbCAmJlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwibGFiZWxcIj57bGFiZWx9PC9sYWJlbD4gLy8gZXNsaW50LWRpc2FibGUtbGluZSBqc3gtYTExeS9sYWJlbC1oYXMtZm9yXG4gICAgICB9XG4gICAgICB7aW5wdXRFbGVtZW50fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuSW5wdXQuZGVmYXVsdFByb3BzID0ge1xuICByZWZmdW5jOiAoKSA9PiBudWxsLFxuICB2YWxpZDogZmFsc2UsXG4gIHRvdWNoZWQ6IGZhbHNlLFxuICBub1dyYXBwZXI6IGZhbHNlLFxufTtcblxuSW5wdXQucHJvcFR5cGVzID0ge1xuICBpbnB1dFR5cGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wc1xuICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L3JlcXVpcmUtZGVmYXVsdC1wcm9wc1xuICByZWZmdW5jOiBQcm9wVHlwZXMuZnVuYyxcbiAgdmFsaWQ6IFByb3BUeXBlcy5ib29sLFxuICB0b3VjaGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgbm9XcmFwcGVyOiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IElucHV0O1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgaW50ZXJ2YWw6IFByb3BUeXBlcy5udW1iZXIsXG4gIGRvdHM6IFByb3BUeXBlcy5udW1iZXIsXG59O1xuXG5jbGFzcyBMb2FkaW5nRG90cyBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7IGludGVydmFsOiAzMDAsIGRvdHM6IDMgfTtcblxuICBzdGF0ZSA9IHsgZnJhbWU6IDEgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChcbiAgICAgICgpID0+IHRoaXMuc2V0U3RhdGUoeyBmcmFtZTogdGhpcy5zdGF0ZS5mcmFtZSArIDEgfSksXG4gICAgICB0aGlzLnByb3BzLmludGVydmFsLFxuICAgICk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGRvdHMgPSB0aGlzLnN0YXRlLmZyYW1lICUgKHRoaXMucHJvcHMuZG90cyArIDEpO1xuICAgIGNvbnN0IHRleHQgPSAnLicucmVwZWF0KGRvdHMpO1xuXG4gICAgcmV0dXJuIDxzcGFuPnt0ZXh0fTwvc3Bhbj47XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9hZGluZ0RvdHM7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBmb3JtYXRUaW1lc3RhbXAgfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXR0ZXInO1xuXG5jb25zdCBQcmVzZW5jZUl0ZW0gPSAoeyBwcmVzZW5jZSB9KSA9PiB7XG4gIGlmICghcHJlc2VuY2UpIHsgcmV0dXJuOyB9XG5cbiAgLy8gQWxsb3dlZCBmaWVsZHMgOiB1c2VybmFtZSwgcGh4X3JlZiwgb25saW5lX2F0LCBpZCwgY291bnRcbiAgY29uc3QgeyB1c2VybmFtZSwgb25saW5lX2F0LCBjb3VudCB9ID0gcHJlc2VuY2U7XG5cbiAgcmV0dXJuIChcbiAgICA8bGk+XG4gICAgICA8c3Bhbj57Zm9ybWF0VGltZXN0YW1wKG9ubGluZV9hdCl9Jm5ic3A7PC9zcGFuPlxuICAgICAgPHNwYW4+KHtjb3VudH0pJm5ic3A7PC9zcGFuPlxuICAgICAgPHNwYW4+e3VzZXJuYW1lfTwvc3Bhbj5cbiAgICA8L2xpPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUHJlc2VuY2VJdGVtO1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IFByZXNlbmNlSXRlbSBmcm9tICcuL3ByZXNlbmNlX2l0ZW0nO1xuXG5jbGFzcyBQcmVzZW5jZUxpc3QgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcmVzZW5jZXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIXByZXNlbmNlcykgeyByZXR1cm4gPHA+ZW1wdHk8L3A+OyB9XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bD5cbiAgICAgICAge1xuICAgICAgICAgIHByZXNlbmNlcy5tYXAocHJlc2VuY2UgPT5cbiAgICAgICAgICAgIDxQcmVzZW5jZUl0ZW0ga2V5PXtwcmVzZW5jZS5waHhfcmVmfSBwcmVzZW5jZT17cHJlc2VuY2V9IC8+KVxuICAgICAgICB9XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJlc2VuY2VMaXN0O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IFByb3BlcnRpZXMgPSAoe29iamVjdCwgcmVjdXJzaXZlLCBleGNsdWRlfSkgPT4ge1xuICBsZXQgY29sbGVjdG9yID0gW107XG4gIFxuICAvLyBmb3JtYXQgcHJvcGVydHkgYnkgdHlwZW9mXG4gIGNvbnN0IGZvcm1hdFZhbHVlID0gdmFsdWUgPT4ge1xuICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICByZXR1cm4gdmFsdWUgPyBcInRydWVcIiA6IFwiZmFsc2VcIlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgcmV0dXJuIChyZWN1cnNpdmUpID9cbiAgICAgICAgICA8UHJvcGVydGllcyBvYmplY3Q9e3ZhbHVlfSAvPiA6XG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuICBcbiAgLy8gUHVzaCBkdCwgZGQgaW50byBhbiBhcnJheSBiZWZvcmUgcmVuZGVyXG4gIC8vIHRvIGFnZ3JlZ2F0ZSBjb21wb25lbnRzIHdpdG91aHQgYSBtYWluIHJvb3RcbiAgT2JqZWN0LmtleXMob2JqZWN0KVxuICAgIC5mb3JFYWNoKFxuICAgICAgKGtleSkgPT4ge1xuICAgICAgICBpZiAoIWV4Y2x1ZGUuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKDxkdCBrZXk9e2tleX0+e2tleX08L2R0Pik7XG4gICAgICAgICAgY29sbGVjdG9yLnB1c2goXG4gICAgICAgICAgICA8ZGQga2V5PXtgJHtrZXl9LSR7b2JqZWN0W2tleV19YH0+e2Zvcm1hdFZhbHVlKG9iamVjdFtrZXldKX08L2RkPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICBcbiAgY29uc3QgY2xhc3NOYW1lID0gcmVjdXJzaXZlID9cbiAgICAnJyA6XG4gICAgJ2RsLWhvcml6b250YWwnXG4gIFxuICByZXR1cm4gKFxuICAgIDxkbCBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICB7Y29sbGVjdG9yfVxuICAgIDwvZGw+XG4gICk7XG59XG5cblByb3BlcnRpZXMuZGVmYXVsdFByb3BzID0ge1xuICByZWN1cnNpdmU6IGZhbHNlLFxuICBleGNsdWRlOiBbXSxcbn1cblxuXG5Qcm9wZXJ0aWVzLnByb3BUeXBlcyA9IHtcbiAgb2JqZWN0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIHJlY3Vyc2l2ZTogUHJvcFR5cGVzLmJvb2wsXG4gIGV4Y2x1ZGU6IFByb3BUeXBlcy5hcnJheSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvcGVydGllczsiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IEFsZXJ0Qm94IGZyb20gJy4vYWxlcnRfYm94JztcbmltcG9ydCBzY2hlbWEgZnJvbSAnLi4vc2NoZW1hcy9zaWduaW5fc2NoZW1hJztcbmltcG9ydCBGb3JtIGZyb20gJy4vZm9ybSc7XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgZXJyb3JNZXNzYWdlOiBudWxsLFxufTtcblxuY29uc3QgcHJvcFR5cGVzID0ge1xuICBzaWduaW5Vc2VyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjbGVhclNpZ25pbkVycm9yOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBlcnJvck1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5jbGFzcyBTaWduaW5Gb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbiAgc3RhdGljIHByb3BUeXBlcyA9IHByb3BUeXBlcztcblxuICBfaGFuZGxlQ2xpY2sgPSAocGF5bG9hZCkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xuICAgIFxuICAgIHRoaXMucHJvcHMuc2lnbmluVXNlcihwYXlsb2FkKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2hhZG93XG4gICAgY29uc3QgeyBlcnJvck1lc3NhZ2UsIGNsZWFyU2lnbmluRXJyb3IgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPlNpZ24gSW48L2gxPlxuICAgICAgICB7XG4gICAgICAgICAgZXJyb3JNZXNzYWdlICYmXG4gICAgICAgICAgPEFsZXJ0Qm94XG4gICAgICAgICAgICBtb2RlPVwiZGFuZ2VyXCJcbiAgICAgICAgICAgIG1lc3NhZ2U9e2Vycm9yTWVzc2FnZX1cbiAgICAgICAgICAgIG9uQ2xvc2U9e2NsZWFyU2lnbmluRXJyb3J9XG4gICAgICAgICAgLz5cbiAgICAgICAgfVxuICAgICAgICA8Rm9ybVxuICAgICAgICAgIHNjaGVtYT17c2NoZW1hfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX2hhbmRsZUNsaWNrfVxuICAgICAgICAgIGJ1dHRvbkxhYmVsPVwiU2lnbiBJblwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpZ25pbkZvcm07IiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBBbGVydEJveCBmcm9tICcuL2FsZXJ0X2JveCc7XG5pbXBvcnQgc2NoZW1hIGZyb20gJy4uL3NjaGVtYXMvc2lnbnVwX3NjaGVtYSc7XG5pbXBvcnQgRm9ybSBmcm9tICcuL2Zvcm0nO1xuXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XG4gIGVycm9yTWVzc2FnZTogbnVsbCxcbn07XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgc2lnbnVwVXNlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2xlYXJTaWdudXBFcnJvcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZXJyb3JNZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuY2xhc3MgU2lnbnVwRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5cbiAgX2hhbmRsZUNsaWNrID0gKHBheWxvYWQpID0+IHtcbiAgICB0aGlzLnByb3BzLnNpZ251cFVzZXIocGF5bG9hZCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNoYWRvd1xuICAgIGNvbnN0IHsgZXJyb3JNZXNzYWdlLCBjbGVhclNpZ251cEVycm9yIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMT5TaWduIFVwPC9oMT5cbiAgICAgICAge1xuICAgICAgICAgIGVycm9yTWVzc2FnZSAmJlxuICAgICAgICAgIDxBbGVydEJveFxuICAgICAgICAgICAgbW9kZT1cImRhbmdlclwiXG4gICAgICAgICAgICBtZXNzYWdlPXtlcnJvck1lc3NhZ2V9XG4gICAgICAgICAgICBvbkNsb3NlPXtjbGVhclNpZ251cEVycm9yfVxuICAgICAgICAgIC8+XG4gICAgICAgIH1cbiAgICAgICAgPEZvcm1cbiAgICAgICAgICBzY2hlbWE9e3NjaGVtYX1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9oYW5kbGVDbGlja31cbiAgICAgICAgICBidXR0b25MYWJlbD1cIlNpZ24gVXBcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaWdudXBGb3JtOyIsIi8vIENvbmZpZ3VyZSBhcHBsaWNhdGlvbiBlbmRwb2ludFxuXG4vLyBERVZFTE9QTUVOVFxuZXhwb3J0IGNvbnN0IFJPT1RfVVJMID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NDAwMC9hcGkvdjEnO1xuXG4vLyBQUk9EVUNUSU9OXG4vLyBleHBvcnQgY29uc3QgUk9PVF9VUkwgPSAnaHR0cDovL2tzMzAwOTUyLmtpbXN1ZmkuY29tL2FwaS92MSc7XG5cblxuLy8gREVWRUxPUE1FTlRcbmV4cG9ydCBjb25zdCBST09UX1NPQ0tFVCA9ICd3czovL2xvY2FsaG9zdDo0MDAwJztcblxuLy8gUFJPRFVDVElPTlxuLy8gZXhwb3J0IGNvbnN0IFJPT1RfU09DS0VUID0gJ3dzOi8va3MzMDA5NTIua2ltc3VmaS5jb20nOyIsImltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgcmVkdXhUaHVuayBmcm9tICdyZWR1eC10aHVuayc7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tICdyZWR1eC1sb2dnZXInO1xuaW1wb3J0IHsgY29tcG9zZVdpdGhEZXZUb29scyB9IGZyb20gJ3JlZHV4LWRldnRvb2xzLWV4dGVuc2lvbic7XG5cbmltcG9ydCByZWR1eEFwcCBmcm9tICcuL3JlZHVjZXJzJztcbmltcG9ydCBzb2NrZXRNaWRkbGV3YXJlIGZyb20gJy4vbWlkZGxld2FyZXMvc29ja2V0X21pZGRsZXdhcmUnO1xuXG5jb25zdCBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxuY29uc3QgY29uZmlndXJlU3RvcmUgPSAoKSA9PiB7XG4gIGNvbnN0IG1pZGRsZXdhcmVzID0gW1xuICAgIHJlZHV4VGh1bmssXG4gICAgc29ja2V0TWlkZGxld2FyZSxcbiAgXTtcblxuICBpZiAoX19ERVZfXykge1xuICAgIG1pZGRsZXdhcmVzLnB1c2goY3JlYXRlTG9nZ2VyKHtjb2xsYXBzZWQ6IHRydWUsIGRpZmY6IHRydWV9KSk7XG4gIH1cblxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxuICAgIHJlZHV4QXBwLFxuICAgIF9fREVWX19cbiAgICAgID8gY29tcG9zZVdpdGhEZXZUb29scyhhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZXMpKVxuICAgICAgOiBhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZXMpLFxuICApO1xuXG4gIHJldHVybiBzdG9yZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ3VyZVN0b3JlOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCAnLi9hcHAuY3NzJztcbmltcG9ydCBBdXRoU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL2F1dGhfc2VydmljZSc7XG5pbXBvcnQgeyBcbiAgYXV0aGVudGljYXRlRnJvbVRva2VuLCBcbiAgcmVmcmVzaFRva2VuLCBcbn0gZnJvbSAnLi9hY3Rpb25zL2F1dGhlbnRpY2F0aW9uX2FjdGlvbnMnO1xuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vY29uZmlndXJlX3N0b3JlJztcbmltcG9ydCBBcHAgZnJvbSAnLi92aWV3cy9hcHBfdmlldy5qcydcblxuY29uc3Qgc3RvcmUgPSBjb25maWd1cmVTdG9yZSgpO1xuXG4vLyBSRUxPQUQgU1RBVEUgRlJPTSBUT0tFTlxuaWYgKEF1dGhTZXJ2aWNlLmlzTG9nZ2VkSW4oKSkge1xuICAvLyBUaGlzIHdpbGwgc3luYyBhdXRoZW50aWNhdGVkIGZsYWcgb24gcmVsb2FkXG4gIC8vIHRvIGF2b2lkIGF1dGhlbnRpY2F0aW9uX2hvYyB0byBjaGFuZ2UgcGF0aCBiZWZvcmVcbiAgLy8gdHJ5aW5nIHRvIHJlZnJlc2ggdG9rZW4hXG4gIHN0b3JlLmRpc3BhdGNoKGF1dGhlbnRpY2F0ZUZyb21Ub2tlbigpKTtcblxuICAvLyBBc3luYyByZWxvYWQgb2YgY3VycmVudCB1c2VyIGJ5IHJlZnJlc2hpbmcgdG9rZW5cbiAgcmVmcmVzaFRva2VuKCkoc3RvcmUuZGlzcGF0Y2gpO1xufVxuLy8gRU5EIFJFTE9BRCBTVEFURSBGUk9NIFRPS0VOXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuY29uc3QgYXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpO1xucmVuZGVyKFxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICA8QXBwIC8+XG4gIDwvUHJvdmlkZXI+LFxuICBhcHAsXG4pO1xuIiwiaW1wb3J0IHsgUHJlc2VuY2UgfSBmcm9tICdwaG9lbml4JztcblxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vYWN0aW9ucy9hY3Rpb25fdHlwZXMnO1xuXG5sZXQgcHJlc2VuY2VzID0ge307XG5cbmNvbnN0IHNldEdhbWVDaGFubmVsID0gKGRpc3BhdGNoLCBzb2NrZXQsIHRvcGljKSA9PiB7XG4gIGNvbnN0IGNoYW5uZWwgPSBzb2NrZXQuY2hhbm5lbCh0b3BpYywge30pO1xuICBcbiAgLy8gY29uc3QgcHJlc2VuY2UgPSBuZXcgUHJlc2VuY2UoY2hhbm5lbCk7XG4gIFxuICBjb25zdCBsaXN0QnkgPSAoaWQsIHsgbWV0YXM6IFtmaXJzdCwgLi4ucmVzdF0gfSkgPT5cbiAgICBPYmplY3QuYXNzaWduKHt9LCBmaXJzdCwgeyBpZCwgY291bnQ6IHJlc3QubGVuZ3RoICsgMSB9KTtcblxuICBjb25zdCByZW5kZXIgPSBwcmVzZW5jZXMgPT4gKFByZXNlbmNlLmxpc3QocHJlc2VuY2VzLCBsaXN0QnkpKTtcblxuICAvLyAvLyBQcmVzZW5jZXNcbiAgLy8gcHJlc2VuY2VPblN5bmMoKCkgPT4ge1xuICAvLyAgIGNvbnN0IHByZXNlbmNlcyA9IHByZXNlbmNlLmxpc3QobGlzdEJ5KTtcbiAgLy8gICByZXR1cm4gZGlzcGF0Y2goe1xuICAvLyAgICAgdHlwZTogdHlwZXMuRElTUEFUQ0hfUFJFU0VOQ0VfU1RBVEUsXG4gIC8vICAgICBwYXlsb2FkOiB7IHRvcGljLCBwcmVzZW5jZXMgfSxcbiAgLy8gICB9KTtcbiAgLy8gfSk7XG5cbiAgLy8gUHJlc2VuY2VzXG4gIGNoYW5uZWwub24oJ3ByZXNlbmNlX3N0YXRlJywgKHBheWxvYWQpID0+IHtcbiAgICBwcmVzZW5jZXMgPSBQcmVzZW5jZS5zeW5jU3RhdGUocHJlc2VuY2VzLCBwYXlsb2FkKTtcbiAgICByZXR1cm4gZGlzcGF0Y2goe1xuICAgICAgdHlwZTogdHlwZXMuRElTUEFUQ0hfUFJFU0VOQ0VfU1RBVEUsXG4gICAgICBwYXlsb2FkOiB7IHRvcGljLCBwcmVzZW5jZXM6IHJlbmRlcihwcmVzZW5jZXMpIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIGNoYW5uZWwub24oJ3ByZXNlbmNlX2RpZmYnLCAocGF5bG9hZCkgPT4ge1xuICAgIHByZXNlbmNlcyA9IFByZXNlbmNlLnN5bmNEaWZmKHByZXNlbmNlcywgcGF5bG9hZCk7XG4gICAgcmV0dXJuIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IHR5cGVzLkRJU1BBVENIX1BSRVNFTkNFX0RJRkYsXG4gICAgICBwYXlsb2FkOiB7IHRvcGljLCBwcmVzZW5jZXM6IHJlbmRlcihwcmVzZW5jZXMpIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIEdhbWVcbiAgY2hhbm5lbC5vbigndXBkYXRlX2dhbWVfc3RhdGUnLCBwYXlsb2FkID0+XG4gICAgZGlzcGF0Y2goeyB0eXBlOiB0eXBlcy5VUERBVEVfR0FNRV9TVEFURSwgcGF5bG9hZCB9KSk7XG5cbiAgY2hhbm5lbC5vbigndXBkYXRlX2dhbWVfaW5mbycsIHBheWxvYWQgPT5cbiAgICBkaXNwYXRjaCh7IHR5cGU6IHR5cGVzLlVQREFURV9HQU1FX0lORk8sIHBheWxvYWQgfSkpO1xuXG4gIGNoYW5uZWwub24oJ2dhbWVfZm9yY2VfcXVpdCcsIHBheWxvYWQgPT5cbiAgICBkaXNwYXRjaCh7IHR5cGU6IHR5cGVzLkdBTUVfRk9SQ0VfUVVJVCwgcGF5bG9hZCB9KSk7XG5cbiAgLy8gQ2hhdCByb29tXG4gIGNoYW5uZWwub24oJ21lc3NhZ2VzX3JlY2VpdmVkJywgcGF5bG9hZCA9PiBcbiAgICBkaXNwYXRjaCh7dHlwZTogdHlwZXMuTUVTU0FHRVNfUkVDRUlWRUQsIHBheWxvYWR9KVxuICApO1xuICBcbiAgY2hhbm5lbC5vbignbWVzc2FnZV9jcmVhdGVkJywgcGF5bG9hZCA9PiBcbiAgICBkaXNwYXRjaCh7dHlwZTogdHlwZXMuTUVTU0FHRV9DUkVBVEVELCBwYXlsb2FkfSlcbiAgKTtcblxuICAvLyBKb2luXG4gIGlmIChjaGFubmVsLnN0YXRlICE9PSAnam9pbmVkJykge1xuICAgIGNoYW5uZWwuam9pbigpXG4gICAgICAucmVjZWl2ZSgnb2snLCAoKSA9PlxuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IHR5cGVzLkNIQU5ORUxfQ09OTkVDVEVELCBwYXlsb2FkOiB7IHRvcGljIH0gfSkpXG4gICAgICAucmVjZWl2ZSgnZXJyb3InLCBwYXlsb2FkID0+XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuQ09OTkVDVF9DSEFOTkVMX0VSUk9SLCBwYXlsb2FkOiB7IHRvcGljLCBlcnJvcjogcGF5bG9hZCB9IH0pKVxuICAgICAgLnJlY2VpdmUoJ3RpbWVvdXQnLCAoKSA9PlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZygnTmV0d29ya2luZyBpc3N1ZS4gU3RpbGwgd2FpdGluZy4uLicpKTtcbiAgfVxuXG4gIGNoYW5uZWwub25FcnJvcigoKSA9PiBcbiAgICBkaXNwYXRjaCh7IFxuICAgICAgdHlwZTogdHlwZXMuQ0hBTk5FTF9FUlJPUiwgXG4gICAgICBwYXlsb2FkOiB7IHRvcGljLCBlcnJvcjogJ3RoZXJlIHdhcyBhbiBlcnJvciEnIH0gXG4gICAgfSlcbiAgKTtcbiAgY2hhbm5lbC5vbkNsb3NlKCgpID0+IFxuICAgIGRpc3BhdGNoKHsgXG4gICAgICB0eXBlOiB0eXBlcy5DSEFOTkVMX0NMT1NFRCwgXG4gICAgICBwYXlsb2FkOiB7IHRvcGljLCBlcnJvcjogJ3RoZSBjaGFubmVsIGhhcyBnb25lIGF3YXkgZ3JhY2VmdWxseScgfSBcbiAgICB9KVxuICApO1xuXG4gIHJldHVybiBjaGFubmVsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2V0R2FtZUNoYW5uZWw7XG4iLCJpbXBvcnQgeyBQcmVzZW5jZSB9IGZyb20gJ3Bob2VuaXgnO1xuXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi9hY3Rpb25zL2FjdGlvbl90eXBlcyc7XG5cbmxldCBwcmVzZW5jZXMgPSB7fTtcblxuY29uc3Qgc2V0TG9iYnlDaGFubmVsID0gKGRpc3BhdGNoLCBzb2NrZXQpID0+IHtcbiAgY29uc3QgdG9waWMgPSAnbG9iYnknO1xuICBjb25zdCBjaGFubmVsID0gc29ja2V0LmNoYW5uZWwodG9waWMsIHt9KTtcblxuICAvLyBjb25zdCBwcmVzZW5jZSA9IG5ldyBQcmVzZW5jZShjaGFubmVsKTtcblxuICBjb25zdCBsaXN0QnkgPSAoaWQsIHsgbWV0YXM6IFtmaXJzdCwgLi4ucmVzdF0gfSkgPT5cbiAgICBPYmplY3QuYXNzaWduKHt9LCBmaXJzdCwgeyBpZCwgY291bnQ6IHJlc3QubGVuZ3RoICsgMSB9KTtcblxuICBjb25zdCByZW5kZXIgPSBwcmVzZW5jZXMgPT4gKFByZXNlbmNlLmxpc3QocHJlc2VuY2VzLCBsaXN0QnkpKTtcblxuICAvLyAvLyBQcmVzZW5jZXNcbiAgLy8gcHJlc2VuY2VPblN5bmMoKCkgPT4ge1xuICAvLyAgIGNvbnN0IHByZXNlbmNlcyA9IHByZXNlbmNlLmxpc3QobGlzdEJ5KTtcbiAgLy8gICByZXR1cm4gZGlzcGF0Y2goe1xuICAvLyAgICAgdHlwZTogdHlwZXMuRElTUEFUQ0hfUFJFU0VOQ0VfU1RBVEUsXG4gIC8vICAgICBwYXlsb2FkOiB7IHRvcGljLCBwcmVzZW5jZXMgfSxcbiAgLy8gICB9KTtcbiAgLy8gfSk7XG5cbiAgLy8gUHJlc2VuY2VzXG4gIGNoYW5uZWwub24oJ3ByZXNlbmNlX3N0YXRlJywgKHBheWxvYWQpID0+IHtcbiAgICBwcmVzZW5jZXMgPSBQcmVzZW5jZS5zeW5jU3RhdGUocHJlc2VuY2VzLCBwYXlsb2FkKTtcbiAgICByZXR1cm4gZGlzcGF0Y2goe1xuICAgICAgdHlwZTogdHlwZXMuRElTUEFUQ0hfUFJFU0VOQ0VfU1RBVEUsXG4gICAgICBwYXlsb2FkOiB7IHRvcGljLCBwcmVzZW5jZXM6IHJlbmRlcihwcmVzZW5jZXMpIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIGNoYW5uZWwub24oJ3ByZXNlbmNlX2RpZmYnLCAocGF5bG9hZCkgPT4ge1xuICAgIHByZXNlbmNlcyA9IFByZXNlbmNlLnN5bmNEaWZmKHByZXNlbmNlcywgcGF5bG9hZCk7XG4gICAgcmV0dXJuIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IHR5cGVzLkRJU1BBVENIX1BSRVNFTkNFX0RJRkYsXG4gICAgICBwYXlsb2FkOiB7IHRvcGljLCBwcmVzZW5jZXM6IHJlbmRlcihwcmVzZW5jZXMpIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIFJlcXVlc3RcbiAgY2hhbm5lbC5vbigncmVxdWVzdHNfcmVjZWl2ZWQnLCBwYXlsb2FkID0+XG4gICAgZGlzcGF0Y2goeyB0eXBlOiB0eXBlcy5SRVFVRVNUU19SRUNFSVZFRCwgcGF5bG9hZCB9KSk7XG5cbiAgY2hhbm5lbC5vbigncmVxdWVzdF9jcmVhdGVkJywgcGF5bG9hZCA9PlxuICAgIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuUkVRVUVTVF9DUkVBVEVELCBwYXlsb2FkIH0pKTtcblxuICBjaGFubmVsLm9uKCdyZXF1ZXN0X2NyZWF0ZWRfZXJyb3InLCBwYXlsb2FkID0+XG4gICAgZGlzcGF0Y2goeyB0eXBlOiB0eXBlcy5SRVFVRVNUX0NSRUFURURfRVJST1IsIHBheWxvYWQgfSkpO1xuXG4gIGNoYW5uZWwub24oJ3JlcXVlc3RfY2FuY2VsbGVkJywgcGF5bG9hZCA9PlxuICAgIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuUkVRVUVTVF9DQU5DRUxMRUQsIHBheWxvYWQgfSkpO1xuXG4gIGNoYW5uZWwub24oJ3JlcXVlc3RfY2FuY2VsbGVkX2Vycm9yJywgcGF5bG9hZCA9PlxuICAgIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuUkVRVUVTVF9DQU5DRUxMRURfRVJST1IsIHBheWxvYWQgfSkpO1xuXG4gIGNoYW5uZWwub24oJ3JlcXVlc3RfYWNjZXB0ZWQnLCBwYXlsb2FkID0+XG4gICAgZGlzcGF0Y2goeyB0eXBlOiB0eXBlcy5SRVFVRVNUX0FDQ0VQVEVELCBwYXlsb2FkIH0pKTtcblxuICBjaGFubmVsLm9uKCdyZXF1ZXN0X2FjY2VwdGVkX2Vycm9yJywgcGF5bG9hZCA9PlxuICAgIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuUkVRVUVTVF9BQ0NFUFRFRF9FUlJPUiwgcGF5bG9hZCB9KSk7XG5cbiAgY2hhbm5lbC5vbignZ2FtZXNfcmVjZWl2ZWQnLCBwYXlsb2FkID0+XG4gICAgZGlzcGF0Y2goeyB0eXBlOiB0eXBlcy5HQU1FU19SRUNFSVZFRCwgcGF5bG9hZCB9KSk7XG5cbiAgY2hhbm5lbC5vbignZ2FtZV9hZGRlZCcsIHBheWxvYWQgPT5cbiAgICBkaXNwYXRjaCh7IHR5cGU6IHR5cGVzLkdBTUVfQURERUQsIHBheWxvYWQgfSkpO1xuXG4gIGNoYW5uZWwub24oJ2dhbWVfcmVtb3ZlZCcsIHBheWxvYWQgPT5cbiAgICBkaXNwYXRjaCh7IHR5cGU6IHR5cGVzLkdBTUVfUkVNT1ZFRCwgcGF5bG9hZCB9KSk7XG5cbiAgLy8gSm9pblxuICBpZiAoY2hhbm5lbC5zdGF0ZSAhPT0gJ2pvaW5lZCcpIHtcbiAgICBjaGFubmVsLmpvaW4oKVxuICAgICAgLnJlY2VpdmUoJ29rJywgKCkgPT5cbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiB0eXBlcy5DSEFOTkVMX0NPTk5FQ1RFRCwgcGF5bG9hZDogeyB0b3BpYyB9IH0pKVxuICAgICAgLnJlY2VpdmUoJ2Vycm9yJywgcGF5bG9hZCA9PlxuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IHR5cGVzLkNPTk5FQ1RfQ0hBTk5FTF9FUlJPUiwgcGF5bG9hZDogeyB0b3BpYywgZXJyb3I6IHBheWxvYWQgfSB9KSlcbiAgICAgIC5yZWNlaXZlKCd0aW1lb3V0JywgKCkgPT5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5sb2coJ05ldHdvcmtpbmcgaXNzdWUuIFN0aWxsIHdhaXRpbmcuLi4nKSk7XG4gIH1cblxuICBjaGFubmVsLm9uRXJyb3IoKCkgPT4gXG4gICAgZGlzcGF0Y2goeyBcbiAgICAgIHR5cGU6IHR5cGVzLkNIQU5ORUxfRVJST1IsIFxuICAgICAgcGF5bG9hZDogeyB0b3BpYywgZXJyb3I6ICd0aGVyZSB3YXMgYW4gZXJyb3IhJyB9IFxuICAgIH0pXG4gICk7XG4gIGNoYW5uZWwub25DbG9zZSgoKSA9PiBcbiAgICBkaXNwYXRjaCh7IFxuICAgICAgdHlwZTogdHlwZXMuQ0hBTk5FTF9DTE9TRUQsIFxuICAgICAgcGF5bG9hZDogeyB0b3BpYywgZXJyb3I6ICd0aGUgY2hhbm5lbCBoYXMgZ29uZSBhd2F5IGdyYWNlZnVsbHknIH0gXG4gICAgfSlcbiAgKTtcblxuICByZXR1cm4gY2hhbm5lbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNldExvYmJ5Q2hhbm5lbDtcbiIsImltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3Bob2VuaXgnO1xuXG5pbXBvcnQgQXV0aFNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvYXV0aF9zZXJ2aWNlJztcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL2FjdGlvbnMvYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IFJPT1RfU09DS0VUIH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZyc7XG5cbmxldCBzb2NrZXQ7XG5cbmNvbnN0IHNvY2tldE9wdGlvbnMgPSB0b2tlbiA9PiAoe1xuICBwYXJhbXM6IHsgdG9rZW4gfSxcbiAgbG9nZ2VyOiAoa2luZCwgbXNnLCBkYXRhKSA9PiAoXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyhgJHtraW5kfTogJHttc2d9YCwgZGF0YSlcbiAgKSxcbn0pO1xuXG5leHBvcnQgY29uc3Qgc2V0U29ja2V0ID0gKGRpc3BhdGNoKSA9PiB7XG4gIGlmIChzb2NrZXQpIHsgcmV0dXJuIHNvY2tldDsgfVxuXG4gIGNvbnN0IHRva2VuID0gQXV0aFNlcnZpY2UubG9hZFRva2VuKCk7XG5cbiAgc29ja2V0ID0gbmV3IFNvY2tldChgJHtST09UX1NPQ0tFVH0vc29ja2V0YCwgc29ja2V0T3B0aW9ucyh0b2tlbikpO1xuXG4gIHNvY2tldC5jb25uZWN0KCk7XG4gIHNvY2tldC5vbkVycm9yKCgpID0+IGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuU09DS0VUX0VSUk9SLCBwYXlsb2FkOiBudWxsIH0pKTtcbiAgc29ja2V0Lm9uQ2xvc2UoKCkgPT4gZGlzcGF0Y2goeyB0eXBlOiB0eXBlcy5TT0NLRVRfQ0xPU0VELCBwYXlsb2FkOiBudWxsIH0pKTtcblxuICBkaXNwYXRjaCh7IHR5cGU6IHR5cGVzLlNPQ0tFVF9DT05ORUNURUQsIHBheWxvYWQ6IG51bGwgfSk7XG5cbiAgcmV0dXJuIHNvY2tldDtcbn07XG5cbmV4cG9ydCBjb25zdCBjbG9zZVNvY2tldCA9IChkaXNwYXRjaCkgPT4ge1xuICBpZiAoc29ja2V0KSB7XG4gICAgdHJ5IHtcbiAgICAgIHNvY2tldC5kaXNjb25uZWN0KCk7XG4gICAgICBzb2NrZXQgPSBudWxsO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxuXG4gICAgZGlzcGF0Y2goeyB0eXBlOiB0eXBlcy5TT0NLRVRfRElTQ09OTkVDVEVELCBwYXlsb2FkOiBudWxsIH0pO1xuICB9XG4gIHJldHVybiBzb2NrZXQ7XG59O1xuIiwiaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vYWN0aW9ucy9hY3Rpb25fdHlwZXMnO1xuXG5jb25zdCBzZXRTeXN0ZW1DaGFubmVsID0gKGRpc3BhdGNoLCBzb2NrZXQpID0+IHtcbiAgY29uc3QgdG9waWMgPSAnc3lzdGVtJztcbiAgY29uc3QgY2hhbm5lbCA9IHNvY2tldC5jaGFubmVsKHRvcGljLCB7fSk7XG5cbiAgLy8gQ29udHJvbCBhbmQgTGFnIGVzdGltYXRpb25cbiAgY2hhbm5lbC5vbigncGluZycsIChwYXlsb2FkKSA9PiB7IGNoYW5uZWwucHVzaCgncG9uZycsIHBheWxvYWQpOyB9KTtcblxuICAvLyBKb2luXG4gIGlmIChjaGFubmVsLnN0YXRlICE9PSAnam9pbmVkJykge1xuICAgIGNoYW5uZWwuam9pbigpXG4gICAgICAucmVjZWl2ZSgnb2snLCAoKSA9PlxuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IHR5cGVzLkNIQU5ORUxfQ09OTkVDVEVELCBwYXlsb2FkOiB7IHRvcGljIH0gfSkpXG4gICAgICAucmVjZWl2ZSgnZXJyb3InLCBwYXlsb2FkID0+XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuQ09OTkVDVF9DSEFOTkVMX0VSUk9SLCBwYXlsb2FkOiB7IHRvcGljLCBlcnJvcjogcGF5bG9hZCB9IH0pKVxuICAgICAgLnJlY2VpdmUoJ3RpbWVvdXQnLCAoKSA9PlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZygnTmV0d29ya2luZyBpc3N1ZS4gU3RpbGwgd2FpdGluZy4uLicpKTtcbiAgfVxuXG4gIGNoYW5uZWwub25FcnJvcigoKSA9PiBcbiAgICBkaXNwYXRjaCh7IFxuICAgICAgdHlwZTogdHlwZXMuQ0hBTk5FTF9FUlJPUiwgXG4gICAgICBwYXlsb2FkOiB7IHRvcGljLCBlcnJvcjogJ3RoZXJlIHdhcyBhbiBlcnJvciEnIH0gXG4gICAgfSlcbiAgKTtcbiAgY2hhbm5lbC5vbkNsb3NlKCgpID0+IFxuICAgIGRpc3BhdGNoKHsgXG4gICAgICB0eXBlOiB0eXBlcy5DSEFOTkVMX0NMT1NFRCwgXG4gICAgICBwYXlsb2FkOiB7IHRvcGljLCBlcnJvcjogJ3RoZSBjaGFubmVsIGhhcyBnb25lIGF3YXkgZ3JhY2VmdWxseScgfSBcbiAgICB9KVxuICApO1xuXG4gIHJldHVybiBjaGFubmVsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2V0U3lzdGVtQ2hhbm5lbDtcbiIsImltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL2FjdGlvbnMvYWN0aW9uX3R5cGVzJztcblxuY29uc3Qgc2V0VXNlckNoYW5uZWwgPSAoZGlzcGF0Y2gsIHNvY2tldCwgdG9waWMpID0+IHtcbiAgY29uc3QgY2hhbm5lbCA9IHNvY2tldC5jaGFubmVsKHRvcGljLCB7fSk7XG5cbiAgY2hhbm5lbC5vbignam9pbl9nYW1lJywgcGF5bG9hZCA9PlxuICAgIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuSk9JTl9HQU1FLCBwYXlsb2FkIH0pKTtcblxuICAvLyBKb2luXG4gIGlmIChjaGFubmVsLnN0YXRlICE9PSAnam9pbmVkJykge1xuICAgIGNoYW5uZWwuam9pbigpXG4gICAgICAucmVjZWl2ZSgnb2snLCAoKSA9PlxuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IHR5cGVzLkNIQU5ORUxfQ09OTkVDVEVELCBwYXlsb2FkOiB7IHRvcGljIH0gfSkpXG4gICAgICAucmVjZWl2ZSgnZXJyb3InLCBwYXlsb2FkID0+XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogdHlwZXMuQ09OTkVDVF9DSEFOTkVMX0VSUk9SLCBwYXlsb2FkOiB7IHRvcGljLCBlcnJvcjogcGF5bG9hZCB9IH0pKVxuICAgICAgLnJlY2VpdmUoJ3RpbWVvdXQnLCAoKSA9PlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZygnTmV0d29ya2luZyBpc3N1ZS4gU3RpbGwgd2FpdGluZy4uLicpKTtcbiAgfVxuXG4gIGNoYW5uZWwub25FcnJvcigoKSA9PiBcbiAgICBkaXNwYXRjaCh7IFxuICAgICAgdHlwZTogdHlwZXMuQ0hBTk5FTF9FUlJPUiwgXG4gICAgICBwYXlsb2FkOiB7IHRvcGljLCBlcnJvcjogJ3RoZXJlIHdhcyBhbiBlcnJvciEnIH0gXG4gICAgfSlcbiAgKTtcbiAgY2hhbm5lbC5vbkNsb3NlKCgpID0+IFxuICAgIGRpc3BhdGNoKHsgXG4gICAgICB0eXBlOiB0eXBlcy5DSEFOTkVMX0NMT1NFRCwgXG4gICAgICBwYXlsb2FkOiB7IHRvcGljLCBlcnJvcjogJ3RoZSBjaGFubmVsIGhhcyBnb25lIGF3YXkgZ3JhY2VmdWxseScgfSBcbiAgICB9KVxuICApO1xuXG4gIHJldHVybiBjaGFubmVsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2V0VXNlckNoYW5uZWw7XG4iLCJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi9hY3Rpb25zL2FjdGlvbl90eXBlcyc7XG5cbmltcG9ydCB7IHNldFNvY2tldCwgY2xvc2VTb2NrZXQgfSBmcm9tICcuL3NldF9zb2NrZXQnO1xuXG5pbXBvcnQgc2V0U3lzdGVtQ2hhbm5lbCBmcm9tICcuL3NldF9zeXN0ZW1fY2hhbm5lbCc7XG5pbXBvcnQgc2V0TG9iYnlDaGFubmVsIGZyb20gJy4vc2V0X2xvYmJ5X2NoYW5uZWwnO1xuaW1wb3J0IHNldFVzZXJDaGFubmVsIGZyb20gJy4vc2V0X3VzZXJfY2hhbm5lbCc7XG5pbXBvcnQgc2V0R2FtZUNoYW5uZWwgZnJvbSAnLi9zZXRfZ2FtZV9jaGFubmVsJztcblxubGV0IHNvY2tldDtcbmxldCBjaGFubmVsO1xuY29uc3QgY2hhbm5lbHMgPSB7fTtcblxuY29uc3Qgc29ja2V0TWlkZGxld2FyZSA9IHN0b3JlID0+IG5leHQgPT4gKGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgLy8gU09DS0VUXG4gICAgY2FzZSB0eXBlcy5PUEVOX1NPQ0tFVDoge1xuICAgICAgc29ja2V0ID0gc2V0U29ja2V0KHN0b3JlLmRpc3BhdGNoKTtcbiAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgfVxuXG4gICAgY2FzZSB0eXBlcy5DTE9TRV9TT0NLRVQ6IHtcbiAgICAgIGlmIChzb2NrZXQpIHsgc29ja2V0ID0gY2xvc2VTb2NrZXQoc3RvcmUuZGlzcGF0Y2gpOyB9XG4gICAgICByZXR1cm4gbmV4dChhY3Rpb24pO1xuICAgIH1cblxuICAgIC8vIENIQU5ORUxTXG4gICAgY2FzZSB0eXBlcy5KT0lOX0NIQU5ORUw6IHtcbiAgICAgIHNvY2tldCA9IHNldFNvY2tldChzdG9yZS5kaXNwYXRjaCk7XG4gICAgICBjb25zdCB0b3BpY1ByZWZpeCA9IGFjdGlvbi50b3BpYy5zcGxpdCgnOicpWzBdO1xuXG4gICAgICBzd2l0Y2ggKHRvcGljUHJlZml4KSB7XG4gICAgICAgIGNhc2UgJ3N5c3RlbSc6XG4gICAgICAgICAgY2hhbm5lbHNbYWN0aW9uLnRvcGljXSA9XG4gICAgICAgICAgICBzZXRTeXN0ZW1DaGFubmVsKHN0b3JlLmRpc3BhdGNoLCBzb2NrZXQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdsb2JieSc6XG4gICAgICAgICAgY2hhbm5lbHNbYWN0aW9uLnRvcGljXSA9XG4gICAgICAgICAgICBzZXRMb2JieUNoYW5uZWwoc3RvcmUuZGlzcGF0Y2gsIHNvY2tldCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3VzZXInOlxuICAgICAgICAgIGNoYW5uZWxzW2FjdGlvbi50b3BpY10gPVxuICAgICAgICAgICAgc2V0VXNlckNoYW5uZWwoc3RvcmUuZGlzcGF0Y2gsIHNvY2tldCwgYWN0aW9uLnRvcGljKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZ2FtZSc6XG4gICAgICAgICAgY2hhbm5lbHNbYWN0aW9uLnRvcGljXSA9XG4gICAgICAgICAgICBzZXRHYW1lQ2hhbm5lbChzdG9yZS5kaXNwYXRjaCwgc29ja2V0LCBhY3Rpb24udG9waWMpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5sb2coYFVua25vd24gdG9waWMgOiAke2FjdGlvbi50b3BpY31gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgfVxuXG4gICAgY2FzZSB0eXBlcy5MRUFWRV9DSEFOTkVMOiB7XG4gICAgICBjaGFubmVsID0gY2hhbm5lbHNbYWN0aW9uLnRvcGljXTtcbiAgICAgIGlmIChjaGFubmVsKSB7XG4gICAgICAgIGlmIChjaGFubmVsLnN0YXRlID09PSAnam9pbmVkJykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjaGFubmVsLmxlYXZlKCk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2hhbm5lbCA9IG51bGw7XG4gICAgICB9XG4gICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IHR5cGVzLkNIQU5ORUxfRElTQ09OTkVDVEVELFxuICAgICAgICBwYXlsb2FkOiB7IHRvcGljOiBhY3Rpb24udG9waWMgfSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICB9XG5cbiAgICBjYXNlIHR5cGVzLlNFTkRfQ09NTUFORDoge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGBTRU5EIENPTU1BTkQgLT4gVG9waWMgOiAke2FjdGlvbi50b3BpY30sIGAgK1xuICAgICAgICAgIGBDb21tYW5kIDogJHthY3Rpb24uY29tbWFuZH0sIFBheWxvYWQgOiAke2FjdGlvbi5wYXlsb2FkfWA7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG5cbiAgICAgIGNoYW5uZWwgPSBjaGFubmVsc1thY3Rpb24udG9waWNdO1xuICAgICAgaWYgKCEhY2hhbm5lbCkge1xuICAgICAgICBjaGFubmVsLnB1c2goYWN0aW9uLmNvbW1hbmQsIGFjdGlvbi5wYXlsb2FkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgfVxuXG4gICAgLy8gREVGQVVMVFxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbmV4dChhY3Rpb24pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzb2NrZXRNaWRkbGV3YXJlO1xuIiwiaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vLi4vYWN0aW9ucy9hY3Rpb25fdHlwZXMnO1xuXG5pbXBvcnQgaW5pdGlhbFN0YXRlIGZyb20gJy4uL2luaXRpYWxfc3RhdGUnO1xuXG5jb25zdCBib290dXBUaW1lID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLmFwcGxpY2F0aW9uLmJvb3R1cFRpbWUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSB0eXBlcy5BUFBfQk9PVFVQOlxuICAgICAgcmV0dXJuIGFjdGlvbi5wYXlsb2FkO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGJvb3R1cFRpbWU7IiwiaW1wb3J0IGluaXRpYWxTdGF0ZSBmcm9tICcuLi9pbml0aWFsX3N0YXRlJztcblxuY29uc3QgaXNGZXRjaGluZyA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZS5hcHBsaWNhdGlvbi5pc0ZldGNoaW5nLCBhY3Rpb24pID0+IHtcbiAgaWYgKGFjdGlvbi50eXBlLm1hdGNoKC9fUkVRVUVTVCQvKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKGFjdGlvbi50eXBlLm1hdGNoKC9fU1VDQ0VTUyQvKSB8fCBhY3Rpb24udHlwZS5tYXRjaCgvX0VSUk9SJC8pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBzdGF0ZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGlzRmV0Y2hpbmc7XG4iLCJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi8uLi9hY3Rpb25zL2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgaW5pdGlhbFN0YXRlIGZyb20gJy4uL2luaXRpYWxfc3RhdGUnO1xuXG5jb25zdCBpbml0aWFsU3RhdHVzID0gaW5pdGlhbFN0YXRlLmFwcGxpY2F0aW9uLnNvY2tldFN0YXR1cztcblxuY29uc3Qgc29ja2V0U3RhdHVzID0gKHN0YXRlID0gaW5pdGlhbFN0YXR1cywgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAvLyBXaGVuIGEgc29ja2V0IGNsb3NlIGFuZCByZWNvbm5lY3RcbiAgICAvLyBzZXQgc29ja2V0IHN0YXR1cyBhbHNvIHdoZW4gY2hhbm5lbHMgcmVjb29uZWN0XG4gICAgY2FzZSB0eXBlcy5DSEFOTkVMX0NPTk5FQ1RFRDpcbiAgICBjYXNlIHR5cGVzLlNPQ0tFVF9DT05ORUNURUQ6XG4gICAgICByZXR1cm4gJ2Nvbm5lY3RlZCc7XG4gICAgY2FzZSB0eXBlcy5TT0NLRVRfRElTQ09OTkVDVEVEOlxuICAgICAgcmV0dXJuICdkaXNjb25uZWN0ZWQnO1xuICAgIGNhc2UgdHlwZXMuU09DS0VUX0VSUk9SOlxuICAgICAgcmV0dXJuICdlcnJvcic7XG4gICAgY2FzZSB0eXBlcy5TT0NLRVRfQ0xPU0VEOlxuICAgICAgcmV0dXJuICdjbG9zZWQnO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNvY2tldFN0YXR1cztcbiIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBib290dXBUaW1lIGZyb20gJy4vYXBwbGljYXRpb24vYm9vdHVwX3RpbWVfcmVkdWNlcic7XG5pbXBvcnQgaXNGZXRjaGluZyBmcm9tICcuL2FwcGxpY2F0aW9uL2lzX2ZldGNoaW5nX3JlZHVjZXInO1xuaW1wb3J0IHNvY2tldFN0YXR1cyBmcm9tICcuL2FwcGxpY2F0aW9uL3NvY2tldF9zdGF0dXNfcmVkdWNlcic7XG5cbmNvbnN0IGFwcGxpY2F0aW9uID0gY29tYmluZVJlZHVjZXJzKHtcbiAgYm9vdHVwVGltZSxcbiAgaXNGZXRjaGluZyxcbiAgc29ja2V0U3RhdHVzLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFwcGxpY2F0aW9uO1xuIiwiaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vLi4vYWN0aW9ucy9hY3Rpb25fdHlwZXMnO1xuXG5pbXBvcnQgaW5pdGlhbFN0YXRlIGZyb20gJy4uL2luaXRpYWxfc3RhdGUnO1xuXG5jb25zdCBpbml0aWFsVXNlciA9IGluaXRpYWxTdGF0ZS5hdXRoZW50aWNhdGlvbi5jdXJyZW50VXNlcjtcblxuY29uc3QgY3VycmVudFVzZXIgPSAoc3RhdGUgPSBpbml0aWFsVXNlciwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIHR5cGVzLlNJR05VUF9VU0VSX1NVQ0NFU1M6XG4gICAgY2FzZSB0eXBlcy5TSUdOSU5fVVNFUl9TVUNDRVNTOlxuICAgIGNhc2UgdHlwZXMuUkVGUkVTSF9UT0tFTl9TVUNDRVNTOlxuICAgICAgcmV0dXJuIGFjdGlvbi5wYXlsb2FkLnVzZXI7XG5cbiAgICBjYXNlIHR5cGVzLlNJR05PVVRfVVNFUl9TVUNDRVNTOlxuICAgICAgcmV0dXJuIGluaXRpYWxVc2VyO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY3VycmVudFVzZXI7XG4iLCJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi8uLi9hY3Rpb25zL2FjdGlvbl90eXBlcyc7XG5cbmltcG9ydCBpbml0aWFsU3RhdGUgZnJvbSAnLi4vaW5pdGlhbF9zdGF0ZSc7XG5cbmNvbnN0IGluaXRpYWxJc0F1dGhlbnRpY2F0ZWQgPSBpbml0aWFsU3RhdGUuYXV0aGVudGljYXRpb24uaXNBdXRoZW50aWNhdGVkO1xuXG5jb25zdCBpc0F1dGhlbnRpY2F0ZWQgPSAoc3RhdGUgPSBpbml0aWFsSXNBdXRoZW50aWNhdGVkLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgdHlwZXMuQVVUSEVOVElDQVRFX0ZST01fVE9LRU46XG4gICAgY2FzZSB0eXBlcy5SRUZSRVNIX1RPS0VOX1NVQ0NFU1M6XG4gICAgY2FzZSB0eXBlcy5TSUdOSU5fVVNFUl9TVUNDRVNTOlxuICAgIGNhc2UgdHlwZXMuU0lHTlVQX1VTRVJfU1VDQ0VTUzpcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgY2FzZSB0eXBlcy5TSUdOT1VUX1VTRVJfU1VDQ0VTUzpcbiAgICBjYXNlIHR5cGVzLlJFRlJFU0hfVE9LRU5fRVJST1I6XG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpc0F1dGhlbnRpY2F0ZWQ7XG4iLCJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi8uLi9hY3Rpb25zL2FjdGlvbl90eXBlcyc7XG5cbmltcG9ydCBpbml0aWFsU3RhdGUgZnJvbSAnLi4vaW5pdGlhbF9zdGF0ZSc7XG5cbmNvbnN0IGluaXRpYWxFcnJvciA9IGluaXRpYWxTdGF0ZS5hdXRoZW50aWNhdGlvbi5zaWduaW5FcnJvcjtcblxuY29uc3Qgc2lnbmluRXJyb3IgPSAoc3RhdGUgPSBpbml0aWFsRXJyb3IsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSB0eXBlcy5DTEVBUl9TSUdOSU5fRVJST1I6XG4gICAgY2FzZSB0eXBlcy5TSUdOSU5fVVNFUl9TVUNDRVNTOlxuICAgIGNhc2UgdHlwZXMuU0lHTlVQX1VTRVJfU1VDQ0VTUzpcbiAgICBjYXNlIHR5cGVzLlJFRlJFU0hfVE9LRU5fU1VDQ0VTUzpcbiAgICBjYXNlIHR5cGVzLlNJR05PVVRfVVNFUl9TVUNDRVNTOlxuICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBjYXNlIHR5cGVzLlNJR05JTl9VU0VSX0VSUk9SOlxuICAgICAgcmV0dXJuIGFjdGlvbi5wYXlsb2FkO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2lnbmluRXJyb3I7XG4iLCJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi8uLi9hY3Rpb25zL2FjdGlvbl90eXBlcyc7XG5cbmltcG9ydCBpbml0aWFsU3RhdGUgZnJvbSAnLi4vaW5pdGlhbF9zdGF0ZSc7XG5cbmNvbnN0IGluaXRpYWxFcnJvciA9IGluaXRpYWxTdGF0ZS5hdXRoZW50aWNhdGlvbi5zaWdudXBFcnJvcjtcblxuY29uc3QgU2lnbnVwRXJyb3IgPSAoc3RhdGUgPSBpbml0aWFsRXJyb3IsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSB0eXBlcy5DTEVBUl9TSUdOVVBfRVJST1I6XG4gICAgY2FzZSB0eXBlcy5TSUdOSU5fVVNFUl9TVUNDRVNTOlxuICAgIGNhc2UgdHlwZXMuU0lHTlVQX1VTRVJfU1VDQ0VTUzpcbiAgICBjYXNlIHR5cGVzLlJFRlJFU0hfVE9LRU5fU1VDQ0VTUzpcbiAgICBjYXNlIHR5cGVzLlNJR05PVVRfVVNFUl9TVUNDRVNTOlxuICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBjYXNlIHR5cGVzLlNJR05VUF9VU0VSX0VSUk9SOlxuICAgICAgcmV0dXJuIGFjdGlvbi5wYXlsb2FkO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2lnbnVwRXJyb3I7XG4iLCJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi8uLi9hY3Rpb25zL2FjdGlvbl90eXBlcyc7XG5cbmltcG9ydCBpbml0aWFsU3RhdGUgZnJvbSAnLi4vaW5pdGlhbF9zdGF0ZSc7XG5cbmNvbnN0IGluaXRpYWxUb2tlbiA9IGluaXRpYWxTdGF0ZS5hdXRoZW50aWNhdGlvbi50b2tlbjtcblxuY29uc3QgdG9rZW4gPSAoc3RhdGUgPSBpbml0aWFsVG9rZW4sIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSB0eXBlcy5TSUdOSU5fVVNFUl9TVUNDRVNTOlxuICAgIGNhc2UgdHlwZXMuU0lHTlVQX1VTRVJfU1VDQ0VTUzpcbiAgICBjYXNlIHR5cGVzLlJFRlJFU0hfVE9LRU5fU1VDQ0VTUzpcbiAgICAgIHJldHVybiBhY3Rpb24ucGF5bG9hZC50b2tlbjtcblxuICAgIGNhc2UgdHlwZXMuU0lHTk9VVF9VU0VSX1NVQ0NFU1M6XG4gICAgY2FzZSB0eXBlcy5SRUZSRVNIX1RPS0VOX0VSUk9SOlxuICAgICAgcmV0dXJuIGluaXRpYWxUb2tlbjtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRva2VuO1xuIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IGN1cnJlbnRVc2VyIGZyb20gJy4vYXV0aGVudGljYXRpb24vY3VycmVudF91c2VyX3JlZHVjZXInO1xuaW1wb3J0IGlzQXV0aGVudGljYXRlZCBmcm9tICcuL2F1dGhlbnRpY2F0aW9uL2lzX2F1dGhlbnRpY2F0ZWRfcmVkdWNlcic7XG5pbXBvcnQgdG9rZW4gZnJvbSAnLi9hdXRoZW50aWNhdGlvbi90b2tlbl9yZWR1Y2VyJztcbmltcG9ydCBzaWduaW5FcnJvciBmcm9tICcuL2F1dGhlbnRpY2F0aW9uL3NpZ25pbl9lcnJvcl9yZWR1Y2VyJztcbmltcG9ydCBzaWdudXBFcnJvciBmcm9tICcuL2F1dGhlbnRpY2F0aW9uL3NpZ251cF9lcnJvcl9yZWR1Y2VyJztcblxuY29uc3QgYXV0aGVudGljYXRpb24gPSBjb21iaW5lUmVkdWNlcnMoe1xuICBjdXJyZW50VXNlcixcbiAgaXNBdXRoZW50aWNhdGVkLFxuICB0b2tlbixcbiAgc2lnbmluRXJyb3IsXG4gIHNpZ251cEVycm9yLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGF1dGhlbnRpY2F0aW9uO1xuIiwiaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vLi4vYWN0aW9ucy9hY3Rpb25fdHlwZXMnO1xuXG5pbXBvcnQgaW5pdGlhbFN0YXRlIGZyb20gJy4uL2luaXRpYWxfc3RhdGUnO1xuXG5jb25zdCBpbml0aWFsRXJyb3JzID0gaW5pdGlhbFN0YXRlLmNoYW5uZWxzLmNvbm5lY3Rpb25FcnJvcnM7XG5jb25zdCBjb25uZWN0aW9uRXJyb3JzID0gKHN0YXRlID0gaW5pdGlhbEVycm9ycywgYWN0aW9uKSA9PiB7XG4gIGxldCBjb3B5ID0ge307XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIHR5cGVzLkNIQU5ORUxfRVJST1I6XG4gICAgY2FzZSB0eXBlcy5DT05ORUNUX0NIQU5ORUxfRVJST1I6XG4gICAgICBjb3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICAgICAgY29weVthY3Rpb24ucGF5bG9hZC50b3BpY10gPSBhY3Rpb24ucGF5bG9hZC5lcnJvcjtcbiAgICAgIHJldHVybiBjb3B5O1xuXG4gICAgY2FzZSB0eXBlcy5DSEFOTkVMX0NPTk5FQ1RFRDpcbiAgICBjYXNlIHR5cGVzLkNIQU5ORUxfRElTQ09OTkVDVEVEOlxuICAgICAgY29weSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgICAgIGRlbGV0ZSBjb3B5W2FjdGlvbi5wYXlsb2FkLnRvcGljXTtcbiAgICAgIHJldHVybiBjb3B5O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdGlvbkVycm9ycztcbiIsImltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uLy4uL2FjdGlvbnMvYWN0aW9uX3R5cGVzJztcbmltcG9ydCBpbml0aWFsU3RhdGUgZnJvbSAnLi4vaW5pdGlhbF9zdGF0ZSc7XG5cbmNvbnN0IGluaXRpYWxDb25uZWN0aW9ucyA9IGluaXRpYWxTdGF0ZS5jaGFubmVscy5jb25uZWN0aW9ucztcbmNvbnN0IGNvbm5lY3Rpb25zID0gKHN0YXRlID0gaW5pdGlhbENvbm5lY3Rpb25zLCBhY3Rpb24pID0+IHtcbiAgbGV0IGNvcHkgPSB7fTtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgdHlwZXMuQ0hBTk5FTF9DT05ORUNURUQ6XG4gICAgICBjb3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICAgICAgY29weVthY3Rpb24ucGF5bG9hZC50b3BpY10gPSB0cnVlO1xuICAgICAgcmV0dXJuIGNvcHk7XG5cbiAgICBjYXNlIHR5cGVzLkNIQU5ORUxfQ0xPU0VEOlxuICAgIGNhc2UgdHlwZXMuQ09OTkVDVF9DSEFOTkVMX0VSUk9SOlxuICAgIGNhc2UgdHlwZXMuQ0hBTk5FTF9ESVNDT05ORUNURUQ6XG4gICAgICBjb3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICAgICAgZGVsZXRlIGNvcHlbYWN0aW9uLnBheWxvYWQudG9waWNdO1xuICAgICAgcmV0dXJuIGNvcHk7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0aW9ucztcbiIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IGNvbm5lY3Rpb25zIGZyb20gJy4vY2hhbm5lbHMvY29ubmVjdGlvbnNfcmVkdWNlcic7XG5pbXBvcnQgY29ubmVjdGlvbkVycm9ycyBmcm9tICcuL2NoYW5uZWxzL2Nvbm5lY3Rpb25fZXJyb3JzX3JlZHVjZXInO1xuXG5jb25zdCBjaGFubmVscyA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGNvbm5lY3Rpb25zLFxuICBjb25uZWN0aW9uRXJyb3JzLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNoYW5uZWxzO1xuIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgYXBwbGljYXRpb24gZnJvbSAnLi9hcHBsaWNhdGlvbl9yZWR1Y2VyJztcbmltcG9ydCBhdXRoZW50aWNhdGlvbiBmcm9tICcuL2F1dGhlbnRpY2F0aW9uX3JlZHVjZXInO1xuaW1wb3J0IGNoYW5uZWxzIGZyb20gJy4vY2hhbm5lbHNfcmVkdWNlcic7XG5pbXBvcnQgcHJlc2VuY2VzIGZyb20gJy4vcHJlc2VuY2VzX3JlZHVjZXInO1xuXG5jb25zdCByZWR1eEFwcCA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGFwcGxpY2F0aW9uLFxuICBhdXRoZW50aWNhdGlvbixcbiAgY2hhbm5lbHMsXG4gIHByZXNlbmNlcyxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByZWR1eEFwcDtcbiIsIi8vIFRoaXMgZmlsZSBjb250YWlucyBkZWZhdWx0IGFwcGxpY2F0aW9uIHN0YXRlXG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgYXBwbGljYXRpb246IHtcbiAgICBib290dXBUaW1lOiBudWxsLFxuICAgIGlzRmV0Y2hpbmc6IGZhbHNlLFxuICAgIHNvY2tldFN0YXR1czogJ2Rpc2Nvbm5lY3RlZCcsXG4gIH0sXG4gIGF1dGhlbnRpY2F0aW9uOiB7XG4gICAgaXNBdXRoZW50aWNhdGVkOiBmYWxzZSxcbiAgICBjdXJyZW50VXNlcjogbnVsbCxcbiAgICB0b2tlbjogbnVsbCxcbiAgICBzaWduaW5FcnJvcjogbnVsbCxcbiAgICBzaWdudXBFcnJvcjogbnVsbCxcbiAgfSxcbiAgY2hhbm5lbHM6IHtcbiAgICBjb25uZWN0aW9uczoge30sXG4gICAgY29ubmVjdGlvbkVycm9yczoge30sXG4gIH0sXG4gIHByZXNlbmNlczoge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbml0aWFsU3RhdGU7IiwiaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vYWN0aW9ucy9hY3Rpb25fdHlwZXMnO1xuXG5pbXBvcnQgaW5pdGlhbFN0YXRlIGZyb20gJy4vaW5pdGlhbF9zdGF0ZSc7XG5cbmNvbnN0IHByZXNlbmNlcyA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZS5wcmVzZW5jZXMsIGFjdGlvbikgPT4ge1xuICBsZXQgY29weSA9IHt9O1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSB0eXBlcy5ESVNQQVRDSF9QUkVTRU5DRV9TVEFURTpcbiAgICBjYXNlIHR5cGVzLkRJU1BBVENIX1BSRVNFTkNFX0RJRkY6XG4gICAgICAvLyBQcmVzZW5jZXMgb2JqZWN0IGlzIG9mIGZvcm0ge3RvcGljOiB0b3BpYywgcHJlc2VuY2VzOiBwcmVzZW5jZXN9XG4gICAgICBjb3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICAgICAgY29weVthY3Rpb24ucGF5bG9hZC50b3BpY10gPSBhY3Rpb24ucGF5bG9hZC5wcmVzZW5jZXM7XG4gICAgICByZXR1cm4gY29weTtcblxuICAgIGNhc2UgdHlwZXMuQ0hBTk5FTF9DTE9TRUQ6XG4gICAgY2FzZSB0eXBlcy5DT05ORUNUX0NIQU5ORUxfRVJST1I6XG4gICAgY2FzZSB0eXBlcy5DSEFOTkVMX0RJU0NPTk5FQ1RFRDpcbiAgICAgIGNvcHkgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSk7XG4gICAgICBkZWxldGUgY29weVthY3Rpb24ucGF5bG9hZC50b3BpY107XG4gICAgICByZXR1cm4gY29weTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHByZXNlbmNlczsiLCJjb25zdCBzY2hlbWEgPSB7XG4gIG5hbWU6IHtcbiAgICBlbGVtZW50VHlwZTogJ2lucHV0JyxcbiAgICBlbGVtZW50Q29uZmlnOiB7XG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgICBwbGFjZWhvbGRlcjogJ05hbWUnLFxuICAgIH0sXG4gICAgdmFsdWU6IG51bGwsXG4gICAgdmFsaWQ6IGZhbHNlLFxuICAgIHZhbGlkYXRpb25SdWxlczoge1xuICAgICAgbm90RW1wdHk6IHRydWUsXG4gICAgfSxcbiAgICB0b3VjaGVkOiBmYWxzZSxcbiAgfSxcbiAgcGFzc3dvcmQ6IHtcbiAgICBlbGVtZW50VHlwZTogJ2lucHV0JyxcbiAgICBlbGVtZW50Q29uZmlnOiB7XG4gICAgICB0eXBlOiAncGFzc3dvcmQnLFxuICAgICAgcGxhY2Vob2xkZXI6ICdQYXNzd29yZCcsXG4gICAgfSxcbiAgICB2YWx1ZTogbnVsbCxcbiAgICB2YWxpZDogZmFsc2UsXG4gICAgdmFsaWRhdGlvblJ1bGVzOiB7XG4gICAgICBtaW5MZW5ndGg6IDYsXG4gICAgfSxcbiAgICB0b3VjaGVkOiBmYWxzZSxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNjaGVtYTtcbiIsImNvbnN0IHNjaGVtYSA9IHtcbiAgbmFtZToge1xuICAgIGVsZW1lbnRUeXBlOiAnaW5wdXQnLFxuICAgIGVsZW1lbnRDb25maWc6IHtcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnTmFtZScsXG4gICAgfSxcbiAgICB2YWx1ZTogbnVsbCxcbiAgICB2YWxpZDogZmFsc2UsXG4gICAgdmFsaWRhdGlvblJ1bGVzOiB7XG4gICAgICBub3RFbXB0eTogdHJ1ZSxcbiAgICB9LFxuICAgIHRvdWNoZWQ6IGZhbHNlLFxuICB9LFxuICBlbWFpbDoge1xuICAgIGVsZW1lbnRUeXBlOiAnaW5wdXQnLFxuICAgIGVsZW1lbnRDb25maWc6IHtcbiAgICAgIHR5cGU6ICdlbWFpbCcsXG4gICAgICBwbGFjZWhvbGRlcjogJ0VtYWlsJyxcbiAgICB9LFxuICAgIHZhbHVlOiBudWxsLFxuICAgIHZhbGlkOiBmYWxzZSxcbiAgICB2YWxpZGF0aW9uUnVsZXM6IHtcbiAgICAgIGlzRW1haWw6IHRydWUsXG4gICAgfSxcbiAgICB0b3VjaGVkOiBmYWxzZSxcbiAgfSxcbiAgcGFzc3dvcmQ6IHtcbiAgICBlbGVtZW50VHlwZTogJ2lucHV0JyxcbiAgICBlbGVtZW50Q29uZmlnOiB7XG4gICAgICB0eXBlOiAncGFzc3dvcmQnLFxuICAgICAgcGxhY2Vob2xkZXI6ICdQYXNzd29yZCcsXG4gICAgfSxcbiAgICB2YWx1ZTogbnVsbCxcbiAgICB2YWxpZDogZmFsc2UsXG4gICAgdmFsaWRhdGlvblJ1bGVzOiB7XG4gICAgICBtaW5MZW5ndGg6IDYsXG4gICAgfSxcbiAgICB0b3VjaGVkOiBmYWxzZSxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNjaGVtYTtcbiIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbmltcG9ydCBBdXRoU2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoX3NlcnZpY2UnO1xuaW1wb3J0IHsgUk9PVF9VUkwgfSBmcm9tICcuLi9jb25maWcvY29uZmlnJztcblxuY29uc3QgYXV0aEhlYWRlcnMgPSAoKSA9PiAoe1xuICBoZWFkZXJzOiB7XG4gICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7QXV0aFNlcnZpY2UubG9hZFRva2VuKCl9YCxcbiAgfSxcbiAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG59KTtcblxuY29uc3QgQXBpID0ge1xuICBzaWduaW46IHBhcmFtcyA9PiBheGlvcy5wb3N0KGAke1JPT1RfVVJMfS9hdXRoZW50aWNhdGlvbmAsIHsgc2Vzc2lvbjogcGFyYW1zIH0pLFxuICBzaWdudXA6IHBhcmFtcyA9PiBheGlvcy5wb3N0KGAke1JPT1RfVVJMfS9yZWdpc3RyYXRpb25zYCwgeyB1c2VyOiBwYXJhbXMgfSksXG4gIHJlZnJlc2hUb2tlbjogdG9rZW4gPT4gKFxuICAgIGF4aW9zLnBhdGNoKFxuICAgICAgYCR7Uk9PVF9VUkx9L2F1dGhlbnRpY2F0aW9uL3JlZnJlc2hgLFxuICAgICAgeyBzZXNzaW9uOiB7IHRva2VuIH0gfSxcbiAgICAgIGF1dGhIZWFkZXJzKCksXG4gICAgKVxuICApLFxuICBzaWdub3V0OiAoKSA9PiBheGlvcy5kZWxldGUoYCR7Uk9PVF9VUkx9L2F1dGhlbnRpY2F0aW9uYCwgYXV0aEhlYWRlcnMoKSksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcGk7IiwiLy8gSXQgaXMgbm90IHBvc3NpYmxlIHRvIGRlY29kZSBQaG9lbml4LlRva2VuIG9uIHRoZSBjbGllbnQgc2lkZSFcbi8vIGh0dHBzOi8vZWxpeGlyZm9ydW0uY29tL3QvaG93LXRvLWRlY29kZS1waG9lbml4LXRva2VuLWNsaWVudC1zaWRlLzk2ODBcblxuY2xhc3MgQXV0aFNlcnZpY2Uge1xuICBsb2FkVG9rZW4gPSAoKSA9PiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVhY3RAcGhvZW5peEF1dGhUb2tlbicpXG4gIHNhdmVUb2tlbiA9IHRva2VuID0+IGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZWFjdEBwaG9lbml4QXV0aFRva2VuJywgdG9rZW4pXG4gIHJlbW92ZVRva2VuID0gKCkgPT4gbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3JlYWN0QHBob2VuaXhBdXRoVG9rZW4nKVxuICByZWZyZXNoVG9rZW4gPSAoKSA9PiB0aGlzLnNhdmVUb2tlbih0aGlzLmxvYWRUb2tlbigpKVxuICBpc0xvZ2dlZEluID0gKCkgPT4gISF0aGlzLmxvYWRUb2tlbigpXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBBdXRoU2VydmljZSgpO1xuIiwiY29uc3QgTUFYX1RSVU5DQVRFID0gMzA7XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRUaW1lc3RhbXAgPSAodGltZXN0YW1wKSA9PiB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lc3RhbXApO1xuICBjb25zdCBkYXRlU3RyaW5nID0gZGF0ZS50b0xvY2FsZVRpbWVTdHJpbmcoKTtcbiAgcmV0dXJuIGRhdGVTdHJpbmcuc3BsaXQoJzonKS5zbGljZSgwLCAyKS5qb2luKCc6Jyk7XG59O1xuXG5leHBvcnQgY29uc3QgdHJ1bmNhdGUgPSAodGV4dCkgPT4ge1xuICBpZiAoIXRleHQpIHJldHVybjtcbiAgaWYgKHRleHQubGVuZ3RoIDw9IE1BWF9UUlVOQ0FURSkgcmV0dXJuIHRleHQ7XG4gIHJldHVybiBgJHt0ZXh0LnN1YnN0cmluZygwLCBNQVhfVFJVTkNBVEUgLSA0KX0gLi4uYDtcbn07XG4iLCIvLyBodHRwczovL3d3dy53M3Jlc291cmNlLmNvbS9qYXZhc2NyaXB0L2Zvcm0vcGhvbmUtbm8tdmFsaWRhdGlvbi5waHBcbmNvbnN0IHBob25lTnVtYmVyUmVnZXggPSAvXlxcKD8oWzAtOV17M30pXFwpP1stLiBdPyhbMC05XXszfSlbLS4gXT8oWzAtOV17NH0pJC87XG5jb25zdCBwaG9uZU51bWJlclZhbGlkYXRvciA9IHZhbCA9PiBwaG9uZU51bWJlclJlZ2V4LnRlc3QodmFsKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuY29uc3QgZW1haWxSZWdleCA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xuY29uc3QgZW1haWxWYWxpZGF0b3IgPSB2YWwgPT4gZW1haWxSZWdleC50ZXN0KHZhbCk7XG5jb25zdCBtaW5MZW5ndGhWYWxpZGF0b3IgPSAodmFsLCBtaW5MZW5ndGgpID0+IHZhbC5sZW5ndGggPj0gbWluTGVuZ3RoO1xuY29uc3QgbWF4TGVuZ3RoVmFsaWRhdG9yID0gKHZhbCwgbWF4TGVuZ3RoKSA9PiB2YWwubGVuZ3RoIDw9IG1heExlbmd0aDtcbmNvbnN0IGlzTGVuZ3RoVmFsaWRhdG9yID0gKHZhbCwgdmFsTGVuZ3RoKSA9PiB2YWwubGVuZ3RoID09PSB2YWxMZW5ndGg7XG5jb25zdCBub3RFbXB0eVZhbGlkYXRvciA9IHZhbCA9PiB2YWwudHJpbSgpICE9PSAnJztcblxuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbmNvbnN0IHZhbGlkYXRpb24gPSAodmFsLCBydWxlcykgPT4ge1xuICBsZXQgaXNWYWxpZCA9IHRydWU7XG4gIC8vIGVycm9yIFRoZSBib2R5IG9mIGEgZm9yLWluIHNob3VsZCBiZSB3cmFwcGVkIGluIGFuIGlmIHN0YXRlbWVudFxuICAvLyB0byBmaWx0ZXIgdW53YW50ZWQgcHJvcGVydGllcyBmcm9tIHRoZSBwcm90b3R5cGVcbiAgZm9yIChjb25zdCBydWxlIGluIHJ1bGVzKSB7XG4gICAgaWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwocnVsZXMsIHJ1bGUpKSB7XG4gICAgICBzd2l0Y2ggKHJ1bGUpIHtcbiAgICAgICAgY2FzZSAnaXNQaG9uZU51bWJlcic6XG4gICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgcGhvbmVOdW1iZXJWYWxpZGF0b3IodmFsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaXNFbWFpbCc6XG4gICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgZW1haWxWYWxpZGF0b3IodmFsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbWluTGVuZ3RoJzpcbiAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBtaW5MZW5ndGhWYWxpZGF0b3IodmFsLCBydWxlc1tydWxlXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ21heExlbmd0aCc6XG4gICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgbWF4TGVuZ3RoVmFsaWRhdG9yKHZhbCwgcnVsZXNbcnVsZV0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdpc0xlbmd0aCc6XG4gICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgaXNMZW5ndGhWYWxpZGF0b3IodmFsLCBydWxlc1tydWxlXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ25vdEVtcHR5JzpcbiAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBub3RFbXB0eVZhbGlkYXRvcih2YWwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlzVmFsaWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpc1ZhbGlkO1xufTtcbi8qIGVzbGludC1lbmFibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGlvbjtcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHsgYXBwQm9vdHVwIH0gZnJvbSAnLi4vYWN0aW9ucy9hcHBsaWNhdGlvbl9hY3Rpb25zJztcbmltcG9ydCB7XG4gIHNpZ25pblVzZXIsXG4gIGNsZWFyU2lnbmluRXJyb3IsXG4gIHNpZ251cFVzZXIsXG4gIGNsZWFyU2lnbnVwRXJyb3IsXG4gIHNpZ25vdXRVc2VyLFxufSBmcm9tICcuLi9hY3Rpb25zL2F1dGhlbnRpY2F0aW9uX2FjdGlvbnMnO1xuaW1wb3J0IHtcbiAgam9pbkNoYW5uZWwsXG4gIGxlYXZlQ2hhbm5lbCxcbn0gZnJvbSAnLi4vYWN0aW9ucy9jaGFubmVsX2FjdGlvbnMnO1xuaW1wb3J0IHtcbiAgZm9ybWF0VGltZXN0YW1wLFxuICB0cnVuY2F0ZSxcbn0gZnJvbSAnLi4vdXRpbHMvZm9ybWF0dGVyJztcblxuaW1wb3J0IExvYWRpbmdEb3RzIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZ19kb3RzJztcbmltcG9ydCBQcm9wZXJ0aWVzIGZyb20gJy4uL2NvbXBvbmVudHMvcHJvcGVydGllcyc7XG5pbXBvcnQgU2lnbmluRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL3NpZ25pbl9mb3JtJztcbmltcG9ydCBTaWdudXBGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvc2lnbnVwX2Zvcm0nO1xuaW1wb3J0IFByZXNlbmNlTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL3ByZXNlbmNlcy9wcmVzZW5jZV9saXN0JztcblxuY29uc3QgcHJvcFR5cGVzID0ge1xuICBhcHBCb290dXA6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHNpZ25pblVzZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNsZWFyU2lnbmluRXJyb3I6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHNpZ251cFVzZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNsZWFyU2lnbnVwRXJyb3I6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHNpZ25vdXRVc2VyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBqb2luQ2hhbm5lbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgbGVhdmVDaGFubmVsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAvL1xuICBhcHBsaWNhdGlvbjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBhdXRoZW50aWNhdGlvbjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBjaGFubmVsczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBwcmVzZW5jZXM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbn07XG5cbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG4gIFxuICBzdGF0ZSA9IHtcbiAgICBzaWduTW9kZTogJ1NpZ24gSW4nLFxuICB9XG4gIFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBBcHBsaWNhdGlvbiBpcyBzdGFydGluZy4uLlxuICAgIHRoaXMucHJvcHMuYXBwQm9vdHVwKERhdGUubm93KCkpO1xuICB9XG4gIFxuICBfdG9nZ2xlU2lnbk1vZGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzaWduTW9kZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBuZXdTaWduTW9kZSA9IHNpZ25Nb2RlID09PSAnU2lnbiBJbicgPyAnU2lnbiBVcCcgOiAnU2lnbiBJbic7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c2lnbk1vZGU6IG5ld1NpZ25Nb2RlfSk7XG4gIH1cbiAgXG4gIF9zaWdub3V0VXNlciA9ICgpID0+IHtcbiAgICBjb25zdCB7IGF1dGhlbnRpY2F0aW9uLCBzaWdub3V0VXNlciB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGN1cnJlbnRVc2VyIH0gPSBhdXRoZW50aWNhdGlvbjtcbiAgICBzaWdub3V0VXNlcihjdXJyZW50VXNlci5pZCk7XG4gIH1cbiAgXG4gIF9pc0NoYW5uZWxDb25uZWN0ZWQgPSAodG9waWMpID0+IHtcbiAgICBjb25zdCB7IGNoYW5uZWxzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29ubmVjdGlvbnMgfSA9IGNoYW5uZWxzO1xuICAgIHJldHVybiBjb25uZWN0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0b3BpYyk7XG4gIH1cbiAgXG4gIF9yZW5kZXJQcmVzZW5jZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBwcmVzZW5jZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcHJlc2VuY2VLZXlzID0gT2JqZWN0LmtleXMocHJlc2VuY2VzKTtcbiAgICBpZiAoIXByZXNlbmNlcyB8fCBwcmVzZW5jZUtleXMubGVuZ3RoIDwgMSkgeyByZXR1cm47IH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMj5QcmVzZW5jZXM8L2gyPlxuICAgICAgICA8dWw+XG4gICAgICAgICAge3ByZXNlbmNlS2V5cy5tYXAoa2V5ID0+IChcbiAgICAgICAgICAgIDxsaSBrZXk9e2BwcmVzZW5jZXM6JHtrZXl9YH0+XG4gICAgICAgICAgICAgIHtrZXl9XG4gICAgICAgICAgICAgIDxQcmVzZW5jZUxpc3QgcHJlc2VuY2VzPXtwcmVzZW5jZXNba2V5XX0gLz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG4gIFxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBcbiAgICAgIGFwcGxpY2F0aW9uLFxuICAgICAgYXV0aGVudGljYXRpb24sXG4gICAgICBjaGFubmVscyxcbiAgICAgIHNpZ25pbkVycm9yLCBcbiAgICAgIHNpZ251cEVycm9yLFxuICAgICAgLy9cbiAgICAgIHNpZ25pblVzZXIsXG4gICAgICBjbGVhclNpZ25pbkVycm9yLFxuICAgICAgc2lnbnVwVXNlcixcbiAgICAgIGNsZWFyU2lnbnVwRXJyb3IsXG4gICAgICBqb2luQ2hhbm5lbCxcbiAgICAgIGxlYXZlQ2hhbm5lbCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGlzRmV0Y2hpbmcgfSA9IGFwcGxpY2F0aW9uO1xuICAgIGNvbnN0IHsgaXNBdXRoZW50aWNhdGVkIH0gPSBhdXRoZW50aWNhdGlvbjtcbiAgICBcbiAgICBjb25zdCB7IHNpZ25Nb2RlIH0gPSB0aGlzLnN0YXRlO1xuICAgIFxuICAgIC8vIFNhbml0aXplIHByb3BlcnRpZXMgZm9yIGRpc3BsYXlcbiAgICBjb25zdCBkaXNwbGF5QXBwbGljYXRpb24gPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sIGFwcGxpY2F0aW9uLCBcbiAgICAgIHtib290dXBUaW1lOiBmb3JtYXRUaW1lc3RhbXAoYXBwbGljYXRpb24uYm9vdHVwVGltZSl9XG4gICAgKTtcbiAgICBjb25zdCBkaXNwbGF5UHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSwgYXV0aGVudGljYXRpb24sIFxuICAgICAge3Rva2VuOiB0cnVuY2F0ZShhdXRoZW50aWNhdGlvbi50b2tlbil9XG4gICAgKTtcbiAgICBcbiAgICByZXR1cm4gKFxuICAgICAgPG1haW4+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyXCI+XG4gICAgICAgICAgPGgxPlBob2VuaXggQ2xpZW50IHcvIFJlYWN0PC9oMT5cbiAgICAgICAgICB7IGlzRmV0Y2hpbmcgJiYgPExvYWRpbmdEb3RzIGludGVydmFsPXsxMDB9IGRvdHM9ezIwfSAvPiB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtd3JhcHBlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4LWNvbnRhaW5lcic+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbGFyZ2UgcGFuZWwnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleC1jb250YWluZXIgY29sdW1uJz5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGgyPkFwcGxpY2F0aW9uPC9oMj5cbiAgICAgICAgICAgICAgICAgIDxQcm9wZXJ0aWVzIG9iamVjdD17ZGlzcGxheUFwcGxpY2F0aW9ufSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8aDI+QXV0aGVudGljYXRpb248L2gyPlxuICAgICAgICAgICAgICAgICAgPFByb3BlcnRpZXMgb2JqZWN0PXtkaXNwbGF5UHJvcGVydGllc30gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGgyPkNoYW5uZWxzPC9oMj5cbiAgICAgICAgICAgICAgICAgIDxQcm9wZXJ0aWVzIG9iamVjdD17Y2hhbm5lbHMuY29ubmVjdGlvbnN9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgeyB0aGlzLl9yZW5kZXJQcmVzZW5jZXMoKSB9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFuZWwnPlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgISBpc0F1dGhlbnRpY2F0ZWQgJiYgc2lnbk1vZGUgPT09ICdTaWduIEluJyAmJlxuICAgICAgICAgICAgICAgIDxTaWduaW5Gb3JtXG4gICAgICAgICAgICAgICAgICBzaWduaW5Vc2VyPXtzaWduaW5Vc2VyfVxuICAgICAgICAgICAgICAgICAgY2xlYXJTaWduaW5FcnJvcj17Y2xlYXJTaWduaW5FcnJvcn1cbiAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZT17c2lnbmluRXJyb3J9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgISBpc0F1dGhlbnRpY2F0ZWQgJiYgc2lnbk1vZGUgPT09ICdTaWduIFVwJyAmJlxuICAgICAgICAgICAgICAgIDxTaWdudXBGb3JtXG4gICAgICAgICAgICAgICAgICBzaWdudXBVc2VyPXtzaWdudXBVc2VyfVxuICAgICAgICAgICAgICAgICAgY2xlYXJTaWdudXBFcnJvcj17Y2xlYXJTaWdudXBFcnJvcn1cbiAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZT17c2lnbnVwRXJyb3J9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgISBpc0F1dGhlbnRpY2F0ZWQgJiYgXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbicgb25DbGljaz17dGhpcy5fdG9nZ2xlU2lnbk1vZGV9PlxuICAgICAgICAgICAgICAgICAgVG9nZ2xlIHNpZ24gbW9kZVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQgJiZcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uJyBvbkNsaWNrPXt0aGlzLl9zaWdub3V0VXNlcn0+XG4gICAgICAgICAgICAgICAgICBTaWduIG91dFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQgJiYgKFxuICAgICAgICAgICAgICAgICAgdGhpcy5faXNDaGFubmVsQ29ubmVjdGVkKCdsb2JieScpID9cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2J1dHRvbicgXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17bGVhdmVDaGFubmVsLmJpbmQobnVsbCwgJ2xvYmJ5Jyl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBMZWF2ZSBMb2JieVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj4gOlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nYnV0dG9uJyBcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtqb2luQ2hhbm5lbC5iaW5kKG51bGwsICdsb2JieScpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgSm9pbiBMb2JieVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbWFpbj5cbiAgICApO1xuICB9XG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoe1xuICBhcHBsaWNhdGlvbixcbiAgYXV0aGVudGljYXRpb24sXG4gIGNoYW5uZWxzLFxuICBwcmVzZW5jZXMsXG59KSA9PiAoe1xuICBhcHBsaWNhdGlvbixcbiAgYXV0aGVudGljYXRpb24sXG4gIGNoYW5uZWxzLFxuICBwcmVzZW5jZXMsXG59KTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKFxuICBiaW5kQWN0aW9uQ3JlYXRvcnMoe1xuICAgIGFwcEJvb3R1cCxcbiAgICBzaWduaW5Vc2VyLFxuICAgIGNsZWFyU2lnbmluRXJyb3IsXG4gICAgc2lnbnVwVXNlcixcbiAgICBjbGVhclNpZ251cEVycm9yLFxuICAgIHNpZ25vdXRVc2VyLFxuICAgIGpvaW5DaGFubmVsLFxuICAgIGxlYXZlQ2hhbm5lbCxcbiAgfSwgZGlzcGF0Y2gpXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShBcHApOyJdLCJzb3VyY2VSb290IjoiIn0=