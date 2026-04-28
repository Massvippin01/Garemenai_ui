"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/product/[id]/page",{

/***/ "(app-pages-browser)/./lib/actions/user.actions.ts":
/*!*************************************!*\
  !*** ./lib/actions/user.actions.ts ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCloudIntelligence: function() { return /* binding */ getCloudIntelligence; },
/* harmony export */   syncUserIntelligence: function() { return /* binding */ syncUserIntelligence; }
/* harmony export */ });
/* harmony import */ var next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/client/app-call-server */ "(app-pages-browser)/./node_modules/next/dist/client/app-call-server.js");
/* harmony import */ var next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! private-next-rsc-action-client-wrapper */ "(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js");



function __build_action__(action, args) {
  return (0,next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__.callServer)(action.$$id, args)
}

/* __next_internal_action_entry_do_not_use__ {"8d1e89514e65d060146dbfc67048824f7054e756":"syncUserIntelligence","f73722917130ada359b3310fac2ec9877a503e3f":"getCloudIntelligence"} */ var getCloudIntelligence = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("f73722917130ada359b3310fac2ec9877a503e3f");

var syncUserIntelligence = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("8d1e89514e65d060146dbfc67048824f7054e756");



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/./lib/useFitProfile.ts":
/*!******************************!*\
  !*** ./lib/useFitProfile.ts ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useFitProfile: function() { return /* binding */ useFitProfile; }\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _clerk_nextjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @clerk/nextjs */ \"(app-pages-browser)/./node_modules/@clerk/clerk-react/dist/index.mjs\");\n/* harmony import */ var _actions_user_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions/user.actions */ \"(app-pages-browser)/./lib/actions/user.actions.ts\");\n/* __next_internal_client_entry_do_not_use__ useFitProfile auto */ \n\n\nfunction useFitProfile() {\n    const [measurements, setMeasurements] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({\n        height: \"\",\n        weight: \"\",\n        chest: \"\",\n        waist: \"\",\n        hips: \"\",\n        inseam: \"\"\n    });\n    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const { user, isLoaded } = (0,_clerk_nextjs__WEBPACK_IMPORTED_MODULE_2__.useUser)();\n    // 1. Initial Load (Checks Cloud first, then falls back to LocalStorage)\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        setMounted(true);\n        const loadProfile = async ()=>{\n            let activeMeasurements = null;\n            // Prioritize Cloud Database if user is securely logged in\n            if (isLoaded && user) {\n                const cloudData = await (0,_actions_user_actions__WEBPACK_IMPORTED_MODULE_1__.getCloudIntelligence)();\n                if (cloudData.success && cloudData.profile) {\n                    activeMeasurements = {\n                        height: cloudData.profile.height || \"\",\n                        weight: cloudData.profile.weight || \"\",\n                        chest: cloudData.profile.chest || \"\",\n                        waist: cloudData.profile.waist || \"\",\n                        hips: cloudData.profile.hips || \"\",\n                        inseam: cloudData.profile.inseam || \"\"\n                    };\n                    // Sync cloud down to fast local storage for UI snapping\n                    localStorage.setItem(\"celestials-fit-profile\", JSON.stringify(activeMeasurements));\n                }\n            }\n            // Fallback to local storage if not logged in or cloud is empty\n            if (!activeMeasurements) {\n                const stored = localStorage.getItem(\"celestials-fit-profile\");\n                if (stored) {\n                    try {\n                        activeMeasurements = JSON.parse(stored);\n                    } catch (e) {\n                        console.error(\"Failed to parse fit profile\", e);\n                    }\n                }\n            }\n            if (activeMeasurements) {\n                setMeasurements(activeMeasurements);\n            }\n        };\n        loadProfile();\n    }, [\n        user,\n        isLoaded\n    ]);\n    // 2. Global Save Trigger (Saves to Local + securely pipelines to Neon DB)\n    const saveMeasurements = (newMeasurements)=>{\n        setMeasurements(newMeasurements);\n        if (mounted) {\n            localStorage.setItem(\"celestials-fit-profile\", JSON.stringify(newMeasurements));\n            // Autonomous Database Pipeline\n            if (isLoaded && user) {\n                (0,_actions_user_actions__WEBPACK_IMPORTED_MODULE_1__.syncUserIntelligence)(newMeasurements).catch((err)=>console.error(\"Cloud DB ML Sync failed\", err));\n            }\n        }\n    };\n    return {\n        measurements,\n        saveMeasurements,\n        mounted\n    };\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2xpYi91c2VGaXRQcm9maWxlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O21FQUU0QztBQUNKO0FBQzRDO0FBVzdFLFNBQVNLO0lBQ2QsTUFBTSxDQUFDQyxjQUFjQyxnQkFBZ0IsR0FBR1AsK0NBQVFBLENBQWtCO1FBQ2hFUSxRQUFRO1FBQ1JDLFFBQVE7UUFDUkMsT0FBTztRQUNQQyxPQUFPO1FBQ1BDLE1BQU07UUFDTkMsUUFBUTtJQUNWO0lBQ0EsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdmLCtDQUFRQSxDQUFDO0lBRXZDLE1BQU0sRUFBRWdCLElBQUksRUFBRUMsUUFBUSxFQUFFLEdBQUdmLHNEQUFPQTtJQUVsQyx3RUFBd0U7SUFDeEVELGdEQUFTQSxDQUFDO1FBQ1JjLFdBQVc7UUFFWCxNQUFNRyxjQUFjO1lBQ2xCLElBQUlDLHFCQUFxQjtZQUV6QiwwREFBMEQ7WUFDMUQsSUFBSUYsWUFBWUQsTUFBTTtnQkFDbkIsTUFBTUksWUFBWSxNQUFNakIsMkVBQW9CQTtnQkFDNUMsSUFBSWlCLFVBQVVDLE9BQU8sSUFBSUQsVUFBVUUsT0FBTyxFQUFFO29CQUN6Q0gscUJBQXFCO3dCQUNsQlgsUUFBUVksVUFBVUUsT0FBTyxDQUFDZCxNQUFNLElBQUk7d0JBQ3BDQyxRQUFRVyxVQUFVRSxPQUFPLENBQUNiLE1BQU0sSUFBSTt3QkFDcENDLE9BQU9VLFVBQVVFLE9BQU8sQ0FBQ1osS0FBSyxJQUFJO3dCQUNsQ0MsT0FBT1MsVUFBVUUsT0FBTyxDQUFDWCxLQUFLLElBQUk7d0JBQ2xDQyxNQUFNUSxVQUFVRSxPQUFPLENBQUNWLElBQUksSUFBSTt3QkFDaENDLFFBQVFPLFVBQVVFLE9BQU8sQ0FBQ1QsTUFBTSxJQUFJO29CQUN2QztvQkFDQSx3REFBd0Q7b0JBQ3hEVSxhQUFhQyxPQUFPLENBQUMsMEJBQTBCQyxLQUFLQyxTQUFTLENBQUNQO2dCQUNqRTtZQUNIO1lBRUEsK0RBQStEO1lBQy9ELElBQUksQ0FBQ0Esb0JBQW9CO2dCQUN2QixNQUFNUSxTQUFTSixhQUFhSyxPQUFPLENBQUM7Z0JBQ3BDLElBQUlELFFBQVE7b0JBQ1YsSUFBSTt3QkFDRlIscUJBQXFCTSxLQUFLSSxLQUFLLENBQUNGO29CQUNsQyxFQUFFLE9BQU9HLEdBQUc7d0JBQ1ZDLFFBQVFDLEtBQUssQ0FBQywrQkFBK0JGO29CQUMvQztnQkFDRjtZQUNGO1lBRUEsSUFBSVgsb0JBQW9CO2dCQUN0QlosZ0JBQWdCWTtZQUNsQjtRQUNGO1FBRUFEO0lBQ0YsR0FBRztRQUFDRjtRQUFNQztLQUFTO0lBRW5CLDBFQUEwRTtJQUMxRSxNQUFNZ0IsbUJBQW1CLENBQUNDO1FBQ3hCM0IsZ0JBQWdCMkI7UUFDaEIsSUFBSXBCLFNBQVM7WUFDWFMsYUFBYUMsT0FBTyxDQUFDLDBCQUEwQkMsS0FBS0MsU0FBUyxDQUFDUTtZQUU5RCwrQkFBK0I7WUFDL0IsSUFBSWpCLFlBQVlELE1BQU07Z0JBQ25CWiwyRUFBb0JBLENBQUM4QixpQkFBaUJDLEtBQUssQ0FBQ0MsQ0FBQUEsTUFBT0wsUUFBUUMsS0FBSyxDQUFDLDJCQUEyQkk7WUFDL0Y7UUFDRjtJQUNGO0lBRUEsT0FBTztRQUFFOUI7UUFBYzJCO1FBQWtCbkI7SUFBUTtBQUNuRCIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9saWIvdXNlRml0UHJvZmlsZS50cz9mY2NmIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VVc2VyIH0gZnJvbSBcIkBjbGVyay9uZXh0anNcIjtcbmltcG9ydCB7IGdldENsb3VkSW50ZWxsaWdlbmNlLCBzeW5jVXNlckludGVsbGlnZW5jZSB9IGZyb20gXCIuL2FjdGlvbnMvdXNlci5hY3Rpb25zXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRml0TWVhc3VyZW1lbnRzIHtcbiAgaGVpZ2h0OiBzdHJpbmc7XG4gIHdlaWdodDogc3RyaW5nO1xuICBjaGVzdDogc3RyaW5nO1xuICB3YWlzdDogc3RyaW5nO1xuICBoaXBzOiBzdHJpbmc7XG4gIGluc2VhbTogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRml0UHJvZmlsZSgpIHtcbiAgY29uc3QgW21lYXN1cmVtZW50cywgc2V0TWVhc3VyZW1lbnRzXSA9IHVzZVN0YXRlPEZpdE1lYXN1cmVtZW50cz4oe1xuICAgIGhlaWdodDogXCJcIixcbiAgICB3ZWlnaHQ6IFwiXCIsXG4gICAgY2hlc3Q6IFwiXCIsXG4gICAgd2Fpc3Q6IFwiXCIsXG4gICAgaGlwczogXCJcIixcbiAgICBpbnNlYW06IFwiXCJcbiAgfSk7XG4gIGNvbnN0IFttb3VudGVkLCBzZXRNb3VudGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCB7IHVzZXIsIGlzTG9hZGVkIH0gPSB1c2VVc2VyKCk7XG5cbiAgLy8gMS4gSW5pdGlhbCBMb2FkIChDaGVja3MgQ2xvdWQgZmlyc3QsIHRoZW4gZmFsbHMgYmFjayB0byBMb2NhbFN0b3JhZ2UpXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0TW91bnRlZCh0cnVlKTtcbiAgICBcbiAgICBjb25zdCBsb2FkUHJvZmlsZSA9IGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBhY3RpdmVNZWFzdXJlbWVudHMgPSBudWxsO1xuXG4gICAgICAvLyBQcmlvcml0aXplIENsb3VkIERhdGFiYXNlIGlmIHVzZXIgaXMgc2VjdXJlbHkgbG9nZ2VkIGluXG4gICAgICBpZiAoaXNMb2FkZWQgJiYgdXNlcikge1xuICAgICAgICAgY29uc3QgY2xvdWREYXRhID0gYXdhaXQgZ2V0Q2xvdWRJbnRlbGxpZ2VuY2UoKTtcbiAgICAgICAgIGlmIChjbG91ZERhdGEuc3VjY2VzcyAmJiBjbG91ZERhdGEucHJvZmlsZSkge1xuICAgICAgICAgICAgYWN0aXZlTWVhc3VyZW1lbnRzID0ge1xuICAgICAgICAgICAgICAgaGVpZ2h0OiBjbG91ZERhdGEucHJvZmlsZS5oZWlnaHQgfHwgXCJcIixcbiAgICAgICAgICAgICAgIHdlaWdodDogY2xvdWREYXRhLnByb2ZpbGUud2VpZ2h0IHx8IFwiXCIsXG4gICAgICAgICAgICAgICBjaGVzdDogY2xvdWREYXRhLnByb2ZpbGUuY2hlc3QgfHwgXCJcIixcbiAgICAgICAgICAgICAgIHdhaXN0OiBjbG91ZERhdGEucHJvZmlsZS53YWlzdCB8fCBcIlwiLFxuICAgICAgICAgICAgICAgaGlwczogY2xvdWREYXRhLnByb2ZpbGUuaGlwcyB8fCBcIlwiLFxuICAgICAgICAgICAgICAgaW5zZWFtOiBjbG91ZERhdGEucHJvZmlsZS5pbnNlYW0gfHwgXCJcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIFN5bmMgY2xvdWQgZG93biB0byBmYXN0IGxvY2FsIHN0b3JhZ2UgZm9yIFVJIHNuYXBwaW5nXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImNlbGVzdGlhbHMtZml0LXByb2ZpbGVcIiwgSlNPTi5zdHJpbmdpZnkoYWN0aXZlTWVhc3VyZW1lbnRzKSk7XG4gICAgICAgICB9XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIEZhbGxiYWNrIHRvIGxvY2FsIHN0b3JhZ2UgaWYgbm90IGxvZ2dlZCBpbiBvciBjbG91ZCBpcyBlbXB0eVxuICAgICAgaWYgKCFhY3RpdmVNZWFzdXJlbWVudHMpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjZWxlc3RpYWxzLWZpdC1wcm9maWxlXCIpO1xuICAgICAgICBpZiAoc3RvcmVkKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGFjdGl2ZU1lYXN1cmVtZW50cyA9IEpTT04ucGFyc2Uoc3RvcmVkKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIGZpdCBwcm9maWxlXCIsIGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlTWVhc3VyZW1lbnRzKSB7XG4gICAgICAgIHNldE1lYXN1cmVtZW50cyhhY3RpdmVNZWFzdXJlbWVudHMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsb2FkUHJvZmlsZSgpO1xuICB9LCBbdXNlciwgaXNMb2FkZWRdKTtcblxuICAvLyAyLiBHbG9iYWwgU2F2ZSBUcmlnZ2VyIChTYXZlcyB0byBMb2NhbCArIHNlY3VyZWx5IHBpcGVsaW5lcyB0byBOZW9uIERCKVxuICBjb25zdCBzYXZlTWVhc3VyZW1lbnRzID0gKG5ld01lYXN1cmVtZW50czogRml0TWVhc3VyZW1lbnRzKSA9PiB7XG4gICAgc2V0TWVhc3VyZW1lbnRzKG5ld01lYXN1cmVtZW50cyk7XG4gICAgaWYgKG1vdW50ZWQpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY2VsZXN0aWFscy1maXQtcHJvZmlsZVwiLCBKU09OLnN0cmluZ2lmeShuZXdNZWFzdXJlbWVudHMpKTtcbiAgICAgIFxuICAgICAgLy8gQXV0b25vbW91cyBEYXRhYmFzZSBQaXBlbGluZVxuICAgICAgaWYgKGlzTG9hZGVkICYmIHVzZXIpIHtcbiAgICAgICAgIHN5bmNVc2VySW50ZWxsaWdlbmNlKG5ld01lYXN1cmVtZW50cykuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoXCJDbG91ZCBEQiBNTCBTeW5jIGZhaWxlZFwiLCBlcnIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgbWVhc3VyZW1lbnRzLCBzYXZlTWVhc3VyZW1lbnRzLCBtb3VudGVkIH07XG59XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VVc2VyIiwiZ2V0Q2xvdWRJbnRlbGxpZ2VuY2UiLCJzeW5jVXNlckludGVsbGlnZW5jZSIsInVzZUZpdFByb2ZpbGUiLCJtZWFzdXJlbWVudHMiLCJzZXRNZWFzdXJlbWVudHMiLCJoZWlnaHQiLCJ3ZWlnaHQiLCJjaGVzdCIsIndhaXN0IiwiaGlwcyIsImluc2VhbSIsIm1vdW50ZWQiLCJzZXRNb3VudGVkIiwidXNlciIsImlzTG9hZGVkIiwibG9hZFByb2ZpbGUiLCJhY3RpdmVNZWFzdXJlbWVudHMiLCJjbG91ZERhdGEiLCJzdWNjZXNzIiwicHJvZmlsZSIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5Iiwic3RvcmVkIiwiZ2V0SXRlbSIsInBhcnNlIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsInNhdmVNZWFzdXJlbWVudHMiLCJuZXdNZWFzdXJlbWVudHMiLCJjYXRjaCIsImVyciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./lib/useFitProfile.ts\n"));

/***/ })

});