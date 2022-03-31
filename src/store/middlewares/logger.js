const logger = (param) => (state) => (next) => (action) => {
    console.log('Destination', param);
    next(action);
};

export default logger;
