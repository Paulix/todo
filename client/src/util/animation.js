export const itemOne = {
    hidden: { y: 100, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        // transition: "ease",
    },
    exit: {
        y: 100,
        opacity: 0,
        // transition: "ease",
    },
};

export const itemTwo = {
    hidden: { y: -100, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        // transition: "ease",
    },
    exit: {
        y: -100,
        opacity: 0,
        // transition: "ease",
    },
};

export const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.5,
        },
    },
    exit: {
        transition: {
            staggerChildren: 0.5,
            staggerDirection: -1,
        },
    },
};
