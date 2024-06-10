"use strict";
exports.id = 717;
exports.ids = [717];
exports.modules = {

/***/ 717:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ay": () => (/* binding */ NeynarAuthProvider),
/* harmony export */   "F": () => (/* binding */ NeynarAuthContext),
/* harmony export */   "m$": () => (/* binding */ useNeynarAuth)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(298);



const NeynarAuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const NeynarAuthProvider = ({ children  })=>{
    const { 0: user , 1: setUser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const storedData = localStorage.getItem(_utils_consts__WEBPACK_IMPORTED_MODULE_2__/* .LOCAL_STORAGE_FARCASTER_USER */ .c);
        if (storedData) {
            const user = JSON.parse(storedData);
            setUser(user);
        }
    }, []);
    const postCast = async (respBody)=>{
        try {
            const response = await fetch(`https://api.neynar.com/v2/farcaster/cast`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api_key": "11BDFAF6-D4D4-460D-9E9F-7CB96DAB7D39"
                },
                body: JSON.stringify(respBody)
            });
            const castPostResponse = await response.json();
            if (castPostResponse.message) {
                throw new Error(`Error posting a cast: ${castPostResponse.message}`);
            }
            return castPostResponse;
        } catch (error) {
            console.error("Failed to post cast", error);
        }
    };
    const handleSetUser = (user)=>{
        setUser(user);
        if (user) {
            localStorage.setItem(_utils_consts__WEBPACK_IMPORTED_MODULE_2__/* .LOCAL_STORAGE_FARCASTER_USER */ .c, JSON.stringify(user));
        } else {
            localStorage.removeItem(_utils_consts__WEBPACK_IMPORTED_MODULE_2__/* .LOCAL_STORAGE_FARCASTER_USER */ .c);
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(NeynarAuthContext.Provider, {
        value: {
            user,
            setUser: handleSetUser,
            postCast
        },
        children: children
    });
};
const useNeynarAuth = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(NeynarAuthContext);
    if (!context) {
        throw new Error("useNeynarAuth must be used within a NeynarAuthProvider");
    }
    return context;
};


/***/ }),

/***/ 298:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ LOCAL_STORAGE_FARCASTER_USER)
/* harmony export */ });
const LOCAL_STORAGE_FARCASTER_USER = "farcasterUser";


/***/ })

};
;